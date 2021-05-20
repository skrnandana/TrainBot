var request = require('request');
var token = "1385642666:AAEwtU8BDlBDuTfA6WIa-mQaVyBcuEdsIbI"
var TelegramBot = require('node-telegram-bot-api') ;

var bot = new TelegramBot(token, {polling: true});
var trapi = "d1317c826ab366e4f030f13b83736069"

bot.on('message',function(msg){

	var tx = msg.text;//convert user msg into text
	var ar = tx.split(",");
	//if((ar[0].localeCompare("hey")) == 0){
	//bot.sendMessage("1.Enter Train Number,station code to know trains available at your station-eg:17644,RJY");
	//}

	//if(tx.isInteger()){
		request('https://indianrailapi.com/api/v2/AllTrainOnStation/apikey/d1317c826ab366e4f030f13b83736069/StationCode/'+ar[1]+'/',function(err,resp,body){
			if(err){
				bot.sendMessage(msg.chat.id,"There is no hault at your station")
			}
			else{
				
				for(var i = 0; i < JSON.parse(body).Trains.length;i++){
					if(JSON.parse(body).Trains[i].TrainNo == ar[0]){
						bot.sendMessage(msg.chat.id,"Train Name : "+JSON.parse(body).Trains[i].TrainName+"\nArrivalTime : "+JSON.parse(body).Trains[i].ArrivalTime+"\nDepartureTime : "+JSON.parse(body).Trains[i].DepartureTime+"\nSource : "+JSON.parse(body).Trains[i].Source+"\nDestination : "+JSON.parse(body).Trains[i].Destination);
						

				}
			}
		}
		})
	})
	//}
	/*else{
		request('https://indianrailapi.com/api/v2/AllTrainOnStation/apikey/d1317c826ab366e4f030f13b83736069/StationCode/'+tx+'/',function(err,resp,body){
			if(err){
				bot.sendMessage(msg.chat.id,"Check the format of text")
			}
			else{
				console.log(msg.chat.id,JSON.parse(body))
			}
	})
}*/