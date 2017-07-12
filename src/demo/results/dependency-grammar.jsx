import React from 'react';
import {observer} from "mobx-react";
import dependencyGrammarStore from "../../mobx/dependency-grammar-store"
import contentStore from "../../mobx/content-store";
import Loading from "../loading";


/**
 * 依存文法
 */
@observer
export default class DependencyGrammar extends React.Component {

	componentWillMount() {
		dependencyGrammarStore.fetchData(contentStore.content)
	}

	componentDidUpdate(props) {

		let {collData, docData} = dependencyGrammarStore;
		var  parse = document.getElementById("parse");

		if(parse){
			parse.innerHTML = '<div id="tDiv"></div>';

			var webFontURLs = [
				'brat/static/fonts/Astloch-Bold.ttf',
				'brat/static/fonts/PT_Sans-Caption-Web-Regular.ttf',
				'brat/static/fonts/Liberation_Sans-Regular.ttf'
			];
			Util.embed(
				'tDiv',
				collData,
				docData,
				webFontURLs
			);
		}


	}

	render() {


		let {item} = this.props;
		let {isFetching} = dependencyGrammarStore;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				{isFetching?<Loading/>:(
					<div className="cf qfmkj" id="parse">
						<div id="tDiv"></div>
					</div>
				)}
			</div>
		)
	}
}


