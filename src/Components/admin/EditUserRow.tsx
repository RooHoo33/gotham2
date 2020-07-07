import {
  postSaveUserActive,
  postSaveUserGreenTeam,
  userType,
} from "../../api/userApi";
import React, { FC } from "react";

const EditUserRow: FC<{
  refreshOnSave: () => void;
  user: userType;
  index: number;
}> = ({ refreshOnSave, user, index }) => {
  return (
    <tr>
      <th scope="row">{user.associateMemeber ? "" : user.kappaSigma}</th>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td align={"center"} className={" align-content-center"}>
        <input
          className="form-check-input"
          type="checkbox"
          style={{
            transform: "scale(1.25)",
          }}
          onChange={(event) => {
            user.greenTeam = !user.greenTeam;
            postSaveUserGreenTeam(user).then(() => refreshOnSave());
          }}
          checked={user.greenTeam}
        />
      </td>
      <td align={"center"} className={" align-content-center"}>
        <input
          className="form-check-input"
          type="checkbox"
          style={{
            transform: "scale(1.25)",
          }}
          onChange={(event) => {
            user.active = !user.active;
            postSaveUserActive(user).then(() => refreshOnSave());
          }}
          checked={user.active}
        />
      </td>
    </tr>
  );
};
export default EditUserRow;
