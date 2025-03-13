import prismadb from '../Database/db.js';

async function jobposting(req, res) {

    const user_id = req.user_id;
    const { department, position } = req.body;

    console.log(user_id, department, position);

    if (!department || !position) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
        await prismadb.$transaction(async (tx) => {
            // Step 1: Create Job Posting
            const jobposting = await tx.jobPosting.create({
                data: {
                    department,
                    position,
                    userId: user_id
                }
            });

            let jobpostingid = jobposting.id;

            let education_details = [
                {
                    id: "0",
                    "SCHOOL/COLLEGE/INSTITUTE": "",
                    "DATE OF ENTRY": "",
                    "DATE OF LEAVING": "",
                    "BOARD/UNIVERSITY/INSTITUTION": "",
                    "EXAM/DEGREE/DIPLOMA PASSED": "10th",
                    "DISTINCTION/CLASS/DIVISION": "",
                    "SUBJECTS": "",
                    "PERCENTAGE OF MARKS/CPI": "",
                    "YEAR OF PASSING": "",
                    "default": true
                },
                {
                    id: "1",
                    "SCHOOL/COLLEGE/INSTITUTE": "",
                    "DATE OF ENTRY": "",
                    "DATE OF LEAVING": "",
                    "BOARD/UNIVERSITY/INSTITUTION": "",
                    "EXAM/DEGREE/DIPLOMA PASSED": "12th",
                    "DISTINCTION/CLASS/DIVISION": "",
                    "SUBJECTS": "",
                    "PERCENTAGE OF MARKS/CPI": "",
                    "YEAR OF PASSING": "",
                    "default": true
                },
                {
                    id: "2",
                    "SCHOOL/COLLEGE/INSTITUTE": "",
                    "DATE OF ENTRY": "",
                    "DATE OF LEAVING": "",
                    "BOARD/UNIVERSITY/INSTITUTION": "",
                    "EXAM/DEGREE/DIPLOMA PASSED": "Bachelors",
                    "DISTINCTION/CLASS/DIVISION": "",
                    "SUBJECTS": "",
                    "PERCENTAGE OF MARKS/CPI": "",
                    "YEAR OF PASSING": "",
                    "default": true
                },
                {
                    id: "3",
                    "SCHOOL/COLLEGE/INSTITUTE": "",
                    "DATE OF ENTRY": "",
                    "DATE OF LEAVING": "",
                    "BOARD/UNIVERSITY/INSTITUTION": "",
                    "EXAM/DEGREE/DIPLOMA PASSED": "Masters",
                    "DISTINCTION/CLASS/DIVISION": "",
                    "SUBJECTS": "",
                    "PERCENTAGE OF MARKS/CPI": "",
                    "YEAR OF PASSING": "",
                    "default": true
                },
                {
                    id: "4",
                    "SCHOOL/COLLEGE/INSTITUTE": "",
                    "DATE OF ENTRY": "",
                    "DATE OF LEAVING": "",
                    "BOARD/UNIVERSITY/INSTITUTION": "",
                    "EXAM/DEGREE/DIPLOMA PASSED": "PhD",
                    "DISTINCTION/CLASS/DIVISION": "",
                    "SUBJECTS": "",
                    "PERCENTAGE OF MARKS/CPI": "",
                    "YEAR OF PASSING": "",
                    "default": true
                }
            ];

            let employment_details = [
                {
                    id: "0",
                    "LAST PAY & SCALE OF PAY": "",
                    "POSITION HELD": "",
                    "DATE OF JOINING": "",
                    "DATE OF LEAVING": "",
                    "NATURE OF DUTIES/WORK": "",
                    "ORGANISATION/INSTITUTION": "",
                    "ADDITIONAL REMARKS (ABOUT THE EXPERIENCE, IF ANY)": "",
                    "default": true
                }
            ];

            // Step 2: Create Application Field (Linked to Job Posting)
            await tx.applicationField2.create({
                data: {
                    jobpostingid,
                    education_details: education_details,
                    employment_details: employment_details
                }
            });

            // If both succeed, the transaction commits automatically.
        });

        return res.status(200).json({ message: "Job posted successfully" });

    } catch (error) {
        console.error("Transaction Failed:", error);
        return res.status(500).json({ message: "Failed to post job", error });
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
        // Delete all related application fields (if they exist)
        await prismadb.ApplicationField1.deleteMany({ where: { jobpostingid: job_id } });
        await prismadb.ApplicationField2.deleteMany({ where: { jobpostingid: job_id } });
        await prismadb.ApplicationField3.deleteMany({ where: { jobpostingid: job_id } });
        await prismadb.ApplicationField4.deleteMany({ where: { jobpostingid: job_id } });
        await prismadb.ApplicationField5.deleteMany({ where: { jobpostingid: job_id } });
        await prismadb.ApplicationField6.deleteMany({ where: { jobpostingid: job_id } });

        // Finally, delete the job posting itself
        await prismadb.JobPosting.deleteMany({
            where: {
                userId: user_id,
                id: job_id
            }
        });

        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job posting:", error);
        return res.status(500).json({ message: error.message || "An error occurred while deleting the job" });
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

async function saveapplicationform2(req, res) {
    console.log(" Save Application Form 2");
    console.log(req.body);
    try {
        let savedApplication = await prismadb.applicationField2.update({
            where: { jobpostingid: req.body.jobpostingid },
            data: {
                education_details: req.body.education_details,
                employment_details: req.body.employment_details
            }
        })

        console.log("Application form saved successfully");
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


async function retrieveapplicationform2(req, res) {
    console.log("Retrieve Application Form 2");
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const applicationform = await prismadb.applicationField2.findUnique({
            where: { jobpostingid }
        });

        console.log("Application form retrieved successfully");
        return res.status(200).json({ message: "Application form retrieved successfully", data: applicationform });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error });
    }
}


async function saveapplicationform4(req, res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const savedApplication = await prismadb.applicationField4.upsert({
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


async function retrieveapplicationform4(req, res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const applicationform = await prismadb.applicationField4.findUnique({
            where: { jobpostingid }
        });

        console.log("Application form retrieved successfully");
        return res.status(200).json({ message: "Application form retrieved successfully", data: applicationform });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error });
    }
}


async function saveapplicationform5(req, res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const savedApplication = await prismadb.applicationField5.upsert({
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


async function retrieveapplicationform5(req, res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const applicationform = await prismadb.applicationField5.findUnique({
            where: { jobpostingid }
        });

        console.log("Application form retrieved successfully");
        return res.status(200).json({ message: "Application form retrieved successfully", data: applicationform });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error });
    }
}



async function saveapplicationform3(req, res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const savedApplication = await prismadb.applicationField3.upsert({
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


async function retrieveapplicationform3(req, res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const applicationform = await prismadb.applicationField3.findUnique({
            where: { jobpostingid }
        });

        console.log("Application form retrieved successfully");
        return res.status(200).json({ message: "Application form retrieved successfully", data: applicationform });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error });
    }
}

async function saveapplicationform6(req,res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const savedApplication = await prismadb.applicationField6.upsert({
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

async function retrieveapplicationform6(req,res) {
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const applicationform = await prismadb.applicationField6.findUnique({
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
export {saveapplicationform6, retrieveapplicationform6};
export {saveapplicationform3, retrieveapplicationform3};
export {saveapplicationform5, retrieveapplicationform5};
export { getjobposting, deletejobposting, saveapplicationform, saveapplicationform2, saveapplicationform4, retrieveapplicationform4, retrieveapplicationform, retrieveapplicationform2 };