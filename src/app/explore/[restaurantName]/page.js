"use client";
import CustomersHeader from "@/app/_components/CustomersHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import React, { useEffect, useState } from "react";

function page(props) {
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();

  const name = props?.params?.restaurantName;
  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch(" http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = (item) => {
    setCartData(item);
  };
  return (
    <div>
      <CustomersHeader cartData={cartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="details-wrapper">
        <h3>Contact :{restaurantDetails?.contactNumber}</h3>
        <h3>City: {restaurantDetails?.city}</h3>
        <h3>Address:{restaurantDetails?.fullAddress}</h3>
        <h3>Email:{restaurantDetails?.email}</h3>
      </div>
      <div className="food-item-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <>
              <div className="list-item">
                <div>
                  <img style={{ width: 100 }} src={item.img_path} alt="image" />
                </div>
                <div>
                  <div>{item.name}</div>
                  <div>{item.price}</div>
                  <div className="description">{item.description}</div>
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            </>
          ))
        ) : (
          <h1>No food items Added for now</h1>
        )}
      </div>
      <RestaurantFooter />
    </div>
  );
}

export default page;
