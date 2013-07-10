#!/usr/bin/env node
var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT="";
var rest = require('restler');


var assertFileExists = function(infile) {
    var instr = infile.toString();
    console.log('INFILE NAME'+ instr);
    if(!fs.existsSync(instr)) {
	console.log("%s does not exist. Exiting.", instr);
	process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }

   return instr;
 };

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
 };

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
 };

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]] = present;
    }
    return out;
};

var clone =  function(fn){

    fn.bind({});
 };

var build = function(HTTMLFILE_DEFAULT,CHECKSFILE_DEFAULT){

    var response2url = function(result,response){
    if (result instanceof Error) {console.error('Error:');}
    else{
     fs.writeFileSync(HTMLFILE_DEFAULT,result);
     var checkJson = checkHtmlFile(HTTMLFILE_DEFAULT,CHECKSFILE_DEFAULT);
     var outJson = JSON.stringify(checkJson, null, 4);
     fs.writeFileSync('output.txt',outJson,'utf-8');
     console.log(outJson);}
    };
   return response2url;
 };


if(require.main == module){

program
 .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
 .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
 .option('u,--url <url_link>', 'URL LINK')
.parse(process.argv);
    //var apiurl = program.url.toString() || URL_DEFAULT;

 if(program.url){
     var apiurl  = program.url.toString();
     var response2url = build(HTMLFILE_DEFAULT,CHECKSFILE_DEFAULT);
     rest.get(apiurl).on('complete',response2url);
     //console.log(program.file);
     //var checkJson = checkHtmlFile(program.file,program.checks);
     //var outJson = JSON.stringify(checkJson, null, 4);
     //console.log(outJson);});
 }
 else{
     var checkJson = checkHtmlFile(program.file, program.checks);
     var outJson = JSON.stringify(checkJson, null, 4);
     fs.writeFileSync('output.json',outJson);
     console.log(outJson);
 }

}

else{
    exports.checkHtmlFile = checkHtmlFile;

}
