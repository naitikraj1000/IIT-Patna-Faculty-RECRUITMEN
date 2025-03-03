import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./application.module.css";

function Application() {
  const navigate = useNavigate();
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [pagetitle, setPagetitle] = useState("BIODATA");

  function capitalizeWords(str) {
    return str.toUpperCase();
  }

  return (
    <div className={styles.appContainer}>
      {/* Left Sidebar */}
      <button
        className={styles.menuToggle}
        onClick={() => setMenuExpanded(!menuExpanded)}
      >
        {menuExpanded ? "✕" : "☰"}
      </button>

      <div
        className={`${styles.sidebar} ${
          menuExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="IITP Logo" className={styles.logo} />
          <h3 className={styles.portalTitle}>
            IIT Patna Faculty Recruitment Portal
          </h3>
        </div>

        <nav className={styles.navMenu}>
          <button
            className={styles.navItem}
            onClick={() => {
              setPagetitle(capitalizeWords("Biodata"));
              navigate("form1");
            }}
          >
            Biodata
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "20%" }}
              ></div>
            </div>
          </button>
          <button
            className={styles.navItem}
            onClick={() => {
              setPagetitle(capitalizeWords("Education & Employment"));
              navigate("form2");
            }}
          >
            Education & Employment
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "40%" }}
              ></div>
            </div>
          </button>

          <button
            className={styles.navItem}
            onClick={() => {
              setPagetitle(capitalizeWords("Projects / Publications"));
              navigate("form3");
            }}
          >
            Projects / Publications
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "0%" }}
              ></div>
            </div>
          </button>
          <button
            className={styles.navItem}
            onClick={() => {
              setPagetitle(capitalizeWords("Teaching Experience"));
              navigate("form4");
            }}
          >
            Teaching Experience
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "0%" }}
              ></div>
            </div>
          </button>
          <button
            className={styles.navItem}
            onClick={() => {
              setPagetitle(capitalizeWords("Awards and Recognitions"));
              navigate("form5");
            }}
          >
            Awards and Recognitions
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "0%" }}
              ></div>
            </div>
          </button>
          <button
            className={styles.navItem}
            onClick={() => {
              setPagetitle(capitalizeWords("Additional Info"));
              navigate("form6");
            }}
          >
            Additional Info
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "0%" }}
              ></div>
            </div>
          </button>
        </nav>

        <div className={styles.sidebarActions}>
          <button className={`${styles.btn} ${styles.exitBtn}`}>
            Exit Form
          </button>
          <button className={`${styles.btn} ${styles.submitBtn}`}>
            Submit Form
          </button>
          <button className={`${styles.btn} ${styles.previewBtn}`}>
            Preview
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{pagetitle}</h1>
        <div className={styles.contentContainer}>
          <Outlet />
          <div className={styles.formButtons}>
            <button type="button" className={styles.saveBtn}>
              Save Progress
            </button>
            <button type="submit" className={styles.nextBtn}>
              Complete and Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;
