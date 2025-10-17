import React, { useState, useEffect } from 'react';
import './App.css';
import MealCard from './components/MealCard';
import PointsDisplay from './components/PointsDisplay';
import BadgeSystem from './components/BadgeSystem';
import { mealData, recommendedProducts } from './data/staticData';

function App() {
  const [meals, setMeals] = useState([]);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    // Generate initial meals based on recommended products
    generateMeals();
  }, []);

  const generateMeals = () => {
    // Simulate AI meal generation based on recommended products
    const availableMeals = mealData.filter(meal => 
      meal.ingredients.some(ingredient => 
        recommendedProducts.includes(ingredient)
      )
    );
    
    // Shuffle and take first 4 meals
    const shuffled = availableMeals.sort(() => 0.5 - Math.random());
    setMeals(shuffled.slice(0, 4));
  };

  const handleMealSelect = (meal, isBestMeal = false) => {
    setSelectedMeal(meal);
    
    // Award points based on meal selection
    const pointsToAdd = isBestMeal ? 110 : 40;
    setPoints(prev => prev + pointsToAdd);
    
    // Show reward animation
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
    
    // Check for new badges
    checkForBadges(pointsToAdd);
  };

  const checkForBadges = (pointsAdded) => {
    const newBadges = [];
    
    if (points >= 100 && !badges.some(b => b.id === 'first_100')) {
      newBadges.push({
        id: 'first_100',
        name: 'First Century',
        description: 'Earned your first 100 points!',
        icon: '🏆'
      });
    }
    
    if (points >= 500 && !badges.some(b => b.id === 'meal_master')) {
      newBadges.push({
        id: 'meal_master',
        name: 'Meal Master',
        description: 'You\'re becoming a meal planning expert!',
        icon: '👨‍🍳'
      });
    }
    
    if (newBadges.length > 0) {
      setBadges(prev => [...prev, ...newBadges]);
    }
  };

  const shuffleMeals = () => {
    generateMeals();
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">
          <span className="title-icon">🍽️</span>
          AI Meal Generator
        </h1>
        <p className="subtitle">Turn your recommended products into delicious meals!</p>
      </div>

      <div className="dashboard">
        <div className="sidebar">
          <PointsDisplay points={points} />
          <BadgeSystem badges={badges} />
          
          <div className="recommended-products">
            <h3>📦 Recommended Products</h3>
            <div className="products-grid">
              {recommendedProducts.map((product, index) => (
                <div key={index} className="product-tag">
                  {product}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="meals-header">
            <h2>Today's Meal Suggestions</h2>
            <button className="shuffle-btn" onClick={shuffleMeals}>
              🔄 Shuffle Meals
            </button>
          </div>

          <div className="meals-grid">
            {meals.map((meal, index) => (
              <MealCard
                key={meal.id}
                meal={meal}
                index={index}
                onSelect={handleMealSelect}
                isBestMeal={index === 0} // First meal is considered "best"
              />
            ))}
          </div>

          {selectedMeal && (
            <div className="selected-meal-info">
              <h3>✅ You selected: {selectedMeal.name}</h3>
              <p>Great choice! You earned {selectedMeal.isBestMeal ? 110 : 40} points!</p>
            </div>
          )}
        </div>
      </div>

      {showReward && (
        <div className="reward-animation">
          <div className="reward-content">
            <span className="reward-icon">🎉</span>
            <span className="reward-text">+{selectedMeal?.isBestMeal ? 110 : 40} Points!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
