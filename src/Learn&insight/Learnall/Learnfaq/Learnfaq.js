import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './Learnfaq.css';

const FaqDropdown = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaqAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Who should take this stock market course?',
      answer:
        'This course is ideal for anyone interested in learning how to trade or invest in the stock market, whether you’re a complete beginner or have some experience. It is also beneficial for those who want to improve their trading skills, learn about risk management, and develop a structured approach to making informed investment decisions.',
    },
    {
      question: 'Do I need any prior experience to take this course?',
      answer:
        'No prior experience is required. The course is designed to guide you through the basics and gradually build up to more advanced concepts. Whether you are a novice or someone with some understanding of the stock market, the course is structured to meet your needs.',
    },
    {
      question:
        'Is this course suitable for long-term investors or only short-term traders?',
      answer:
        'This course is suitable for both long-term investors and short-term traders. It covers a wide range of topics, including long-term investment strategies, as well as short-term trading techniques such as day trading and swing trading. You can apply the knowledge gained to whichever approach suits your investment goals.',
    },
    {
      question: 'How can I get started with the stock market course?',
      answer:
        'To get started, simply choose a course provider that aligns with your learning needs and goals. You can enroll online, and some platforms may offer free introductory sessions or trials to help you decide if the course is right for you.',
    },
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
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

export default FaqDropdown;