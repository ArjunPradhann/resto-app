import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RestaurantSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    city: "",
    fullAddress: "",
    contactNumber: "",
  });

  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.fullAddress ||
      !formData.city ||
      !formData.contactNumber ||
      !formData.restaurantName
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
  
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("RestaurentUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <>
      <h3> Restaurant SignUp Component</h3>
      <div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter email id"
            className="input-field"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {error && !formData.email && (
            <span className="input-error">Email field is empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter password"
            className="input-field"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="input-error">
              Passwords and confirm password not match
            </span>
          )}
          {error && !formData.password && (
            <span className="input-error">Password field is empty</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm password"
            className="input-field"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="input-error">
              Passwords and confirm password not match
            </span>
          )}
          {error && !formData.confirmPassword && (
            <span className="input-error">Confirm Password field is empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter raturant name"
            className="input-field"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
          />
          {error && !formData.restaurantName && (
            <span className="input-error">Restaurant Name field is empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter city"
            className="input-field"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {error && !formData.city && (
            <span className="input-error">City Name field is empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter full address"
            className="input-field"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
          />
          {error && !formData.fullAddress && (
            <span className="input-error">Full Address field is empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            placeholder="Enter contact number"
            className="input-field"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {error && !formData.contactNumber && (
            <span className="input-error">Contact field is empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleSubmit}>
            {" "}
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default RestaurantSignUp;
