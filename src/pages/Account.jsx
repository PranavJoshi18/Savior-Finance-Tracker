import React from 'react';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
function Account() {
  return (
    <div>
      <Header />
      <div className="wrapper"><Login /></div>
    </div>
  )
}

export default Account