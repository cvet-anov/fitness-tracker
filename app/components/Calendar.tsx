// components/Calendar.tsx
"use client";
import React, { useState } from 'react';
import '../styles/calendar.css';
import Button from '@mui/material/Button'; // MUI Button imported here
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';




interface CalendarProps {
    data: Record<string, { food: string, calories: number }[]>; 
}

const Calendar: React.FC<CalendarProps> = ({ data }) => {

    const getImageForFood = (foodName: string) => {
        switch (foodName.toLowerCase()) {
            case 'steak':
                return 'https://img.food.com/img/upload/package/summerentertaining/1_H2_Steak_Sliced_Steak_1.jpg';
            // You can add more cases here for other food items.
                case 'gyro':
                return 'https://www.greekboston.com/wp-content/uploads/2015/10/gyro-1.jpg';
            
                case 'cereal':
                return 'https://www.verywellfit.com/thmb/1mL7GRztKHp4uHx9EM-TK7vStUc=/3000x2002/filters:fill(FFDB5D,1)/cereal-and-milk-a911b706cf3f4fa3bfa857ec20cd3a80.jpg'; 
                case 'pizza':
                return 'https://www.engelvoelkers.com/wp-content/uploads/2014/07/pizza-stock.jpg'

                case 'chicken':
                return 'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Steak-min-750x750.jpg';
                case 'salad':
                return 'https://natashaskitchen.com/wp-content/uploads/2018/01/Beet-Salad-with-Arugula-and-Balsamic-Vinaigrette-5.jpg';

            default:
                return null; // No image for the food item.
        }
    };
    

    const getTotalCaloriesForDay = (day: string): number => {
        const foodsForDay = data[day] || [];
        return foodsForDay.reduce((total, item) => total + parseInt(item.calories, 10), 0);
    };

    const handleRemoveFoodItem = (day: string, index: number) => {
        const newDayData = [...data[day]];
        newDayData.splice(index, 1);
        data[day] = newDayData;
        setReferenceDate(new Date()); // Trigger re-render
    };

    const [referenceDate, setReferenceDate] = useState<Date>(new Date());

    const getWeekItems = (refDate: Date) => {
        const startDay = refDate.getDate() - refDate.getDay();
        const startDate = new Date(refDate);
        startDate.setDate(startDay);
        const weekItems: Date[] = [];

        for (let i = 0; i < 7; i++) {
            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() + i);
            weekItems.push(newDate);
        }

        return weekItems;
    };

    const weekItems = getWeekItems(referenceDate);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const getWorkoutForDay = (dayNumber: number): string => {
        const date = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), dayNumber);
        switch (date.getDay()) {
            case 1: return "Chest and Biceps";
            case 2: return "Legs";
            case 3: return "Rest";
            case 4: return "Back";
            case 5: return "Shoulders and Triceps";
            default: return "Rest";
        }
    }

    return (
        <div className="calendarContainer">
            <div className="header">
                <h2>{monthNames[referenceDate.getMonth()]} {referenceDate.getFullYear()}</h2>
                <div className="navigation">
                <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => setReferenceDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setDate(newDate.getDate() - 7);
                            return newDate;
                        })}>
                        &lt;
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => setReferenceDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setDate(newDate.getDate() + 7);
                            return newDate;
                        })}>
                        &gt;
                    </Button>
                </div>
            </div>
            <div className="calendarGrid">
                {weekItems.map((date, idx) => {
                    const day = date.getDate();
                    return (
                        <div key={idx} className="calendarDay" onClick={() => setSelectedDay(day)}>
                            <span className="dayNumber">{day}</span>
                            <span className="dayName">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}</span>
                        </div>
                    );
                })}
            </div>
            {selectedDay && (
                <div className="overlay">
                    <div className="dayReview">
                        <div className="foodSection">
                            <h3>Foods for {selectedDay} {monthNames[referenceDate.getMonth()]}</h3>
                            <ul>
                            {(data[selectedDay.toString()] || []).map((item, idx) => (
    <li key={idx} className="foodListItem">
        {getImageForFood(item.food) && 
            <img 
                src={getImageForFood(item.food)} 
                alt={item.food}
                className="foodImage" 
            />
        }
        {item.food} - {item.calories} calories
        <IconButton 
            className="smallerIconButton"
            onClick={() => handleRemoveFoodItem(selectedDay.toString(), idx)} 
            size="small">
            <DeleteIcon fontSize="small" />
        </IconButton>
    </li>
))}


                            </ul>
                            <h4>Total Calories: {getTotalCaloriesForDay(selectedDay.toString())}</h4>
                        </div>
                        <div className="workoutSection">
                            <h3>Workout for {selectedDay} {monthNames[referenceDate.getMonth()]}</h3>
                            <p>{getWorkoutForDay(selectedDay)}</p>
                        </div>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={() => setSelectedDay(null)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Calendar;
