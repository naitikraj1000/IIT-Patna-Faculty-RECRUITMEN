// import React, { useEffect } from "react";
// import styles from "./application1.module.css";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// function Application1() {
//   const [progresspercentage, setProgressPercentage] = useState(13);

//   useEffect(() => {

//   }, [useSelector((state) => state.information.saveProgress)]);

//   return (
//     <div className={styles.biodataContainer}>
//       <div className={styles.formWrapper}>
//         <div className={styles.biodataForm}>
//           {/* Full Name */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Full Name (in capital letters as per matriculation/passport
//               record) : <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               className={styles.formInput}
//               placeholder="Enter Full Name"
//               required={true}
//             />
//           </div>

//           {/* Date of Birth */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Date of Birth (Please upload true copy of certificate at
//               Additional Info section of this form){" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <input type="date" className={styles.formInput} required={true} />
//           </div>

//           {/* Proof of Date of Birth */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Proof of Date of Birth (10th Certificate){" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="file"
//               className={styles.formFile}
//               placeholder="Upload Document"
//               required={true}
//             />
//           </div>

//           {/* Gender */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Gender <span className={styles.required}>*</span>
//             </label>
//             <div className={styles.formRadioGroup}>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Gender"
//                   value="Male"
//                   required={true}
//                 />
//                 Male
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Gender"
//                   value="Female"
//                   required={true}
//                 />
//                 Female
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Gender"
//                   value="Other"
//                   required={true}
//                 />
//                 Other
//               </label>
//             </div>
//           </div>

//           {/* Marital Status */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Marital Status <span className={styles.required}>*</span>
//             </label>
//             <div className={styles.formRadioGroup}>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="MaritalStatus"
//                   value="Single"
//                   required={true}
//                 />
//                 Single
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="MaritalStatus"
//                   value="Married"
//                   required={true}
//                 />
//                 Married
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="MaritalStatus"
//                   value="Divorced"
//                   required={true}
//                 />
//                 Divorced
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="MaritalStatus"
//                   value="Widowed"
//                   required={true}
//                 />
//                 Widowed
//               </label>
//             </div>
//           </div>

//           {/* Permanent Address */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Permanent Address <span className={styles.required}>*</span>
//             </label>
//             <textarea
//               className={styles.formTextarea}
//               placeholder="Enter Permanent Address"
//               required={true}
//             ></textarea>
//           </div>

//           {/* Address for Correspondence */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Address for Correspondence{" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <textarea
//               className={styles.formTextarea}
//               placeholder="Enter Correspondence Address"
//               required={true}
//             ></textarea>
//           </div>

//           {/* Pin Code */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Pin Code (for Correspondence Address){" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="number"
//               className={styles.formInput}
//               placeholder="Enter Pin Code"
//               required={true}
//               maxLength={6}
//             />
//           </div>

//           {/* Email ID */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Email ID <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="email"
//               className={styles.formInput}
//               placeholder="Enter Email ID"
//               required={true}
//             />
//           </div>

//           {/* Father's/Husband's Name */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Father's/Husband's Name <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               className={styles.formInput}
//               placeholder="Enter Father's/Husband's Name"
//               required={true}
//             />
//           </div>

//           {/* Mobile No. */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Mobile No. (including country code){" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="number"
//               className={styles.formInput}
//               placeholder="Enter Mobile No."
//               required={true}
//               maxLength={10}
//             />
//           </div>

//           {/* Advt. No. */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Advt. No. <span className={styles.required}>*</span>
//             </label>
//             <div className={styles.formRadioGroup}>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="AdvtNo"
//                   value="Advt. No. 01/2021"
//                   required={true}
//                 />
//                 Advt. No. 01/2021
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="AdvtNo"
//                   value="Advt. No. 02/2021"
//                   required={true}
//                 />
//                 Advt. No. 02/2021
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="AdvtNo"
//                   value="Advt. No. 03/2021"
//                   required={true}
//                 />
//                 Advt. No. 03/2021
//               </label>
//             </div>
//           </div>

//           {/* Field of Specialization */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Field of Specialization <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               className={styles.formInput}
//               placeholder="Enter Field of Specialization"
//               required={true}
//             />
//           </div>

//           {/* Citizenship */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Are you a citizen of India by birth or by domicile?{" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <div className={styles.formRadioGroup}>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Citizenship"
//                   value="By Birth"
//                   required={true}
//                 />
//                 By Birth
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Citizenship"
//                   value="By Domicile"
//                   required={true}
//                 />
//                 By Domicile
//               </label>
//             </div>
//           </div>

//           {/* Category */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Category (Please upload true copy of certificate at Additional
//               Info section of this form in case of SC/ST/OBC){" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <div className={styles.formRadioGroup}>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Category"
//                   value="General"
//                   required={true}
//                 />
//                 General
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Category"
//                   value="EWS"
//                   required={true}
//                 />
//                 EWS
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Category"
//                   value="OBC"
//                   required={true}
//                 />
//                 OBC
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Category"
//                   value="SC"
//                   required={true}
//                 />
//                 SC
//               </label>
//               <label className={styles.formRadio}>
//                 <input
//                   type="radio"
//                   name="Category"
//                   value="ST"
//                   required={true}
//                 />
//                 ST
//               </label>
//             </div>
//           </div>

//           {/* PWD Category */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Do you belong to the PWD category? (Please upload true copy of
//               certificate at Additional Info section of this form){" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <div className={styles.formRadioGroup}>
//               <label className={styles.formRadio}>
//                 <input type="radio" name="PWD" value="Yes" required={true} />
//                 Yes
//               </label>
//               <label className={styles.formRadio}>
//                 <input type="radio" name="PWD" value="No" required={true} />
//                 No
//               </label>
//             </div>
//           </div>

//           {/* Present Basic Pay */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               If you are employed, please state your present basic pay and scale
//               of pay
//             </label>
//             <input
//               type="text"
//               className={styles.formInput}
//               placeholder="Enter Basic Pay and Scale of Pay"
//             />
//           </div>

//           {/* Passport Photo */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Passport Photo <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="file"
//               className={styles.formFile}
//               placeholder="Upload Document"
//               required={true}
//             />
//           </div>

//           {/* Joining Time */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               If the appointment is offered, how much time would you need before
//               joining the post? <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               className={styles.formInput}
//               placeholder="Enter Time"
//               required={true}
//             />
//           </div>

//           {/* Mother's Name */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Mother's Name <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               className={styles.formInput}
//               placeholder="Enter Mother's Name"
//               required={true}
//             />
//           </div>

//           {/* Age */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Age as on closing date of advertisement{" "}
//               <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               className={styles.formInput}
//               placeholder="Enter Age"
//               required={true}
//             />
//           </div>

//           {/* Signature */}
//           <div className={styles.formGroup}>
//             <label className={styles.formLabel}>
//               Signature of Applicant <span className={styles.required}>*</span>
//             </label>
//             <input
//               type="file"
//               className={styles.formFile}
//               placeholder="Upload Document"
//               required={true}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Application1;

import React, { useEffect, useState } from "react";
import styles from "./application1.module.css";
import { useSelector } from "react-redux";

function Application1() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    proofOfDateOfBirth: "",
    gender: "",
    maritalStatus: "",
    permanentAddress: "",
    addressForCorrespondence: "",
    pinCode: "",
    emailId: "",
    fathersOrHusbandsName: "",
    mobileNo: "",
    advtNo: "",
    fieldOfSpecialization: "",
    citizenshipType: "",
    category: "",
    pwdCategory: "",
    presentBasicPay: "",
    passportPhoto: "",
    timeNeededBeforeJoining: "",
    mothersName: "",
    ageAsOnClosingDate: "",
    signatureOfApplicant: "",
  });

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  async function uploaddocuments(file) {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendurl);

    try {
      let formData = new FormData();
      formData.append("file", file); // "file" should match multer field name

      let res = await fetch(`${backendurl}/uploaddocument`, {
        method: "POST",
        body: formData, // Corrected: Use FormData
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      let data = await res.json();
      console.log("Document uploaded successfully:", data.url);
      return data.url;
    } catch (error) {
      console.error("Error uploading document:", error.message);
      return null;
    }
  }

  async function handleSaveProgress() {
    // Handle file to server and get the url
    for (let key in formData) {
      if (formData[key] instanceof File) {
        // upload this to server and get the url
        let url = await uploaddocuments(formData[key]);
        if (url) {
          formData[key] = url;
        }
      }
    }

    // Now save this to database

    console.log("Data to save:", formData);
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    try {
      let res = await fetch(`${backendurl}/saveapplicationform`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      let data = await res.json();
      console.log("Application form saved successfully:", data.message);
    } catch (error) {
      console.error("Error saving application form:", error.message);
    }
  }

  useEffect(() => {
    // Now save this to database
    handleSaveProgress();
  }, [useSelector((state) => state.information.saveProgress)]);

  return (
    <div className={styles.biodataContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.biodataForm}>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Full Name (in capital letters as per matriculation/passport
              record) : <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              className={styles.formInput}
              placeholder="Enter Full Name"
              required={true}
              onChange={handleChange}
              value={formData.fullName}
            />
          </div>

          {/* Date of Birth */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Date of Birth (Please upload true copy of certificate at
              Additional Info section of this form){" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className={styles.formInput}
              required={true}
              onChange={handleChange}
              value={formData.dateOfBirth}
            />
          </div>

          {/* Proof of Date of Birth */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Proof of Date of Birth (10th Certificate){" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="file"
              name="proofOfDateOfBirth"
              className={styles.formFile}
              placeholder="Upload Document"
              required={true}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Gender <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["Male", "Female", "Other"].map((gender) => (
                <label className={styles.formRadio} key={gender}>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    required={true}
                    onChange={handleChange}
                    checked={formData.gender === gender}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* Marital Status */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Marital Status <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["Single", "Married", "Divorced", "Widowed"].map((status) => (
                <label className={styles.formRadio} key={status}>
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={status}
                    required={true}
                    onChange={handleChange}
                    checked={formData.maritalStatus === status}
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          {/* Permanent Address */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Permanent Address <span className={styles.required}>*</span>
            </label>
            <textarea
              name="permanentAddress"
              className={styles.formTextarea}
              placeholder="Enter Permanent Address"
              required={true}
              onChange={handleChange}
              value={formData.permanentAddress}
            ></textarea>
          </div>

          {/* Address for Correspondence */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Address for Correspondence{" "}
              <span className={styles.required}>*</span>
            </label>
            <textarea
              name="addressForCorrespondence"
              className={styles.formTextarea}
              placeholder="Enter Correspondence Address"
              required={true}
              onChange={handleChange}
              value={formData.addressForCorrespondence}
            ></textarea>
          </div>

          {/* Pin Code */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Pin Code (for Correspondence Address){" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="pinCode"
              className={styles.formInput}
              placeholder="Enter Pin Code"
              required={true}
              maxLength={6}
              onChange={handleChange}
              value={formData.pinCode}
            />
          </div>

          {/* Email ID */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Email ID <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="emailId"
              className={styles.formInput}
              placeholder="Enter Email ID"
              required={true}
              onChange={handleChange}
              value={formData.emailId}
            />
          </div>

          {/* Father's/Husband's Name */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Father's/Husband's Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="fathersOrHusbandsName"
              className={styles.formInput}
              placeholder="Enter Father's/Husband's Name"
              required={true}
              onChange={handleChange}
              value={formData.fathersOrHusbandsName}
            />
          </div>

          {/* Mobile No. */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Mobile No. (including country code){" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="mobileNo"
              className={styles.formInput}
              placeholder="Enter Mobile No."
              required={true}
              maxLength={10}
              onChange={handleChange}
              value={formData.mobileNo}
            />
          </div>

          {/* Advt. No. */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Advt. No. <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {[
                "Advt. No. 01/2021",
                "Advt. No. 02/2021",
                "Advt. No. 03/2021",
              ].map((advt) => (
                <label className={styles.formRadio} key={advt}>
                  <input
                    type="radio"
                    name="advtNo"
                    value={advt}
                    required={true}
                    onChange={handleChange}
                    checked={formData.advtNo === advt}
                  />
                  {advt}
                </label>
              ))}
            </div>
          </div>

          {/* Field of Specialization */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Field of Specialization <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="fieldOfSpecialization"
              className={styles.formInput}
              placeholder="Enter Field of Specialization"
              required={true}
              onChange={handleChange}
              value={formData.fieldOfSpecialization}
            />
          </div>

          {/* Citizenship */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Are you a citizen of India by birth or by domicile?{" "}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["By Birth", "By Domicile"].map((citizenship) => (
                <label className={styles.formRadio} key={citizenship}>
                  <input
                    type="radio"
                    name="citizenshipType"
                    value={citizenship}
                    required={true}
                    onChange={handleChange}
                    checked={formData.citizenshipType === citizenship}
                  />
                  {citizenship}
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Category (Please upload true copy of certificate at Additional
              Info section of this form in case of SC/ST/OBC){" "}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["General", "EWS", "OBC", "SC", "ST"].map((category) => (
                <label className={styles.formRadio} key={category}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    required={true}
                    onChange={handleChange}
                    checked={formData.category === category}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* PWD Category */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Do you belong to the PWD category? (Please upload true copy of
              certificate at Additional Info section of this form){" "}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.formRadioGroup}>
              {["Yes", "No"].map((pwd) => (
                <label className={styles.formRadio} key={pwd}>
                  <input
                    type="radio"
                    name="pwdCategory"
                    value={pwd}
                    required={true}
                    onChange={handleChange}
                    checked={formData.pwdCategory === pwd}
                  />
                  {pwd}
                </label>
              ))}
            </div>
          </div>

          {/* Present Basic Pay */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              If you are employed, please state your present basic pay and scale
              of pay
            </label>
            <input
              type="text"
              name="presentBasicPay"
              className={styles.formInput}
              placeholder="Enter Basic Pay and Scale of Pay"
              onChange={handleChange}
              value={formData.presentBasicPay}
            />
          </div>

          {/* Passport Photo */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Passport Photo <span className={styles.required}>*</span>
            </label>
            <input
              type="file"
              name="passportPhoto"
              className={styles.formFile}
              placeholder="Upload Document"
              required={true}
              onChange={handleChange}
            />
          </div>

          {/* Joining Time */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              If the appointment is offered, how much time would you need before
              joining the post? <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="timeNeededBeforeJoining"
              className={styles.formInput}
              placeholder="Enter Time"
              required={true}
              onChange={handleChange}
              value={formData.timeNeededBeforeJoining}
            />
          </div>

          {/* Mother's Name */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Mother's Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="mothersName"
              className={styles.formInput}
              placeholder="Enter Mother's Name"
              required={true}
              onChange={handleChange}
              value={formData.mothersName}
            />
          </div>

          {/* Age */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Age as on closing date of advertisement{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="ageAsOnClosingDate"
              className={styles.formInput}
              placeholder="Enter Age"
              required={true}
              onChange={handleChange}
              value={formData.ageAsOnClosingDate}
            />
          </div>

          {/* Signature */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Signature of Applicant <span className={styles.required}>*</span>
            </label>
            <input
              type="file"
              name="signatureOfApplicant"
              className={styles.formFile}
              placeholder="Upload Document"
              required={true}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application1;
