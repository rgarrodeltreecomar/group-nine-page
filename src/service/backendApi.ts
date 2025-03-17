import axios from 'axios';
import { getEnvVariables } from '../helpers';

const {
  VITE_API_BASE_URL,
  VITE_SEND_EMAIL,
} = getEnvVariables();

export const endpoints = Object.freeze({
  sendEmail: `${VITE_API_BASE_URL}${VITE_SEND_EMAIL}`,

});

export const backendAPI = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true 
});