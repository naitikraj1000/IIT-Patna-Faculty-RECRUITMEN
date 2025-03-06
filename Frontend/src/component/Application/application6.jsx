import React, { useState } from "react";

const Application6 = () => {
    const [formData, setFormData] = useState({
        researchPlan: null,
        previousApplication: "",
        additionalRemarks: "",
        referrer1: { name: "", designation: "", address: "", email: "" },
        referrer2: { name: "", designation: "", address: "", email: "" },
        referrer3: { name: "", designation: "", address: "", email: "" },
        legalProceeding: "Select",
        courtCase: "Select",
        declaration: "Select"
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name.startsWith("referrer")) {
            const [key, field] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [key]: { ...prev[key], [field]: value }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "file" ? files[0] : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Research Plan/ Teaching Plan/Vision and Mission for IIT Patna:</label>
            <input type="file" name="researchPlan" required onChange={handleChange} /><br />
            
            <label>Did you previously apply for any post in this Institute? If so, enter advertisement number:</label>
            <input type="text" name="previousApplication" onChange={handleChange} /><br />
            
            <label>Additional Remarks:</label>
            <input name="additionalRemarks" onChange={handleChange} /><br />
            
            {[1, 2, 3].map((num) => (
                <div key={num}>
                    <h3>Referrer {num}</h3>
                    <label>Name:</label>
                    <input type="text" name={`referrer${num}.name`} required onChange={handleChange} /><br />
                    
                    <label>Designation:</label>
                    <input type="text" name={`referrer${num}.designation`} required onChange={handleChange} /><br />
                    
                    <label>Address:</label>
                    <input name={`referrer${num}.address`} required onChange={handleChange} /><br />
                    
                    <label>Email:</label>
                    <input type="email" name={`referrer${num}.email`} required onChange={handleChange} /><br />
                </div>
            ))}
            
            <label>Do you have any legal proceeding ongoing?</label>
            <select name="legalProceeding" value={formData.legalProceeding} onChange={handleChange} required style={{ width: "150px" }}>
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select><br />
            
            <label>Have you at any time been charged, acquitted, or convicted by a court of law in India or outside India?</label>
            <select name="courtCase" value={formData.courtCase} onChange={handleChange} required style={{ width: "150px" }}>
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select><br />
            
            <label>I hereby declare that I have carefully read and understood the instructions attached to the advertisement as available on Patna website and that all the entries in this form are true to the best of my knowledge and belief...</label>
            <select name="declaration" value={formData.declaration} onChange={handleChange} required style={{ width: "150px" }}>
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select><br />
            
        </form>
    );
};

export default Application6;
