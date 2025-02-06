import React, { useState, useEffect } from "react";
import "./home.css";
import { departments, positions } from "../option/jobposting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [jobPostings, setJobPostings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const res = await fetch(`${backendurl}/getjobposting`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch job postings.");
      }

      const data = await res.json();
      setJobPostings(data.jobposting);
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching job postings.");
    }
  };

  const handleSubmit = async () => {
    const data = { department: selectedDepartment, position: selectedPosition };
    setOpen(false);

    try {
      let res = await fetch(`${backendurl}/jobposting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application.");
      }

      toast.success("Application submitted successfully! ✅");
      fetchJobPostings(); // Refresh the job postings list
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <button className="open-button" onClick={() => setOpen(true)}>
        Create New Application
      </button>

      {open && (
        <div className="overlay">
          <div className="modal">
            <h2 className="modal-title">{editMode ? "Edit Job Posting" : "New Job Posting"}</h2>
            <button className="close-button" onClick={() => setOpen(false)}>X</button>
            <div className="form-group">
              <label>Department</label>
              <select onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Position</label>
              <select onChange={(e) => setSelectedPosition(e.target.value)}>
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
            <button className="submit-button" onClick={handleSubmit}>
              {editMode ? "Update Application" : "Submit Application"}
            </button>
          </div>
        </div>
      )}

      <div className="job-list">
        <h2>Your Job Applications</h2>
        {jobPostings.length > 0 ? (
          <div className="job-grid">
            {jobPostings.map((job, index) => (
              <div className="job-card" key={index}>
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Position:</strong> {job.position}</p>
                <button className="edit-button" onClick={() => {
                  setEditMode(true);
                  setSelectedDepartment(job.department);
                  setSelectedPosition(job.position);
                  setEditJobId(job.id);
                  setOpen(true);
                }}>Edit</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No job applications found.</p>
        )}
      </div>
    </div>
  );
}
