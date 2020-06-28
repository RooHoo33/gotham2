import React, { useEffect, useState } from "react";
import {
  getUserPreferences,
  getTemplates,
  template,
  templateDay,
  templateChore,
  userChoreChartPreference,
  postUserPreferences,
  choreChart,
  viewPreviewChoreChart,
} from "../api/choreChartApi";
import UserChorePrefrenceEdit from "./UserChorePreferenceEdit";
import StatusBarTicker from "./StatusBarTicker";
import ChoreChartDisplay from "./ChoreChartDisplay";
import ReactTooltip from "react-tooltip";
import { useToasts } from "react-toast-notifications";

type createPreferencesViewErrors = {
  numberOfUserChorePreferencesError: Boolean;
  repeatRankError: Boolean;
};

const CreatePreferencesView = () => {
  const { addToast } = useToasts();
  let [userChorePreferences, setUserChorePreferences] = useState<
    userChoreChartPreference[]
  >([]);
  let [template, setTemplate] = useState<template | undefined>(undefined);
  let [errors, setErrors] = useState<createPreferencesViewErrors>({
    numberOfUserChorePreferencesError: false,
    repeatRankError: false,
  });

  const [viewingPreviewChart, setViewingPreviewChart] = useState(false);

  const [choreChartPreview, setChoreChartPreview] = useState<
    choreChart | undefined
  >(undefined);

  let [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    getTemplates().then((data) => {
      data[0].templateChores.sort((a, b) => a.chore.rank - b.chore.rank);
      data[0].templateDays.sort((a, b) => a.day.rank - b.day.rank);
      setTemplate(data[0]);
    });
    getUserPreferences("default").then((data) => {
      setUserChorePreferences(data);
    });
  }, []);

  const saveUserPreferences = () => {
    if (userChorePreferences) {
      setSubmitting(true);
      postUserPreferences(userChorePreferences).then((data) => {
        addToast("Preferences Updated", { appearance: "success" });
        setUserChorePreferences(data);
        setSubmitting(false);
      });
    }
  };

  if (template && userChorePreferences) {
    let numberOfChores = template.templateChores.length;
    let numberOfDays = template.templateDays.length;
    if (
      userChorePreferences.length !== numberOfChores * numberOfDays &&
      userChorePreferences.length !== 0
    ) {
      setErrors({ ...errors, numberOfUserChorePreferencesError: true });
    }
    if (userChorePreferences.length !== numberOfChores * numberOfDays) {
      let localUserChorePreferences: userChoreChartPreference[] = [];
      template.templateChores.map((templateChore) => {
        if (template) {
          template.templateDays.map((templateDay) => {
            let localUserChorePreference: userChoreChartPreference = {
              rank: 0,
              chore: templateChore.chore,
              day: templateDay.day,
              id: 0,
              week: "default",
            };
            localUserChorePreferences.push(localUserChorePreference);
          });
        }
      });

      setUserChorePreferences(localUserChorePreferences);
      setErrors({ ...errors, numberOfUserChorePreferencesError: false });
    }
  }

  const viewChoreChartPreview = () => {
    if (userChorePreferences) {
      viewPreviewChoreChart(userChorePreferences).then((data) => {
        setChoreChartPreview(data);
        setViewingPreviewChart(true);
      });
    }
  };

  const onUserChorePreferenceSubmit = (
    newRank: number,
    currentValue: userChoreChartPreference
  ) => {
    if (userChorePreferences) {
      if (
        newRank !== 0 &&
        userChorePreferences?.filter(
          (filterValue: userChoreChartPreference) =>
            filterValue.rank === newRank && filterValue !== currentValue
        ).length !== 0
      ) {
        setErrors({ ...errors, repeatRankError: true });
      } else {
        let currentIndex = userChorePreferences?.indexOf(currentValue);

        userChorePreferences.splice(currentIndex, 1);
        currentValue.rank = newRank;
        setUserChorePreferences(userChorePreferences.concat([currentValue]));
        setViewingPreviewChart(false);
        setErrors({ ...errors, repeatRankError: false });
      }
    }
  };

  if (!userChorePreferences || userChorePreferences.length === 0 || !template) {
    return <div />;
  }
  return (
    <div className={"jumbotron border-5 border-primary mt-4"}>
      {/*<div className={"border-primary"} />*/}
      <div>
        {errors.repeatRankError && (
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert">
              ×
            </button>
            <strong>Oh snap!</strong> you cannot have duplicate rankings
          </div>
        )}

        <h1 className="display-8 mb-3">Edit your preferences</h1>
        <div className="text-info mb-3">
          Rank your chores in order of you wanting to do them. Rank 1 will be
          your most wanted chore. For chores that you do not want to do, select
          0
        </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">chore</th>
              {template.templateDays.map((templateDay: templateDay) => {
                return <th scope="col">{templateDay.day.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {template.templateChores.map((templateChore: templateChore) => {
              // @ts-ignore
              if (!userChorePreferences) {
                return <div />;
              }
              let filteredUserPreferences: userChoreChartPreference[] = userChorePreferences.filter(
                (userChoreChartPreference: userChoreChartPreference) => {
                  return (
                    userChoreChartPreference.chore.id === templateChore.chore.id
                  );
                }
              );

              filteredUserPreferences.sort((a, b) => a.day.rank - b.day.rank);

              return (
                <tr>
                  <th scope="row">{templateChore.chore.name}</th>
                  {filteredUserPreferences?.map(
                    (userChorePreference: userChoreChartPreference) => {
                      // @ts-ignore
                      return (
                        <td>
                          <UserChorePrefrenceEdit
                            numberOfPreferences={
                              userChorePreferences
                                ? userChorePreferences?.length + 1
                                : 0
                            }
                            onSubmit={onUserChorePreferenceSubmit}
                            userChorePreference={userChorePreference}
                          />
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/*<StatusBarTicker*/}
        {/*  submitting={submitting}*/}
        {/*  setSubmitting={(value) => {*/}
        {/*    setSubmitting(value);*/}
        {/*  }}*/}
        {/*/>*/}
        <div className={"row mt-3"}>
          <div className={"col"}>
            <button
              disabled={submitting}
              type="button"
              className="btn btn-primary"
              onClick={saveUserPreferences}
            >
              Save changes
            </button>
          </div>

          <div className={"col align-right"}>
            {viewingPreviewChart && (
              <button
                disabled={submitting}
                type="button"
                className="btn btn-primary float-right"
                onClick={() => setViewingPreviewChart(false)}
                data-tip
                data-for="registerTip"
              >
                hide preview
              </button>
            )}
            {!viewingPreviewChart && (
              <div>
                <button
                  disabled={submitting}
                  type="button"
                  className="btn btn-primary float-right"
                  onClick={viewChoreChartPreview}
                  data-tip
                  data-for="registerTip"
                >
                  view preview
                </button>
                <ReactTooltip
                  id="registerTip"
                  html={true}
                  multiline={true}
                  place="right"
                  effect="solid"
                >
                  {
                    "Generate next weeks chore chart with<br>everyones preferenses as of now"
                  }
                </ReactTooltip>
              </div>
            )}
          </div>
        </div>

        {viewingPreviewChart && choreChartPreview && (
          <div className={"mt-5"}>
            <ChoreChartDisplay
              choreChart={choreChartPreview}
              title={"Preview Chart"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePreferencesView;
