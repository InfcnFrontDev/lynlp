import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class KeywordExtractStore {
	@observable	keyword='';

	@action
	fetchData(content){
		LynlpApi.keyword(content).then(res => {
			this.keyword = res;
		});
	}
}

const keywordExtractStore = new KeywordExtractStore();
export default keywordExtractStore
