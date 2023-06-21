import axios, { AxiosInstance } from "axios";
import { API_URL } from "../consts";
import { ServerMapService } from "./serverMapService";
import { UserService } from "./userService";
import { GroupService } from "./groupService";

export class AxiosServer {
  server: AxiosInstance;

  constructor() {
    this.server = this.initServer();
  }

  public getAuthorizationHeader = () => {
    const tokenStorage = localStorage.getItem("token");

    if (tokenStorage && typeof tokenStorage === "string") {
      const tokenJson = JSON.parse(tokenStorage);
      const serializedToken = tokenJson.access_token;
      return { Authorization: `Bearer ${serializedToken}` };
    }
  };

  initServer() {
    return axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthorizationHeader(),
      },
    });
  }
}

export let axiosServer = new AxiosServer();
export let serverMapService = new ServerMapService(axiosServer.server);
export let userService = new UserService(axiosServer.server);
export let groupService = new GroupService(axiosServer.server);

export const reloadServices = () => {
  axiosServer = new AxiosServer();
  serverMapService = new ServerMapService(axiosServer.server);
  userService = new UserService(axiosServer.server);
  groupService = new GroupService(axiosServer.server);
};
