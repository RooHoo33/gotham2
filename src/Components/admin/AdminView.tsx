import React, { useEffect, useState } from "react";
import { getJWT } from "../../api/securityAPI";
import {getAllUsers, saveUsers, userType} from "../../api/userApi";
import EditUserRow from "./EditUserRow";
import CreateChoreChartTemplate from "./CreateChoreChartTemplate";

const AdminView = () => {
  const [isChoreChartChairman, setIsChoreChartChairman] = useState(
    getJWT().matComChairmen
  );

  const [users, setUsers] = useState<userType[]>([]);

  const [createingTemplate, setCreatingTemplate] = useState(false)

  const loadAllUsers = () => {
      getAllUsers().then((data) =>setUsers(data));
  }

  useEffect(() => {
    loadAllUsers()
  },[]);

  if (!isChoreChartChairman) {
    return <div />;
  }

  const saveUser = (user: userType, index: number) => {
    let localUsers = [...users]
    localUsers[index] = user
    setUsers(localUsers)
  }


  return (
    <div className={"jumbotron border-5 border-warning mt-4"}>
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
      {users.map((user, index)=> {
        return <EditUserRow saveEdit={saveUser} user={user} index={index} />
      })}
      </tbody>
      </table>
        <button
            type="button"
            className="btn btn-primary"
            onClick={() => saveUsers(users).then(data => loadAllUsers())}
        >
            Save changes
        </button>
        <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCreatingTemplate(true)}
        >
            create template
        </button>
        {createingTemplate &&
           <CreateChoreChartTemplate />

        }
    </div>

  );
};
export default AdminView;
