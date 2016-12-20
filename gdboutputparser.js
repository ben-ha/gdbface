class GDBOutputParser
{
    constructor()
    {

    }

    Parse(output)
    {
	let matched = output.match(/([\^*~@&\+=])([a-z]+),(.*)/)
	let rescode = matched[1];
	let restext = matched[2];
	let result = matched[3];

    }
}
