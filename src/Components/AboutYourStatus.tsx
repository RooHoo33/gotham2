import React, { useEffect, useState } from "react";
import { getNumberOfChores, userChoresNumberType } from "../api/choreChartApi";
import { Doughnut } from "react-chartjs-2";

const AboutYourStatus = () => {
  const [userChoresNumberType, setUserChoresNumberType] = useState<
    userChoresNumberType | undefined
  >(undefined);

  useEffect(() => {
    getNumberOfChores().then((data) => setUserChoresNumberType(data));
  }, []);
  if (!userChoresNumberType) {
    return <div />;
  }
  return (
    <div className={"jumbotron border-5 border-info mt-4"}>
      <div className={"row mr-5 ml-5"}>
        <div className={"col"}>
          <p className="font-weight-normal ">
            Green Team:{" "}
            {userChoresNumberType.greenTeam.toString().toUpperCase()}
          </p>

          <p>Total Chores Needed: {" " + userChoresNumberType.total}</p>
          <p>Completed Chores:{" " + userChoresNumberType.completed}</p>
        </div>
        <div className={"col"}>
          <Doughnut
            options={{
              elements: {
                arc: {
                  borderWidth: 0,
                },
              },
            }}
            data={{
              labels: ["Completed", "Still to go"],
              datasets: [
                {
                  data: [
                    userChoresNumberType.completed,
                    userChoresNumberType.total - userChoresNumberType.completed,
                  ],
                  backgroundColor: ["#7235b8", "#36A2EB"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutYourStatus;
