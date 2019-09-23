module.exports = function(robot) {
  robot.hear(/開村/, function(response) {
    //偵測到開村 就進村吧！
	response.reply("hopes","正太弟弟進村 [emo1]")
  });
  robot.hear(/倖存者日記/, function(response) {
    //偵測到開村 就進村吧！
	response.reply("不要跟別人說哦！ [emo1]")
	response.reply("wants","報名")
  });
}