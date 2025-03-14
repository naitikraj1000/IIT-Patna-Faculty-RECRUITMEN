import React, { useEffect, useState } from "react";
import styles from "./application4.module.css"; // Using the same CSS module
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveprogress } from "../../../redux/infromationslice";

function Application5() {
  const [progresspercentage, setProgressPercentage] = useState(50); // Updated progress percentage
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const saveProgress = useSelector((state) => state.information.saveProgress);

  const [formData, setFormData] = useState({
    awardsHonours: "",
    fellowProfessionalBody: "",
    memberProfessionalBody: "",
    editorialBoardMemberships: "",
    seminarsOrganized: ""
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
    console.log("Save Progress in Application5");
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
      let res = await fetch(`${backendurl}/saveapplicationform/5`, { // Updated endpoint for form 5
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
      let res = await fetch(`${backendurl}/retrieveapplicationform/5`, { // Updated endpoint for form 5
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
          {/* Awards and Honours */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Awards and Honours <span className={styles.required}>*</span>
            </label>
            <textarea
              name="awardsHonours"
              className={styles.formTextarea}
              placeholder="Enter Awards and Honours (comma-separated)"
              required={true}
              onChange={handleChange}
              value={formData.awardsHonours}
            ></textarea>
          </div>

          {/* Fellow of Professional Body */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Fellow of Professional Body <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="fellowProfessionalBody"
              className={styles.formInput}
              placeholder="Enter professional body fellowships"
              required={true}
              onChange={handleChange}
              value={formData.fellowProfessionalBody}
            />
          </div>

          {/* Member of Professional Body */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Member of Professional Body <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="memberProfessionalBody"
              className={styles.formInput}
              placeholder="Enter professional body memberships"
              required={true}
              onChange={handleChange}
              value={formData.memberProfessionalBody}
            />
          </div>

          {/* Editorial Board Memberships */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Editorial Board Memberships <span className={styles.required}>*</span>
            </label>
            <textarea
              name="editorialBoardMemberships"
              className={styles.formTextarea}
              placeholder="List any editorial board memberships"
              required={true}
              onChange={handleChange}
              value={formData.editorialBoardMemberships}
            ></textarea>
          </div>

          {/* Seminars/Conferences Organized */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Seminars/Conferences Organized <span className={styles.required}>*</span>
            </label>
            <textarea
              name="seminarsOrganized"
              className={styles.formTextarea}
              placeholder="Enter Seminars/Conferences you have organized (comma-separated)"
              required={true}
              onChange={handleChange}
              value={formData.seminarsOrganized}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application5;