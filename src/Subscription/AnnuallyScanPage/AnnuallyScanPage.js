import React from "react";
import qrcode from '../../assest/upilogoo.png';

import Navbar from "../../Navbar/Navbar";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";

const AnnuallyScanPage = () => {
       
  return (
          
            <div className="scanAndPayProfilePage-qr-section">
              <h2 className="scanAndPayProfilePage-qr-sectionh2">Dynamic QR Generated</h2>
              <p className="scanAndPayProfilePage-qr-sectionp">Is it more convenient to pay by phone?</p>
              <p>
                <strong className="scanAndPayProfilePage-qr-sectionstong">Scan QR code</strong>
              </p>
              <div className="scanAndPayProfilePage-qr-code">
                <img
                  src={qrcode}
                  alt="QR Code"
                />
              </div>
            </div>
          
   
  );
};

export default AnnuallyScanPage;
