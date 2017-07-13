/**
 * Created by Administrator on 2017/7/11.
 */
import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"


class SemanticAssociationStore {

	@observable fetching= true;
	@observable fetchingTu= true;
	@observable recommend= {};
	@observable graph= {};
	@observable keyItem= '';


	@action
	fetchData(content) {
		this.fetching=true;
		LynlpApi.semanticRecommend(content).then(result => {
			this.recommend={};
			let Key=_.keys(result);
			this.keyItem=""+Key[0];
			for (var i in result){
				this.recommend[i]= result[i];
			}

			this.fetching=false

		});

	}
	@action
	fetchDataGraph(keyword) {
		 this.fetchingTu=true;
		LynlpApi.semanticRecommendGraph(keyword).then(result => {
			this.graph= result;
			this.fetchingTu=false;
		});

	}

}

const semanticAssociationStore = new SemanticAssociationStore();
export default semanticAssociationStore


