import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import AddPost from './components/AddPost';
import UserHome from './components/UserHome'
import Content from './components/Content';
import Allpost from './components/Allpost'

const router = createBrowserRouter([
  {
    path : "/",
    element: <Dashboard/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/addpost",
        element: <AddPost/>,
      },
      {
        path: "/addpost/:id",
        element: <AddPost/>,
      },
      {
        path: "/userhome",
        element: <UserHome/>,
      },
      {
        path: "/allpost",
        element: <Allpost/>,
      },
      {
        path: "content/:id",
        element: <Content/>
      },
    ]

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
