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

  const [country, setCountry] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [businessDayRule, setBusinessDayRule] = React.useState("");
  const [endMonthRule, setEndMonthRule] = React.useState(false);

  const [events, setEvents] = useState([
    { date: new Date("2023/03/03"), title: "Event 1" },
    { date: new Date("2023/02/05"), title: "Event 2" },
    { date: new Date("2023/03/17"), title: "Event 3" },
    { date: new Date("2023/04/15"), title: "Event 4" },
    { date: new Date("2023/03/30"), title: "Event 5" },
    { date: new Date("2023/04/30"), title: "Event 5" },
    { date: new Date("2023/04/25"), title: "Event 5" },
  ]);

  const handleClick = () => {
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

    setEvents([
      { date: new Date("2023/04/03"), title: "Event 1" },
    ]);
  };

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
          <FormControl fullWidth>
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
          </FormControl>

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
        </Box>
      </Box>

      <Box fullWidth>
        <CalendarOutput events={events} />
      </Box>
    </Box>
  );
}
