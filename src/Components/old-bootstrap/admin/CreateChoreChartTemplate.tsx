import React, { useEffect, useState } from "react";
import {getChores, getDays, postTemplate} from "../../../api/templateApi";
import {
  chore,
  day,
  template,
  templateChore,
  templateDay,
} from "../../../api/choreChartApi";

type choreForTemplate = {
  chore: templateChore;
  active: boolean;
};

type dayForTemplate = {
  day: templateDay;
  active: boolean;
};
const CreateChoreChartTemplate = () => {
  const [template, setTemplate] = useState<template>({
    id: 0,
    name: "",
    defaultTemplate: false,
    templateChores: [],
    templateDays: [],
  });

  const [days, setDays] = useState<dayForTemplate[]>([]);
  const [chores, setChores] = useState<choreForTemplate[]>([]);
  const [createTemplateError, setCreateTemplateError] = useState(false)

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

  const saveTemplate = () =>{
      let localTemplate:template = {...template, templateChores: chores.map(chore => chore.chore), templateDays: days.map(day => day.day)}
      if (localTemplate.name === "" || localTemplate.templateDays.length === 0 || localTemplate.templateChores.length === 0){
          setCreateTemplateError(true)
      } else {
          postTemplate(localTemplate).then(() => setCreateTemplateError(false))
      }
    }
  return (
    <div className=" mt-4">
      <div className={"row"}>
        <div className="col">
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Template name</label>
            <input
              onChange={(event) =>
                setTemplate({ ...template, name: event.target.value })
              }
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Template name"
            />

          </div>
        </div>
        <div className="col align-bottom mt-5" ><input
            id={"default"}
            className="form-check-input "
            type="checkbox"
            onChange={(event) => {
                setTemplate({ ...template, defaultTemplate: !template.defaultTemplate });
            }}
            checked={template.defaultTemplate}
            />
            <label htmlFor={"default"}>default template?</label></div>
      </div>
      <div style={{ fontSize: "22px" }} className={"row ml-3 mr-3"}>
        <div className="col ">
          {days.map((day, index) => {
            return (
              <div className={"form-group"}>
                <div className="">
                  <input
                    id={"day-" + index}
                    className="form-check-input"
                    type="checkbox"
                    onChange={(event) => {
                      day.active = !day.active;
                      let localDays = [...days];
                      localDays[index] = day;
                      setDays(localDays);
                    }}
                    checked={day.active}
                  />
                  <label htmlFor={"day-" + index}>{day.day.day.name}</label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col ">
          {chores.map((chore, index) => {
            return (
              <div className={"form-group"}>
                <div className="">
                  <input
                    id={"chore-" + index}
                    className="form-check-input"
                    type="checkbox"
                    onChange={(event) => {
                      chore.active = !chore.active;
                      let localChores = [...chores];
                      localChores[index] = chore;
                      setChores(localChores);
                    }}
                    checked={chore.active}
                  />
                  <label htmlFor={"chore-" + index}>
                    {chore.chore.chore.name}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
        <button
            type="button"
            className="btn ml-3 btn-primary"
            onClick={() => saveTemplate()}
        >
            save template
        </button>
    </div>
  );
};
export default CreateChoreChartTemplate;
