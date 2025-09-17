import React from 'react'
import { Button } from '../ui/button'
import { Bookmark, BookMarked } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ( {job} ) => {

  const navigate = useNavigate();

  const [isBookmarked, setBookmarked] = React.useState(false);

  
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - createdAt.getTime();
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  }


  return (

    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-300 cursor-pointer hover:shadow-2xl hover:shadow-blue-100 hover:p-3'>
      <div className='flex items-center justify-between'>
       
        <p className='text-sm text-gray-500'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)}daysAgo`}</p>
        <Button variant="outline" className='rounded-md' size="icon" onClick={() => setBookmarked(!isBookmarked)}>
          {isBookmarked ? <BookMarked /> : <Bookmark />}
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}>
            </AvatarImage>
          </Avatar>
        </Button>

      </div>

      <div>
        <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.country}</p>
      </div>

      <div>
        <div>
          <h2 className='font-bold text-lg my-2'>{job?.title}</h2>
          <p className='text-sm text-gray-500'>{job?.description}</p>
        </div>
      </div>
      <div className='flex gap-2 items-center mt-4'>
        <Badge className="text-blue-600 font-bold" variant="ghost">
          {job?.position} position
        </Badge>
        <Badge className="text-orange-600 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
        <Badge className="text-violet-600 font-bold" variant="ghost">
          {job?.location}
        </Badge>
         <Badge className="text-violet-600 font-bold" variant="ghost">
          {job?.country}
        </Badge>
        <Badge className="text-black font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button
          onClick={() => {
           
            navigate(`/description/${job?._id}`);
          }}
          variant="outline" className="rounded-md  bg-yellow-400 cursor-pointer " >
          Details
        </Button>
      </div>

    </div>
  )
}

export default Job
