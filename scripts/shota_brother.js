module.exports = function(robot) {
  robot.hear(/#召喚正太|@shota_brother/, function(response) {
    //讀pics.txt的檔案
    if(!response.envelope.message.text.match("this_plurk_have_porn_content"))
    {
        var fs = require("fs");
        var cheerio = require("cheerio");
        filename = "scripts/pics.txt";
        var encode = "utf8";
        fs.readFile(filename, encode,function(err, file) {
          //這邊的file就是所有的tag 隨機在裡面選一個img標籤 並取他的src印出
          var $ = cheerio.load(file);
          var imgs = $("img");
          var number = Math.floor(Math.random()*imgs.length);
          //記得要處理URL
          //imgs[number]['src'].replace("thumbs2","images2").replace("t.gif","o.gif")
          response.reply("loves","正太來了！ " + $(imgs[number]).attr("src").replace("thumbs2","images2").replace("t.gif","o.gif"));
          //console.log("正太來了！ " + $(imgs[number]).attr("src"));
        });
        //response.reply("hi");
    }
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
            console.log(b);
            for(var i=0;i<mangas.length;i++) 
            {
                if ($(mangas[i]).find("img").attr('data-src'))
                    result.push([$(mangas[i]).find("a").attr('href'), $(mangas[i]).find("img").attr('data-src'), $(mangas[i]).find(".caption").text()]);
                else
                    result.push([$(mangas[i]).find("a").attr('href'), "https:" + $(mangas[i]).find("img").attr('src'), $(mangas[i]).find(".caption").text()]);
            }
            var random_manga=Math.floor(Math.random()*mangas.length)+1;
            response.reply("loves", result[random_manga][1].replace("thumb", "cover") + " \n 作品名稱 : " + result[random_manga][2]+" \n 神秘數字 : "+result[random_manga][0]);
            console.log("隨機開車！ " + result[random_manga][1].replace("thumb", "cover"));
                //response.reply("loves", "作品名稱 : " + result[random_manga][2]);
            console.log("作品名稱 : " + result[random_manga][2]);
                //response.reply("loves", "傳送門: https://nhentai.net"+result[random_manga][0]);
            console.log("https://nhentai.net"+result[random_manga][0]);

        });
    }
  });
}