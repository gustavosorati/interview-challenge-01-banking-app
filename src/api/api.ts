import axios from 'axios'

const tokenExist = window.localStorage.getItem('token');

let api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  }
});

if(tokenExist) {
  const token = JSON.parse(tokenExist);

  api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });
} 

export {api}