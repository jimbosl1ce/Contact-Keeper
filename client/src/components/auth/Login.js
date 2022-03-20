import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import "./Login.css";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, logout, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (props.history.location.pathname === '/login' && props.history.action !== 'REPLACE') {
      logout();
    }

    if (isAuthenticated) {
    props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  // look at the second argument. This is a cool trick.
  // by placing e.target.name into brackets, we can flesh out the entire setUser object without having to type all out. When onChange triggers, it receives all inputs with their corresponding names as the key and the value as the key's value in the setUser object.
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className="container img">
      <div className="inner-container">
        <div className="form-container login">
          <h1>
            Account <span className="text-primary">Login</span>
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block"
            />
          </form>
          <p>Demo login: jdoe@gmail.com</p>
          <p>Demo password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
