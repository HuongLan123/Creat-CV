import React, { useState, useEffect } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://jobsgo.vn/cv_template/assets/images/theme/theme_42.png',
    'https://ghichu.vn/blog/wp-content/uploads/2022/05/image3.jpg',
    'https://jobsgo.vn/cv_template/assets/images/theme/theme_28.png',
    'https://cdn1.vieclam24h.vn/images/assets/img/071-blue-simple-company.jpg',
    'https://static.careerlink.vn/vcv/confidential/ebea2c9a74f726aeda701889e33ec1d0.png',
    'https://marketplace.canva.com/EAExMKG5W_s/1/0/1131w/canva-m%C3%A0u-be-v%C3%A0-n%C3%A2u-kh%E1%BB%91i-m%C3%A0u-c%E1%BA%A5p-%C4%91%E1%BB%99-c%C6%A1-b%E1%BA%A3n-ng%C6%B0%E1%BB%9Di-m%E1%BB%9Bi-s%C6%A1-y%E1%BA%BFu-l%C3%BD-l%E1%BB%8Bch-ZiW6ckPQLXY.jpg'
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Chuyển ảnh sau mỗi 3 giây
    return () => clearInterval(interval);
  }, [images.length]);

  // Lấy 4 ảnh tiếp theo dựa trên currentIndex
  const visibleImages = images
    .slice(currentIndex, currentIndex + 4)
    .concat(images.slice(0, Math.max(0, currentIndex + 4 - images.length)));

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Create Your Perfect CV</h1>
        <p className="subtitle">Choose a CV template and get started.</p>
      </div>

      <div className="cv-gallery">
        {visibleImages.map((image, index) => (
          <div
            key={index}
            className="cv-item"
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt={`CV Template ${index + 1}`} className="cv-image" />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>×</span>
            <img src={currentImage} alt="Expanded CV" className="expanded-image" />
          </div>
        </div>
      )}

      <div className="get-started">
        <Link to = '/CV1'><button className="get-started-btn">Get Started</button></Link>
      </div>
    </div>
  );
};

export default Home;
