import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button, TextField, Grid } from "@material-ui/core";
import LoginSignupContainer from "./LoginSignupContainer";

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
    backgroundColor: "#43DDC1",
    width: "15ch",
    padding: 10,
  },
  textfield: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
    "& label.Mui-focused": {
      color: "purple",
    },
  },
  link: {
    color: "purple",
    textDecoration: "none",
  },
  h1: {
    fontSize: "xx-large",
    marginBottom: 50,
  },
}));

const Login = () => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (name) => (event) => {
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();

    console.log(inputs);
    setInputs({ ...inputs, email: "", password: "" });
  };

  return (
    <LoginSignupContainer>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <form onSubmit={submit} className={classes.form}>
              <h1 className={classes.h1}>Welcome back!</h1>
              <TextField
                id="email-input"
                type="email"
                label="E-mail address"
                variant="outlined"
                required
                value={inputs.email}
                onChange={handleChange("email")}
                className={classes.textfield}
              />

              <TextField
                id="password-input"
                type="password"
                label="Password"
                variant="outlined"
                required
                value={inputs.password}
                onChange={handleChange("password")}
                className={classes.textfield}
              />

              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
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
          </Grid>
        </Grid>
      </Grid>
    </LoginSignupContainer>
  );
};

export default Login;
