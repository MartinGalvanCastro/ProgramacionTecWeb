import React, { useState, useEffect } from "react";
import Job from "./Job";

export const Jobs = () => {
  const [state, setState] = useState({ offers: [] });

  useEffect(() => {
    const url = "/offers";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((offers) => {
        setState({ offers });
      });
  }, []);

  return (
    <div>
      {state.offers.map((e, i) => (
        <Job key={i} offer={e} />
      ))}
    </div>
  );
};

export default Jobs;
