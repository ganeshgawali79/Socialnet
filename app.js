var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db1=mongojs('ibm_user_registers',['ibm_user_registers']);
var db=mongojs('ibm_user',['ibm_user']);
var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));



app.post('/signin',function(req,res){
    console.log('data received');
    console.log(req.body);
    console.log(req.body.passwd);

    db1.ibm_user_registers.find(function(err,docs){
    var status='fail';

        for(var d in docs){
           console.log("employee id="+docs[d].empid ,docs[d].passwd);
            if(docs[d].empid === req.body.empid && docs[d].passwd === req.body.passwd){
                status='success';
            }
        }
        if(status === 'success')
            res.json({"message":"success"});
        else
            res.json({"message":"failed"});

    });

});

app.post('/registerdata', function (req,res) {
    //console.log(req.body);

    /*db1.ibm_user_registers.find(function (err,doc) {
        console.log(doc);
    });*/

    db.ibm_user.find(function (err, docs) {
        //console.log(docs);
        var status="fail";
        for(var d in docs){
            if(docs[d].empid === req.body.empid && docs[d].email === req.body.email){
                //console.log('pass');
                status="success";
                //console.log(data);
               db1.ibm_user_registers.find(function (err,doc) {
                   // console.log(doc);
                var flag=false;
                    for(var d in doc){
                        if(doc[d].empid === req.body.empid || doc[d].email === req.body.email) {
                            console.log('record is present');
                            flag=true;
                        }
                    }
                   if(flag === false){
                       db1.ibm_user_registers.insert(req.body, function (err,docs) {
                           console.log(docs);
                           });
                       res.json({"message":"success"});
                   }
                   else{
                       res.json({"message":"user is already registered "});
                       res.end();
                   }

               });

            }

        }
        if(status === 'fail')
            res.json({"message":"fail"});
    });
});


app.listen(3000);
console.log('lisening on..3000');
