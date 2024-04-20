import Link from "next/link";
import React, { useEffect, useState } from "react";

function CustomersHeader(props) {
  const cartStorage = JSON.parse(localStorage.getItem("cartItem"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);

  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        if (cartItem[0].resto_id != props.cartData._id) {
          localStorage.removeItem("cartItem");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cartItem", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cartItem", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cartItem", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: 100 }} src="/FoodLogo.jpg" alt="logo" />
      </div>
      <ul>
        <li>
          <Link href="#">Home</Link>
        </li>
        <li>
          <Link href="#">Login</Link>
        </li>
        <li>
          <Link href="#">SignUp</Link>
        </li>
        <li>
          <Link href="#">Cart({cartNumber})</Link>
        </li>
        <li>
          <Link href="#">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
}

export default CustomersHeader;
