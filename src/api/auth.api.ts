import { api_instance } from "@/apiIntelesence";
import type { FORGOT_PASS, LOGIN, RESET_PASS } from "@/types";
import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

export const login = (data: LOGIN) => api_instance.post(`Auth/Login`, data);
export const logout = () => api_instance.post(`Auth/Logout`);

export const forgotPass = ({ data }: { data: FORGOT_PASS }) =>
  api_instance.post(`Auth/Forgot-Password`, data);

export const resetPass = ({ data }: { data: RESET_PASS }) =>
  api_instance.post(`Auth/Reset-Password`, data);

export const getDecryptedToken = () => {
  const encryptedToken = localStorage.getItem("Etender-token");

  if (!encryptedToken) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error decrypting token:", error);
    return null;
  }
};
