import { AxiosInstance } from "axios";

export class GroupService {
  private groupService: AxiosInstance;

  constructor(server: AxiosInstance) {
    this.groupService = server;
  }

  async findAll() {
    try{
    return await this.groupService.get(`/groups`);
    } catch(error){
      console.error("Erro! Não foi possível listar os grupos. " + error);
      throw error;
    }
  }

  async findById(id: number) {
    try{
    return await this.groupService.get(`/groups/${id}`);
    } catch(error){
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


  async update(data: any) {
    try {
      const response = await this.groupService.put(`/groups/${data.id}`, {
        ...data,
      });
      return response?.data?.content;
    } catch (error) {
      console.error("Erro! Não foi possível editar o grupo. " + error);
      throw error;
    }
  }

  async deleteById(id: number) {
    try{
    return await this.groupService.delete(`/groups/${id}`);
    } catch(error){
      console.error("Erro! Não foi possível deletar o grupo. " + error);
      throw error;
    }
  }
}
