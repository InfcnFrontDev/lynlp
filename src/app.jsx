import React from 'react';
import '../styles/index.scss';
import Header from "./layout/header";
import Footer from "./layout/footer";
import Nav from "./layout/nav";
import Demo from "./demo/index"
import Intro from "./intro/index"

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				<Nav/>
				<Demo/>
				<Intro/>
				<Footer/>
			</div>
		)
	}
}
