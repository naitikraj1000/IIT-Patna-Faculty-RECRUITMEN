const bio_data = [
    {
        title: "Full Name (in capital letters as per matriculation/passport record) :",
        type: "text",
        required: true,
        placeholder: "Enter Full Name"
    },
    {
        title: "Date of Birth (Please upload true copy of certificate at Additional Info section of this form)",
        type: "date",
        required: true,
    },
    {
        title: "Proof of Date of Birth (10th Certificate) ",
        type: "file",
        required: true,
        placeholder: "Upload Document"
    },
    {
        title: "Gender",
        type: "radio",
        required: true,
        options: ["Male", "Female", "Other"]
    },
    {
        title: "Marital Status",
        type: "radio",
        required: true,
        options: ["Single", "Married", "Divorced", "Widowed"]
    },
    {
        title: "Permanent Address",
        type: "textarea",
        required: true,
        placeholder: "Enter Permanent Address"

    },
    {
        title: "Address for Correspondence",
        type: "textarea",
        required: true,
        placeholder: "Enter Correspondence Address"
    },
    {
        title: "Pin Code (for Correspondence Address)",
        type: "number",
        required: true,
        placeholder: "Enter Pin Code",
        length: 6

    },
    {
        title: "Email ID",
        type: "email",
        required: true,
        placeholder: "Enter Email ID"
    },
    {
        ttile: "Father's/Husband's Name",
        type: "text",
        required: true,
        placeholder: "Enter Father's/Husband's Name"
    },
    {
        title: "Mobile No. (including country code)",
        type: "number",
        required: true,
        placeholder: "Enter Mobile No.",
        length: 10
    },
    {
        title: "Advt. No.",
        type: "radio",
        required: true,
        options: ["Advt. No. 01/2021", "Advt. No. 02/2021", "Advt. No. 03/2021"]
    },
    {
        title: "Field of Specialization",
        type: "text",
        required: true,
        placeholder: "Enter Field of Specialization"
    },
    {
        title: "Are you a citizen of India by birth or by domicile?",
        type: "radio",
        required: true,
        options: ["By Birth", "By Domicile"]
    },
    {
        title: "Category (Please upload true copy of certificate at Additional Info section of this form in case of SC/ST/OBC)",
        type: "radio",
        required: true,
        options: ["General", "EWS", "OBC", "SC", "ST",]
    },
    {
        title: "Do you belong to the PWD category? (Please upload true copy of certificate at Additional Info section of this form)",
        type: "radio",
        required: true,
        options: ["Yes", "No"]
    },
    {
        title: "If you are employed, please state your present basic pay and scale of pay",
        type: "text",
        placeholder: "Enter Basic Pay and Scale of Pay"
    },
    {
        title: "Passport Photo",
        type: "file",
        required: true,
        placeholder: "Upload Document"
    },
    {
        title: "If the appointment is offered, how much time would you need before joining the post?",
        type: "text",
        required: true,
        placeholder: "Enter Time"
    },
    {
        title: "Mother's Name",
        type: "text",
        required: true,
        placeholder: "Enter Mother's Name"
    },
    {
        title: "Age as on closing date of advertisement",
        type: "text",
        required: true,
        placeholder: "Enter Age"
    },
    {
        title: "Signature of Applicant ",
        type: "file",
        required: true,
        placeholder: "Upload Document"
    }

]


export default bio_data;