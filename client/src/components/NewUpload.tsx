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
    <div>
      <h1>New Upload</h1>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .gif, .svg, .bmp, .tiff"
        onChange={handleFileChange}
      ></input>
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default NewUpload;
