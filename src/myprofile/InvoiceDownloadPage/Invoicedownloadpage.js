import "./InvoicePage.css"; // Ensure this CSS file is linked
import paidimg from "../../assest/paidimg.png"; 
import finimg from "../../assest/paidfinlogo.png"; 

const Invoicedownloadpage = ({planName, purchaseDate, amount, username, address, city, state, country, number}) => {

  let duration = ["Elite half year", "Premium half year"].includes(planName) ? "6 Months" : "12 Months";

  const rate = amount; // Assuming rate is the same as amount

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h1>Invoice</h1>
        <img src={finimg} alt="FinanceShastra Logo" className="invoice-logo" />
      </div>

      <div className="invoice-details">
        <div className="invoice-billed">
          <h3>Billed to,</h3>
          <p>{username}</p>
          <p>{address}</p>
          <p>{city}, {state}, {country}</p>
          <p>+91 {number}</p>
        </div>

        <div className="invoice-payment">
          <h3>PAYMENT</h3>
          <p><strong>Date:</strong>{purchaseDate}</p>
          <p><strong>Amount:</strong> {amount}</p>
        </div>
      </div>

      <h2 className="invoice-plan-title">{planName}</h2>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>ITEM DESCRIPTION</th>
            <th>DURATION</th>
            <th>RATE</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{planName}</td>
            <td>{duration}</td>
            <td>{rate}</td>
            <td>{amount}</td>
          </tr>
        </tbody>
      </table>
      <div className="invoice-summary">
    <p><strong>Subtotal:</strong> <span>{amount}</span></p>
    <p><strong>Tax (0%):</strong> <span>₹0.00/-</span></p>
    <p><strong>Total (₹):</strong> <span>{amount}</span></p>
</div>

      {/* Paid Stamp Image Below the Summary, Positioned to the Right */}
      <div className="invoice-paid-image">
      <img src={paidimg} alt="Paid Stamp" />
      </div>
    </div>
  );
};

export default Invoicedownloadpage;
