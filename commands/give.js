module.exports = {
    name: 'give',
    description: "This command will give command info",
    execute(message, DMembers, client, logData){

      //code
        if (message.content.includes('!give')) {
        const giveCommand = message.content.split(' ');
        giveCommand[1] = giveCommand[1].toString();
        giveCommand[1] = giveCommand[1].replace('@', '');
        giveCommand[1] = giveCommand[1].replace('<', '');
        giveCommand[1] = giveCommand[1].replace('>', '');
        giveCommand[1] = giveCommand[1].replace('!', '');
        if(giveCommand[2] >= 0){
        if (DMembers[giveCommand[1]] != null) {
            if (DMembers[message.member.user.id] >= parseInt(giveCommand[2])) {
                DMembers[giveCommand[1]] = DMembers[giveCommand[1]] + parseInt(giveCommand[2]);
                DMembers[message.member.user.id] = DMembers[message.member.user.id] - parseInt(giveCommand[2]);
                message.channel.send(`${message.member.user.tag} has given ${giveCommand[2]} point(s) to ${client.users.cache.get(giveCommand[1]).username}`);
                logfData = `\n ${message.member.user.username} has given ${giveCommand[2]} point(s) to ${client.users.cache.get(giveCommand[1]).username} \n They now have ${DMembers[message.member.user.id]} and ${DMembers[giveCommand[1]]}`;
                logData(logfData);
            } else {
                message.channel.send(`You do not have enough points`);
            }
        } else {
            message.channel.send(`${name} does not exist`);
        }
        }
        }
    //code


    }
}