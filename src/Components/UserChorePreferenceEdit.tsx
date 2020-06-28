import { userChoreChartPreference } from "../api/choreChartApi";
import React, { FC } from "react";

type asdf = {
  onSubmit: (newRank: number, currentValue: userChoreChartPreference) => void;
  userChorePreference: userChoreChartPreference;
  numberOfPreferences: number | undefined;
};
const UserChorePrefrenceEdit: FC<asdf> = ({
  onSubmit,
  userChorePreference,
  numberOfPreferences,
}) => {
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    onSubmit(parseInt(e.currentTarget.value), userChorePreference);
  };
  return (
    <>
      <select
        onChange={handleOnChange}
        value={userChorePreference.rank}
        className={
          "form-control " + (userChorePreference.rank === 0 ? "bg-dark" : "")
        }
        id="exampleSelect2"
      >
        {Array.from(new Array(numberOfPreferences), (x, i) => (
          <option value={i}>{i}</option>
        ))}
      </select>
    </>
  );
};

export default UserChorePrefrenceEdit;
