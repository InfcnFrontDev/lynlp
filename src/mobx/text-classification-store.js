import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class TextClassificationStore {
	@observable	category='';

	@action
	fetchData(content){
		LynlpApi.category(content).then(res => {
			this.category = res;
		});
	}
}

const textClassificationStore = new TextClassificationStore();
export default textClassificationStore
