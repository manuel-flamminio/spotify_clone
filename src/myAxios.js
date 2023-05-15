import axios from "axios";

const backendIp = "https://mflamminio.xyz"

const instance = axios.create({
  baseURL: backendIp + ":15000/spotify/"
});

export default instance;
