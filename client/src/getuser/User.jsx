import React, {useState,useEffect} from 'react'

import './user.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const user = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users")

                setUsers(response.data)

            }
            catch (error) {
                console.error("Error fetching users:", error);

            }
        };

        fetchData();
    }, [])

    return (
        <div className="UserTable">
            <div className="table-container">
                <Link to="/adduser" className="btn btn-primary">
                    <i className="fa-solid fa-user-plus">Add User</i>
                </Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user, index) =>{
                            return (

                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td className="actionButtons">

                                        <button type="button" className="btn btn-info">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>


                                        <button type="button" className="btn btn-danger">
                                            <i className="fa-solid fa-trash"></i>

                                        </button>


                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default user
