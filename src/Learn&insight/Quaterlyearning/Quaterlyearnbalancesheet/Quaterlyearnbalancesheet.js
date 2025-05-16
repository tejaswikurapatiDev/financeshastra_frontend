import React from 'react';

const Quarterlybalancesheet = () => {
    const data = {
        headers: [
          'Mar 2017', 'Mar 2018', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024',
        ],
        rows: [
            { label: 'Equity and Liabilities', values:[] },
          { label: 'Share Capital', values: [797, 892, 892, 892, 892, 892, 892, 892] },
          { label: 'Reserves & Surplus', values: ['2,16,395', '2,29,429', '2,33,603', '2,50,168', '2,74,669', '3,04,696', '3,58,039', '4,14,047'] },
          { label: 'Minority Interest', values: ['6,481', '4,615', '6,037', '7,944', '9,626', '11,207', '12,837', '15,618'] },
          { label: 'Deposits', values: ['25,99,811', '27,22,178', '29,40,541', '32,74,161', '37,15,331', '40,87,411', '44,68,536', '49,66,538'] },
          { label: 'Borrowings', values: ['3,36,366', '3,69,079', '4,13,748', '3,32,901', '4,33,796', '4,49,160', '5,21,152', '639,609'] },
          { label: 'Other Liabilities', values: ['2,85,272', '2,90,250', '2,93,643', '3,31,427', '4,11,303', '5,07,518', '5,92,963', '6,97,075'] },
          { label: 'Total Liabilities', values: ['34,45,121', '36,16,444', '38,88,464', '41,97,492', '48,45,618', '53,60,884', '59,54,418', '67,33,779'] },
          { label: 'Assets', values:[] },
          { label: 'Fixed Assets', values: ['50,251', '40,301', '39,941', '39,608', '39,699', '39,229', '44,024', '44,137'] },
          { label: 'Loans & Advances', values: ['18,96,887', '19,60,118', '22,26,854', '23,74,311', '25,00,599', '27,94,076', '32,67,902', '37,84,273'] },
          { label: 'Investments', values: ['10,27,281', '11,83,794', '11,19,270', '12,28,284', '15,95,100', '17,76,490', '19,13,108', '21,10,548'] },
          { label: 'Other Assets', values: ['4,70,014', '4,31,306', '5,01,638', '5,54,818', '709,752', '750,807', '729,001', '7,94,249'] },
          { label: 'Total Assets', values: ['34,45,121', '36,16,444', '38,88,464', '41,97,492', '48,45,618', '53,60,884', '59,54,418', '67,33,779'] },
        ],
      };
    
    return (
        <div>
            <h2 className="earningheaderrpeer" >
            Balance Sheet
            </h2>
            <p className="earningparaapeer">
                Consolidated Figures in ₹ Crores / <a style={{ color: '#24b676' }}>View Standalone</a>
            </p>
            <div className="earnings-report">
                <table className="earnings-tableeincome">
                    <thead>
                    <tr>
            <th></th>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
                    </thead>
                    <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
                </table>
            </div>
        </div>
    );
};

export default Quarterlybalancesheet;