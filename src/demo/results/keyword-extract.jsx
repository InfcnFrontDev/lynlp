import React from 'react';
import WordCloud from 'react-d3-cloud';
import {observer} from "mobx-react";
import keywordExtractStore from "../../mobx/keyword-extract-store"
/**
 * 关键词提取
 */
@observer
export default class KeywordExtract extends React.Component {

	render() {
		var cloud = [
			{"score": 54.106871772884645, "freq": 6, "name": "信息"},
			{"score": 42.27400893351648, "freq": 5, "name": "服务"},
			{"score": 32.969911478457114, "freq": 4, "name": "知识"},
			{"score": 30.004016941629317, "freq": 2, "name": "英富森"},
			{"score": 28.847416440253042, "freq": 1, "name": "北京英富森软件股份有限公司"},
			{"score": 27.380598655155428, "freq": 1, "name": "北京市海淀区"},
			{"score": 22.198491535211183, "freq": 3, "name": "行业"},
			{"score": 22.13604852104744, "freq": 3, "name": "客户"},
			{"score": 20.43766113902673, "freq": 1, "name": "英富森公司"},
			{"score": 19.982337094367942, "freq": 2, "name": "企业级"},
			{"score": 19.36199476328848, "freq": 1, "name": "凌云实验室"},
			{"score": 17.546486980012215, "freq": 2, "name": "企业"},
			{"score": 15.048766413462433, "freq": 2, "name": "理念"},
			{"score": 10.465450536586241, "freq": 2, "name": "依托"},
			{"score": 10.109525309506637, "freq": 2, "name": "发现"},
			{"score": 10.084546787444742, "freq": 2, "name": "团队"},
			{"score": 8.461028419187384, "freq": 1, "name": "高新技术"},
			{"score": 7.992733393173877, "freq": 1, "name": "中国"},
			{"score": 6.7750670367662815, "freq": 1, "name": "核心"},
			{"score": 6.712624022602537, "freq": 1, "name": "目标"},
			{"score": 6.618959501356921, "freq": 1, "name": "战略"},
			{"score": 5.994529359719475, "freq": 1, "name": "部分"},
			{"score": 5.932086345555731, "freq": 1, "name": "成果"},
			{"score": 5.901033923180533, "freq": 1, "name": "科研院所"},
			{"score": 5.899867091170396, "freq": 1, "name": "信息管理"},
			{"score": 5.744826074305964, "freq": 1, "name": "主要"},
			{"score": 5.276445723607299, "freq": 1, "name": "管理"},
			{"score": 5.084968321671723, "freq": 1, "name": "侧重于"},
			{"score": 4.964219626017691, "freq": 1, "name": "方向"},
			{"score": 4.683235849355591, "freq": 1, "name": "整合"},
			{"score": 4.335261453732943, "freq": 1, "name": "信息技术"},
			{"score": 4.308577726540104, "freq": 1, "name": "通过"},
			{"score": 3.278258243596588, "freq": 1, "name": "服务平台"},
			{"score": 2.6850552202972056, "freq": 1, "name": "应用"},
			{"score": 2.466499059467909, "freq": 1, "name": "公司"},
			{"score": 2.0606402567487274, "freq": 1, "name": "高校"},
			{"score": 1.7109388108738843, "freq": 1, "name": "注册"},
			{"score": 1.4674110239246816, "freq": 1, "name": "简称"},
			{"score": 1.3113032974386354, "freq": 1, "name": "专业"},
			{"score": 1.2675933525817464, "freq": 1, "name": "成立"},
			{"score": 1.2176533527061553, "freq": 1, "name": "高效"},
			{"score": 1.0053352370285058, "freq": 1, "name": "基本"},
			{"score": 0.9179124277316095, "freq": 1, "name": "组织"},
			{"score": 0.8804466143548091, "freq": 1, "name": "利用"},
			{"score": 0.8492272809681788, "freq": 1, "name": "先进"},
			{"score": 0.7680491742244079, "freq": 1, "name": "帮助"},
			{"score": 0.7305833608476077, "freq": 1, "name": "建立"},
			{"score": 0.624430222946673, "freq": 1, "name": "实现"},
			{"score": 0.593208634555573, "freq": 1, "name": "服务型"},
			{"score": 0.48081127166893833, "freq": 1, "name": "来源于"},
		];
		let cloudData = keywordExtractStore.keyword || cloud;
		let  data = []
		cloudData.map((item,i)=>{
			data[i] = {}
			data[i].text = item.name
			data[i].score = item.score
		})

		const fontSizeMapper = word => Math.log2(word.score) * 6;
		const rotate = word => word.score % 360;

		let {item} = this.props;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<WordCloud
					data={data}
					fontSizeMapper={fontSizeMapper}
					rotate={rotate}
					width={'890'}
					height={'290'}
				/>
			</div>
		)
	}
}
