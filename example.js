const route53 = require('./index.js');

route53.createSubdomain("test3.eagle3dstreaming.com", "54.158.27.72", function (data, error){
    if(error){
        console.error("error: ", error);
    }
    if(data){
        console.log("Data: ", data);
    }
});