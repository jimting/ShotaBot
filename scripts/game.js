module.exports = function(robot) {
    // 一個星期中的某些天的某個時刻執行，
    //例如： 週一到週日的20點執行
    var schedule = require("node-schedule");
    var rule = new schedule.RecurrenceRule();
    
	rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
	//設定14:00 => 22:00發文 時區大錯亂www 晚...8小時
    rule.hour = 06;
    rule.minute = 00;
    var j = schedule.scheduleJob(rule, function() 
	{
		robot.send("needs","[emo20]下午兩點自動開村！倖存者日記！ 大家下午好～(ﾉ>ω<)ﾉ");
    });
	rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 00;
    rule.minute = 00;
    var j = schedule.scheduleJob(rule, function() 
	{
		robot.send("needs","[emo20]早上八點自動開村！倖存者日記！ 還很想睡覺呢_ ( : 3 」∠ )_");
    });
	rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 12;
    rule.minute = 00;
    var j = schedule.scheduleJob(rule, function() 
	{
		robot.send("needs","[emo20]晚上八點自動開村！倖存者日記！ 大家要記得吃晚餐哦！(♡˙︶˙♡)");
    });
}