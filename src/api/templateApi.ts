import { chore, day, template } from "./choreChartApi";

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

export const postTemplate = async (template: template): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .post("http://localhost:8080/api/batch/save-template", template)
    .then((data: any) => {
      return "OK";
    });
};

export const getTemplates = async (): Promise<template[]> => {
  const axios = require("axios").default;
  return await axios
    .get("http://localhost:8080/api/templates?projection=withTemplate")
    .then((data: any) => {
      return data.data._embedded.templates;
    });
};

export const postTemplates = async (templates: template[]): Promise<string> => {
  const axios = require("axios").default;
  return await axios
    .post("http://localhost:8080/api/batch/templates", templates)
    .then((data: any) => {
      return "OK";
    });
};
