// Function to upload a file to Cloudinary and return the generated URL
export const uploadToCloudinary = async (file) => {
  try {
    // Create a new FormData instance
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jujslbiy");

    // Perform the file upload using the Cloudinary Upload API
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dztlowlu0/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    // Parse the response and retrieve the secure URL
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    // Handle any errors that occur during the upload
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

const [CvData, SetCvData] = useState({
  cv: {},
});

const handleCVChange = (e) => {
  const file = e.target.files[0];

  // Allowed file extensions: pdf and doc
  const allowedExtensions = ["pdf", "doc", "docx"];

  // Extract the file extension from the name
  const fileExtension = file.name.split(".").pop().toLowerCase();

  // Check if the file extension is allowed
  if (!allowedExtensions.includes(fileExtension)) {
    // Handle invalid file format here, e.g., display an error message
    e.target.value = "";
    toast.error("Invalid file format. Only PDF or DOC files are accepted.");
    // setFormData(prevData => ({ ...prevData, cv: "" }));
    SetCvData((prevData) => ({ ...prevData, cv: "" }));
    return;
  }

  setSelectedCV(file);
  // Read the file content as a data URL
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Save the file data URL in local storage
    const cvDataUrl = reader.result;

    // setFormData(prevData => ({ ...prevData, cv: cvDataUrl }));
    SetCvData((prevData) => ({ ...prevData, cv: cvDataUrl }));
    // Save the updated form data to local storage
    // saveFormDataToLocalstorage({ ...formData, cv: cvDataUrl });
  };
};
