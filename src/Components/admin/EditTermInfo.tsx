import React, { FC, useState } from "react";
import { postTermInformation, termInformation } from "../../api/adminApi";

const EditTermInfo: FC<{
  termInformation: termInformation;
  reloadTermInfos: () => void;
  setModalOpen: (open: boolean) => void;
}> = ({ termInformation, reloadTermInfos, setModalOpen }) => {
  const [localTermInfo, setLocalTermInfo] = useState<termInformation>(
    termInformation
  );
  return (
    <div>
      <div className={"row"}>
        <div className={"col"}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={(event) =>
                setLocalTermInfo({ ...localTermInfo, name: event.target.value })
              }
              value={localTermInfo.name}
              className="form-control"
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="normalPersonChores">
              # of normal person chores
            </label>
            <input
              type={"number"}
              onChange={(event) =>
                setLocalTermInfo({
                  ...localTermInfo,
                  numberOfChoresPerNormalPerson: parseInt(event.target.value),
                })
              }
              value={localTermInfo.numberOfChoresPerNormalPerson}
              className="form-control"
              id="normalPersonChores"
            />
          </div>
          <div className="form-group">
            <label htmlFor="greenTeamChores"># of green team chores</label>
            <input
              type={"number"}
              onChange={(event) =>
                setLocalTermInfo({
                  ...localTermInfo,
                  numberOfChoresPerGreenTeam: parseInt(event.target.value),
                })
              }
              value={localTermInfo.numberOfChoresPerGreenTeam}
              className="form-control"
              id="greenTeamChores"
            />
          </div>
        </div>
      </div>
      <div className={"mt-4"}>
        <button
          className={"btn btn-primary"}
          onClick={() =>
            postTermInformation(localTermInfo).then(() => {
              reloadTermInfos();
              setModalOpen(false);
            })
          }
        >
          save
        </button>
        <button className={"ml-2 btn"} onClick={() => setModalOpen(false)}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default EditTermInfo;
