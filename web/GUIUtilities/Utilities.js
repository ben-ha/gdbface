import react from 'react';

class Utilities
{
    static NumberToHexStringPadded(num, padding)
    {
	let str = num.toString(16);
	let padstr = "0";

	if (padding - str.length < 0)
	    throw "String too long!";
	
	return padstr.repeat(padding - str.length) + str;
    }

    static NumberToAddress(num)
    {
	return "0x" + Utilities.NumberToHexStringPadded(num, 16);
    }

    static CreateLineMarkerElement(options)
    {
	let breakpoint_div = Utilities._CreateBreakpointMarkerElement(options);

	if (!options.active_line)
	    return breakpoint_div;
	
	if (breakpoint_div == null)
	    breakpoint_div = document.createElement("div");

	let span = document.createElement("span");
	span.className="glyphicon glyphicon-arrow-right";
	span.style.color = "gold";
	span.style.zIndex = 99;
	span.style.position = "absolute";
	span.style.left = "0px";
	span.style.top="3px";

	breakpoint_div.appendChild(span);

	return breakpoint_div;

    }

    static _CreateBreakpointMarkerElement(options)
    {
	if (!options.has_breakpoint)
	    return null;
	
	let wrapping_div = document.createElement("div");

	if (options.breakpoint_enabled)
	    wrapping_div.style.color="red";
	else
	    wrapping_div.style.color="gray";
	wrapping_div.innerText="●";
	return wrapping_div;
	
    }
}

export default Utilities;
