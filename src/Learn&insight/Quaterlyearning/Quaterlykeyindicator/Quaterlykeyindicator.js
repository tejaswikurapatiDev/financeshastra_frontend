import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './Quaterlykeyindicator.css'
const indicators = [
  { label: "Open", value: '₹817.30' },
  { label: 'Today’s High/Low', value: '₹824.00 / ₹812.00' },
  { label: '20D Avg Volume (%)', value: '34.85' },
  { label: 'Previous Close', value: '₹812.00' },
  { label: '52-week High/Low', value: '₹912.00 / ₹600.65' },
  { label: 'Dividend Yield', value: '1.67' },
  { label: 'Volume', value: '4,933,200' },
  { label: 'UC Limit', value: '893.20' },
  { label: 'PE ratio (TTM)', value: '10.24' },
  { label: 'Value (Lacs)', value: '₹40,508.97' },
  { label: 'LC Limit', value: '730.80' },
  { label: 'P/B ratio', value: '1.90' },
  { label: 'Book Value per share', value: '₹23.96' },
  { label: 'Face Value', value: '₹1' },
  { label: 'Basic EPS (TTM)', value: '80.18' },
  { label: 'Market cap', value: '₹732,845.17' },
  { label: '20D Avg Volume', value: '13,656,544' },
   { label: 'Sector PE', value: '11.03' },
];

const QuaterlyKeyIndicators = () => {
  return (
    <Card className="key-indicators-cardd">
      <CardContent>
        <Typography variant="h6" className="key-indicators-title">
          <h1 className="key">Key Indicators</h1>
        </Typography>

        {/* Grid Layout for 3 columns */}
        <Grid container spacing={2}>
          {indicators.map((indicator, index) => (
            <Grid item xs={12} sm={4} key={index} className="indicator">
              <Typography variant="body2" color="textSecondary"
              style={{ color: 'black' }}>
                {indicator.label}
              </Typography>
              <Typography variant="body1" color="textPrimary"
              >
                {indicator.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuaterlyKeyIndicators;