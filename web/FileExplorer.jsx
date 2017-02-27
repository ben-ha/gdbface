import React from 'react';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';
import {GetUIProxy} from './UIProxy.js';

class FileExplorer extends React.Component
{
    constructor(props)
    {
	super(props);
	this.state = {sourcelist : []};
	RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
    }

    _OnDataStoreChanged(store)
    {
	this.setState({sourcelist : store.SourceList});
    }

    _OnSourceClick(src_full_path, srcname)
    {
	GetUIProxy().OpenSourceFile(src_full_path, srcname);
    }

    render()
    {
	return (
		<div>
		{
		    this.state.sourcelist.map((src) => {return (<div><button className="btn btn-default btn-xs" key={src.fullname} onClick={this._OnSourceClick.bind(this, src.fullname, src.file)}><span className="glyphicon glyphicon-file"></span>{src.file}</button></div>)})
		}
		</div>
	);
    }
}

export default FileExplorer;
