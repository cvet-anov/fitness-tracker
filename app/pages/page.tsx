// pages/page.tsx
"use client";

import styles from '../styles/page.module.css';

import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import necessary components and functions
import FoodEntry from '../components/FoodEntry';
import Calendar from '../components/Calendar';
import FetchMeals from '../components/FetchMeals';
import Header from '../components/Header';

const theme = createTheme(); // Create the theme (you can customize this later if needed)

const Page = () => {
    // Adjusting the initial state structure
    const [data, setData] = useState<Record<string, { food: string, calories: number }[]>>({});
    const today = new Date().getDate().toString();

    // Modified the handleAdd to accept calories and adjust the data structure
    const handleAdd = (food: string, date: string, calories: number) => {
        setData(prev => ({
            ...prev,
            [date]: [...(prev[date] || []), { food, calories }]
        }));
    };

    return (
        <ThemeProvider theme={theme}> {/* Wrap your component's content with ThemeProvider */}
            <div className="mainContainer">
                <Header/>
                <div></div>
                <div className="leftContainer"> 
                    <Calendar data={data} />
                    <FetchMeals />
                </div>
                <div className="rightContainer">
                    <FoodEntry onAdd={handleAdd} date={today} />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Page;
