"use client";
import { useState, useEffect } from "react";

function DateCurrent() {
  const [day, setDay] = useState("");

  useEffect(() => {
    const getDate = () => {
      const optionsDate: Intl.DateTimeFormatOptions = { weekday: "long" };
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      return currentDate
        .toLocaleDateString("es-ES", optionsDate)
        .toLocaleUpperCase();
    };
    setDay(getDate());
  }, []);

  return day;
}

export default DateCurrent;
