import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React from 'react'
import store from '../../redux/store'

const AppliedJob = () => {
    const allAppliedJobs = useSelector((store) => store.job.allAppliedJobs || []);
    return (
        <div>
            <Table>
                <TableCaption>Recent Applid Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You have not applied any job.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id}>
                                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                <TableCell>
                                    <Badge
                                    className={`${appliedJob?.status === "rejected"
                                        ? "bg-red-500"
                                        : appliedJob?.status === "accepted"
                                        ? "bg-green-600"
                                        : "bg-gray-500"
                                    }`}
                                    >
                                      
                                        {appliedJob?.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJob
