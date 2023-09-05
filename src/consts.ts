import axios from "axios";

let apiUrl = "http://localhost:8888/v1";

export const API_URL = apiUrl;

export const ENA_CONVERT_SERVER_URL = "http://localhost:7779";

export const getBackgroundLink = (bgName: string) => {
  return `http://localhost:8888/image/${bgName}.png`;
};

export const downloadMapUrl = (id: number) =>
  `${apiUrl}/maps/${id}/download/public`;
