var endTime = function (time, expr) {
    // your code here
    // base case
    if (expr.tag === 'note') 
        return time + expr.dur;
    else
        return endTime(time, expr.left) + endTime(time, expr.right);
};

// maybe some helper functions

var compileT = function (expr, t) {
    if (expr.tag === 'note')
    {
        return [{tag:expr.tag, pitch:expr.pitch, start:t, dur:expr.dur}];
    }
    else
    {
    	// problem here! 
        return [].concat(compileT(expr.left,t) ,compileT(expr.right, endTime(t,expr.left)));
    }
};

var compile = function (musexpr) {
    // base case
    return compileT(musexpr,0);      
};

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
