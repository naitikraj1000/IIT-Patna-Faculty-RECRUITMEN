import React, { useState } from "react";

const Application4 = () => {
    const [formData, setFormData] = useState({
        teachingExperience: "",
        coursesTaught: "",
        specialization: "",
        specializationDetails: "",
        phdThesisTitle: "",
        phdSupervisor: "",
        phdWorkDocument: null,
        labExperienceDocument: null,
        coSupervisor: "",
        thesisSubmissionDate: "",
        vivaVoceDate: ""
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Teaching Experience (in years) *:</label>
            <input type="number" name="teachingExperience" required onChange={handleChange} /><br />

            <label>No of courses taught *:</label>
            <input type="number" name="coursesTaught" required onChange={handleChange} /><br />

            <label>Areas of specialization *:</label>
            <input type="text" name="specialization" required onChange={handleChange} /><br />

            <label>Enter Areas of specialization*:</label>
            <input name="specializationDetails" required onChange={handleChange} /><br />

            <label>Title of your Ph. D. Thesis *:</label>
            <input type="text" name="phdThesisTitle" required onChange={handleChange} /><br />

            <label>Name of your Ph.D. Supervisor *:</label>
            <input type="text" name="phdSupervisor" required onChange={handleChange} /><br />

            <label>Please describe briefly on a separate sheet your Ph.D. work [1 page – font size 10 (Font: Times New Roman)]. Also detail the areas of interest with work done in each case (if any) *:</label>
            <input type="file" name="phdWorkDocument" required onChange={handleChange} /><br />

            <label>Laboratory Experience: Please describe, in brief on a separate sheet, your experience in (i) Setting up teaching and research laboratories (ii) Conducting laboratory courses & (iii) Using different types of instruments, systems, computers etc. *:</label>
            <input type="file" name="labExperienceDocument" required onChange={handleChange} /><br />

            <label>Name of your Co-Supervisor:</label>
            <input type="text" name="coSupervisor" onChange={handleChange} /><br />

            <label>Date of thesis submission *:</label>
            <input type="date" name="thesisSubmissionDate" required onChange={handleChange} /><br />

            <label>Date of viva-voce *:</label>
            <input type="date" name="vivaVoceDate" required onChange={handleChange} /><br />

        </form>
    );
};

export default Application4;
