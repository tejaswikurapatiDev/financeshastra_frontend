import React from "react";
import "./WhyFinanceSimpllyInvestted.css"; // Import the CSS file
import whyfinansassimpinvestimg1 from '../../assest/whyfinansasimg1.png';

const WhyFinanceSimpllyInvestted = () => {
  return (
    <div className="whyfinancesastrasimpllyinvestted-container">
      <h2 className="whyfinancesastrasimpllyinvestted-heading">Why FinanceShastra?</h2>
      <p className="whyfinancesastrasimpllyinvestted-description">
        FinanceShastra serves as a guiding light for investors, offering clarity, expert guidance,
        and essential tools to drive financial growth. Here’s why FinanceShastra is the ideal
        choice for all your investment needs:
      </p>

      <div className="whyfinancesastrasimpllyinvestted-content">
        {/* Left Section */}
        <div className="whyfinancesastrasimpllyinvestted-left">
          <h3 className="whyfinancesastrasimpllyinvestted-subheading">
            Simplifying Investment Decisions
          </h3>
          <p className="whyfinancesastrasimpllyinvestted-text">
            With detailed <span className="whyfinancesastrasimpllyinvestted-texthighlight">stock analysis reports</span>,
            a powerful <span className="highlight">Stock Analyzer</span>, and the innovative{" "}
            <span className="highlight">Stock Plan</span>, FinanceShastra helps investors
            identify the best opportunities tailored to their goals.
          </p>

          <h4 className="whyfinancesastrasimpllyinvestted-point">Stock Research Reports</h4>
          <p className="whyfinancesastrasimpllyinvestted-text">
          Stock research reports provide detailed analysis and insights on a company's financial performance,
           market trends, and potential investment opportunities.
          </p>

          <h4 className="whyfinancesastrasimpllyinvestted-point">Stock Screener</h4>
          <p className="whyfinancesastrasimpllyinvestted-text">
          A tool to filter and identify stocks based on specific criteria like price, market cap, and financial performance.
          </p>

          <h4 className="whyfinancesastrasimpllyinvestted-point">StockSIP</h4>
          <p className="whyfinancesastrasimpllyinvestted-text">
          A stock SIP (Systematic Investment Plan) allows investors to invest a fixed 
          amount regularly in selected stocks, promoting disciplined and long-term wealth creation.
          </p>
        </div>

        {/* Right Section (Only Image) */}
        <div className="whyfinancesastrasimpllyinvestted-right">
          <img 
            src={whyfinansassimpinvestimg1} 
            alt="FinanceShastra Overview" 
            className="whyfinancesastrasimpllyinvestted-image"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyFinanceSimpllyInvestted;
