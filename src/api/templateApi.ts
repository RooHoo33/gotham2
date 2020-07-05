import { chore, day, template } from "./choreChartApi";
import { basePath } from "../config";

export const getDays = async (): Promise<day[]> => {
  const axios = require("axios").default;
  return await axios
    .get(`${basePath}/api/days?projection=withDay`)
    .then((data: any) => {
      return data.data._embedded.days;
    });
};
export const getChores = async (): Promise<chore[]> => {
  const axios = require("axios").default;
  return await axios
    .get(`${basePath}/api/chores?projection=withChore`)
    .then((data: any) => {
      return data.data._embedded.chores;
    });
};

export const postDay = async (day: day): Promise<day> => {
  const axios = require("axios").default;
  return await axios.post(`${basePath}/api/days`, day).then((data: any) => {
    return data.data;
  });
};

export const postChore = async (chore: chore): Promise<chore> => {
  const axios = require("axios").default;
  return await axios.post(`${basePath}/api/chores`, chore).then((data: any) => {
    return data.data;
  });
};

export const deleteDay = async (id: number): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .delete(`${basePath}/api/batch/days/${id}`)
    .then((data: any) => {
      return "OK";
    });
};

export const deleteChore = async (id: number): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .delete(`${basePath}/api/batch/chores/${id}`)
    .then((data: any) => {
      return "OK";
    });
};

export const postTemplate = async (template: template): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/save-template`, template)
    .then((data: any) => {
      return "OK";
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

export const postTemplates = async (templates: template[]): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/templates`, templates)
    .then((data: any) => {
      return "OK";
    });
};

export const deleteTemplate = async (templateId: number): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .delete(`${basePath}/api/templates/${templateId}`)
    .then((data: any) => {
      return "OK";
    });
};
