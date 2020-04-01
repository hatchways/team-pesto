import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button, TextField, Grid } from "@material-ui/core";
import LoginSignupContainer from "./LoginSignupContainer";

// TODO Figure out where to move useStyles to avoid duplicate code
const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1
  },
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
      borderColor: "purple"
    },
    "& label.Mui-focused": {
      color: "purple"
    }
  },
  link: {
    color: "purple",
    textDecoration: "none"
  },
  h1: {
    fontSize: "xx-large"
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password2":
        setPassword2(value);
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
    } else if (password === password2) {
      console.log(name, email, password, password2);
      setError("");
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <LoginSignupContainer>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <form onSubmit={submit} className={classes.form}>
              <h1 className={classes.h1}>Create an account</h1>
              <TextField
                id="name-input"
                type="text"
                label="Name"
                name="name"
                variant="outlined"
                required
                value={name}
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
                id="password2-input"
                type="password"
                label="Confirm Password"
                name="password2"
                variant="outlined"
                required
                value={password2}
                onChange={handleChange}
                className={classes.textfield}
              />

              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
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
          </Grid>
        </Grid>
      </Grid>
    </LoginSignupContainer>
  );
};

export default SignUp;
