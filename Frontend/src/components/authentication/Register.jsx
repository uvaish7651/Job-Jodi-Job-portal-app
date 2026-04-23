import React, { useEffect, useState } from 'react'
import Navbar from '../componentsLite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { USER_API_ENDPOINT } from '../../utils/data'
import { toast } from "sonner"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'

const Register = () => {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  // handle text input
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // handle file input
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // submit form
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("API:", USER_API_ENDPOINT);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        USER_API_ENDPOINT + "/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error?.response);
      console.log("ERROR DATA:", error?.response?.data);

      toast.error(
        error?.response?.data?.message || "Unexpected error"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler}
          className='w-1/2 border border-gray-500 rounded-md p-4 my-10'>

          <h1 className='font-bold text-xl mb-5 text-center text-blue-500'>Register</h1>

          <div className='my-2'>
            <Label>Name</Label>
            <Input
              className="mt-2"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              className="mt-2"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              type="text"
              placeholder="Enter your email"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              className="mt-2"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className='my-2'>
            <Label>PhoneNumber</Label>
            <Input
              className="mt-2"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              type="tel"
              placeholder="Enter your phoneNumber"
            />
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
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>

            </RadioGroup>
          </div>

          <div className='flex items-center gap-2'>
            <Label>Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
          </div>

          {loading ? (
            <p className="text-center mt-4">Loading...</p>
          ) : (
            <button
              type='submit'
              className='block w-full py-3 mt-4 text-white bg-blue-500 hover:bg-blue-700 rounded-md'
            >
              Register
            </button>
          )}

          <p className='text-gray-500 text-md my-2 text-center'>
            Already have an account?{" "}
            <Link className='text-blue-500' to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Register;