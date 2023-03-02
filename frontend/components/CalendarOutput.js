import React, { useState } from "react";
import Calendar from "react-calendar";
import { Box } from "@mui/material";

import "react-calendar/dist/Calendar.css";

const CalendarOutput = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { date: new Date("2023-03-03"), title: "Event 1" },
    { date: new Date("2023-02-05"), title: "Event 2" },
    { date: new Date("2023-03-13"), title: "Event 3" },
  ]);

  const highlightDates = events.map((event) => event.date);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box sx={{ display: "flex", alignItems:"center", justifyContent:"center"}}>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate || new Date()}
        //tileDisabled={({ date }) => !highlightDates.some(highlightDate => highlightDate.getTime() === date.getTime())}
        tileClassName={({ date }) =>
          highlightDates.some(
            (highlightDate) =>
              highlightDate.getDate() === date.getDate() &&
              highlightDate.getMonth() === date.getMonth() &&
              highlightDate.getFullYear() === date.getFullYear()
          )
            ? "highlight"
            : null
        }
      />
    </Box>
  );
};

export default CalendarOutput;
