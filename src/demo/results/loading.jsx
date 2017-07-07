import React from 'react';
import ReactLoading from 'react-loading';
export default class Loading extends React.Component {
	render (){
		return (
			<div style={{width: 910,height: 100}}>
				<ReactLoading type={'bars'} color={'#488fc1'} height='100' width='100' />
			</div>
		)
	}
}
