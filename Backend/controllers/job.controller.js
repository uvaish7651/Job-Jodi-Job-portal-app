import { Job } from "../models/job.model.js";
import mongoose from "mongoose";

//Admin job posting
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, country,
            jobType, position, companyId, experience } = req.body;

        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !position
            || !companyId || !experience
        ) {
            return res.status(400).json({
                message: "Please fill all the fields",
                status: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            country,
            jobType,
            position,
            company: companyId,
            experience: experience,
            created_by: userId,
        })
        return res.status(201).json({
            message: "Job posted successfully",
            status: true,
            job
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            status: false
        })
    }
};


//Users
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                status: false,
            })
        }
        return res.status(200).json({
            jobs,
            status: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            status: false,
        })
    }
}

//Users
export const getJobById = async (req, res) => {

    const { id } = req.params;

    // id validate karo
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: false, message: "Invalid Job ID" });
    }

    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                status: false,
            })
        }
        return res.status(200).json({
            job,
            status: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            status: false,
        })
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            sort: {createdAt: -1},
        })
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                status: false,
            })
        }
        return res.status(200).json({
            jobs, status: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            status: false,
        })
    }
}



