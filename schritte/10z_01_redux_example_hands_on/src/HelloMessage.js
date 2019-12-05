import React from "react";

export default function HelloMessage({ initialMessage }) {
  const [greeting, setGreeting] = React.useState(initialMessage);

  function onUpdateGreeting(event) {
    setGreeting(event.target.value);
  }

  function onResetGreeting() {
    setGreeting(initialMessage);
  }

  return (
    <div>
      <input onChange={onUpdateGreeting} value={greeting} />
      <p>{greeting}, World</p>
      <button onClick={onResetGreeting}>Reset</button>
    </div>
  );
}
