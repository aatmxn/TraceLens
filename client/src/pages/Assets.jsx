import { useState, useEffect } from 'react';
import { uploadAsset, getAssets, runDetection } from '../api';
import { Upload, Search } from 'lucide-react';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(null);

  useEffect(() => { fetchAssets(); }, []);

  async function fetchAssets() {
    const { data } = await getAssets();
    setAssets(data);
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('name', file.name);
    await uploadAsset(fd);
    await fetchAssets();
    setUploading(false);
  }

  async function handleScan(assetId) {
    setScanning(assetId);
    await runDetection(assetId);
    await fetchAssets();
    setScanning(null);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Protected Assets</h1>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#6366f1', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>
          <Upload size={16} />
          {uploading ? 'Uploading...' : 'Upload Asset'}
          <input type="file" accept="image/*,video/*" hidden onChange={handleUpload} />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {assets.map(asset => (
          <div key={asset._id} style={{ background: '#1e293b', borderRadius: '12px', padding: '1.25rem' }}>
            {asset.type === 'image' && (
              <img src={`http://localhost:5000/${asset.filePath}`} alt={asset.name}
                style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} />
            )}
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{asset.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
              Hash: {asset.hash?.slice(0, 12)}...
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: asset.violationCount > 0 ? '#ef4444' : '#22c55e', fontSize: '0.85rem' }}>
                {asset.violationCount} violations
              </span>
              <button onClick={() => handleScan(asset._id)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#334155', border: 'none', color: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>
                <Search size={14} />
                {scanning === asset._id ? 'Scanning...' : 'Scan'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}