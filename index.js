
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('botpreet'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


const Database = require("@replit/database")
const db = new Database()


// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
require('./pointData.json');
require('./winData.json');
require('./lossData.json');
const mySecret = process.env['DISCORD_TOKEN']
var updateKey = {};
var DMembers = {};
var wData = {};
var lData = {};
var logfData = "\n";
var memKeys = {};
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter( file => file.endsWith('.js') );
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}



const saveData = (DMembers) => {
    const finished = (error) => {
        if (error) {
            console.error(error)
            return;
        }
    }
    for(i in DMembers){
      db.set(i, DMembers[i]).then(() => {});
    }
    const jsonData = JSON.stringify(DMembers)
    fs.writeFile('pointData.json', jsonData, finished)
}

const saveStats = (wData,lData) => {
    const finished = (error) => {
        if (error) {
            console.error(error)
            return;
        }
    }
    const jsonwData = JSON.stringify(wData)
    fs.writeFile('winData.json', jsonwData, finished)
    const jsonlData = JSON.stringify(lData)
    fs.writeFile('lossData.json', jsonlData, finished)
}


fs.readFile('./pointData.json', function (error, content) {
    DMembers = JSON.parse(content);
});
fs.readFile('./winData.json', function (error, content) {
    wData = JSON.parse(content);
});
fs.readFile('./lossData.json', function (error, content) {
    lData = JSON.parse(content);
});

const logData = (logfData) => {
    if (fs.existsSync('./log.txt')){
        fs.appendFileSync('log.txt', logfData);   
    } else {
      console.log("path not found");
    }
}


console.log("waiting for ready");
client.once('ready', () => {
dataUpdate()
    console.log("Start");
    setInterval(function () {
         dataUpdate();
    }, 60000);
    
    var oldVC;
    client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
        if (newVoiceState.channel) { // The member connected to a channel.
            if (oldVC == null) {
                oldVC = newVoiceState.channel.id;
            }
            newVoiceState.channel.members.forEach((member) => {

                if (DMembers[member.user.id] == null) {
                    DMembers[member.user.id] = 0;
                }
                if (newVoiceState.channel.id == oldVC) {
                    if (updateKey[member.user.id] == null || updateKey[member.user.id] == 0)
                updateKey[member.user.id] = setInterval(function () {
                    update(member.user.id);
                }, 60000);
                }
                oldVC = newVoiceState.channel.id;
            });

        } else if (oldVoiceState.channel) { // The member disconnected from a channel.
            clearInterval(updateKey[oldVoiceState.member.user.id]);
            updateKey[oldVoiceState.member.user.id] = 0;

        };
    });
    console.log("End of Init");
   
});

  client.on('message', message => {
    
//    if(message.member.user.id==162992843164614656 || message.member.user.id==721849342662672396 ||message.member.user.id==855073867630247977){
//        message.react('<:xqcOld:918706190890975252>');}
    
    if(message.member.user.id==163055170983297024){
        message.react('<:man_with_chinese_cap:970243274340175892>');}

try { message.guild.members.cache.get('228295681247281153').roles.remove('914020424403271721');
}
catch(err) {
  console.log(err);
}
//client.users.cache.get('228295681247281153').user.roles.remove('914020424403271721');

    
//    if(message.member.user.id==160606802575097856){
//        message.react('<:Pepega:752418548642480139>');}

//    if(message.member.user.id==186599237176393728){
//        message.react('<:BatChest:862207269110022154>');}



    //if(message.content.startsWith("!")){
      /*
      if(message.channel.id == 853032497906188298){
        const command = (message.content.split(' ')[0]).toLowerCase();
        if(command === '!botpreet'){
            client.commands.get('botpreet').execute(message);
            console.log("Saved on !botpreet");
            }
        if(command === '!bal'){
            client.commands.get('bal').execute(message, DMembers, client);
            
            
            }
        if(command === '!give'){
            client.commands.get('give').execute(message, DMembers, client, logData);
            saveData(DMembers);
            console.log("Saved on !give");
            }
        if(command === '!baltop'){
            client.commands.get('baltop').execute(message, DMembers, client);
            
            
            }
        if(command === '!bet'){
            client.commands.get('bet').execute(message, DMembers, client, logData, wData, lData);
            saveData(DMembers);
            saveStats(wData,lData);
            console.log("Saved on !bet");
            }
        if(command === '!stats'){
            client.commands.get('stats').execute(message, DMembers, client, logData, wData, lData);
            }

        if(command === '!predictions'){
            client.commands.get('predictions').execute(message, DMembers, client, logData, wData, lData);
            }

        }
        */
    //}
  
 if(message.channel.id == 902792357014036541){
    if(message.member.user.id != 439205512425504771 && message.member.user.id != 852780500702461962){
          const command = (message.content.split(' ')[0]).toLowerCase();
          //message.channel.send(`.ocr`);
          }
    }
  });

function dataUpdate() {
  //saveData(DMembers);
  try { 
    client.guilds.cache.get('190974532796940288').members.cache.get('228295681247281153').roles.remove('914020424403271721');
}
catch(err) {
  console.log(err);
}
}

function update(memberName) {
    

  /*
    memberName = memberName.toString();

    DMembers[memberName] = DMembers[memberName] + 2;

    if(DMembers["852780500702461962"] <= 10000){
    DMembers["852780500702461962"] = DMembers["852780500702461962"] + 2;
    }
    if(DMembers[memberName] <= 0){
    DMembers[memberName] = DMembers[memberName] + 10;
    }
    if(DMembers[memberName] <= -1000){
    DMembers[memberName] = DMembers[memberName] + 100;
    }
    if(DMembers[memberName] <= -10000){
    DMembers[memberName] = DMembers[memberName] + 500;
    }
    
    logfData = `\n ${client.users.cache.get(memberName).username} : ${DMembers[memberName]}`;
    logData(logfData);
*/

}

client.login(mySecret);