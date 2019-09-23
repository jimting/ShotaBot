var datas; //確保不會重複用的
var fs = require('fs');
        
module.exports = function(robot) 
{
    robot.hear(/#鬼話連篇/, function(response) 
    {
        fs.readFile('test.txt', 'utf8', function(err, data) {
            datas = data.split("\r\n");
            for(var data in datas)
                console.log(datas[data])
        });
        getRandomText(datas, response);
    });
	robot.hear(/#測試_現在時間/, function(response) 
    {
		var today=new Date();
		var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日('+today.getHours()+':'+today.getMinutes()+')';
        response.reply("says",currentDateTime);
    });
}

function ifDataRepeat(sentences, datas)
{
    for(var data in datas)
        if(sentences==datas[data])
            return true;
    return false;
}

function getRandomText(datas, response)
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
        var $ = cheerio.load(b);
        var result = [];
        var data = JSON.parse($("body").text());
        if(ifDataRepeat(data.sentences[0], datas))
            getRandomText(datas);
        else
        {
            var sentences = data.sentences[0];
            var random = Math.floor(Math.random()*50 + 1);
            response.reply("says","[emo"+random+"]"+sentences);
            fs.appendFile('test.txt', "\r\n"+sentences, 'utf8', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    });
}