import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveprogress } from "../../../redux/infromationslice";
import styles from "./application6.module.css";

function Application6() {
  const [progresspercentage, setProgressPercentage] = useState(33);
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const saveProgress = useSelector((state) => state.information.saveProgress);

  const [formData, setFormData] = useState({
    researchPlan: "",
    previousApplication: "",
    additionalRemarks: "",
    referrer1: { name: "", designation: "", address: "", email: "" },
    referrer2: { name: "", designation: "", address: "", email: "" },
    referrer3: { name: "", designation: "", address: "", email: "" },
    legalProceeding: "",
    courtCase: "",
    declaration: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: {
          ...prevFormData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "file" ? (files.length === 1 ? files[0] : [...files]) : value,
      }));
    }
  };

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

  async function handleSaveProgress() {
    console.log("Save Progress in Application6");
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
      let res = await fetch(`${backendurl}/saveapplicationform6`, {
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
      let res = await fetch(`${backendurl}/retrieveapplicationform6`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobpostingid: jobpostingid }),
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      let data = await res.json();
      let retrievedFormData = data.data;
      console.log("Application form retrieved successfully:", retrievedFormData);

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
    <div className={styles.additionalinfoContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.additionalinfoform}>
          {/* Research Plan */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Research Plan/ Teaching Plan/Vision and Mission for IIT Patna:{" "}
              <span className={styles.required}>*</span>
            </label>
            <label className={styles.formFile} htmlFor="researchPlan">
              Upload
              {typeof formData.researchPlan === "string" &&
              formData.researchPlan.trim() ? (
                <p>{formData.researchPlan}</p>
              ) : formData.researchPlan instanceof File ? (
                <p>{formData.researchPlan.name}</p>
              ) : null}
            </label>
            <input
              name="researchPlan"
              type="file"
              id="researchPlan"
              onChange={handleChange}
            />
          </div>

          {/* Previous Application */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Did you previously apply for any post in this Institute? If so,
              enter advertisement number:{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="previousApplication"
              className={styles.formInput}
              placeholder="Enter Advertisement Number"
              onChange={handleChange}
              value={formData.previousApplication}
            />
          </div>

          {/* Additional Remarks */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Additional Remarks: <span className={styles.required}>*</span>
            </label>
            <textarea
              name="additionalRemarks"
              className={styles.formTextarea}
              placeholder="Enter Additional Remarks"
              onChange={handleChange}
              value={formData.additionalRemarks}
            ></textarea>
          </div>

          {/* Referrers */}
          {[1, 2, 3].map((num) => (
            <div key={num} className={styles.formGroup}>
              <h3 className={styles.formLabel}>Referrer {num}</h3>
              <label className={styles.formLabel}>
                Name: <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name={`referrer${num}.name`}
                className={styles.formInput}
                placeholder="Enter Name"
                required
                onChange={handleChange}
                value={formData[`referrer${num}`].name}
              />

              <label className={styles.formLabel}>
                Designation: <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name={`referrer${num}.designation`}
                className={styles.formInput}
                placeholder="Enter Designation"
                required
                onChange={handleChange}
                value={formData[`referrer${num}`].designation}
              />

              <label className={styles.formLabel}>
                Address: <span className={styles.required}>*</span>
              </label>
              <textarea
                name={`referrer${num}.address`}
                className={styles.formTextarea}
                placeholder="Enter Address"
                required
                onChange={handleChange}
                value={formData[`referrer${num}`].address}
              ></textarea>

              <label className={styles.formLabel}>
                Email: <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                name={`referrer${num}.email`}
                className={styles.formInput}
                placeholder="Enter Email"
                required
                onChange={handleChange}
                value={formData[`referrer${num}`].email}
              />
            </div>
          ))}

          {/* Legal Proceeding */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Do you have any legal proceeding ongoing?{" "}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["Yes", "No"].map((option) => (
                <label className={styles.formRadio} key={option}>
                  <input
                    type="radio"
                    name="legalProceeding"
                    value={option}
                    required
                    onChange={handleChange}
                    checked={formData.legalProceeding === option}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Court Case */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Have you at any time been charged, acquitted, or convicted by a
              court of law in India or outside India?{" "}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["Yes", "No"].map((option) => (
                <label className={styles.formRadio} key={option}>
                  <input
                    type="radio"
                    name="courtCase"
                    value={option}
                    required
                    onChange={handleChange}
                    checked={formData.courtCase === option}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Declaration */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              I hereby declare that I have carefully read and understood the
              instructions attached to the advertisement as available on Patna
              website and that all the entries in this form are true to the best
              of my knowledge and belief...{" "}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["Yes", "No"].map((option) => (
                <label className={styles.formRadio} key={option}>
                  <input
                    type="radio"
                    name="declaration"
                    value={option}
                    required
                    onChange={handleChange}
                    checked={formData.declaration === option}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application6;