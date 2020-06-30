import React, { useEffect, useState } from "react";
import { getJWT } from "../../api/securityAPI";
import { getAllUsers, saveUsers, userType } from "../../api/userApi";
import EditUserRow from "./EditUserRow";
import CreateChoreChartTemplate from "./CreateChoreChartTemplate";
import Modal from "react-modal";
import { useToasts } from "react-toast-notifications";
import ManageTemplates from "./ManageTemplates";
import ManageOrder from "./ManageOrder";
import { customStyles } from "../../resources/ReactModalConfig";

const AdminView = () => {
  const { addToast } = useToasts();

  const [isChoreChartChairman] = useState(getJWT().matComChairmen);

  const [createTemplateOpen, setCreateTemplateOpen] = useState(false);

  const [users, setUsers] = useState<userType[]>([]);

  const [manageTemplates, setManageTemplates] = useState(false);
  const [mangeOrder, setManageOrder] = useState(false);

  const loadAllUsers = () => {
    getAllUsers().then((data) => setUsers(data));
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  if (!isChoreChartChairman) {
    return <div />;
  }

  const saveUser = (user: userType, index: number) => {
    let localUsers = [...users];
    localUsers[index] = user;
    setUsers(localUsers);
  };

  return (
    <div className={"jumbotron border-5 border-warning mt-4"}>
      <div style={{ width: "60%" }}>
        <Modal
          isOpen={manageTemplates}
          style={{
            ...customStyles,
            content: {
              ...customStyles.content,
              height: "650px",
            },
          }}
          onAfterOpen={() => {}}
          onRequestClose={() => {}}
          contentLabel="Example Modal"
        >
          <button
            type="button"
            className="close float-right"
            onClick={() => setManageTemplates(false)}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <ManageTemplates setModalOpen={setManageTemplates} />
        </Modal>
        <Modal
          isOpen={mangeOrder}
          style={{
            ...customStyles,
            content: {
              ...customStyles.content,
              height: "650px",
            },
          }}
          onAfterOpen={() => {}}
          onRequestClose={() => {}}
          contentLabel="Example Modal"
        >
          <button
            type="button"
            className="close float-right"
            onClick={() => setManageOrder(false)}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <ManageOrder setModalOpen={setManageOrder} />
        </Modal>
      </div>

      <h1 className="display-8 mb-3">Admin</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">kappa sigma</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">active?</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <EditUserRow saveEdit={saveUser} user={user} index={index} />
            );
          })}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          saveUsers(users).then(() => {
            addToast("Users Saved", { appearance: "success" });

            loadAllUsers();
          });
        }}
      >
        Save changes
      </button>

      <button
        type="button"
        className="btn ml-3 btn-primary"
        onClick={() => setManageTemplates(true)}
      >
        manage templates
      </button>

      <button
        type="button"
        className="btn ml-3 btn-primary"
        onClick={() => setManageOrder(true)}
      >
        manage order
      </button>
    </div>
  );
};
export default AdminView;
