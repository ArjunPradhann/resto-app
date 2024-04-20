"use client";
import React, { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import "../restaurant/style.css";
import RestaurantFooter from "../_components/RestaurantFooter";

function page() {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader />
        <h1>Restaurant Page</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignUp />}

        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login ? "Do not have account Sign Up" : "Already have account?"}
          </button>
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
}

export default page;
