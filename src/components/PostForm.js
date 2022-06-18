import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Alert,
  AlertTitle,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "../util/hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";
import ToastMessage from "./ToastMessage";

const PostForm = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { handleChange, handleSubmit, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(cache, result) {
      const data = {
        ...cache.readQuery({
          query: FETCH_POSTS_QUERY,
        }),
      };
      data.getPosts = [result.data.createPost, ...data.getPosts];
      cache.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
      setIsOpened(true);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        fontWeight={500}
        textAlign="center"
        marginY={2}
      >
        Create a post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={3} maxWidth={450} marginX="auto">
          <TextField
            label="Post"
            name="body"
            onChange={handleChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
          {error && (
            <Alert variant="outlined" severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography>{error.graphQLErrors[0].message}</Typography>
            </Alert>
          )}
        </Stack>
      </form>

      <ToastMessage
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        duration={4000}
        message="Posted!"
        severity="success"
      />
    </>
  );
};

export default PostForm;
