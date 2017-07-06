import React from "react";
import "../styles/index.scss";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Content from "./layout/content";
import Nav from "./layout/nav";
import Demo from "./demo/index";

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				<Content>
					<Nav/>
					<Demo/>
				</Content>
				<Footer/>
			</div>
		)
	}
}
