let React = require("react");
let ReactDOM = require("react-dom");

// let Hello = React.createClass({
	// render() {
		// return <h3>Hello ES6</h3>;
	// }
// });

class Hello extends React.Component {
	render() {
		return <h3>Hello React with ES6</h3>;
	}
}

ReactDOM.render(<Hello />, document.getElementById('react'));
