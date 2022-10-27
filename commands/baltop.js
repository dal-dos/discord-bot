module.exports = {
    name: 'baltop',
    description: "This command will give command info",
    execute(message, DMembers, client){
        //code
      if (message.content.includes('!baltop')) {
        var keyValues = []
          for (var key in DMembers) {
            if(key != "852780500702461962"){
            keyValues.push([client.users.cache.get(key).username , DMembers[key]]);
            }
          }
          
            keyValues.sort(function compare(kv1, kv2) {
              return kv1[1] - kv2[1]
              })
              var lbmsg = "";
              for (var i = keyValues.length-1; i > keyValues.length-21; i--) {
                lbmsg = lbmsg + (keyValues.length - i) + ". " + keyValues[i] + "\n";
              }
              lbmsg = lbmsg + "\n There is " + DMembers["852780500702461962"] + " in the pot";
              message.channel.send(lbmsg);
      }
        //code
    }
}