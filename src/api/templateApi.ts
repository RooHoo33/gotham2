import { chore, day } from "./choreChartApi";

export const getDays = async (): Promise<day[]> => {
  const axios = require("axios").default;
  return await axios
    .get("http://localhost:8080/api/days?projection=withDay")
    .then((data: any) => {
      return data.data._embedded.days;
    });
};
export const getChores = async (): Promise<chore[]> => {
  const axios = require("axios").default;
  return await axios
    .get("http://localhost:8080/api/chores?projection=withChore")
    .then((data: any) => {
      return data.data._embedded.chores;
    });
};
