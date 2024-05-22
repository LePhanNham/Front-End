import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [userName, setUserName] = useState("");
  const user_name = localStorage.getItem("user_name");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserIdFromPathname(pathname);
        if (userId) {
          const response = await axios.get(
            `https://hgcwj3-8081.csb.app/api/user/${userId}`,
          );
          setUserName(response.data.user_name);
        } else {
          setUserName(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [pathname]);

  const getUserIdFromPathname = (pathname) => {
    const parts = pathname.split("/");
    const userIdIndex = parts.findIndex(
      (part) => part === "users" || part === "photos",
    );
    if (userIdIndex !== -1 && userIdIndex + 1 < parts.length) {
      return parts[userIdIndex + 1];
    }

    return null;
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  let appContext = "";

  if (pathname.startsWith("/users/")) {
    appContext = `Thông tin của ${userName || "Người dùng"}`;
  } else if (pathname.startsWith("/photos/")) {
    appContext = `Ảnh của ${userName || "Người dùng"}`;
  } else if (pathname === "/") {
    appContext = "Cùng khám phá ảnh mọi người nhé";
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {appContext}
        </Typography>
        {user_name && (
          <Typography variant="h6" color="inherit" sx={{ mr: 2 }}>
            Xin chào, {user_name}
          </Typography>
        )}
        <Button color="inherit" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
