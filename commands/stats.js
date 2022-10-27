module.exports = {
    name: 'stats',
    description: "This command will give command info",
    execute(message, DMembers, client, logData, wData, lData){
    //code
        if (message.content  == '!stats') {
          if(wData[message.member.user.id] == null || lData[message.member.user.id] == null){
            wData[message.member.user.id] = 0;
            lData[message.member.user.id] = 0;
          }
          message.channel.send(`${message.member.user.username} has ${wData[message.member.user.id]} wins and ${lData[message.member.user.id]} losses`);
        } else if (message.content.includes('!stats <!@') || message.content.includes('!stats <@')) {
        const coinFlipBet = message.content.split(" ");
        const name = coinFlipBet[1];
          coinFlipBet[1] = coinFlipBet[1].toString();
          coinFlipBet[1] = coinFlipBet[1].replace('@', '');
          coinFlipBet[1] = coinFlipBet[1].replace('<', '');
          coinFlipBet[1] = coinFlipBet[1].replace('>', '');
          coinFlipBet[1] = coinFlipBet[1].replace('!', '');
          if (wData[message.member.user.id] != null || lData[message.member.user.id] != null) {
             message.channel.send(`${client.users.cache.get(coinFlipBet[1]).tag} has ${wData[coinFlipBet[1]]} wins and ${lData[coinFlipBet[1]]} losses`);
          }
        
        }
    
    //code
    }
}