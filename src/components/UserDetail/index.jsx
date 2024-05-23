import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://gwc4mh-8081.csb.app/api/user/${userId}`,
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Paper elevation={3} className="user-detail-container">
      <Typography variant="h5" gutterBottom>
        Thông tin của người dùng
      </Typography>
      <Typography variant="body1">
        <strong>Tên:</strong> {user.user_name}
      </Typography>
      <Typography variant="body1">
        <strong>Địa chỉ:</strong> {user.location}
      </Typography>
      <Typography variant="body1">
        <strong>Mô tả:</strong> {user.description}
      </Typography>
      <Typography variant="body1">
        <strong>Nghề nghiệp:</strong> {user.occupation}
      </Typography>
    </Paper>
  );
}

export default UserDetail;
