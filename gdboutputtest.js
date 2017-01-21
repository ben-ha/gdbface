var parser = require('./gdboutputparser.js');

var z = new parser.GDBOutputParser();


var q = z.Parse('^done,bkpt={number="1",thread-groups=["i1"]}');
console.log(q.Data["bkpt"]);

var q = z.Parse('^done,bkpt={number="1",type="breakpoint",disp="keep",enabled="y",addr="0x08048564",func="main",file="myprog.c",fullname="/home/nickrob/myprog.c",line="68",thread-groups=["i1"],times="0"}');

console.log(q.Data["bkpt"]);

console.log(q.Data["bkpt"]["enabled"]);
