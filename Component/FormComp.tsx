import { useState } from "react";
import axios from "axios";
import styled from  'styled-components'

const FormComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Check if the selected file is an image (PNG or JPG)
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate preview URL
      } else {
        alert("Please upload a PNG or JPG image.");
      }
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://your-api-endpoint.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed.");
    }
  };

  return (
    <FormCont>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>Upload File:</label>
      <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} required />

      {/* Image Preview with Remove Button */}
      {previewUrl && (
        <div className="preview-container">
          <img src={previewUrl} alt="Preview" className="image-preview" />
          <button type="button" className="remove-btn" onClick={handleRemoveImage}>
            X
          </button>
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
    </FormCont>
  );
};

export default FormComponent;

const FormCont = styled.div`
  form {
  max-width: fit-content;
  margin: 30px auto;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border 0.3s ease-in-out;
  background-color: #ffffff;
}
input[type="text"]:focus,
input[type="file"]:focus {
  border-color: #007bff;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
button:hover {
  background-color: #0056b3;
}
/* Preview Container */
.preview-container {
  position: relative;
  display: inline-block;
  margin: 10px auto;
}

/* Image Preview */
.image-preview {
  width: fit-content;
  height: fit-content;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  border: 2px solid #ddd;
}

/* Remove (❌) Button */
.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: white;
  color: black;
  border: solid black 1px;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background-color: #d30000;
  color: white;
}

@media (max-width: 480px) {
  form {
    max-width: 90%;
  }
}
`
