// import useState next to FunctionComponent
import React, { FunctionComponent, useEffect, useState } from "react";
import { getChoreCharts, templateDay, choreChart } from "../api/choreChartApi";

const Counter: FunctionComponent<any> = () => {
  const [choreChart, setChoreChart] = useState<choreChart | undefined>(
    undefined
  );

  // since we pass a number here, clicks is going to be a number.
  // setClicks is a function that accepts either a number or a function returning
  // a number
  useEffect(() => {
    getChoreCharts().then((data) => {
      console.log(data);
      data.forEach((dataSingle) => {
        dataSingle.template.templateChores.sort(
          (a, b) => a.chore.rank - b.chore.rank
        );
        dataSingle.template.templateDays.sort(
          (a, b) => a.day.rank - b.day.rank
        );
      });
      setChoreChart(data[0]);
    });
  }, []);

  const [clicks, setClicks] = useState(50);
  if (!choreChart) {
    return <div />;
  }
  return (
    <div className={"card mt-4"}>
      <div className={"card-body"}>
        <h5 className="card-title">Chore Chart</h5>
        <div className={"card-text"}>
          <div className={"row align-items-end"}>
            <div className={"col"}>
              <h5>chores</h5>
            </div>
            {choreChart?.template.templateDays.map(
              (templateDay: templateDay) => {
                return (
                  <div className={"col"}>
                    <h3>{templateDay.day.name}</h3>
                  </div>
                );
              }
            )}
          </div>
          {choreChart.template.templateChores.map((templateChore) => {
            let filteredChoreUnits = choreChart?.choreChartUnits.filter(choreChartUnit =>{

              return choreChartUnit.templateChore.id === templateChore.id
            })
            console.log(filteredChoreUnits)
            filteredChoreUnits?.sort(((a, b) => a.templateDay.day.rank - b.templateDay.day.rank))
            return <div className={"row"}>
              <div className={"col"}>{templateChore.chore.name}</div>
              {filteredChoreUnits?.map(choreUnit =>{
                return <div className={"col"}>{choreUnit.user.kappaSigma}</div>
              })}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
};
export default Counter;
