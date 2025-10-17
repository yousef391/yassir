// Product categories and their corresponding suggestions
export const productCategories = {
  food: {
    name: "Food & Recipes",
    icon: "🍽️",
    suggestions: "mealData"
  },
  dessert: {
    name: "Desserts & Sweets", 
    icon: "🍰",
    suggestions: "dessertData"
  },
  electronics: {
    name: "Electronics & Tech",
    icon: "📱",
    suggestions: "electronicsData"
  },
  baby: {
    name: "Baby & Kids",
    icon: "👶",
    suggestions: "babyData"
  },
  beauty: {
    name: "Beauty & Health",
    icon: "💄",
    suggestions: "beautyData"
  },
  home: {
    name: "Home & Garden",
    icon: "🏠",
    suggestions: "homeData"
  }
};

// Static meal data for the AI Meal Generator - Creative & International Recipes
export const mealData = [
  {
    id: 1,
    name: "Japanese Tamago Kake Gohan",
    type: "Breakfast",
    emoji: "🍚",
    prepTime: "8 min",
    servings: "1",
    calories: "420",
    difficulty: "Easy",
    ingredients: ["rice", "eggs", "cheese", "milk"]
  },
  {
    id: 2,
    name: "Turkish Menemen",
    type: "Breakfast",
    emoji: "🥘",
    prepTime: "12 min",
    servings: "2",
    calories: "380",
    difficulty: "Medium",
    ingredients: ["eggs", "tomato", "cheese", "bread"]
  },
  {
    id: 3,
    name: "Korean Kimchi Fried Rice",
    type: "Lunch",
    emoji: "🍛",
    prepTime: "15 min",
    servings: "2",
    calories: "450",
    difficulty: "Medium",
    ingredients: ["rice", "eggs", "cheese", "garlic"]
  },
  {
    id: 4,
    name: "Italian Carbonara Fusion",
    type: "Lunch",
    emoji: "🍝",
    prepTime: "18 min",
    servings: "2",
    calories: "520",
    difficulty: "Medium",
    ingredients: ["pasta", "eggs", "cheese", "garlic"]
  },
  {
    id: 5,
    name: "Mexican Huevos Rancheros",
    type: "Breakfast",
    emoji: "🌶️",
    prepTime: "20 min",
    servings: "2",
    calories: "480",
    difficulty: "Medium",
    ingredients: ["eggs", "tomato", "cheese", "bread"]
  },
  {
    id: 6,
    name: "Indian Masala Scrambled Eggs",
    type: "Breakfast",
    emoji: "🥚",
    prepTime: "10 min",
    servings: "2",
    calories: "320",
    difficulty: "Easy",
    ingredients: ["eggs", "tomato", "garlic", "milk"]
  },
  {
    id: 7,
    name: "French Croque Monsieur",
    type: "Lunch",
    emoji: "🥪",
    prepTime: "15 min",
    servings: "1",
    calories: "580",
    difficulty: "Medium",
    ingredients: ["bread", "cheese", "milk", "eggs"]
  },
  {
    id: 8,
    name: "Thai Tom Kha Soup",
    type: "Lunch",
    emoji: "🍲",
    prepTime: "25 min",
    servings: "2",
    calories: "280",
    difficulty: "Medium",
    ingredients: ["milk", "tomato", "garlic", "rice"]
  },
  {
    id: 9,
    name: "Spanish Tortilla Española",
    type: "Lunch",
    emoji: "🥔",
    prepTime: "30 min",
    servings: "4",
    calories: "420",
    difficulty: "Hard",
    ingredients: ["eggs", "tomato", "cheese", "garlic"]
  },
  {
    id: 10,
    name: "Lebanese Fattoush Bowl",
    type: "Lunch",
    emoji: "🥗",
    prepTime: "12 min",
    servings: "2",
    calories: "220",
    difficulty: "Easy",
    ingredients: ["tomato", "cheese", "bread", "garlic"]
  },
  {
    id: 11,
    name: "Chinese Egg Fried Rice",
    type: "Lunch",
    emoji: "🍚",
    prepTime: "15 min",
    servings: "2",
    calories: "380",
    difficulty: "Easy",
    ingredients: ["rice", "eggs", "garlic", "cheese"]
  },
  {
    id: 12,
    name: "Greek Avgolemono Soup",
    type: "Lunch",
    emoji: "🍲",
    prepTime: "20 min",
    servings: "2",
    calories: "250",
    difficulty: "Medium",
    ingredients: ["eggs", "milk", "rice", "garlic"]
  },
  {
    id: 13,
    name: "Brazilian Pão de Açúcar",
    type: "Breakfast",
    emoji: "🍞",
    prepTime: "8 min",
    servings: "1",
    calories: "350",
    difficulty: "Easy",
    ingredients: ["bread", "cheese", "milk", "eggs"]
  },
  {
    id: 14,
    name: "Moroccan Shakshuka",
    type: "Breakfast",
    emoji: "🍳",
    prepTime: "25 min",
    servings: "2",
    calories: "420",
    difficulty: "Medium",
    ingredients: ["eggs", "tomato", "garlic", "bread"]
  },
  {
    id: 15,
    name: "Vietnamese Cà Phê Trứng",
    type: "Snack",
    emoji: "☕",
    prepTime: "5 min",
    servings: "1",
    calories: "180",
    difficulty: "Easy",
    ingredients: ["milk", "eggs", "cheese"]
  },
  {
    id: 16,
    name: "Ethiopian Doro Wat",
    type: "Lunch",
    emoji: "🍗",
    prepTime: "35 min",
    servings: "3",
    calories: "520",
    difficulty: "Hard",
    ingredients: ["chicken", "tomato", "garlic", "bread"]
  },
  {
    id: 17,
    name: "Peruvian Causa Rellena",
    type: "Lunch",
    emoji: "🥔",
    prepTime: "30 min",
    servings: "2",
    calories: "450",
    difficulty: "Medium",
    ingredients: ["eggs", "tomato", "cheese", "garlic"]
  },
  {
    id: 19,
    name: "Filipino Silog Breakfast",
    type: "Breakfast",
    emoji: "🍳",
    prepTime: "12 min",
    servings: "1",
    calories: "520",
    difficulty: "Easy",
    ingredients: ["rice", "eggs", "garlic", "tomato"]
  },
  {
    id: 20,
    name: "Nigerian Jollof Rice",
    type: "Lunch",
    emoji: "🍚",
    prepTime: "25 min",
    servings: "3",
    calories: "480",
    difficulty: "Medium",
    ingredients: ["rice", "tomato", "garlic", "chicken"]
  }
];

// Dessert suggestions including tiramisu and international desserts
export const dessertData = [
  {
    id: 1,
    name: "Italian Tiramisu",
    type: "Dessert",
    emoji: "🍰",
    prepTime: "30 min",
    servings: "6",
    calories: "320",
    difficulty: "Medium",
    ingredients: ["mascarpone", "coffee", "eggs", "cocoa powder"]
  },
  {
    id: 2,
    name: "French Crème Brûlée",
    type: "Dessert",
    emoji: "🍮",
    prepTime: "45 min",
    servings: "4",
    calories: "280",
    difficulty: "Medium",
    ingredients: ["cream", "eggs", "vanilla", "sugar"]
  },
  {
    id: 3,
    name: "Turkish Baklava",
    type: "Dessert",
    emoji: "🥮",
    prepTime: "60 min",
    servings: "12",
    calories: "450",
    difficulty: "Hard",
    ingredients: ["phyllo dough", "nuts", "honey", "butter"]
  },
  {
    id: 4,
    name: "Japanese Mochi Ice Cream",
    type: "Dessert",
    emoji: "🍡",
    prepTime: "20 min",
    servings: "8",
    calories: "180",
    difficulty: "Easy",
    ingredients: ["rice flour", "ice cream", "sugar", "cornstarch"]
  },
  {
    id: 5,
    name: "Mexican Churros",
    type: "Dessert",
    emoji: "🍩",
    prepTime: "25 min",
    servings: "6",
    calories: "220",
    difficulty: "Medium",
    ingredients: ["flour", "eggs", "sugar", "cinnamon"]
  }
];

// Electronics bundles and packages
export const electronicsData = [
  {
    id: 1,
    name: "Smart Home Starter Pack",
    type: "Electronics Bundle",
    emoji: "🏠",
    prepTime: "N/A",
    servings: "1 Pack",
    calories: "N/A",
    difficulty: "Easy Setup",
    ingredients: ["Smart Speaker", "Smart Bulbs", "Smart Plug", "Hub"]
  },
  {
    id: 2,
    name: "Gaming Setup Bundle",
    type: "Electronics Bundle",
    emoji: "🎮",
    prepTime: "N/A",
    servings: "1 Pack",
    calories: "N/A",
    difficulty: "Medium Setup",
    ingredients: ["Gaming Console", "Controller", "Headset", "HDMI Cable"]
  },
  {
    id: 3,
    name: "Office Productivity Pack",
    type: "Electronics Bundle",
    emoji: "💻",
    prepTime: "N/A",
    servings: "1 Pack",
    calories: "N/A",
    difficulty: "Easy Setup",
    ingredients: ["Laptop", "Mouse", "Keyboard", "Monitor"]
  },
  {
    id: 4,
    name: "Mobile Accessories Kit",
    type: "Electronics Bundle",
    emoji: "📱",
    prepTime: "N/A",
    servings: "1 Pack",
    calories: "N/A",
    difficulty: "Easy Setup",
    ingredients: ["Phone Case", "Screen Protector", "Charger", "Earbuds"]
  }
];

// Baby products and care bundles
export const babyData = [
  {
    id: 1,
    name: "Newborn Care Essentials",
    type: "Baby Bundle",
    emoji: "👶",
    prepTime: "N/A",
    servings: "1 Bundle",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Diapers", "Baby Wipes", "Baby Lotion", "Pacifier"]
  },
  {
    id: 2,
    name: "Feeding Time Bundle",
    type: "Baby Bundle",
    emoji: "🍼",
    prepTime: "N/A",
    servings: "1 Bundle",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Baby Bottles", "Formula", "Bib", "Burp Cloth"]
  },
  {
    id: 3,
    name: "Sleep & Comfort Pack",
    type: "Baby Bundle",
    emoji: "😴",
    prepTime: "N/A",
    servings: "1 Bundle",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Sleep Sack", "Pacifier", "White Noise Machine", "Night Light"]
  },
  {
    id: 4,
    name: "Playtime Essentials",
    type: "Baby Bundle",
    emoji: "🧸",
    prepTime: "N/A",
    servings: "1 Bundle",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Soft Toys", "Rattle", "Teething Ring", "Play Mat"]
  }
];

// Algerian dishes
export const algerianData = [
  {
    id: 1,
    name: "Couscous Algérien",
    type: "Main Course",
    emoji: "🍲",
    prepTime: "45 min",
    servings: "4",
    calories: "520",
    difficulty: "Medium",
    ingredients: ["couscous", "lamb", "vegetables", "chickpeas"]
  },
  {
    id: 2,
    name: "Tajine Algérien",
    type: "Main Course",
    emoji: "🥘",
    prepTime: "60 min",
    servings: "4",
    calories: "480",
    difficulty: "Medium",
    ingredients: ["chicken", "potatoes", "carrots", "onions"]
  },
  {
    id: 3,
    name: "Chorba Algérienne",
    type: "Soup",
    emoji: "🍲",
    prepTime: "30 min",
    servings: "4",
    calories: "280",
    difficulty: "Easy",
    ingredients: ["lamb", "tomatoes", "onions", "herbs"]
  },
  {
    id: 4,
    name: "Brik Algérien",
    type: "Appetizer",
    emoji: "🥟",
    prepTime: "25 min",
    servings: "6",
    calories: "320",
    difficulty: "Medium",
    ingredients: ["phyllo dough", "eggs", "tuna", "herbs"]
  }
];

// Beauty and health bundles
export const beautyData = [
  {
    id: 1,
    name: "Skincare Routine Kit",
    type: "Beauty Bundle",
    emoji: "✨",
    prepTime: "N/A",
    servings: "1 Kit",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Cleanser", "Toner", "Moisturizer", "Sunscreen"]
  },
  {
    id: 2,
    name: "Makeup Essentials Pack",
    type: "Beauty Bundle",
    emoji: "💄",
    prepTime: "N/A",
    servings: "1 Pack",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Foundation", "Mascara", "Lipstick", "Blush"]
  }
];

// Home and garden bundles
export const homeData = [
  {
    id: 1,
    name: "Kitchen Essentials Bundle",
    type: "Home Bundle",
    emoji: "🍴",
    prepTime: "N/A",
    servings: "1 Bundle",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Knife Set", "Cutting Board", "Pots", "Pans"]
  },
  {
    id: 2,
    name: "Garden Starter Kit",
    type: "Home Bundle",
    emoji: "🌱",
    prepTime: "N/A",
    servings: "1 Kit",
    calories: "N/A",
    difficulty: "Easy",
    ingredients: ["Seeds", "Soil", "Pots", "Watering Can"]
  }
];

// Recommended products from the recommendation system
export const recommendedProducts = [
  // Food items
  "eggs", "milk", "bread", "tomato", "cheese", "pasta", "chicken", "rice", "onion", "garlic",
  // Dessert ingredients
  "mascarpone", "coffee", "cocoa powder", "cream", "vanilla", "sugar", "phyllo dough", "nuts", "honey",
  // Electronics
  "smart speaker", "smart bulbs", "gaming console", "laptop", "phone case", "headphones",
  // Baby products
  "diapers", "baby wipes", "baby bottles", "pacifier", "baby formula", "baby toys",
  // Beauty products
  "cleanser", "moisturizer", "lipstick", "foundation", "mascara", "sunscreen",
  // Home products
  "knife set", "cutting board", "pots", "pans", "seeds", "soil", "watering can"
];

// Function to create comprehensive suggestions based on recommended products
export const createComprehensiveSuggestions = (products) => {
  const suggestions = [];
  const lowerProducts = products.map(p => p.toLowerCase());
  
  // MEALS that can be made with recommended products
  const availableMeals = [...mealData, ...algerianData, ...dessertData].filter(meal => 
    meal.ingredients.some(ingredient => 
      lowerProducts.includes(ingredient.toLowerCase())
    )
  );
  
  // Add meals that can be made
  availableMeals.slice(0, 2).forEach(meal => {
    suggestions.push({
      ...meal,
      bundleType: "food",
      description: `Perfect meal using your recommended ingredients: ${meal.ingredients.filter(ing => lowerProducts.includes(ing.toLowerCase())).join(', ')}`
    });
  });

  // ELECTRONICS BUNDLES
  if (lowerProducts.some(p => ['smart speaker', 'smart bulbs', 'smart plug'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_1`,
      name: "Smart Home Ecosystem",
      type: "Electronics Bundle",
      emoji: "🏠",
      prepTime: "N/A",
      servings: "1 Complete System",
      calories: "N/A",
      difficulty: "Easy Setup",
      ingredients: [...products.filter(p => ['smart speaker', 'smart bulbs', 'smart plug'].includes(p.toLowerCase())), "Smart Hub", "Mobile App"],
      bundleType: "electronics",
      description: "Complete smart home setup with your recommended products"
    });
  }
  
  if (lowerProducts.some(p => ['laptop', 'mouse', 'keyboard'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_2`,
      name: "Professional Workstation",
      type: "Electronics Bundle", 
      emoji: "💻",
      prepTime: "N/A",
      servings: "1 Setup",
      calories: "N/A",
      difficulty: "Easy Setup",
      ingredients: [...products.filter(p => ['laptop', 'mouse', 'keyboard'].includes(p.toLowerCase())), "Monitor", "Desk Lamp"],
      bundleType: "electronics",
      description: "Complete office setup with your recommended tech"
    });
  }

  if (lowerProducts.some(p => ['phone case', 'screen protector', 'charger'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_3`,
      name: "Phone Protection Kit",
      type: "Electronics Bundle",
      emoji: "📱",
      prepTime: "N/A", 
      servings: "1 Kit",
      calories: "N/A",
      difficulty: "Easy Setup",
      ingredients: [...products.filter(p => ['phone case', 'screen protector', 'charger'].includes(p.toLowerCase())), "Wireless Charger", "Phone Stand"],
      bundleType: "electronics",
      description: "Complete phone protection with your recommended accessories"
    });
  }

  // SKINCARE & BEAUTY BUNDLES
  if (lowerProducts.some(p => ['cleanser', 'moisturizer', 'sunscreen'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_4`,
      name: "Complete Skincare Routine",
      type: "Beauty Bundle",
      emoji: "✨",
      prepTime: "N/A",
      servings: "1 Routine",
      calories: "N/A", 
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['cleanser', 'moisturizer', 'sunscreen'].includes(p.toLowerCase())), "Toner", "Serum", "Face Mask"],
      bundleType: "beauty",
      description: "Complete skincare routine with your recommended products"
    });
  }

  if (lowerProducts.some(p => ['lipstick', 'foundation', 'mascara'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_5`,
      name: "Makeup Essentials Kit",
      type: "Beauty Bundle",
      emoji: "💄",
      prepTime: "N/A",
      servings: "1 Kit",
      calories: "N/A",
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['lipstick', 'foundation', 'mascara'].includes(p.toLowerCase())), "Blush", "Eyeshadow", "Makeup Brushes"],
      bundleType: "beauty", 
      description: "Complete makeup kit with your recommended cosmetics"
    });
  }

  // BABY CARE BUNDLES
  if (lowerProducts.some(p => ['diapers', 'baby wipes', 'baby lotion'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_6`,
      name: "Newborn Care Package",
      type: "Baby Bundle",
      emoji: "👶",
      prepTime: "N/A",
      servings: "1 Package",
      calories: "N/A",
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['diapers', 'baby wipes', 'baby lotion'].includes(p.toLowerCase())), "Baby Powder", "Diaper Rash Cream", "Changing Pad"],
      bundleType: "baby",
      description: "Complete newborn care with your recommended products"
    });
  }

  if (lowerProducts.some(p => ['baby bottles', 'baby formula', 'pacifier'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_7`,
      name: "Feeding Essentials Pack",
      type: "Baby Bundle",
      emoji: "🍼",
      prepTime: "N/A",
      servings: "1 Pack",
      calories: "N/A",
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['baby bottles', 'baby formula', 'pacifier'].includes(p.toLowerCase())), "Bib", "Burp Cloth", "Bottle Warmer"],
      bundleType: "baby",
      description: "Complete feeding setup with your recommended baby products"
    });
  }

  // HOME & GARDEN BUNDLES
  if (lowerProducts.some(p => ['seeds', 'soil', 'watering can'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_8`,
      name: "Garden Starter Kit",
      type: "Home Bundle",
      emoji: "🌱",
      prepTime: "N/A",
      servings: "1 Kit",
      calories: "N/A",
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['seeds', 'soil', 'watering can'].includes(p.toLowerCase())), "Plant Pots", "Garden Tools", "Fertilizer"],
      bundleType: "home",
      description: "Complete gardening setup with your recommended products"
    });
  }

  if (lowerProducts.some(p => ['knife set', 'cutting board', 'pots'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_9`,
      name: "Kitchen Essentials Bundle",
      type: "Home Bundle",
      emoji: "🍴",
      prepTime: "N/A",
      servings: "1 Bundle",
      calories: "N/A",
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['knife set', 'cutting board', 'pots'].includes(p.toLowerCase())), "Pans", "Utensils", "Kitchen Towels"],
      bundleType: "home",
      description: "Complete kitchen setup with your recommended products"
    });
  }

  // INNOVATIVE MIXED BUNDLES
  if (lowerProducts.some(p => ['laptop', 'coffee'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_10`,
      name: "Digital Nomad Kit",
      type: "Innovation Bundle",
      emoji: "☕💻",
      prepTime: "N/A",
      servings: "1 Kit",
      calories: "N/A",
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['laptop', 'coffee'].includes(p.toLowerCase())), "Portable Coffee Maker", "Noise-Canceling Headphones", "Travel Mug"],
      bundleType: "innovation",
      description: "Perfect for remote work with your recommended products"
    });
  }

  if (lowerProducts.some(p => ['baby', 'phone case'].includes(p))) {
    suggestions.push({
      id: `bundle_${Date.now()}_11`,
      name: "New Parent Essentials",
      type: "Innovation Bundle",
      emoji: "👶📱",
      prepTime: "N/A",
      servings: "1 Kit",
      calories: "N/A",
      difficulty: "Easy",
      ingredients: [...products.filter(p => ['baby', 'phone case'].includes(p.toLowerCase())), "Baby Monitor", "Parenting App", "Emergency Contacts"],
      bundleType: "innovation",
      description: "Smart parenting solutions with your recommended products"
    });
  }

  // Shuffle and return up to 3 suggestions
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
};

// Function to categorize products and get appropriate suggestions
export const categorizeProducts = (products) => {
  const categories = {
    food: [],
    dessert: [],
    electronics: [],
    baby: [],
    beauty: [],
    home: []
  };

  products.forEach(product => {
    const lowerProduct = product.toLowerCase();
    
    if (['eggs', 'milk', 'bread', 'tomato', 'cheese', 'pasta', 'chicken', 'rice', 'onion', 'garlic'].includes(lowerProduct)) {
      categories.food.push(product);
    } else if (['mascarpone', 'coffee', 'cocoa', 'cream', 'vanilla', 'sugar', 'phyllo', 'nuts', 'honey'].includes(lowerProduct)) {
      categories.dessert.push(product);
    } else if (['smart', 'gaming', 'laptop', 'phone', 'headphones', 'console'].includes(lowerProduct)) {
      categories.electronics.push(product);
    } else if (['diapers', 'baby', 'pacifier', 'formula', 'toys'].includes(lowerProduct)) {
      categories.baby.push(product);
    } else if (['cleanser', 'moisturizer', 'lipstick', 'foundation', 'mascara', 'sunscreen'].includes(lowerProduct)) {
      categories.beauty.push(product);
    } else if (['knife', 'cutting', 'pots', 'pans', 'seeds', 'soil', 'watering'].includes(lowerProduct)) {
      categories.home.push(product);
    } else {
      // Default to food if no category matches
      categories.food.push(product);
    }
  });

  return categories;
};
