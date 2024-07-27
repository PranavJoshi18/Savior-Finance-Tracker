import React, { useEffect } from 'react';
import './Header.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../libs/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if (user) {
      navigate("/dashboard");
    }
  },[user,loading]);
  function handleLogout() {
    signOut(auth)
      .then(()=>{
        navigate("/")
      });
  }
  return (
    <div className='navbar'>
        <h4>Savior</h4>
        {user && <p onClick={handleLogout}>Logout</p>}
    </div>
  )
}

export default Header