import React from 'react';

/**
 * The compass-rose mark on its own, without the wordmark.
 *
 * Fills with `currentColor` and carries no background of its own, so it sits
 * inside whatever badge the caller provides — the round `.brand-icon` in the
 * navbar, the rounded square in the chatbot header.
 */
const LogoMark = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M17 6 L19.2 14.8 L28 17 L19.2 19.2 L17 28 L14.8 19.2 L6 17 L14.8 14.8 Z"
      fill="currentColor"
      transform="rotate(15 17 17)"
    />
  </svg>
);

export default LogoMark;
