import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between bg-slate-900 text-white py-4'>
        <div className="logo">
           <span className='font-bold text-xl mx-9'>I-Task</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Task</li>

        </ul>
      </nav>
    </div>
  ) 
}

export default Navbar
