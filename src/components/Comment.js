import React, { useContext } from "react";
import moment from "moment";
import { Box, Card, CardContent, styled, Typography } from "@mui/material";
import { AuthContext } from "../context/auth";
import DeleteCommentButton from "./DeleteCommentButton";

const StyledCardContent = styled(CardContent)({
  padding: "1rem",
  "&:last-child": {
    paddingBottom: "1rem",
  },
});

const Comment = ({ postId, commentId, username, createdAt, body }) => {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <StyledCardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="p"
              fontWeight={500}
              color="text.primary"
            >
              {username}
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              color="text.secondary"
            >
              {moment(createdAt).fromNow()}
            </Typography>
          </Box>
          {user && user.username === username && (
            <DeleteCommentButton postId={postId} commentId={commentId} />
          )}
        </Box>
        <Typography
          variant="h6"
          component="p"
          fontWeight={400}
          color="text.primary"
          marginY={2}
        >
          {body}
        </Typography>
      </StyledCardContent>
    </Card>
  );
};

export default Comment;
