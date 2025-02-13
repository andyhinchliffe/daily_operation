"use client"

import React from 'react'

const NumberSwitch = ({ postNum }) => {
    let result;
  
    switch (number) {
      case 10:
        result = 1;
        break;
      case 20:
        result = 2;
        break;
      case 30:
        result = 3;
        break;
      case 40:
        result = 4;
        break;
      case 50:
        result = 5;
        break;
      case 60:
        result = 6;
        break;
      case 70:
        result = 7;
        break;
      case 80:
        result = 8;
        break;
      case 90:
        result = 9;
        break;
      case 100:
        result = 10;
        break;
      default:
        result = "Invalid number";
    }

const postNumTool = (postNum) => {
  return (
    
        <div>Number: {result}</div>;

    
  )
}

export default postNumTool