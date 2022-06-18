import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { LIKE_POST_MUTATION } from "../util/graphql";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(
    !!user && !!likes.find((like) => like.username === user.username)
  );
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  const navigate = useNavigate();

  const handleLikePost = () => {
    likePost();
    setLiked((prev) => !prev);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {user ? (
        <Tooltip title={liked ? "Unlike" : "Like"} placement="top-start">
          <Checkbox
            checked={liked}
            icon={<FavoriteBorder color="success" />}
            checkedIcon={<Favorite color="success" />}
            onChange={handleLikePost}
            // checked={liked}
          />
        </Tooltip>
      ) : (
        <IconButton
          size="medium"
          color="inherit"
          onClick={() => navigate("/login")}
        >
          <FavoriteBorder fontSize="medium" color="success" />
        </IconButton>
      )}
      <Divider orientation="vertical" flexItem />
      <Typography
        variant="subtitle1"
        component="p"
        fontWeight={400}
        textAlign="center"
        width={50}
        color="success.light"
      >
        {likeCount}
      </Typography>
    </Paper>
  );
};

export default LikeButton;
