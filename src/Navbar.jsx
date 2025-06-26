import React from 'react'

const Navbar = () => {
  return (
  
    <div className='container  '>
        <nav className='navbar flex mx-auto bg-pink-700 h-[50px] text-white place-content-around   '>
           <div className="logo m-[13px] font-bold text-[18px]"><h1>Planny</h1></div>
           <div className='home flex gap-5 m-[13px] text-[16px] cursor-pointer'>
           <h1 >Home</h1>
           <h1>Your Tasks</h1>
           </div>
        </nav>
    </div>
  )
}

export default Navbar
