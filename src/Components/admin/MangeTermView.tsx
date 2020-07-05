import React, { FC, useEffect, useState } from "react";
import {
  getTermInformations,
  postTermInfoAsActive,
  termInformation,
} from "../../api/adminApi";
import { customStyles } from "../../resources/ReactModalConfig";
import Modal from "react-modal";
import EditTermInfo from "./EditTermInfo";
import { useToasts } from "react-toast-notifications";
export type whoEditingType = {
  termInformationId: number;
  editing: boolean;
};

const ManageTermView: FC<{ setModalOpen: (open: boolean) => void }> = ({
  setModalOpen,
}) => {
  const { addToast } = useToasts();
  const [termInformations, setTerminformations] = useState<termInformation[]>(
    []
  );
  const blankTermInfo: termInformation = {
    active: false,
    name: "",
    numberOfChoresPerNormalPerson: 0,
    numberOfChoresPerGreenTeam: 0,
    id: 0,
  };
  const [editTermInfo, setEditTermInfo] = useState(false);
  const [editing, setEditing] = useState<termInformation>(blankTermInfo);
  const loadTermInformations = () => {
    getTermInformations().then(setTerminformations);
  };

  const setTermInfoAsActive = (termInfoId: number) => {
    postTermInfoAsActive(termInfoId).then(() => {
      loadTermInformations();
      addToast("Active Term Updated", { appearance: "success" });
    });
  };

  useEffect(() => {
    loadTermInformations();
  }, []);
  return (
    <div className={"mt-4"}>
      <Modal
        isOpen={editTermInfo}
        style={{
          ...customStyles,
          content: {
            ...customStyles.content,
            height: "360px",
            width: "350px",
          },
        }}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        contentLabel="Example Modal"
      >
        <button
          type="button"
          className="close float-right"
          onClick={() => setEditTermInfo(false)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <EditTermInfo
          reloadTermInfos={loadTermInformations}
          termInformation={editing}
          setModalOpen={setEditTermInfo}
        />
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th scope={"col"}>Name</th>
            <th scope={"col"}>normal # of chores</th>
            <th scope={"col"}>green team # of chores</th>
            <th scope={"col"}>active</th>
            <th scope={"col"}>edit</th>
          </tr>
        </thead>
        <tbody>
          {termInformations.map((termInformation) => {
            return (
              <tr>
                <th scope="row">{termInformation.name}</th>
                <td>{termInformation.numberOfChoresPerNormalPerson}</td>
                <td>{termInformation.numberOfChoresPerGreenTeam}</td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => setTermInfoAsActive(termInformation.id)}
                    style={{
                      transform: "scale(1.25)",
                    }}
                    checked={termInformation.active}
                  />
                </td>
                <td
                  onClick={() => {
                    setEditing(termInformation);
                    setEditTermInfo(true);
                  }}
                >
                  <i className="fa fa-pencil" aria-hidden="true" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className={"btn btn-primary"}
        onClick={() => {
          setEditing(blankTermInfo);
          setEditTermInfo(true);
        }}
      >
        add
      </button>
      <button className={"btn ml-2"} onClick={() => setModalOpen(false)}>
        close
      </button>
    </div>
  );
};

export default ManageTermView;
