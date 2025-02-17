import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './Quaterlycirclechart.css';

const data = [
  { name: 'Promoters', value: 90, color: '#0055A5' },            // Blue
  { name: 'Foreign institutions', value: 0.04, color: '#D7263D' }, // Red
  { name: 'DII', value: 0.01, color: '#F4B400' },                 // Yellow
  { name: 'Retail & others', value: 9.92, color: '#28A745' },     // Green
];

const ShareholdingChart = () => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div style={{ backgroundColor: 'transparent', fontSize: '14px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{name}</p>
          <p style={{ margin: 0, color: '#555' }}>{value.toFixed(2)}%</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div>
      <h2 className='circlechartheader'>Shareholding</h2>
      <div className="circleearning">
        <PieChart width={400} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90} // Default outer radius
            innerRadius={60}
            minAngle={15}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Tooltip for dynamic hover/touch display */}
          <Tooltip content={<CustomTooltip />} />
          {/* Custom Legend with Square Icons */}
          <Legend
            className='circledataearning'
            layout="vertical"
            align="left"
            verticalAlign="middle"
            iconSize={0}
            formatter={(value, entry, index) => {
              const { color } = entry;
              const percentage = data[index].value.toFixed(2);
              return (
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: color,
                      marginLeft: '5px',
                    }}
                  ></div>
                  <span className='valueper'>{value} - {percentage}%</span>
                </div>
              );
            }}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default ShareholdingChart;