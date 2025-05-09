import React from 'react';

const Quarterlybalancesheet = ({ balanceSheet }) => {
  const headers = balanceSheet.map((entry) => `Mar ${entry.fiscal_year}`);

  const format = (num) =>
    Number(num).toLocaleString('en-IN', {
      maximumFractionDigits: 0,
    });

  const rows = [
    {
      label: 'Equity and Liabilities',
      key: null,
      isSection: true,
    },
    { label: 'Share Capital', key: 'share_capital' },
    { label: 'Reserves & Surplus', key: 'reserves_surplus' },
    { label: 'Minority Interest', key: 'minority_interest' },
    { label: 'Deposits', key: 'deposits' },
    { label: 'Borrowings', key: 'borrowings' },
    { label: 'Other Liabilities', key: 'other_liabilities' },
    { label: 'Total Liabilities', key: 'total_liabilities' },
    {
      label: 'Assets',
      key: null,
      isSection: true,
    },
    { label: 'Fixed Assets', key: 'fixed_assets' },
    { label: 'Loans & Advances', key: 'loans_advances' },
    { label: 'Investments', key: 'investments' },
    { label: 'Other Assets', key: 'other_assets' },
    { label: 'Total Assets', key: 'total_assets' },
  ];

  return (
    <div>
      <h2 className="earningheaderrpeer">Balance Sheet</h2>
      <p className="earningparaapeer">
        Consolidated Figures in ₹ Crores / <a style={{ color: '#24b676' }}>View Standalone</a>
      </p>
      <div className="earnings-report">
        <table className="earnings-tableeincome">
          <thead>
            <tr>
              <th></th>
              {headers.map((year, index) => (
                <th key={index}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              if (row.isSection) {
                return (
                  <tr key={index}>
                    <td colSpan={headers.length + 1} style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                      {row.label}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={index}>
                  <td>{row.label}</td>
                  {balanceSheet.map((entry, i) => (
                    <td key={i}>{format(entry[row.key])}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quarterlybalancesheet;
