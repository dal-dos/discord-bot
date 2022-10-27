module.exports = {
  name: 'predictions',
  description: "This command will give command info",
  execute(message, DMembers, client, logData) {

    //code
    if (message.content.startsWith("!predictions")) {
      var message1 = "";
      var message2 = "";
      var message3 = "";
      
      var count = 0;
      
      message.channel.send(`A prediction has started! ${message.member.user.tag} what is the prediction?`).then(sentMessage => {

        var filter = m => m.member.user.id == message.member.user.id;
        var collector = message.channel.createMessageCollector(filter, { time: 15000 });

        collector.on('collect', m => {
          console.log(`Collected ${m.content}`);
          //c1 start
          if (m.member.user.id == message.member.user.id && count == 0) {
            message1 = m;
            count++;
            m.channel.send(`The prediction is "${m.content}" \nwhat is choice 1?`);

            filter = m => m.member.user.id == message.member.user.id;
            collector = message.channel.createMessageCollector(filter, { time: 15000 });

            collector.on('collect', m => {
              console.log(`Collected ${m.content}`);
              //c2 start
              if (m.member.user.id == message.member.user.id && count == 1) {
                count++;
                message2 = m;
                m.channel.send(`The choice 1 is "${m.content}" \nwhat is choice 2?`);


                filter = m => m.member.user.id == message.member.user.id;
                collector = message.channel.createMessageCollector(filter, { time: 15000 });

                collector.on('collect', m => {
                  console.log(`Collected ${m.content}`);
                  //c3 start
                  if (m.member.user.id == message.member.user.id && count == 2) {
                    count++
                    message3 = m;
                    message.channel.send(`The choice 2 is "${m.content}" \nThe prediction has started vote "${message1.content}" with choice red ${message2.content} and choice blue ${message3.content}\n Now react to the choice you want and type the points to predict`).then(sentMessage => {
                      var tMsg = " ";
                      var predictorsRedList = {};
                      var predictorsBlueList = {};
                      sentMessage.react('🟥')
                      sentMessage.react('🟦')

                      filter = (reaction, user) => {
                        if (predictorsBlueList[user.id] != null || !isNaN(predictorsBlueList[user.id])) {
                          predictorsRedList[user.id] = 0;
                          delete predictorsBlueList[user.id];
                        }
                        return reaction.emoji.name === '🟥';
                      };

                      sentMessage.awaitReactions(filter, { max: 20, time: 150000, errors: ['time'] })
                        .then(collected => console.log(collected.size))
                        .catch(collected => {
                          console.log(`After a minute, only ${collected.size} out of 20 reacted.`);
                        });


                      filter = (reaction, user) => {
                        if (predictorsRedList[user.id] != null || !isNaN(predictorsRedList[user.id])) {
                          predictorsBlueList[user.id] = 0;
                          delete predictorsRedList[user.id];
                        }
                        return reaction.emoji.name === '🟦';
                      };

                      sentMessage.awaitReactions(filter, { max: 20, time: 150000, errors: ['time'] })
                        .then(collected => console.log(collected.size))
                        .catch(collected => {
                          console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                        });

                      filter = m => m.member.user.id == message.member.user.id;
                      collector = message.channel.createMessageCollector(filter, { time: 15000 });

                      collector.on('collect', m => {
                        console.log(`Collected ${m.content}`);
                        //c4 start
                        if (!isNaN(m.content)) {
                          if ((predictorsRedList[m.member.user.id] != null || !isNaN(predictorsRedList[m.member.user.id])) && predictorsBlueList[m.member.user.id] == null) {
                            predictorsRedList[m.member.user.id] = parseInt(m.content);
                            console.log(`set ${m.member.user.id} to ${m.content}`);
                          }
                          if ((predictorsBlueList[m.member.user.id] != null || !isNaN(predictorsBlueList[m.member.user.id])) && predictorsRedList[m.member.user.id] == null) {
                            predictorsBlueList[m.member.user.id] = parseInt(m.content);
                            console.log(`set ${m.member.user.id} to ${m.content}`);
                          }
                        }

                      });

                      collector.on('end', collected => {
                        console.log(`Collected ${collected.size} items`);
                        console.log("gang");
                        console.log(predictorsBlueList);
                        console.log(predictorsRedList);
                        for (i in predictorsBlueList) {
                          tMsg = "\n" + tMsg + " " + i + ": " + predictorsBlueList[i].toString();
                        }
                        console.log("run 1");
                        console.log(tMsg);
                        message.channel.send(`X: ${tMsg}`);

                        tMsg = " ";
                        for (i in predictorsRedList) {
                          tMsg = "\n" + tMsg + i + ": " + predictorsBlueList[i].toString();
                        }
                        console.log("run 2");
                        console.log(tMsg);
                        message.channel.send(`X: ${tMsg}`);

                      });


                    });
                  }
                  //c3 end
                });

                collector.on('end', collected => {
                  console.log(`Collected ${collected.size} items`);
                });


              }
              //c2 end
            });

            collector.on('end', collected => {
              console.log(`Collected ${collected.size} items`);
            });

          }
          //c1 end
        });

        collector.on('end', collected => {
          console.log(`Collected ${collected.size} items`);
        });


      });
    }
    //code


  }
}