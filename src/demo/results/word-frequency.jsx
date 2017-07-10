import React from "react";
import WordSegmentationStore from "../../mobx/word-segmentation-store"



/**
 * 词频统计
 */
export default class WordFrequency extends React.Component {
	componentWillMount(){
		//WordSegmentationStore.fetchData('nlp',content,'北京')
	}


	render() {
		let item=WordSegmentationStore.nlp

		console.log(item);

		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-3">
						<span className="onsp">图形展示</span>
						<span>列表展示</span>
					</div>
				</div>
				<div className="cpm cf" style={{display:'block'}}>
					<div className="cp-1 fl">
						<h3 className="h3-1">名词</h3>
						<table className="cptab">
							<tbody>
							<tr>
								<th>词名</th>
								<th>词频</th>
							</tr>
							<tr>
								<td>大陆</td>
								<td>22</td>
							</tr>
							<tr>
								<td>民进党</td>
								<td>33</td>
							</tr>
							<tr>
								<td>英文</td>
								<td>4</td>
							</tr>
							<tr>
								<td>问题</td>
								<td>5</td>
							</tr>
							<tr>
								<td>九二共识</td>
								<td>7</td>
							</tr>
							<tr>
								<td>两岸</td>
								<td>8</td>
							</tr>
							<tr>
								<td>一国两制</td>
								<td>9</td>
							</tr>
							<tr>
								<td>共识</td>
								<td>67</td>
							</tr>
							<tr>
								<td>赖清德</td>
								<td>54</td>
							</tr>
							<tr>
								<td>魔术</td>
								<td>44</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="cp-2 fl">
						<h3 className="h3-1">动词</h3>
						<table className="cptab">
							<tbody>
							<tr>
								<th>词名</th>
								<th>词频</th>
							</tr>
							<tr>
								<td>摘编</td>
								<td>22</td>
							</tr>
							<tr>
								<td>利用</td>
								<td>33</td>
							</tr>
							<tr>
								<td>接受</td>
								<td>4</td>
							</tr>
							<tr>
								<td>表示</td>
								<td>5</td>
							</tr>
							<tr>
								<td>废除</td>
								<td>7</td>
							</tr>
							<tr>
								<td>拆穿</td>
								<td>8</td>
							</tr>
							<tr>
								<td>不入流</td>
								<td>9</td>
							</tr>
							<tr>
								<td>有机可乘</td>
								<td>67</td>
							</tr>
							<tr>
								<td>就是</td>
								<td>54</td>
							</tr>
							<tr>
								<td>得到</td>
								<td>44</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="cp-3 fl">
						<h3 className="h3-1">形容词</h3>
						<table className="cptab">
							<tbody>
							<tr>
								<th>词名</th>
								<th>词频</th>
							</tr>
							<tr>
								<td>实际</td>
								<td>22</td>
							</tr>
							<tr>
								<td>空洞</td>
								<td>33</td>
							</tr>
							<tr>
								<td>心虚</td>
								<td>4</td>
							</tr>
							<tr>
								<td>深入</td>
								<td>5</td>
							</tr>
							<tr>
								<td>强硬</td>
								<td>7</td>
							</tr>
							<tr>
								<td>强大</td>
								<td>8</td>
							</tr>
							<tr>
								<td>繁荣</td>
								<td>9</td>
							</tr>
							<tr>
								<td>共识</td>
								<td>67</td>
							</tr>
							<tr>
								<td>赖清德</td>
								<td>54</td>
							</tr>
							<tr>
								<td>魔术</td>
								<td>44</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
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
