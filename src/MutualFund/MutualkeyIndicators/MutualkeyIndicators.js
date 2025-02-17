import React from 'react';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';


const indicators = [
  { label: "Launch Date", value: '24 Feb,2024' },
  { label: 'Benchmark', value: 'Nifty Midcap 150 - TRi' },
  { label: 'Riskometer', value: 'very High' },
  { label: 'Turnover', value: '133%' },
  { label: 'Type', value: 'Open ended scheme' },
  { label: 'Return Since Launch', value: '22.85%' },
  { label: 'Min. Investment', value: '₹500.00' },
  { label: 'Expense ratio', value: '0.57%' },
  { label: 'Min. Additional investment', value: '₹500.00' },
  { label: 'Min. SIP', value: '₹500.00' },
  { label: 'Min. Cheques', value: '12' },
  { label: 'Min. Withdrawal', value: '₹500.00' },
  { label: 'Exit Load', value: '₹1.00%' },
  { label: 'Remark', value:'1% on or before 1Y,Nil after 1Y' },
];

const MutualkeyIndicators = () => {
  return (
    <Card className="key-indicators-card">
      <CardContent>
        <Typography variant="h6" className="key-indicators-title">
         <h1 className='key'>Key Indicators</h1> 
        </Typography>
       
        <Grid container spacing={2}>
       
          {indicators.map((indicator, index) => (
            <Grid item xs={6} key={index} className="indicator">
              <Typography variant="body2" color="textSecondary">
                {indicator.label}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {indicator.value}
              </Typography>
             
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MutualkeyIndicators;