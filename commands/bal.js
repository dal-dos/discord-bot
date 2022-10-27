    module.exports = {
    name: 'bal',
    description: "This command will give command info",
    execute(message, DMembers, client){
            if (message.content == '!bal') {
        message.channel.send(`${message.member.user.tag} has ${DMembers[message.member.user.id]} points`);
    } else if(message.content.includes('!bal') && message.content != "!baltop"){
        const balCheck = message.content.split(" ");
        if (balCheck[1] != null) {
        balCheck[1] = balCheck[1].toString();
        balCheck[1] = balCheck[1].replace('@', '');
        balCheck[1] = balCheck[1].replace('<', '');
        balCheck[1] = balCheck[1].replace('>', '');
        balCheck[1] = balCheck[1].replace('!', '');
        }
        if (DMembers[balCheck[1]] != null) {
            message.channel.send(`${client.users.cache.get(balCheck[1]).username} has ${DMembers[balCheck[1]]} points`);
          } else {
            message.channel.send(`${balCheck[1]} does not exist`);
        }
    }
    }
}