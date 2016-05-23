import React from "react";
import Relay from "react-relay";
import moment from "moment";

class Link extends React.Component {
	dateLabel = () => moment(this.props.link.createdAt).format('L')
	render() {
		let {link} = this.props;
		return (
			<li>
				<span>
				{this.dateLabel()}
				</span>
				<a href={link.url}>{link.title}</a>
			</li>
		);
	}
}

Link = Relay.createContainer(Link, {
	fragments: {
		link: () => Relay.QL`
			fragment on Link {
				url,
				title,
				createdAt,
			}
		`
	}
});

export default Link;
