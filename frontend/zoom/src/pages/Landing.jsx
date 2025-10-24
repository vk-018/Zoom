import React from 'react'

function Landing() {
  return (
    <div className="landingPageContainer">
      <nav className='navbar'>
        <div className='navHeader'>
          <h2><span style={{color:'orange'}}>Connect</span> with The World</h2>
        </div>
          
        <div className="navList">
          <a href="/joinguest"  className='anchor'>Join as Guest</a>
          <a href="/users/register" className='anchor'>Register</a>
          <a href="/users/login"  className='anchor'>Login</a>
        </div>
      </nav>

      <div className="landingPageMainContainer">
        <div className='textSide'>
          <h1><span style={{color:'orange'}}>Connect</span> With Your Loved Ones</h1>
          <h4>Make Distance Immaterial...cover any distance using Connect</h4>
          <a href="/home">
            <button type="button" className='btnStart'>Get Started</button>
          </a>
        </div>
        
        <div className='imgSide'>
          <img src='./faceimg2.png' alt="mobile" className='faceimg'></img>
        </div>
      
        
      </div>
    </div>
  )
}

export default Landing
