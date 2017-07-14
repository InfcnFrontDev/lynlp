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
						name:data[0] ,
						icon: 'rect'
					},
					{
						name: data[1],
						icon: 'roundRect'
					},
					{
						name:data[2],
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
			if(this.myChart){
				this.myChart.setOption(option);
			}



	}
	render() {
		let {width,height,className}=this.props;
		return (
			<div ref={c => this._echart = c} style={{height:height,width:width}} className={className}></div>
		)
	}
}
Echart.propTypes = {
	data:React.PropTypes.array,
	nodes:React.PropTypes.array,
	links:React.PropTypes.array,
	height:React.PropTypes.number,
	/*width:React.PropTypes.number,
	className:React.PropTypes.string,*/
};



