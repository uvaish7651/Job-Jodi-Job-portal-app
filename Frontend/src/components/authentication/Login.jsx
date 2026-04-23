import React, { useEffect, useState } from 'react'
import Navbar from '../componentsLite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import store from '../../redux/store'
import { Loader2 } from 'lucide-react'


const Login = () => {
  
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred";
      toast.error(errorMessage);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);


  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler}
          className='w-1/2 border border-gray-500 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5 text-center text-blue-500'>Login</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              className="mt-2"
              value={input.email} name="email" onChange={changeEventHandler}
              type="text"
              placeholder="Enter your email">
            </Input>
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              className="mt-2"
              value={input.password} name="password" onChange={changeEventHandler}
              type="password"
              placeholder="Enter your password"
            ></Input>
          </div>
          <div className='flex items-center justify-between'>

            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3 space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <button className='w-3/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl
            mx-auto bg-blue-600 hover:bg-blue-800//90 rounded-md'>
              Login
            </button>


          <div className=''>
            <p className='text-gray-700 text-md my-2 text-center '>
              Create New Account {" "}
              <Link className='text-blue-500' to="/register">
                <button className='block w-3/4 py-3 mt-2 text-white  flex items-center justify-center max-w-7xl mx-auto bg-green-500 hover:bg-green-700 rounded-md'>
                  Register
                </button>
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login




