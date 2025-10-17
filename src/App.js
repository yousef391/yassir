import React, { useState, useEffect } from 'react';
import './App.css';
import MealCard from './components/MealCard';
import PointsDisplay from './components/PointsDisplay';
import BadgeSystem from './components/BadgeSystem';
import { 
  mealData, 
  dessertData, 
  electronicsData, 
  babyData, 
  algerianData,
  beautyData,
  homeData,
  recommendedProducts, 
  categorizeProducts,
  productCategories,
  createComprehensiveSuggestions
} from './data/staticData';

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('food');

  useEffect(() => {
    // Generate initial suggestions based on recommended products
    generateSuggestions();
  }, []);

  const generateSuggestions = () => {
    // Create comprehensive suggestions based on recommended products
    const comprehensiveSuggestions = createComprehensiveSuggestions(recommendedProducts);
    
    if (comprehensiveSuggestions.length > 0) {
      setSuggestions(comprehensiveSuggestions);
      // Set category based on the first suggestion
      setCurrentCategory(comprehensiveSuggestions[0].bundleType);
      return;
    }

    // Fallback to basic suggestions if no comprehensive suggestions available
    const categories = categorizeProducts(recommendedProducts);
    
    // Find the category with the most products
    let maxCategory = 'food';
    let maxCount = 0;
    
    Object.keys(categories).forEach(category => {
      if (categories[category].length > maxCount) {
        maxCount = categories[category].length;
        maxCategory = category;
      }
    });

    setCurrentCategory(maxCategory);

    // Get appropriate suggestions based on category
    let availableSuggestions = [];
    switch (maxCategory) {
      case 'food':
        availableSuggestions = [...mealData, ...algerianData];
        break;
      case 'dessert':
        availableSuggestions = dessertData;
        break;
      case 'electronics':
        availableSuggestions = electronicsData;
        break;
      case 'baby':
        availableSuggestions = babyData;
        break;
      case 'beauty':
        availableSuggestions = beautyData;
        break;
      case 'home':
        availableSuggestions = homeData;
        break;
      default:
        availableSuggestions = mealData;
    }
    
    // Shuffle and take first 4 suggestions
    const shuffled = availableSuggestions.sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 4));
  };

  const handleSuggestionSelect = (suggestion, isBestSuggestion = false) => {
    setSelectedSuggestion(suggestion);
    
    // Award points based on suggestion selection
    const pointsToAdd = isBestSuggestion ? 110 : 40;
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
        name: 'Suggestion Master',
        description: 'You\'re becoming a suggestion expert!',
        icon: '👨‍🍳'
      });
    }
    
    if (newBadges.length > 0) {
      setBadges(prev => [...prev, ...newBadges]);
    }
  };

  const shuffleSuggestions = () => {
    generateSuggestions();
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">
          <span className="title-icon">🎯</span>
          AI Smart Suggestions
        </h1>
        <p className="subtitle">Turn your recommended products into smart suggestions!</p>
        <div className="category-indicator">
          <span className="current-category">
            {suggestions.length > 0 && suggestions[0].bundleType === 'food' ? 'Food & Recipes' :
             suggestions.length > 0 && suggestions[0].bundleType === 'electronics' ? 'Electronics & Tech' :
             suggestions.length > 0 && suggestions[0].bundleType === 'beauty' ? 'Beauty & Skincare' :
             suggestions.length > 0 && suggestions[0].bundleType === 'baby' ? 'Baby & Kids' :
             suggestions.length > 0 && suggestions[0].bundleType === 'home' ? 'Home & Garden' :
             suggestions.length > 0 && suggestions[0].bundleType === 'innovation' ? 'Innovation Bundles' :
             'Mixed Suggestions'}
          </span>
        </div>
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
          <div className="suggestions-header">
            <h2>Today's Smart Suggestions</h2>
            <button className="shuffle-btn" onClick={shuffleSuggestions}>
              🔄 Shuffle Suggestions
            </button>
          </div>

          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <MealCard
                key={suggestion.id}
                meal={suggestion}
                index={index}
                onSelect={handleSuggestionSelect}
                isBestMeal={index === 0} // First suggestion is considered "best"
              />
            ))}
          </div>

          {selectedSuggestion && (
            <div className="selected-suggestion-info">
              <h3>✅ You selected: {selectedSuggestion.name}</h3>
              <p>Great choice! You earned {selectedSuggestion.isBestMeal ? 110 : 40} points!</p>
            </div>
          )}

          <div className="recommended-products-section">
            <h3>📦 Your Recommended Products</h3>
            <div className="products-grid-main">
              {recommendedProducts.slice(0, 6).map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-icon">
                    {product.includes('smart') ? '🏠' :
                     product.includes('laptop') ? '💻' :
                     product.includes('phone') ? '📱' :
                     product.includes('baby') ? '👶' :
                     product.includes('cleanser') || product.includes('moisturizer') ? '✨' :
                     product.includes('lipstick') || product.includes('foundation') ? '💄' :
                     product.includes('seeds') || product.includes('soil') ? '🌱' :
                     product.includes('knife') || product.includes('cutting') ? '🍴' :
                     product.includes('eggs') ? '🥚' :
                     product.includes('milk') ? '🥛' :
                     product.includes('bread') ? '🍞' :
                     product.includes('tomato') ? '🍅' :
                     product.includes('cheese') ? '🧀' :
                     product.includes('chicken') ? '🍗' :
                     product.includes('rice') ? '🍚' :
                     product.includes('coffee') ? '☕' :
                     '📦'}
                  </div>
                  <div className="product-name">{product}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showReward && (
        <div className="reward-animation">
          <div className="reward-content">
            <span className="reward-icon">🎉</span>
            <span className="reward-text">+{selectedSuggestion?.isBestMeal ? 110 : 40} Points!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
