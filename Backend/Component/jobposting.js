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

export default jobposting;
export { getjobposting,deletejobposting };