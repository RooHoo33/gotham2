import React, { FC, useEffect } from "react";
import { useState } from "react";

const StatusBarTicker: FC<{
  submitting: boolean;
  setSubmitting: (isSubmitting: boolean) => void;
}> = ({ submitting, setSubmitting }) => {
  const [percent, setPercent] = useState(0);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    updateThing().then((r) => null);
  });

  const updateThing = async () => {
    if (submitting && percent < 300) {
      await sleep(50);
      setPercent(percent + 10);
    } else {
      setSubmitting(false);
      setPercent(0);
    }
  };
  return (
    <div>
      {percent >= 300 || percent === 0 ? (
        <div />
      ) : (
        <div className="progress mt-4">
          <div
            className="progress-bar progress-bar-animated progress-bar-striped bg-success"
            role="progressbar"
            style={{ width: percent + "%" }}
          />
        </div>
      )}
    </div>
  );
};
export default StatusBarTicker;
