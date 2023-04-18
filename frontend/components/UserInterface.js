import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import CalendarOutput from "./CalendarOutput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function UserInterface() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [frequencyType, setFrequencyType] = useState("");
  const [frequencyAmount, setFrequencyAmount] = useState("");

  const [country, setCountry] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [businessDayRule, setBusinessDayRule] = React.useState("");
  const [endMonthRule, setEndMonthRule] = React.useState(false);

  const [events, setEvents] = useState([]);

  const handleFrequencyAmountChange = (event) => {
    const inputVal = event.target.value;
    // Validate if the input is a positive number or not
    if (!isNaN(inputVal) && inputVal >= 0) {
      setFrequencyAmount(inputVal);
    }
  };

  const handleClick = async () => {
    console.log(
      "Country: " +
        country +
        "\n" +
        "Start Date: " +
        new Date(startDate).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }) +
        "\n" +
        "End Date: " +
        new Date(endDate).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }) +
        "\n" +
        "Frequency: " +
        frequency +
        "\n" +
        "Business Day Rule: " +
        businessDayRule +
        "\n" +
        "End of Month Rule: " +
        endMonthRule
    );

    fetch("http://localhost:5000/paymentscheduler/usholidays").then(
      (response) =>
        response.json().then((data) => {
          let dates = data.USholidays.map((event) => {
            const eventDate = new Date(event[0]);
            eventDate.setDate(eventDate.getDate() + 1); // Add 1 day to the date
            return {
              date: eventDate,
              title: event[1],
            };
          });
          setEvents(dates);
        })
    );
  };

  function sendData() {
    fetch("http://localhost:5000/paymentscheduler/send-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country,
        startDate: new Date(startDate).toLocaleDateString(),
        endDate: new Date(endDate).toLocaleDateString(),
        frequency: frequency,
        businessDayRule: businessDayRule,
        endMonthRule: endMonthRule,
        frequencyType: frequencyType,
        frequencyAmount: frequencyAmount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let dates = data.dates.map((event) => {
          const eventDate = new Date(event);
          return {
            date: eventDate,
            title: event[1],
          };
        });
        setEvents(dates);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Box sx={{ width: "60%" }}>
      <h1>MSCI: Payment Scheduler</h1>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            margin: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={(event) => setCountry(event.target.value)}
            >
              <MenuItem value={"United States"}>United States</MenuItem>
              <MenuItem value={"Brazil"}>Brazil</MenuItem>
              <MenuItem value={"France"}>France</MenuItem>
              <MenuItem value={"Australia"}>Australia</MenuItem>
              <MenuItem value={"China"}>China</MenuItem>
              <MenuItem value={"South Africa"}>South Africa</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            margin: 2,
          }}
        >
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={frequency}
              label="Frequency"
              onChange={(event) => setFrequency(event.target.value)}
            >
              <MenuItem value={"Annual"}>Annual</MenuItem>
              <MenuItem value={"Semiannual"}>Semiannual</MenuItem>
              <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
              <MenuItem value={"Bimonthly"}>Bimonthly</MenuItem>
              <MenuItem value={"Monthly"}>Monthly</MenuItem>
              <MenuItem value={"Weekly"}>Weekly</MenuItem>
            </Select>
          </FormControl> */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Frequency Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={frequencyType}
              label="Frequency Type"
              onChange={(event) => setFrequencyType(event.target.value)}
            >
              <MenuItem value={"Days"}>Days</MenuItem>
              <MenuItem value={"Months"}>Months</MenuItem>
              <MenuItem value={"Years"}>Years</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            value={frequencyAmount}
            onChange={(event) => handleFrequencyAmountChange(event)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Business Day Rule
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={businessDayRule}
              label="Business Day Rule"
              onChange={(event) => setBusinessDayRule(event.target.value)}
            >
              <MenuItem value={"Following"}>Following</MenuItem>
              <MenuItem value={"Preceding"}>Preceding</MenuItem>
              <MenuItem value={"Modified Following"}>
                Modified Following
              </MenuItem>
              <MenuItem value={"Modified Preceding"}>
                Modified Preceding
              </MenuItem>
            </Select>
          </FormControl>

          <label>
            <input
              type="checkbox"
              checked={endMonthRule}
              onChange={() => setEndMonthRule(!endMonthRule)}
              disabled={frequency === "Weekly"}
            ></input>
            End Month Rule
          </label>
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          <button onClick={handleClick}>Calculate!</button>
          <button onClick={sendData}>Send Data to Flask App</button>
        </Box>
      </Box>

      <Box>
        <CalendarOutput events={events} />
      </Box>
    </Box>
  );
}
