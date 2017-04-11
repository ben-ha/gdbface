# GDBFace

GDBFace is a web frontend to the popular debugger GDB, written in Javascript.

Currently implemented features:

	1. Source code explorer
	2. Assembly view
	3. Breakpoint management (Through source and assembly)
	4. Local variables view and change
	5. Watches
	6. Callstack
	7. Input/Output from the debugged application
	8. GDB command console
	9. Memory view

## Screenshots

![Source debugging](/docs/screenshots/src_debug.png?raw=true "Source debugging with program console")
![Assembly view](/docs/screenshots/asm.png?raw=true "Assembly view")
![Hex view](/docs/screenshots/hex.png?raw=true "Hex view")

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
	2. ./gdbface -p <pid>
	3. Open a browser and point it to http://localhost:5555 (This will change in the future when the project stabilizes)

	Note: Compile your program with -g flag for best results

## License

See LICENSE file
