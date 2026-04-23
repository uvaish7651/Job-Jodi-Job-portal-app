import React, { useEffect } from 'react'
import Header from './Header'
import LatestJobs from './LatestJobs'
import Navbar from './Navbar'
import Footer from './Footer'
import useGetAllJobs from '../../hooks/useGetAllJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies")
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
