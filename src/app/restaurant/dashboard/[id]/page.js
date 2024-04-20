"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function EditFoodItem(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id
    );
    response = await response.json();
    if (response.success) {
      console.log("%%%%%%%%%%%%%%");
      setName(response.result.name);
      setPrice(response.result.price);
      setPath(response.result.img_path);
      setDescription(response.result.description);
    }
  };

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,
      {
        method: "PUT",
        body: JSON.stringify({ name, price, img_path: path, description }),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("data is updated");
      router.push("../dashboard");
    }
  };

  return (
    <div className="container">
      <h1>Update Food Item</h1>
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
        <button className="button" onClick={handleEditFoodItem}>
          {" "}
          Update Food Item
        </button>
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={() => router.push("../dashboard")}>
          {" "}
          Back to Food Item list
        </button>
      </div>
    </div>
  );
}

export default EditFoodItem;
