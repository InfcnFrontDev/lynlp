import React from "react";
import WordSegmentationStore from "../../mobx/word-segmentation-store"
import "../../../styles/word.scss";
import {observer} from "mobx-react";
import Loading from "../loading";
import _ from "lodash";

// 词性定义
const natureDefs = {
	"Ag": {"code": "Ag", "name": "形语素", "color": "#ff7f50"},
	"a": {"code": "a", "name": "形容词", "color": "#87cefa"},
	"ad": {"code": "ad", "name": "副形词", "color": "#da70d6"},
	"an": {"code": "an", "name": "名形词", "color": "#32cd32"},
	"b": {"code": "b", "name": "区别词", "color": "#6495ed"},
	"c": {"code": "c", "name": "连词", "color": "#ff69b4"},
	"dg": {"code": "dg", "name": "副语素", "color": "#ba55d3"},
	"d": {"code": "d", "name": "副词", "color": "#cd5c5c"},
	"e": {"code": "e", "name": "叹词", "color": "#ffa500"},
	"f": {"code": "f", "name": "方位词", "color": "#40e0d0"},
	"g": {"code": "g", "name": "语素", "color": "#1e90ff"},
	"h": {"code": "h", "name": "前接成分", "color": "#ff6347"},
	"i": {"code": "i", "name": "成语", "color": "#7b68ee"},
	"j": {"code": "j", "name": "简称略语", "color": "#00fa9a"},
	"k": {"code": "k", "name": "后接成分", "color": "#ffd700"},
	"l": {"code": "l", "name": "习用语", "color": "#6699FF"},
	"m": {"code": "m", "name": "数词", "color": "#ff6666"},
	"Ng": {"code": "Ng", "name": "名语素", "color": "#3cb371"},
	"n": {"code": "n", "name": "名词", "color": "#b8860b"},
	"nr": {"code": "nr", "name": "人名", "color": "#30e0e0"},
	"ns": {"code": "ns", "name": "地名", "color": "#ff7f50"},
	"nt": {"code": "nt", "name": "机构团体", "color": "#87cefa"},
	"nz": {"code": "nz", "name": "其他专名", "color": "#da70d6"},
	"o": {"code": "o", "name": "拟声词", "color": "#32cd32"},
	"p": {"code": "p", "name": "介词", "color": "#6495ed"},
	"q": {"code": "q", "name": "量词", "color": "#ff69b4"},
	"r": {"code": "r", "name": "代词", "color": "#ba55d3"},
	"s": {"code": "s", "name": "处所词", "color": "#cd5c5c"},
	"tg": {"code": "tg", "name": "时语素", "color": "#ffa500"},
	"t": {"code": "t", "name": "时间词", "color": "#40e0d0"},
	"u": {"code": "u", "name": "助词", "color": "#1e90ff"},
	"vg": {"code": "vg", "name": "动语素", "color": "#ff6347"},
	"v": {"code": "v", "name": "动词", "color": "#7b68ee"},
	"vd": {"code": "vd", "name": "副动词", "color": "#00fa9a"},
	"vn": {"code": "vn", "name": "名动词", "color": "#ffd700"},
	"w": {"code": "w", "name": "标点符号", "color": "#6699FF"},
	"x": {"code": "x", "name": "非语素字", "color": "#ff6666"},
	"y": {"code": "y", "name": "语气词", "color": "#3cb371"},
	"z": {"code": "z", "name": "状态词", "color": "#b8860b"},
	"un": {"code": "un", "name": "未知词", "color": "#30e0e0"},
	// unknown
	"unknown": {"code": "unknown", "name": "未知", "color": "#30e0e0"},

};

/**
 * 分词标注
 */
@observer
export default class WordSegmentation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			types: [
				{type: 'nlp', name: 'NLP分词'},
				{type: 'to', name: '精准分词'},
				{type: 'index', name: '索引分词'},
				{type: 'base', name: '细颗粒度分词'},
				{type: 'dic', name: '用户自定义词典分词'}
			],
			curType: 'nlp',
			userDic: '',
		};
	}

	render() {
		let {item} = this.props;
		let {types, curType, userDic} = this.state;
		let {isFetching} = WordSegmentationStore;

		let categorys = WordSegmentationStore[curType].categorys;
		let terms = WordSegmentationStore[curType].terms;
		let newWords = WordSegmentationStore[curType].newWords;

		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-2">
						{types.map((t, i)=>(
							<span key={i} className={curType == t.type ? "onsp" : ''}
								  onClick={()=>this.setState({curType: t.type})}>{t.name}</span>
						))}
					</div>
				</div>

				{isFetching ? <Loading/> :
					<div className="fcm">
						<div className="col-xs-3">
							<div style={{padding: 10, width: 'auto', height: 'auto'}}>
								<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>词性类别图示：</h1>
								<dl className="words">
									{categorys.map((t, i)=> {
										if (natureDefs[t]) {
											return (
												<dd key={i} className={t}
													style={{backgroundColor: natureDefs[t].color}}>{natureDefs[t].name}</dd>
											)
										}
									})}
								</dl>
							</div>
						</div>
						<div className="col-xs-7" style={{height: 450, overflow: 'hidden', overflowY: 'scroll'}}>
							<div style={{padding: 10, width: 'auto', height: 'auto'}}>
								<dl className="words">
									{terms.map((t, i)=> {
										let natureDef = natureDefs[t.natureStr] || natureDefs["unknown"];
										return (
											<dd key={i} className={t.natureStr}
												style={{backgroundColor: natureDef.color}}>{t.name}</dd>
										)
									})}
								</dl>
							</div>
						</div>
						<div className="col-xs-2">
							<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>新词发现：</h1>
							<dl className="words" style={{height: 150}}>
								{newWords.map((t, i)=>(
									<dd key={i} className="yell">{t.name}</dd>
								))}
							</dl>
							<h1 style={{color: '#979797', fontSize: 16, marginBottom: 20}}>用户自定义词：</h1>
							<textarea style={{height: 100}} value={userDic}
									  onChange={(e) => this.setState({userDic: e.target.value})}/>
							<a href="javascript:void(0)" className="tj-a fr" onClick={this.addUserDic.bind(this)}>添加</a>
						</div>
					</div>
				}

			</div>
		)
	}

	addUserDic() {
		WordSegmentationStore.addUserDic(this.state.userDic)
	}
}
