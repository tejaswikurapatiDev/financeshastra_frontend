import React, { useState } from 'react';
import './ReferMoreProfilePages.css';

const ReferMoreProfilePages = () => {
  const [inputs, setInputs] = useState([{
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: ''
  }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { firstName: '', lastName: '', mobileNumber: '', email: '' }]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    alert('Details submitted successfully!');
  };

  return (
    <div className="refermoreprofilepagess-container">
      <h2>Provide the information below and send the invite, along with a complimentary book.</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={index} className="refermoreprofilepagess-input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First name*"
              value={input.firstName}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name*"
              value={input.lastName}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile number*"
              value={input.mobileNumber}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email id*"
              value={input.email}
              onChange={(event) => handleInputChange(index, event)}
            />
            <button
              type="button"
              className="refermoreprofilepagess-remove-button"
              onClick={() => handleRemoveInput(index)}
            >
              🗑️
            </button>
          </div>
        ))}
        <button
          type="button"
          className="refermoreprofilepagess-add-button"
          onClick={handleAddInput}
        >
          ➕
        </button>
        <button type="submit" className="refermoreprofilepagess-submit-button">
          Submit Details
        </button>
      </form>

      <div className="refermoreprofilepagess-email-template">
        <h3>Kindly follow the email format provided below.</h3>
        <div className="refermoreprofilepagess-email-content">
          <p>Hi ....,</p>
          <p>
            I’ve come to the realization that investing in equities is far too important to leave in the hands of others.
            Financial freedom is within reach for anyone who invests successfully. The challenge, however, is overcoming my
            own doubts—understanding how to approach investing, what steps to take, and whether I have the right resources
            to make sound decisions. These are questions every investor must answer.
          </p>
          <p>
            I found the book <strong>How the Heck to Invest and Reach Nirvana: A 5-Step Journey to Financial Freedom</strong>
            by Raymond Moses, founder of FinanceShastra, to be a real game-changer.
          </p>
          <p>
            I strongly recommend you get a copy. All you need to do is register on FinanceShastra at
            financeshastra.com, and they will send you the book for free, delivered right to your door. They will reach
            out to you via call or message to confirm your shipping details.
          </p>
          <p>Simply register at financeshastra.com.</p>
          <p>Thanks,<br />William Rober</p>
        </div>
      </div>
    </div>
  );
};

export default ReferMoreProfilePages;
