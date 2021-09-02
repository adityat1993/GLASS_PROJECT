import React, { useEffect, useState } from "react";

import Drawer from "../components/nav/Drawer/Drawer";
import App from "../components/ui/App/App";
import UserController from "./Controller/User";
import { io } from "socket.io-client";

let googleid = localStorage.getItem(`google`);
const moment = require("moment");
const s = io("https://dev.this.glass", { secure: true });

const NotesPage = (props) => {
  const [ActiveNote, setActiveNote] = useState(null);
  const [ActievNoteTitle, setActievNoteTitle] = useState(null);
  const [ActiveNoteBody, setActiveNoteBody] = useState([]);
  const [socket, setSocket] = useState(null);

  const [Date, setDate] = useState("");
  const [NotesLength, setNotesLength] = useState("");

  const [Notes, setNotes] = useState([]);
  var today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    setSocket(s);

    UserController.getuserAlldata((response) => {
      setNotesLength(response.data.data.length);

      var arrobj = [];
      response.data.data.forEach((element) => {
        if (Date == element.date) {
          arrobj.push(element);
          console.log("ActiveNoteBody :::::::", ActiveNoteBody);
          setNotes(arrobj);
        }
      });
    });
    console.log("socket.emit: ActiveNoteBody:", socket);
  }, [Date, ActiveNoteBody]);

  // Create the socket and set it in state
  const dateChangeHandler = (date) => {
    let EveryDay = moment(date).format("YYYY-MM-DD");
    setDate(EveryDay);

  };

  const onNoteChange = (e) => {

    setActiveNoteBody(e.target.value);
    console.log("e.target.value", e.target.value);
    const payload = {
      userId: googleid,
      date: Date,
      notebook: ActiveNoteBody,
    };

    socket.emit("editNotebook", payload);
  }



  const createNewNote = () => {
    if (Notes.length <= 0) {
      setNotes([
        {
          _id: "notes-",
          taskArray: ["New Note"],
          notebook: ActiveNoteBody.length === 0 ? "double click to edit this note" : ActiveNoteBody,
        },
      ]);

      const payload = {
        userId: googleid,
        date: Date,
        notebook: ActiveNoteBody,
      };
      console.log("payload ::::::", payload);
      console.log("socket.emit:::", socket);

      socket.emit("editNotebook", payload);
    }
  };


  const getNotes = () => {
    let notesDOM = [];
    Notes.map((note) => {
      notesDOM.push(
        <div className="notes__app__body__note" key={note._id}>
          <div
            className="notes__app__body__note__title typo typo__b"
            onClick={() => {
              setActiveNote(note._id);
              setActievNoteTitle(note.taskArray);
              setActiveNoteBody(note.notebook);
            }}
          >
          </div>
          <div
            className="notes__app__body__note__body typo typo__b"
            onClick={() => {
              setActiveNote(note._id);
              setActievNoteTitle(note.taskArray);
              setActiveNoteBody(note.notebook);
            }}
          >
            {ActiveNote === note._id ? (
              <textarea
                className="notes__app__body__note__body__edit typo typo__b"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === "Escape") {
                    event.preventDefault();
                    event.stopPropagation();
                    let updateNote = Notes.filter((v, i) => {
                      return v._id === ActiveNote;
                    })[0];
                    let oldNotes = Notes.filter((v, i) => {
                      return v._id !== ActiveNote;
                    });
                    updateNote.notebook = ActiveNoteBody;
                    updateNote.taskArray = ActievNoteTitle;
                    let notes = [updateNote, ...oldNotes].sort(
                      (a, b) => a._id > b._id
                    );
                    setNotes(notes);
                    setActiveNote(null);
                  }
                }}
                value={ActiveNoteBody}
                onChange={(e) => {
                  onNoteChange(e);
                }}
              />
            ) : (
              note.notebook
            )}
          </div>
        </div>
      );
    });
    return notesDOM;
  };

  return (
    <main>
      <Drawer history={props.history} notes={NotesLength} />
      <div className="notes__container">
        <div className="notes__container__content">
          <App onDateChange={dateChangeHandler.bind()} hasCalendar={true}>
            {getNotes()}
            <div
              style={{ flex: 1, width: "100%", minHeight: "5rem" }}
              onClick={() => createNewNote()}
            />
          </App>
        </div>
      </div>
    </main>
  );
};

export default NotesPage;
