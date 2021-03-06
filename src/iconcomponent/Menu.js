import React, { useContext, useRef, useEffect, useState } from 'react';
import { Color1 } from '../pages/Profile';

export default function Menu() {
  return (

    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <rect width="26" height="26" fill="white" />
        <circle cx="12.9998" cy="12.9998" r="11.5357" transform="rotate(45 12.9998 12.9998)" stroke="url(#paint0_linear)" stroke-width="1.5" />
        <circle cx="13.0002" cy="13.0002" r="11.5357" transform="rotate(135 13.0002 13.0002)" stroke="url(#paint1_linear)" stroke-width="1.5" />
      </g>
      <defs>
        <linearGradient id="paint0_linear" x1="12.9998" y1="0.714137" x2="12.9998" y2="25.2855" gradientUnits="userSpaceOnUse">

          <stop offset="0.223958" stop-color={localStorage.getItem('color')} stop-opacity="0" />
          <stop offset="0.473958" stop-color={localStorage.getItem('color')} stop-opacity="0.87" />
          <stop offset="0.526042" stop-color={localStorage.getItem('color')} stop-opacity="0.78" />
          <stop offset="0.765625" stop-color={localStorage.getItem('color')} stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="13.0002" y1="0.714566" x2="13.0002" y2="25.2859" gradientUnits="userSpaceOnUse">
          <stop offset="0.223958" stop-color={localStorage.getItem('color')} stop-opacity="0" />
          <stop offset="0.473958" stop-color={localStorage.getItem('color')} stop-opacity="0.87" />
          <stop offset="0.526042" stop-color={localStorage.getItem('color')} stop-opacity="0.78" />
          <stop offset="0.765625" stop-color={localStorage.getItem('color')} stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0">
          <rect width="26" height="26" fill="red" />
        </clipPath>
      </defs>
    </svg>


  )
}
