import React from "react";
import {observer} from "mobx-react";
import contentStore from "../mobx/content-store";
import simpleComplexStore from "../mobx/simple-complex-store";
import contentSummaryStore from "../mobx/conent-summary-store";
import textClassificationStore from "../mobx/text-classification-store";
import keywordExtractStore from "../mobx/keyword-extract-store";
import sentimentAnalysisStore from "../mobx/sentiment-analysis-store"
import dependencyGrammarStore from "../mobx/dependency-grammar-store"
import WordSegmentationStore from "../mobx/word-segmentation-store"


@observer
export default class SubmitText extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			url: '',
			get:false,
		}
	}
	componentWillMount(){
		this.submitText()
	}

	render() {
		let {isFetching} = contentStore;

		return (
			<div className="wb-t">
				<textarea className="txtr_1" value={contentStore.content}
						  onChange={(e) => contentStore.content = e.target.value}/>

				<div className="wbt-b cf">
					<a href="javascript:void(0)" className="tj-a fr" onClick={this.submitText.bind(this)}>提交文本</a>
					<a href="javascript:void(0)" className="zq-a fr" onClick={this.grabContent.bind(this)}>抓取</a>
					<input type="url" className="txt-1 fr" placeholder="网页URL......" value={this.state.url}
						   onChange={(e) => this.setState({url: e.target.value})}/>
					{isFetching?<img className="fr" style={{width:50,height:50,position:'absolute',right: 560,top:130}} src={require('../../images/loading.gif')} alt=""/>:null}
				</div>
			</div>
		)
	}

	submitText(){
		let {content} = contentStore;
		simpleComplexStore.fetchData(content);
		contentSummaryStore.fetchData(content);
		textClassificationStore.fetchData(content);
		keywordExtractStore.fetchData(content);
		sentimentAnalysisStore.fetchData(content)
		WordSegmentationStore.fetchData(content)
		dependencyGrammarStore.fetchData(content)


	}

	grabContent() {
		let {url} = this.state;
		if (url == '') {
			alert('请输入网址。')
			return
		}
		contentStore.grabContent(url);
	}
}
