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
    robot.hear(/#測試開車/, function(response) 
    {
        if(response.envelope.message.text.match("this_plurk_have_porn_content"))
        {
            console.log("開始開車");
            var random_page = Math.floor(Math.random()*300)+1;
            var request = require("request");
            var fs = require("fs");
            var cheerio = require("cheerio");
            request({
                url: "https://nhentai.net/search/?q=male+only+shota&page="+random_page,
                method: "GET"
            }, function(e,r,b) 
            {
                if(e || !b) { return; }
                var $ = cheerio.load(b);
                var result = [];
                var mangas = $(".gallery");
                console.log("開始搜尋nhentai第"+random_page+"頁");
                for(var i=0;i<mangas.length;i++) 
                {
                    result.push([$(mangas[i]).find("a").attr('href'), $(mangas[i]).find("img").attr('data-src'), $(mangas[i]).find(".caption").text()]);
                }
                var random_manga=Math.floor(Math.random()*mangas.length)+1;
                console.log("開車！\n " + result[random_manga][1] + "\n" + result[random_manga][2] + "\n https://nhentai.net"+result[random_manga][0]);
                response.reply("loves","開車！\n " + result[random_manga][1] + "\n" + result[random_manga][2] + "\n https://nhentai.net"+result[random_manga][0]);

            });
        }
        else
        {
            response.reply("loves","開車狀態不通過，沒有加上r18標籤！><");
        }
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