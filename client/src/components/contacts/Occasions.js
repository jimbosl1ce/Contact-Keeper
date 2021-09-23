import React, { useState } from "react";
import classes from "./Occasions.module.css";

const Occasions = () => {
  const [isActive, setIsActive] = useState(false);
  
  const isActiveHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={classes.container}>
      <button
        onClick={isActiveHandler}
        className={`${classes.btn} ${isActive ? classes.active : ""}`}
      >
        Birthday
      </button>
      <button
        onClick={isActiveHandler}
        className={`${classes.btn} ${isActive ? classes.active : ""}`}
      >
        Work Anniversary
      </button>
      <button
        onClick={isActiveHandler}
        className={`${classes.btn} ${isActive ? classes.active : ""}`}
      >
        Wedding Anniversary
      </button>

    </div>
  );
};

export default Occasions;
