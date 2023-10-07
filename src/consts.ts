let apiUrl =
  process.env.REACT_APP_STAGE === "production"
    ? "https://achernar.eic.cefet-rj.br/mapserverapi/v1"
    : "http://localhost:8888/v1";

export const API_URL = apiUrl;

export const ENA_CONVERT_SERVER_URL = "http://localhost:7779";

export const getBackgroundLink = (bgName: string) => {
  if (process.env.REACT_APP_STAGE === "production") {
    return `https://achernar.eic.cefet-rj.br/mapserverapi/image/${bgName}.png`;
  }
  return `http://localhost:8888/image/${bgName}.png`;
};

export const downloadMapUrl = (id: number) =>
  `${apiUrl}/maps/${id}/download/public`;
