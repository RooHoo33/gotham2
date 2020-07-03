import React, { FC, useEffect, useState } from "react";
import ManageOrderOfType from "./MangeOrderType";
import {
  chore,
  choreOrDayType,
  day,
  postChores,
  postDays,
} from "../../api/choreChartApi";
import {
  deleteChore,
  deleteDay,
  getChores,
  getDays,
  postChore,
  postDay,
} from "../../api/templateApi";

type manageOrderErrors = {
  createDayError: boolean;
  createChoreError: boolean;
};
const ManageOrder: FC<{
  setModalOpen: (open: boolean) => void;
}> = ({ setModalOpen }) => {
  const [days, setDays] = useState<choreOrDayType[]>([]);
  const [chores, setChores] = useState<choreOrDayType[]>([]);
  const [createDay, setCreateDay] = useState<day>({ id: 0, name: "", rank: 0 });
  const [createChore, setCreateChore] = useState<chore>({
    id: 0,
    name: "",
    rank: 0,
  });
  const [errors, setErrors] = useState<manageOrderErrors>({
    createChoreError: false,
    createDayError: false,
  });

  const removeDay = (id: number) => {
    deleteDay(id).then(() => {
      setDays(days.filter((value) => value.id !== id));
    });
  };

  const removeChore = (id: number) => {
    deleteChore(id).then(() => {
      setChores(chores.filter((value) => value.id !== id));
    });
  };

  const getChoresAndDays = () => {
    getDays().then((days) => setDays(days.sort((a, b) => a.rank - b.rank)));
    getChores().then((chores) =>
      setChores(chores.sort((a, b) => a.rank - b.rank))
    );
  };

  useEffect(() => {
    getChoresAndDays();
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

            <ManageOrderOfType
              choreOrDays={days}
              updateValues={setDays}
              deleteFun={removeDay}
            />
          </div>
        </div>

        <div className={"col"}>
          <div className="list-group">
            <div className={"list-group-item list-group-item-action active"}>
              <h3>Chores</h3>
            </div>

            <ManageOrderOfType
              updateValues={setChores}
              choreOrDays={chores}
              deleteFun={removeChore}
            />
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
      <div className={"mt-5 row"}>
        <div className={"col"}>
          {errors.createDayError && (
            <div className="alert alert-dismissible alert-danger">
              Error creating day. Please try again
            </div>
          )}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Create Day</label>
            <input
              type="input"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={createDay.name}
              onChange={(event) =>
                setCreateDay({ ...createDay, name: event.target.value })
              }
            />
            <button
              type="button"
              className="btn mt-4 ml-3 btn-primary"
              onClick={() => {
                if (createDay.name === "") {
                  setErrors({ ...errors, createDayError: true });
                } else {
                  postDay({ ...createDay, rank: days.length + 2 }).then(() => {
                    setErrors({ ...errors, createDayError: false });
                    setCreateDay({ id: 0, name: "", rank: 0 });
                    getChoresAndDays();
                  });
                }
              }}
            >
              save day
            </button>
          </div>
        </div>
        <div className={"col"}>
          {errors.createChoreError && (
            <div className="alert alert-dismissible alert-danger">
              Error creating chore. Please try again
            </div>
          )}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Create Chore</label>
            <input
              type="input"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={createChore.name}
              placeholder="Enter email"
              onChange={(event) =>
                setCreateChore({ ...createChore, name: event.target.value })
              }
            />
            <button
              type="button"
              className="btn mt-4 ml-3 btn-primary"
              onClick={() => {
                if (createChore.name === "") {
                  setErrors({ ...errors, createChoreError: true });
                } else {
                  postChore({ ...createChore, rank: chores.length + 2 }).then(
                    () => {
                      setErrors({ ...errors, createChoreError: false });
                      setCreateChore({ id: 0, name: "", rank: 0 });
                      getChoresAndDays();
                    }
                  );
                }
              }}
            >
              save day
            </button>
          </div>
        </div>
      </div>
      <button
        className={"btn btn-primary float-right"}
        onClick={() => setModalOpen(false)}
      >
        close
      </button>
    </div>
  );
};
export default ManageOrder;
