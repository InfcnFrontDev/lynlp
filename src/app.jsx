import React from "react";
import "../styles/index.scss";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Content from "./layout/content";
import Nav from "./layout/nav";
import Demo from "./demo/index";
import {enableLogging} from 'mobx-logger';

// 启用mobx日志输出
enableLogging({
	predicate: () => __DEV__,
	action: true,
	reaction: true,
	transaction: true,
	compute: true
});

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
