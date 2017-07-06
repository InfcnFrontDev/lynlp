import React from 'react';
import {observer} from "mobx-react";
import simpleComplexStore from "../../mobx/simple-complex-store"

/**
 * 简、繁体与拼音
 */
@observer
export default class SimpleComplex extends React.Component {
	render() {
		let {item} = this.props;
		let {isFetching} = simpleComplexStore;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-1">
						<span>简体</span>
						<span className="onsp">繁体</span>
						<span>拼音</span>
					</div>
				</div>
				<div className="jfp" style={{display: 'block'}}>
					{isFetching ? 'is fetching.': simpleComplexStore.fanti}
				</div>
				<div className="jfp">{simpleComplexStore.fanti}</div>
				<div className="jfp">{simpleComplexStore.pinyin}</div>
			</div>
		)
	}
}
