import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';

import { toast } from 'sonner';
import { setUser } from '../../redux/authSlice';
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";


const Navbar = () => {

    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_ENDPOINT}/logout`, {
                withCredentials: true,
            });
            if (response.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success("Logged out successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-red-500'>Jodi</span></h1>
                </div>
                <div className='flex gap-10 items-center'>
                    <ul className='flex font-medium items-center gap-10'>
                        {
                            user && user.role === "Recruiter" ? (
                                <>
                                    <li>

                                        <Link to={"/admin/companies"}>Companies</Link>
                                    </li>
                                    <li>

                                        <Link to={"/admin/jobs"}>Jobs</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>

                                        <Link to={"/Home"}>Home</Link>
                                    </li>
                                    <li>

                                        <Link to={"/Browse"}>Browse</Link>
                                    </li>
                                    <li>

                                        <Link to={"/Jobs"}>Job</Link>
                                    </li>
                                </>
                            )
                        }

                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to={"/login"}><Button className="bg-blue-500 hover:bg-red-500" variant="outline">Login</Button></Link>
                                <Link to={"/register"}><Button className="bg-red-500 hover:bg-blue-500">Register</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex items-center gap-4 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h3 className='text-2xl font-medium'>{user?.fullname}</h3>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role === 'Student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2></User2>
                                                    <Button variant="link"><Link to={"/Profile"}>Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut></LogOut>
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;









