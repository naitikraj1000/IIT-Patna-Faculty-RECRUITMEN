import React, { useEffect, useState } from "react";
import styles from "./application3.module.css"; // Using the same CSS module as Application2
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveprogress } from "../../../redux/infromationslice";
import { FaEdit, FaTrash } from "react-icons/fa";

function Application3() {
  const [progresspercentage, setProgressPercentage] = useState(85); // Assuming this is form 3
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const saveProgress = useSelector((state) => state.information.saveProgress);

  // Research publication format
  const research_publication_format = {
    year: "",
    volume: "",
    authors: "",
    title: "",
    journal: "",
    hIndex: "",
    impactFactor: "",
  };

  // State for research publications entries
  const [researchPublications, setResearchPublications] = useState([]);

  // State for popup
  const [showResearchPopup, setShowResearchPopup] = useState(false);

  // State for editing index
  const [editingResearchIndex, setEditingResearchIndex] = useState(null);

  // State for new entry
  const [newResearchEntry, setNewResearchEntry] = useState(
    research_publication_format
  );

  // State for other form data
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
    booksPublished: "",
    bookChaptersPublished: "",
    researchExperience: "",
    patentsList: "",
    journalPublications: "",
    conferencePublications: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? (files.length === 1 ? files[0] : [...files]) : value,
    }));
  };

  // Document uploading function
  async function uploaddocuments(file) {
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    setUploading(true);
    try {
      let uploadData = new FormData();
      uploadData.append("file", file);

      let res = await fetch(`${backendurl}/uploaddocument`, {
        method: "POST",
        body: uploadData,
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      let data = await res.json();
      console.log("Document uploaded successfully:", data.url);
      return data.url;
    } catch (error) {
      console.error("Error uploading document:", error.message);
      return null;
    } finally {
      setUploading(false);
    }
  }

  // Save progress function
  async function handleSaveProgress() {
    console.log("Save Progress in Application3");
    let updatedFormData = { ...formData };

    // Upload any files in the form data
    for (let key in formData) {
      if (formData[key] instanceof File) {
        let url = await uploaddocuments(formData[key]);
        if (url) {
          updatedFormData[key] = url;
        }
      }
    }

    setFormData(updatedFormData);
    const parts = location.pathname.split("/");
    const jobpostingid = parts[parts.length - 2];

    // Create the data to be saved
    const dataToSave = {
      ...updatedFormData,
      researchPublications: researchPublications,
      completepercent: progresspercentage,
      jobpostingid: jobpostingid,
    };

    console.log("Data to save:", dataToSave);

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    try {
      let res = await fetch(`${backendurl}/saveapplicationform3`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      let data = await res.json();
      console.log("Application form saved successfully:", data.message);
    } catch (error) {
      console.error("Error saving application form:", error.message);
    }
  }

  // Retrieve progress function
  async function retriveProgress() {
    console.log("Retrieve Progress in Application3");
    const parts = location.pathname.split("/");
    const jobpostingid = parts[parts.length - 2];
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    try {
      let res = await fetch(`${backendurl}/retrieveapplicationform3`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobpostingid: jobpostingid }),
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      let data = await res.json();
      let retrievedFormData = data.data;
      console.log(
        "Application form retrieved successfully:",
        retrievedFormData
      );

      // Set form data
      let temp_formData = { ...formData };
      for (let key in temp_formData) {
        if (key in retrievedFormData) {
          temp_formData[key] = retrievedFormData[key];
        }
      }
      setFormData(temp_formData);

      // Set research publications if available
      if (
        retrievedFormData.researchPublications &&
        Array.isArray(retrievedFormData.researchPublications)
      ) {
        setResearchPublications(retrievedFormData.researchPublications);
      } else {
        // Initialize with 5 empty entries if none exist
        setResearchPublications(
          Array(5).fill({ ...research_publication_format })
        );
      }
    } catch (error) {
      console.error("Error retrieving application form:", error.message);
    }
  }

  // Open popup to add/edit research publication entry
  function openResearchPopup(index = null) {
    setEditingResearchIndex(index);
    setNewResearchEntry(
      index !== null ? researchPublications[index] : research_publication_format
    );
    setShowResearchPopup(true);
  }

  // Handle research publication form submission
  function handleResearchSubmit() {
    if (editingResearchIndex !== null) {
      // Update existing entry
      setResearchPublications((prev) =>
        prev.map((entry, i) =>
          i === editingResearchIndex ? newResearchEntry : entry
        )
      );
    } else {
      // Add new entry
      setResearchPublications((prev) => [...prev, { ...newResearchEntry }]);
    }
    setShowResearchPopup(false);
    setNewResearchEntry(research_publication_format);
  }

  // Delete research publication entry
  function deleteResearchEntry(index) {
    setResearchPublications((prev) => prev.filter((_, i) => i !== index));
  }

  useEffect(() => {
    retriveProgress();
  }, []);

  useEffect(() => {
    if (saveProgress) {
      handleSaveProgress();
      dispatch(saveprogress());
    }
  }, [saveProgress]);

  return (
    <div className={styles.container}>
      {/* Research Projects Section */}
      <div className={styles.educationcontainer}>
        <h2>
          Research Information <span className={styles.required}>*</span>
        </h2>

        <div className={styles.formGroup}>
          <label>
            No. of PG projects guided:{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="pgProjects"
            placeholder="Enter number of PG projects"
            required={true}
            onChange={handleChange}
            value={formData.pgProjects}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            No. of Ph.D. thesis guided (completed):{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="phdCompleted"
            placeholder="Enter number of completed Ph.D. thesis"
            required={true}
            onChange={handleChange}
            value={formData.phdCompleted}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            No. of Ph.D. thesis guided (ongoing):{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="phdOngoing"
            placeholder="Enter number of ongoing Ph.D. thesis"
            required={true}
            onChange={handleChange}
            value={formData.phdOngoing}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            No. of Projects involved in (Sponsored):{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="sponsoredProjects"
            placeholder="Enter number of sponsored projects"
            required={true}
            onChange={handleChange}
            value={formData.sponsoredProjects}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            No. of Projects involved in (Consultancy):{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="consultancyProjects"
            placeholder="Enter number of consultancy projects"
            required={true}
            onChange={handleChange}
            value={formData.consultancyProjects}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            No. of patents (mention the status as well):{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="patents"
            placeholder="Enter patents information"
            required={true}
            onChange={handleChange}
            value={formData.patents}
          />
        </div>

        {/* Research Publications Table */}
        <h2>
          Your 5 (Five) most important research publications{" "}
          <span className={styles.required}>*</span>
        </h2>
        <table
          border="1"
          cellSpacing="0"
          cellPadding="5"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "100px" }}>EDIT/DELETE</th>
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
            {researchPublications.map((entry, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  <FaEdit
                    onClick={() => openResearchPopup(index)}
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      color: "#3498db",
                    }}
                  />
                  <FaTrash
                    onClick={() => deleteResearchEntry(index)}
                    style={{ cursor: "pointer", color: "#e74c3c" }}
                  />
                </td>
                <td>{entry.year}</td>
                <td>{entry.volume}</td>
                <td>{entry.authors}</td>
                <td>{entry.title}</td>
                <td>{entry.journal}</td>
                <td>{entry.hIndex}</td>
                <td>{entry.impactFactor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className={styles.addButton}
          onClick={() => openResearchPopup()}
        >
          Add Entry
        </button>
      </div>

      {/* Publication Details Section */}
      <div className={styles.employmentcontainer}>
        <h2>
          Publication Details <span className={styles.required}>*</span>
        </h2>

        <div className={styles.fileUploadGroup}>
          <label>
            Upload Research & Development / Industrial/Training experience:{" "}
            <span className={styles.required}>*</span>
          </label>
          <label
            className={styles.fileUploadLabel}
            htmlFor="researchExperience"
          >
            Upload
            {typeof formData.researchExperience === "string" &&
            formData.researchExperience.trim() ? (
              <p>{formData.researchExperience}</p>
            ) : formData.researchExperience instanceof File ? (
              <p>{formData.researchExperience.name}</p>
            ) : null}
            <input
              type="file"
              name="researchExperience"
              id="researchExperience"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.fileUploadGroup}>
          <label>
            Upload Complete list of Patents (ANNEXURE A):{" "}
            <span className={styles.required}>*</span>
          </label>
          <label className={styles.fileUploadLabel} htmlFor="patentsList">
            Upload
            {typeof formData.patentsList === "string" &&
            formData.patentsList.trim() ? (
              <p>{formData.patentsList}</p>
            ) : formData.patentsList instanceof File ? (
              <p>{formData.patentsList.name}</p>
            ) : null}
            <input
              type="file"
              name="patentsList"
              id="patentsList"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.fileUploadGroup}>
          <label>
            Upload Complete list of Journal Publications (APA citation style):{" "}
            <span className={styles.required}>*</span>
          </label>
          <label
            className={styles.fileUploadLabel}
            htmlFor="journalPublications"
          >
            Upload
            {typeof formData.journalPublications === "string" &&
            formData.journalPublications.trim() ? (
              <p>{formData.journalPublications}</p>
            ) : formData.journalPublications instanceof File ? (
              <p>{formData.journalPublications.name}</p>
            ) : null}
            <input
              type="file"
              name="journalPublications"
              id="journalPublications"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.fileUploadGroup}>
          <label>
            Upload Complete list of Conference Publications/Presentations:{" "}
            <span className={styles.required}>*</span>
          </label>
          <label className="styles.fileUploadLabel" htmlFor="conferencePublications">
            Upload
            {typeof formData.conferencePublications === "string" &&
            formData.conferencePublications.trim() ? (
              <p>{formData.conferencePublications}</p>
            ) : formData.conferencePublications instanceof File ? (
              <p>{formData.conferencePublications.name}</p>
            ) : null}
            <input
              type="file"
              name="conferencePublications"
              id="conferencePublications"
              onChange={handleChange}
            />
        </label>
        </div>

        <div className={styles.formGroup}>
          <label>
            List of books published: <span className={styles.required}>*</span>
          </label>
          <textarea
            name="booksPublished"
            placeholder="Enter list of books published"
            required={true}
            onChange={handleChange}
            value={formData.booksPublished}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>
            List of book chapters published:{" "}
            <span className={styles.required}>*</span>
          </label>
          <textarea
            name="bookChaptersPublished"
            placeholder="Enter list of book chapters published"
            required={true}
            onChange={handleChange}
            value={formData.bookChaptersPublished}
          ></textarea>
        </div>
      </div>

      {/* Research Publication Popup */}
      {showResearchPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>
              {editingResearchIndex !== null ? "Edit" : "Add"} Research
              Publication
            </h3>
            <div>
              <label>Year</label>
              <input
                type="text"
                value={newResearchEntry.year}
                onChange={(e) =>
                  setNewResearchEntry((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>Volume</label>
              <input
                type="text"
                value={newResearchEntry.volume}
                onChange={(e) =>
                  setNewResearchEntry((prev) => ({
                    ...prev,
                    volume: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>Authors</label>
              <input
                type="text"
                value={newResearchEntry.authors}
                onChange={(e) =>
                  setNewResearchEntry((prev) => ({
                    ...prev,
                    authors: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={newResearchEntry.title}
                onChange={(e) =>
                  setNewResearchEntry((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>Journal/Conference</label>
              <input
                type="text"
                value={newResearchEntry.journal}
                onChange={(e) =>
                  setNewResearchEntry((prev) => ({
                    ...prev,
                    journal: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>H-Index/Core Rank</label>
              <input
                type="text"
                value={newResearchEntry.hIndex}
                onChange={(e) =>
                  setNewResearchEntry((prev) => ({
                    ...prev,
                    hIndex: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>Impact Factor</label>
              <input
                type="text"
                value={newResearchEntry.impactFactor}
                onChange={(e) =>
                  setNewResearchEntry((prev) => ({
                    ...prev,
                    impactFactor: e.target.value,
                  }))
                }
              />
            </div>
            <button onClick={handleResearchSubmit}>Submit</button>
            <button onClick={() => setShowResearchPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Application3;
