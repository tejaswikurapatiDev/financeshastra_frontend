import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './StockResearchFaqPage.css';

export default function StockResearchFaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaqAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How can stock research reports benefit investors?',
      answer: 'Stock research reports allow investors to make well-informed decisions by providing detailed financial data, market insights, and performance evaluations of companies, helping them assess potential risks and rewards.',
    },
    {
      question: 'What are Equity Research Reports?',
      answer: "Equity research reports are detailed documents produced by financial analysts or research firms that offer a thorough analysis of a company or industry, helping investors understand the stock's potential.",
    },
    {
      question: 'How often should I refer to stock research reports?',
      answer: 'The frequency with which you refer to stock research reports depends on your investment strategy. Long-term investors may look at reports less frequently, while short-term traders might rely on more up-to-date information.',
    },
    {
      question: 'Where can I get stock recommendation reports?',
      answer: 'Stock recommendation reports can be found on financial platforms and websites dedicated to stock analysis, like the Trade Brains Portal.',
    },
    {
      question: 'Can stock research reports predict market movements accurately?',
      answer: 'While stock research reports provide valuable insights, they cannot guarantee accurate predictions, as market movements can be influenced by a wide range of unpredictable factors.',
    },
    {
      question: 'Do stock research reports include recommendations to buy or sell?',
      answer: 'Yes, stock research reports typically include recommendations such as Buy, Sell, or Hold based on the analysts’ evaluations of the company’s prospects.',
    },
  ];

  return (
    <div className="stockresearchfaqpage-container">
      <h2 className="stockresearchfaqpage-title">Frequently Asked Questions</h2>
      <div className="stockresearchfaqpage-faqs">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleFaqAnswer(index)}
            >
              {index + 1}. {faq.question}
              <span className="faq-icon">
                {openIndex === index ? <FaAngleUp className="upfaq" /> : <FaAngleDown className="downfaq" />}
              </span>
            </button>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
