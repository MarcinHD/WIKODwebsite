import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [expand, setExpand] = useState([
    {
      display: "none"
    },
    1,
    false
  ]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
    const expanded = [
      {
        display: "none"
      },
      1,
      false
    ];
    setExpand(expanded);
  }

  function newNoteClicked() {
    const expanded = [
      {
        display: "inline"
      },
      3,
      true
    ];
    setExpand(expanded);
  }

  function mouseOut() {}

  return (
    <div>
      <form className="create-note">
        <input
          style={expand[0]}
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          onClick={newNoteClicked}
          // onMouseOut={mouseOut}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={expand[1]}
        />
        <Zoom in={expand[2]}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
