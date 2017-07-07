import React from 'react';
import echarts from 'echarts';
import {observer} from "mobx-react";
import sentimentAnalysisStore from "../../mobx/sentiment-analysis-store"

/**
 * 情感分析
 */
@observer
export default class SentimentAnalysis extends React.Component {
	state = {
		data: [
			{value:335, name:'直达', selected:true},
			{value:679, name:'营销广告'},
			{value:1548, name:'搜索引擎'}
		],
		data_type: [
			{value:335, name:'正', selected:true},
			{value:679, name:'负'},
		],
		zheng:[],
		fu:[]
	}

	componentWillMount(){
		sentimentAnalysisStore.fetchData('4日16时许，一段内容为长沙市望城区靖港镇干部受灾群众发生争执的视频在群内传播。当晚19时许，微博上出现一则“长沙市望城区靖港镇干部呷着槟榔叼着烟，女干部撑着伞抗洪救灾”的贴文并附相关视频，随后在网上迅速转发传播。女干部撑伞嚼槟榔被警告7月5日晚，湖南省长沙市望城区网络宣传管理办公室官方微博发布《关于防汛期间靖港镇干部涉网舆情事件的调查情况说明》，经由望城区纪委成立调查组调查核实，在该事件处理过程中，靖港镇纪委书记邓治国一直在与社区居民高大立、高志立进行解释说明，并无人为其撑伞;靖港镇芦江社区刘壮确实存在抽烟嚼槟榔行为，也没有积极主动开展劝解工作，且该视频前一分半钟左右时间由一女性帮其撑伞。据刘壮本人回忆，因当天下雨，社区临聘人员熊丹在其不知情的情况下帮其撑伞，刘壮发现有人帮其撑伞后马上自己打伞。')
		// fetch('http://192.168.10.58:8085/api/NlpDemoApi/sentiment?content=')
		// 	.then(res=>res.json())
		// 	.then(res=>{
		// 		this.zheng=[];
		// 		this.fu=[];
		// 		this.zheng_value=0;
		// 		this.fu_value=0;
		// 		for(let i=0;i<res.obj.length;i++){
		// 			for (var val in res.obj[i]){
		// 				console.log(val)
		// 				let now_sen = sentiment[val.trim()];
		// 				now_sen.value = res.obj[i][val];
		// 				if(now_sen.type==1){
		// 					this.zheng_value+=now_sen.value;
		// 					this.zheng.push(now_sen);
		// 				}else{
		// 					this.fu_value+=now_sen.value;
		// 					this.fu.push(now_sen);
		// 				}
		// 			}
		// 		}
        //
		// 		this.setState({
		// 			data:this.zheng.concat(this.fu),
		// 			data_type:[
		// 				{value:this.zheng_value, name:'正',itemStyle:{
		// 					normal:{
		// 						color:'#FF7F50',
		// 					}
		// 				}, selected:true},
		// 				{value:this.fu_value, name:'负',itemStyle:{
		// 					normal:{
		// 						color:'#87CEEB',
		// 					}
		// 				},},
		// 			],
		// 			zheng:this.zheng,
		// 			fu:this.fu
		// 		})
		// 	})

	}

	componentDidUpdate(props) {
		let {data,data_type} = sentimentAnalysisStore;
		console.log(Array.prototype.slice.call(data, 0));
		let data1 = Array.prototype.slice.call(data, 0);
		let data2 = Array.prototype.slice.call(data_type, 0);
		var myChart = echarts.init(document.getElementById('qgfxbt'));
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			series: [
				{
					name:'情感分析',
					type:'pie',
					selectedMode: 'single',
					radius: [0, '22%'],

					label: {
						normal: {
							position: 'inner'
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:data2
				},
				{
					name:'情感分析',
					type:'pie',
					radius: ['35%', '55%'],
					data:data1
				}
			],
			animation:false,
		};

		myChart.setOption(option);
	}

	render() {
		let {item} = this.props;
		let {zheng,fu,isFetching} = sentimentAnalysisStore;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<div className="cf qfmkj">
					{/*{isFetching ? 'is fetching.': (*/}
						{/**/}
					{/*)}*/}
					<div className="fl cf">

						<div className="fl qfmlb">
							{this.showList(Array.prototype.slice.call(zheng, 0),1)}
						</div>
						<div className="fl qfmlb">
							{this.showList(Array.prototype.slice.call(fu, 0),2)}
						</div>
					</div>
					<div className="fl qfmbt" id="qgfxbt"></div>

				</div>
			</div>
		)
	}

	showList(data,num){
		let {zheng_value,fu_value} = sentimentAnalysisStore;
		let all = (zheng_value+fu_value)/100;
		var list = data.map((info,i)=>{
			return (
				<div key={i} className="cf qfmoneline">
					<div className="fl qfmlx" style={{backgroundColor:info.itemStyle.normal.color}}>{info.name}</div>
					<div className="fl qfmsz">{info.value}</div>
					<div className="fl qfmbfb">({(info.value/all).toFixed(2)}%)</div>
				</div>
			)
		})
		return (
			<div>
				<div className="cf">
					<div className="fl qfmlx" style={num==1?{backgroundColor:'#FF7F50'}:{backgroundColor:'#87CEEB'}}>{num==1?'正':'负'}</div>
					<div className="fl qfmsz">{num==1?zheng_value:fu_value}</div>
					<div className="fl qfmbfb">{num==1?(zheng_value/all).toFixed(2):(fu_value/all).toFixed(2)}%</div>
				</div>
				<div className="qfmlx-part">
					{list}
				</div>
			</div>
		)
	}
}
