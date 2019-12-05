import React from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../actions";

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = React.useState("");

  function doLogin() {
    dispatch(login(email));
    const redirectTo =
      location.state && location.state.redirectAfter
        ? location.state.redirectAfter
        : "/";

    history.replace(redirectTo);
  }

  function cancel() {
    history.replace("/");
  }

  // "fake" email check just make sure whatever the user entered
  // is a least three chars long
  const emailValid = email && email.length > 3;
  return (
    <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">You need to login to perform that action</h1>
      </div>

      <div className="LoginForm">
        <p>Please login with your E-Mail address</p>
        <input
          type="text"
          placeholder="Enter your email address here"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="ButtonBar">
          <button disabled={!emailValid} className="Button" onClick={doLogin}>
            Login
          </button>
          <button className="Button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
