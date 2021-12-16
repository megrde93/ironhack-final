import axios from "axios";
import { url } from "./url";

//Standard axios GET
// axios.get('http://localhost:5000/all-pets')

//GET request
//GET order: route, headers
export const get = (route) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token, //the token goes here
    },
  });
};

//POST order: route, body, headers
export const post = (route, body) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}${route}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token, //the token goes here
    },
  });
};
