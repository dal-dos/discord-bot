module.exports = {
    name: 'botpreet',
    description: "This command will give command info",
    execute(message){
        message.channel.send(' ```To get points you must be in a voice channel, you get 1 point for every minut you are in a VC \n!bal : returns your balance \n!bal @user : returns the @users balance \n!bet 5050 <amount>: will bet an <amount> of points on a coinflip \n!bet @user <amount>: will bet an <amount> against a @user \n!give @user <amount>: gives a @user <amount> points``` ');
    }
}