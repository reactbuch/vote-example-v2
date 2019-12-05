import React from "react";

export default class Greeter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phrase: "Hello",
      name: "World"
    };

    this.nameRef = React.createRef();
  }

  greet = () => {
    alert(`${this.state.phrase}, ${this.state.name}`);
  };

  clear = () => {
    this.setState({
      phrase: "",
      name: ""
    });

    this.nameRef.current.focus();
  };

  render() {
    const buttonDisabled = !(this.state.phrase && this.state.name);

    return (
      <div>
        <h1>{this.props.title}</h1>
        <input
          value={this.state.phrase}
          onChange={e => this.setState({ phrase: e.target.value })}
          ref={this.nameRef}
        />
        <input
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <button onClick={this.greet} disabled={buttonDisabled}>
          Greet
        </button>
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }

  componentDidMount() {
    this.originalTitle = document.title;
    document.title = `Greeting for ${this.state.name}`;
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      document.title = `Greeting for ${this.state.name}`;
    }
  }

  componentWillUnmount() {
    document.title = this.originalTitle;
  }
}
