import React, { useState } from 'react'
import './addUser.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const AddUser = () => {

  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users)
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setUser({ ...user, [name]: value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/user", user)
      .then((response) => {
        console.log("User added successfully", response.data)
        navigate("/");

      }).catch
      ((error) => {
        console.error("There was an error adding the user!", error);
      })
  }


  return (
    <div className='AddUser'>
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back

      </Link>

      <h3>Add new User</h3>

      <form className="addUserForm" onSubmit={submitHandler}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>

          <input type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            value={user.name}
            autoComplete="off"
            placeholder='Enter your Name' />

        </div>

        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input type="text"
            id="email"
            onChange={inputHandler}
            name="email"
            user
            autoComplete="off"
            placeholder='Enter your Email"' />

        </div>

        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            value={user.address}
            autoComplete="off"
            placeholder='Enter your Address' />

        </div>


        <div className="inputgroup"></div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>
    </div>
  )
}

export default AddUser
