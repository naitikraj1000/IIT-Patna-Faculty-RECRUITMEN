import React, { useEffect, useState } from "react";
import styles from "./application2.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Education_Details,
  Education_levels,
  Employment_Details,
} from "../../option/education&employment";

function Application2() {
  // Education entry format
  const education_entry_format = {
    "SCHOOL/COLLEGE/INSTITUTE": "",
    "DATE OF ENTRY": "",
    "DATE OF LEAVING": "",
    "BOARD/UNIVERSITY/INSTITUTION": "",
    "EXAM/DEGREE/DIPLOMA PASSED": "",
    "DISTINCTION/CLASS/DIVISION": "",
    SUBJECTS: "",
    "PERCENTAGE OF MARKS/CPI": "",
    "YEAR OF PASSING": "",
  };

  // Employment entry format
  const employment_entry_format = {
    "LAST PAY & SCALE OF PAY": "",
    "POSITION HELD": "",
    "DATE OF LEAVING": "",
    "DATE OF JOINING": "",
    "NATURE OF DUTIES/WORK": "",
    "ORGANISATION/INSTITUTION": "",
    "ADDITIONAL REMARKS (ABOUT THE EXPERIENCE, IF ANY)": "",
  };

  // State for education and employment entries
  const [educationentry, setEducationentry] = useState([]);
  const [employmententry, setEmploymententry] = useState([]);

  // State for popups
  const [showEducationPopup, setShowEducationPopup] = useState(false);
  const [showEmploymentPopup, setShowEmploymentPopup] = useState(false);

  // State for editing indices
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
  const [editingEmploymentIndex, setEditingEmploymentIndex] = useState(null);

  // State for new entries
  const [newEducationEntry, setNewEducationEntry] = useState(
    education_entry_format
  );
  const [newEmploymentEntry, setNewEmploymentEntry] = useState(
    employment_entry_format
  );

  // Add default education entries on component mount
  useEffect(() => {
    addDefaultEducationEntry();
  }, []);

  // Add default education entries
  function addDefaultEducationEntry() {
    setEducationentry((prev) => [
      ...prev,
      ...Education_levels.map((item) => ({
        ...education_entry_format,
        "EXAM/DEGREE/DIPLOMA PASSED": item,
        default: true,
      })),
    ]);
  }

  // Open popup to add/edit education entry
  function openEducationPopup(index = null) {
    setEditingEducationIndex(index);
    setNewEducationEntry(
      index !== null ? educationentry[index] : education_entry_format
    );
    setShowEducationPopup(true);
  }

  // Open popup to add/edit employment entry
  function openEmploymentPopup(index = null) {
    setEditingEmploymentIndex(index);
    setNewEmploymentEntry(
      index !== null ? employmententry[index] : employment_entry_format
    );
    setShowEmploymentPopup(true);
  }

  // Handle education form submission
  function handleEducationSubmit() {
    if (editingEducationIndex !== null) {
      // Update existing entry
      setEducationentry((prev) =>
        prev.map((entry, i) =>
          i === editingEducationIndex ? newEducationEntry : entry
        )
      );
    } else {
      // Add new entry
      setEducationentry((prev) => [...prev, { ...newEducationEntry }]);
    }
    setShowEducationPopup(false);
    setNewEducationEntry(education_entry_format);
  }

  // Handle employment form submission
  function handleEmploymentSubmit() {
    if (editingEmploymentIndex !== null) {
      // Update existing entry
      setEmploymententry((prev) =>
        prev.map((entry, i) =>
          i === editingEmploymentIndex ? newEmploymentEntry : entry
        )
      );
    } else {
      // Add new entry
      setEmploymententry((prev) => [...prev, { ...newEmploymentEntry }]);
    }
    setShowEmploymentPopup(false);
    setNewEmploymentEntry(employment_entry_format);
  }

  // Delete education entry
  function deleteEducationEntry(index) {
    setEducationentry((prev) => prev.filter((_, i) => i !== index));
  }

  // Delete employment entry
  function deleteEmploymentEntry(index) {
    setEmploymententry((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.container}>
      {/* Education Details Section */}
      <div className={styles.educationcontainer}>
        <h2>
          Education Details <span className={styles.required}>*</span>
        </h2>

        <table
          border="1"
          cellSpacing="0"
          cellPadding="5"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "100px" }}>EDIT/DELETE</th>{" "}
              {Object.keys(education_entry_format).map((key, index) => (
                <th key={index} style={{ width: "150px" }}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {educationentry.map((entry, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  <FaEdit
                    onClick={() => openEducationPopup(index)}
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      color: "#3498db",
                    }}
                  />
                  {!entry.default && ( // Only show Delete icon for non-default entries
                    <FaTrash
                      onClick={() => deleteEducationEntry(index)}
                      style={{ cursor: "pointer", color: "#e74c3c" }}
                    />
                  )}
                </td>
                {Object.keys(education_entry_format).map((key, idx) => (
                  <td key={idx} style={{ width: "150px" }}>
                    {entry[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className={styles.addButton}
          onClick={() => openEducationPopup()}
        >
          Add Entry
        </button>
      </div>

      {/* Employment Details Section */}
      <div className={styles.employmentcontainer}>
        <h2>Employment Details <span className={styles.required}>*</span> </h2>
        <table
          border="1"
          cellSpacing="0"
          cellPadding="5"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "100px" }}>Actions</th>{" "}
              {/* Combined Edit/Delete Column */}
              {Object.keys(employment_entry_format).map((key, index) => (
                <th key={index} style={{ width: "150px" }}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employmententry.map((entry, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  <FaEdit
                    onClick={() => openEmploymentPopup(index)}
                    style={{
                      marginRight: "10px",
                      cursor: "pointer",
                      color: "#3498db",
                    }}
                  />
                  <FaTrash
                    onClick={() => deleteEmploymentEntry(index)}
                    style={{ cursor: "pointer", color: "#e74c3c" }}
                  />
                </td>
                {Object.keys(employment_entry_format).map((key, idx) => (
                  <td key={idx} style={{ width: "150px" }}>
                    {entry[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className={styles.addButton}
          onClick={() => openEmploymentPopup()}
        >
          Add Entry
        </button>
      </div>

      {/* Education Popup */}
      {showEducationPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>
              {editingEducationIndex !== null ? "Edit" : "Add"} Education Entry
            </h3>
            {Object.keys(education_entry_format).map(
              (key, index) =>
                key !== "default" && (
                  <div key={index}>
                    <label>{key}</label>
                    {key.includes("DATE") ? (
                      <input
                        type="date"
                        value={newEducationEntry[key]}
                        onChange={(e) =>
                          setNewEducationEntry((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        value={newEducationEntry[key]}
                        onChange={(e) =>
                          setNewEducationEntry((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                )
            )}
            <button onClick={handleEducationSubmit}>Submit</button>
            <button onClick={() => setShowEducationPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Employment Popup */}
      {showEmploymentPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>
              {editingEmploymentIndex !== null ? "Edit" : "Add"} Employment
              Entry
            </h3>
            {Object.keys(employment_entry_format).map((key, index) => (
              <div key={index}>
                <label>{key}</label>
                {key.includes("DATE") ? (
                  <input
                    type="date"
                    value={newEmploymentEntry[key]}
                    onChange={(e) =>
                      setNewEmploymentEntry((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <input
                    type="text"
                    value={newEmploymentEntry[key]}
                    onChange={(e) =>
                      setNewEmploymentEntry((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                )}
              </div>
            ))}
            <button onClick={handleEmploymentSubmit}>Submit</button>
            <button onClick={() => setShowEmploymentPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Application2;
