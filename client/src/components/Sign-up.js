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
    marginTop: 15,
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
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    error: "",
  });

  const handleChange = (name) => (event) => {
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();

    if (inputs.password.length < 6) {
      setInputs({
        ...inputs,
        error: "Password needs to be at least 6 characters long",
      });
    } else if (inputs.password === inputs.password2) {
      console.log(inputs);
      setInputs({
        ...inputs,
        name: "",
        email: "",
        password: "",
        password2: "",
        error: "",
      });
    } else {
      setInputs({
        ...inputs,
        error: "Passwords do not match",
      });
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
                variant="outlined"
                required
                value={inputs.name}
                onChange={handleChange("name")}
                className={classes.textfield}
              />

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
                helperText={inputs.error}
                onChange={handleChange("password")}
                className={classes.textfield}
              />

              <TextField
                id="password2-input"
                type="password"
                label="Confirm Password"
                variant="outlined"
                required
                value={inputs.password2}
                onChange={handleChange("password2")}
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
