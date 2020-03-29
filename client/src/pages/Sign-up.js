import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const SignUp = () => {
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
      <h1>Create an account</h1>
      <input
        name="email"
        type="text"
        placeholder="E-mail address"
        value={inputs.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={inputs.password}
        onChange={handleChange}
      />

      <Button variant="contained" color="secondary">
        Submit
      </Button>

      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default SignUp;
