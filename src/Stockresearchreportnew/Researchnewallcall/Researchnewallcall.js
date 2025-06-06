import React, { useRef } from 'react'
import StockCard from '../Companyname/Companyname'
import ResearchDashboard from '../ResearchDashboard/ResearchDashboard'
import Overviewresearch from '../Overviewresearch/Overviewresearch'
import Navbar from '../../Navbar/Navbar'
import Disclosure from '../Disclosure/Disclosure'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'
import RiskConcernPage from '../RiskConcernPage/RiskConcernPage'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Companyname.css'; // Import your external CSS
import { FaArrowDown } from "react-icons/fa6";
import ResearchStocksData from '../ResearchStocksData';



const Researchnewallcall = () => {

  const contentRef = useRef();

  const handleDownloadPDF = () => {
    const input = contentRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('download.pdf');
    });
  };
  return (
    <div>
      <Navbar />
      <div ref={contentRef}>
        <div className="companyresearchnew">
          <div className="stock-headercompanyres">
            <div className="stock-titlecompanyres">
              <h2>Tata Steel Ltd</h2>
              <p className="stock-sectorcompanyres">Sector: <span className="steelcompanyres">Steel</span></p>
            </div>

          </div>
          <div className="stock-actioncompanyres">
            <div>
              <p className="stock-datecompanyre">26/05/2025</p></div>
            <div>
              <button className="buy-buttoncompanyrese">Buy</button></div>
          </div>

          <div className='detail-itemcompanyress'>
            <div className="stock-detailscompanyres">
              <div className="detail-itemcompanyres">Price@Reco: ₹130.14</div>
              <div className="detail-itemcompanyres with-border">Target Price: ₹168</div>
              <div className="detail-itemcompanyres with-border">Target Period: 16 - 24 Months</div>
              <div className="detail-itemcompanyres with-border">Potential Returns: 29%</div>
            </div>
            <div>
              <button className="download-btncompanyres" onClick={handleDownloadPDF}>
                <span className="download-iconcompanyres"><FaArrowDown /></span> Download PDF
              </button>
            </div>


          </div>
        </div>
        <ResearchDashboard />
        <Overviewresearch />
        <RiskConcernPage />
        <Disclosure />
      </div>
      <FooterForAllPage />
    </div>
  )
}

export default Researchnewallcall