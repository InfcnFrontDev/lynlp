import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class WordSegmentationStore {

	@observable isFetching= true;
	@observable	nlp=[];
	@observable	to= '';
	@observable index= '';
	@observable base= '';

	@action
	fetchData(type,content,dic){



		this.isFetching = true;
		LynlpApi.seg(type,content,dic).then(res=>{
			this.nlp=res.terms;
		})


	}



}

const wordSegmentationStore = new WordSegmentationStore();
export default wordSegmentationStore
