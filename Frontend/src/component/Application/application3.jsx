import React, { useState } from "react";

const Application3 = () => {
    const [formData, setFormData] = useState({
        pgProjects: "",
        phdCompleted: "",
        phdOngoing: "",
        sponsoredProjects: "",
        consultancyProjects: "",
        patents: "",
        journalNational: "",
        journalInternational: "",
        conferenceRefereedNational: "",
        conferenceUnrefereedNational: "",
        technicalReports: "",
        citations: "",
        conferenceRefereedInternational: "",
        conferenceUnrefereedInternational: "",
        researchExperience: null,
        patentsList: null,
        journalPublications: null,
        conferencePublications: null,
        booksPublished: "",
        bookChaptersPublished: "",
        researchPublications: Array(5).fill({
            year: "",
            volume: "",
            authors: "",
            title: "",
            journal: "",
            hIndex: "",
            impactFactor: ""
        })
    });

    const handleChange = (e, index = null) => {
        const { name, value, type, files } = e.target;

        if (index !== null) {
            const updatedResearchPublications = [...formData.researchPublications];
            updatedResearchPublications[index] = { ...updatedResearchPublications[index], [name]: value };
            setFormData((prev) => ({ ...prev, researchPublications: updatedResearchPublications }));
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
            <label>No. of PG projects guided:</label>
            <input type="number" name="pgProjects" onChange={handleChange} required /><br />
            
            <label>No. of Ph.D. thesis guided (completed):</label>
            <input type="number" name="phdCompleted" onChange={handleChange} required /><br />
            
            <label>No. of Ph.D. thesis guided (ongoing):</label>
            <input type="number" name="phdOngoing" onChange={handleChange} required /><br />
            
            <label>No. of Projects involved in (Sponsored):</label>
            <input type="number" name="sponsoredProjects" onChange={handleChange} required /><br />
            
            <label>No. of Projects involved in (Consultancy):</label>
            <input type="number" name="consultancyProjects" onChange={handleChange} required /><br />
            
            <label>No. of patents (mention the status as well):</label>
            <input type="text" name="patents" onChange={handleChange} required /><br />
            
            <h3>Your 5 (Five) most important research publications</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Vol. No.</th>
                        <th>Authors</th>
                        <th>Title</th>
                        <th>Journal/Conference</th>
                        <th>H-Index/Core Rank</th>
                        <th>Impact Factor</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.researchPublications.map((publication, index) => (
                        <tr key={index}>
                            {Object.keys(publication).map((field) => (
                                <td key={field}>
                                    <input
                                        type="text"
                                        name={field}
                                        value={publication[field]}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <label>Upload Research & Development / Industrial/Training experience:</label>
            <input type="file" name="researchExperience" onChange={handleChange} required /><br />
            
            <label>Upload Complete list of Patents (ANNEXURE A):</label>
            <input type="file" name="patentsList" onChange={handleChange} required /><br />
            
            <label>Upload Complete list of Journal Publications (APA citation style):</label>
            <input type="file" name="journalPublications" onChange={handleChange} required /><br />
            
            <label>Upload Complete list of Conference Publications/Presentations (APA citation style):</label>
            <input type="file" name="conferencePublications" onChange={handleChange} required /><br />
            
            <label>Provide list of books published:</label>
            <textarea name="booksPublished" onChange={handleChange} required></textarea><br />
            
            <label>Provide list of book chapters published:</label>
            <textarea name="bookChaptersPublished" onChange={handleChange} required></textarea><br />
            
        </form>
    );
};

export default Application3;