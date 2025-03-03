import React, { useState } from "react";
import {
  Education_Details,
  Education_levels,
  Employment_Details,
} from "../../option/education&employment.js";
import styles from "./application2.module.css";

function Application2() {
  // SVG Icons as React components
  const EditIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const DeleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  return (
    <div className={styles.EducationEmploymentdataContainer}>
      <div className={styles.EducationdataContainer}>
        {Education_Details.map((item, index) => {
          return (
            <>
              <div key={index} className={styles.Educationdata}>
                <div className={styles.EducationdataTitle}>{item}</div>
              </div>
              {item == "DELETE/EDIT" && (
                <div className="icons">
                  <EditIcon />
                </div>
              )}

            
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Application2;
