import React, { useState } from 'react';

function NewUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('uploaded');
  };

  return (
    <div className="outer-container">
      <h1>New Upload</h1>
      <div className="inner-container">
        <h2>Select photo</h2>
        <div className="content">
          <div className="content-new-upload">
            <input
              className="file-input"
              type="file"
              accept=".png, .jpg, .jpeg, .gif, .svg, .bmp, .tiff"
              capture="filesystem"
              onChange={handleFileChange}
            />
            <button onClick={handleFileUpload}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUpload;
