import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../CreatePosts/NewPost.css";
import Sidebar from "../Sidebar/Sidebar";

function NewPosts() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [loader, setLoader] = useState(false);

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;
  }

  const formattedDate = getFormattedDate();

  const [postData, setPostData] = useState({
    postImage: "",
    Title: "",
    Content: "",
    PublishDate: formattedDate,
  });

  const [inputErrors, setInputErrors] = useState({
    Title: "",
    Content: "",
    postImage: "",
  });

  useEffect(() => {
    if (location.state && location.state.PostImg) {
      setPostData((prevData) => ({
        ...prevData,
        postImage: location.state.PostImg,
      }));
    }
  }, [location.state]);

  const handleImageUpload = (event) => {
    if (event && event.target) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPostData((prevData) => ({
            ...prevData,
            postImage: e.target.result,
          }));
        };
        reader.readAsDataURL(file);
        setInputErrors((prevErrors) => ({ ...prevErrors, postImage: "" }));
      }
    }
  };

  const updateImageDisplay = () => {
    const uploadedFile = document.getElementById("uploadedFile");
    if (uploadedFile) {
      uploadedFile.style.display = "none";
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setInputErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handlePublish = async () => {
    try {
      if (postData.Title.trim() === "") {
        throw new Error("Title is required.");
      }

      if (postData.Content.trim() === "") {
        throw new Error("Content is required.");
      }

      if (!postData.postImage) {
        throw new Error("Image is required.");
      }

      setLoader(true);

      // Assuming some condition for the fetch request
      const response = await fetch(
        "https://andremoore-97bcb-default-rtdb.firebaseio.com/AndreMoore.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Data sent successfully");

      setPostData({
        postImage: "",
        Title: "",
        Content: "",
        PublishDate: formattedDate,
      });

      navigate("/AllPosts");
      setShowError(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostData((prevData) => ({
          ...prevData,
          postImage: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
      setInputErrors((prevErrors) => ({ ...prevErrors, postImage: "" }));
    }
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Create-post">
      <Sidebar />
      <div className="post-item">
        {loader ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30%",
            }}
          >
            <div className="loader"></div>
          </div>
        ) : (
          <div className="main-con">
            <div className="Post-container">
              <h2 style={{ padding: "2%" }}>Create Your Post</h2>

              <div
                className="New-Post"
                onDrop={handleDrop}
                onDragOver={preventDefault}
              >
                <div className="img-con">
                  <div className="image">
                    <Button
                      component="label"
                      variant="contained"
                      id="uploadedFile"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </Button>

                    {postData.postImage && (
                      <div>
                        {updateImageDisplay()}
                        <img
                          src={postData.postImage}
                          className="uploaded-image"
                          alt="Uploaded"
                          style={{ alignItems: "center" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="input-field">
                  <span className="error" style={{ color: "red" }}>
                    {inputErrors.Title}
                  </span>
                </div>
                <div>
                  {showError && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">
                        You don't have login credentials. Please
                        <a href="/AdminLogin"> Login</a> first!
                      </Alert>
                    </Stack>
                  )}
                </div>

                <div
                  style={{ textAlign: "end", alignItems: "center" }}
                  onClick={() => {
                    if (!postData.postImage) {
                      setShowError(true);
                    } else {
                      setPostData({
                        ...postData,
                        postImage: "", // Update the postImage property
                      });
                      document.getElementById("uploadedFile").style.display =
                        "block";
                    }
                  }}
                >
                  <button id="bottone1">
                    <HighlightOffIcon />
                    <strong>Remove Image</strong>
                  </button>
                </div>
                <div className="input-field">
                  <input
                    name="Title"
                    value={postData.Title}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Title"
                    rows="4"
                  />
                  <br />
                  <br />
                  <textarea
                    name="Content"
                    value={postData.Content}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Content"
                    rows="4"
                  />
                  <span className="error" style={{ color: "red" }}>
                    {inputErrors.Content}
                  </span>
                </div>

                <button
                  className="publish-post"
                  onClick={handlePublish}
                  style={{ padding: "0" }}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewPosts;
