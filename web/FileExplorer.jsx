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
		    this.state.sourcelist.map((src) => {return (<button className="btn btn-link" key={src.fullname} onClick={this._OnSourceClick.bind(this, src.fullname, src.file)}>{src.file}</button>)})
		}
		</div>
	);
    }
}

export default FileExplorer;
