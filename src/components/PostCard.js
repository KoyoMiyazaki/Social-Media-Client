import React, { useContext } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChatBubble, ChatBubbleOutline } from "@mui/icons-material";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const UserStack = styled(Stack)({
  alignItems: "center",
  justifyContent: "space-between",
});

const PostCard = ({
  post: {
    id,
    body,
    username,
    likes,
    likeCount,
    comments,
    commentCount,
    createdAt,
  },
}) => {
  const { user } = useContext(AuthContext);

  const messageOnPost = () => {
    console.log("message button is clicked");
  };

  return (
    <Card>
      <CardContent>
        <UserStack direction="row">
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
          <Avatar alt="John Doe" src="/static/images/avatar/1.jpg" />
        </UserStack>
        <Typography
          variant="h6"
          component="p"
          fontWeight={400}
          color="text.primary"
          marginY={1}
        >
          {body}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1}>
          <LikeButton user={user} post={{ id, likes, likeCount }} />

          {/* Comments */}
          <Paper
            variant="outlined"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Tooltip title="Show Comments" placement="top-start">
              <Link to={`/posts/${id}`}>
                <Checkbox
                  icon={<ChatBubbleOutline color="primary" />}
                  checkedIcon={<ChatBubble color="primary" />}
                  onChange={messageOnPost}
                  checked={false}
                />
              </Link>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Typography
              variant="subtitle1"
              component="p"
              fontWeight={400}
              textAlign="center"
              width={50}
              color="primary.light"
            >
              {commentCount}
            </Typography>
          </Paper>
        </Stack>
        {user && user.username === username && <DeleteButton postId={id} />}
      </CardActions>
    </Card>
  );
};

export default PostCard;
