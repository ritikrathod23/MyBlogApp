import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AuthService from '../appwrite/Auth';
import Footer from './Footer';
import Container from './Container';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to handle the session check
    const checkSession = async () => {  
      try {
        // Check for an active session
        const session = await AuthService.getUserSession(); // Fetch current session
        if (session) {
          console.log('Session active, redirecting to user home...');
          navigate('/userhome'); // Redirect to user home if session is active
        } else {
          console.log('No active session, redirecting to login...');
          navigate('/'); // Redirect to login if no session
        }
      } catch (error) {
        console.error('Error checking session:', error);
        navigate('/'); // Redirect to login if there's an error
      }
    };

    checkSession(); // Call the async function
  }, []); // Include navigate in the dependency array

  return (
    <>
      <div className='static'>
      <Navbar />
      <Container/>
      {/* <Footer/> */}
      </div>

    </>
  );
}

export default Dashboard;
