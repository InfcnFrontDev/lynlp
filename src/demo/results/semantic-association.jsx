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
		this.state = {
			current:semanticAssociationStore.changeCurrent ,
		};
		this.now=1;
	}
	componentWillUpdate(nextProps){
		if(this.now==semanticAssociationStore.changeCurrent){
			semanticAssociationStore.fetchDataGraph(semanticAssociationStore.keyItem);
			this.setState({
				current:0
			});
			this.now++;
		}
	}

	/*componentDidUpdate(){
		let {graph}= semanticAssociationStore;
		if(graph.nodes){
			this.ygTu(graph)
		}
	}*/
	itemNav(index){
		return index === this.state.current? 'spon' : '';
	}
	click(index,item){
		this.setState({
			current: index,
		});
		semanticAssociationStore.fetchDataGraph(item);
	}
	ygTu(data){
		let node=[];
		let obj={};
		let arr={};
		data.links.map((item,index)=>{
			if(item.from==this.key){
				arr[item.to]=1;
			}
		});

		data.nodes.map((item,index)=>{
				obj={
					id:index==0?'关键词':item.name,
					category:index==0?0:(arr[item.name]?1:2),
					name:index==0?'关键词':item.name,
					symbolSize: 40
				};

			node.push(obj)
		});
		let links=[];
		let lik={
			target: '',
			source:''
		};
		data.links.map((item,index)=>{
			if(item.from==data.nodes[0].name){
				lik={
					target: item.to,
					source:'关键词'
				};
			}else{
				lik={
					target: item.to,
					source:item.from
				};
			}

			links.push(lik)
		});
		return {
			node1:node,
			link1:links
		}

		/*var option = {
			legend: {
				show: true,
				data: [
					{
						name: '关键词' ,
						icon: 'rect'//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
					},
					{
						name: '关联词',
						icon: 'roundRect'
					},
					{
						name: '相关联词',
						icon: 'circle'
					}
				]
			},
			series: [{
				type: 'graph',
				layout: 'force',
				roam: true,
				categories: [
					{
						name: '关键词',
						symbol: 'rect',
						itemStyle: {
							normal: {
								color: '#2ec7c9'
							}
						}
					}, {
						name: '关联词',
						itemStyle: {
							normal: {
								color: '#b6a2de'
							}
						}
					}, {
						name: '相关联词',
						itemStyle: {
							normal: {
								color: '#5ab1ef'
							}
						}
					}],
				edgeSymbol: ['none', 'arrow'],
				edgeSymbolSize: 6,
				force: {
					repulsion: 250
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
				data:node,
				links:links
			}],
		};
		var dom_yg =document.getElementById('yg');
		if(dom_yg){
			var myChart = echarts.init(dom_yg);
			/!*if(this.key==node[0].name){
				myChart.setOption(option)
			}*!/
			myChart.setOption(option)
		}*/
	}
	render() {
		let {recommend,graph,fetching,fetchingTu}=semanticAssociationStore;
		let semanticKey=_.keys(recommend);
		let {current}=this.state;
		this.key=semanticKey[current];
		let data=recommend[this.key];
		let recommend_arr =[];
		for(var i in data){
			recommend_arr.push(data[i])
		};
		let objc;
		if(graph.links){
			objc=this.ygTu(graph);
		}

		let box=(null);
		if(!fetching){
			box=(
				<div>
					<div className="ygt" >
						关键词：
						{fetching?null:semanticKey.map((item,index)=> {
							return <span  key={index} onClick={ () => {this.click(index,item)} } className={ this.itemNav(index) }>{item}</span>
						})}
					</div>
					<div className="ygm cf">
						<div className="yg-l fl" style={{float:'left'}}>
							<table className="cptab">
								<tbody>
								<tr>
									<th>词名</th>
									<th>相关性</th>
								</tr>
								{recommend_arr.map((item,index)=>{return <tr key={index}>
									<td>{item.name}</td>
									<td>{item.score.toFixed(2)}</td>
								</tr>})}
								</tbody>
							</table>
						</div>
						{fetchingTu?<Loading />:<Echart data={['关键词','相关词','相关联词']} nodes={objc.node1} links={objc.link1} height={400} width={650} className="fl" />}
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
