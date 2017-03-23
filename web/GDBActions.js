import API from '../API.js';
import {GetUIProxy} from './UIProxy.js';
import Utilities from './GUIUtilities/Utilities.js';
import {GetDispatcher} from './Dispatcher.js';

class GDBActions
{
        static GetFullInfo()
        {
	    GDBActions.GetProgramState();
	    GDBActions.RequestSourcesList();
	    GDBActions.GetLocalVariables();
	    GDBActions.GetStackTrace();
        }

	static GetProgramState()
	{
		GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_PROGRAM_STATE, null));
	}
    
	static GetBreakpointList()
	{
		GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_BREAKPOINTS, null));
	}

	static RunDebugee()
	{
		GetDispatcher().SendAction(API.SerializeRequest(API.actions.RUN_DEBUGEE, null));
		GetUIProxy().InvalidateMemory();
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

    static SetVariable(varname, value)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.SET_VARIABLE, {name : varname, value: value}));

	GetUIProxy().InvalidateMemory();
    }

    static GetStackTrace()
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_STACK_TRACE, null));
    }

    static EvaluateExpression(expr_id, expr)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.EVALUATE_EXPRESSION, {id : expr_id, data: expr}));
    }
    
    static SendConsoleInput(input)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.SEND_CONSOLE_PROGRAM_INPUT, input));
	GetUIProxy().InvalidateMemory();
    }

    static SendGDBConsoleInput(cmd)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.SEND_GDB_CONSOLE_INPUT, cmd));
    }

    static Disassemble(start_address, end_address)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.DISASSEMBLE, {start_address : start_address, end_address : end_address}));
    }
    
    static GetMemoryChunk(address_expression, size, chunk_hash)
    {
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.GET_MEMORY_CHUNK, {expr : address_expression, size: size, hash: chunk_hash}));
    }

    static SetMemoryChunk(address_expression, value)
    {
	let hex_value = "";
	for (let i = 0; i < value.length; ++i)
	    hex_value += Utilities.NumberToHexStringPadded(value.charCodeAt(i), 2)
	
	GetDispatcher().SendAction(API.SerializeRequest(API.actions.SET_MEMORY_CHUNK, {address: address_expression, contents : hex_value}));

	GetUIProxy().InvalidateMemory();
    }
}

module.exports = GDBActions;
