import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import { AuthContext } from "../context/auth";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const LinkBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

const LinkItem = ({ link, label }) => {
  return (
    <>
      <Button color="inherit" sx={{ textTransform: "none" }}>
        <StyledLink to={link}>
          <Typography variant="body1" component="span" fontWeight={500}>
            {label}
          </Typography>
        </StyledLink>
      </Button>
    </>
  );
};

const Menubar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <StyledLink to="/">
          <Typography variant="h5" component="h1" fontWeight={500}>
            Social Media
          </Typography>
        </StyledLink>
        <LinkBox>
          {user ? (
            <>
              <Typography
                variant="h6"
                component="span"
                fontWeight={500}
                marginRight={2}
              >
                Hello, {user.username}!
              </Typography>
              <Button
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={logout}
              >
                <Typography variant="body1" component="span" fontWeight={500}>
                  Logout
                </Typography>
              </Button>
            </>
          ) : (
            <>
              <LinkItem link="/register" label="Register" />
              <LinkItem link="/login" label="Login" />
            </>
          )}
        </LinkBox>
      </StyledToolbar>
    </AppBar>
  );
};

export default Menubar;
