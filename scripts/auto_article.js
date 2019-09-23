var datas; //確保不會重複用的
var fs = require('fs');
module.exports = function(robot) {
    // 一個星期中的某些天的某個時刻執行，
    //例如： 週一到週日的20點執行
    var schedule = require("node-schedule");
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 18;
    rule.minute = 30;
    var j = schedule.scheduleJob(rule, function() 
    {
        getRandomText(robot);
    });
	
	rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 08;
    rule.minute = 30;
    var j = schedule.scheduleJob(rule, function() 
	{
		getRandomText(robot);
    });
}
function ifDataRepeat(sentences, datas)
{
    for(var data in datas)
        if(sentences==datas[data])
            return true;
    return false;
}

function getRandomText(robot)
{
    
    //隨便爬蟲
    var request = require("request");
    var fs = require("fs");
    var cheerio = require("cheerio");
    request({
        url: "http://more.handlino.com/sentences.json",
        method: "GET"
    }, function(e,r,b) 
    {
        if(e || !b) { return; }
        fs.readFile('scripts/test.txt', 'utf8', function(err, data) {
            datas = data.split("\r\n");
            for(var data in datas)
                console.log(datas[data])
        });
        var $ = cheerio.load(b);
        var result = [];
        var data = JSON.parse($("body").text());
        if(ifDataRepeat(data.sentences[0], datas))
            getRandomText(datas);
        else
        {
            var sentences = data.sentences[0];
            var random = Math.floor(Math.random()*50 + 1);
            robot.send("says","[emo"+random+"]"+sentences);
            fs.appendFile('scripts/test.txt', "\r\n"+sentences, 'utf8', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    });
}