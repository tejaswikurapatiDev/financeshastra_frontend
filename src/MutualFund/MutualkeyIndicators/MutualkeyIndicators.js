import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const MutualkeyIndicators = ({ fundDetails }) => {
  if (!fundDetails) {
    return <Typography>Loading indicators...</Typography>;
  }

  const indicators = [
    { label: "Launch Date", value: fundDetails.launch_date ? new Date(fundDetails.launch_date).toISOString().split('T')[0] : 'N/A' },
    { label: 'Benchmark', value: fundDetails.benchmark || 'Nifty Midcap 150 - TRi' },
    { label: 'Riskometer', value: fundDetails.riskometer || 'Very High' },
    { label: 'Turnover', value: fundDetails.turnover_percent || '133%' },
    { label: 'Type', value: fundDetails.type || 'Open ended scheme' },
    { label: 'Return Since Launch', value: fundDetails.return_since_launch || '22.85%' },
    { label: 'Min. Investment', value: fundDetails.min_investment || '₹500.00' },
    { label: 'Expense ratio', value: fundDetails.expense_ratio || '0.57%' },
    { label: 'Min. Additional investment', value: fundDetails.min_additional_investment || '₹500.00' },
    { label: 'Min. SIP', value: fundDetails.min_sip || '₹500.00' },
    { label: 'Min. Cheques', value: fundDetails.min_cheques || '12' },
    { label: 'Min. Withdrawal', value: fundDetails.min_withdrawal || '₹500.00' },
    { label: 'Exit Load', value: fundDetails.exit_load || '1.00%' },
    { label: 'Remark', value: fundDetails.remark || '1% on or before 1Y, Nil after 1Y' },
  ];

  return (
    <Card className="key-indicators-card">
      <CardContent>
        <Typography variant="h5" className="key-indicators-title" gutterBottom>
          Key Indicators
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
