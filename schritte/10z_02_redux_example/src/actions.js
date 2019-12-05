export function updateGreeting(greeting) {
  return {
    type: "UPDATE_GREETING",
    greeting
  };
}

export function resetGreeting() {
  return {
    type: "RESET_GREETING"
  };
}
