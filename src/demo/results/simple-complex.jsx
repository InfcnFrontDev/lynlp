import React from 'react';

/**
 * 简、繁体与拼音
 */

export default class SimpleComplex extends React.Component {
	state = {
		currentItem: '简体'
	}
	componentDidMount(){

	}
	onItemPress(name){
		this.setState({
			currentItem: name
		})
	}

	render() {
		let {item} = this.props;
		let itemName = ['简体','繁体','拼音']
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
					<div className="jftab fr" id="mr-1">
						{itemName.map((name)=>{
							return (
								<span onClick={this.onItemPress.bind(this,name)} key={name} className={this.state.currentItem === name ? 'onsp' : ''}>{name}</span>
							)
						})}
					</div>
				</div>
				<div className="jfp" style={this.state.currentItem === '简体' ? {display: 'block'} : {}}>
					北京英富森软件股份有限公司（股票代码：430374）以“信息中国”（Information
					China，简称INFCN）为核心目标与发展战略，面向全行业信息（知识）服务用户，基于语言学、应用数学及计算机技术实现信息（知识）的规划、采集、整合、组织、发现与利用，为机构（或个人）用户提供信息（知识）应用的相关软件产品与解决方案。公司是国家级高新技术企业、双软企业，并通过了ISO9001:2008计算机应用软件开发质量体系认证、CMMI-DEV
					ML3认证及ISO27001-2013认证。公司被中国计算机行业协会、中国软件行业协会分别授予“2013年度中国信息与知识服务行业领军企业奖”和“2014中国软件行业优秀企业奖”称号。
				</div>
				<div className="jfp" style={this.state.currentItem === '繁体' ? {display: 'block'} : {}}>
					北京英富森軟體股份有限公司是在北京市海澱區註冊的高新技術企業、雙軟企業。“資訊中國”（information china簡稱“infcn” ）是“英富森”的核心目標與戰略。英富森公司的成立依託於淩雲實驗室的部分成果和理念，主要以資訊管理與資訊服務、知識管理與知識服務為基本方向，側重於資訊的整合、組織、發現和利用。通過先進的資訊技術和服務理念，幫助行業客戶建立企業級資訊服務與知識服務平台，實現客戶的企業級資訊與知識的應用與發現。 公司來源於資訊行業，依託於高校和科研院所，服務於行業客戶。英富森凝聚了一支專業、高效、快樂、融洽的優秀團隊，鍛造出了一支服務型、管理型、創新型與開拓型的團隊。
				</div>
				<div className="jfp" style={this.state.currentItem === '拼音' ? {display: 'block'} : {}}>
					bĕi jīng yīng fù sēn ruăn jiàn gŭ fèn yŏu xiàn gōng sī shì zài bĕi jīng shì hăi diàn qū zhù cè de gāo xīn jì shù qĭ yè shuāng ruăn qĭ yè xìn xī zhōng guó jiăn chēng shì yīng fù sēn de hé xīn mù biāo yŭ zhàn lüè yīng fù sēn gōng sī de chéng lì yī tuō yú líng yún shí yàn shì de bù fēn chéng guŏ hé lĭ niàn zhŭ yào yĭ xìn xī guăn lĭ yŭ xìn xī fú wù zhī shī guăn lĭ yŭ zhī shī fú wù wéi jī bĕn fāng xiàng cè zhòng yú xìn xī de zhĕng hé zŭ zhī fā xiàn hé lì yòng tōng guò xiān jìn de xìn xī jì shù hé fú wù lĭ niàn bāng zhù xíng yè kè hù jiàn lì qĭ yè jí xìn xī fú wù yŭ zhī shī fú wù píng tái shí xiàn kè hù de qĭ yè jí xìn xī yŭ zhī shī de yīng yòng yŭ fā xiàn gōng sī lái yuán yú xìn xī xíng yè yī tuō yú gāo xiào hé kē yán yuàn suŏ fú wù yú xíng yè kè hù yīng fù sēn níng jù le yī zhī zhuān yè gāo xiào kuài lè róng qià de yōu xiù tuán duì duàn zào chū le yī zhī fú wù xíng guăn lĭ xíng chuàng xīn xíng yŭ kāi tuò xíng de tuán duì
				</div>
			</div>
		)
	}
}
