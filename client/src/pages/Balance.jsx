import React, { useState, useContext } from "react";
import axios from "axios";
import {
  makeStyles,
  Button,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import MainContainer from "components/MainContainer";
import GridTemplateContainer from "components/GridTemplateContainer";

import UserContext from "context/UserContext";

// TO DO: figure out where to move useStyles to avoid duplicate code
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
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: `${theme.palette.secondary.main}`,
    width: "15ch",
    padding: 10,
    textTransform: "none",
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

const Balance = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const [refillAmount, setRefillAmount] = useState(0);
  const [checkoutPage, setCheckoutPage] = useState(false);

  // const submit = async (event) => {
  //   event.preventDefault();

  //   if (password.length < 7) {
  //     setError("Password needs to be at least 7 characters long");
  //   } else if (password === confirmedPass) {
  //     try {
  //       const { data } = await axios.post("/api/users/signup", {
  //         name: userName,
  //         email: email,
  //         password: password,
  //       });

  //       localStorage.token = data.token;

  //       if (localStorage.token) {
  //         setNextPage(true);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setError(err.response.data.response);
  //     }
  //   } else {
  //     setError("Passwords do not match");
  //   }
  // };

  return (
    <MainContainer>
      <GridTemplateContainer>
        {!checkoutPage ? (
          <form className={classes.form}>
            <h1 className={classes.h1}>Your balance:</h1>
            <p>{user && user.balance} credits</p>
            <Button type="submit" variant="contained" className={classes.button}>
              Checkout
            </Button>
          </form>
        ) : (
          <p>CHECKOUT PAGE IS TRUE</p>
        )}
      </GridTemplateContainer>
    </MainContainer>
  );
};

export default Balance;