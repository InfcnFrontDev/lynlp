import React from "react";
import WordSegmentationStore from "../../mobx/word-segmentation-store"
import "../../../styles/word.scss";
import {observer} from "mobx-react";

/**
 * 分词标注
 */
@observer
export default class WordSegmentation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content:'北京英富森软件股份有限公司是在北京市海淀区注册的高新技术企业、双软企业。“信息中国”（information china简称“infcn” ）是“英富森”的核心目标与战略。英富森公司的成立依托于凌云实验室的部分成果和理念，主要以信息管理与信息服务、知识管理与知识服务为基本方向，侧重于信息的整合、组织、发现和利用。通过先进的信息技术和服务理念，帮助行业客户建立企业级信息服务与知识服务平台，实现客户的企业级信息与知识的应用与发现。 公司来源于信息行业，依托于高校和科研院所，服务于行业客户。英富森凝聚了一支专业、高效、快乐、融洽的优秀团队，锻造出了一支服务型、管理型、创新型与开拓型的团队。',
			nlp:true,
			to:true,
			index:true,
			base:true
		};

	}

	componentWillMount(){
		let content=this.state.content
		console.log(content);
		this.setState({
			nlp:false
		})
		WordSegmentationStore.fetchData('nlp',content,'北京')
	}

	render() {
		let {item} = this.props;
		let terms=WordSegmentationStore.nlp;
		var arr=[];
		terms.map(item =>arr.push(item.natureStr.substr(0,1)));
		Array.prototype.unique1 = function(){
			var res = [this[0]];
			for(var i = 1; i < this.length; i++){
				var repeat = false;
				for(var j = 0; j < res.length; j++){
					if(this[i] == res[j]){
						repeat = true;
						break;
					}
				}
				if(!repeat){
					res.push(this[i]);
				}
			}
			return res;
		}
		arr=arr.unique1();
		let cixing=[
			{
				ci: '名词',
				str:'n'

			},
			{
				ci: '形容词',
				str:'a'
			},
			{
				ci: '动词',
				str:'v'
			},
			{
				ci: '介词',
				str:'p'
			},
			{
				ci: '助词',
				str:'u'
			},
			{
				ci: '标点符号',
				str:'w'
			},
			{
				ci: '数词',
				str:'m'
			},
			{
				ci: '叹词',
				str:'e'
			},
			{
				ci: '连词',
				str:'c'
			},
			{
				ci: '区别词',
				str:'b'
			},
			{
				ci: '量词',
				str:'q'
			},
			{
				ci: '后缀',
				str:'k'
			}
		]
		let cixingArr=[];
		for(var i=0; i<arr.length; i++){
			for(var j=0; j<cixing.length; j++){
				if(cixing[j].str==arr[i]){
					cixingArr.push({
						ci:cixing[j].ci,
						str:cixing[j].str
					})

				}

			}

		}
		let cixingHtml=cixingArr.map(item => <dd key={item.str} className={item.str}>{item.ci}</dd>);
		let html = terms.map((item,index)=> <dd key={index} className={item.natureStr}>{item.name}</dd>);
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-2">
						<span className={this.state.nlp?'':"onsp"} onClick={()=>this.nlpHandle()} >NLP分词</span>
						<span className={this.state.to?'':"onsp"} onClick={()=>this.toHandle()} >精准分词</span>
						<span className={this.state.index?'':"onsp"} onClick={()=>this.indexHandle()} >索引分词</span>
						<span className={this.state.base?'':"onsp"} onClick={()=>this.baseHandle()} >细颗粒度分词</span>
					</div>
				</div>
				<div className="fcm">
					<div className="col-xs-3" >
						<div style={{padding:10,width:'auto',height:'auto'}}>
							<h1 style={{color:'#979797',fontSize:16,marginBottom:20}}>词性类别图示：</h1>
							<dl className="words">
								{cixingHtml}
							</dl>

						</div>

					</div>
					<div className="col-xs-7" style={{height:450, overflow:'hidden',overflowY:'scroll'}}>
						<div style={{padding:10,width:'auto',height:'auto'}}>
							<dl className="words">
								{html}
							</dl>
						</div>
					</div>
					<div className="col-xs-2">
						<h1 style={{color:'#979797',fontSize:16,marginBottom:20}}>新词发现：</h1>
						<dl className="words" style={{height:150}}>
							<dd className="yell">蔡英文</dd>
							<dd className="yell">语言魔术</dd>
							<dd className="yell">哈哈</dd>
						</dl>
						<h1 style={{color:'#979797',fontSize:16,marginBottom:20}}>用户自定义词：</h1>
						<textarea style={{height:100}} />
						<a href="#" className="tj-a fr" >添加</a>
					</div>
				</div>
			</div>
		)
	}
	nlpHandle(){
		this.setState({
			nlp:false,
			to:true,
			index:true,
			base:true
		})
		let content=this.state.content
		WordSegmentationStore.fetchData('nlp',content,'北京')
	}
	toHandle(){
		this.setState({
			nlp:true,
			to:false,
			index:true,
			base:true
		})
		let content=this.state.content
		WordSegmentationStore.fetchData('to',content,'北京')
	}
	indexHandle(){
		this.setState({
			nlp:true,
			to:true,
			index:false,
			base:true
		})
		let content=this.state.content
		WordSegmentationStore.fetchData('index',content,'北京')
	}
	baseHandle(){
		this.setState({
			nlp:true,
			to:true,
			index:true,
			base:false
		})
		let content=this.state.content
		WordSegmentationStore.fetchData('base',content,'北京')
	}
}
