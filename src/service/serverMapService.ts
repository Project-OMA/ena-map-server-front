import { AxiosInstance } from "axios";

export class ServerMapService {
  private serverMapService: AxiosInstance;

  constructor(server: AxiosInstance) {
    this.serverMapService = server;
  }

  // User Entity

  async authUser(data: any) {
    try {
      const response = await this.serverMapService.post("/users/auth", data);
      return response?.data;
    } catch (error) {
      console.error("Error ao autenticar o usuario.", error);
      throw error;
    }
  }

  // Maps Entity
  async findAll() {
    try {
      return (await this.serverMapService.get(`/maps/listAll`)).data;
    } catch (error) {
      throw error;
    }
  }

  async findAllPaged(
    search: string | undefined = undefined, 
    limit: number | undefined = undefined, 
    page: number | undefined  = undefined
  ) {
    try {
      return (await this.serverMapService.get(`/maps`,{ 
        params: { search, limit, page } 
      })).data;
    } catch (error) {
      throw error;
    }
  }

  async getMapsByName(query: string) {
    try {
      return await this.serverMapService.get(`/maps/search`, {
        params: { query },
      });
    } catch (error) {
      throw error;
    }
  }

  async createMap(data: any) {
    try {
      const response = await this.serverMapService.post("/maps", data);
      return response?.data?.content;
    } catch (error) {
      console.error("Error ao cadastrar o mapa.", error);
      throw new Error("Error ao cadastrar o mapa.");
    }
  }
}
