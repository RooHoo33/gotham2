import { useEffect, useState } from "react";
import ChoreChartDisplay from "./ChoreChartDisplay";
import {
  getChoreCharts,
  choreChart,
  getCurrentChoreChart,
} from "../api/choreChartApi";
import React from "react";
import CreatePreferencesView from "./CreatePreferencesView";
import AdminView from "./admin/AdminView";
import moment from "moment";
import AboutYourStatus from "./AboutYourStatus";

const ChoreChartView = () => {
  const [choreCharts, setChoreCharts] = useState<choreChart[] | undefined>([]);
  const [currentChoreChart, setCurrentChoreChart] = useState<
    choreChart | undefined
  >(undefined);
  let week = moment().year() + "-W" + moment().week();

  const loadData = () => {
    getCurrentChoreChart(week).then((data) => {
      data.template.templateChores.sort((a, b) => a.chore.rank - b.chore.rank);
      data.template.templateDays.sort((a, b) => a.day.rank - b.day.rank);
      setCurrentChoreChart(data);
    });
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
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {currentChoreChart && (
        <div className={"jumbotron border-5 border-success mt-4"}>
          <ChoreChartDisplay
            choreChart={currentChoreChart}
            title={"Chore Chart"}
          />
        </div>
      )}
      <AboutYourStatus />

      <AdminView reloadChoreCharts={loadData} />
      <CreatePreferencesView />
    </div>
  );
};

export default ChoreChartView;
