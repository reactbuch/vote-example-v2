import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";

export default function HelloMessage() {
  const greeting = useSelector(state => state.greeting);
  const dispatch = useDispatch();

  function onUpdateGreeting(event) {
    dispatch(actions.updateGreeting(event.target.value));
  }

  function onResetGreeting() {
    dispatch(actions.resetGreeting());
  }

  return (
    <div>
      <input onChange={onUpdateGreeting} value={greeting} />
      <p>{greeting}, World</p>
      <button onClick={onResetGreeting}>Reset</button>
    </div>
  );
}
