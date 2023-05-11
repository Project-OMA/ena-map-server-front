import axios, { AxiosInstance } from "axios";
import { ENA_CONVERT_SERVER_URL } from "../consts";

const session = axios.create({
  baseURL: ENA_CONVERT_SERVER_URL,
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=----WebKitFormBoundaryOwKiuFKD7X7VmoMf",
  },
});

class EnaConvertServices {
  constructor(private authServer: AxiosInstance) {}

  async convertMap(file: File) {
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("minify", "true");

      const response = await this.authServer.post(
        `${ENA_CONVERT_SERVER_URL}/convert_xml_map/`,
        body
      );
      return response?.data;
    } catch (error) {
      console.error("Error ao converter o arquivo XML.", error);
      throw new Error("Error ao converter o arquivo XML.");
    }
  }
}

export const enaConvertServices = new EnaConvertServices(session);
