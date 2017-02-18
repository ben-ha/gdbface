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
}

export default Utilities;
