import { AxiosInstance } from "axios";

export class GroupService {
  private groupService: AxiosInstance;

  constructor(server: AxiosInstance) {
    this.groupService = server;
  }

  async findAll() {
    try {
      return (await this.groupService.get(`/groups/listAll`)).data;
    } catch (error) {
      console.error("Erro! Não foi possível listar os grupos. " + error);
      throw error;
    }
  }

  async findAllPaged(
    search: string | undefined = undefined,
    limit: number | undefined = undefined,
    page: number | undefined = undefined
  ) {
    try {
      return (
        await this.groupService.get(`/groups`, {
          params: { search, limit, page },
        })
      ).data;
    } catch (error) {
      console.error("Erro! Não foi possível listar os grupos. " + error);
      throw error;
    }
  }

  async findAllPagedByUserId(
    search: string | undefined = undefined,
    limit: number | undefined = undefined,
    page: number | undefined = undefined,
    userId: number | undefined = undefined
  ) {
    try {
      if (!userId) {
        throw new Error("Erro! Não foi possível listar os grupos");
      }
      return (
        await this.groupService.get(`/groups/${userId}/by-user`, {
          params: { search, limit, page },
        })
      ).data;
    } catch (error) {
      console.error("Erro! Não foi possível listar os grupos. " + error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      return await this.groupService.get(`/groups/${id}`);
    } catch (error) {
      console.error("Erro! Não foi possível encontrar o grupo. " + error);
      throw error;
    }
  }

  async getMapsByGroupAndUser(
    idGroup: number,
    idUser: number,
    limit: number,
    offset: number
  ) {
    try {
      return await this.groupService.get(
        `/groups/${idGroup}/user/${idUser}?limit=${limit}&offset=${offset}`
      );
    } catch (error) {
      console.error("Erro! Não foi possível encontrar o grupo. " + error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const response = await this.groupService.post(`/groups`, {
        ...data,
      });
      return response?.data?.content;
    } catch (error) {
      console.error("Erro! Não foi possível cadastrar o grupo. " + error);
      throw error;
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.groupService.put(`/groups/${id}`, {
        ...data,
      });
      return response?.data?.content;
    } catch (error) {
      console.error("Erro! Não foi possível editar o grupo. " + error);
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      return await this.groupService.delete(`/groups/${id}`);
    } catch (error) {
      console.error("Erro! Não foi possível deletar o grupo. " + error);
      throw error;
    }
  }
}
