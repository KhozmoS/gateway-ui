import axios from "axios";

const APIUrl = "http://localhost:5000";

const httpClient = axios.create({
  baseURL: APIUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json" 
  }
});

export { httpClient };
