import React from 'react';


const Balancesheetriskconcernpage = () => {
  const headers = [
    '', 'Mar 19', 'Mar 20', 'Mar 21', 'Mar 22', 'Mar 23', 'Mar 24'
  ];

  const data = [
    ['Equity Capital', '897', '925', '934', '934', '950', '961'],
    ['Reserves', '936', '1,395', '1,511', '1,674', '1,425', '823'],
    ['Borrowings', '1,259', '1,216', '1,465', '1,613', '1,877', '1,796'],
    ['Long Term Borrowings', '300', '180', '300', '240', '180', '120'],
    ['Short term Borrowings', '959', '1,036', '1,164', '1,372', '1,696', '1,675'],
    ['Lease Liabilities', '0', '0', '1', '1', '1', '1'],
    ['Other Borrowings', '0', '0', '0', '0', '0', '0'],
    ['Other Liabilities', '3,943', '4,225', '5,043', '5,394', '5,280', '6,080'],
    ['Trade Payables', '1,805', '2,183', '1,885', '1,690', '1,377', '1,557'],
    ['Advance from Customers', '549', '566', '1,032', '1,034', '966', '1,065'],
    ['Other liability items', '1,589', '1,476', '2,126', '2,670', '2,908', '2,537'],
    ['Total Liabilities', '7,034', '7,761', '8,953', '9,615', '9,531', '9,640'],
    ['Fixed Assets', '2,695', '2,693', '2,702', '2,729', '2,752', '2,732'],
    ['Land', '2,219', '2,219', '2,218', '2,217', '2,217', '2,217'],
    ['Building', '112', '131', '146', '147', '150', '150'],
    ['Plant Machinery', '340', '361', '394', '448', '507', '509'],
    ['Equipments', '3', '3', '3', '4', '6', '6'],
    ['Furniture n fittings', '1', '1', '1', '1', '1', '2'],
    ['Vehicles', '1', '1', '2', '2', '3', '3'],
    ['Other fixed assets', '98', '99', '99', '121', '131', '143'],
    ['Gross Block', '2,774', '2,814', '2,864', '2,942', '3,014', '3,030'],
    ['Accumulated Depreciation', '80', '122', '162', '213', '262', '298'],
    ['CWIP', '165', '189', '169', '150', '139', '142'],
    ['Investments', '40', '38', '36', '35', '35', '35'],
    ['Other Assets', '4,135', '4,841', '6,046', '6,701', '6,605', '6,731'],
    ['Inventories', '185', '213', '234', '233', '290', '264'],
    ['Trade receivables', '2,657', '2,761', '2,552', '2,730', '2,429', '2,441'],
    ['Cash Equivalents', '204', '245', '548', '306', '215', '832'],
    ['Loans n Advances', '0', '0', '0', '0', '0', '0'],
    ['Other asset items', '1,090', '1,622', '2,712', '3,431', '3,671', '3,193'],
    ['Total Assets', '7,034', '7,761', '8,953', '9,615', '9,531', '9,640']
  ];

  return (
    <div className="riskconcernpage-containerrr">
         <div className="riskconcernpage-outlook">
      <h4>Balance Sheet</h4>
      <p>Figures in ₹ Crores</p>
      <div className="riskconcernpage-table">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cellIndex === 0 ? 'balancesheetriskconcernpage-align-left' : ''}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="riskconcernpage-source">Source: Company Report/FinanceShastra Research</p>
    </div>
    </div>
  );
};

export default Balancesheetriskconcernpage;
