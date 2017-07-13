import React from "react";

export default class GoTop extends React.Component {
	render() {
		return (
			<a className="go-top"><img src={require('../../images/go-top.png')} onClick={this.gotTop.bind()}/></a>
		)
	}

	gotTop() {
		head.ready(function(){
			$("html, body").animate({
				scrollTop: 0
			}, {duration: 500, easing: "swing"})
		})

	}
}
