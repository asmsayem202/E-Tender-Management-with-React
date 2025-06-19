import { api_instance } from "@/apiIntelesence";
import type { FORGOT_PASS, LOGIN, RESET_PASS } from "@/types";

export const login = (data: LOGIN) => api_instance.post(`Auth/Login`, data);
export const logout = () => api_instance.post(`Auth/Logout`);

export const forgotPass = ({ data }: { data: FORGOT_PASS }) =>
  api_instance.post(`Auth/Forgot-Password`, data);

export const resetPass = ({ data }: { data: RESET_PASS }) =>
  api_instance.post(`Auth/Reset-Password`, data);
