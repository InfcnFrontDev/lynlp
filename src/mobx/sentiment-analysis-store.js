import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"
import {sentiment} from '../demo/data/sentiment-analysis';

class SentimentAnalysisStore {

	@observable isFetching = true;
	@observable data = [];
	@observable data_type = [];
	@observable zheng = [];
	@observable fu = [];
	@observable zheng_value = 0;
	@observable fu_value = 0;

	@action
	fetchData(content) {
		this.isFetching = true;
		this.zheng=[];
		this.fu=[];
		this.zheng_value=0;
		this.fu_value=0;
		LynlpApi.sentiment(content).then(res => {


			//
			console.log(res);

			for(let i=0;i<res.length;i++){

				for (var val in res[i]){
					let now_sen = sentiment[val.trim()];
					now_sen.value = res[i][val];
					if(now_sen.type==1){
						this.zheng_value+=now_sen.value;
						this.zheng.push(now_sen);
					}else{
						this.fu_value+=now_sen.value;
						this.fu.push(now_sen);
					}
				}
			}

			this.data = this.zheng.concat(this.fu);
			console.log(this.zheng)

			this.data_type = [
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
			];
			this.isFetching = false;
		});

	}


}

const sentimentAnalysisStore = new SentimentAnalysisStore();
export default sentimentAnalysisStore
