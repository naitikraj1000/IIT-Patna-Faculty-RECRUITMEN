import React from "react";

const InputFile = ({ formFile, name, handleChange, data }) => {
  return (
    <>
      <label className={formFile} htmlFor={name}>
        Upload
        {typeof data === "string" && data.trim() ? (
          <p>{data}</p>
        ) : data instanceof File ? (
          <p>{data.name}</p>
        ) : null}
      </label>
      <input name={name} type="file" id={name} required={true} onChange={handleChange} />
    </>
  );
};

export default InputFile;
