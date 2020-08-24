/*	--------------------------------------------------------------------------/
*	author		: 
*	module		：
*											COPYRIGHT 
*	-------------------------------------------------------------------------*/


/*	--------------------------------------------------------------------------/
*	index.js
*	-------------------------------------------------------------------------*/	

const express = require('express');
const http = require("http");
const router = express.Router();

/*	--------------------------------------------------------------------------/
*	ルーティング：/top
*	-------------------------------------------------------------------------*/
router.get('/mens', function (request, response) {
  
  let totalmeta = {};
  totalmeta.title = "UG-STYLE:Result";
  totalmeta.cds = process.env.CDS_HOME;
  
  let totalrr = {};
  totalrr.result = {};


  /*	---------------------------------------------------------------------/
   *	debug#1 summer
   *	--------------------------------------------------------------------*/
  function debug1(request,response) {

    let obj2 = {};
    obj2.result = "success";
    let tmp21={},tmp22={},tmp23 = {},tmp24 = {},tmp25 = {},tmp26 = {};
    obj2.json = [tmp21,tmp22,tmp23,tmp24,tmp25];
    tmp21.id = "21";
    tmp21.image = "model-2911330_1920.jpg";
    tmp21.headline = "カジュアルスタイル";
    tmp21.sub_headline = "ビジネスシーンではオシャレと清潔感を両立させること";

    tmp22.id = "22";
    tmp22.image = "fashion-1979136_1920.jpg";
    tmp22.headline = "フォーマルスタイル";
    tmp22.sub_headline = "ビジネス空間の演出には上質なスーツが必要。必要なスーツが必ず見つかる。";

    tmp23.id = "23";
    tmp23.image = "rollers-4128215_1920.jpg";
    tmp23.headline = "ファッションアイテム";
    tmp23.sub_headline = "ネクタイは自分のセンスをアピールできる数少ないファッションアイテム。十分に楽しもう。";

    tmp24.id = "24";
    tmp24.image = "cravat-987584_1920.jpg";
    tmp24.headline = "コレクションアイテム";
    tmp24.sub_headline = "コーディネート済みのコレクションをチョイスするだけ。";

    
    tmp25.id = "25";
    tmp25.image = "store-984393_1920.jpg";
    tmp25.headline = "全てのアイテムをあなたに";
    tmp25.sub_headline = "UG Men'sはビジネス・ファッションに必要な全てを届けます";
    
    
    tmp26.id = "26";
    tmp26.image = "people-2570596_1920.jpg";
    tmp26.headline = "夏の特別コレクション";
    tmp26.sub_headline = "より快適に、より心地よいライフスタイルを";
    

    totalrr.result.status = 200;
    totalrr.result.body = obj2;

    response.render('mens',{ 
              meta: totalmeta,
              result: totalrr.result.body
    });
  }

 



  /*	---------------------------------------------------------------------/
   *	main
   *	--------------------------------------------------------------------*/
  debug1(request,response);
  //serial();

  /*	---------------------------------------------------------------------/
   *	promise : serial
   *	--------------------------------------------------------------------*/
  function serial () {
      let promise = Promise.resolve();
      promise
          .then(call_finder.bind(this,totalrr))
          .then(render_page);
  }


  /*	---------------------------------------------------------------------/
   *	promise:function():call_finder
   *	--------------------------------------------------------------------*/
  function call_finder(totalrr) {
      return new Promise((resolve,reject) => {
          let param = "男物";
          let options = {
              protocol: "http:",
              host: "backweb2",
              port: 8080,
              path: "/back2_find?key="+encodeURIComponent(param),
              method: "GET"
          };
          let rr = {};  
          rr.status = ''; 
          rr.body = 'Service backweb2 Unavailable';
          totalrr.result = rr;
          _call_backweb(resolve,reject,options,rr);
      });
  }

  /*	---------------------------------------------------------------------/
   *	promise:function():render_page
   *	--------------------------------------------------------------------*/
  function render_page () {
      return new Promise((resolve,reject) => {
          response.render('mens',{ 
               meta: totalmeta,
              result: totalrr.result.body
          });
          resolve("render complete");
      });
  }


  /*	---------------------------------------------------------------------/
   *	common:function():http get
   *	--------------------------------------------------------------------*/
  function _call_backweb(resolve,reject,options,rr) {
      const req = http.request(options,(res)=>{
          let body = '';
          rr.status = res.statusCode;
          res.setEncoding("utf-8");
          res.on("data",(chunk) => {
              body += chunk;
          });
          res.on("end",(chunk)=>{
              try {
                rr.body = JSON.parse(body);
              } catch(error) {
                let obj ={};obj.json=[];
                rr.body = obj;
              }
              resolve(rr);
          });
      });
      req.on('error',(error) => {
        console.log(error.message);
        let obj ={};obj.json=[];
        rr.body = obj;
        resolve(rr);
      });
      req.end();
  }

});


module.exports = router;


