# GDBFace

GDBFace is a frontend to the popular debugger GDB, written in Javascript.

Currently implemented features:

	1. Source code explorer
	2. Breakpoint management (Through source)
	3. Local variables view and change
	4. Watches
	5. Callstack
	6. Input/Output from the debugged application
	7. Memory view 

## Building

### Prerequisites

	1. Nodejs
	2. webpack
		1. npm install -g webpack

### Building procedure

	1. npm install from working directory
	2. invoke ./buildall.sh

### Usage

	1. ./gdbface <path to program> <arguments>
		Note: Compile your program with -g flag
		
## License

See LICENSE file
