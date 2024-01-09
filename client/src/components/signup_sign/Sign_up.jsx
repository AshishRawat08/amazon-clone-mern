import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sign_up = () => {
  const [userdata, setUserdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  console.log(userdata);

  const adddata = (e) => {
    const { name, value } = e.target;

    setUserdata(() => {
      return {
        ...userdata,
        [name]: value,
      };
    });
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form>
            <h1>Create Account</h1>
            <div className="form_data">
              <label htmlFor="fname">Your Name</label>
              <input
                type="text"
                onChange={adddata}
                value={userdata.fname}
                name="fname"
                id="fname"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={adddata}
                value={userdata.email}
                name="email"
                id="email"
                placeholder="example123@gmail.com"
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile Number</label>
              <input
                type="text"
                onChange={adddata}
                value={userdata.mobile}
                name="mobile"
                id="mobile"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={userdata.password}
                name="password"
                id="password"
                placeholder="At least 6 Char"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Re-enter Password</label>
              <input
                type="password"
                onChange={adddata}
                value={userdata.cpassword}
                name="cpassword"
                id="cpassword"
              />
            </div>
            <button className="signin_btn">Continue</button>

            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Signin</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Sign_up;
