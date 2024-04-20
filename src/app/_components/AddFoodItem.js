import { useState } from "react";

function AddFoodItem(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("RestaurentUser"));

    if (restaurantData) {
      resto_id = restaurantData._id;
    }

    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        img_path: path,
        description,
        resto_id,
      }),
    });
    response = await response.json();
    if (response.success) {
      alert("Food Item added");
      props.setItem(false);
    } else {
      alert("Food iten not added");
    }
  };

  return (
    <div className="container">
      <h1>Add New Food Item</h1>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Please enter valid name</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="input-error">Please enter valid price</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter image path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className="input-error">Please enter valid path</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && (
          <span className="input-error">Please enter valid description</span>
        )}
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={handleAddFoodItem}>
          {" "}
          Add Food Item
        </button>
      </div>
    </div>
  );
}

export default AddFoodItem;
