import React from 'react';
import CodeView from './CodeView.jsx';
import AssemblyView from './AssemblyView.jsx';
import {uiproxyevents} from '../API.js';
import {RegisterUIProxyCallback} from './UIProxy.js';
import {RegisterDataStoreCallback} from './DataStore.js';

class CodeViewContainer extends React.Component
{
    constructor(props)
    {
	super(props);
	this.state = {views : [], active_view : null};
	RegisterDataStoreCallback(this._OnGDBData.bind(this));
	RegisterUIProxyCallback(uiproxyevents.ON_OPEN_SOURCE_FILE, this._OnOpenFileRequest.bind(this));
    }

    _OnGDBData(store)
    {	
	if (store.ProgramFrameInformation.fullname == undefined)
	    return;

	this.AddOrShowCodeView(store.ProgramFrameInformation.fullname, store.ProgramFrameInformation.file);
    }
  
    _OnOpenFileRequest(request)
    {
	this.AddOrShowCodeView(request["fullpath"], request["caption"]);
    }

    AddOrShowCodeView(full_file_path, filename)
    {
	let existing_code_view = this.FindCodeView(full_file_path);

	if (existing_code_view != null)
	{
	    this.setState({active_view : existing_code_view});
	    return;
	}

	let new_views = this.state.views;
	let new_view = (<CodeView key={full_file_path} FileName={filename} FullFileName={full_file_path} />);
	new_views.push(new_view);
	
	
	this.setState({views : new_views, active_view : new_view})
    }

    FindCodeView(file_full_path)
    {
	for (let i = 0; i < this.state.views.length;++i)
	{
	    if (this.state.views[i].props["FullFileName"] == file_full_path)
		return this.state.views[i];
	}
	return null;
    }

    OnCloseTab(view)
    {
	let new_views = this.state.views.filter((v) => v != view);

	this.setState({views : new_views, active_view : new_views[0]});
    }
    
    render()
    {
	if (this.state.views.length == 0)
	   return (<div></div>);
	   
	let a =
	(
	    <div style={{height:"100%"}}>
		<ul className="nav nav-tabs">
		{
		    this.state.views.map((view) => {return (<li key={view.props.FullFileName} className={(this.state.active_view == view) ? "active" : ""}><a role="tab" data-toggle="tab" href={"#codeview_" + view.props.FileName.replace(".","_")}>{view.props.FileName}<button className="close closeTab" onClick={this.OnCloseTab.bind(this, view)} style={{"fontSize" : "18px", "marginLeft" : "15px", "color" : "red"}}>x</button></a></li>)})
		}
		   <li key="assemblyview" style={{"float":"right"}} className={(this.state.active_view == "assembly" ? "active" : "")}><a role="tab" data-toggle="tab" href="#codeview_assemblyview">Assembly view</a></li>

		    </ul>

		<div className="tab-content" style={{height:"90%"}}>
		{
		this.state.views.map((view) => { return (
		    <div id={"codeview_"+view.props.FileName.replace(".","_")} className={"tab-pane " + (this.state.active_view == view ? "active" : "")} style={{height:"100%"}}>{view}</div>)})
		    }

		    <div id="codeview_assemblyview" className="tab-pane" style={{height:"100%"}}>
			<AssemblyView />
		    </div>
	    
	    </div>
	   </div>
	);

	return a;
    }
}

export default CodeViewContainer;
