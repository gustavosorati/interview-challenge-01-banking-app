import axios from 'axios'

const token = window.localStorage.getItem('token');

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
});