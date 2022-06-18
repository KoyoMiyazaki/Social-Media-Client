import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT_MUTATION, FETCH_POST_QUERY } from "../util/graphql";
import MyDialog from "./MyDialog";

const DeleteCommentButton = ({ postId, commentId }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update(cache, result) {
      const data = {
        ...cache.readQuery({
          query: FETCH_POST_QUERY,
          variables: { postId },
        }),
      };
      cache.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPost: {
            __typename: "Post",
            ...data.getPost,
            comments: [...result.data.deleteComment.comments],
            commentCount: result.data.deleteComment.commentCount,
          },
        },
        variables: { postId },
      });
      setIsDialogOpened(false);
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <Tooltip title="Delete a comment" placement="top-start">
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
        handleExecute={deleteComment}
        dialogTitle="Delete a comment?"
        dialogContent="Deleted comment never restore! Are you sure to delete?"
      />
    </>
  );
};

export default DeleteCommentButton;
