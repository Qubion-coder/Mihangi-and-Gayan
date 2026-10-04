import React, { useState, useEffect, useRef } from "react";

interface EnvelopeOpeningProps {
  key?: React.Key;
  onComplete: () => void;
  onMusicStart?: () => void;
  event?: string | null;
  readyToTransition?: boolean;
}

export function EnvelopeOpening({
  onComplete,
  onMusicStart,
  event = 'both',
  readyToTransition = true,
}: EnvelopeOpeningProps) {
  const [opened, setOpened] = useState(false);
  const [exiting, setExiting] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!opened || !readyToTransition || completedRef.current) return;

    const timer = window.setTimeout(() => {
      completedRef.current = true;
      setExiting(true);
      window.setTimeout(() => onComplete(), 400);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [opened, readyToTransition, onComplete]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          background: #fffff4;
        }

        .scene {
          position: fixed;
          inset: 0;
          z-index: 100;
          min-height: 100vh;
          min-height: 100dvh;
          transition: opacity 0.4s ease;
        }

        .scene.is-exiting {
          opacity: 0;
          pointer-events: none;
        }

        .scene-inner {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: radial-gradient(ellipse at 30% 20%, #fffff4 0%, #e3e7de 40%, #667558 100%);
          perspective: 1500px;
          overflow: hidden;
          font-family: "Cormorant Garamond", serif;
        }

        /* Ambient floating orbs */
        .scene::before,
        .scene::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .scene::before {
          width: 400px;
          height: 400px;
          top: -100px;
          right: -100px;
          background: radial-gradient(circle, rgba(102,117,88,0.2) 0%, transparent 70%);
        }
        .scene::after {
          width: 300px;
          height: 300px;
          bottom: -80px;
          left: -80px;
          background: radial-gradient(circle, rgba(102,117,88,0.15) 0%, transparent 70%);
        }

        .envelope-container {
          position: relative;
          width: min(460px, 92vw);
          height: min(680px, 85vh);
          cursor: pointer;
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
        }

        .envelope-container:not(.is-open):hover {
          transform: scale(1.02);
        }

        /* Envelope Back Base */
        .envelope-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #fdfbf7, #f4eee1);
          border-radius: 6px;
          box-shadow: 0 30px 60px -15px rgba(176,154,183,0.3), 0 0 0 1px rgba(176,154,183,0.1);
          z-index: 1;
        }

        /* Card Container */
        .card-container {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #ffffff 0%, #fdfbf7 50%, #fdfbf7 100%);
          border-radius: 6px;
          z-index: 2;
          overflow: hidden;
          box-shadow: inset 0 0 30px rgba(176,154,183,0.05);
          transform: scale(1);
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .envelope-container.is-open .card-container {
          transform: scale(1.03);
          z-index: 4;
        }

        /* Elegant Gold Double Border */
        .card-border {
          position: absolute;
          inset: 18px;
          border: 1.5px solid rgba(120,97,125,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          text-align: center;
        }

        .card-border::before {
          content: '';
          position: absolute;
          inset: 7px;
          border: 0.5px solid rgba(120,97,125,0.2);
        }

        /* Corner Ornaments */
        .corner-ornament {
          position: absolute;
          width: 60px;
          height: 60px;
          pointer-events: none;
          z-index: 3;
        }
        .corner-tl { top: 10px; left: 10px; }
        .corner-tr { top: 10px; right: 10px; transform: scaleX(-1); }
        .corner-bl { bottom: 10px; left: 10px; transform: scaleY(-1); }
        .corner-br { bottom: 10px; right: 10px; transform: scale(-1, -1); }

        /* Decorative Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
          z-index: 2;
        }
        .divider-line {
          width: 50px;
          height: 0.5px;
          background: linear-gradient(90deg, transparent, #b89645, transparent);
        }
        .divider-diamond {
          width: 6px;
          height: 6px;
          background: #b89645;
          transform: rotate(45deg);
          opacity: 0.7;
        }

        /* Typography */
        .text-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #b89645;
          margin-bottom: 20px;
          z-index: 2;
          font-weight: 400;
        }

        .text-names {
          font-family: var(--font-names), "Cinzel Decorative", serif;
          font-size: 60px;
          line-height: 1.1;
          color: #4a3a4d;
          margin: 0;
          font-weight: 400;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .text-ampersand {
          font-family: "Great Vibes", cursive;
          font-size: 40px;
          display: block;
          margin: -2px 0;
          color: #b89645;
          text-shadow: 0 1px 2px rgba(120,97,125,0.3);
        }

        .text-details {
          font-family: 'Montserrat', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #b89645;
          line-height: 2.2;
          margin-bottom: auto;
          z-index: 2;
          font-weight: 300;
        }

        .text-date {
          display: block;
          margin: 12px 0;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          color: #b89645;
        }

        .text-church {
          font-family: "Cormorant Garamond", serif;
          font-size: 14px;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #b89645;
          margin-top: 4px;
          text-transform: none;
        }

        /* Envelope Fold (Left Flap) */
        .flap-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 66%;
          height: 100%;
          background: linear-gradient(135deg, #fdfbf7 0%, #f4eee1 50%, #fdfbf7 100%);
          background-image: linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%);
          background-size: 8px 8px;
          border-right: 1px solid rgba(120,97,125,0.15);
          box-shadow: 10px 0 30px -10px rgba(120,97,125,0.25);
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 1.5s cubic-bezier(0.25, 1, 0.3, 1), box-shadow 1.5s ease;
          z-index: 5;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        .flap-left::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset -3px 0 8px rgba(0,0,0,0.04);
          pointer-events: none;
        }

        .envelope-container.is-open .flap-left {
          transform: rotateY(-140deg);
          box-shadow: -15px 0 25px -10px rgba(0,0,0,0.15);
        }

        /* Satin Ribbon */
        .ribbon-wrap {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          width: 100%;
          z-index: 6;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .envelope-container.is-open .ribbon-wrap {
          opacity: 0;
          transform: translateY(-50%) scale(1.05);
          pointer-events: none;
        }

        .ribbon-band {
          width: 100%;
          height: 54px;
          background: linear-gradient(
            to bottom, 
            #ffffff 0%, 
            #fdfbf7 25%, 
            #f4eee1 50%, 
            #fdfbf7 75%, 
            #e8dfce 100%
          );
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), inset 0 1px rgba(255,255,255,0.6);
        }

        /* Bow Container */
        .bow-center {
          position: absolute;
          top: 27px;
          left: 55%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 100px;
        }

        /* Image Bow styling */
        .bow-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 6px 8px rgba(0,0,0,0.15)) sepia(0.3) saturate(0.7) brightness(1.1) hue-rotate(350deg);
          transform: scale(1.6);
        }

        .instruction-toast {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          color: #b89645;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          opacity: 1;
          transition: opacity 0.5s;
          white-space: nowrap;
          font-weight: 400;
        }

        .envelope-container.is-open .instruction-toast {
          opacity: 0;
        }

        /* Shimmer animation for gold accents */
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        @media (max-width: 600px) {
          .envelope-container {
            width: 340px;
            height: 520px;
          }
          .text-names {
            font-size: 46px;
          }
          .text-ampersand {
            font-size: 32px;
          }
          .corner-ornament {
            width: 45px;
            height: 45px;
          }
          .card-border {
            padding: 30px 16px;
          }
          .bow-center {
            width: 140px;
            height: 90px;
          }
        }
      `}</style>

      <div className={`scene ${exiting ? 'is-exiting' : ''}`}>
        <div className="scene-inner">
        <div
          className={`envelope-container ${opened ? 'is-open' : ''}`}
          onClick={() => {
            if (!opened) {
              setOpened(true);
              if (onMusicStart) onMusicStart();
            }
          }}
        >
          {/* Base shadow behind the card */}
          <div className="envelope-base"></div>

          {/* Inner Card */}
          <div className="card-container">
            <div className="card-border">
              {/* 4 Corner Gold Ornaments */}
              <svg className="corner-ornament corner-tl" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#b89645" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#b89645" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#b89645" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>
              <svg className="corner-ornament corner-tr" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#b89645" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#b89645" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#b89645" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>
              <svg className="corner-ornament corner-bl" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#b89645" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#b89645" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#b89645" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>
              <svg className="corner-ornament corner-br" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#b89645" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#b89645" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#b89645" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#b89645" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>

              <div className="text-eyebrow">Promise of Love</div>

              <div className="divider">
                <div className="divider-line" />
                <div className="divider-diamond" />
                <div className="divider-line" />
              </div>

              <h1 className="text-names">
                Mihingi
                <span className="text-ampersand">&</span>
                Gayan
              </h1>




            </div>
          </div>

          {/* Opening Left Flap */}
          <div className="flap-left"></div>

          {/* Ribbon Wrapper */}
          <div className="ribbon-wrap">
            <div className="ribbon-band"></div>
            <div className="bow-center">
              {/* Photorealistic Satin Bow Image */}
              <img src="/bow_transparent.png" alt="Satin Bow" loading="eager" className="bow-image" />
            </div>
          </div>

          <div className="instruction-toast">Click to unwrap</div>
        </div>
        </div>
      </div>
    </>
  );
}
