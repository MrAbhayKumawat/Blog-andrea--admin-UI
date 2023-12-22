import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../CreatePosts/NewPost.css";
import Sidebar from "../Sidebar/Sidebar";

function UpdatePost() {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    if (location.state && location.state.PostImg) {
      setPostData((prevData) => ({
        ...prevData,
        postImage: location.state.PostImg,
        Title: location.state.PostTitle,
        Content: location.state.PostContent,
      }));
    }
  }, [location.state]);

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
          updateImageDisplay();
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

  const handleUpdate = async () => {
    try {
      const postId = location.state.postid;
      console.log(postId);
      if (!postId) {
        throw new Error("Post ID is missing.");
      }

      setLoader(true);

      const response = await fetch(
        `https://andremoore-97bcb-default-rtdb.firebaseio.com/AndreMoore/${postId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        console.error(
          `Error: Network response was not ok. Status: ${response.status}, Status Text: ${response.statusText}`
        );

        if (response.status === 404) {
          console.error(
            "Error: Post not found. Please check if the post ID is correct."
          );
          throw new Error("Post not found");
        }

        throw new Error("Network response was not ok");
      }

      alert("Post updated successfully");
      navigate("/Posts");
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
            <p style={{ marginTop: "10%" }}>Please Wait a sec...</p>
          </div>
        ) : (
          <div className="main-con">
            <div className="Post-container">
              <h2 style={{ padding: "2%" }}>Update Your Post</h2>

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
                <div
                  style={{ textAlign: "end", alignItems: "center" }}
                  onClick={() => {
                    if (!postData.postImage) {
                      setShowError(true);
                    } else {
                      setPostData({
                        ...postData,
                        postImage: "",
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
                  onClick={handleUpdate}
                  style={{ padding: "0" }}
                >
                  Update Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdatePost;
