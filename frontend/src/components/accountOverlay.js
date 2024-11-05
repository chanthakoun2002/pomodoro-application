import React, { useState, useEffect} from 'react';
import {loginUser, registerUser, logoutUser} from '../services/repository'

//overlay for account allow for reigstration and login
//when logged in displays users account and allow for logout

const AccountOverlay = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true); //toggles between login and registration
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); //tracking for if user is logged in
    const [userData, setUserData] = useState(null); 
    const [error, setError] = useState('');

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUserData(user);
        }
        
    },[]);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("hello from login");//testing
        try {
            if(isLogin) {
                sessionStorage.removeItem('sessionTasks'); // Clean up residual data
                sessionStorage.removeItem('sessionSettings');

                const data = await loginUser({email, password});
                console.log("login response data:", data); //test
                sessionStorage.setItem('user', JSON.stringify(data));
                setUserData(data);
                setIsLoggedIn(true);
                setError('Login Successful')
                window.location.reload(); // refresh window for everything to load in
            } else {
                
                await registerUser({username, email, password});
                setIsLogin(true);
                setError('Registration successful! please Log in.');
            }
        } catch(err) {
            setError(err.message || 'Submission error');
        }  
    };

    const handleLogout = async () => {
        try {
            //clear user data
            sessionStorage.removeItem('sessionTasks'); // Clean up residual data
            sessionStorage.removeItem('sessionSettings');

            await logoutUser();
            sessionStorage.removeItem('user');
            setIsLoggedIn(false);
            // setUsername('');
            // setEmail('');
            // setPassword('');
            window.location.reload();
        } catch {
            setError('Failed to log out');
        }
        
    };


    return (
        <section className="overlay">
          <div className="overlay-container">
            <button className="close-btn" onClick={onClose}>X</button>

            {isLoggedIn ? (
              <div className="user-account-section">
                <h2>Welcome, {userData?.username}!</h2>
                <p>Email: {userData?.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
              ) : ( 
              <div>
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleLogin} className="account-form-container">
                  {!isLogin && (<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>)}
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>

                {error && <p className="error-message">{error}</p>}
    
                <h4 className="toggle-login">
                  {isLogin ? (
                    <span onClick={() => setIsLogin(false)}>Don't have an account? Register</span>
                  ) : (
                    <span onClick={() => setIsLogin(true)}>Already have an account? Login</span>)}
                </h4>
              </div>
            )}
          </div>
        </section>
      );
    };

export default AccountOverlay;
