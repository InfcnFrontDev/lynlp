import React from "react";
import {observer} from "mobx-react";
import contentStore from "../mobx/content-store";
import simpleComplexStore from "../mobx/simple-complex-store";
import contentSummaryStore from "../mobx/conent-summary-store";
import textClassificationStore from "../mobx/text-classification-store";
import keywordExtractStore from "../mobx/keyword-extract-store";
import sentimentAnalysisStore from "../mobx/sentiment-analysis-store"
import semanticAssociationStore from "../mobx/semantic-association-store"


@observer
export default class SubmitText extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			url: ''
		}
	}

	render() {
		return (
			<div className="wb-t">
				<textarea className="txtr_1" value={contentStore.content}
						  onChange={(e) => contentStore.content = e.target.value}/>
				<div className="wbt-b cf">
					<a href="javascript:void(0)" className="tj-a fr" onClick={this.submitText.bind(this)}>提交文本</a>
					<a href="javascript:void(0)" className="zq-a fr" onClick={this.grabContent.bind(this)}>抓取</a>
					<input type="url" className="txt-1 fr" placeholder="网页URL......" value={this.state.url}
						   onChange={(e) => this.setState({url: e.target.value})}/>
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.submitText();
	}

	submitText() {
		let {content} = contentStore;
		simpleComplexStore.fetchData(content);
		contentSummaryStore.fetchData(content);
		textClassificationStore.fetchData(content);
		keywordExtractStore.fetchData(content);
		sentimentAnalysisStore.fetchData(content)
		semanticAssociationStore.fetchData(content);

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
