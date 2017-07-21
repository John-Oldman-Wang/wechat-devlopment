var http = require('http');
var url = require("url");
var crypto = require("crypto");
var port = 3000;
var token='xqn'
var xml2js=require('xml2js')



function sha1(str){
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

function validateToken(req,res){
    var buf=new Buffer('')
    req.on('data',function(chunk){
        buf=Buffer.concat([buf,chunk])
    })
    req.on('end',function(){
        req.body=buf.toString()
        //console.log('POST-DATA: '+buf.toString())
        xml2js.parseString(req.body,function(err,result){
            var obj=result;
            var url_obj=url.parse(req.url,true)
        	console.log("*** host: "+req.headers.host)
            console.log("*** URL:" + req.url);
            console.log(obj)
            console.log(url_obj)
            console.log(url_obj.query);
            var signature = url_obj.query.signature;
            var timestamp = url_obj.query['timestamp'];
            var nonce = url_obj.query.nonce;
            var echostr = url_obj.query.echostr;
            var oriArray =[nonce,timestamp,token];
            oriArray.sort();
            var original = oriArray.join('');
            var scyptoString = sha1(original);
            console.log('signature == scyptoString :'+(signature == scyptoString))
            if(signature == scyptoString&&req.body==''&&url_obj.pathname=='/'){
                res.end(echostr);
                console.log("Confirm and send echo back");
            }else if(req.body!=''&&signature == scyptoString){
                res.end(`<xml>\n<ToUserName><![CDATA[${obj.xml.FromUserName}]]></ToUserName>\n<FromUserName><![CDATA[${obj.xml.ToUserName}]]></FromUserName>\n<CreateTime>${new Date().getTime()}</CreateTime>\n<MsgType><![CDATA[${obj.xml.MsgType}]]></MsgType>\n<Content><![CDATA[${'you say :'+obj.xml.Content}]]></Content>\n</xml>`)
            }else {
                res.setHeader('Content-Type','text/html; charset=utf-8')
                res.end("服务器维护中，给您带来的不便深感抱歉，预计3天恢复使用");
                console.log("Failed!");
            }
            console.log('-------------------------------------------------------')
        })
    })
}
var wechat=require('./wechat.js')
var w=new wechat()
w.set({
    token:token
})
w.on('text',function(obj){
    obj.Content=`you say :${obj.Content}`
    return obj;
})
var webSvr = http.createServer(w);
webSvr.listen(port,function(){
    console.log(`server start at ${port}`);
});