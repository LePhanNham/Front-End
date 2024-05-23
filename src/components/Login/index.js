import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Alert,
  InputAdornment,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKey from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Khởi tạo component Login
export default function Login() {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // XỬ lý submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://gwc4mh-8081.csb.app/api/user/login",
        { user_name, password },
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data._id);
      localStorage.setItem("user_name", response.data.user_name);
      setError(false); // Reset error state if login is successful
      navigate("/");
    } catch (error) {
      setError(true); // Show error alert if login fails
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          mt: 8,
          mb: 8,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              Tài khoản hoặc mật khẩu không đúng
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="Tên đăng nhập"
              name="user_name"
              autoComplete="username"
              autoFocus
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "secondary.main",
                ":hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              Đăng nhập
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{ ":hover": { textDecoration: "underline" } }}
                >
                  Chưa có tài khoản? Đăng ký ngay
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
