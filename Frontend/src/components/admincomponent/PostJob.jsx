import React, { useState } from 'react'
import Navbar from '../componentsLite/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import store from '../../redux/store'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { JOB_API_ENDPOINT } from '../../utils/data'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'




const companyArray = [];


const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    salary: "",
    companyId: "",
    position: 0,
    requirements: "",
    role: "",
    experience: "",
    jobType: "",
  });

  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const selectChangeHandler = (companyId) => {
    setInput((prev) => ({
      ...prev,
      companyId,   
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong")
      } else {
        toast.error("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} action="" className='p-8 max-w-4xl border border-gray-500 shadow-sm hover:shadow-lg rounded-lg hover:shadow-red-400'>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter Job title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                placeholder="Enter Job description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter Job location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>
             <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                placeholder="Enter Job location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter Job salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Enter Job position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Enter Job requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>


            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Enter Job experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="Enter jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                onChange={changeEventHandler}
              />
            </div>


          </div>
          {
            companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {
                            company.name
                          }
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            )
          }
          <div className='flex items-center justify-center mt-5'>

            {loading ? (
              <Button className=" w-1/2 px-4 py-2 text-sm text-white ">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className=" w-1/2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Post Job
              </Button>
            )}
          </div>
          {
            companies.length === 0 && (
              <p className='text-sm font-bold text-center my-3 text-red-600'>
                *Please register a company to post jobs.*
              </p>
            )
          }

        </form>
      </div>
    </div>
  )
}

export default PostJob

















