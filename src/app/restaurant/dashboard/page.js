"use client";

import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useState } from "react";

const Dashboard = () => {
  const [addItem, setItem] = useState(false);
  return (
    <>
      <div>
        <RestaurantHeader />
        <button onClick={() => setItem(true)}>Add Food</button>
        <button onClick={() => setItem(false)}>Dashboard</button>
        {addItem ? <AddFoodItem setItem={setItem} /> : <FoodItemList />}
      </div>
    </>
  );
};

export default Dashboard;
