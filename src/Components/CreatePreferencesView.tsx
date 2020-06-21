import React, { useEffect, useState } from "react";
import {
  getTemplates,
  getUserPreferences,
  template,
  templateDay,
  templateChore,
  userChoreChartPreference, postUserPreferences,
} from "../api/choreChartApi";
import UserChorePrefrenceEdit from "./UserChorePreferenceEdit";
import StatusBarTicker from "./StatusBarTicker";

type createPreferencesViewErrors = {
  numberOfUserChorePreferencesError: Boolean;
  repeatRankError: Boolean;
};

const CreatePreferencesView = () => {
  let [userChorePreferences, setUserChorePreferences] = useState<
    userChoreChartPreference[] | undefined
  >(undefined);
  let [template, setTemplate] = useState<template | undefined>(undefined);
  let [errors, setErrors] = useState<createPreferencesViewErrors>({
    numberOfUserChorePreferencesError: false,
    repeatRankError: false,
  });

  let [submitting, setSubmitting] = useState<boolean>(false)

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

  const saveUserPreferences = () =>{
    if (userChorePreferences){
      setSubmitting(true)
      postUserPreferences(userChorePreferences).then(data => setUserChorePreferences(data))

    }
  }

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

      setUserChorePreferences({ ...localUserChorePreferences });
      setErrors({ ...errors, numberOfUserChorePreferencesError: false });
    }
  }

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
        setErrors({ ...errors, repeatRankError: false });
      }
    }
  };

  if (
    !userChorePreferences ||
    userChorePreferences?.length === 0 ||
    !template
  ) {
    return <div />;
  }
  return (
    <div className={"jumbotron mt-4"}>
      <div>
        {errors.repeatRankError && (
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert">
              ×
            </button>
            <strong>Oh snap!</strong> you cannot have duplicate rankings
          </div>
        )}

        <h1 className="display-8 mb-3">Chore Chart</h1>
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
        <button disabled={submitting} type="button" className="btn btn-primary" onClick={saveUserPreferences}>Save changes</button>
        <StatusBarTicker submitting={submitting} setSubmitting={(value) => {setSubmitting(value)}} />

      </div>
    </div>
  );
};

export default CreatePreferencesView;
