import React from 'react';
import {observer} from "mobx-react";
import * as d3 from 'd3';
import echarts from 'echarts';
import EntityExtractStore from "../../mobx/entity-extract-store";
import contentStore from "../../mobx/content-store";
import Loading from "../loading";

/**
 * 实体抽取
 */
const itemName = [{'name': '图形展示'}, {'name': '列表展示'}]

@observer
export default class EntityExtract extends React.Component {


	componentWillMount() {
		EntityExtractStore.fetchData(contentStore.content)
	}

	componentDidUpdate(props) {

		var data = [{
			id: 0,
			category: 0,
			name: 'root',
			value: 20,
			symbolSize: 80
		}], links = [], index = 1, index1 = 10
		let entityData = EntityExtractStore.entity

		function obj(val, k) {
			val.forEach(function (v) {
				var obj3 = {}, obj4 = {}
				obj3.id = index1++
				obj3.category = 2
				obj3.name = Object.keys(v)[0]
				obj3.value = 20
				obj3.symbolSize = 60
				obj4.source = index++
				obj4.target = k
				data.push(obj3)
				links.push(obj4)

			})
		}

		Object.keys(entityData).forEach(function (key) {
			var obj1 = {}, obj2 = {}
			obj1.id = index++
			obj1.category = 1
			obj1.name = key
			obj1.value = 20
			obj1.symbolSize = 70
			obj2.source = index - 1
			obj2.target = 0
			data.push(obj1)
			links.push(obj2)
			obj(entityData[key], index - 1)
		})

		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			legend: {
				show: true,
				data: [
					{
						name: 'root',
						icon: 'rect'//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'

					},
					{
						name: '实体类型',
						icon: 'roundRect'
					},
					{
						name: '实体内容',
						icon: 'circle'
					}
				]
			},
			series: [{
				type: 'graph', //关系图
				name: "实体抽取", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
				layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
				force: {
					repulsion: 300,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
					gravity: 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
					edgeLength: 80,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
					layoutAnimation: true
				},
				edgeSymbol: ['none', 'none'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
				edgeSymbolSize: 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
				itemStyle: {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
					normal: { //默认样式
						label: {
							show: true
						},
						borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
						borderWidth: 0, //图形的描边线宽。为 0 时无描边。
						opacity: 1
						// 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5

					},
					emphasis: {//高亮状态

					}
				},
				categories: [
					{
						name: 'root',
						symbol: 'rect',
						label: { //标签样式
						}
					}, {
						name: '实体类型',
						symbol: 'rect'
					}, {
						name: '实体内容',
						symbol: 'roundRect'
					}],
				data: data,
				links: links,
			}],
			lineStyle: { //==========关系边的公用线条样式。
				normal: {
					color: 'pink',
					width: '5',
					type: 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
					curveness: 0, //线条的曲线程度，从0到1
					opacity: 1
				},
				emphasis: {//高亮状态

				}
			},
			label: { //=============图形上的文本标签
				normal: {
					show: true,//是否显示标签。
					position: 'inside',//标签的位置。['50%', '50%'] [x,y]
					textStyle: { //标签的字体样式
						color: '#cde6c7', //字体颜色
						fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
						fontWeight: 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
						fontFamily: 'sans-serif', //文字的字体系列
						fontSize: 12, //字体大小
					}
				},
				emphasis: {//高亮状态

				}
			},
		}
		myChart.setOption(option);
	}

	refresh(name){
		EntityExtractStore.currentItem = name
	}

	render() {
		let {item} = this.props;
		let {isFetching,currentItem} = EntityExtractStore
		let self = this
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr">
						{itemName.map((item, i) => {
							return (
								<span onClick={this.refresh.bind(this,item.name)} key={i} className={currentItem === item.name ? 'onsp' : ''}>{item.name}</span>
							)
						})}
					</div>
				</div>
				{
					currentItem == '图形展示' ?<div id="main" style={{height: 600}}></div> : <div style={{height: 600}}></div>
				}

			</div>
		)
	}
}
