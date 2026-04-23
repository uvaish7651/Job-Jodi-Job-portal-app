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

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 🔥 DEBUG (deploy के बाद console में देखना)
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
      console.log("ERROR:", error?.response?.data || error);
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

          <Input name="fullname" onChange={changeEventHandler} placeholder="Name" />
          <Input name="email" onChange={changeEventHandler} placeholder="Email" />
          <Input name="password" type="password" onChange={changeEventHandler} placeholder="Password" />
          <Input name="phoneNumber" onChange={changeEventHandler} placeholder="Phone" />

          <div className="my-3">
            <label>
              <input type="radio" name="role" value="Student" onChange={changeEventHandler} /> Student
            </label>
            <label className="ml-4">
              <input type="radio" name="role" value="Recruiter" onChange={changeEventHandler} /> Recruiter
            </label>
          </div>

          <Input type="file" onChange={changeFileHandler} />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 mt-3 rounded"
          >
            Register
          </button>

          <p className='text-center mt-3'>
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Register;