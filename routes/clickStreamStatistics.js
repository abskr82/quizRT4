var ClickStreamDataInit = function (userId, questionId, topicId, responseTime, isCorrect) {
    this.userAnalyticsArr = [];
};

// var playerName = [];
// GameManager.getGamePlayers(data.gameId).forEach(function(player){
//   playerName.push(player.userId);
// });
//console.log("^^^^^^^^^^^^^^^^^^  pass case  "+ data.gameId +"   " + data.ans +"   " + data.topicId +"  " + data.userId +" " + GameManager.getGamePlayers(data.gameId) +"  "  + data.responseTime);


ClickStreamDataInit.prototype.addUserAnalytics =  function(data){
    var isCorrect=data.ans=='correct'? true:false;
    this.userAnalyticsArr.push(
         {
            'userId' : data.userId,
            'questionId' : data.questionId,
            'topicId' : data.topicId ,
            'responseTime' : 10-Number(data.responseTime),
            'time' : new Date().toString(),
            'isCorrect' : isCorrect
        }
    );
    this.saveData();
    this.userAnalyticsArr = [];
};



ClickStreamDataInit.prototype.saveData = function(){
    var fs = require('fs');
    var fileName = 'out.json';
    var contents = fs.readFile(fileName);

    var stats = fs.statSync(fileName);
    var userData = this.userAnalyticsArr;

    // parse file if its non empty
    if ( stats.size > 0 ){
        require('fs').readFile(fileName, 'utf8', function (err, data) {
            var obj = JSON.parse(data);
            console.log(obj);
            for (var i = 0; i < userData.length; i+=1){
                obj.push(userData[i]);
            }
            fs.writeFile(fileName, JSON.stringify(obj), function(err) {
                if(err){
                        return console.log(err);
                }
                    console.log("data was appended!!");
            });

        });
    }
    else{
        fs.writeFile(fileName, JSON.stringify(userData), function(err) {
            if(err) {
                    return console.log(err);
                }
                console.log("data was saved!!");
            });
    }
}


module.exports = ClickStreamDataInit;
