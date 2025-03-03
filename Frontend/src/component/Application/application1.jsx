import React from "react";
import bio_data from "../../option/biodata.js";
import styles from "./application1.module.css";

function Application1() {
  return (
    <div className={styles.biodataContainer}>
      <div className={styles.formWrapper}>
        <form className={styles.biodataForm}>
          {bio_data.map((field, index) => (
            <div key={index} className={styles.formGroup}>
              <label className={styles.formLabel}>
                {field.title}{" "}
                {field.required && <span className={styles.required}>*</span>}
              </label>

              {/* Input Field Types */}
              {["text", "email", "date", "number"].includes(field.type) ? (
                <input
                  type={field.type}
                  className={styles.formInput}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  className={styles.formTextarea}
                  placeholder={field.placeholder}
                  required={field.required}
                ></textarea>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  className={styles.formFile}
                  required={field.required}
                />
              ) : field.type === "radio" ? (
                <div className={styles.formRadioGroup}>
                  {field.options.map((option, idx) => (
                    <label key={idx} className={styles.formRadio}>
                      <input
                        type="radio"
                        name={field.title}
                        value={option}
                        required={field.required}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </form>
      </div>

    </div>
  );
}

export default Application1;
