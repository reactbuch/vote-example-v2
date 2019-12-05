import ReactDOM from "react-dom";
import React from "react";

const CountDisplay = React.memo(function({ name, value, onDisplayClick }) {
  console.log(`Render CountDisplay '${name}' with value '${value}'`);

  return (
    <div onClick={onDisplayClick}>
      Counter {name}: {value}
    </div>
  );
});

// VARIANTE 1: OHNE ABHÄNGGIKEIT IN USECALLBACK
// (zum Ausprobieren unten bei ReactDOM.render eintragen)
// eslint-disable-next-line
function App_withMemo() {
  const [countOne, setCountOne] = React.useState(0);
  const [countTwo, setCountTwo] = React.useState(100);

  const reset = React.useCallback(function reset() {
    console.log("Reset Count One to 1");
    setCountOne(1);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          console.log("Click Button One");
          setCountOne(countOne + 1);
        }}
      >
        Increase Counter 1
      </button>
      <button
        onClick={() => {
          console.log("Click Button Two");
          setCountTwo(countTwo + 1);
        }}
      >
        Increase Counter 2
      </button>

      <CountDisplay name="One" value={countOne} onDisplayClick={reset} />
      <CountDisplay name="Two" value={countTwo} />
    </>
  );
}

// VARIANTE 2: mit Abhängigkeit auf zweiten Zähler
function App() {
  const [countOne, setCountOne] = React.useState(0);
  const [countTwo, setCountTwo] = React.useState(100);

  const reset = React.useCallback(
    function reset() {
      console.log("Reset Count One to " + countTwo);
      setCountOne(countTwo);
    },
    [countTwo]
  );

  return (
    <>
      <button
        onClick={() => {
          console.log("Click Button One");
          setCountOne(countOne + 1);
        }}
      >
        Increase Counter 1
      </button>
      <button
        onClick={() => {
          console.log("Click Button Two");
          setCountTwo(countTwo + 1);
        }}
      >
        Increase Counter 2
      </button>

      <CountDisplay name="One" value={countOne} onDisplayClick={reset} />
      <CountDisplay name="Two" value={countTwo} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
