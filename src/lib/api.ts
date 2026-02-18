import axios from "axios";

// 1. Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ledger-guard-backend-2.onrender.com/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// 2. REQUEST INTERCEPTOR: Attach Token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. RESPONSE INTERCEPTOR: Handle Expiry (Auto Logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;

        // 🟢 FIX: Don't redirect if we are ALREADY on the frontend login page
        // This prevents the page from refreshing when you get "Invalid Password"
        if (path !== "/login" && path !== "/signup" && !path.startsWith("/auth")) {
            localStorage.removeItem("token");
            // 🟢 FIX: Redirect to your frontend login route
            window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// --- AI Helper Functions ---
export const ingestFile = async (file: File) => {
  const formData = new FormData();
  formData.append("files", file);
  formData.append("debug", "false"); 
  
  const { data } = await api.post("/api/v1/ingest/universal", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 1000000, 
  });
  return data;
};

export const fetchForecast = async (history: any[]) => {
  const { data } = await api.post("/api/v1/analysis/forecast", history);
  return data;
};

export default api;
