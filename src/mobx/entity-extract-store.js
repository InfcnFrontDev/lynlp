import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class EntityExtractStore {
	@observable isFetching= false;
	@observable	entity={};

	@action
	fetchData(content){
		this.isFetching = true;
		LynlpApi.entity(content).then(res => {
			this.entity = res;
			this.isFetching = false
		});
	}
}

const entityExtractStore = new EntityExtractStore();
export default entityExtractStore
