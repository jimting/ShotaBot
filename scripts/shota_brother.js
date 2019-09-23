module.exports = function(robot) {
  robot.hear(/#召喚正太|@shota_brother/, function(response) {
    //讀pics.txt的檔案
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
	  response.reply("loves","正太來了！ " + $(imgs[number]).attr("src").replace("thumbs2","images2").replace("t.gif","o.gif"))
	  //console.log("正太來了！ " + $(imgs[number]).attr("src"));
	});
    //response.reply("hi");
  });
}