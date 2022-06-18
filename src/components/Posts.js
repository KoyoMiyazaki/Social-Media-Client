import React from "react";
import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Posts = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        fontWeight={500}
        textAlign="center"
        marginY={2}
      >
        Recent Posts
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {!data.getPosts.posts &&
            data.getPosts.map((post, index) => (
              <Grid item xs={4} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
