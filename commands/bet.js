module.exports = {
  name: 'bet',
  description: "This command will give command info",
  execute(message, DMembers, client, logData, wData, lData) {
    //code
    if (message.content.includes('!bet')) {
      if (message.content.includes('!bet 5050')) {
        const bet5050Command = message.content.split(' ');
        var randomNum = Math.floor(Math.random() * 100);
        console.log(randomNum);
        if (DMembers[message.member.user.id] >= parseInt(bet5050Command[2]) && DMembers[message.member.user.id] >= 0 && parseInt(bet5050Command[2]) >= 0) {
          if (randomNum < 50) {
            wData[message.member.user.id] = wData[message.member.user.id] + 1;
            DMembers[message.member.user.id] = DMembers[message.member.user.id] + parseInt(bet5050Command[2]);
            DMembers["852780500702461962"] = DMembers["852780500702461962"] - parseInt(bet5050Command[2]) + 1;
            message.channel.send(`${message.member.user.tag} rolled a ${randomNum} and won ${parseInt(bet5050Command[2])} point(s)\n${message.member.user.tag} now has ${DMembers[message.member.user.id]} points`);

            logfData = `\n ${message.member.user.username} has won a bet 5050 for ${parseInt(bet5050Command[2])} point(s) and now has ${DMembers[message.member.user.id]}`;
            logData(logfData);
          } else {
            lData[message.member.user.id] = lData[message.member.user.id] + 1;
            DMembers[message.member.user.id] = DMembers[message.member.user.id] - parseInt(bet5050Command[2]);
            DMembers["852780500702461962"] = DMembers["852780500702461962"] + parseInt(bet5050Command[2]) + 1;
            message.channel.send(`${message.member.user.tag} rolled a ${randomNum} has lost ${parseInt(bet5050Command[2])} point(s)\n${message.member.user.tag} now has ${DMembers[message.member.user.id]} points`);

            logfData = `\n ${message.member.user.username} has lost a bet 5050 for ${parseInt(bet5050Command[2])} point(s) and now has ${DMembers[message.member.user.id]} `;
            logData(logfData);
          }
        } else {
          message.channel.send(`You do not have enough points or there is not enough in the pot`);
        }
      }

      if (message.content.includes('!bet <!@') || message.content.includes('!bet <@')) {
        const coinFlipBet = message.content.split(" ");
        const name = coinFlipBet[1];
        if (parseInt(coinFlipBet[2]) <= DMembers[message.member.user.id] && parseInt(coinFlipBet[2]) <= DMembers[message.mentions.users.first().id]) {
          coinFlipBet[1] = coinFlipBet[1].toString();
          coinFlipBet[1] = coinFlipBet[1].replace('@', '');
          coinFlipBet[1] = coinFlipBet[1].replace('<', '');
          coinFlipBet[1] = coinFlipBet[1].replace('>', '');
          coinFlipBet[1] = coinFlipBet[1].replace('!', '');
          if (DMembers[coinFlipBet[1]] != null) {
            const randomNum = Math.floor(Math.random() * 100);
            var accepted = false;
            if(DMembers[coinFlipBet[1]] >= 0){
            if (DMembers[message.member.user.id] >= parseInt(coinFlipBet[2]) || DMembers[coinFlipBet[1]] >= parseInt(coinFlipBet[2])) {
              message.channel.send(`${message.member.user.username} has asked ${name} to a coinflip for ${parseInt(coinFlipBet[2])}. React to this message within 15 seconds to accept`).then(sentMessage => {
                sentMessage.react('👍')

                const filter = (reaction, user) => {
                  if (accepted == false) {
                    accepted = reaction.emoji.name === '👍' && user.id === message.mentions.users.first().id;
                  }
                  return reaction.emoji.name === '👍' && user.id === message.mentions.users.first().id;
                };

                sentMessage.awaitReactions(filter, { max: 4, time: 15000, errors: ['time'] })
                  .then(collected => console.log(collected.size))
                  .catch(collected => {
                    console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                    console.log(accepted);
                    if (accepted == true) {
                      if (randomNum > 49) {
                        wData[message.member.user.id] = wData[message.member.user.id] + 1;
                        lData[coinFlipBet[1]] = lData[coinFlipBet[1]] + 1;
                        DMembers[coinFlipBet[1]] = DMembers[coinFlipBet[1]] - parseInt(coinFlipBet[2]);
                        DMembers[message.member.user.id] = DMembers[message.member.user.id] + parseInt(coinFlipBet[2]);
                        message.channel.send(`${message.member.user.username} rolled a ${randomNum} won ${coinFlipBet[2]} point(s) to ${client.users.cache.get(coinFlipBet[1]).username}`);
                        logfData = `${message.member.user.username} rolled a ${randomNum} won ${coinFlipBet[2]} point(s) to ${client.users.cache.get(coinFlipBet[1]).username} \n They now have ${DMembers[message.member.user.id]} and ${DMembers[coinFlipBet[1]]}`;
                        logData(logfData);
                      } else {
                        lData[message.member.user.id] = lData[message.member.user.id] + 1;
                        wData[coinFlipBet[1]] = wData[coinFlipBet[1]] + 1;
                        DMembers[coinFlipBet[1]] = DMembers[coinFlipBet[1]] + parseInt(coinFlipBet[2]);
                        DMembers[message.member.user.id] = DMembers[message.member.user.id] - parseInt(coinFlipBet[2]);
                        message.channel.send(`${client.users.cache.get(coinFlipBet[1]).username} rolled a ${randomNum} won ${coinFlipBet[2]} point(s) to ${message.member.user.username}`);
                        console.log(`${client.users.cache.get(coinFlipBet[1]).username} has won ${coinFlipBet[2]} point(s) to ${message.member.user.username}`);

                        logfData = `${client.users.cache.get(coinFlipBet[1]).username} rolled a ${randomNum} won ${coinFlipBet[2]} point(s) to ${message.member.user.username} \n They now have ${DMembers[message.member.user.id]} and ${DMembers[coinFlipBet[1]]}`;
                        logData(logfData);
                      }
                    } else {
                      message.channel.send(`${client.users.cache.get(coinFlipBet[1]).username} did not accept`);
                    }
                  });
              });
            
            } else {
              message.channel.send(`You do not have enough points`);
            }
            }
          } else {
            message.channel.send(`${name} does not exist`);
          }
        }else{
          message.channel.send(`you or the person you want to bet does not have enough points`);
        }
      }
    }
    //code
  }
}