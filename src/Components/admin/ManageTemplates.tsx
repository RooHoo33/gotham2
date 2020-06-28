import React, { FC, useEffect, useState } from "react";
import { getTemplates, postTemplates } from "../../api/templateApi";
import { template } from "../../api/choreChartApi";
import { useToasts } from "react-toast-notifications";

const ManageTemplates: FC<{
  setModalOpen: (open: boolean) => void;
}> = ({ setModalOpen }) => {
  const [templates, setTemplates] = useState<template[]>([]);
  const [currentlyOpen, setCurrentlyOpen] = useState<
    { index: number; open: boolean }[]
  >([]);
  const { addToast } = useToasts();

  useEffect(() => {
    getTemplates().then((data) => {
      setTemplates(data);
      setCurrentlyOpen(
        data.map((template, index) => {
          return { index: index, open: false };
        })
      );
    });
  }, []);

  if (templates.length === 0 || currentlyOpen.length === 0) {
    return <div />;
  }

  const saveActive = (templateToUpdate: template) => {
    postTemplates(
      templates.map((template) => {
        if (template === templateToUpdate) {
          template.active = true;
          return template;
        } else {
          template.active = false;
          return template;
        }
      })
    ).then(() => {
      getTemplates().then(() => {
        addToast("Active Template Updated", { appearance: "success" });
      });
    });
  };

  return (
    <div className={"mt-4"}>
      {templates.map((template, index) => {
        return (
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <div className={"row"}>
                    <div className={"col"}>
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => {
                          setCurrentlyOpen(
                            currentlyOpen.map((it) => {
                              if (it.index === index) {
                                it.open = !it.open;
                              }
                              return it;
                            })
                          );
                        }}
                      >
                        {template.name}
                      </button>
                    </div>
                    <div className={"col"}>
                      <div className={"d-inline-flex float-right"}>
                        <input
                          className="form-check-input"
                          id={template.name}
                          type="checkbox"
                          checked={template.active}
                          style={{
                            transform: "scale(1)",
                          }}
                          onChange={() => saveActive(template)}
                        />
                        <label
                          htmlFor={template.name}
                          className="form-check-label"
                        >
                          <p>Active?</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </h5>
              </div>

              <div
                id="collapseOne"
                className={
                  "collapse " +
                  (currentlyOpen.filter((it) => it.index === index)[0].open
                    ? "show"
                    : "collapsed")
                }
              >
                <div className="card-body">
                  <div className={"row"}>
                    <div className={"col"}>
                      <div className={"row"}>
                        <h3>Chores</h3>
                      </div>
                      {template.templateChores.map((templateChore) => {
                        return (
                          <div className={"row"}>
                            {templateChore.chore.name}
                          </div>
                        );
                      })}
                    </div>

                    <div className={"col"}>
                      <div className={"row"}>
                        <h3>Days</h3>
                      </div>
                      {template.templateDays.map((templateDay) => {
                        return (
                          <div className={"row"}>{templateDay.day.name}</div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        className={"btn btn-primary mt-4 "}
        onClick={() => setModalOpen(false)}
      >
        close
      </button>
    </div>
  );
};

export default ManageTemplates;
