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
    const { id } = req.params;
    console.log("Save Application Form ", id);
    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const tableName = `applicationField${id}`;

        if (!prismadb[tableName]) {
            return res.status(400).json({ message: `Table ${tableName} does not exist` });
        }

        const savedApplication = await prismadb[tableName].upsert({
            where: { jobpostingid },
            update: req.body,
            create: req.body
        });

        return res.status(200).json({ message: "Application form saved successfully", data: savedApplication });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error.message });
    }
}


async function retrieveapplicationform(req, res) {
    console.log("Retrieve Application Form");
    console.log(req.params);
    const { id } = req.params;

    try {
        const { jobpostingid } = req.body;

        if (!jobpostingid) {
            return res.status(400).json({ message: "jobpostingid is required" });
        }

        const tableName = `applicationField${id}`;

        if (!prismadb[tableName]) {
            console.error(`Table ${tableName} does not exist`);
            return res.status(400).json({ message: `Table ${tableName} does not exist` });
        }

        const applicationform = await prismadb[tableName].findUnique({
            where: { jobpostingid }
        });
        console.log("Application form retrieved successfully", applicationform);
        return res.status(200).json({ message: "Application form retrieved successfully", data: applicationform });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error.message });
    }
}


async function getallapplicationform(req, res) {
    const jobpostingid = req.params.id;
    try {
        const [
            applicationField1,
            applicationField2,
            applicationField3,
            applicationField4,
            applicationField5,
            applicationField6,
        ] = await Promise.all([
            prismadb.applicationField1.findUnique({ where: { jobpostingid } }),
            prismadb.applicationField2.findUnique({ where: { jobpostingid } }),
            prismadb.applicationField3.findUnique({ where: { jobpostingid } }),
            prismadb.applicationField4.findUnique({ where: { jobpostingid } }),
            prismadb.applicationField5.findUnique({ where: { jobpostingid } }),
            prismadb.applicationField6.findUnique({ where: { jobpostingid } }),
        ]);

        return res.status(200).json({ 
            message: "Application form retrieved successfully", 
            data: [applicationField1, applicationField2, applicationField3, 
                  applicationField4, applicationField5, applicationField6] 
        });
    } catch (error) {
        console.error("Application form error", error);
        return res.status(500).json({ message: error.message });
    }
}




export default jobposting;
export { getallapplicationform };
export { getjobposting, deletejobposting, saveapplicationform, retrieveapplicationform };