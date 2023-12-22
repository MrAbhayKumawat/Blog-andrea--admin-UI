import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import TelegramIcon from "@mui/icons-material/Telegram";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LaunchIcon from "@mui/icons-material/Launch";
import "../Sidebar/Sidebar.css";

function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  console.log(props.checkLogeIn);
  const toggle = () => {
    setIsOpen(!isOpen);
    a;
  };

  return (
    <div className="container">
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="top_section">
          <div className="bars">
            {isOpen ? (
              <CloseIcon onClick={toggle} className="menubtn" />
            ) : (
              <MenuIcon onClick={toggle} className="menubtn" />
            )}
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <button
                className="btnadmin"
                onClick={() =>
                  navigate("/NewPosts", { logincheck: props.checkLogeIn })
                }
              >
                <AddIcon />
                NEW POST
              </button>
            </li>
            <li>
              <button
                className="btnadmin"
                onClick={() =>
                  navigate("/Posts", { state: { admi: props.checkLogeIn } })
                }
              >
                <PostAddIcon /> Posts
              </button>
            </li>
            <li>
              <button className="btnadmin" onClick={() => navigate("/")}>
                <LaunchIcon />
                View Post
              </button>
            </li>
          </ul>
        </nav>
        <div className="footer">
          <h1 className="heading">
            Andrea <span>Moore</span>
          </h1>
          <div>
            <form>
              <h3>Subscribe for newsletter</h3>
              <div className="form-email">
                <input
                  type="email"
                  placeholder="Email Address"
                  style={{ minWidth: "80%" }}
                />
                <TelegramIcon
                  style={{ cursor: "pointer", fontSize: "1.8rem" }}
                />
              </div>
              <p style={{ padding: "5%" }}>
                Copyright © 2023 All rights reserved | This template is made
                with by Colorlib
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
