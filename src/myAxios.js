import axios from "axios";

const backendIp = "http://localhost"

const instance = axios.create({
  baseURL: backendIp + ":15000/spotify/"
});

export default instance;