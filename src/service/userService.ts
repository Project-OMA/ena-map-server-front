import { AxiosInstance } from "axios";

export class UserService {
  private userService: AxiosInstance;

  constructor(server: AxiosInstance) {
    this.userService = server;
  }

  async findAll(
    search: string | undefined = undefined, 
    limit: number | undefined = undefined, 
    page: number | undefined  = undefined
  ) {
    try{
      return await this.userService.get(`/users`,{ 
        params: { search, limit, page } 
      });
    } catch(error){
      console.error("Erro! Não foi possível listar os usuários. " + error);
      throw error;
    }
  }

  async findById(id: number) {
    try{
    return await this.userService.get(`/users/${id}`);
    } catch(error){
      console.error("Erro! Não foi possível encontrar o usuário. " + error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const response = await this.userService.post(`/users`, {
        ...data,
      });
      return response?.data?.content;
    } catch (error) {
      console.error("Erro! Não foi possível cadastrar o usuário. " + error);
      throw error;
    }
  }

  async createByFile(file: File | undefined) {
    try {
      const formData = new FormData();
      formData.append("tb_users", file || "");
      formData.append("minify", "true");
      const response = await this.userService.post(`/users/file`, formData);
      return response?.data?.content;
    } catch (error) {
      console.error("Erro! Não foi possível cadastrar os usuários. " + error);
      throw error;
    }
  }

  async update(data: any) {
    try {
      const response = await this.userService.put(`/users/${data.id}`, {
        ...data,
      });
      return response?.data?.content;
    } catch (error) {
      console.error("Erro! Não foi possível editar o usuário. " + error);
      throw error;
    }
  }

  async deleteById(id: number) {
    try{
    return await this.userService.delete(`/users/${id}`);
    } catch(error){
      console.error("Erro! Não foi possível deletar o usuário. " + error);
      throw error;
    }
  }
}
