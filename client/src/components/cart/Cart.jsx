import React, { useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { id } = useParams("");
  // console.log(id);

  const [individualdata, setIndividualdata] = useState([]);
  console.log(individualdata);

  const getindividualdata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("No data available");
    } else {
      console.log("get data");
      setIndividualdata(data);
    }
  };

  useEffect(() => {
    getindividualdata();
  }, [id]);

  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src={individualdata.detailUrl} alt="cart_img" />
          <div className="cart_btn">
            <button className="cart_btn1">Add to Cart</button>
            <button className="cart_btn2">Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>{individualdata?.title?.shortTitle}</h3>

          <h4>
          {individualdata?.title?.longTitle}
          </h4>

          <Divider />
          <p className="mrp">M.R.P : {individualdata?.price?.mrp}</p>
          <p>
            Deal of the day :{" "}
            <span style={{ color: "#B12704" }}>
              ₹
              {individualdata?.price?.cost}
              .00
            </span>
          </p>
          <p>
            You save :{" "}
            <span style={{ color: "#B12704" }}>
              ₹
              {individualdata?.price?.mrp - individualdata?.price?.cost}
              (
              {individualdata?.price?.discount}
              )
            </span>
          </p>

          <div className="discount_box">
            <h5>
              Discount: <span style={{ color: "#111" }}> {individualdata?.discount}</span>
            </h5>
            <h4>
              Free Delivery :{" "}
              <span style={{ color: "#111", fontWeight: "600" }}>Oct 8-21</span>{" "}
              Details
            </h4>
            <p>
              Fastest delivery :{" "}
              <span style={{ color: "#111", fontWeight: "600" }}>
                Tomorrow 11AM
              </span>
            </p>
          </div>
          <p className="description">
            About the Item :{" "}
            <span
              style={{
                color: "#565959",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.4",
              }}
            >
              {individualdata?.description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
