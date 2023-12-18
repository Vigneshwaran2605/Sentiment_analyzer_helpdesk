import React, { useState, useEffect } from 'react';

const CircularProgress = ({ size = 100, strokeWidth = 10, percentage = 0, color }) => {
  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = percentage / 100 * circumference;

  useEffect(() => {
    const progressOffset = circumference - progress;
    setOffset(progressOffset);
  }, [setOffset, circumference, progress]);

  return (
    <svg width={size} height={size}>
      <circle
        className="progress-ring__circle"
        stroke="#ccc"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className="progress-ring__circle"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset: offset }}
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <text x={center} y={center} textAnchor="middle" dy=".3em" fill='white' fontSize="4em">
        4.5
      </text>
    </svg>
  );
};

export default CircularProgress;