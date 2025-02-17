import React from 'react';
import './Modulelearncourse.css'; // Create a CSS file for styling
import moduleIcon from '../../../assest/desktop.jpeg';
import instructorImage from '../../../assest/instructor.jpg'; // Replace with the path to your instructor image
import { FaAngleDown } from "react-icons/fa6";

const ModulecourseDetails = () => {
  const modules = [
    {
      id: 1,
      title: 'Introduction to Stock Trading and Technical Analysis',
      duration: '1:00 Hours',
    },
    {
      id: 2,
      title: 'Identifying Key Breakouts for Trading Opportunities',
      duration: '1:40 Hours',
    },
    {
      id: 3,
      title: 'Trading with the RSI Indicator',
      duration: '2:20 Hours',
    },
    {
      id: 4,
      title: 'Risk Management Strategies',
      duration: '1:00 Hours',
    },
  ];

  return (
    <div className="modulelearncourse-container">
      <div className="modulelearncourse-section">
        {modules.map((module) => (
          <div key={module.id} className="modulelearncourse-card">
            <div className="modulelearncourse-icon">
              <img src={moduleIcon} alt="Module Icon" />
            </div>
            <div className="modulelearncourse-info">
              <p className="modulelearncourse-title">
                <strong className='moduleid'>Module {module.id} :</strong> <br/>{module.title}
              </p>
              <p className="modulelearncourse-duration">
                1 Video • {module.duration}<FaAngleDown className='moduledownicon'/>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="modulelearncourse-instructor">
        <h3>Meet your instructor</h3>
        <div className="modulelearncourse-instructor-details">
          <img
            className="modulelearncourse-instructor-image"
            src={instructorImage}
            alt="Instructor"
          />
          <div className="modulelearncourse-instructor-info">
            <h4>Nagnath Shinde</h4>
            <p className="modulelearncourse-instructor-role">
              Director - Content, FinanceShastra
            </p>
            <p className="modulelearncourse-instructor-experience">
              10 years of experience
            </p>
            </div><br/>
           
        </div>
      </div>
      <p className="modulelearncourse-instructor-bio">
              Nagnath Shinde is a seasoned stock market professional with more
              than 10 years of experience in equity trading. He is recognized as
              a reliable authority in the investment world, with a strong
              commitment to simplifying complex financial principles and
              guiding individuals toward financial success.
            </p>
          
    </div>
  );
};

export default ModulecourseDetails;