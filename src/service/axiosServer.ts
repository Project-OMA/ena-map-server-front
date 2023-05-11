import axios, { AxiosInstance } from "axios";
import { API_URL } from "../consts";
import { ServerMapService } from "./serverMapService";

export class AxiosServer {
  server: AxiosInstance;

  constructor() {
    this.server = this.initServer();
  }

  initServer() {
    return axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const axiosServer = new AxiosServer();
export let serverMapService = new ServerMapService(axiosServer.server);
