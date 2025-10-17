import React from 'react';
import { Award, Star } from 'lucide-react';
import './BadgeSystem.css';

const BadgeSystem = ({ badges }) => {
  return (
    <div className="badge-system">
      <div className="badge-header">
        <Award className="award-icon" />
        <h3>Achievements</h3>
      </div>
      
      {badges.length === 0 ? (
        <div className="no-badges">
          <p>Complete meals to earn badges!</p>
        </div>
      ) : (
        <div className="badges-grid">
          {badges.map((badge) => (
            <div key={badge.id} className="badge-item">
              <div className="badge-icon">{badge.icon}</div>
              <div className="badge-info">
                <h4 className="badge-name">{badge.name}</h4>
                <p className="badge-description">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="badge-preview">
        <h4>Available Badges:</h4>
        <div className="preview-badges">
          <div className="preview-badge">
            <span className="preview-icon">🏆</span>
            <span>First Century (100 pts)</span>
          </div>
          <div className="preview-badge">
            <span className="preview-icon">👨‍🍳</span>
            <span>Meal Master (500 pts)</span>
          </div>
          <div className="preview-badge">
            <span className="preview-icon">⭐</span>
            <span>Best Choice Pro (10 best meals)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeSystem;
