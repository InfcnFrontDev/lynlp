import React from 'react';

/**
 * 关键词提取
 */
export default class KeywordExtract extends React.Component {
	render() {
		let {item} = this.props;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<img src={require('../../../images/gt.png')}/>
			</div>
		)
	}
}
