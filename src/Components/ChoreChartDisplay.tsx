// import useState next to FunctionComponent
import React, { FunctionComponent} from "react";
 import {templateDay, templateChore, choreChartUnit} from "../api/choreChartApi";

const ChoreChartDisplay: FunctionComponent<any> = ({choreChart}) => {


  if (!choreChart) {
    return <div />;
  }
  return (
    <div className={"jumbotron mt-4"}>
      <div>
        <h1 className="display-8 mb-3">
          Chore Chart{" "}
          <h5 className={"float-right align-right"}>{choreChart.week}</h5>
        </h1>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">chore</th>
              {choreChart.template.templateDays.map((templateDay:templateDay) => {
                return <th scope="col">{templateDay.day.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {choreChart.template.templateChores.map((templateChore: templateChore) => {
              let filteredChoreUnits = choreChart?.choreChartUnits.filter(
                (choreChartUnit: choreChartUnit) => {
                  return choreChartUnit.templateChore.id === templateChore.id;
                }
              );

              return (
                <tr>
                  <th scope="row">{templateChore.chore.name}</th>
                  {filteredChoreUnits?.map((choreChartUnit: choreChartUnit) => {
                    return <td>{choreChartUnit.user.kappaSigma}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ChoreChartDisplay;
