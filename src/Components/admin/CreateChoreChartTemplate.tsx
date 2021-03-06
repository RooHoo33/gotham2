import React, { FC, useEffect, useState } from "react";
import { getChores, getDays, postTemplate } from "../../api/templateApi";
import { template, templateChore, templateDay } from "../../api/choreChartApi";

type choreForTemplate = {
  chore: templateChore;
  active: boolean;
};

type dayForTemplate = {
  day: templateDay;
  active: boolean;
};
const CreateChoreChartTemplate: FC<{
  setModalOpen: (open: boolean) => void;
  updateTemplates: () => void;
}> = ({ setModalOpen, updateTemplates }) => {
  const [template, setTemplate] = useState<template>({
    id: 0,
    name: "",
    templateChores: [],
    templateDays: [],
    active: false,
  });

  const [days, setDays] = useState<dayForTemplate[]>([]);
  const [chores, setChores] = useState<choreForTemplate[]>([]);
  const [badTemplateName, setBadTemplateName] = useState(false);

  const submitTemplate = () => {
    if (template.name === "") {
      setBadTemplateName(true);
    }
    let templateToSubmit: template = {
      templateDays: days.filter((value) => value.active).map((day) => day.day),
      templateChores: chores
        .filter((value) => value.active)
        .map((chore) => chore.chore),
      name: template.name,
      id: 0,
      active: false,
    };
    postTemplate(templateToSubmit).then(() => {
      updateTemplates();
    });
  };

  useEffect(() => {
    getDays().then((data) => {
      let daysToSet: dayForTemplate[] = data.map((day) => {
        return { day: { id: 0, day: day }, active: true };
      });
      setDays(daysToSet);
    });
    getChores().then((data) => {
      let choresToSet: choreForTemplate[] = data.map((chore) => {
        return { chore: { id: 0, chore: chore }, active: true };
      });
      setChores(choresToSet);
    });
  }, []);
  return (
    <div className=" mt-4">
      {badTemplateName && (
        <div className="alert alert-dismissible alert-danger">
          Please include a template name
        </div>
      )}
      <div className={"row"}>
        <div className="col">
          <div className="form-group">
            <label htmlFor="tempalteName">Template name</label>
            <input
              onChange={(event) =>
                setTemplate({ ...template, name: event.target.value })
              }
              className="form-control"
              id="tempalteName"
              placeholder="Template name"
            />
          </div>
        </div>
        <div className="col" />
      </div>
      <div style={{ fontSize: "22px" }} className={"row"}>
        <div className="col pl-5 pr-5">
          {days.map((day, index) => {
            return (
              <div className={"row"}>
                <div className={"form-check mb-2"}>
                  <input
                    id={day.day.day.name}
                    className="form-check-input"
                    type="checkbox"
                    style={{
                      transform: "scale(1.5)",
                    }}
                    onChange={(event) => {
                      day.active = !day.active;
                      let localDays = [...days];
                      localDays[index] = day;
                      setDays(localDays);
                    }}
                    checked={day.active}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={day.day.day.name}
                  >
                    {day.day.day.name}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col">
          {chores.map((chore, index) => {
            return (
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  id={chore.chore.chore.name}
                  type="checkbox"
                  style={{
                    transform: "scale(1.5)",
                  }}
                  onChange={(event) => {
                    chore.active = !chore.active;
                    let localChores = [...chores];
                    localChores[index] = chore;
                    setChores(localChores);
                  }}
                  checked={chore.active}
                />
                <label
                  className="form-check-label"
                  htmlFor={chore.chore.chore.name}
                >
                  {chore.chore.chore.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="btn mt-4 btn-primary"
        onClick={() => {
          submitTemplate();
        }}
      >
        save
      </button>
      <button
        type="button"
        className="btn mt-4 ml-2 btn-secondary"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        canel
      </button>
    </div>
  );
};
export default CreateChoreChartTemplate;
