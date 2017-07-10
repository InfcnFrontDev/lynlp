import React from 'react';
import {observer} from "mobx-react";
import textClassificationStore from "../../mobx/text-classification-store"
/**
 * 文本分类
 */
@observer
export default class TextClassification extends React.Component {

	render() {
		let {item} = this.props
		const itemName = ["教育", "军事", "人文", "旅游", "职场", "经济", "医疗", "体育", "科技"];
		let category = textClassificationStore.category || '科技';
		let index  = itemName.indexOf(category) || 8;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<ul className="info-containers">
					{itemName.map((name,key)=>{
						return (
							<li className={category === name ? 'selected': ''} key={key}>{name}</li>
						)
					})}
					<li className="move-scale" style={{left: index*100-9}}></li>
				</ul>
			</div>
		)
	}
}
