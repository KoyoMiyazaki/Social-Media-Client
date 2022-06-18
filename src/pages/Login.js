import React, { useContext, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import { LOGIN_USER_MUTATION } from "../util/graphql";

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(cache, result) {
      context.login(result.data.login);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
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
        Login
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={3} maxWidth={450} marginX="auto">
            <TextField
              label="Username"
              name="username"
              value={values.username}
              error={errors.username ? true : false}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              error={errors.password ? true : false}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>

            {Object.keys(errors).length > 0 && (
              <Alert variant="outlined" severity="error">
                <AlertTitle>Error</AlertTitle>
                {Object.values(errors).map((value) => (
                  <Typography>- {value}</Typography>
                ))}
              </Alert>
            )}
          </Stack>
        </form>
      )}
    </>
  );
};

export default Login;
