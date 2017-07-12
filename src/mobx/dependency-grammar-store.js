import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import LynlpApi from "../common/lynlp-api"

class DependencyGrammarStore {

	@observable isFetching = true;
	@observable collData = {};
	@observable docData = {};

	@action
	fetchData(content) {
		this.isFetching = true;
		if(content.indexOf('。')!=-1){
			content = content.substr(0, content.indexOf('。') );
		}
		this.collData={};
		this.docData={};
		let entity_types = [];
		let relation_types = [];
		let text = [];
		let entities = [];
		let relations = [];
		LynlpApi.dependency(content).then(res => {
			for(var i=0;i<res.length;i++){
				let entity_types_one = {
					"type": res[i].nature,
					"labels": [
						res[i].nature
					],
					"bgColor": "#7fa2ff",
					"borderColor": "darken"
				}
				entity_types.push(entity_types_one);

				text.push(res[i].term.name);
				let len = text.join(" ").length;
				let entities_one = [
					"E"+(i+1),
					res[i].nature,
					[
						[
							len-res[i].term.name.length,
							len
						]
					]
				]
				entities.push(entities_one)

				if(res[i].depyIndex!=-1){
					let relation_types_one ={
						"type": res[i].nature+(i+1),
						"labels": [
							res[i].depyName
						],
						"dashArray": "3,3",
						"color": "purple",
						"args": [
							{
								"role": "nsubjNT1",
								"targets": [
									res[i].nature
								]
							},
							{
								"role": "nsubjNT1",
								"targets": [
									res[res[i].depyIndex].nature
								]
							}
						]
					}
					relation_types.push(relation_types_one);
					let relations_one = [
						"R"+(i+1),
						res[i].depyName,
						[
							[
								"nsubjNT1",
								"E"+(i+1)
							],
							[
								"nsubjNT1",
								"E"+(res[i].depyIndex+1)
							]
						]
					]
					relations.push(relations_one)
				}
				this.collData.entity_types = entity_types;
				this.collData.relation_types = relation_types;
				this.docData.text = text.join(" ");
				this.docData.entities = entities;
				this.docData.relations = relations;
			}



			this.isFetching = false;
		});

	}


}

const dependencyGrammarStore = new DependencyGrammarStore();
export default dependencyGrammarStore
