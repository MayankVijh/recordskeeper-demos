//declaring global flags here //


var CONSOLE_DEBUG = true;
var first ='';
var privkey1;
var  pubaddr;
var pubkey1;
var dataHex;
var globe;
var jsondata;
var net = localStorage.getItem("network");
var captchaSuccess;
var testnetUrl = 'http://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/';
var mainnetUrl = 'http://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/';
var Captcharesponse;
var response;
var registeraddr;
var captchares;
var hexData; 
// global flags declaration ends here // 

$(document).ready(function(){
    
         // Animate loader off screenvae=
    
           $(".se-pre-con").fadeOut("slow");  // fadeout the preloader
          
            if(net == "MainNetwork"){
                  $('#top').css('background', '#22283a');
                  $('#top').css('color', '#ffffff');
                  $('.tgl-light').prop('checked', true);
                  $('#nav').css('background', '#22283a');
                  $('#table-one th').css('background', '#22283a');
                   $('#togglecontlabel').text('Main Network');
            }
            else if(net == "TestNetwork"){

                 $('#top').css('background', '#54b2ce');
                 $('#togglecontlabel').text('Test Network');
                  $('.action-button').css('background', '#54b2ce');
                  
                  $(".action-button").hover(function() {
                    $(".action-button").css('box-shadow', '0 0 0 2px white, 0 0 0 3px #54b2ce');
                  });
                  // $('a').css('color', '#54b2ce');
                  // $('li').before().css('background', '#54b2ce');
            }
            else{
                net == "TestNetwork";
                localStorage.setItem("network", "TestNetwork");
                 $('#top').css('background', '#54b2ce');
                 $('#togglecontlabel').text('Test Network');
                  $('.action-button').css('background', '#54b2ce');
                  
                  $(".action-button").hover(function() {
                    $(".action-button").css('box-shadow', '0 0 0 2px white, 0 0 0 3px #54b2ce');
                  });
            }
          networkToggle();

          $("#lastPrevious").click(function(){
              // $("#footer").css("margin-top", "659px");
          });

          $('.recordPrevBtn').click(function(){
              // $('footer').css("margin-top", "450px");
          });
          $('#youcanfind').hide();
     
});

 function ToggleNetwork(){
        if($('#cb1').is(':checked'))
            {
             net = "TestNetwork";
               localStorage.setItem("network", "TestNetwork");
                // $('#top').css('background', '#54b2ce');
                 $('#togglecontlabel').text('Test Network');
                 window.location.href = "index.php";
                 $('.action-button').css('background', '#54b2ce');

              
            }
            else
            {
                net = "MainNetwork";
               localStorage.setItem("network","MainNetwork");
                
                 $('#top').css('background', '#22283a');
                 $('#table-one th').css('background', '#22283a');
                  $('#top').css('color', '#ffffff');
                 
                   $('#togglecontlabel').text('Main Network');
                   window.location.href = "index.php";
            }
    }
    function networkToggle(){
  $('.tgl-btn').click(function(){
        ToggleNetwork();
    });
}


// CreateKeyPairs function here that makes a post request to sendwithdata.php
//params : NULL
// get_address
function CreateKeyPairs(net) {
    var netw = net;
    $.ajax({
    type: "POST",
    url: 'php/createkeypairs.php',
    data:{net: netw},
    success:function(Response) {
        var x = Response;
        x = JSON.parse(x);
        var y = x.error;
        if(y != null){
            swal({
                    title:'Something went wrong! <br> Please try again!!!',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
  confirmButtonText: "OK!",
                    timer: 15000
            });
        }
        else{
         jsondata = x.result[0];
        CONSOLE_DEBUG && console.log('result in json format keys:', jsondata);

              pubaddr = x.result[0].address;       //public address here 
              privkey1 = x.result[0].privkey;     // privkey here
              pubkey1 = x.result[0].pubkey;      // get public key here

        CONSOLE_DEBUG && console.log('privkey', privkey1);  
        CONSOLE_DEBUG && console.log('result address :', pubaddr);
        CONSOLE_DEBUG && console.log('result key :', pubkey1);
        localStorage.setItem("pubaddr", pubaddr);
        document.getElementById('registerd').value = pubaddr;
        document.getElementById('modalshowaddress').innerHTML = 'Public Address : '+ pubaddr;
        document.getElementById('modalshowkey').innerHTML = 'Private Key : ' + privkey1;
        
        
        ///////////////
         var dataStr = "data:text/json;charset=utf-8," + ('{'+'"xrk_address"'+":"+'"'+pubaddr+'"'+","+'"xrk_private_key"'+":"+'"'+privkey1+'"'+'}');
          var dlAnchorElem = document.getElementById('downloadlink');
          dlAnchorElem.setAttribute("href",     dataStr     );

                if(net == "MainNetwork"){
                     dlAnchorElem.setAttribute("download", "Recordskeeper-wallet.json");
                     dlAnchorElem.click();
                 }else if (net == "TestNetwork"){

                   dlAnchorElem.setAttribute("download", "Recordskeeper-test-wallet.json");
                     dlAnchorElem.click();
                 }
               
      
        (function () {
            var textFile = null,
              makeTextFile = function (text) {
                var data = new Blob([text], {type: 'application/json'});

                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (textFile !== null) {
                  window.URL.revokeObjectURL(textFile);
                }

                textFile = window.URL.createObjectURL(data);

                return textFile;
              };

 
                var create = document.getElementById('create'),
                textbox = document.getElementById(privkey1);


                var link = document.getElementById('downloadlink');
                link.href = makeTextFile('{'+'"xrk_address"'+":"+'"'+pubaddr+'"'+","+'"xrk_private_key"'+":"+'"'+privkey1+'"'+'}');
                link.style.display = 'block';

 
        });
        
        ////////////// self - invoking function  

    }
    }

    }); 
}
// toHex() function here that converts any string toHex
// Params : str 
// return : hex 
function toHex(str) {
    var arr = [];
  for (var i = 0, l = str.length; i < l; i ++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex.length > 1 && hex || "0" + hex);
  }
  return arr.join('');

}
// recordData() function here that converts any string toHex
// Params : null 
// return : none
function hex2a(hexx) {
       var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
} 



  

$('#retrieve').click(function(){

  // jQuery(".table-responsive").css("display", "none");
  // jQuery(".norecords").css("display", "block");
    
$('#table-one').find("tr:not(:first)").remove();
$('#table-one').css("display", "table");


     var key1 = document.getElementById('regist').value;
    liststreamData(key1,net);

    $('#youcanfind').show();

  


   
    
});

                        

function liststreamData(key1, netw) {
    var local = netw;
    var ac = key1;
    $.ajax({
          type: "POST",
          url: 'php/liststreamdata.php',
          data:({key: ac, net: local}),
          success:function(Response) {


              var x = Response;
              x = JSON.parse(x);


              var re = x.result;
              CONSOLE_DEBUG && console.log("resultarray", re);

              var relen = re.length;
              CONSOLE_DEBUG && console.log("resultarray", relen);

              
              if (relen == 0 ){

                jQuery(".table-responsive").css("display", "none");
                jQuery(".norecords").css("display", "block");
              }

          
            
              else{
              // var p = x.result[0].publishers[0];

                       jQuery(".table-responsive").css("display", "block");
                      jQuery(".norecords").css("display", "none");

                       

                      x.result = x.result.reverse();

                   for(var i= 0; i < x.result.length; i++) {

                      CONSOLE_DEBUG &&  console.log("valueof x",x.result[i] );
                      var publisherAddr = x.result[i].publishers;
                      var publisherData = hex2a(x.result[i].data);
                      var publisherKey = x.result[i].key;
                      var txid = x.result[i].txid;
                      var timestamp = x.result[i].time;

                      CONSOLE_DEBUG && console.log("timestamp", timestamp);
                      
                      var date = new Date(timestamp*1000);

                      var year = date.getFullYear();
                      var month = date.getMonth() + 1;
                      var day = date.getDate();
                      var hours = date.getHours();
                      var minutes = date.getMinutes();
                      var seconds = date.getSeconds();



                       CONSOLE_DEBUG &&  console.log("valueof publisherAddr", publisherAddr);
                       CONSOLE_DEBUG &&  console.log("valueof publisherData", publisherData );
                       CONSOLE_DEBUG &&  console.log("valueof publisherKey", timestamp );


                       $('.table-a').append("<tr><td  >"+publisherAddr+"</td>  <td id ='txid"+i+ "'><a id='aid"+i+ "' target = '_blank'> "+publisherData+" </a></td> <td>"+year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds+"</td></tr>");
                      
                       if(net == "MainNetwork"){
                            $('#aid'+i).attr("href",  mainnetUrl+txid);
                        }
                        else if(net == "TestNetwork"){

                                $('#aid'+i).attr("href", testnetUrl+txid);
                        }

                    


                   }  

              }
          }  
    });
}






 

$('#authorize').click(function(){
   privkey1 = document.getElementById('password-field').value;
    signrawtransaction(net);
    $('#reviewPrev').css("display", "none");
    // $('#authorize').prop("disabled", true);
    // $('#authorize').addClass("disabledbtn");
     // $('#authorize').attr('value', 'Published');
     
   
});

$('#authnext').click(function(){
  
});


