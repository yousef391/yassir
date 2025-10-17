import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import './MealCard.css';

const MealCard = ({ meal, index, onSelect, isBestMeal }) => {
  const handleSelect = () => {
    onSelect(meal, isBestMeal);
  };

  return (
    <div className={`meal-card ${isBestMeal ? 'best-meal' : ''}`}>
      {isBestMeal && (
        <div className="best-badge">
          <Star className="star-icon" />
          <span>Best Choice!</span>
        </div>
      )}
      
      <div className="meal-header">
        <h3 className="meal-name">{meal.name}</h3>
        <div className="meal-type">{meal.type}</div>
      </div>
      
      <div className="meal-image">
        <div className="meal-emoji">{meal.emoji}</div>
      </div>
      
      <div className="meal-info">
        <div className="prep-time">
          <Clock size={16} />
          <span>{meal.prepTime}</span>
        </div>
        <div className="servings">
          <Users size={16} />
          <span>{meal.servings}</span>
        </div>
      </div>
      
      <div className="ingredients-section">
        <h4>Ingredients:</h4>
        <div className="ingredients-list">
          {meal.ingredients.map((ingredient, idx) => (
            <span key={idx} className="ingredient-tag">
              {ingredient}
            </span>
          ))}
        </div>
      </div>
      
      <div className="meal-stats">
        <div className="stat">
          <span className="stat-label">Calories:</span>
          <span className="stat-value">{meal.calories}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Difficulty:</span>
          <span className="stat-value">{meal.difficulty}</span>
        </div>
      </div>
      
      <button 
        className={`select-meal-btn ${isBestMeal ? 'best-btn' : ''}`}
        onClick={handleSelect}
      >
        {isBestMeal ? '⭐ Select Best Meal (+110 pts)' : 'Select Meal (+40 pts)'}
      </button>
    </div>
  );
};

export default MealCard;
