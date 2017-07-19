var url = require("url");
var crypto = require("crypto");

function sha1(str){
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}
var wechat=(function() {
	var config={
		token='wechat'
	}
	var handle={};


	var f=function(req,res){
		var query=url.parse(req.url,true).query;
		var timestamp = query.timestamp;
		var nonce = query.nonce;
		var scyptoString = sha1([nonce,timestamp,config.token].sort().join(''));
		
		var echostr = query.echostr;
		var signature = query.signature;
		var flag=(signature == scyptoString);
		var buffer=new Buffer('');
		req.on('data',function(chunk){
			buffer=Buffer.concat([buffer,chunk]);
		})
		req.on('end',function() {
			buffer=buffer.toStrin();
			req.body=buffer;
			if(!flag){
				return res.end('error');
			}else if(req.boy==''){
				return res.end(echostr);
			}else{
				//event 
			}
		})
	}
	f.set=function(obj){
		if(typeof obj=='object'&&obj.token){
			config.token=obj.token;
		}else{
			throw new Error('First argument must be a Object,token must in the object');
		}
	}
	f.on=function(type,cb){
		if(typeof cb=='function'&&typeof type=='string'){
			if(handle[type]==undefined){
				handle[type]=[cb];
			}else{
				handle[type].push(cb);
			}
		}else{
			throw new Error('First argument must be a string of the event type. Second argument must be a function');
		}
	}
	return f;
})
module.exports=wechat;