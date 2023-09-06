"use client";
import { Task } from "@prisma/client";
import axios from "axios";
// import CheckEnd from "./CheckEnd";
import { useState } from "react";

interface Props {
  tas: Task;
}

function End({ tas }: Props) {
  const [checked, setChecked] = useState(tas.end);

  function handleCheckboxChange() {
    const newEndValue = !checked;
    setChecked(newEndValue);
    try {
      axios.put(`/api/tasks/${tas.id}`, { end: newEndValue });
    } catch (error) {
      console.error("Error al actualizar tas.end:", error);
    }
  }
  return (
    <div>
      <label>
        <span>{"End? "} </span>
        {tas.end === null ? (
          <input type="checkbox" checked={false} readOnly />
        ) : (
          <input
            type="checkbox"
            // checked={tas.end !== null ? tas.end : false}
            checked={checked ? checked : false}
            onChange={() => {
              handleCheckboxChange();
            }}
            readOnly
          />
        )}
      </label>
    </div>
  );
}

export default End;
