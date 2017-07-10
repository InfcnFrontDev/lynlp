import React from 'react';
export default class Loading extends React.Component {
	render (){
		return (
			<div style={{width: 910,height: 100,textAlign: 'center'}}>
				<img src={require('../../../images/loading.gif')} alt=""/>
			</div>
		)
	}
}
