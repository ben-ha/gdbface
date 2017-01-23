import API from '../API.js';
import {GetDispatcher} from './Dispatcher.js';

class GDBActions
{
        static GetFullInfo()
        {
//	    GDBActions.GetBreakpointList();
	    GDBActions.RequestSourcesList();
        }
    
	static GetBreakpointList()
	{
		GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_BREAKPOINTS, null));
	}

	static RunDebugee()
	{
		GetDispatcher().SendAction(API.SerializeRequest(API.actions.RUN_DEBUGEE, null));
	}

    static BreakDebugee()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.BREAK_DEBUGEE, null));
    }

    static ResumeDebugee()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.RESUME_DEBUGEE, null));
    }
    
    static StepInto()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.STEP_INTO, null));
    }

    static StepOver()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.STEP_OVER, null));
    }

    static AddBreakpointByFuncName(funcname)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.ADD_BREAKPOINT_FUNCNAME, funcname));
    }

    static AddBreakpointBySource(filename, line)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.ADD_BREAKPOINT_SOURCE, {'filename' : filename, 'line' : line}));
    }

    static DisableBreakpoint(bpnum)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.DISABLE_BREAKPOINT, bpnum));

	this.GetBreakpointList();
    }

    static EnableBreakpoint(bpnum)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.ENABLE_BREAKPOINT, bpnum));

	this.GetBreakpointList();
    }

    static GetLocalVariables()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_LOCAL_VARIABLES, null));
    }
    
    static GetBreakpointList()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_BREAKPOINT_LIST, null));
    }

    static RemoveBreakpoint(num)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.REMOVE_BREAKPOINT, num));

	this.GetBreakpointList();
    }
    
    static RequestSourceFile(filename)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_SOURCE_FILE, filename));
    }

    static RequestSourcesList()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_SOURCES_LIST, null));
    }

    static SendConsoleInput(input)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.SEND_CONSOLE_PROGRAM_INPUT, input));
    }
}

module.exports = GDBActions;
