import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../../redux/jobSlice'

const Header = () => {

  return (
    <div>
      <div className='text-center'>
        <h1 className='text-6xl font-bold mt-20 text-red-600'>Find Your Dream Job <br /><span className='text-black text-5xl'> with</span> <br />
          <span className='text-blue-600'>Your Interest</span>
        </h1>
        <p className='mt-5 font-semibold'>
          Your journey to success starts here – explore countless opportunities, discover the  <br /> right job  that matches your skills and passion, and step into a  <br /> brighter future faster than ever.
        </p>

      </div>
    </div>
  )
}

export default Header
