#!/usr/bin/env node

var engine = require("./engine.js");

var params = {};

function PrintUsage()
{
	console.log("Usage:\tgdbface <program> [args]");
	console.log("\tgdbface -p <pid>");
}

if (process.argv.length == 2 || process.argv[2] == "--help" || process.argv[2] == "-h")
{
	PrintUsage();
	process.exit();		
}

if (process.argv[2] == "-p")
{
	if (process.argv.length != 4)
	{
		PrintUsage();
		process.exit();
	}

	params["pid"] = parseInt(process.argv[3]);
}
else
{
	params["binpath"] = process.argv[2];
	params["args"] = process.argv.slice(3).join(" ");
}

engine.run(params);
