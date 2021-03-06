import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles, TextField, FormHelperText } from "@material-ui/core";
import LoginSignupContainer from "components/LoginSignupContainer";
import GridTemplateContainer from "components/GridTemplateContainer";
import UserContext from "context/UserContext";
import SubmitButton from "components/SubmitButton";
import { store } from "utils/storage";

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
  loginButton: {
    marginTop: 30,
    marginBottom: 10,
  },
  demoButton: {
    marginBottom: 30,
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

  const { user, setUser } = useContext(UserContext);

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

      store(data.token);
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setError(err.response.data.response);
    }
  };

  const handleDemo = (e) => {
    e.preventDefault();

    const demoUser = 'demo@email.com';
    const demoPassword = 'password';

    setEmail(demoUser);
    setPassword(demoPassword);
  };

  if (user && user.experience.length === 0) {
    return <Redirect from="/login" exact to="/experience" />;
  } else if (user && user.experience.length > 0) {
    return <Redirect from="/login" exact to="/" />;
  } else {
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

            <SubmitButton className={classes.loginButton}>Login</SubmitButton>

            <SubmitButton className={classes.demoButton} onClick={handleDemo}>
              Demo
            </SubmitButton>

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
  }
};

export default Login;
