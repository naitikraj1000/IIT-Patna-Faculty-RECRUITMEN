// import React from 'react'

// function Application5() {
//   return (
//     <div>
//       <h1>Awards and Recognition</h1>
//     </div>
//   )
// }

// export default Application5


import React, { useState } from "react";

const Application5 = () => {
    const [formData, setFormData] = useState({
        awardsHonours: "",
        fellowProfessionalBody: "",
        memberProfessionalBody: "",
        editorialBoardMemberships: "",
        seminarsOrganized: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Awards and Honours:</label>
            <input type="text" name="awardsHonours" placeholder="Enter Awards and Honours (comma-separated)" required onChange={handleChange} /><br />
            
            <label>Fellow of Professional Body:</label>
            <input type="text" name="fellowProfessionalBody" required onChange={handleChange} /><br />
            
            <label>Member of Professional Body:</label>
            <input type="text" name="memberProfessionalBody" required onChange={handleChange} /><br />
            
            <label>Editorial Board Memberships:</label>
            <input type="text" name="editorialBoardMemberships" required onChange={handleChange} /><br />
            
            <label>Seminars/Conferences Organized:</label>
            <input type="text" name="seminarsOrganized" placeholder="Enter Seminars/Conferences (comma-separated)" required onChange={handleChange} /><br />
            
        </form>
    );
};

export default Application5;
