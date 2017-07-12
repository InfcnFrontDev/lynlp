import React from 'react';
import {observer} from "mobx-react";
import echarts from 'echarts';

/**
 * 实体抽取
 */
@observer
export default class EntityExtract extends React.Component {
	componentDidMount(){
		var myChart = echarts.init(document.getElementById('main'));
		console.log(myChart)
		var graph = echarts.dataTool.gexf.parse(xml);
		var categories = [];
		for (var i = 0; i < 9; i++) {
			categories[i] = {
				name: '类目' + i
			};
		}
		graph.nodes.forEach(function (node) {
			node.itemStyle = null;
			node.value = node.symbolSize;
			node.symbolSize /= 1.5;
			node.label = {
				normal: {
					show: node.symbolSize > 30
				}
			};
			node.category = node.attributes.modularity_class;
		});
		option = {
			title: {
				text: 'Les Miserables',
				subtext: 'Default layout',
				top: 'bottom',
				left: 'right'
			},
			tooltip: {},
			legend: [{
				// selectedMode: 'single',
				data: categories.map(function (a) {
					return a.name;
				})
			}],
			animationDuration: 1500,
			animationEasingUpdate: 'quinticInOut',
			series : [
				{
					name: 'Les Miserables',
					type: 'graph',
					layout: 'none',
					data: graph.nodes,
					links: graph.links,
					categories: categories,
					roam: true,
					label: {
						normal: {
							position: 'right',
							formatter: '{b}'
						}
					},
					lineStyle: {
						normal: {
							color: 'source',
							curveness: 0.3
						}
					}
				}
			]
		};

		myChart.setOption(option);
	}
	render() {

		let {item} = this.props
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<div className="jfp" id="main">
				</div>
			</div>
		)
	}
}
