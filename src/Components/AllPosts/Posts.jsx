import React, { useEffect, useState } from "react";
import "../AllPosts/Posts.css";
import Sidebar from "../Sidebar/Sidebar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { useLocation, useNavigate } from "react-router-dom";

function Posts() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [width, setWidth] = useState("");
  const [postData, setPostData] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(
      "https://andremoore-97bcb-default-rtdb.firebaseio.com/AndreMoore.json"
    )
      .then((response) => response.json())
      .then((data) => setPostData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    setWidth(width);
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlequaryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDelete = (postId) => {
    fetch(
      `https://andremoore-97bcb-default-rtdb.firebaseio.com/AndreMoore/${postId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPostData((prevData) => {
          const updatedData = { ...prevData };
          delete updatedData[postId];
          return updatedData;
        });
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      })
      .finally(() => {
        handleClose();
      });
  };
  return (
    <>
      <div className="Admin-posts-con">
        <Sidebar checkLogeIn={location.state || true} />

        <div className="Admin-Posts">
          <div style={{}}>
            <div className="input-container" style={{ padding: "3%" }}>
              <span></span>
            </div>
            <h1 style={{ letterSpacing: "2px", paddingLeft: "3.2%" }}>
              All Posts
            </h1>
          </div>

          <div className="AdminPost-item">
            {postData ? (
              Object.keys(postData).map((postId) => (
                <div className="Admin-post" key={postId}>
                  <div className="post-img">
                    <img
                      src={postData[postId]?.postImage}
                      alt="Thumbnail"
                      id="post-image"
                    />
                  </div>

                  <div className="title-crud">
                    <div className="post-title">
                      <h3
                        style={{
                          color: "#595457",
                          fontSize: "1.2rem",
                        }}
                      >
                        {postData[postId]?.Title}
                      </h3>
                      <p
                        style={{
                          color: "#595457",
                          fontSize: "17px",
                          marginTop: "5%",
                        }}
                      >
                        <span>Published :</span> {postData[postId]?.PublishDate}
                      </p>
                    </div>
                    <div className={`post-Crud`}>
                      {width <= 650 ? (
                        <div>
                          <Button
                            id="demo-positioned-button"
                            aria-controls={
                              open ? "demo-positioned-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            <MoreVertIcon className="menu-btn" />
                          </Button>
                          <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <MenuItem onClick={() => handleDelete(postId)}>
                              <DeleteForeverIcon />
                              Delete
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                navigate("/UpdatePost", {
                                  state: {
                                    postid: postId,
                                    PostImg: postData[postId]?.postImage,
                                    PostTitle: postData[postId]?.Title,
                                    PostContent: postData[postId]?.Content,
                                  },
                                })
                              }
                            >
                              <RecyclingIcon />
                              Update
                            </MenuItem>
                          </Menu>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex" }}>
                            <MenuItem onClick={() => handleDelete(postId)}>
                              <DeleteForeverIcon />
                              Delete
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                navigate("/UpdatePost", {
                                  state: {
                                    postid: postId,

                                    PostImg: postData[postId]?.postImage,
                                    PostTitle: postData[postId]?.Title,
                                    PostContent: postData[postId]?.Content,
                                  },
                                })
                              }
                            >
                              <RecyclingIcon />
                              Update
                            </MenuItem>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="loader"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Posts;
