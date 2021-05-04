var EJS = EJS || {};

EJS.namespace = function (ns_string){
  var parts = ns_string.split('.'),
      parent = EJS,
      i;
      
  //去除掉最前頭多餘的全域名稱
  if(parts[0]==="EJS"){
  	parts = parts.slice(1);
  }      	
  
  for(i=0;i<parts.length;i+=1){
  	//如果屬性不存在則建立
  	if(typeof parent[parts[i]] === "undefined"){
  	  parent[parts[i]] = {};
  	}
  	parent = parent[parts[i]];
  }
  return parent;
};

EJS.gup = function (parameter){
  parameter = parameter.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
  var regexS = "[\\?&]"+parameter+"=([^&#]*)",
      regex = new RegExp( regexS ),
      results = regex.exec( window.location.href );
       
  if ( results == null ){
    return "";  
  }else{
    return results[1];
  }
}   

EJS.namespace('EJS.utilities'); //一些共用的函式
EJS.namespace("EJS.object"); //紀錄所有元件的資訊
EJS.namespace("EJS.cookies"); //紀錄使用者的一些操作
EJS.namespace("EJS.template");
EJS.namespace("EJS.View"); 
EJS.namespace("EJS.View.Default");
EJS.namespace("EJS.sys");
EJS.namespace("EJS.data");
EJS.namespace("EJS.var");
EJS.namespace("EJS.svg");
EJS.namespace("EJS.rk4");
EJS.namespace("EJS.Model");
EJS.namespace("EJS.chat");
EJS.namespace("EJS.FN");
EJS.namespace("EJS.Run"); //run頁面專用

(function(){
	var uobj = EJS.utilities,
		  oobj = EJS.object,
      dobj = EJS.data,
      tobj = EJS.template,      
      defColor = '"#0000ff"';

  dobj.CATEGORY = []; //_EJS_CATEGORY
  dobj.KEYWORDS = []; //_EJS_KEYWORDS
  //template obj
  tobj.variableTitle = "\n        <tr>\n          <th><span lang=\"en\">Variable</span></th>\n          <th><span lang=\"en\">Initial value</span></th>\n          <th><span lang=\"en\">Type</span></th>\n          <th><span lang=\"en\">Dimension</span></th>\n          <th><span lang=\"en\">Comments</span></th>\n          <th><span lang=\"en\">Unit</span></th>\n          <th></th>\n          <th><span lang=\"en\">Decimal digits</span></th>\n        </tr>";

  //EJS Object start
  oobj.array = [];

  oobj.circle = {
      "cx":0,"cy":0,"rx":30,"ry":30,"sizeX":"30","sizeY":"30","posX":0,"posY":0,"fillColor":defColor,
      "lineColor":"","lineWidth":"1.5","transform":"translate(0,0)","circleStyle":"","ejsRotate":"0",
      "draggable":""};

  oobj.arrow = {"x1":10,"y1":50,"x2":50,"y2":50,"sizeX":"40","sizeY":"40","posX":"10","posY":"10","fillColor":defColor,"lineColor":"","lineWidth":"3","stroke":"rgb(6,120,155)","strokewidth": 4};
  oobj.trail = {"posX":0,"posY":0,"cx":"","cy":"","sizeX":"10","sizeY":"10","r":"10","fillColor":defColor,"lineColor":"","lineWidth":"1.5","amount":100,"cycle": true};
  oobj.trace = {"posX":0,"posY":0,"cx":"","cy":"","sizeX":"10","sizeY":"10","r":"10","fillColor":defColor,"lineColor":"","lineWidth":"1.5","amount":100,"cycle": true};
  oobj.line = {"x1":10,"y1":80,"x2":80,"y2":80,"sizeX":"80","sizeY":"80","posX":"10","posY":"10","fillColor":defColor,"lineColor":"","lineWidth":"4","stroke": "rgb(6,120,155)","strokewidth": 4};

  oobj.spring = {"posX":10,"posY":10,"sizeX":100,"sizeY":100,"r_posX":10,"r_posY":10,"r_sizeX":100,"r_sizeY":100,"pointsPerLoop":20,"radius":10,"segments":150,"fillColor":defColor,"lineWidth":"2.5"};
  oobj.image = {"posX":0,"posY":0,"x":0,"y":0,"sizeX":120,"sizeY":120,"width":120,"height":120,"imagefile":"/img/ejs_image.png","ejsRotate":"0"};
  oobj.text = {"text":"\"Default text\"","posX":10,"posY":10,"sizeX":100,"sizeY":100,"x":10,"y":10,"width":10,"height":10,"ejsRotate":0,"fillColor":'"#000000"'};
  oobj.polygon = {"data":"[100 100,130 130,130 250,130 30,130 70]","xData":"[100, 130, 130, 130, 80]","yData":"[100, 130,250,30,70]","posX":"","posY":"","polygonStyle":"false","fillColor":defColor,"lineWidth":2,"lineColor":defColor};
  oobj.analyticCurve = { "point":"400", "minimum":"0","maximum":"400","variable":"x", "xFn":"x","yFn":"50*Math.sin(0.04*x)","posX":"","posY":"","fillColor":defColor,"lineWidth":4,"lineColor":defColor};

  oobj.shapeSet = {"cx":30,"cy":30,"rx":30,"ry":30,"sizeX":"30","sizeY":"30","posX":"[0,50,100,150,200]","posY":"[0,50,100,150,200]","fillColor":defColor,"lineColor":"","lineWidth":"1.5","transform":"translate(0,0)","circleStyle":"","ejsRotate":"0","amount":5};
  oobj.segmentSet = { "x1":"[0,50,100,150,200]","y1":"[0,0,0,0,0]","x2":30,"y2":30,"sizeX":"30","sizeY":"30","posX":"[0,50,100,150,200]","posY":"[0,0,0,0,0]","fillColor":defColor,"lineColor":"","lineWidth":"4","transform":"translate(0,0)","ejsRotate":"0","amount":5};
  oobj.arrowSet = {"x1":"[-100,-50,0,50,100]","y1":"[0,0,0,0,0]","x2":30,"y2":30,"sizeX":"30","sizeY":"30","posX":"[-100,-50,0,50,100]","posY":"[0,0,0,0,0]","fillColor":defColor,"lineColor":"","lineWidth":"4","transform":"translate(0,0)","ejsRotate":"0","amount":5};

  oobj.slider = {"type":"slider","minimum":0,"maximum":50,"variable":"","initialValue":4,"step":1,"split":0,"close":"","action":"","format":""};
  oobj.range = {"type":"slider","minimum":0,"maximum":50,"variable":"","initialValue":4,"split":0,"close":"","action":""};
  oobj.button = {"type":"button","text":"\"button\"","action":""};
  oobj.twoStateButton = {"type":"twoStateButton","text":"twoStateButton","variable":"_isPaused","on_text":"\"Play\"","on_action":"_start()","on_hotKey":"","off_text":"\"Pause\"","off_action":"_pause()","off_hotKey":""};
  oobj.checkbox = {"type":"checkbox","text":"\"checkbox\"","variable":"","on_action":"_start()","off_action":"_pause()","action":"console.log(1);"};
  oobj.radio = {"type":"radio","text":"\"radiobutton\"","variable":"","on_action":"_start()","off_action":"_pause()"};
  oobj.plottingPanel = {"type":"plottingPanel","X":"","Y":"","amount":50,"xTitle":"","yTitle":"","lineType":"\"line\""};
  oobj.group = {"type":"group","posX":"","posY":"","sizeX":"","sizeY":"","transform":""};
  //EJS Object End

  //ejsAttr to svgAttr start
  oobj.attrs = [];
  
  oobj.attrs['circle'] = {
    attrs:{
      'posX': 'cx',
      'posY': 'cy',
      'sizeX': 'rx',
      'sizeY': 'ry',
      'ejsRotate': 'rotate',      
      'circleStyle': 'circleStyle',
      'draggable':'draggable'
    },
    styles:{
      'fillColor':'fillColor',
      'lineColor':'stroke',
      'lineWidth':'stroke-width'  
    }
  };

  oobj.attrs['line'] = {
    attrs:{
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2'     
    },
    styles:{      
      'fillColor':'stroke',
      'lineColor':'stroke',
      'lineWidth':'stroke-width'  
    }
  };

  oobj.attrs['arrow'] = {
    attrs:{
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2'
    },
    styles:{      
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width'
    }
  }

  oobj.attrs['spring'] = {
    attrs:{
      'posX': 'r_posX',
      'posY': 'r_posY',
      'sizeX': 'r_sizeX',
      'sizeY': 'r_sizeY'
    },
    styles:{
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width'
    }    
  }

  oobj.attrs['image'] = {
    attrs:{
      'posX': 'x',
      'posY': 'y',
      'ejsRotate': 'rotate',      
      'sizeX': 'width',
      'sizeY': 'height',
      'imagefile': "xlink:href"
    }
  }

  oobj.attrs['text'] = {
    attrs:{
      'posX': 'x',
      'posY': 'y',      
      'sizeX': 'size',
      'sizeY': 'height',
      'text': "text",
      "ejsRotate": 'rotate'
    },
    styles:{
      'fillColor': 'fill'      
    }
  }

  oobj.attrs['polygon'] = {
    attrs:{
      'posX': 'x',
      'posY': 'y',
      'sizeX': 'width',
      'sizeY': 'height',
      'data': "data",      
      'xData': "xData",
      'yData': "yData",
      "polygonStyle": "polygonStyle"      
    },
    style:{
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width',
      'lineColor': 'stroke'
    }
  }

  oobj.attrs['trace'] = {
    attrs:{
      'posX': 'posX',
      'posY': 'posY',
      'sizeX': 'sizeX',
      'sizeY': 'sizeY',     
      'fillColor': 'fill',
      'amount': 'amount',
      'cycle':'cycle'
    }  
  } 

  oobj.attrs['trail'] = {
    attrs:{
      'posX': 'posX',
      'posY': 'posY',
      'sizeX': 'sizeX',
      'sizeY': 'sizeY',     
      'fillColor': 'fill',
      'amount': 'amount',
      'cycle':'cycle'
    }  
  } 
  
  oobj.attrs['shapeSet'] = {
    attrs:{
      'posX': 'cx',
      'posY': 'cy',
      'sizeX': 'rx',
      'sizeY': 'ry',
      'ejsRotate': 'rotate',      
      'circleStyle': 'circleStyle',      
      'amount': 'amount'
    },
    styles:{
      'fillColor': 'fill'
    }
  }

  oobj.attrs['segmentSet'] = {
    attrs:{
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2',
      'fillColor': 'fill',
      'amount': 'amount'
    },
    styles:{   
      'lineWidth': 'stroke-width' 
    }
  }

  oobj.attrs['arrowSet'] = {
    attrs:{
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2',
      'fillColor': 'fill',
      'amount': 'amount'
    },
    styles:{
      'lineWidth': 'stroke-width' 
    }
  }

  oobj.attrs['analyticCurve'] = {
    attrs:{
      'point':'point',
      'minimum':'minimum',
      'maximum':'maximum',
      'posX': 'x',
      'posY': 'y',
      'xFn': 'xFn',
      'yFn': 'yFn',
      'variable': 'variable',
      'sizeX': 'width',
      'sizeY': 'height',
      'data': "data",      
      'xData': "xData",
      'yData': "yData"
    },
    styles:{
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width',
      'lineColor': 'stroke'
    }
  }

  oobj.attrs['slider'] = {
    attrs:{
      'action':'action'
    }  
  }
  
  //ejsAttr to svgAttr end

  //Translate 
  uobj.simLists = {};
  uobj.simListsIdx = 0;
  uobj.window;

  uobj.createMulitLang = function(){
    
    var langs = [],
        v = EJS.data.modelvariables.defineVarsList,
        o = EJS.object.array;

    for(var key in v){
      var d = v[key];
      if(d['comment']||d['unit']){
        //console.log(d['name'],d['comment'],d['unit']);
        langs.push({name:d['name']+'_comment',val:d['comment']});
        langs.push({name:d['name']+'_unit',val:d['unit']});
      }
    }

    for(var key in o){
      var d = o[key];
      switch (d.type){
        case 'slider':
          langs.push({name:d['id']+"_format",val:d['format']});
          break;
        case 'button':
        case 'checkbox':
          langs.push({name:d['id']+"_text",val:d['text']});
          break;
        case 'twoStateButton':
          langs.push({name:d['id']+"_on_text",val:d['on_text']});
          langs.push({name:d['id']+"_off_text",val:d['off_text']});
          break;
        case 'text':
          langs.push({name:d['id']+"_text",val:d['text']});
          break;

      }                    
    }

    langs.push({name:"ml_infoTitle",val:$("#INFO_TITLE").val()});
    return langs;
  }

  uobj.defaultLang = function(){
    
    EJS.data.multilang = this.createMulitLang();

    var obj = {"token":{}},
        l = {};
    for(var key in EJS.data.multilang){
      var d = EJS.data.multilang[key];
      if(d.val){
        l[d.name] = d.val.trim().replace(/\"/g,'');
      }else{
        l[d.name] = d.val;
      }
      
    }

    obj = {
      "token": l
    };

    var setting = {
        url: '/saveMultiLang',
        type: "post",
        dataType: "JSON",                
        data: {data:obj,filename:EJS.gup('name'),lang: $("#setMultiLang").val(),id:$("#multilang_id").val()}
      }, 
      def = $.ajax(setting);
      def.done(function(data){
        $("#multilang_id").val(data.id);
      });

  }

  uobj.eval = function(val){   
    try{
        return new Function('return '+ val)(); 
    }catch(e){      
        return val;
    }
  }
  
  uobj.checkJSCode = function(textarea){
    var code = $("#"+textarea).val();
    
    try{
      var test = eval(code);
      if(typeof(test)=="undefined"){
        EJSINFO.show('<span lang="en">OK</span>');
        return true;
      }
      if(test.toString()=="NaN"){
        ERROR.show("Something is wrong, please check.");
        return false;
      }else{
        EJSINFO.show('<span lang="en">OK</span>');
        return true;
      }
    }catch(e){
      ERROR.show(e);
      console.log(e);
      return false;
    }
  }

  uobj.checkObjName = function(len,objType,callback){
    var chkId = objType+"-"+len,
        flag = false;

    for(var key in EJS.object.array){
      
      if(chkId==EJS.object.array[key].id){
        flag = true;
        len++;        
      }
    }

    if(flag){
      return uobj.checkObjName(len,objType);
    }else{
      return len;
    }
    
    
    
    
  }

  uobj.translate = function(fn){
    
    EJS.data._EJS_LOAD_XML(fn,function(){
      console.log('translate_save');      
      EJS.saveJsonData(function(data){
        console.log(data);
        uobj.translate_save(data);
      });         
    });

  }

  uobj.translate_run = function(){
    console.log('EJS.utilities.simListsIdx:'+EJS.utilities.simListsIdx);
    uobj.window = window.open("http://127.0.0.1:8080/dev/?resave=true&name="+uobj.simLists[EJS.utilities.simListsIdx]);
    uobj.window.onbeforeunload = function(){
      console.log('onbeforeunload');
      EJS.utilities.simListsIdx++;
      this.translate_run();
    };
  }

  uobj.translate_getlist = function(){

    $.getJSON("/tmp/allfile.json", function(json) {    
      uobj.simLists = json;
      // for(var key in json){
      //   uobj.translate(json[key]);
      // }
      uobj.translate_run();
      
    }).done(function() {      

    }).fail(function(e) { 
      console.log( "error" );     
    });    
  }

  uobj.translate_save = function(jsondata){    
    console.log('translate_save');
    var setting = {
          url: "/savedata",
          type: "POST",
          dataType: "text",   
          data: jsondata
        },
        def = $.ajax(setting);

      def.done(function(data){        
        if(data=="success"){
          console.log('call next file.');
          window.close();

        }
      }).fail(function(data){      
        console.log("ajax is fail");
      })     
}

  //get ejss list
  uobj.getEJSSList = function(){
    var setting = {
      url: '/getFilelist',
      type: "post",
      dataType: "json",
      data: {idx:_EJS_EJSSLIST_IDX,keyword:EJS.cookies.keyword,type:'ejss'}
    },
    def = $.ajax(setting);
   
  def.done(function(data){    
    
    var systemAdmin = (data[0] && data[0].del==="remove")? true:false;
      
    uobj.createFilelist(data,'ejss');
    
  }).fail(function(data){      
    console.log("ajax is fail");
  })
    
  }

  /* 判斷是否為單一變數 */
  uobj.checkVar = function(chkVar,value){
    /*
    var v = EJS.data.modelvariables.defineVarsList;
      obj = _(v).find(function(o) {
        return o.name == name;
      });
  if(typeof(obj)=="object" ) return true;
  if(name == parseFloat(name)) return true;
  */
    var chkList = EJS.data.modelvariables.defineVarsList,
        len = chkList.length;

    for(var i=0;i<len;i++){
      if(chkList[i].name==chkVar){
        
        uobj.setVal2Var(chkVar,value);
        uobj.eval(chkVar + "=" + value);
        return true;
      }
    }

    return false;

  }

  uobj.setVal2Var = function(chkVar,value){
    var len = $("#defineVarSubTab li").length, //第一個li為 +
        thisDefineVarsList = [],   
        thisIdx = 0;
   
    for(var i=1;i<len;i++){        
      $("[id^='defineVarBMTable"+i+"'][id$='_1']").each (function() {      
        var tmpIdx = $(this).attr("id").split("_"),
            name = $("#defineVarBMTable"+i+"_"+tmpIdx[1]+"_1").val();
            if(name==chkVar){
              $("#defineVarBMTable"+i+"_"+tmpIdx[1]+"_2").val(value);            
            }            
      });  
    }
  }


	uobj.timeformat = function(initTime){
  		var myDate = new Date(initTime),
	        filelist = "",
	        month= (myDate.getMonth()>8)?myDate.getMonth()+1:"0"+(myDate.getMonth()+1),
	        year = myDate.getFullYear(),
	        date = (myDate.getDate()>9)?myDate.getDate():"0"+myDate.getDate(),
	        hr   = (myDate.getHours()>9)?myDate.getHours():"0"+myDate.getHours(),
	        min  = (myDate.getMinutes()>9)?myDate.getMinutes():"0"+myDate.getMinutes(),     
	        sec  = (myDate.getSeconds()>9)?myDate.getSeconds():"0"+myDate.getSeconds(), 
	        time= year+"/"+month+"/"+date+" "+hr+":"+min+":"+sec;
    	return time;     
	} 

	/*
     * Desc: 取小數點至 N 位數
     * Author: Squall
     * 
     */
	uobj.formatFloat = function(num, pos){
  	  var size = Math.pow(10, pos);
      return (Math.round(num * size) / size).toFixed(pos);
	}

  uobj.custFormat = function(num, format){
    //var pos = 0;
    //    return new Array(width + 1 - (number + '').length).join('0') + number;

    if(format.match(/\./g)){
      var pos = format.split('.'),
          size = Math.pow(10, pos[1].length);    
      
      return (Math.round(num * size) / size).toFixed(pos[1].length);
      
    }else{
      var size = Math.pow(10, 0);
      return (Math.round(num * size) / size).toFixed(0);
    }

  }
  /*
  * Desc: 角度徑度轉換
  * c(角度)=theta(徑度)*180 /Math.PI 
  *
  */
  uobj.deg2rad = function(deg){
    return parseFloat(deg)/Math.PI*180;
  }

}());

//動態載入JAVASCRIPT //
EJS.loadJSFile = function (jsname,loadJSONData){  
    
  script = jQuery("<script>").prop({
    async: true,
    charset: "utf-8",
    src: "tmp/"+jsname+".js"
    }).on(
        "load error",
        callback = function( evt ) {
            script.remove();
            callback = null;
            if ( evt ) {
              if( evt.type=="complete" ){
                console.log("success");
              }else{                        
                EJS.loadJSFileCallBack(loadJSONData);
              }
       
            }        
    });
    document.head.appendChild( script[ 0 ] );  
}
