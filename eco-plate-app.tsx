import { useState, useEffect } from 'react';
import { Clock, Calendar, ShoppingBag, Leaf, ChevronDown, ChevronUp } from 'lucide-react';

export default function EcoPlate() {
  const [activeTab, setActiveTab] = useState('planner');
  const [mealPlan, setMealPlan] = useState([]);
  const [impact, setImpact] = useState({
    carbonSaved: 0,
    waterSaved: 0,
    wasteSaved: 0
  });
  const [expanded, setExpanded] = useState(null);

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      name: "Seasonal Vegetable Stir Fry",
      image: "/api/placeholder/120/120",
      impact: { carbon: 0.5, water: 300, waste: 0.2 },
      ingredients: ["Bell peppers", "Broccoli", "Carrots", "Brown rice", "Tofu", "Ginger", "Garlic", "Soy sauce"],
      instructions: "1. Prepare rice according to package directions.\n2. Cube tofu and press to remove excess water.\n3. Sauté tofu until golden.\n4. Add chopped vegetables and stir fry for 5 minutes.\n5. Add minced garlic and ginger, cook for 1 minute.\n6. Add soy sauce and serve over rice.",
      season: "Spring"
    },
    {
      id: 2,
      name: "Lentil and Root Vegetable Soup",
      image: "/api/placeholder/120/120",
      impact: { carbon: 0.3, water: 200, waste: 0.1 },
      ingredients: ["Red lentils", "Onion", "Carrots", "Celery", "Sweet potato", "Vegetable broth", "Thyme", "Bay leaf"],
      instructions: "1. Sauté diced onion, carrot, and celery.\n2. Add sweet potato cubes and cook for 2 minutes.\n3. Add rinsed lentils, broth, and herbs.\n4. Simmer for 25 minutes until lentils and vegetables are tender.\n5. Season to taste and serve.",
      season: "Fall/Winter"
    },
    {
      id: 3,
      name: "Mediterranean Chickpea Salad",
      image: "/api/placeholder/120/120",
      impact: { carbon: 0.4, water: 250, waste: 0.2 },
      ingredients: ["Chickpeas", "Cucumber", "Cherry tomatoes", "Red onion", "Feta cheese", "Olives", "Lemon juice", "Olive oil"],
      instructions: "1. Rinse and drain chickpeas.\n2. Dice cucumber, halve tomatoes, and finely dice red onion.\n3. Combine in a bowl with crumbled feta and olives.\n4. Dress with lemon juice, olive oil, salt, and pepper.\n5. Toss well and serve.",
      season: "Summer"
    }
  ];

  const addToMealPlan = (recipe) => {
    setMealPlan([...mealPlan, recipe]);
    
    // Update environmental impact
    setImpact({
      carbonSaved: impact.carbonSaved + recipe.impact.carbon,
      waterSaved: impact.waterSaved + recipe.impact.water,
      wasteSaved: impact.wasteSaved + recipe.impact.waste
    });
  };

  const removeFromMealPlan = (index) => {
    const recipe = mealPlan[index];
    const newMealPlan = [...mealPlan];
    newMealPlan.splice(index, 1);
    setMealPlan(newMealPlan);
    
    // Update environmental impact
    setImpact({
      carbonSaved: impact.carbonSaved - recipe.impact.carbon,
      waterSaved: impact.waterSaved - recipe.impact.water,
      wasteSaved: impact.wasteSaved - recipe.impact.waste
    });
  };

  const toggleRecipeDetails = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const createShoppingList = () => {
    const ingredients = {};
    mealPlan.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredients[ingredient] = (ingredients[ingredient] || 0) + 1;
      });
    });
    return ingredients;
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">EcoPlate</h1>
          <div className="flex items-center">
            <Leaf className="mr-2" />
            <span>Sustainable Meal Planning</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="flex text-center">
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === 'planner' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('planner')}
          >
            Meal Planner
          </button>
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === 'shopping' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('shopping')}
          >
            Shopping List
          </button>
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === 'impact' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('impact')}
          >
            Impact
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {activeTab === 'planner' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Sustainable Recipe Suggestions</h2>
            <div className="space-y-4">
              {recipes.map(recipe => (
                <div key={recipe.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between">
                    <div className="flex">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="w-16 h-16 rounded-md object-cover" 
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">{recipe.name}</h3>
                        <p className="text-sm text-gray-600">Season: {recipe.season}</p>
                        <div className="flex items-center text-sm text-green-700 mt-1">
                          <Leaf size={16} className="mr-1" />
                          <span>{recipe.impact.carbon} kg CO₂ saved</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <button 
                        className="text-green-600 hover:text-green-800"
                        onClick={() => toggleRecipeDetails(recipe.id)}
                      >
                        {expanded === recipe.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      <button 
                        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 mt-2"
                        onClick={() => addToMealPlan(recipe)}
                      >
                        Add to Plan
                      </button>
                    </div>
                  </div>
                  
                  {expanded === recipe.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-2">Ingredients:</h4>
                      <ul className="list-disc list-inside text-sm mb-3">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                      <h4 className="font-medium mb-2">Instructions:</h4>
                      <p className="text-sm whitespace-pre-line">{recipe.instructions}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Your Meal Plan</h2>
            {mealPlan.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <Calendar size={32} className="mx-auto mb-2" />
                <p>Your meal plan is empty. Add recipes from above to get started!</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-4">
                {mealPlan.map((recipe, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span>{recipe.name}</span>
                    <button 
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => removeFromMealPlan(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'shopping' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Shopping List</h2>
            {mealPlan.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <ShoppingBag size={32} className="mx-auto mb-2" />
                <p>Add recipes to your meal plan to generate a shopping list</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-4">
                <ul>
                  {Object.entries(createShoppingList()).map(([ingredient, count], index) => (
                    <li key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span>{ingredient}</span>
                      <span className="text-gray-500">Used in {count} recipe{count > 1 ? 's' : ''}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Shopping Tips:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <Leaf size={16} className="mt-1 mr-2 text-green-600 flex-shrink-0" />
                      <span>Bring reusable bags to reduce plastic waste</span>
                    </li>
                    <li className="flex items-start">
                      <Leaf size={16} className="mt-1 mr-2 text-green-600 flex-shrink-0" />
                      <span>Look for locally grown produce to reduce carbon footprint</span>
                    </li>
                    <li className="flex items-start">
                      <Leaf size={16} className="mt-1 mr-2 text-green-600 flex-shrink-0" />
                      <span>Choose items with minimal packaging when possible</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'impact' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Environmental Impact</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center bg-green-100 mb-3">
                    <Leaf size={48} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium">Eco Score</h3>
                  <p className="text-3xl font-bold text-green-600 mt-1">
                    {mealPlan.length > 0 ? "Good" : "Start planning!"}
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Carbon Impact</h4>
                    <p className="text-2xl font-bold text-green-700">{impact.carbonSaved.toFixed(1)} kg</p>
                    <p className="text-sm text-gray-600">CO₂ emissions reduced</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Water Footprint</h4>
                    <p className="text-2xl font-bold text-blue-700">{impact.waterSaved} L</p>
                    <p className="text-sm text-gray-600">Water saved compared to average meals</p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Waste Reduction</h4>
                    <p className="text-2xl font-bold text-amber-700">{impact.wasteSaved.toFixed(1)} kg</p>
                    <p className="text-sm text-gray-600">Food waste prevented</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 p-4">
                <h3 className="font-medium mb-2">Environmental Impact Tips:</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <Leaf size={16} className="mt-1 mr-2 text-green-600 flex-shrink-0" />
                    <span>Plant-based meals generally have a lower carbon footprint</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf size={16} className="mt-1 mr-2 text-green-600 flex-shrink-0" />
                    <span>Seasonal and local ingredients require less transportation energy</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf size={16} className="mt-1 mr-2 text-green-600 flex-shrink-0" />
                    <span>Using all parts of ingredients reduces food waste</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
        <p>EcoPlate - Making meal planning sustainable</p>
      </footer>
    </div>
  );
}
