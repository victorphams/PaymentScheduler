import {
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { padding } from "@mui/system";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserInterface() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [country, setCountry] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [businessDayRule, setBusinessDayRule] = React.useState("");

  const [endMonthRule, setEndMonthRule] = React.useState(false);

  const handleEndMonthRule = () => {
    setEndMonthRule(!endMonthRule);
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeFrequency = (event) => {
    setFrequency(event.target.value);
  };

  const handleChangeBusinessDayRule = (event) => {
    setBusinessDayRule(event.target.value);
  };

  const handleClick = () => {
    console.log("Country: " + country 
    + "\n" + "Start Date: " + startDate
    + "\n" + "End Date: " + endDate
    + "\n" + "Frequency: " + frequency
    + "\n" + "Business Day Rule: " + businessDayRule
    + "\n" + "End of Month Rule: " + endMonthRule)
  }

  return (
    <Box sx={{ width: "60%" }}>
      <h1>Elmo 4 Lyfe</h1>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", justifyContent: "left" }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={handleChangeCountry}
            >
              <MenuItem value={"United States"}>United States</MenuItem>
              <MenuItem value={"Brazil"}>Brazil</MenuItem>
              <MenuItem value={"France"}>France</MenuItem>
              <MenuItem value={"Australia"}>Australia</MenuItem>
              <MenuItem value={"China"}>China</MenuItem>
              <MenuItem value={"South Africa"}>South Africa</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={frequency}
              label="Frequency"
              onChange={handleChangeFrequency}
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
              onChange={handleChangeBusinessDayRule}
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
              onChange={handleEndMonthRule}
            ></input>
            End Month Rule
          </label>
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          <button onClick={handleClick}>Search!</button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "gray",
          height: "60%",
          width: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          spacing: "0",
          overflow: "auto",
          position: "absolute",
          textAlign: "center",
        }}
      >
        <h1>Output</h1>
      </Box>
    </Box>
  );
}
