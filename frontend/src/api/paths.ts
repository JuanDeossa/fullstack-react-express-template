import { envs } from "../config/envs";

export const baseUrl = envs.API_BASE_URL
export const usersUrl = `${baseUrl}/users`;
export const authUrl = `${baseUrl}/auth`;
