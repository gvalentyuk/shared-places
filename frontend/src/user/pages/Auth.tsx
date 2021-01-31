import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHttp } from "../../hooks/http-hook";

import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/UI/ErrorModal";
import Card from "../../shared/UI/Card";
import Button from "../../shared/FormElements/Button";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

type AuthProps = {
  login: string;
  password: string;
  name: string;
};

const Auth: React.FC = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [loginMode, setLoginMode] = useState(true);
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: AuthProps) => {
    if (loginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          })
        );
        auth.login(`Bearer ${responseData.token}`);
      } catch (e) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          })
        );

        auth.login(`Bearer ${responseData.token}`);
        
      } catch (e) {}
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const switchMode = () => {
    setLoginMode((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`form-control ${
              errors.email && "form-control--invalid"
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              name="email"
              defaultValue={credentials.email}
              onChange={changeHandler}
              ref={register({
                required: true,
                minLength: 4,
                maxLength: 50,
                pattern: /^\S+@\S+$/i,
              })}
              id="email"
            />
          </div>

          {!loginMode && (
            <div
              className={`form-control ${
                errors.name && "form-control--invalid"
              }`}
            >
              <label htmlFor="name">Name</label>
              <input
                defaultValue={credentials.name}
                name="name"
                onChange={changeHandler}
                ref={register({
                  required: true,
                  minLength: 4,
                  maxLength: 50,
                })}
                id="name"
              />
            </div>
          )}

          <div
            className={`form-control ${
              errors.password && "form-control--invalid"
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              defaultValue={credentials.password}
              onChange={changeHandler}
              type="password"
              name="password"
              ref={register({ required: true, minLength: 5, maxLength: 50 })}
            />
          </div>

          <Button type="submit" disabled={!formState.isValid}>
            {loginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchMode}>
          SWITCH TO {loginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
