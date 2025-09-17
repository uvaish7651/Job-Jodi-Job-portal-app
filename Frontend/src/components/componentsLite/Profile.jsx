import React, { useState } from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from "@/components/ui/button"
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import AppliedJob from './AppliedJob'
import EditProfileModal from './EditProfileModal'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import useGetAllAppliedJobs from '../../hooks/useGetAllAppliedJobs'





const isResume = true;

const Profile = () => {
    useGetAllAppliedJobs()

    const [open, setOpen] = useState(false);

    const { user } = useSelector((store) => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200
                    rounded-2xl my-5 p-8 shadow shadow-gray-300 hover:shadow-red-400'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-5'>
                        <Avatar className="cursor-pointer h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        className="text-right" variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span className=''>
                            <a href={`mailto:${user?.email}`}>{user?.email}</a>
                        </span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span className=''>
                            <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>

                        </span>
                    </div>
                </div>

                <div>
                    <div className='my-5'>
                        <h1 className='font-bold text-2xl'>Skills</h1>
                        <div className='items-center flex gap-2'>
                            {user?.profile?.skills?.length !== 0 ? (
                                user?.profile?.skills?.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                ))
                            ) : (
                                <span>NA</span>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <label className='text-md font-bold'>Resume</label>
                        <div>
                            {
                                isResume ? (
                                    <a
                                        target='_blank' href=
                                        {user?.profile?.resume}

                                        className='text-blue-600 hover:underline cursor-pointer'
                                    >
                                        Download
                                    </a>
                                ) : (
                                    <span>No Resume Found</span>
                                )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='text-lg my-5 font-bold text-blue-600'>Applied Jobs</h1>

                {/* Application table */}
                <AppliedJob />

                {/* Edir profile model */}
                <EditProfileModal open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Profile
