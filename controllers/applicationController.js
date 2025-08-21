const Application = required('../models/Application')
const Job = require('../models/Job')

const applyToJob = async(req,res) => {
    try {

        const jobId = req.params.jobId;
        const userId = req.user.id;
        const {coverLetter,resume} = req.body;

        //see if the job already exists 
        const job = await Job.findById(jobId);
        if (!job){
            return res.status(404).json({error : "Job not found"});
        }

        //now check if the job Application already exists 
        const existingJobApplication = await Application.findOne({
            Job : jobId,
            User : userId
        });

        if (existingApplication){
            return res.status(400).json({error : "You have already applied to Job"});
        }

        const application = new Application({
            Job : jobId,
            User : userId,
            coverLetter : coverLetter,
            resume : resume
        });

        res.status(201).json({
            message : "Application submitted successfully",
            application
        })

    } catch (err){
        res.status(500).json({error : 'Server Error'});
    }
};

module.exports = {applyToJob};