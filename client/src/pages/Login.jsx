import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  makeStyles,
  Button,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import LoginSignupContainer from "components/LoginSignupContainer";
import GridTemplateContainer from "components/GridTemplateContainer";

// TODO Figure out where to move useStyles to avoid duplicate code
const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 60,
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: `${theme.palette.secondary.main}`,
    width: "15ch",
    padding: 10,
  },
  textfield: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.primary.dark}`,
    },
    "& label.Mui-focused": {
      color: `${theme.palette.primary.dark}`,
    },
  },
  link: {
    color: `${theme.palette.primary.dark}`,
    textDecoration: "none",
  },
  h1: {
    fontSize: "xx-large",
    marginBottom: 50,
  },
  formHelper: {
    marginBottom: 10,
    color: "#ff0011",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    // eslint-disable-next-line
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email: email,
        password: password,
      });

      localStorage.token = data.token;

      if (localStorage.token) {
        // TODO redirect to homepage
        console.log(localStorage.token);
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.response);
    }
  };

  return (
    <LoginSignupContainer>
      <GridTemplateContainer>
        <form onSubmit={submit} className={classes.form}>
          <h1 className={classes.h1}>Welcome back!</h1>
          <TextField
            id="email-input"
            type="email"
            label="E-mail address"
            name="email"
            variant="outlined"
            required
            value={email}
            onChange={handleChange}
            className={classes.textfield}
          />

          <TextField
            id="password-input"
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            required
            value={password}
            onChange={handleChange}
            className={classes.textfield}
          />

          {error && (
            <FormHelperText className={classes.formHelper}>
              {error}
            </FormHelperText>
          )}

          <Button type="submit" variant="contained" className={classes.button}>
            Login
          </Button>

          <div>
            <strong>
              Don't have an account?{" "}
              <Link to="/sign-up" className={classes.link}>
                Create
              </Link>
            </strong>
          </div>
        </form>
      </GridTemplateContainer>
    </LoginSignupContainer>
  );
};

export default Login;
