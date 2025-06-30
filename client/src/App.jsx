import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import User from './getuser/user.jsx';
import AddUser from './addUser/AddUser.jsx';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />
    },

    {
      path: "/adduser",
      element: <AddUser/>
    }
  ]);

  return (
    <div className='App'>
      <RouterProvider router={route}></RouterProvider>
      
    </div>

  );
}

export default App
