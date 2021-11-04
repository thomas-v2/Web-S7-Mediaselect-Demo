var nodes7 = require('nodes7');
var config = require('./config');

var s7conn = new nodes7;

const express = require('express');
const app = express();
app.use(express.json());

////////////////////////////////////////////////////////////////////////
// S7 handling

var globalValues;

var variables = config.plc.vars;
s7conn.initiateConnection({port: 102, host: config.plc.host, rack: config.plc.rack, slot: config.plc.slot}, connected);

function cyclicReadFromPlc()
{
    s7conn.readAllItems(valuesReady);
}

function connected(err) {
    if (typeof(err) !== "undefined") {
        console.log("ERROR: CANNOT CONNECT TO S7 PLC");
        console.log(err);
    }
    s7conn.setTranslationCB(function(tag) {return variables[tag];});
    s7conn.addItems(Object.keys(variables));
    s7conn.readAllItems(valuesReady);
    setInterval(cyclicReadFromPlc, config.plc.pollinterval);
}

function valuesReady(err, values) {
    if (err) { console.log("ERROR: READING VALUES FROM S7 PLC FAILED!"); }
    globalValues = values;
}

////////////////////////////////////////////////////////////////////////
// HTTP Server handling

app.use(express.static('public'));

app.listen(config.webserver.port, function(){
    console.log("Webserver is listening on port", config.webserver.port);
});

app.get('/getvalues', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(globalValues));
});
