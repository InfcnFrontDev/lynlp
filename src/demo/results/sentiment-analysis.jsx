import React from 'react';
import echarts from 'echarts';
import {sentiment} from '../data/sentiment-analysis';

/**
 * 情感分析
 */
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
		fetch('http://192.168.10.58:8085/api/NlpDemoApi/sentiment?content=生活可以复杂，也可以简单，看我们拥有怎样的心态。简单就真实，平淡就从容。没有虚伪，不戴面具；不去张扬，甘愿淡泊。荣也好，辱也罢，一切好的不好的，不过是岁月变迁的填充物，到最后，都是过去。相信人生没有毫无意义的经历。上天给我们困难，是让我们看透人心；给我们失败，是教会我们如何更好地成功；给我们孤独，是让我们学会慎独和反省。此处失，他处得，有人让你哭了，就会有人让你笑，这是上天对待每一个人的公平。人生路上不是每轮艳阳都暖人，不是每片云彩都下雨。一些事，想开自然微笑，看透肯定放下。人在旅途，心宽，才是海阔天空。心怀善念，能利人；心怀感恩，能利己。学会换位，人生才有和谐；知道感恩，岁月才有温暖。活着，就是一场修行，而真正的修行，不在一张能言的嘴上，而在一颗向善的心里。人生之光，是一颗宽容的心；岁月之好，是一份随缘的爱。')
			.then(res=>res.json())
			.then(res=>{
				this.zheng=[];
				this.fu=[];
				this.zheng_value=0;
				this.fu_value=0;
				for(let i=0;i<res.obj.length;i++){
					for (var val in res.obj[i]){
						console.log(val)
						let now_sen = sentiment[val.trim()];
						now_sen.value = res.obj[i][val];
						if(now_sen.type==1){
							this.zheng_value+=now_sen.value;
							this.zheng.push(now_sen);
						}else{
							this.fu_value+=now_sen.value;
							this.fu.push(now_sen);
						}
					}
				}

				this.setState({
					// data:this.zheng.concat(this.fu),
					// data:[
					// 	{value:3355, name:'直达', selected:true},
					// 	{value:679, name:'营销广告'},
					// 	{value:1548, name:'搜索引擎'}
					// ],
					data:this.zheng.concat(this.fu),
					data_type:[
						{value:this.zheng_value, name:'正',itemStyle:{
							normal:{
								color:'#FF7F50',
							}
						}, selected:true},
						{value:this.fu_value, name:'负',itemStyle:{
							normal:{
								color:'#87CEEB',
							}
						},},
					],
					zheng:this.zheng,
					fu:this.fu
				})
			})

	}

	componentDidUpdate() {
		var myChart = echarts.init(document.getElementById('qgfxbt'));
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			series: [
				{
					name:'访问来源',
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
					data:this.state.data_type
				},
				{
					name:'访问来源',
					type:'pie',
					radius: ['35%', '55%'],
					data:this.state.data
				}
			],
			animation:false,
		};

		myChart.setOption(option);
	}

	render() {
		let {item} = this.props;
		let {qfm} = this.state;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<div className="cf qfmkj">
					<div className="fl qfmlb">
						{this.showList(this.state.zheng)}
					</div>
					<div className="fl qfmlb">
						{this.showList()}
					</div>
					<div className="fl qfmbt" id="qgfxbt"></div>
				</div>
			</div>
		)
	}

	showList(data){
		data =['zheng','jf','dd']
		var list = data.map((info,i)=>{
			return (
				<div className="cf qfmoneline">
					<div className="fl qfmlx" style={{}}>{info}</div>
					<div className="fl qfmsz">34.00</div>
					<div className="fl qfmbfb">(30.36%)</div>
				</div>
			)
		})
		return (
			<div>
				<div className="cf">
					<div className="fl qfmlx" style={{}}>正</div>
					<div className="fl qfmsz">34.00</div>
					<div className="fl qfmbfb">(30.36%)</div>
				</div>
				<div className="qfmlx-part">
					{list}
				</div>
			</div>
		)
	}
}
