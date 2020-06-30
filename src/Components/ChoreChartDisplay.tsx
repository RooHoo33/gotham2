// import useState next to FunctionComponent
import React, { FunctionComponent, useEffect } from "react";
import {
  templateDay,
  templateChore,
  choreChartUnit,
  choreChart,
} from "../api/choreChartApi";

const ChoreChartDisplay: FunctionComponent<{
  choreChart: choreChart;
  title: string;
}> = ({ choreChart, title }) => {
  const getDate = (weekString: string) => {
    const [year, week] = weekString.split("-W");
    if (!year || !week) {
      return weekString;
    }

    let d = 1 + (parseInt(week) - 1) * 7;

    const isSunday = (date: Date): Date => {
      const dayNumber = date.getDay();
      date.setDate(date.getDate() - dayNumber);
      return date;
    };
    let datehere = isSunday(new Date(parseInt(year), 0, d));

    return (
      "Week of " +
      datehere.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  };
  choreChart.template.templateChores.sort(
    (a, b) => a.chore.rank - b.chore.rank
  );
  choreChart.template.templateDays.sort((a, b) => a.day.rank - b.day.rank);

  if (!choreChart) {
    return <div />;
  }

  return (
    <div>
      <div>
        <h1 className="display-8 mb-3">
          {title + " "}
          <p style={{ fontSize: "23px" }} className={"float-right align-right"}>
            {getDate(choreChart.week).toString()}
          </p>
        </h1>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">chore</th>
              {choreChart.template.templateDays.map(
                (templateDay: templateDay) => {
                  return <th scope="col">{templateDay.day.name}</th>;
                }
              )}
            </tr>
          </thead>
          <tbody>
            {choreChart.template.templateChores.map(
              (templateChore: templateChore) => {
                let filteredChoreUnits = choreChart?.choreChartUnits.filter(
                  (choreChartUnit: choreChartUnit) => {
                    return choreChartUnit.templateChore.id === templateChore.id;
                  }
                );

                return (
                  <tr>
                    <th scope="row">{templateChore.chore.name}</th>
                    {filteredChoreUnits?.map(
                      (choreChartUnit: choreChartUnit) => {
                        console.log(choreChartUnit);
                        if (!choreChartUnit.user) {
                          return (
                            <td>
                              <div className={"text-danger"}>No one</div>
                            </td>
                          );
                        } else if (choreChartUnit.user.isAssociateMemeber) {
                          return (
                            <td>
                              {choreChartUnit.user.firstName +
                                " " +
                                choreChartUnit.user.lastName}
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              {choreChartUnit.user.kappaSigma
                                ? choreChartUnit.user.kappaSigma
                                : "No one"}
                            </td>
                          );
                        }
                      }
                    )}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ChoreChartDisplay;
