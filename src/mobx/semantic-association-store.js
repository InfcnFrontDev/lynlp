/**
 * Created by Administrator on 2017/7/11.
 */
import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"


class SemanticAssociationStore {

	@observable fetching= true;
	@observable fetchingTu= true;
	@observable changeCurrent= 0;
	@observable recommend= {};
	@observable graph= {};
	@observable keyItem= '';


	@action
	fetchData(content) {
		this.graph={};

		this.fetching=true;
		this.recommend={};
		LynlpApi.semanticRecommend(content).then(result => {
			let Key=_.keys(result);
			this.keyItem=""+Key[0];
			this.changeCurrent++;
			for (var i in result){
				this.recommend[i]= result[i];
			}
			this.fetching=false;


			this.fetchingTu=true;
			this.graph={};
			LynlpApi.semanticRecommendGraph(Key[0]).then(result => {
				this.fetchingTu=false;
				this.graph= result;

			});
		});

	}
	@action
	fetchDataGraph(keyword) {
		 this.fetchingTu=true;
		this.graph={};
		LynlpApi.semanticRecommendGraph(keyword).then(result => {
			this.fetchingTu=false;
			this.graph= result;

		});

	}

}

const semanticAssociationStore = new SemanticAssociationStore();
export default semanticAssociationStore


