import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Box } from "@mui/material";

const CalendarOutput = ({ events, holidays }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const highlightDates = events.map((event) => event.date);
  const holidayDates = holidays.map((holiday) => holiday.date);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // Trigger any necessary logic or side effect when events or holidays change
    // For example, you can fetch updated data, update state, or make API calls
    // This effect will run whenever events or holidays change
    console.log("Events or holidays changed:", events, holidays);
  }, [events, holidays]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Calendar
        className="react-calendar"
        onClickDay={handleDateClick}
        value={selectedDate || new Date()}
        tileClassName={({ date }) =>
          highlightDates.some(
            (highlightDate) =>
              highlightDate.getDate() === date.getDate() &&
              highlightDate.getMonth() === date.getMonth() &&
              highlightDate.getFullYear() === date.getFullYear()
          )
            ? "highlight" // Add a CSS class for highlighted dates
            : holidayDates.some(
                (holidayDate) =>
                  holidayDate.getDate() === date.getDate() &&
                  holidayDate.getMonth() === date.getMonth() &&
                  holidayDate.getFullYear() === date.getFullYear()
              )
            ? "holidays" // Add a CSS class for holiday dates
            : null
        }
      />
    </Box>
  );
};

export default CalendarOutput;