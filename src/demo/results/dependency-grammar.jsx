import React from 'react';
import {observer} from "mobx-react";

/**
 * 依存文法
 */
@observer
export default class DependencyGrammar extends React.Component {

	render() {
		let {item} = this.props;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<div className="cf qfmkj">
					<canvas id="myCanvas" width="890" height="300" style={{backgroundColor:'#ff0'}}></canvas>
					<div>

					</div>
				</div>
			</div>
		)
	}
}


