import React from 'react';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';
class VariableTooltip extends React.Component
{
    constructor(props)
    {
	super(props);
	this.expression = props.Expression;
	this.id = "Tooltip_" + this.expression;
	this.state = {value : "N/A"};
    }

    componentDidMount()
    {
	RegisterDataStoreCallback(this._OnGDBData.bind(this));
    }

    _OnGDBData(store)
    {
	if (store.Expression.ID == undefined)
	    return;

	if (store.Expression.ID != this.id)
	    return;

	this.setState({value : store.Expression.Data});
    }
    
    Reevaluate()
    {
	GDBActions.EvaluateExpression(this.id, this.expression);
    }
    
    render()
    {
	return (<span>{this.expression} | {this.state.value}</span>);
    }
}

export default VariableTooltip;
