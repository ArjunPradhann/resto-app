"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../restaurant/style.css";

function RestaurantHeader() {
  const [details, setDetails] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("RestaurentUser");
    if (!data && pathname == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathname == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("RestaurentUser");
    router.push("/restaurant");
  };
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: 100 }} src="/FoodLogo.jpg" alt="logo" />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {details && details.email ? (
          <>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>
              <Link href="/">Profile</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/">Login/Signup</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default RestaurantHeader;
