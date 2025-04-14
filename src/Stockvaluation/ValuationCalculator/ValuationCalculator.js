import React, { useState, useEffect } from "react";
import { Slider, TextField, Button, Typography, Box } from "@mui/material";
import "./ValuationCalculator.css";

const ValuationCalculator = () => {
  const [epsGrowthRate, setEpsGrowthRate] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [futurePE, setFuturePE] = useState(10);
  const [baseEPS, setBaseEPS] = useState(10);
  const [dps, setDPS] = useState(20);
  const [mos, setMOS] = useState(0);
  const [mrp, setMRP] = useState(0);
  const [dp, setDP] = useState(0);
  const [activeButton, setActiveButton] = useState("base"); // Tracks active button

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  // Function to calculate MRP
  const calculateMRP = () => {
    const futureEPS = baseEPS * (1 + epsGrowthRate / 100);
    return (futureEPS * futurePE).toFixed(2);
  };

  // Function to calculate DP (now includes DPS)
  const calculateDP = () => {
    return (calculateMRP() * (1 - mos / 100) * (1 + rateOfReturn / 100) + dps).toFixed(2);
  };

  // Update MRP and DP whenever relevant state changes
  useEffect(() => {
    setMRP(calculateMRP());
    setDP(calculateDP());
  }, [epsGrowthRate, rateOfReturn, futurePE, baseEPS, mos, dps]);

  // Handle button click (Base Value / My Valuation)
  const handleButtonClick = (type) => {
    setActiveButton(type);
    if (type === "base") {
      setMRP(calculateMRP());
      setDP(calculateDP());
    } else if (type === "my") {
      setMRP((calculateMRP() * 1.1).toFixed(2)); // Example: Adjusted MRP
      setDP((calculateDP() * 1.1).toFixed(2)); // Example: Adjusted DP
    }
  };

  return (
    <div>
      <h1 className="valuationHead">Valuation of ITI Limited</h1>
      <Box className="valuationContainer">
        <Typography variant="h6" gutterBottom>
          Price Calculator
        </Typography>

        <Box className="valuationRow">
          {/* Sliders Column */}
          <Box className="valuationColumn" sx={{ marginRight: 5 }}>
            {/* EPS Growth Rate Slider */}
            <Box className="sliderSection">
              <Typography>Expected EPS Growth Rate:</Typography>
              <Slider
                value={epsGrowthRate}
                onChange={handleSliderChange(setEpsGrowthRate)}
                valueLabelDisplay="auto"
                min={0}
                max={50}
                sx={{ width: '100%' }}
              />
              <div className="basevaluation">
                <Typography>Base {epsGrowthRate}%</Typography>
              </div>
            </Box>

            {/* Expected Rate of Return Slider */}
            <Box className="sliderSection">
              <Typography>Expected Rate of Return:</Typography>
              <Slider
                value={rateOfReturn}
                onChange={handleSliderChange(setRateOfReturn)}
                valueLabelDisplay="auto"
                min={0}
                max={50}
                sx={{ width: '100%' }}
              />
              <div className="basevaluation">
                <Typography>Base {rateOfReturn}%</Typography>
              </div>
            </Box>

            {/* Future PE Slider */}
            <Box className="sliderSection">
              <Typography>Future PE:</Typography>
              <Slider
                value={futurePE}
                onChange={handleSliderChange(setFuturePE)}
                valueLabelDisplay="auto"
                min={0}
                max={200}
                sx={{ width: '100%' }}
              />
              <div className="basevaluation">
                <Typography>Base {futurePE}%</Typography>
              </div>
            </Box>
          </Box>

          {/* Inputs & Calculations Column */}
          <Box className="valuationColumn">
            {/* Buttons for Base Value / My Valuation */}
            <Box className="buttonSection">
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("base")}
                sx={{
                  width: "150px",
                  height: "40px",
                  backgroundColor: activeButton === "base" ? "#24b676" : "transparent",
                  color: activeButton === "base" ? "white" : "black",
                  border: activeButton === "base" ? "none" : "1px solid #24b676",
                }}
              >
                Base Value
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleButtonClick("my")}
                sx={{
                  width: "150px",
                  height: "40px",
                  backgroundColor: activeButton === "my" ? "#24b676" : "transparent",
                  color: activeButton === "my" ? "white" : "black",
                  border: activeButton === "my" ? "none" : "1px solid #24b676",
                  marginLeft: "10px",
                }}
              >
                My Valuation
              </Button>
            </Box>

            {/* MRP & DP Values */}
            <Box className="mrpDpRow" display="flex" justifyContent="space-between" marginBottom="10px">
              <Typography sx={{ fontSize: "16px" }}>MRP: ₹{mrp}</Typography>
              <Typography sx={{ fontSize: "16px" }}>DP: ₹{dp}</Typography>
            </Box>

            {/* Base EPS Input */}
            <Box className="inputSection">
              <Typography sx={{ fontSize: "16px" }}>Base EPS ₹:</Typography>
              <TextField
                type="number"
                value={baseEPS}
                onChange={(e) => setBaseEPS(parseFloat(e.target.value) || 0)}
                sx={{ width: "90px", "& .MuiInputBase-root": { height: "40px", borderRadius: "10px" } }}
              />
            </Box>

            {/* DPS Input */}
            <Box className="inputSection">
              <Typography>DPS ₹:</Typography>
              <TextField
                type="number"
                value={dps}
                onChange={(e) => setDPS(parseFloat(e.target.value) || 0)}
                sx={{ width: "150px", "& .MuiInputBase-root": { height: "40px", borderRadius: "10px" } }}
              />
            </Box>

            {/* MOS Input */}
            <Box className="inputSection">
              <Typography>MOS (%):</Typography>
              <TextField
                type="number"
                value={mos}
                onChange={(e) => setMOS(parseFloat(e.target.value) || 0)}
                sx={{ width: "90px", "& .MuiInputBase-root": { height: "40px", borderRadius: "10px" } }}
              />
            </Box>

            {/* Save Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
              <Button
                variant="outlined"
                color="success"
                sx={{
                  color: "white",
                  backgroundColor: "#24b676",
                  padding: "8px",
                  borderRadius: "10px",
                  marginRight: "5px",
                }}
                onClick={() => alert("Valuation saved")}
              >
                Save my Valuation
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ValuationCalculator;
