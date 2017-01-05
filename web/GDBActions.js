import API from '../API.js';
import {GetDispatcher} from './Dispatcher.js';

class GDBActions
{
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
}

module.exports = GDBActions;
