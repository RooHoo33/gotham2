import React, { useEffect, useState } from "react";
import { getJWT } from "../../api/securityAPI";
import {getAllUsers, saveUsers, userType} from "../../api/userApi";
import EditUserRow from "./EditUserRow";
import CreateChoreChartTemplate from "./CreateChoreChartTemplate";
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        top: "0",
        left: "0",
        right: "0",
        border: "0",

        bottom: "0",
        backgroundColor: 'rgba(48, 48, 48, 0.75)'
    },
    content: {
        width: "700px",
        margin:"auto",
        height: "400px",
        borderStyle: "solid",
        borderColor: "#222",
        borderWidth:"4px",


        border: "0",
        background: '#303030',
        overflow: 'auto',
        outline: 'none',
        padding: '20px'
    }
}

const AdminView = () => {
  const [isChoreChartChairman, setIsChoreChartChairman] = useState(
    getJWT().matComChairmen
  );

  const [createTemplateOpen, setCreateTemplateOpen] = useState(false)

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
<div style={{width: "60%"}}>
    <Modal
        isOpen={createTemplateOpen}
        style={customStyles}
        onAfterOpen={()=>{}}
        onRequestClose={()=>{}}
        contentLabel="Example Modal"
    >
        <button type="button" className="close float-right" onClick={() => setCreateTemplateOpen(false)} aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <CreateChoreChartTemplate />
        <button type="button" className="btn mt-4 btn-warning" onClick={()=>{setCreateTemplateOpen(false)}}>canel</button>

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
            className="btn ml-3 btn-primary"
            onClick={() => setCreateTemplateOpen(true)}
        >
            create template
        </button>
        {/*{createingTemplate &&*/}


        {/*}*/}
    </div>

  );
};
export default AdminView;