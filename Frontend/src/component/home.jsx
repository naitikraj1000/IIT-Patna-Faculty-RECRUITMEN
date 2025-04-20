import React, { useState, useEffect } from "react";
import { departments, positions } from "../option/jobposting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./home.module.css";
import { useNavigate } from "react-router";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [jobPostings, setJobPostings] = useState([]);
  const navigate = useNavigate();

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchJobPostings();
  }, []);
     
  const handleLogout = async () => {
      try {
        const res = await fetch(`${backendurl}/signout`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to log out.");

        toast.success("Logged out successfully! ✅");
        navigate("/signin");
      } catch (error) {
        console.error(error.message);
        toast.error("Error logging out.");
      }
  }
  const fetchJobPostings = async () => {
    try {
      const res = await fetch(`${backendurl}/getjobposting`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch job postings.");

      const data = await res.json();
      setJobPostings(data.jobposting);
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching job postings.");
    }
  };

  const handleJobAdd = async () => {
    const data = { department: selectedDepartment, position: selectedPosition };
    setOpen(false);

    try {
      const res = await fetch(`${backendurl}/jobposting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit application.");

      toast.success("Application submitted successfully! ✅");
      fetchJobPostings();
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleJobDelete = async (jobid) => {
    try {
      const res = await fetch(`${backendurl}/deletejobposting`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ job_id: jobid }),
      });

      if (!res.ok) throw new Error("Failed to delete job posting.");
      toast.success("Job posting deleted successfully! ✅");
      fetchJobPostings();
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className={styles.jobList}>
        {jobPostings.length > 0 ? (
          jobPostings.map((job, index) => (
            <div key={index} className={styles.jobCard}>
              <div>
                <h3 className={styles.jobTitle}>Form for {job.position}</h3>
                <p className={styles.jobDepartment}>Department of {job.department}</p>
              </div>

              <div className={styles.jobActions}>
                <button className={styles.openButton} onClick={ ()=>{
                  navigate(`/application/${job.id}/form1`);
                }}>Open</button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleJobDelete(job.id)}
                >
                  Delete Form
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noJobs}>No job applications found.</p>
        )}
      </div>

      <button
        className={styles.createButton}
        onClick={() => {
          setSelectedDepartment("");
          setSelectedPosition("");
          setOpen(true);
        }}
      >
        Create New Application
      </button>

      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>New Job Posting</h2>
            <button className={styles.closeButton} onClick={() => setOpen(false)}>
              X
            </button>

            <div className={styles.formGroup}>
              <label>Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Position</label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            <button className={styles.submitButton} onClick={handleJobAdd}>
              Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
