import React from 'react';
import { Trophy, Star } from 'lucide-react';
import './PointsDisplay.css';

const PointsDisplay = ({ points }) => {
  return (
    <div className="points-display">
      <div className="points-header">
        <Trophy className="trophy-icon" />
        <h3>Your Points</h3>
      </div>
      <div className="points-value">
        <span className="points-number">{points}</span>
        <span className="points-label">points</span>
      </div>
      <div className="points-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
          ></div>
        </div>
        <span className="progress-text">
          {points}/1000 to next milestone
        </span>
      </div>
    </div>
  );
};

export default PointsDisplay;
