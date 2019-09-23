module.exports = function(robot) {
    // 一個星期中的某些天的某個時刻執行，
    //例如： 週一到週日的20點執行
    var schedule = require("node-schedule");
    var rule = new schedule.RecurrenceRule();
    
	rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 14;
    rule.minute = 00;
    var j = schedule.scheduleJob(rule, function() 
	{
		robot.send("needs","[emo20]下午兩點自動開村！倖存者日記！ 大家下午好～(ﾉ>ω<)ﾉ");
    });
	rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 08;
    rule.minute = 00;
    var j = schedule.scheduleJob(rule, function() 
	{
		robot.send("needs","[emo20]早上八點自動開村！倖存者日記！ 還很想睡覺呢_ ( : 3 」∠ )_");
    });
	rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 20;
    rule.minute = 00;
    var j = schedule.scheduleJob(rule, function() 
	{
		robot.send("needs","[emo20]晚上八點自動開村！倖存者日記！ 大家要記得吃晚餐哦！(♡˙︶˙♡)");
    });
}