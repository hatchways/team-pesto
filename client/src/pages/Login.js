import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const submit = event => {
    event.preventDefault();

    console.log(inputs);
    setInputs({ ...inputs, email: "", password: "" });
  };

  return (
    <form onSubmit={submit}>
      <h1>Welcome back!</h1>
      <TextField
        id="email-input"
        label="E-mail address"
        variant="outlined"
        value={inputs.email}
        onChange={handleChange}
      />

      <TextField
        id="password"
        label="Password"
        variant="outlined"
        value={inputs.password}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>

      <div>
        Don't have an account? <Link to="/sign-up">Create</Link>
      </div>
    </form>
  );
};

export default Login;
