const configuredUrl = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = (
  configuredUrl || (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "")
).replace(/\/+$/, "");

export default API_BASE_URL;
