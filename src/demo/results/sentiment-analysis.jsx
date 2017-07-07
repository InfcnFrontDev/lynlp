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
		sentimentAnalysisStore.fetchData('4日16时许，一段内容为长沙市望城区靖港镇干部与受灾群众发生争执的视频在群内传播。当晚19时许，微博上出现一则“长沙市望城区靖港镇干部呷着槟榔叼着烟，女干部撑着伞抗洪救灾”的贴文并附相关视频，随后在网上迅速转发传播。女干部撑伞嚼槟榔被警告7月5日晚，湖南省长沙市望城区网络宣传管理办公室官方微博发布《关于防汛期间靖港镇干部涉网舆情事件的调查情况说明》，经由望城区纪委成立调查组调查核实，在该事件处理过程中，靖港镇纪委书记邓治国一直在与社区居民高大立、高志立进行解释说明，并无人为其撑伞;靖港镇芦江社区刘壮确实存在抽烟嚼槟榔行为，也没有积极主动开展劝解工作，且该视频前一分半钟左右时间由一女性帮其撑伞。据刘壮本人回忆，因当天下雨，社区临聘人员熊丹在其不知情的情况下帮其撑伞，刘壮发现有人帮其撑伞后马上自己打伞。')
		// SentimentAnalysisStore.fetchData('生活可以复杂，也可以简单，看我们拥有怎样的心态。简单就真实，平淡就从容。没有虚伪，不戴面具；不去张扬，甘愿淡泊。荣也好，辱也罢，一切好的不好的，不过是岁月变迁的填充物，到最后，都是过去。相信人生没有毫无意义的经历。上天给我们困难，是让我们看透人心；给我们失败，是教会我们如何更好地成功；给我们孤独，是让我们学会慎独和反省。此处失，他处得，有人让你哭了，就会有人让你笑，这是上天对待每一个人的公平。人生路上不是每轮艳阳都暖人，不是每片云彩都下雨。一些事，想开自然微笑，看透肯定放下。人在旅途，心宽，才是海阔天空。心怀善念，能利人；心怀感恩，能利己。学会换位，人生才有和谐；知道感恩，岁月才有温暖。活着，就是一场修行，而真正的修行，不在一张能言的嘴上，而在一颗向善的心里。人生之光，是一颗宽容的心；岁月之好，是一份随缘的爱。')
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
