import React from "react";
import {observer} from "mobx-react";
import echarts from "echarts";
import EntityExtractStore from "../../mobx/entity-extract-store";
import contentStore from "../../mobx/content-store";
import Loading from "../loading";
import _ from "lodash"

/**
 * 实体抽取
 */
@observer
export default class EntityExtract extends React.Component {
	componentWillMount() {
		EntityExtractStore.fetchData(contentStore.content)
	}

	componentDidUpdate(props) {

		var nodes = [{
			category: 0,
			name: '文本',
		}], links = [], index = 1, index1 = 10;

		let entitys = EntityExtractStore.entity

		console.log(entitys);

		_.forEach(entitys, (value, key)=>{
			nodes.push({
				category: 1,
				name: key,
			});
			links.push({
				source: '文本', target: key, weight: 1
			})


			_.forEach(value, (n)=>{
				console.log(n)
				nodes.push({
					category: 2,
					name: n,
				});
				links.push({
					source: key, target: n, weight: 1
				})
			})
		})

		console.log(nodes, links);


		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			series: [
				{
					type: 'graph',
					layout: 'force',
					symbolSize: 50,
					roam: true,
					categories: [
						{
							name: 'A',
							itemStyle: {
								normal: {//'#2ec7c9','#b6a2de','#5ab1ef'
									color: '#2ec7c9'
								}
							}
						},
						{
							name: 'B',
							itemStyle: {
								normal: {
									color: '#b6a2de'
								}
							}
						},
						{
							name: 'C',
							itemStyle: {
								normal: {
									color: '#5ab1ef'
								}
							}
						}
					],
					edgeSymbol: ['circle', 'arrow'],
					edgeSymbolSize: 5,
					force: {
						repulsion: 300,
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
					data: nodes,
					links: links
				}
			]
		};
		myChart.setOption(option);
	}

	render() {
		let {item} = this.props;
		let {isFetching} = EntityExtractStore
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				{
					isFetching ? <Loading/> : (<div id="main" style={{height: 600}}></div>)
				}

			</div>
		)
	}
}
