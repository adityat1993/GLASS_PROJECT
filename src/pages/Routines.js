
import React, { useEffect, useState } from "react";

import Drawer from "../components/nav/Drawer/Drawer";
import App from "../components/ui/App/App1";
import UserController from "./Controller/User";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";
const moment = require("moment");

const RoutinesPage = (props) => {
  const [ActiveRoutine, setActiveRoutine] = useState(null);
  const [ActiveRoutineTitle, setActiveRoutineTitle] = useState("");
  const [Routines, setRoutines] = useState([
  ]);
  useEffect(() => {
    UserController.getActiveRoutine((response) => {
      console.log("setting getActiveRoutine ", response.data.data);
      console.log(response.data);
      setRoutines(response.data.data);
    });
  }, []);

  const dateChangeHandler = (date) => {
  };

  const toggleStatus = (id) => {
    let updateRoutine = Routines.filter((routine) => routine._id === id)[0];
    let otherRoutines = Routines.filter((routine) => routine._id !== id);
    updateRoutine.done = !updateRoutine.done;
    let routines = [updateRoutine, ...otherRoutines].sort(
      (a, b) => a._id > b._id
    );
    setRoutines(routines);

    var today = moment().format("YYYY-MM-DD");
    var date1 = JSON.stringify(today);
    let formdata = {
      userId: updateRoutine.userId,
      description: updateRoutine.description,
      days: [
        updateRoutine.days[0],
        updateRoutine.days[1],
        updateRoutine.days[2],
        updateRoutine.days[3],
        updateRoutine.days[4],
        updateRoutine.days[5],
        updateRoutine.days[6],
      ],
      history: { [date1]: true },
    };
    console.log("fromdata", formdata);
    UserController.updateRoutineHistory(formdata, (result) => {
      UserController.getActiveRoutine((response) => {
        console.log("setting getActiveRoutine ", response.data.data);
        console.log(response.data);
        setRoutines(response.data.data);
      });
    });
  };

  const getRoutines = () => {
    let routinesDOM = [];
    Routines.sort((a, b) => a.done < b.done).map((routine) => {
      routinesDOM.push(
        <div className="routines__app__body__list" key={routine._id}>
          {routine.history ? (
            <div
              className="routines__app__body__done"
              onClick={() => {
                toggleStatus(routine._id);
              }}
            />
          ) : (
            <div
              className="routines__app__body__undone"
              onClick={() => {
                toggleStatus(routine._id);
              }}
            />
          )}
          <div
            className="routines__app__body__item typo"
            onClick={() => {
              setActiveRoutine(routine._id);
              setActiveRoutineTitle(routine.description);
            }}
          >
            {routine.description}
          </div>
        </div>
      );
    });

    return routinesDOM;
  };
  return (
    <main>
      <Drawer history={props.history} />
      <div className="routines__container">
        <div className="routines__container__content">
          <App onDateChange={dateChangeHandler} hasCalendar={true}>
            {getRoutines()}
          </App>
        </div>
      </div>
    </main>
  );
};

export default RoutinesPage;

