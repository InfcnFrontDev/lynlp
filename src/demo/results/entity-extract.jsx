import React from "react";
import {observer} from "mobx-react";
import echarts from "echarts";
import '../../common/macarons';
import EntityExtractStore from "../../mobx/entity-extract-store";
import contentStore from "../../mobx/content-store";
import Loading from "../loading";
import _ from "lodash"

/**
 * 实体抽取
 */
const itemName = [{'name': '图形展示'}, {'name': '列表展示'}]
@observer
export default class EntityExtract extends React.Component {

	buildGraph(result) {
		let k0 = '文本',
			nodes = [{name: k0, category: 0, symbolSize: 80}],
			links = [];
		_.forEach(result, (v1, k1)=> {
			nodes.push({name: k1, category: 1});
			links.push({source: k0, target: k1, weight: 1});

			_.forEach(v1, (n)=> {
				let k2 = _.findKey(n, (chr)=> true);
				nodes.push({name: k2, category: 2});
				links.push({source: k1, target: k2, weight: 2})
			})
		});
		return {nodes, links}
	}
	buildEntity(result){
		let obj = []
		_.forEach(result, (v1, k1) => {
			let content=[]
			_.forEach(v1, (n) => {
				let k2 = _.findKey(n, (chr) => true);
				content.push(k2)
			})
			obj.push({name: k1,content: content})
		})
		return obj
	}
	componentDidUpdate(props) {
		let graph = this.buildGraph(EntityExtractStore.entity);
		this.entity = this.buildEntity(EntityExtractStore.entity);

		this.myChart = echarts.init(document.getElementById('main'));
		let option = {
			series: [
				{
					type: 'graph',
					layout: 'force',
					roam: true,
					symbolSize: 50,
					categories: [
						{
							name: '文本',
							itemStyle: {
								normal: {
									color: '#2ec7c9'
								}
							}
						},
						{
							name: '分类',
							itemStyle: {
								normal: {
									color: '#b6a2de'
								}
							}
						},
						{
							name: '关键词',
							itemStyle: {
								normal: {
									color: '#5ab1ef'
								}
							}
						}
					],
					edgeSymbol: ['none', 'arrow'],
					edgeSymbolSize: 6,
					force: {
						repulsion: 500,
					},
					draggable: true,
					lineStyle: {
						normal: {
							width: 1,
						}
					},
					label: {
						normal: {
							show: true,
							textStyle: {
								color: '#222'
							}
						}
					},
					data: graph.nodes,
					links: graph.links
				}
			]
		};
		this.myChart.setOption(option);
	}

	refresh(name) {
		EntityExtractStore.currentItem = name
		this.myChart.dispose();
	}

	render() {
		let {item} = this.props;
		let {isFetching, currentItem} = EntityExtractStore
		let n = 0
		let num = function () {
			n===3?n=1:n++
			return n
		}
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr">
						{itemName.map((item, i) => (
								<span onClick={this.refresh.bind(this, item.name)} key={i}
									  className={currentItem === item.name ? 'onsp' : ''}>{item.name}</span>
							)
						)}
					</div>
				</div>
				{
					isFetching ? <Loading/> : (currentItem == '图形展示' ? <div style={{height:500}} id="main"></div> :
							<div style={{height:500}} className="scm">
								<div id="main" style={{display: 'none'}}></div>
								{this.entity.map((item,index)=>(
									<dl className={'dl' + num()} key={index}>
										<dt>{item.name}</dt>
										{item.content.map((items,i)=>(
												<dd key={i}>{items}</dd>
											))}
									</dl>
								))}
							</div>
					)
				}
			</div>
		)
	}
}
