import config from "./config";

const newPromise = function (url, params) {
	console.log(params)

	let formData = new FormData();
	for (let key in params) {
		formData.append(key, params[key]);
	}

	return new Promise(function (resolve, reject) {
		fetch(url, {
			method: "POST",
			headers: {},
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				if (res.ok) {
					resolve(res.obj)
				} else {
					reject(res.message)
				}
			})
			.catch(err => reject(err));
	})
}

export default {
	/**
	 * 情感分析
	 */
	sentiment(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/sentiment', {
			content
		})
	},
	/**
	 * 繁体转简体
	 */
	f2j(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/f2j', {
			content
		})
	},
	/**
	 * 简体转繁体
	 */
	j2f(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/j2f', {
			content
		})
	},
	/**
	 * 简体转拼音
	 */
	pinyin(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/pinyin', {
			content
		})
	},
	/**
	 * 内容摘要
	 * 词性分析
	 */
	summary(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/summary', {
			content
		})
	},
	seg(type,content,dic) {

		return new newPromise(config.apiPath + 'NlpDemoApi/seg', {
			type,content,dic
		})
	},
	/**
	 * 文本分类
	 */
	category(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/category', {
			content
		})
	},
	/**
	 * 关键词抽取
	 */
	keyword(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/keyword', {
			content
		})
	},
	/**
	 * 抓取网页内容
	 */
	grabContent(url) {
		return newPromise(config.apiPath + 'ContentExtractorApi/execute', {
			url
		});
	}
}
