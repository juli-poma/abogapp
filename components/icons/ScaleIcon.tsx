import React from 'react';

export const ScaleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 7v10l10 5 10-5V7"></path>
    <path d="M12 22V12"></path>
    <path d="M6 12l-4-2"></path>
    <path d="M18 12l4-2"></path>
  </svg>
);