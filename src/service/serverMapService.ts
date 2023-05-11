import { AxiosInstance } from "axios";

export class ServerMapService {
  private serverMapService: AxiosInstance;

  constructor(server: AxiosInstance) {
    this.serverMapService = server;
  }

  // Maps Entity

  async getMaps() {
    return await this.serverMapService.get(`/maps`);
  }

  async createMap(data: any) {
    try {
      const response = await this.serverMapService.post("/maps", {
        ...data,
      });
      return response?.data?.content;
    } catch (error) {
      console.error("Error ao cadastrar o mapa.", error);
      throw new Error("Error ao cadastrar o mapa.");
    }
  }
}
