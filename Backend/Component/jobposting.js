import prismadb from '../Database/db.js';

async function jobposting(req, res) {

    const user_id = req.user_id;

    const { department, position } = req.body;

    console.log(user_id, department, position);

    if (!department || !position) {
        return res.status(400).json({ message: "Please enter all fields" });
    }




    try {
        let jobposting = await prismadb.jobPosting.create({
            data: {
                department,
                position,
                userId: user_id
            }
        });

        return res.status(200).json({ message: "Job posted successfully", jobposting });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }



}

async function getjobposting(req, res) {
    const user_id = req.user_id;

    try {
        let jobposting = await prismadb.jobPosting.findMany({
            where: {
                userId: user_id
            }
        });

        return res.status(200).json({ jobposting });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


async function deletejobposting(req, res) {
    const user_id = req.user_id;
    const { job_id } = req.body;
    try {
        let jobposting = await prismadb.jobPosting.deleteMany({
            where: {
                userId: user_id,
                id: job_id
            }
        });
        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


async function saveapplicationform(req, res) {
    try {


        const { jobpostingid } = req.body;
        console.log("Job Posting ID:", jobpostingid); // Debugging step

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        console.log("Job Posting ID:", jobpostingid); // Debugging step

        const savedApplication = await prismadb.applicationField1.upsert({
            where: { jobpostingid }, // ✅ Ensure the correct field is used
            update: req.body, // ✅ Update the record if found
            create: req.body // ✅ Create a new record if not found
        });

        console.log("Application form saved successfully", savedApplication);
        return res.status(200).json({ message: "Application form saved successfully", data: savedApplication });

    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error.message });
    }
}


async function retrieveapplicationform(req, res) {

    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const applicationform = await prismadb.applicationField1.findUnique({
            where: { jobpostingid }
        });

        console.log("Application form retrieved successfully");
        return res.status(200).json({ message: "Application form retrieved successfully", data: applicationform });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error });
    }
}


export default jobposting;
export { getjobposting, deletejobposting, saveapplicationform,retrieveapplicationform };