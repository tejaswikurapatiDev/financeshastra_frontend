import React from "react";
import "./FundContactInfo.css";

const FundContactInfo = () => {
    return (
        <div className="infoContainer">
          <h2 className="infoHeader">AMC Contact Details</h2>
          <div className="infoDetails">
            <div className="infoRow">
              <span className="infoLabel">AUM :</span>
              <span className="infoValue">873,342 Cr</span>
            </div>
            <div className="infoRow">
              <span className="infoLabel">Address :</span>
              <span className="infoValue1">One BKC, A-Wing, 13th Floor, Bandra Kurla Complex, Mumbai 400051</span>
            </div>
            <div className="infoRow">
              <span className="infoLabel">Contact :</span>
              <span className="infoValue2">+91 022 26525000</span>
            </div>
            <div className="infoRow">
              <span className="infoLabel">Email ID :</span>
              <span className="infoValue3">enquiry@icicipruamc.com</span>
            </div>
          </div>
        </div>
      );
    };
    

export default FundContactInfo;
