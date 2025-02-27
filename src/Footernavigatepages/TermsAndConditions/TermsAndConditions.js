import React from "react";
import "./TermsAndConditions.css";
import termimg from '../../assest/term.png';
import { FaRegCalendar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";

const TermsAndConditions = () => {
  return (
    <div>
    <div className="termConditionPage">
      <div className="termConditionHeader">
        <h1 className="termConditionTitle">Terms and Conditions for FinanceShastra</h1>
        <p className="termConditionDate"><FaRegCalendar className="termcalendericon"/>Last updated: 01 Dec 2024<LuDot className="termdoticon"/></p>
      </div>
      <img
        src={termimg}
        alt="Terms and Conditions"
        className="termConditionImage"
      />
      <p className="termConditionIntro">
        Welcome to the <a href="/">FinanceShastra</a>. By accessing or using this
        Website and its services, you agree to comply with and be bound by the
        following <a href="/">terms and conditions</a>. Please read them carefully
        before using the Website. If you do not agree to these Terms, you must not
        access or use the Website.
      </p>
      <div className="termConditionSections">
        {/* Column for Titles */}
        <div className="termConditionTitlesColumn">
          <h2 className="termConditionSectionTitle">1. Acceptance of Terms</h2>
          <h2 className="termConditionSectionTitle">2. Intellectual Property Rights</h2>
          <h2 className="termConditionSectionTitle">3. User Registration and Account</h2>
          <h2 className="termConditionSectionTitle">4. Use of Services</h2>
          <h2 className="termConditionSectionTitle">5. Fees and Payments</h2>
          <h2 className="termConditionSectionTitle">6. Third-Party Links</h2>
          <h2 className="termConditionSectionTitle">7. Limitation of Liability</h2>
          <h2 className="termConditionSectionTitle">8. Disclaimer</h2>
          <h2 className="termConditionSectionTitle">9. Indemnification</h2>
          <h2 className="termConditionSectionTitle">10. Termination</h2>
          <h2 className="termConditionSectionTitle">11. Governing Law</h2>
          <h2 className="termConditionSectionTitle">12. Contact Information</h2>
        </div>
        {/* Column for Paragraphs */}
        <div className="termConditionTextsColumn">
          <p className="termConditionText">
            By accessing this Website, you confirm that you have read, understood,
            and agree to be bound by these Terms, along with any amendments we may
            make from time to time. FinanceShastra reserves the right to update or
            modify these Terms at its discretion without prior notice. Your
            continued use of the Website constitutes your acceptance of any revised
            Terms.
          </p>
          <p className="termConditionText">
            All content on this Website, including but not limited to text,
            graphics, logos, images, reports, tools, and software, is the
            intellectual property of FinanceShastra or its licensors and is
            protected under copyright, trademark, and other applicable intellectual
            property laws. You are granted a limited, non-transferable, and
            non-exclusive license to access and use the Website and its services
            solely for personal, non-commercial purposes. Any unauthorized
            reproduction, distribution, modification, or creation of derivative
            works is strictly prohibited.
          </p>
          <p className="termConditionText">
            By creating an account on the Website, you confirm that the information
            you provide is accurate, complete, and up to date. You agree to
            maintain the confidentiality of your login credentials and accept
            responsibility for all activities conducted under your account.
            FinanceShastra reserves the right to suspend or terminate your account
            without notice for any unauthorized use or violation of these Terms.
          </p>
          <p className="termConditionText">
          The Website and its services are intended solely for lawful purposes. You agree not to:
          <ul>
            <li>
            Use the Website for commercial purposes without prior authorization.
            </li>
            <li>Copy, distribute, or modify any part of the Website without express permission.</li>
            <li>Submit false, misleading, or unauthorized content.</li>
            <li>Engage in activities that disrupt or interfere with the Website’s functionality. </li>
          </ul>
          </p>
          <p className="termConditionText">
          Certain services offered by FinanceShastra may require payment of fees. 
          By purchasing such services, you agree to provide accurate payment details and 
          authorize us to charge the applicable fees. All payments are non-refundable unless explicitly stated otherwise
          </p>
          <p className="termConditionText">
          The Website may include links to third-party websites or services. FinanceShastra does not endorse or assume responsibility for any third-party content or practices. Accessing third-party links is at your own risk, and
           you should review their terms and policies before use. 
          </p>
          <p className="termConditionText">
          FinanceShastra and its affiliates shall not be held liable for any direct, indirect, incidental,
           special, or consequential damages arising from your use or inability to use the Website or its services. 
           The content provided on the Website is for informational purposes only and should not be construed as financial or 
           investment advice. 
          </p>
          <p className="termConditionText">
          The Website and all its services are provided "as is" and "as available" without any warranties, express or implied. 
          FinanceShastra does not guarantee the accuracy, reliability, or completeness of any content on the Website. 
          </p>
          <p className="termConditionText">
          You agree to indemnify and hold harmless FinanceShastra, its officers, employees, and 
          affiliates from any claims, damages, or expenses arising 
          from your use of the Website, your violation of these Terms, or infringement of any rights of a third party. 
          </p>
          <p className="termConditionText">
          FinanceShastra reserves the right to terminate or suspend your access to the Website, with or without cause, at any time and 
          without prior notice. Upon termination, all provisions of these Terms that should survive will remain in effect. 
          </p>
          <p className="termConditionText">
          These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under or in 
          connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra. 
          </p>
          <p className="termConditionText">
          For questions, concerns, or clarifications regarding these Terms,<br/> please contact us at:
          FinanceShastra Co.<br/>Email: <a href="/">support@financeshastra.com </a><br/>Address: Pune, Maharashtra, India
          </p>
        </div>
      </div>
    </div>
    <Navbar/>
    <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
    </div>
  );
};

export default TermsAndConditions;
