import React from 'react';
import './HeroAnimation.css';

const HeroAnimation = () => {
  return (
    <div className="hero-animation-container">
      <svg className="fiber-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="30%" stopColor="#db2777" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#db2777" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9d174d" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="30%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </linearGradient>

          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="glow-light">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Pink Fiber Bundle (Left) */}
        <g filter="url(#glow-strong)" opacity="0.6">
          <path d="M 450 -100 C 400 200, 200 400, -100 600" fill="none" stroke="url(#pink-gradient)" strokeWidth="8" className="fiber-path p1" />
          <path d="M 480 -100 C 430 250, 150 450, -100 650" fill="none" stroke="url(#pink-gradient)" strokeWidth="6" className="fiber-path p2" />
        </g>
        <g filter="url(#glow-light)">
          <path d="M 460 -100 C 410 220, 180 420, -100 620" fill="none" stroke="url(#pink-gradient)" strokeWidth="2" className="fiber-path p3" />
          <path d="M 440 -100 C 390 180, 220 380, -100 580" fill="none" stroke="url(#pink-gradient)" strokeWidth="3" className="fiber-path p4" />
          <path d="M 470 -100 C 420 280, 120 480, -100 680" fill="none" stroke="url(#pink-gradient)" strokeWidth="1" className="fiber-path p5" />
          <path d="M 430 -100 C 380 150, 250 350, -100 550" fill="none" stroke="url(#pink-gradient)" strokeWidth="2" className="fiber-path p6" />
          <path d="M 490 -100 C 440 300, 100 500, -100 700" fill="none" stroke="url(#pink-gradient)" strokeWidth="4" className="fiber-path p7" />
          <path d="M 500 -100 C 450 320, 80 520, -100 720" fill="none" stroke="url(#pink-gradient)" strokeWidth="2" className="fiber-path p8" />
          <path d="M 420 -100 C 370 120, 280 320, -100 520" fill="none" stroke="url(#pink-gradient)" strokeWidth="1" className="fiber-path p9" />
        </g>

        {/* Blue Fiber Bundle (Right) */}
        <g filter="url(#glow-strong)" opacity="0.5">
          <path d="M 750 -100 C 800 200, 1000 400, 1300 600" fill="none" stroke="url(#blue-gradient)" strokeWidth="8" className="fiber-path b1" />
          <path d="M 720 -100 C 770 250, 1050 450, 1300 650" fill="none" stroke="url(#blue-gradient)" strokeWidth="6" className="fiber-path b2" />
        </g>
        <g filter="url(#glow-light)">
          <path d="M 740 -100 C 790 220, 1020 420, 1300 620" fill="none" stroke="url(#blue-gradient)" strokeWidth="2" className="fiber-path b3" />
          <path d="M 760 -100 C 810 180, 980 380, 1300 580" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="fiber-path b4" />
          <path d="M 730 -100 C 780 280, 1080 480, 1300 680" fill="none" stroke="url(#blue-gradient)" strokeWidth="1" className="fiber-path b5" />
          <path d="M 770 -100 C 820 150, 950 350, 1300 550" fill="none" stroke="url(#blue-gradient)" strokeWidth="2" className="fiber-path b6" />
          <path d="M 710 -100 C 760 300, 1100 500, 1300 700" fill="none" stroke="url(#blue-gradient)" strokeWidth="4" className="fiber-path b7" />
          <path d="M 700 -100 C 750 320, 1120 520, 1300 720" fill="none" stroke="url(#blue-gradient)" strokeWidth="2" className="fiber-path b8" />
          <path d="M 780 -100 C 830 120, 920 320, 1300 520" fill="none" stroke="url(#blue-gradient)" strokeWidth="1" className="fiber-path b9" />
        </g>
      </svg>
    </div>
  );
};

export default HeroAnimation;
