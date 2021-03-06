import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles, TextField, FormHelperText } from "@material-ui/core";
import LoginSignupContainer from "components/LoginSignupContainer";
import GridTemplateContainer from "components/GridTemplateContainer";
import SubmitButton from "components/SubmitButton";
import UserContext from "context/UserContext";
import { store } from "utils/storage";

// TODO Figure out where to move useStyles to avoid duplicate code
const useStyles = makeStyles((theme) => ({
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
  },
  formHelper: {
    marginBottom: 10,
    color: "#ff0011",
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleChange = (event) => {
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

  const submit = async (event) => {
    event.preventDefault();

    if (password.length < 7) {
      setError("Password needs to be at least 7 characters long");
    } else if (password === confirmedPass) {
      try {
        const { data } = await axios.post("/api/users/signup", {
          name: userName,
          email: email,
          password: password,
        });

        store(data.token);
        setUser(data.user);

        if (user) {
          props.setRedirect(!props.redirect);
        }
      } catch (err) {
        console.error(err);
        setError(err.response.data.response);
      }
    } else {
      setError("Passwords do not match");
    }
  };

  return (
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

          {error && (
            <FormHelperText className={classes.formHelper}>
              {error}
            </FormHelperText>
          )}

          <SubmitButton className={classes.button}>Continue</SubmitButton>

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
