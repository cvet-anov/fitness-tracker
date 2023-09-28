"use client";
import React, { useState } from 'react';
import '../styles/foodEntry.css';

interface FoodEntryProps {
  onAdd: (food: string, date: string, calories: number) => void;
  date: string;
}


const FoodEntry: React.FC<FoodEntryProps> = ({ onAdd, date }) => {
    const [food, setFood] = useState<string>('');
    const [calories, setCalories] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(food, date, calories);
        setFood('');
        setCalories(0);
    }

    return (
        <form onSubmit={handleSubmit} className="foodEntryForm">
            <label className="foodEntryLabel">
                Add food for today:
                <input 
                   value={food} 
                   onChange={(e) => setFood(e.target.value)} 
                   className="foodEntryInput"
                />
            </label>
            <label className="foodEntryLabel">
                Calories:
                <input 
                   value={calories} 
                   onChange={(e) => setCalories(e.target.value)} 
                   className="foodEntryCaloriesInput"
                   type="number"
                />
            </label>
            <button type="submit" className="foodEntryButton">Add</button>
        </form>
    )
}

export default FoodEntry;
