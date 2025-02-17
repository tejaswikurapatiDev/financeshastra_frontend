import React, { useState } from "react";
import "./WhyFinCustomerReview.css";
import customerimg1 from '../../assest/customerreviewimg1.jpg';
import customerimg2 from '../../assest/customerreviewimg2.jpg';
import customerimg3 from '../../assest/customerreviewimg3.jpg';
import customerimg4 from '../../assest/customerreviewimg4.jpg';
import customerimg5 from '../../assest/customerreviewimg5.jpg';
import customerimg6 from '../../assest/customerreviewimg6.jpg';

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Savannah Nguyen",
      role: "Customer",
      text: "As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
      rating: 5,
      image: customerimg1,
    },
    {
      id: 2,
      name: "Italo Melo",
      role: "Customer",
      text: "As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
      rating: 4,
      image: customerimg2,
    },
    {
      id: 3,
      name: "Simon Robben",
      role: "Customer",
      text: "As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
      rating: 5,
      image: customerimg3,
    },
    {
      id: 4,
      name: "Justin Shaifer",
      role: "Customer",
      text: "As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
      rating: 3,
      image: customerimg4,
    },
    {
      id: 5,
      name: "Vinicius Wiesehofer",
      role: "Customer",
      text: "As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
      rating: 5,
      image: customerimg5,
    },
    {
      id: 6,
      name: "Daniel Xavier",
      role: "Customer",
      text: "As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
      rating: 4,
      image: customerimg6,
    },
  ];

  // Function to handle the "next" button
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Function to handle the "previous" button
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length // Use modulo to loop correctly
    );
  };

  // Function to get the 3 testimonials to show
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <div className="testimonial-slider-wrapper">
      <h2 className="testimonial-slider-heading">
        Why Our Customers Love FinanceShastra
      </h2>
      <div className="testimonial-slider-container">
        <button className="testimonial-nav-button prev" onClick={handlePrev}>
          ❮
        </button>
        {getVisibleTestimonials().map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p className="testimonial-text">"{testimonial.text}"</p>
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
               <div className="testimonial-rating">
              {"⭐".repeat(testimonial.rating)}
            </div>
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
           
           
              
              <div>
              
              
              </div>
            </div>
           
        
        ))}
        <button className="testimonial-nav-button next" onClick={handleNext}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
