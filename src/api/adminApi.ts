import { choreChart } from "./choreChartApi";

export type termInformation = {
  id: number;
  numberOfChoresPerNormalPerson: number;
  numberOfChoresPerGreenTeam: number;
  active: boolean;
  name: string;
};

export const getTermInformations = async (): Promise<termInformation[]> => {
  const axios = require("axios").default;
  return await axios
    .get(
      `http://localhost:8080/api/termInformations?projection=withTermInformation`
    )
    .then((data: any) => {
      return data.data._embedded.termInformations;
    });
};
export const postTermInformation = async (
  termInformation: termInformation
): Promise<termInformation> => {
  const axios = require("axios").default;
  return await axios
    .post(`http://localhost:8080/api/termInformations`, termInformation)
    .then((data: any) => {
      return data.data;
    });
};

export const postTermInfoAsActive = async (
  id: number
): Promise<termInformation[]> => {
  const axios = require("axios").default;
  return await axios
    .post(`http://localhost:8080/api/termInformations/set-as-active/${id}`)
    .then((data: any) => {
      return data.data;
    });
};
export const getCurrentTermInfo = async (): Promise<termInformation> => {
  const axios = require("axios").default;
  return await axios
    .get(
      `http://localhost:8080/api/termInformations/search/findByActive?active=true&projection=withTermInformation`
    )
    .then((data: any) => {
      console.log(data);
      return data.data;
    });
};
