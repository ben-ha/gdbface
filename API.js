"use strict";

var actions = {
    GET_BREAKPOINTS : "get-breakpoints",
    RUN_DEBUGEE : "run-debugee",
    BREAK_DEBUGEE : "break-debugee",
    STEP_INTO : "step-into",
    STEP_OVER : "step-over",
    RESUME_DEBUGEE : "resume-debugee",
    ADD_BREAKPOINT_FUNCNAME : "add-breakpoint-funcname",
    ADD_BREAKPOINT_SOURCE : "add-breakpoint-source",
    GET_BREAKPOINT_LIST : "get-breakpoints",
    DISABLE_BREAKPOINT : "disable-breakpoint",
    ENABLE_BREAKPOINT : "enable-breakpoint",
    GET_SOURCE_FILE : "get-sourcefile", 
    GET_SOURCES_LIST : "get-sources-list",
    REMOVE_BREAKPOINT : "remove-breakpoint",
    SEND_CONSOLE_PROGRAM_INPUT : "send-console-input",
    GET_LOCAL_VARIABLES : "get-local-variables",
    SET_VARIABLE : "set-variable",
    GET_STACK_TRACE : "get-stack-trace",
    EVALUATE_EXPRESSION : "evaluate-expression",
    GET_MEMORY_CHUNK : "get-memory-chunk",
    SET_MEMORY_CHUNK : "set-memory-chunk",
    GET_PROGRAM_STATE : "get-program-state",
}

var uiproxyevents = {
    ON_OPEN_SOURCE_FILE : "onopensource",
    ON_INVALIDATE_MEMORY : "oninvalidatemem",
}

var results =
    {
	GDB_RESULT_RECORD : 0,
	GDB_ERROR : 1,
	GDB_INFERIOR_OUTPUT : 2,
	GDB_ASYNC_OUTPUT : 3,
	GDB_NOP : 4,
	GDB_ENGINE_RESULT :5,
	GDB_ENGINE_ERROR : 6,
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
module.exports.uiproxyevents = uiproxyevents;
module.exports.results = results;
