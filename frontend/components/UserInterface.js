import { Box, Select, FormControl, InputLabel, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserInterface() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [country, setCountry] = React.useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };


  return (
    <Box sx={{ width: "80%" }}>
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
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />

          <button variant="outlined">Units of Time</button>
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          <button>Search!</button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "gray",
          height: "100%",
          alignItems: "stretch",
          justify: "center",
          spacing: "0",
        }}
      >
        <h1>Output</h1>
      </Box>
    </Box>
  );
}