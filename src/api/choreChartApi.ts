import { basePath } from "../config";

export interface chore extends choreOrDayType {}

export interface day extends choreOrDayType {}

export type user = {
  bigB: number;
  greenTeam: boolean;
  id: number;

  kappaSigma: number;
  email: string;
  isAssociateMemeber: boolean;
  firstName: string;
  lastName: string;
  active: boolean;
};

export type templateDay = {
  id: number;
  day: day;
};
export type templateChore = {
  id: number;
  chore: chore;
};

export type choreOrDayType = {
  id: number;
  name: string;
  rank: number;
};

export type template = {
  name: string;
  id: number;
  active: boolean;
  templateDays: templateDay[];
  templateChores: templateChore[];
};
export type choreChartUnit = {
  id: number;
  templateChore: templateChore;
  templateDay: templateDay;
  user: user;
  week: string;
};

export type choreChart = {
  id: number;
  week: string;
  template: template;
  choreChartUnits: choreChartUnit[];
};

export type userChoreChartPreference = {
  id: number;
  chore: chore;
  day: day;
  user?: user;
  rank: number;
};

export type userChoresNumberType = {
  completed: number;
  total: number;
  greenTeam: boolean;
  choreChartUnits: choreChartUnit[];
};

export const getChoreCharts = async (): Promise<choreChart[]> => {
  const axios = require("axios").default;
  return await axios
    .get(`${basePath}/api/choreCharts?projection=withChoreChart`)
    .then((data: any) => {
      return data.data._embedded.choreCharts;
    });
};

export const getCurrentChoreChart = async (
  week: string
): Promise<choreChart> => {
  const axios = require("axios").default;
  return await axios
    .get(
      `${basePath}/api/choreCharts/search/findByWeek?week=${week}&projection=withChoreChart`
    )
    .then((data: any) => {
      return data.data;
    });
};
export const getUserPreferences = async (): Promise<
  userChoreChartPreference[]
> => {
  const axios = require("axios").default;
  return await axios
    .get(
      `${basePath}/api/userChorePreferences/search/findByUser?projection=withUserChorePreference`
    )
    .then((data: any) => {
      return data.data;
    });
};

export const getTemplates = async (): Promise<template[]> => {
  const axios = require("axios").default;
  return await axios
    .get(`${basePath}/api/templates?projection=withTemplate`)
    .then((data: any) => {
      return data.data._embedded.templates;
    });
};

export const getActiveTemplate = async (): Promise<template> => {
  const axios = require("axios").default;
  return await axios
    .get(
      `${basePath}/api/templates/search/findByActive?active=true&projection=withTemplate`
    )
    .then((data: any) => {
      return data.data;
    });
};

export const postUserPreferences = async (
  saveUserPreferences: userChoreChartPreference[]
) => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/user-chore-preferences`, saveUserPreferences)
    .then((data: any) => {
      return data.data;
    });
};

export const viewPreviewChoreChart = async (
  userChorePreferences: userChoreChartPreference[]
): Promise<choreChart> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/preview-chore-chart`, userChorePreferences)
    .then((data: any) => {
      return data.data;
    });
};

export const postDays = async (days: day[]): Promise<day[]> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/days`, days)
    .then((data: any) => {
      return data.data;
    });
};

export const postChores = async (chores: chore[]): Promise<chore[]> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/chores`, chores)
    .then((data: any) => {
      return data.data;
    });
};

export const postToCreateChoreChart = async (): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/admin/create-chore-chart`)
    .then(() => {
      return "OK";
    });
};

export const getNumberOfChores = async (): Promise<userChoresNumberType> => {
  const axios = require("axios").default;
  return await axios
    .get(`${basePath}/api/number-of-chores`)
    .then((data: any) => {
      return data.data;
    });
};
