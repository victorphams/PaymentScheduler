import React, { useState } from "react";
import Calendar from "react-calendar";
import { Box } from "@mui/material";

const CalendarOutput = ({events}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const highlightDates = events.map((event) => event.date);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Calendar
        className="react-calendar"
        onClickDay={handleDateClick}
        value={selectedDate || new Date()}
        //tileDisabled={({ date }) => !highlightDates.some(highlightDate => highlightDate.getTime() === date.getTime())}
        tileClassName={
          ({ date }) =>
            highlightDates.some(
              (highlightDate) =>
                highlightDate.getDate() === date.getDate() &&
                highlightDate.getMonth() === date.getMonth() &&
                highlightDate.getFullYear() === date.getFullYear()
            )
              ? "highlight" // Add a CSS class for highlighted dates
              : null
        }
      />
    </Box>
  );
};

export default CalendarOutput;
