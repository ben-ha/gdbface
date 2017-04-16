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

Source debugging with tooltips over variables:

![Source debugging](https://github.com/ben-ha/gdbface/raw/master/docs/screenshots/src_debug.png?raw=true "Source debugging with program console")
Interact with the debugged program:

![Program console](https://github.com/ben-ha/gdbface/raw/master/docs/screenshots/program_console.png?raw=true "Program console")
Assembly view:

![Assembly view](https://github.com/ben-ha/gdbface/raw/master/docs/screenshots/asm.png?raw=true "Assembly view")
Edit memory:

![Hex view](https://github.com/ben-ha/gdbface/raw/master/docs/screenshots/hex.png?raw=true "Hex view")

## Installing

   1. ```npm install gdbface -g```

## Usage

   1. ```gdbface <path to program> [args]```
   2. ```gdbface -p <pid>```
   
   Note: Best works on programs compiled with -g flag
   
## License

See LICENSE file
