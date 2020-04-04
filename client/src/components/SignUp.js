import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button, TextField } from "@material-ui/core";
import LoginSignupContainer from "pages/LoginSignupContainer";
import GridTemplateContainer from "pages/GridTemplateContainer";
import Onboarding from "./Onboarding";

// TODO Figure out where to move useStyles to avoid duplicate code
const useStyles = makeStyles(theme => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch"
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginTop: 15,
    marginBottom: 60,
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: "#43DDC1",
    width: "15ch",
    padding: 10
  },
  textfield: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.primary.dark}`
    },
    "& label.Mui-focused": {
      color: `${theme.palette.primary.dark}`
    }
  },
  link: {
    color: `${theme.palette.primary.dark}`,
    textDecoration: "none"
  },
  h1: {
    fontSize: "xx-large"
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [error, setError] = useState("");
  const [nextPage, setNextPage] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;

    // eslint-disable-next-line
    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmedPass":
        setConfirmedPass(value);
        break;
      case "error":
        setError(value);
        break;
    }
  };

  const submit = event => {
    event.preventDefault();

    if (password.length < 6) {
      setError("Password needs to be at least 6 characters long");
    } else if (password === confirmedPass) {
      setNextPage(true);
      console.log(userName, email, password, confirmedPass, nextPage);
      setError("");
    } else {
      setError("Passwords do not match");
    }
  };

  return nextPage ? (
    <Onboarding />
  ) : (
    <LoginSignupContainer>
      <GridTemplateContainer>
        <form onSubmit={submit} className={classes.form}>
          <h1 className={classes.h1}>Create an account</h1>
          <TextField
            id="userName-input"
            type="text"
            label="Name"
            name="userName"
            variant="outlined"
            required
            value={userName}
            onChange={handleChange}
            className={classes.textfield}
          />

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
            helperText={error}
            onChange={handleChange}
            className={classes.textfield}
          />

          <TextField
            id="confirmedPass-input"
            type="password"
            label="Confirm Password"
            name="confirmedPass"
            variant="outlined"
            required
            value={confirmedPass}
            onChange={handleChange}
            className={classes.textfield}
          />

          <Button type="submit" variant="contained" className={classes.button}>
            Continue
          </Button>

          <div>
            <strong>
              Already have an account?{" "}
              <Link to="/login" className={classes.link}>
                Login
              </Link>
            </strong>
          </div>
        </form>
      </GridTemplateContainer>
    </LoginSignupContainer>
  );
};

export default SignUp;
