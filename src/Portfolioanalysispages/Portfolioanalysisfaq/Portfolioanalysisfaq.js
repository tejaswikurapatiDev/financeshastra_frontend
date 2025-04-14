import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './Portfolioanalysisfaq.css'


const PortfolioanalysisfAQS = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaqAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How to Evaluate Your Portfolio?',
      answer:
        'Evaluating your portfolio involves several steps to measure its success in relation to your investment goals. Using the Portfolio Analysis tool from Trade Brains Portal can make this process more efficien',
    },
    {
      question: 'How Do I Know if My Portfolio is Good or Bad?',
      answer:
        'To determine whether your portfolio is effective or not, you need to check if it aligns with your financial goals. A good portfolio is diversified across different sectors and industries, which helps spread risk. Regularly reviewing your portfolio performance and adjusting as needed can help keep it in line with your objectives.'
    },
    {
      question:
        'How Many Stocks Should Be in My Portfolio?',
      answer:
        'The ideal number of stocks in a portfolio varies depending on your personal preferences, investment strategy, risk appetite, and how well you want to diversify your holdings.',
    },
    {
      question: 'Is Portfolio Analysis Only for Professional Investors?',
      answer:
        'No, portfolio analysis is beneficial for all investors, regardless of experience. It helps you assess the current state of your portfolio in the context of the market environment.',
    },
    {
        question: 'Can Portfolio Analysis Help in Managing Risks?',
        answer:
          'Yes, portfolio analysis is useful for identifying and managing risk. It provides an overview of how each stock in your portfolio is performing, which can guide you in adjusting your investments to manage potential risks.',
      },
      
  ];

  return (

    <div className="faqquestans-container">
      <h2 className="faq-titleportfoliooanalysis">Frequently Asked Questions</h2>
      <div className="faq-list">
      
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleFaqAnswer(index)}
            >
              {index + 1}. {faq.question}
              <span className="faq-icon">
                {openIndex === index ? <FaAngleUp  className='upfaq'/> : <FaAngleDown  className='downfaq'/>}
              </span>
            </button>
           
            {openIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          
          </div>
        ))}

      </div>
    </div>

   
   
  );
};

export default PortfolioanalysisfAQS;