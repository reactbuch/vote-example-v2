import React from "react";
type GreeterProps = Readonly<{
  initialGreeting?: string;
  initialAddPhrase?: boolean;
}>;

export default function Greeter(props: GreeterProps) {
  const [greeting, setGreeting] = React.useState(props.initialGreeting || "");
  const [addPhrase, setAddPhrase] = React.useState(
    props.initialAddPhrase || false
  );

  function greet() {
    if (addPhrase) {
      alert(`Hello, ${greeting}`);
    } else {
      alert(`${greeting}`);
    }
  }

  const buttonDisabled = greeting.length === 0;

  return (
    <div>
      <input
        type="text"
        value={greeting}
        onChange={e => setGreeting(e.target.value)}
      />

      <div>
        <input
          type="checkbox"
          value={addPhrase.toString()}
          onChange={e => setAddPhrase(e.target.checked)}
        />
        <label>Add Phrase</label>
      </div>
      <button disabled={buttonDisabled} onClick={greet}>
        Greet
      </button>
    </div>
  );
}
