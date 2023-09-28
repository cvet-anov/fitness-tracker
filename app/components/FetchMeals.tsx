import axios from 'axios';
import { useState } from 'react';
import '../styles/fetchmeals.css';
import Button from '@mui/material/Button';

const FetchMeals = () => {
    const [meals, setMeals] = useState([]);
    const [nutrients, setNutrients] = useState(null);
    const API_KEY = '275780b3c5414266a40ccdd47d32f055'; // Replace with your Spoonacular API key

    const fetchMeals = async () => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${API_KEY}&timeFrame=day`);
            setMeals(response.data.meals);
            setNutrients(response.data.nutrients);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    return (
        <div className="fetchMealsContainer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="fetchMealsHeading">Today's Meals</h2>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={fetchMeals}
                    style={{
                        backgroundColor: 'rgba(8, 25, 58, 0.9)',
                        color: '#f7f7f7',
                        boxShadow: '0 3px 5px 2px rgba(8, 25, 58, 0.3)',
                        margin: '20px 0'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(5, 12, 32, 0.8)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(8, 25, 58, 0.9)'}
                >
                    Get Meals
                </Button>
            </div>
            {meals.map(meal => (
                <div key={meal.id} className="mealItem">
                    <h3 className="mealTitle">{meal.title}</h3>
                    <p>Ready in: {meal.readyInMinutes} minutes</p>
                    <p>Servings: {meal.servings}</p>
                    <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer" className="recipeLink">View Recipe</a>
                </div>
            ))}
            {nutrients && (
                <div className="nutritionInfo">
                    <h3>Nutritional Information</h3>
                    <p>Calories: {nutrients.calories.toFixed(2)}</p>
                    <p>Carbohydrates: {nutrients.carbohydrates.toFixed(2)}g</p>
                    <p>Fat: {nutrients.fat.toFixed(2)}g</p>
                    <p>Protein: {nutrients.protein.toFixed(2)}g</p>
                </div>
            )}
        </div>
    );
}

export default FetchMeals;
