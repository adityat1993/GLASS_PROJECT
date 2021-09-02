import React, { useState, useEffect } from "react";

import Drawer from "../components/nav/Drawer/Drawer";
import App from "../components/ui/App/App";
import { io } from "socket.io-client";
import UserController from "./Controller/User";

let googleid = localStorage.getItem(`google`);
const moment = require("moment");

const TasksPage = (props) => {
  const [ActiveTask, setActiveTask] = useState(null);
  const [ActiveTaskTitle, setActiveTaskTitle] = useState("");
  const [socket, setSocket] = useState(null);
  const [Date, setDate] = useState("");
  const [TaskLength, setTaskLength] = useState("");
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    const s = io('https://dev.this.glass', { secure: true });
    setSocket(s);
    UserController.getuserAlldata((response) => {
      let taskList = [];
      console.log(Date);
      if (Date !== "") {
        let selectedNotes = response.data.data.filter((elem) => {
          return elem.date === Date;
        });

        let falseTask = selectedNotes[0].doneArray.filter((ele, i) => ele === false);
        if (falseTask.length !== 0) {
          setTaskLength(falseTask.length);
        }

        if (selectedNotes.length) {
          selectedNotes[0].taskArray.forEach((element, index) => {
            taskList.push({
              id: "task-" + index + 2,
              done: selectedNotes[0].doneArray[index]
                ? selectedNotes[0].doneArray[index]
                : false,
              title: element,
            });
          });
        }
      }
      setTasks(taskList);
    });
  }, [Date]);

  const saveTask = () => {
    var today = moment().format("YYYY-MM-DD");
    let taskArray = [];
    let doneArray = [];
    console.log(Tasks, ";;;;;;;;;");
    Tasks.forEach((element) => {
      taskArray.push(element.title);
      doneArray.push(element.done);
    });
    if (socket.connected) {
      const payload = {
        userId: googleid,
        date: today,
        taskArray: taskArray,
        doneArray: doneArray,
      };
      socket.emit("editTasks", payload);
    }
  };

  const dateChangeHandler = (date) => {
    let EveryDay = moment(date).format("YYYY-MM-DD");
    setDate(EveryDay);
  };

  const toggleStatus = (id) => {

    let updateTask = Tasks.filter((task) => task.id === id)[0];
    let otherTasks = Tasks.filter((task) => task.id !== id);
    updateTask.done = !updateTask.done;
    let tasks = [...otherTasks, updateTask].sort((a, b) => a.id > b.id);
    setTasks(tasks);

    var today = moment().format("YYYY-MM-DD");
    let taskArray = [];
    let doneArray = [];
    tasks.forEach((element) => {
      taskArray.push(element.title);
      doneArray.push(element.done);
    });
    if (socket.connected) {
      const payload = {
        userId: googleid,
        date: today,
        taskArray: taskArray,
        doneArray: doneArray,
      };
      socket.emit("editTasks", payload);
    }
  };


  const _handleKeyDown = (e) => {
    console.log("eeeeeee", e);
    if (e.key === "Enter") {
      createNewTask();
    }
  };

  const createNewTask = () => {
    console.log("tasks", Tasks);
    setTasks((old) =>
      [
        ...old,
        {
          id: "task-" + old.length + 2,
          done: false,
          title: "New Task",
        },
      ].sort((a, b) => a.id > b.id)
    );
    var today = moment().format("YYYY-MM-DD");
    let taskArray = [];
    let doneArray = [];
    Tasks.forEach((element) => {
      taskArray.push(element.title);
      doneArray.push(element.done);
    });
    if (socket.connected) {
      const payload = {
        userId: googleid,
        date: today,
        taskArray: taskArray,
        doneArray: doneArray,
      };
      socket.emit("editTasks", payload);
    }
  };

  const getTasks = () => {
    let tasksDOM = [];
    Tasks.sort((a, b) => a.done < b.done).map((task) => {

      tasksDOM.push(
        <div className="tasks__app__body__list" key={task.id}>
          {task.done ? (
            <div
              className="tasks__app__body__done"
              onClick={() => {
                toggleStatus(task.id);
              }}
            />
          ) : (
            <div
              className="tasks__app__body__undone"
              onClick={() => {
                toggleStatus(task.id);
              }}
            />
          )}
          <div
            className="tasks__app__body__item typo"
            onClick={() => {
              setActiveTask(task.id);
              setActiveTaskTitle(task.title);
            }}
          >
            {ActiveTask === task.id ? (
              <input
                id={task.id}
                className="tasks__app__body__item__edit typo typo__b"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    event.stopPropagation();
                    let updateTask = Tasks.filter((v, i) => {
                      return v.id === ActiveTask;
                    })[0];
                    let oldTasks = Tasks.filter((v, i) => {
                      return v.id !== ActiveTask;
                    });
                    updateTask[0].title = ActiveTaskTitle;
                    let tasks = [updateTask[0], ...oldTasks].sort(
                      (a, b) => a.id > b.id
                    );
                    setTasks(tasks);
                    setActiveTask(null);
                  }

                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    var ddd = document.getElementById(task.id);
                    var firstVal = ddd.value.substr(0, ddd.selectionStart);
                    var secondVal = ddd.value.substr(
                      ddd.selectionStart,
                      ddd.value.length
                    );
                    let updateTask = Tasks.filter((v, i) => {
                      return v.id === ActiveTask;
                    })[0];
                    let oldTasks = Tasks.filter((v, i) => {
                      return v.id !== ActiveTask;
                    });
                    updateTask.title = firstVal;
                    let tasks = [...oldTasks, updateTask].sort(
                      (a, b) => a.id > b.id
                    );
                    tasks.push({
                      title: secondVal,
                      done: false,
                      id: "task-" + tasks.length + 2,
                    });
                    setTasks(tasks);
                    setActiveTask(null);
                    saveTask();
                  }
                }}
                value={ActiveTaskTitle}
                onChange={(e) => {
                  setActiveTaskTitle(e.target.value);
                }}
                autoFocus
              />

            ) : (
              task.title
            )}
          </div>
        </div>
      );
    });
    return tasksDOM;
  };

  return (
    <main>
      <Drawer history={props.history} data={TaskLength} />
      <div className="tasks__container">
        <div className="tasks__container__content">
          <App onDateChange={dateChangeHandler.bind()} hasCalendar={true}>
            {getTasks()}
            <div
              style={{ flex: 1, width: "100%", cursor: "text", animationName: "blink" }}
              onClick={() => {
                createNewTask();
              }}
            >
            </div>
          </App>
        </div>
      </div>
    </main>
  );
};

export default TasksPage;
