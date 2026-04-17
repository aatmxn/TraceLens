import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const uploadAsset = (formData) => API.post('/assets/upload', formData);
export const getAssets = () => API.get('/assets');
export const getViolations = () => API.get('/detect/violations');
export const runDetection = (assetId) => API.post(`/detect/run/${assetId}`);