"use strict";

var actions = {
    GET_BREAKPOINTS : "get-breakpoints",
    RUN_DEBUGEE : "run-debugee",
    BREAK_DEBUGEE : "break-debugee",
    STEP_INTO : "step-into",
    STEP_OVER : "step-over",
    RESUME_DEBUGEE : "resume-debugee"
}

var results =
    {
	GDB_RESULT_RECORD : 0,
	GDB_ERROR : 1,
	GDB_INFERIOR_OUTPUT : 2,
	GDB_ASYNC_OUTPUT : 3,
	GDB_NOP : 4,
	GDB_INFERIOR_RUNNING : 5
    }

class API
{
	constructor()
	{
		this.APIBindings = {};
	}

	HandleRequest(request)
        {
		if (this.APIBindings[request["action"]] != undefined)
		    return this.APIBindings[request["action"]](request["params"]);
	    
	    return undefined;
	}

	BindAPI(action_name, func)
	{
		this.APIBindings[action_name] = func;
	}

	static SerializeRequest(action_name, params)
	{
		return {"action" : action_name, "params" : params};
	}
	
}

module.exports = API;
module.exports.actions = actions;
module.exports.results = results;
