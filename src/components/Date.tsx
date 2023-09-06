"use client";
import { useState, useEffect } from "react";

function DateCurrent({ daysOffset }: { daysOffset: number }) {
  const [day, setDay] = useState("");

  useEffect(() => {
    const getDate = () => {
      const optionsDate: Intl.DateTimeFormatOptions = { weekday: "long" };
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + daysOffset);
      return currentDate
        .toLocaleDateString("es-ES", optionsDate)
        .toLocaleUpperCase();
    };
    setDay(getDate());
  }, [daysOffset]);

  return day;
}

export default DateCurrent;
