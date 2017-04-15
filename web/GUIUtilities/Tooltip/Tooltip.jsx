import React from 'react';
import ReactDOM from 'react-dom';
class Tooltip extends React.Component
{
    constructor(props)
    {
	super(props);
	this.is_displayed = false;
	this.onHideFinish = props.OnHideFinish;
    }

    componentDidMount()
    {
	let node = this.refs.tipnode;
	
	node.style.opacity = 0;
	node.style.transition = "opacity 300ms";

	node.onmouseover = this.Display.bind(this);
	node.onmouseout = this.Hide.bind(this);
    }

    Display()
    {
	let node = this.refs.tipnode;
	this.is_displayed = true;
	node.style.display = "";
	node.style.opacity = 1;
    }

    Hide()
    {
	let node = this.refs.tipnode;

	this.is_displayed = false;
	node.style.opacity = 0;

	setTimeout(this._OnHideFinish.bind(this), 400);
    }

    _OnHideFinish()
    {
	if (this.is_displayed)
	    return;

	let node = this.refs.tipnode;
	node.style.display = "none";
	
	if (this.onHideFinish != undefined && this.onHideFinish != null)
	    this.onHideFinish();
    }

    render()
    {
	return (<span ref="tipnode" style={{"backgroundColor" : "#ffffe6", "borderRadius" : "6px", "position" : "absolute", "top" : "-20px", "zIndex" : "99", "boxShadow" : "5px 5px 2px grey", "display" : "none"}}>{this.props.children}</span>);
    }
}

export default Tooltip;
