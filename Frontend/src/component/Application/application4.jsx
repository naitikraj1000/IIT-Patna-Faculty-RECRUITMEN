import React, { useEffect, useState } from "react";
import styles from "./application4.module.css"; // Using the same CSS module
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputFile from "./uploadfile";
import { saveprogress } from "../../../redux/infromationslice";

function Application4() {
  const [progresspercentage, setProgressPercentage] = useState(40); // Adjust based on your progress tracking
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const saveProgress = useSelector((state) => state.information.saveProgress);

  const [formData, setFormData] = useState({
    teachingExperience: "",
    coursesTaught: "",
    specialization: "",
    specializationDetails: "",
    phdThesisTitle: "",
    phdSupervisor: "",
    phdWorkDocument: "",
    labExperienceDocument: "",
    coSupervisor: "",
    thesisSubmissionDate: "",
    vivaVoceDate: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log("Input changed:", name, type === "file" ? files : value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "file" ? (files.length === 1 ? files[0] : [...files]) : value,
    }));
  };

  async function uploaddocuments(file) {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendurl);

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

  async function handleSaveProgress() {
    console.log("Save Progress in Application4");
    let updatedFormData = { ...formData };

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
    updatedFormData.completepercent = progresspercentage;
    updatedFormData.jobpostingid = jobpostingid;
    console.log("Data to save:", updatedFormData);

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    try {
      let res = await fetch(`${backendurl}/saveapplicationform/4`, { // Updated endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      let data = await res.json();
      console.log("Application form saved successfully:", data.message);
    } catch (error) {
      console.error("Error saving application form:", error.message);
    }
  }

  async function retriveProgress() {
    const parts = location.pathname.split("/");
    const jobpostingid = parts[parts.length - 2];
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    try {
      let res = await fetch(`${backendurl}/retrieveapplicationform/4`, { // Updated endpoint
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

      let temp_formData = { ...formData };
      for (let key in temp_formData) {
        if (key in retrievedFormData) {
          temp_formData[key] = retrievedFormData[key];
        }
      }
      setFormData(temp_formData);
    } catch (error) {
      console.error("Error retrieving application form:", error.message);
    }
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
    <div className={styles.biodataContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.biodataForm}>
          {/* Teaching Experience */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Teaching Experience (in years) <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="teachingExperience"
              className={styles.formInput}
              placeholder="Enter teaching experience in years"
              required={true}
              onChange={handleChange}
              value={formData.teachingExperience}
            />
          </div>

          {/* Courses Taught */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Number of courses taught <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="coursesTaught"
              className={styles.formInput}
              placeholder="Enter number of courses taught"
              required={true}
              onChange={handleChange}
              value={formData.coursesTaught}
            />
          </div>

          {/* Areas of Specialization */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Areas of specialization <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="specialization"
              className={styles.formInput}
              placeholder="Enter areas of specialization"
              required={true}
              onChange={handleChange}
              value={formData.specialization}
            />
          </div>

          {/* Specialization Details */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Detailed areas of specialization <span className={styles.required}>*</span>
            </label>
            <textarea
              name="specializationDetails"
              className={styles.formTextarea}
              placeholder="Provide detailed information about your areas of specialization"
              required={true}
              onChange={handleChange}
              value={formData.specializationDetails}
            ></textarea>
          </div>

          {/* PhD Thesis Title */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Title of your Ph.D. Thesis <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="phdThesisTitle"
              className={styles.formInput}
              placeholder="Enter your Ph.D. thesis title"
              required={true}
              onChange={handleChange}
              value={formData.phdThesisTitle}
            />
          </div>

          {/* PhD Supervisor */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Name of your Ph.D. Supervisor <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="phdSupervisor"
              className={styles.formInput}
              placeholder="Enter your Ph.D. supervisor's name"
              required={true}
              onChange={handleChange}
              value={formData.phdSupervisor}
            />
          </div>

          {/* PhD Work Document */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Ph.D. Work Description <span className={styles.required}>*</span>
              <small> (Please describe briefly on a separate sheet your Ph.D. work [1 page – font size 10 (Font: Times New Roman)]. Also detail the areas of interest with work done in each case (if any))</small>
            </label>

            <InputFile formFile={styles.formFile} name="phdWorkDocument" handleChange={handleChange} data={formData.phdWorkDocument} />
            {/* <label className={styles.formFile} htmlFor={"phdWorkDocument"}>
              Upload
              {typeof formData.phdWorkDocument === "string" &&
              formData.phdWorkDocument.trim() ? (
                <p>{formData.phdWorkDocument}</p>
              ) : formData.phdWorkDocument instanceof File ? (
                <p>{formData.phdWorkDocument.name}</p>
              ) : null}
            </label>
            <input
              name="phdWorkDocument"
              type="file"
              id="phdWorkDocument"
              onChange={handleChange}
            /> */}
          </div>

          {/* Lab Experience Document */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Laboratory Experience Description <span className={styles.required}>*</span>
              <small> (Please describe, in brief on a separate sheet, your experience in (i) Setting up teaching and research laboratories (ii) Conducting laboratory courses & (iii) Using different types of instruments, systems, computers etc.)</small>
            </label>
            <InputFile formFile={styles.formFile} name="labExperienceDocument" handleChange={handleChange} data={formData.labExperienceDocument} />
            {/* <label className={styles.formFile} htmlFor={"labExperienceDocument"}>
              Upload
              {typeof formData.labExperienceDocument === "string" &&
              formData.labExperienceDocument.trim() ? (
                <p>{formData.labExperienceDocument}</p>
              ) : formData.labExperienceDocument instanceof File ? (
                <p>{formData.labExperienceDocument.name}</p>
              ) : null}
            </label>
            <input
              name="labExperienceDocument"
              type="file"
              id="labExperienceDocument"
              onChange={handleChange}
            /> */}
          </div>

          {/* Co-Supervisor */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Name of your Co-Supervisor
            </label>
            <input
              type="text"
              name="coSupervisor"
              className={styles.formInput}
              placeholder="Enter your co-supervisor's name (if applicable)"
              onChange={handleChange}
              value={formData.coSupervisor}
            />
          </div>

          {/* Thesis Submission Date */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Date of thesis submission <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="thesisSubmissionDate"
              className={styles.formInput}
              required={true}
              onChange={handleChange}
              value={formData.thesisSubmissionDate}
            />
          </div>

          {/* Viva-Voce Date */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Date of viva-voce <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="vivaVoceDate"
              className={styles.formInput}
              required={true}
              onChange={handleChange}
              value={formData.vivaVoceDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application4;