import React from 'react';

export default function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <div style={styles.textContainer}>
        <p style={styles.title}>Authentication</p>
        <p style={styles.subtitle}>Loading, please wait...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
    textAlign: "center",
  },
  spinner: {
    width: "70px",
    height: "70px",
    border: "7px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
    animation: "fadeIn 0.8s ease-in-out forwards",
  },
  subtitle: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#666",
    opacity: "0",
    animation: "fadeIn 0.8s ease-in-out 0.5s forwards",
  },
};

// Inject Keyframes for animations
const addGlobalStyles = () => {
  const styleSheet = document.styleSheets[0];
  
  // Avoid duplicating keyframes
  if (!styleSheet.cssRules.length) {
    styleSheet.insertRule(`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);

    styleSheet.insertRule(`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `, styleSheet.cssRules.length);
  }
};

// Ensure keyframes are added once
addGlobalStyles();