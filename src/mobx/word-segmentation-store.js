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

			if(type=='nlp'){
				this.nlp=res.terms;
				this.isFetching = false;
			}

			if(type=='to'){
				this.to=res.terms;
				this.isFetching = false;
			}

			if(type=='index'){
				this.index=res.terms;
				this.isFetching = false;
			}
			if(type=='base'){
				this.base=res.terms;
				this.isFetching = false;
			}
		})
	}



}

const wordSegmentationStore = new WordSegmentationStore();
export default wordSegmentationStore
