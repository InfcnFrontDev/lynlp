import React from "react";
import echarts from "echarts";
import '../../common/macarons';

/**
 * 实体抽取
 */
export default class Echart extends React.Component {
	componentDidMount() {
		let {data,nodes,links} = this.props
		this.myChart = echarts.init( this._echart);
		let option = {
			legend: {
				show: true,
				data: [
					{
						name: '文本' ,
						icon: 'rect'
					},
					{
						name: '分类',
						icon: 'roundRect'
					},
					{
						name: '关键词',
						icon: 'circle'
					}
				]
			},
			series: [{
				type: 'graph',
				layout: 'force',
				roam: true,
				symbolSize: 50,
				categories: [
					{
						name: data[0],
						itemStyle: {
							normal: {
								color: '#2ec7c9'
							}
						}
					},
					{
						name: data[1],
						itemStyle: {
							normal: {
								color: '#b6a2de'
							}
						}
					},
					{
						name: data[2],
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
				data: nodes,
				links: links
			}]
		};
		this.myChart.setOption(option);
	}
	render() {
		return (
			<div className="echart" ref={c => this._echart = c} style={{height: this.props.height}}></div>
		)
	}
}
Echart.propTypes = {
	data:React.PropTypes.array,
	nodes:React.PropTypes.array,
	links:React.PropTypes.array,
	height:React.PropTypes.number,
};



