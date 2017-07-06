import React from "react";

/**
 * 分词标注
 */
export default class WordSegmentation extends React.Component {
	render() {
		let {item} = this.props;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-2">
						<span className="onsp">NLP分词</span>
						<span>精准分词</span>
						<span>索引分词</span>
						<span>细颗粒度分词</span>
					</div>
				</div>
				<div className="fcm">
					<img src={require('../../../images/fc1.png')}/>
				</div>
			</div>
		)
	}
}
