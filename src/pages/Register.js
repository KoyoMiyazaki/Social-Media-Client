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
import { REGISTER_USER_MUTATION } from "../util/graphql";

const Register = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values } = useForm(addUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(cache, result) {
      context.login(result.data.register);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function addUserCallback() {
    addUser();
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
        Register
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
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email ? true : false}
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
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Register
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

export default Register;
