import React from "react";
import WordSegmentationStore from "../../mobx/word-segmentation-store"
import echarts from "echarts";
import {observer} from "mobx-react";
import _ from "lodash";
import Loading from "./loading";


/**
 * 词频统计
 */
@observer
export default class WordFrequency extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content:'北京英富森软件股份有限公司是在北京市海淀区注册的高新技术企业、双软企业。“信息中国”（information china简称“infcn” ）是“英富森”的核心目标与战略。英富森公司的成立依托于凌云实验室的部分成果和理念，主要以信息管理与信息服务、知识管理与知识服务为基本方向，侧重于信息的整合、组织、发现和利用。通过先进的信息技术和服务理念，帮助行业客户建立企业级信息服务与知识服务平台，实现客户的企业级信息与知识的应用与发现。 公司来源于信息行业，依托于高校和科研院所，服务于行业客户。英富森凝聚了一支专业、高效、快乐、融洽的优秀团队，锻造出了一支服务型、管理型、创新型与开拓型的团队。',
			graph:true,
			list:false

		};

	}
	componentWillMount(){
		let content=this.state.content
		WordSegmentationStore.fetchData('nlp',content,'北京')

	}

	groupArr(arr){
		let nounG=_.groupBy(arr,function(n){return n.name});
		let nounS=_.sortBy(nounG,'length');
		let nounArr=[];
		for(let i=nounS.length-1;i>=0;i--) {
			nounArr.push(nounS[i]);
		}
		let nounA=nounArr.slice(0,10);
		let nArr=[];
		for(let i=0; i<nounA.length; i++){
			nArr.push({
				name:nounA[i][0].name,
				length:nounA[i].length
			})
		}
		return nArr;
	}
	graphShow(){
		this.setState({
			graph:true,
			list:false
		})

	}
	listShow(){
		this.setState({
			graph:false,
			list:true
		})
	}
	componentDidUpdate(){
		let terms=WordSegmentationStore.nlp;

		let cbb=_.groupBy(terms.$mobx.values,function(n){return n.natureStr.substr(0,1)});

		let noun=cbb.n;
		let verb=cbb.v;
		let adjective=cbb.a;
		let nArr=this.groupArr(noun);
		let vArr=this.groupArr(verb);
		let aArr=this.groupArr(adjective);
		this.nounHtml=null;
		this.verbHtml=null;
		this.adjectiveHtml=null;
		if(!this.state.graph){
			this.chartHtml(nArr,'ming','#488fce')
			this.chartHtml(vArr,'dong','#ff9900')
			this.chartHtml(aArr,'xing','#67ccaa')


		}
	}
	chartHtml(nArr,str,color){
		let data1=[];
		nArr.map(item=> data1.push(item.name));
		let data2=[];
		nArr.map(item=> data2.push(item.length));
		data1=data1.reverse()
		data2=data2.reverse()

		var option = {


			grid: {
				left: '1%',
				right: '3%',
				bottom: '1%',
				top:'1%',
				containLabel: true
			},
			color:[color]
			,
			xAxis: {
				type: 'value',
				boundaryGap: [0, 1]
			},
			yAxis: {
				type: 'category',
				data:data1
			},
			series: [
				{
					type: 'bar',
					data: data2
				}

			]
		};

		var myChart = echarts.init(document.getElementById(str));
		myChart.setOption(option);
	}
	editHtml(nArr){
		let ccc=nArr.map((item,index)=> <tr key={index}><td>{item.name}</td><td>{item.length}</td></tr>);
		let nounHtml=(
			<table className="cptab">
				<tbody>
				<tr>
					<th>词名</th>
					<th>词频</th>
				</tr>
				{ccc}
				</tbody>
			</table>
		)
		return nounHtml;
	}


	render() {
		let {item} = this.props;
		let {nlp,isFetching}=WordSegmentationStore;

		let cbb=_.groupBy(nlp.$mobx.values,function(n){return n.natureStr.substr(0,1)});
		let noun=cbb.n;
		let verb=cbb.v;
		let adjective=cbb.a;
		let nArr=this.groupArr(noun);
		let vArr=this.groupArr(verb);
		let aArr=this.groupArr(adjective);

		if(this.state.graph){
			this.nounHtml=this.editHtml(nArr);
			this.verbHtml=this.editHtml(vArr);
			this.adjectiveHtml=this.editHtml(aArr);
		}





			return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-3">
						<span className={this.state.graph?"onsp":''} onClick={()=>this.graphShow()}>图形展示</span>
						<span className={this.state.list?"onsp":''} onClick={()=>this.listShow()}>列表展示</span>
					</div>
				</div>
				{isFetching?<Loading/>:
					<div className="cpm cf" style={{display:'block'}}>
						<div className="cp-1 fl">
							<h3 className="h3-1">名词</h3>

							{this.state.graph?this.nounHtml:(
								<div style={{width:'100%',height:320}} id="ming">

								</div>
							)}


						</div>
						<div className="cp-2 fl" >
							<h3 className="h3-1">动词</h3>
							{this.state.graph?this.verbHtml:(
								<div id="dong" style={{width:'100%',height:320}}>

								</div>
							)}


						</div>
						<div className="cp-3 fl">
							<h3 className="h3-1">形容词</h3>
							{this.state.graph?this.adjectiveHtml:(
								<div style={{width:'100%',height:320}} id="xing">

								</div>
							)}


						</div>
					</div>
				}
				<div className="cpm cf">
					<div className="cp-1 fl">
						<h3 className="h3-1">名词<img src="img/cpt-4.png"/></h3>
						<img src="img/cpt-1.png"/>
					</div>
					<div className="cp-2 fl">
						<h3 className="h3-1">动词<img src="img/cpt-4.png"/></h3>
						<img src="img/cpt-2.png"/>
					</div>
					<div className="cp-3 fl">
						<h3 className="h3-1">形容词<img src="img/cpt-4.png"/></h3>
						<img src="img/cpt-3.png"/>
					</div>
				</div>
			</div>
		)
	}

}
