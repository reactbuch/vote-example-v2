import React from "react";

import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our little React Router Example.</p>
      <Link to="/about">About</Link>
    </div>
  );
}

export function About() {
  return (
    <div>
      <h1>About</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
