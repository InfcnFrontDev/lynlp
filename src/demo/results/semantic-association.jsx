import React from 'react';
import {observer} from "mobx-react";
import contentStore from '../../mobx/content-store'
import semanticAssociationStore from '../../mobx/semantic-association-store'
import _ from "lodash";
import Echart from './echart'
import Loading from "../loading";
import echarts from "echarts";
/**
 * 语义关联
 */
@observer
export default class SemanticAssociation extends React.Component {
	constructor(props) {
		super(props);
		this.now = 1;
	}

	componentWillUpdate(nextProps) {
		// semanticAssociationStore.fetchData(contentStore.content)
		let {graph} = semanticAssociationStore;
		if (graph && graph.links) {
			this.objc = this.ygTu(graph);
		}
	}

	itemNav(index) {
		return index === semanticAssociationStore.current ? 'spon' : '';
	}

	click(index, item) {
		semanticAssociationStore.current = index
		semanticAssociationStore.fetchDataGraph(item);
	}

	ygTu(data) {
		let node = [];
		let obj = {};
		let arr = {};
		data.links.map((item, index) => {
			if (item.from == this.key) {
				arr[item.to] = 1;
			}
		});
		data.nodes.map((item, index) => {
			obj = {
				id: index == 0 ? '关键词' : item.name,
				category: index == 0 ? 0 : (arr[item.name] ? 1 : 2),
				name: index == 0 ? '关键词' : item.name,
				symbolSize: 40
			};

			node.push(obj)
		});
		let links = [];
		let lik = {
			target: '',
			source: ''
		};
		data.links.map((item, index) => {
			if (item.from == data.nodes[0].name) {
				lik = {
					target: item.to,
					source: '关键词'
				};
			} else {
				lik = {
					target: item.to,
					source: item.from
				};
			}

			links.push(lik)
		});
		return {node, links};

	}

	render() {
		let {recommend, graph, fetching, fetchingTu,current} = semanticAssociationStore;
		let semanticKey = _.keys(recommend);
		this.key = semanticKey[current];
		let data = recommend[this.key];
		let recommend_arr = [];
		for (var i in data) {
			recommend_arr.push(data[i])
		};

		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>语义关联</i></h3>
				</div>
				<div className="ygBox">
					{fetching ? <Loading/> :
						<div>
							<div className="ygt">
								<div style={{width:60,float:'left'}}>关键词：</div>
								<div style={{width:800,float:'left'}}>
									{fetching ? null : semanticKey.map((item, index) => {
										return <span key={index} onClick={ () => {this.click(index, item)}} className={ this.itemNav(index) }>{item}</span>
									})}
								</div>
								
							</div>
							<div className="ygm cf">
								<div className="yg-l fl" style={{float: 'left'}}>
									<table className="cptab">
										<tbody>
										<tr>
											<th>词名</th>
											<th>相关性</th>
										</tr>
										{recommend_arr.map((item, index) => {
											return <tr key={index}>
												<td>{item.name}</td>
												<td>{item.score.toFixed(2)}</td>
											</tr>
										})}
										</tbody>
									</table>
								</div>
								{fetchingTu ? <Loading /> :
									<Echart data={['关键词', '相关词', '相关联词']} nodes={this.objc && this.objc.node}
											links={this.objc && this.objc.links} height={400}
											width={650} className="fl"/>}
							</div>
						</div>}
				</div>
			</div>
		)
	}


}
