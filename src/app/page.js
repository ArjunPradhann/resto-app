"use client";
import Image from "next/image";
import styles from "./page.module.css";
import CustomersHeader from "./_components/CustomersHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurant, setResataurant] = useState([]);
  const [selectedLoaction, setSelectedLoaction] = useState("");
  const [showlocation, setShowlocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/location");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";

    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setResataurant(response.result);
    }
  };

  const handleListItem = (item) => {
    setSelectedLoaction(item);
    setShowlocation(false);
    loadRestaurants({ location: item });
  };

  return (
    <main>
      <CustomersHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Select Place"
            className="select-input"
            value={selectedLoaction}
            onClick={() => setShowlocation(true)}
          />
          <ul className="location-list">
            {showlocation &&
              locations.map((item, idx) => (
                <li key={idx} onClick={() => handleListItem(item)}>
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            placeholder="Enter food or restaurant name"
            className="search-input"
            onChange={(event) =>
              loadRestaurants({ restaurant: event.target.value })
            }
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurant.map((item) => (
          <>
            <div
              className="restaurant-wrapper"
              onClick={() =>
                router.push(
                  "explore/" + item?.restaurantName + "?id=" + item._id
                )
              }
            >
              <div className="heading-wrapper">
                <h3>{item.restaurantName}</h3>
                <h5>{item.contactNumber}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city} ,</div>
                <div>
                  {item.fullAddress}, Email: {item.email}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <RestaurantFooter />
    </main>
  );
}
