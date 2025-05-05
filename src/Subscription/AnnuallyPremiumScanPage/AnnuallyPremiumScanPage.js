import React from "react";
import qrcode from '../../assest/upilogoo.png';

const AnnuallyPremiumScanPage = () => {
  
  
  return (


    <div className="scanAndPayProfilePage-qr-section">
      <h2 className="scanAndPayProfilePage-qr-sectionh2">It is easier to pay using a phone and laptop/desktop</h2>
    
      <p>
        <strong className="scanAndPayProfilePage-qr-sectionstong">QR code</strong>
      </p>
      <div className="scanAndPayProfilePage-qr-code">
        <img
          src={qrcode}
          alt="QR Code"

        />
      </div>
      <h3 className="scanall">Scan and pay</h3>
    </div>

  );
};

export default AnnuallyPremiumScanPage;
