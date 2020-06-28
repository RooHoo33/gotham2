import { useEffect, useState } from "react";
import ChoreChartDisplay from "./ChoreChartDisplay";
import { getChoreCharts, choreChart } from "../api/choreChartApi";
import React from "react";
import CreatePreferencesView from "./CreatePreferencesView";
import AdminView from "./admin/AdminView";

const ChoreCharts = () => {
  const [choreCharts, setChoreCharts] = useState<choreChart[] | undefined>([]);

  useEffect(() => {
    getChoreCharts().then((data) => {
      data.forEach((dataSingle) => {
        dataSingle.template.templateChores.sort(
          (a, b) => a.chore.rank - b.chore.rank
        );
        dataSingle.template.templateDays.sort(
          (a, b) => a.day.rank - b.day.rank
        );
      });
      setChoreCharts(data);
    });
  }, []);

  return (
    <div>
      {choreCharts?.map((choreChart) => {
        return (
          <div className={"jumbotron border-5 border-success mt-4"}>
            <ChoreChartDisplay choreChart={choreChart} title={"Chore Chart"} />
          </div>
        );
      })}
      <AdminView />
      <CreatePreferencesView />
    </div>
  );
};

export default ChoreCharts;
