import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./application.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveprogress } from "../../redux/infromationslice";
import getallapplicationform from "./Application/applicationpdf.jsx";
// import { Application1progresspercent,Application2progresspercent,Application3progresspercent,Application4progresspercent,Application5progresspercent,Application6progresspercent } from "../../redux/infromationslice";

function Application() {
  const navigate = useNavigate();
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [pagetitle, setPagetitle] = useState("BIODATA");
  const dispatch = useDispatch();
  const Application1progresspercent = useSelector(
    (state) => state.information.Application1progresspercent
  );
  const Application2progresspercent = useSelector(
    (state) => state.information.Application2progresspercent
  );
  const Application3progresspercent = useSelector(
    (state) => state.information.Application3progresspercent
  );
  const Application4progresspercent = useSelector(
    (state) => state.information.Application4progresspercent
  );
  const Application5progresspercent = useSelector(
    (state) => state.information.Application5progresspercent
  );
  const Application6progresspercent = useSelector(
    (state) => state.information.Application6progresspercent
  );

  function capitalizeWords(str) {
    return str.toUpperCase();
  }
  async function handlepdf() {
    const parts = location.pathname.split("/");
    const jobpostingid = parts[parts.length - 2];

    console.log("Job Posting ID:", jobpostingid);
    try {
      let applicationform = await getallapplicationform(jobpostingid);
      // console.log("Application form retrieved successfully", applicationform);
      // Process the application form data as needed
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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
                style={{ width: `${Application1progresspercent}%` }}
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
                style={{ width: `${Application2progresspercent}%` }}
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
                style={{ width: `${Application3progresspercent}%` }}
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
                style={{ width: `${Application4progresspercent}%` }}
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
                style={{ width: `${Application5progresspercent}%` }}
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
                style={{ width: `${Application6progresspercent}%` }}
              ></div>
            </div>
          </button>
        </nav>

        <div className={styles.sidebarActions}>
          <button
            className={`${styles.btn} ${styles.exitBtn}`}
            onClick={() => {
              navigate("/");
            }}
          >
            Exit Form
          </button>
          <button className={`${styles.btn} ${styles.submitBtn}`}>
            Submit Form
          </button>
          <button
            className={`${styles.btn} ${styles.previewBtn}`}
            onClick={handlepdf}
          >
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
            <button
              type="button"
              className={styles.saveBtn}
              onClick={() => {
                dispatch(saveprogress());
              }}
            >
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
