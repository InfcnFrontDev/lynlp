import React from "react";
import WordSegmentationStore from "../../mobx/word-segmentation-store"
import "../../../styles/word.scss";
import {observer} from "mobx-react";
import Loading from "../loading";

/**
 * 分词标注
 */
@observer
export default class WordSegmentation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nlp:false,
			to:true,
			index:true,
			base:true,
			terms:[]
		};

	}

	componentWillMount(){

		var that = this;

		setTimeout(function(){
			let {nlp} = WordSegmentationStore;
			that.setState({
				terms:nlp
			})
		},1000)



	}
	cixingArr(carr){
		var arr=[];
 		carr.map(item =>arr.push(item.natureStr.substr(0,1)));
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
		return cixingArr;
	}

	componentWillReceiveProps(){
		let {nlp} = WordSegmentationStore;
		this.setState({
			terms:nlp
		})
	}


	render() {
		let {item} = this.props;
		let {nlp,isFetching} = WordSegmentationStore;
		let cixingArr=this.cixingArr(nlp.$mobx.values)
		let cixingHtml=cixingArr.map(item => <dd key={item.str} className={item.str}>{item.ci}</dd>);
		let html = this.state.terms.map((item,index)=> <dd key={index} className={item.natureStr}>{item.name}</dd>);
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

				{isFetching?<Loading/>:
					<div className="fcm">
						<div className="col-xs-3">
							<div style={{padding: 10, width: 'auto', height: 'auto'}}>
								<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>词性类别图示：</h1>
								<dl className="words">
									{cixingHtml}
								</dl>
							</div>
						</div>
						<div className="col-xs-7" style={{height: 450, overflow: 'hidden', overflowY: 'scroll'}}>
							<div style={{padding: 10, width: 'auto', height: 'auto'}}>
								<dl className="words">
									{html}
								</dl>
							</div>
						</div>
						<div className="col-xs-2">
							<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>新词发现：</h1>
							<dl className="words" style={{height: 150}}>
								<dd className="yell">蔡英文</dd>
								<dd className="yell">语言魔术</dd>
								<dd className="yell">哈哈</dd>
							</dl>
							<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>用户自定义词：</h1>
							<textarea style={{height: 100}}/>
							<a href="#" className="tj-a fr">添加</a>
						</div>
					</div>
				}

			</div>
		)
	}
	nlpHandle(){
		this.setState({
			nlp:false,
			to:true,
			index:true,
			base:true,
			terms:WordSegmentationStore.nlp
		})


	}
	toHandle(){
		this.setState({
			nlp:true,
			to:false,
			index:true,
			base:true,
			terms:WordSegmentationStore.to
		})



	}
	indexHandle(){
		this.setState({
			nlp:true,
			to:true,
			index:false,
			base:true,
			terms:WordSegmentationStore.index
		})

	}
	baseHandle(){
		this.setState({
			nlp:true,
			to:true,
			index:true,
			base:false,
			terms:WordSegmentationStore.base
		})

	}
}
