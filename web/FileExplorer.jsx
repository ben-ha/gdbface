import React from 'react';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';
import {GetUIProxy} from './UIProxy.js';

class FileExplorer extends React.Component
{
    constructor(props)
    {
	super(props);
	this.codeview = props.CodeView;
	console.log(this.codeview);
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
		<ul className="list-unstyled">
		{
		    this.state.sourcelist.map((src) => {return (<li key={src.fullname}><a onClick={this._OnSourceClick.bind(this, src.fullname, src.file)}>{src.file}</a></li>)})
		}
		</ul>
	);
    }
}

export default FileExplorer;
