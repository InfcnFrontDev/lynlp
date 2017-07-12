import React from 'react';
import {observer} from "mobx-react";
import contentStore from '../../mobx/content-store'
import semanticAssociationStore from '../../mobx/semantic-association-store'
import _ from "lodash";
import Loading from "../loading";
import echarts from "echarts";
/**
 * 语义关联
 */
@observer
export default class SemanticAssociation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			item1:''
		};


	}
	componentWillUpdate(nextProps){
		if(this.state.item1!=semanticAssociationStore.keyItem&&semanticAssociationStore.keyItem!=""){
			this.setState({
				item1:semanticAssociationStore.keyItem
			})
			semanticAssociationStore.fetchDataGraph(semanticAssociationStore.keyItem);

		}
	}
	itemNav(index){
		return index === this.state.current ? 'spon' : '';
	}
	click(index,item){
		this.setState({
			current: index,
		})
		semanticAssociationStore.fetchDataGraph(item);


	}
	ygTu(data){



		/*let nodes = [];
		let links = [];
		let constMaxDepth = 2;
		let constMaxChildren = 7;
		let constMinChildren = 4;
		let constMaxRadius = 10;
		let constMinRadius = 2;

		function rangeRandom(min, max) {
			return Math.random() * (max - min) + min;
		}

		function createRandomNode(depth) {
			let node = {
				name : 'NODE_' + nodes.length,
				value : rangeRandom(constMinRadius, constMaxRadius),
				// Custom properties
				id : nodes.length,
				depth : depth,
				category : depth === constMaxDepth ? 0 : 1
			}
			nodes.push(node);

			return node;
		}

		function forceMockThreeData() {
			var depth = 0;
			var rootNode = {
				name : 'ROOT',
				value : rangeRandom(constMinRadius, constMaxRadius),
				// Custom properties
				id : 0,
				depth : 0,
				category : 2
			}
			nodes.push(rootNode);

			function mock(parentNode, depth) {
				var nChildren = Math.round(rangeRandom(constMinChildren, constMaxChildren));

				for (var i = 0; i < nChildren; i++) {
					var childNode = createRandomNode(depth);
					links.push({
						source : parentNode.id,
						target : childNode.id,
						weight : 1
					});
					if (depth < constMaxDepth) {
						mock(childNode, depth + 1);
					}
				}
			}

			mock(rootNode, 0);
		}

		forceMockThreeData();






		/!*let	option = {
                title : {
                    text: '某地区蒸发量和降水量',
                    subtext: '纯属虚构'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['蒸发量','降水量']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'蒸发量',
                        type:'bar',
                        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'降水量',
                        type:'bar',
                        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        markPoint : {
                            data : [
                                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            };*!/


		var myChart = echarts.init(document.getElementById('ygtu'));
			myChart.setOption(option);

*/
	}
	render() {
		let data=semanticAssociationStore.recommend;
		let semanticKey=_.keys(data);
		let {current}=this.state;
		let key=semanticKey[current];
		let recommend=data[key];
		let recommend_arr =[];
		for(var i in recommend){
			recommend_arr.push(recommend[i])
		};
		let box=(null);
		if(!semanticAssociationStore.fetching){
			box=(
				<div>
					<div className="ygt" >
						关键词：
						{semanticAssociationStore.fetching?null:semanticKey.map((item,index)=> {
							return <span  key={index} onClick={ () => {this.click(index,item)} } className={ this.itemNav(index) }>{item}</span>
						})}
					</div>
					<div className="ygm cf">
						<div className="yg-l fl" style={{float:'left'}}>
							<table className="cptab">
								<tr>
									<th>词名</th>
									<th>相关性</th>
								</tr>
								{recommend_arr.map((item,index)=>{return <tr key={index}>
									<td>{item.name}</td>
									<td>{item.score}</td>
								</tr>})}
							</table>
						</div>
						<div id="ygtu" style={{width:650,height:400,float:'left'}}>{semanticAssociationStore.fetchingTu?<Loading/>:this.ygTu(semanticAssociationStore.graph)}</div>

					</div>
				</div>
			)
		}else {
			box = (
				<Loading/>
			)
		}
			return (
				<div className="m-hk">
					<div className="jpt cf">
						<h3 className="fl"><i>语义关联</i></h3>
					</div>
					<div className="ygBox">
						{box}
					</div>

				</div>
			)
		}


}
