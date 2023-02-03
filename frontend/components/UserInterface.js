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

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <Box sx={{ width: "60%" }}>
      <h1>Group 2</h1>

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
              onChange={handleChange}
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

          <button>Units of Time</button>
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          <button>Search!</button>
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
