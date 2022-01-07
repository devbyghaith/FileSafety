export default function GenerateString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    
    for (var index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
   
    return result;
}