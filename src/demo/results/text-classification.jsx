import React from 'react';

/**
 * 文本分类
 */
export default class TextClassification extends React.Component {
	state = {
		type: '人文'
	}
	render() {
		let {item} = this.props
		let itemName = ["教育", "军事", "人文", "旅游", "职场", "经济", "医疗", "体育", "科技"];
		let index  = itemName.indexOf(this.state.type)
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<ul className="info-containers">
					{itemName.map((name,key)=>{
						return (
							<li className={this.state.type === name ? 'selected': ''} key={key}>{name}</li>
						)
					})}
					<li className="move-scale" style={{left: index*100-9}}></li>
				</ul>
			</div>
		)
	}
}
