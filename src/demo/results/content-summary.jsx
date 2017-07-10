import React from 'react';
import {observer} from "mobx-react";
import contentSummaryStore from '../../mobx/conent-summary-store'
import Loading from './loading';
/**
 * 内容摘要
 */
@observer
export default class ContentSummary extends React.Component {

	render() {
		let {item} = this.props
		let {isFetching} = contentSummaryStore;
		let str = isFetching ? <Loading/>:contentSummaryStore.summary||'北京<font color=\"red\">英富森</font><font color=\"red\">软件</font>股份有限公司（<font color=\"red\">股票代码</font>：430374）以“<font color=\"red\">信息</font><font color=\"red\">中国</font>”（Information China，简称INFCN）为核心目标与发展战略，面向全<font color=\"red\">行业</font><font color=\"red\">信息</font>（<font color=\"red\">知识</font>）服务<font color=\"red\">用户</font>，基于语言学、应用数学及计算机技术实现<font color=\"red\">信息</font>（<font color=\"red\">知识</font>）的规划、采集、整合、组织、发现与利用，为机构（或个人）<font color=\"red\">用户</font>提供<font color=\"red\">信息</font>（<font color=\"red\">知识</font>）应用的相关<font color=\"red\">软件</font>产品与解决方案。公司是国家级高新技术<font color=\"red\">企业</font>、双软<font color=\"red\">企业</font>，并通过了ISO9001:2008计算机应用<font color=\"red\">软件</font>开发质量体系<font color=\"red\">认证</font>、CMMI-DEV ML3<font color=\"red\">认证</font>及ISO27001-2013<font color=\"red\">认证</font>。公司被<font color=\"red\">中国</font>计算机<font color=\"red\">行业</font>协会、<font color=\"red\">中国</font><font color=\"red\">软件</font><font color=\"red\">行业</font>协会分别授予“2013年度<font color=\"red\">中国</font><font color=\"red\">信息</font>与<font color=\"red\">知识</font>服务<font color=\"red\">行业</font>领军<font color=\"red\">企业</font>奖”和“2014<font color=\"red\">中国</font><font color=\"red\">软件</font><font color=\"red\">行业</font>优秀<font color=\"red\">企业</font>奖”称号。'

		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<div className="jfp" style={{display: 'block'}} dangerouslySetInnerHTML={{__html: str}}></div>
			</div>
		)
	}
}
