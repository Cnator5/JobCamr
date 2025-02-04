// import asyncHandler from  'express-async-handler';
// import User from '../models/UserModel.js';
// import Job from './../models/JobModel.js';



// export const createJob = asyncHandler(async (req, res) => {
//     try {
//         const user = await User.findOne({auth0Id: req.oidc.user.sub}); // req.user.sub is the auth0Id
//         const isAuth = req.oidc.isAuthenticated() || user.email;

//         if (!isAuth) {
//             return res.status(401).json({message: "Not authenticated"});
//         }
// const {title, description, location, salary, company, email, jobType, tags, skills, salaryType, negotiable} = req.body;

// if (!title){
//     return res.status(400).json({message: "Title is required"});
// }

// if (!description){
//     return res.status(400).json({message: "Description is required"});
// }

// if (!location){
//     return res.status(400).json({message: "Location is required"});
// }

// if (!salary){
//     return res.status(400).json({message: "Salary is required"});
// }

// if (!company){
//     return res.status(400).json({message: "Company is required"});
// }

// if (!email){
//     return res.status(400).json({message: "Email is required"});
// }

// if (!jobType){
//     return res.status(400).json({message: "Job type is required"});
// }

// if (!tags){
//     return res.status(400).json({message: "Tags are required"});
// }

// if (!skills){
//     return res.status(400).json({message: "Skills are required"});
// }

// if (!salaryType){
//     return res.status(400).json({message: "Salary type is required"});
// }

// if (!negotiable){
//     return res.status(400).json({message: "Negotiable is required"});
// }

// const job = new Job({
//     title,
//     description,
//     location,
//     salary,
//     company,
//     email,
//     jobType,
//     tags,
//     skills,
//     salaryType,
//     negotiable,
//     craetedBy: user._id,
// });

// await job.save();

// return res.status(201).json(job);
//     }catch (err) {
//         console.log("Error in creating job: " + err.message);
//         return res.status(500).json({
//             message: "Server Error"
//         });
//     }
// });

// //get jobs
// export const getJobs = asyncHandler(async (req, res) => {
//     try {
//         const jobs = await Job.find({})
//         .populate("createdBy", "name profilePicture")
//         .sort({createdAt: -1}); //sort by latest jobs

//         return res.status(200).json(jobs);
//     } catch (err) {
//         console.log("Error in getting jobs: " + err.message);
//         return res.status(500).json({
//             message: "Server Error"
//         });
//     }
// });

// //get job by user
// export const getJobsByUser = asyncHandler(async (req, res) => {
//     try {
//         const user = await User.findById( req.params.id); //check if user exists

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         const jobs = await Job.find({craetedBy: user._id}).populate('createdBy', 'name profilePicture');

//         return res.status(200).json(jobs);
//     }
//     catch (err) {
//         console.log("Error in getting jobs: " + err.message);
//         return res.status(500).json({
//         });
//     }
// });

// //search jobs
// export const searchJobs = asyncHandler(async (req, res) => {
//     try {
//         const {location, title, tags} = req.query;

//         let query = {};

//         if (location) {
//             query.location = { $regex: location, $options: 'i' }; //case insensitive
//         }

//         if (title) {
//             query.title = { $regex: title, $options: 'i' }; //case insensitive
//         }

//         if (tags) {
//             query.tags = { $in: tags.split(',') };
//         }

//         const jobs = await Job.find(query).populate('createdBy', 'name profilePicture');

//         return res.status(200).json(jobs);
//     }
//     catch (error) {
//         console.log("Error in searching jobs: ", error);
//         return res.status(500).json({
//             message: "Server Error",
//         });
//     }
// });

// //apply for a job
// export const applyForJob = asyncHandler(async (req, res) => {
//     try {
//         const job = await Job.findById(req.params.id);

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found"
//             });
//         }

//         const user = await User.findOne({auth0Id: req.oidc.user.sub}); // req.user.sub is the auth0Id

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         //check if user has already applied for the job
//         if (job.applicants.includes(user._id)) {
//             return res.status(400).json({
//                 message: "You have already applied for this job"
//             });
//         }

//         job.applicants.push(user._id);
//         await job.save();

//         return res.status(200).json({
//             message: "Applied for job successfully"
//         })
//         } catch (err) {
//             console.log("Error in applying for job: " + err.message);
//             return res.status(500).json({
//                 message: "Server Error"
//             });
//         }
// });

// //like a job and unlike
// export const likeJob = asyncHandler(async (req, res) => {
//     try { 
//         const job = await Job.findById(req.params.id);
        
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found"
//             });
//         }

//         const user = await User.findById({ auth0Id: req.oidc.user.sub }); // req.user._id is the user's id

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         const isLiked = job.likes.includes(user._id);

//         if (isLiked) {
//             job.likes = job.likes.filter((like) => !like.equals(user._id));
//         }else{
//             job.likes.push(user._id);
//         }

//         await job.save();

//         return res.status(200).json({
//             message: "Job liked successfully"
//         })
// }catch (err) {
//     console.log("Error in liking job: " + err.message);
//     return res.status(500).json({
//         message: "Server Error"
//     });
// }
// });

// //get job by id
// export const getJobsById = asyncHandler(async (req, res) => {
//     try {

//         const { id } = req.params;

//         const job = await Job.findById(id).populate('createdBy', 'name profilePicture');

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found"
//             });
//         }

//         return res.status(200).json(job);
//     } catch (err) {
//         console.log("Error in getting job by id: " + err.message);
//         return res.status(500).json({
//             message: "Server Error"
//         });
//     }
// });

// //delete job
// export const deleteJob = asyncHandler(async (req, res) => {
//     try {

//         const {id} = req.params;

//         const job = await Job.findById(id);

//         const user = await User.findOne({auth0Id: req.oidc.user.sub}); // req.user.sub is the auth0Id

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found"
//             });
//         }

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         await job.deleteOne(
//             {
//                 _id: job._id,
//                 craetedBy: user._id
//             }
//         );

//         return res.status(200).json({
//             message: "Job deleted successfully"
//         });
//     } catch (err) {
//         console.log("Error in deleting job: " + err.message);
//         return res.status(500).json({
//             message: "Server Error"
//         });
//     }
// });


import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const createJob = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const {
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    if (!salary) {
      return res.status(400).json({ message: "Salary is required" });
    }

    if (!jobType) {
      return res.status(400).json({ message: "Job Type is required" });
    }

    if (!tags) {
      return res.status(400).json({ message: "Tags are required" });
    }

    if (!skills) {
      return res.status(400).json({ message: "Skills are required" });
    }

    const job = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
      createdBy: user._id,
    });

    await job.save();

    return res.status(201).json(job);
  } catch (error) {
    console.log("Error in createJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get jobs
export const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 }); // sort by latest job

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobs: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get jobs by user
export const getJobsByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await Job.find({ createdBy: user._id })
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobsByUser: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// search jobs
export const searchJobs = asyncHandler(async (req, res) => {
  try {
    const { tags, location, title } = req.query;

    let query = {};

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const jobs = await Job.find(query).populate(
      "createdBy",
      "name profilePicture"
    );

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in searchJobs: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// apply for job
export const applyJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (job.applicants.includes(user._id)) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    job.applicants.push(user._id);

    await job.save();

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in applyJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// liek and unlike job
export const likeJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isLiked = job.likes.includes(user._id);

    if (isLiked) {
      job.likes = job.likes.filter((like) => !like.equals(user._id));
    } else {
      job.likes.push(user._id);
    }

    await job.save();

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in likeJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get job by id
export const getJobById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate(
      "createdBy",
      "name profilePicture"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in getJobById: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// delete job
export const deleteJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await job.deleteOne({
      _id: id,
    });

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log("Error in deleteJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});