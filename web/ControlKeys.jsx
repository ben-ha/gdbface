import React from 'react';

class ControlKeys extends React.Component
{
	render()
	{
		return (
		<div className="row">
			<div className="col-sm-2">
			<div className="btn-group">
			<button className="btn btn-primary">
				<span className="glyphicon glyphicon-play"></span>
			</button>
			<button className="btn btn-primary">
				<span className="glyphicon glyphicon-pause"></span>
			</button>
			<button className="btn btn-primary">
				<span className="glyphicon glyphicon-stop"></span>
			</button>
			<button className="btn btn-primary">
				<span className="glyphicon glyphicon-refresh"></span>
			</button>
			</div>
			</div>

			<div className="col-sm-9">
			<div className="btn-group">
			<button className="btn btn-primary">Step Into</button>
			<button className="btn btn-primary">Step Over</button>
			<button className="btn btn-primary">Step Return</button>
			</div>
			</div>
			<div className="col-sm-1">
			<div className="btn-group">
			<button className="btn btn-primary">
				<span className="glyphicon glyphicon-cog"></span>
			</button>
			</div>
			</div>
		</div>
		);
	}
}

export default ControlKeys;