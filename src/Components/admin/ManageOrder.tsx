import React, { FC, useEffect, useState } from "react";
import ManageOrderOfType from "./MangeOrderType";
import {
  chore,
  choreOrDayType,
  day,
  postChores,
  postDays,
} from "../../api/choreChartApi";
import { getChores, getDays } from "../../api/templateApi";
const ManageOrder: FC<{
  setModalOpen: (open: boolean) => void;
}> = ({ setModalOpen }) => {
  const [days, setDays] = useState<choreOrDayType[]>([]);
  const [chores, setChores] = useState<choreOrDayType[]>([]);

  useEffect(() => {
    getDays().then((days) => setDays(days.sort((a, b) => a.rank - b.rank)));
    getChores().then((chores) =>
      setChores(chores.sort((a, b) => a.rank - b.rank))
    );
  }, []);

  const submit = async () => {
    await postChores(chores);
    await postDays(days);
    window.location.reload();
  };

  return (
    <div>
      <div className={"row"}>
        <div className={"col"}>
          <div className="list-group">
            <div className={"list-group-item list-group-item-action active"}>
              <h3>Days</h3>
            </div>

            <ManageOrderOfType choreOrDays={days} updateValues={setDays} />
          </div>
        </div>

        <div className={"col"}>
          <div className="list-group">
            <div className={"list-group-item list-group-item-action active"}>
              <h3>Chores</h3>
            </div>

            <ManageOrderOfType updateValues={setChores} choreOrDays={chores} />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn mt-4 ml-3 btn-primary"
        onClick={() => submit()}
      >
        save order
      </button>
    </div>
  );
};
export default ManageOrder;
