import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FETCH_POST_QUERY } from "../util/graphql";
import PostCard from "../components/PostCard";
import { Box, CircularProgress, Stack } from "@mui/material";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

const SinglePost = () => {
  const { postId } = useParams();

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  let postMarkup;
  if (!data?.getPost) {
    postMarkup = (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data?.getPost;
    postMarkup = (
      <>
        <PostCard post={data?.getPost} />
        <CommentForm postId={id} />
        {comments.map((comment) => (
          <Comment
            postId={id}
            commentId={comment.id}
            username={comment.username}
            createdAt={comment.createdAt}
            body={comment.body}
          />
        ))}
      </>
    );
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      marginTop={4}
      maxWidth={700}
      marginX="auto"
    >
      {postMarkup}
    </Stack>
  );
};

export default SinglePost;
