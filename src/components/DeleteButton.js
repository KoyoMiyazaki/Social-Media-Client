import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";
import MyDialog from "./MyDialog";

const DeleteButton = ({ postId }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(cache) {
      const data = {
        ...cache.readQuery({
          query: FETCH_POSTS_QUERY,
        }),
      };
      data.getPosts = data.getPosts.filter((post) => post.id !== postId);
      cache.writeQuery({ query: FETCH_POSTS_QUERY, data });
      setIsDialogOpened(false);
      if (location.path !== "/") {
        navigate("/");
      }
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Tooltip title="Delete a post" placement="top-start">
        <IconButton
          size="medium"
          aria-label="delete"
          color="inherit"
          onClick={() => setIsDialogOpened(true)}
        >
          <Delete fontSize="medium" color="error" />
        </IconButton>
      </Tooltip>
      <MyDialog
        isOpen={isDialogOpened}
        handleClose={() => setIsDialogOpened(false)}
        handleExecute={deletePost}
        dialogTitle="Delete a post?"
        dialogContent="Deleted post never restore! Are you sure to delete?"
      />
    </>
  );
};

export default DeleteButton;
