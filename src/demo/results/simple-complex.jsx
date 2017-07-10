import React from "react";
import {observer} from "mobx-react";
import simpleComplexStore from "../../mobx/simple-complex-store";

const items = [
	{id: 'jianti', name: '简体'},
	{id: 'fanti', name: '繁体'},
	{id: 'pinyin', name: '拼音'}
];

/**
 * 简、繁体与拼音
 */
@observer
export default class SimpleComplex extends React.Component {

	state = {
		current: 'jianti'
	};

	onItemPress(id) {
		this.setState({
			current: id
		})
	}

	render() {
		let {item} = this.props,
			{current} = this.state,
			{isFetching} = simpleComplexStore;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-1">
						{items.map((i) => {
							return (
								<span key={i.id} className={ current === i.id ? 'onsp' : ''}
									  onClick={this.onItemPress.bind(this, i.id)}>{i.name}</span>
							)
						})}
					</div>
				</div>
				{isFetching ? <div style={{textAlign: 'center', paddingTop: 60, paddingBottom: 60}}>Loading...</div> :
					<div className="jfp">{simpleComplexStore[current]}</div>
				}
			</div>
		)
	}
}
