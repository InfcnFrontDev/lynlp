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
/*		let Data=[{"doc_count":137,"key":"教育"},{"doc_count":80,"key":"保险"},{"doc_count":65,"key":"社保"},{"doc_count":59,"key":"环保"},{"doc_count":48,"key":"房地产"},{"doc_count":38,"key":"政府信箱"},{"doc_count":37,"key":"劳动合同"},{"doc_count":28,"key":"养老保险"},{"doc_count":28,"key":"医疗保险"},{"doc_count":27,"key":"劳动保障"}]

		var nodes = [{
			name: '9898',
			value: 10,

		}]
		Data.map((item,index)=>{
			nodes.push({
					"name": item.key,
					"value": item.doc_count
				}
			)
		})

		var links=[];
		Data.map((item,index)=>{
			links.push({
					"source": item.key,
					"target":'9898',
					weight:1
				}
			)
		})

		//===================
	let	option = {
			tooltip : {
				trigger: 'item',
				formatter: '{a} : {b}'
			},
			series : [
				{
					type:'force',
					name : "主题关联",
					ribbonType: false,

					itemStyle: {
						normal: {
							label: {
								show: true,
								textStyle: {
									color: '#333'
								}
							},
							nodeStyle : {
								brushType : 'both',
								borderColor : 'rgba(255,215,0,0.4)',
								borderWidth : 1
							}
						},

					},
					minRadius : 15,
					maxRadius : 25,
					gravity: 1.1,

					draggable: false,
					linkSymbol: 'arrow',
					steps: 10,
					coolDown: 0.9,
					//preventOverlap: true,
					initial:[150,150],
					fixX:true,
					fixY:true,
					nodes:nodes,
					links:links
				}
			]
		};



		var myChart = echarts.init(document.getElementById('ygtu'));
		myChart.setOption(option);*/


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
