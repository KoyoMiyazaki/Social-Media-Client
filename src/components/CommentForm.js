import React from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CREATE_COMMENT_MUTATION, FETCH_POST_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";

const CommentForm = ({ postId }) => {
  const { handleChange, handleSubmit, values } = useForm(
    createCommentCallback,
    {
      body: "",
    }
  );

  const [createComment, { error }] = useMutation(CREATE_COMMENT_MUTATION, {
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
            comments: [...result.data.createComment.comments],
            commentCount: result.data.createComment.commentCount,
          },
        },
        variables: { postId },
      });
      values.body = "";
    },
    variables: {
      postId,
      body: values.body,
    },
  });

  function createCommentCallback() {
    createComment();
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" component="p" color="text.secondary">
          Post a comment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" width="100%">
            <TextField
              label="comment"
              name="body"
              onChange={handleChange}
              value={values.body}
              fullWidth
            />
            <Button type="submit" variant="contained" width="100px">
              Submit
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
