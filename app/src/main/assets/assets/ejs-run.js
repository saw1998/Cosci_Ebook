const FILENAME = 'tvN7iL1511917540560';
EJS.CHKVER = "1.0";
EJS.VERSION = "1.0";

var dt = 0;
var _EJS_FILELIST_IDX = 0,
    _EJS_MYFILELIST_IDX = 0,
    _EJS_EJSSLIST_IDX = 0,
    _EJS_ACTIVITYLIST_IDX = 0;

  
  $(document).ready(function(){
    var dobj = EJS.data,
        uobj = EJS.utilities;

    EJS.MOE();

  $("#descBtn").on("click", function(){
    $("#info").modal();
  })

  $("#demo_start").click(function(){    
    _start();    
  });
  
  $("#demo_pause").click(function(){
    _pause();
  });
  
  $("#demo_stop").click(function(){
    _reset();    
  });
  

});


/* EJS code start */
EJS.sys.node = null;
//EJS.sys.circleArray = new Array();
EJS.sys.stage = null;
EJS.sys.changeStatus = false;
EJS.sys._EVELVARS='var ';
EJS.sys.saveJson = new Object();
//EJS.data.modelvariables = [];
EJS.View.zeroLength = 0;
EJS.View.xPoints = new Array(),
EJS.View.yPoints = new Array();




EJS.data.playState = 0; // 0:stop, 1:play, 2:pause  
EJS.data.autostart = 0; // Model > Evolution > Auto Start
EJS.data.modelvariables = []; 
EJS.data.modelvariables.defineVarsList = [];
EJS.data.modelvariables.rvoVarsList = [];
EJS.data._springVar = EJS.object.spring; //EJS.View.Default.Spring;
EJS.data.circleArray = new Array();
EJS.data.controlArray = new Array();
EJS.data.state = {};
EJS.data.Elements = null;

//新版記錄元件值
EJS.data.elementsJson = {}; 

//save state
EJS.changeStatus = function(type){
  EJS.sys.changeStatus = type;  
}


EJS.chat.sendState = function(d){
  console.log("send state");
  //$("#chatframe").contents().find("#message").val(d); 
  $("#chatframe").contents().find("#yourEnter").click();
}
  
/*
 * 取得使用者自訂變數的值
 */     
EJS.data.getValue = function(myVar,obj){
  for(var i=0;i<obj.length;i++){
    if (obj[i].name == myVar){
      return i;
    }
  }
  return -1;
}

EJS.View.updateAnalyticCurve = function(id,type){
  var objs = EJS.object.array,
      uobj  = EJS.utilities,
      _min = "",
      _max = "",
      _point = "",
      _xA = [],
      _yA = [],
      _lineColor,
      _lineWidth,
      that = null; 

  for(var key in objs){
    if(objs[key]['id']==id){
      that = objs[key];
      break;
    }
  }

  if(type){
    _point = that.point;
    _min = that.minimum;
    _max = that.maximum;
    _variable = that.variable;
    _xFn = that.xFn;
    _yFn = that.yFn;  
    _lineColor = that.lineColor;
    _lineWidth = that.lineWidth;
  }else{
    _point = $("#attr_point").val();
    _min = $("#attr_minimum").val();
    _max = $("#attr_maximum").val();
    _variable = $("#attr_variable").val();
    _xFn = $("#attr_xFn").val();
    _yFn = $("#attr_yFn").val();
    _lineColor = $("#attr_lineColor").val();
    _lineWidth = $("#attr_lineWidth").val();
  }
  


  d3.selectAll("#" + id + " .analyticCurve")
    .attr("points", function(){

      var min = new Function('return '+ _min)(),
          max = new Function('return '+ _max)(),
          point = new Function('return '+ _point)(),
          xA = [],
          yA = []; 
  
    try{    
      eval('for(var i=0;i<point;i++){ ' + 
         'var ' + _variable + '= min+i*(max-min)/(point-1);' +

         'xA[i] = ' + _xFn + ';'+
         'yA[i] = ' + _yFn + ';}');
    }catch(e){
      console.log('create point error');
    }
      var str = "";

      for(var i=0,len=xA.length;i<len;i++){  
       if(str!="") str += ",";    
        str += xA[i] + " " + yA[i];    
      }    
      return str; })
    .attr("stroke", uobj.eval(_lineColor))
    .attr("fill","none")
    .attr("stroke-width", uobj.eval(_lineWidth));



}




//載入已儲存的檔案
EJS.data._EJS_LOAD_XML = function(filename, callback){
  var loadJSONData = {"simLang":"zh_TW","variables":"t=0,dt=0.05,FPS=20,mode=0,n1=1,n2=1.333,xe1=200,ye1=200,xe2=150,ye2=200,xf=-125,yf=-300,n21s=n2*n2-n1*n1,lxe1=xe1-xf,de1=150,dde1=0,fxe1=0,fxe11=0,xd1=xe1-de1,lxe2=xe2-xf,de2=150,dde2=0,fxe2=0,fxe22=0,xd2=xe2-de2,sxe1=0,b=0,sxe2=0,d=0,xm=0,ym=0,vxf=0,xn=250,yn=100,num=7,xfn=Array.apply(null, Array(num)).map(function() { return 0}),yfn=Array.apply(null, Array(num)).map(function() { return 0}),lxe1n=Array.apply(null, Array(num)).map(function() { return 0}),de1n=Array.apply(null, Array(num)).map(function() { return 150}),dde1n=Array.apply(null, Array(num)).map(function() { return 0}),fxe1n=Array.apply(null, Array(num)).map(function() { return 0}),fxe11n=Array.apply(null, Array(num)).map(function() { return 0}),xd1n=Array.apply(null, Array(num)).map(function() { return 0}),lxe2n=Array.apply(null, Array(num)).map(function() { return 0}),de2n=Array.apply(null, Array(num)).map(function() { return 150}),dde2n=Array.apply(null, Array(num)).map(function() { return 0}),fxe2n=Array.apply(null, Array(num)).map(function() { return 0}),fxe22n=Array.apply(null, Array(num)).map(function() { return 0}),xd2n=Array.apply(null, Array(num)).map(function() { return 0}),sxe1n=Array.apply(null, Array(num)).map(function() { return 0}),bn=Array.apply(null, Array(num)).map(function() { return 0}),sxe2n=Array.apply(null, Array(num)).map(function() { return 0}),dn=Array.apply(null, Array(num)).map(function() { return 0}),xmn=Array.apply(null, Array(num)).map(function() { return 0}),ymn=Array.apply(null, Array(num)).map(function() { return 0}),vxfn=0,ad1=0,sizea=122,sizeb=0,sizec=0,colorf=\"none\",stext1=60,sized=30,cgs=255-Math.round((n2-1)*110),colorS=`rgba(0,${cgs},255,0.4)`;","IndependentVariable":"t","Increment":"dt","AbsoluteTolerance":"0.00001","FramesPerSecond":"20","StepsPerDisplay":"1","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","numericalMethod":"","INFO_TITLE":"光的折射-捕魚去","INFO_PUBLIC":"false","oriSimFilename":"","INFO_KEYWORDS":["refractive index","snell's law"],"category":["","Optics"],"keywords":["refractive index","snell's law"],"drawingPanel":{"autoscaleX":"","autoscaleY":"","minimumX":"-400","minimumY":"-400","maximumX":"400","maximumY":"400"},"defineVars":[{"index":"0","name":"t","value":"0","type":"double","dimension":"","page":"defineVarBMTable1","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"1","name":"dt","value":"0.05","type":"double","dimension":"","page":"defineVarBMTable1","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"2","name":"FPS","value":"20","type":"double","dimension":"","page":"defineVarBMTable1","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"3","name":"mode","value":"0","type":"double","dimension":"","page":"defineVarBMTable1","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"4","name":"n1","value":"1","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"true","comment":"","unit":"","format":"0.00"},{"index":"5","name":"n2","value":"1.333","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"true","comment":"","unit":"","format":"0.000"},{"index":"6","name":"xe1","value":"200","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"7","name":"ye1","value":"200","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"8","name":"xe2","value":"150","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"9","name":"ye2","value":"200","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"10","name":"xf","value":"-125","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"11","name":"yf","value":"-300","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"12","name":"n21s","value":"n2*n2-n1*n1","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"13","name":"lxe1","value":"xe1-xf","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"14","name":"de1","value":"150","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"15","name":"dde1","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"16","name":"fxe1","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"17","name":"fxe11","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"18","name":"xd1","value":"xe1-de1","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"19","name":"lxe2","value":"xe2-xf","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"20","name":"de2","value":"150","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"21","name":"dde2","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"22","name":"fxe2","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"23","name":"fxe22","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"24","name":"xd2","value":"xe2-de2","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"25","name":"sxe1","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"26","name":"b","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"27","name":"sxe2","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"28","name":"d","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"29","name":"xm","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"30","name":"ym","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"31","name":"vxf","value":"0","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"32","name":"xn","value":"250","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"33","name":"yn","value":"100","type":"double","dimension":"","page":"defineVarBMTable2","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"34","name":"num","value":"7","type":"double","dimension":"","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"35","name":"xfn","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"36","name":"yfn","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"37","name":"lxe1n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"38","name":"de1n","value":"150","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"39","name":"dde1n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"40","name":"fxe1n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"41","name":"fxe11n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"42","name":"xd1n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"43","name":"lxe2n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"44","name":"de2n","value":"150","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"45","name":"dde2n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"46","name":"fxe2n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"47","name":"fxe22n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"48","name":"xd2n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"49","name":"sxe1n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"50","name":"bn","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"51","name":"sxe2n","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"52","name":"dn","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"53","name":"xmn","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"54","name":"ymn","value":"0","type":"double","dimension":"[num]","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"55","name":"vxfn","value":"0","type":"double","dimension":"","page":"defineVarBMTable3","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"56","name":"ad1","value":"0","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"57","name":"sizea","value":"122","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"58","name":"sizeb","value":"0","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"59","name":"sizec","value":"0","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"60","name":"colorf","value":"\"none\"","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"61","name":"stext1","value":"60","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"62","name":"sized","value":"30","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"63","name":"cgs","value":"255-Math.round((n2-1)*110)","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"},{"index":"64","name":"colorS","value":"`rgba(0,${cgs},255,0.4)`","type":"double","dimension":"","page":"defineVarBMTable4","visiable":"false","comment":"","unit":"","format":"0.00"}],"rvoVars":[{"index":"0","name":"xf","value":"vxf"},{"index":"1","name":"xfn[i]","value":"vxfn"}],"newElVars":[{"id":"circle-0","name":"\"circle-0\"","type":"circle","cx":"0","cy":"-200","rx":"800","ry":"400","rotate":"0","circleStyle":"\"RECTANGLE\"","ejsRotate":"0","posX":"0","posY":"-200","sizeX":"800","sizeY":"400","fillColor":"colorS","lineColor":"","lineWidth":"1.5","group":"","undefined":"","cxType":"false","cyType":"false","rxType":"false","ryType":"false","transform":"","offset":"","stroke":"","selectLineColor":"#000000","selectColor":"#000000","stroke-width":"1.5","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;"},{"id":"trace-14","name":"\"trace-14\"","group":"","type":"trace","posX":"xf","posY":"yf","sizeX":"ad1/3","sizeY":"ad1/3","amount":"800","fillColor":"\"#800000\"","cycle":"true","undefined":"","transform":"","ejsRotate":"","fill":"\"#800000\"","selectColor":"#800000","lineWidth":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-250);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"trace-15","name":"\"trace-15\"","group":"","type":"trace","posX":"xm","posY":"ym","sizeX":"ad1/3","sizeY":"ad1/3","amount":"800","fillColor":"\"#ff0000\"","cycle":"true","undefined":"","transform":"","ejsRotate":"","fill":"\"#ff0000\"","selectColor":"#ff0000","lineWidth":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-250);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"image-9","name":"\"image-9\"","group":"","type":"image","posX":"200","posY":"200","sizeX":"45","sizeY":"45","width":"45","height":"45","ejsRotate":"0","imagefile":"\"./uploads/rJbD9S9ef.png\"","undefined":"","x":"200","y":"200","transform":"","rotate":"0","xlink:href":"\"./uploads/rJbD9S9ef.png\"","file":"","offset":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+200);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-350);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"image-10","name":"\"image-10\"","group":"","type":"image","posX":"150","posY":"200","sizeX":"45","sizeY":"45","width":"45","height":"45","ejsRotate":"0","imagefile":"\"./uploads/rJbD9S9ef.png\"","undefined":"","x":"150","y":"200","transform":"","rotate":"0","xlink:href":"\"./uploads/rJbD9S9ef.png\"","file":"","offset":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+200);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-350);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"polygon-11","name":"\"polygon-11\"","group":"","type":"polygon","polygonStyle":"ture","lineColor":"\"#800000\"","lineWidth":"ad1","fillColor":"colorf","ejsRotate":"","xData":"[xfn[2],xfn[0],xfn[1],xfn[3],xfn[4],xfn[5],xfn[3],xfn[2],xfn[1]]","yData":"[yfn[2],yfn[0],yfn[1],yfn[3],yfn[4],yfn[5],yfn[3],yfn[2],yfn[1]]","posX":"","posY":"","undefined":"","data":"","x":"","y":"","sizeX":"","width":"","sizeY":"","height":"","transform":"","offset":"","stroke":"\"#800000\"","selectLineColor":"#000000","selectColor":"#000000","stroke-width":"ad1","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","dashArray":"","stoke-dasharray":""},{"id":"polygon-13","name":"\"polygon-13\"","group":"","type":"polygon","polygonStyle":"false","lineColor":"\"#ff0000\"","lineWidth":"5","fillColor":"\"#ff9b6a\"","ejsRotate":"","xData":"[xmn[2],xmn[0],xmn[1],xmn[3],xmn[4],xmn[5],xmn[3],xmn[2],xmn[1]]","yData":"[ymn[2],ymn[0],ymn[1],ymn[3],ymn[4],ymn[5],ymn[3],ymn[2],ymn[1]]","posX":"","posY":"","undefined":"","data":"","x":"","y":"","sizeX":"","width":"","sizeY":"","height":"","transform":"","offset":"","stroke":"\"#ff0000\"","selectLineColor":"#000000","selectColor":"#ff9b6a","stroke-width":"5","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","dashArray":"[5,5]","stoke-dasharray":"[5,5]"},{"id":"line-4","name":"\"line-4\"","group":"","type":"line","x1":"xe1","y1":"ye1","x2":"-de1","y2":"-ye1","ejsRotate":"","posX":"xe1","posY":"ye1","sizeX":"-de1","sizeY":"-ye1","lineWidth":"ad1","fillColor":"\"#808080\"","undefined":"","transform":"","circleStyle":"","offset":"","lineColor":"","stroke":"\"#808080\"","selectLineColor":"#000000","selectColor":"#808080","stroke-width":"ad1","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;"},{"id":"line-5","name":"\"line-5\"","group":"","type":"line","x1":"xe2","y1":"ye2","x2":"-de2","y2":"-ye2","ejsRotate":"","posX":"xe2","posY":"ye2","sizeX":"-de2","sizeY":"-ye2","lineWidth":"ad1","fillColor":"\"#808080\"","undefined":"","transform":"","circleStyle":"","offset":"","lineColor":"","stroke":"\"#808080\"","selectLineColor":"#000000","selectColor":"#808080","stroke-width":"ad1","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;"},{"id":"line-6","name":"\"line-6\"","group":"","type":"line","x1":"xf","y1":"yf","x2":"lxe1-de1","y2":"-yf","ejsRotate":"","posX":"xf","posY":"yf","sizeX":"lxe1-de1","sizeY":"-yf","lineWidth":"ad1","fillColor":"\"#808080\"","undefined":"","transform":"","circleStyle":"","offset":"","lineColor":"","stroke":"\"#808080\"","selectLineColor":"#000000","selectColor":"#808080","stroke-width":"ad1","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;"},{"id":"line-7","name":"\"line-7\"","group":"","type":"line","x1":"xf","y1":"yf","x2":"(lxe2-de2)","y2":"-yf","ejsRotate":"","posX":"xf","posY":"yf","sizeX":"(lxe2-de2)","sizeY":"-yf","lineWidth":"ad1","fillColor":"\"#808080\"","undefined":"","transform":"","circleStyle":"","offset":"","lineColor":"","stroke":"\"#808080\"","selectLineColor":"#000000","selectColor":"#808080","stroke-width":"ad1","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;"},{"id":"line-9","name":"\"line-9\"","group":"","type":"line","x1":"xm","y1":"ym","x2":"xd1-xm","y2":"-ym","ejsRotate":"","posX":"xm","posY":"ym","sizeX":"xd1-xm","sizeY":"-ym","lineWidth":"ad1","fillColor":"\"#8000ff\"","undefined":"","transform":"","circleStyle":"","offset":"","lineColor":"","stroke":"\"#8000ff\"","selectLineColor":"#000000","selectColor":"#8000ff","stroke-width":"ad1","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","dashArray":"[5,5]"},{"id":"line-10","name":"\"line-10\"","group":"","type":"line","x1":"xm","y1":"ym","x2":"xd2-xm","y2":"-ym","ejsRotate":"","posX":"xm","posY":"ym","sizeX":"xd2-xm","sizeY":"-ym","lineWidth":"ad1","fillColor":"\"#8000ff\"","undefined":"","transform":"","circleStyle":"","offset":"","lineColor":"","stroke":"\"#8000ff\"","selectLineColor":"#000000","selectColor":"#8000ff","stroke-width":"ad1","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":"","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","dashArray":"[5,5]"},{"id":"circle-12","name":"\"circle-12\"","type":"circle","cx":"xfn[6]","cy":"yfn[6]","rx":"ad1*2","ry":"ad1*2","rotate":"0","circleStyle":"","ejsRotate":"0","posX":"xfn[6]","posY":"yfn[6]","sizeX":"ad1*2","sizeY":"ad1*2","fillColor":"\"#800000\"","lineColor":"","lineWidth":"1.5","group":"","undefined":"","cxType":"false","cyType":"false","rxType":"false","ryType":"false","transform":"","offset":"","stroke":"","selectLineColor":"#000000","selectColor":"#800000","stroke-width":"1.5","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"circle-14","name":"\"circle-14\"","type":"circle","cx":"xmn[6]","cy":"ymn[6]","rx":"10","ry":"10","rotate":"0","circleStyle":"","ejsRotate":"0","posX":"xmn[6]","posY":"ymn[6]","sizeX":"10","sizeY":"10","fillColor":"\"#ff0000\"","lineColor":"","lineWidth":"1.5","group":"","undefined":"","cxType":"false","cyType":"false","rxType":"false","ryType":"false","transform":"","offset":"","stroke":"","selectLineColor":"#000000","selectColor":"#ff0000","stroke-width":"1.5","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"button-0","name":"\"button-0\"","group":"","type":"button","text":"\"該捕哪裡?\"","action":"_reset();\nmode=0;\nvxf=0;\nvxfn=0;\nad1=0;\nstext1=60;\ncolorf=\"none\";\nsized=30;\n\nlxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}","undefined":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"button-1","name":"\"button-1\"","group":"","type":"button","text":"\"游來游去\"","action":"_reset();\nmode=1;\nvxf=-50;\nvxfn=-50;\nad1=5;\ncolorf=`rgba(255,140,0,1)`;\nstext1=0;\nsized=0;\n\nlxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<8;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}","undefined":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"text-18","name":"\"text-18\"","group":"","type":"text","x":"-50","y":"-80","posX":"-50","posY":"-80","size":"stext1","sizeX":"stext1","sizeY":"stext1","rotate":"0","ejsRotate":"0","fillColor":"\"#0000ff\"","text":"\"A\"","undefined":"","height":"stext1","transform":"","offset":"","fill":"\"#0000ff\"","selectColor":"#0000ff","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"text-19","name":"\"text-19\"","group":"","type":"text","x":"xm-10","y":"ym-25","posX":"xm-10","posY":"ym-25","size":"stext1","sizeX":"stext1","sizeY":"stext1","rotate":"0","ejsRotate":"0","fillColor":"\"#0000ff\"","text":"\"B\"","undefined":"","height":"stext1","transform":"","offset":"","fill":"\"#0000ff\"","selectColor":"#0000ff","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"text-20","name":"\"text-20\"","group":"","type":"text","x":"xf-30","y":"yf-20","posX":"xf-30","posY":"yf-20","size":"stext1","sizeX":"stext1","sizeY":"stext1","rotate":"0","ejsRotate":"0","fillColor":"\"#0000ff\"","text":"\"C\"","undefined":"","height":"stext1","transform":"","offset":"","fill":"\"#0000ff\"","selectColor":"#0000ff","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nfor (i=0;i<num;i++){\nvxfn[i]=-vxfn[i];\n}\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"image-21","name":"\"image-21\"","group":"","type":"image","posX":"xn+20","posY":"yn","sizeX":"sized*7","sizeY":"sized*7","width":"210","height":"210","ejsRotate":"0","imagefile":"\"./uploads/rkTu1wclf.png\"","undefined":"","x":"-280","y":"200","transform":"","rotate":"0","xlink:href":"\"./uploads/rkTu1wclf.png\"","file":"","offset":"","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"circle-21","name":"\"circle-21\"","type":"circle","cx":"xn","cy":"yn","rx":"sized*5","ry":"sized*5","rotate":"0","circleStyle":"\"ELLIPSE\"","ejsRotate":"0","posX":"xn","posY":"yn","sizeX":"sized*5","sizeY":"sized*5","fillColor":"'rgba(255,255,255,0)'","lineColor":"","lineWidth":"1.5","group":"","undefined":"","cxType":"false","cyType":"false","rxType":"false","ryType":"false","transform":"","offset":"","stroke":"","selectLineColor":"#000000","selectColor":"#000000","stroke-width":"1.5","drawLine":"","drawFill":"","visible":"","measured":"","draggable":"\"ENABLED_ANY\"","sensitivity":"","press":"","drag":"","release":"if (mode==0){\n    if (Math.abs(xn-xf)<30 && Math.abs(yn-yf)<30) {\n    ad1=5;\n    colorf=`rgba(255,140,0,1)`;\n   alert(\"捕到魚了\");\n    stext1=0;\n    sized=0;\n    } else {\n    ad1=0;\n    colorf=\"none\";\n    stext1=60;\n    alert(\"猜錯了，再試一次\");\n    }\n}","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-250);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"slider-2","name":"\"slider-2\"","group":"","type":"slider","minimum":"1","maximum":"1.5","variable":"n2","initialValue":"1.33","format":"折射率","action":"n21s=n2*n2-n1*n1;\nif (n2==1){\n    colorS=\"#f1f1f1\";\n} else {\ncgs=255-Math.round((n2-1)*110);\ncolorS=`rgba(0,${cgs},255,0.4)`;\n}\nfor (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","split":"0","step":"0.1","close":"","undefined":"","orientation":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"text-23","name":"\"text-23\"","group":"","type":"text","x":"-390","y":"25","posX":"-390","posY":"25","size":"35","sizeX":"35","sizeY":"45","rotate":"0","ejsRotate":"0","fillColor":"\"#000000\"","text":"\"n1=1.000\"","undefined":"","height":"45","transform":"","offset":"","fill":"\"#000000\"","selectColor":"#000000","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"text-24","name":"\"text-24\"","group":"","type":"text","x":"-390","y":"-50","posX":"-390","posY":"-50","size":"35","sizeX":"35","sizeY":"35","rotate":"0","ejsRotate":"0","fillColor":"\"#000000\"","text":"\"n2=\"","undefined":"","height":"35","transform":"","offset":"","fill":"\"#000000\"","selectColor":"#000000","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""},{"id":"text-25","name":"\"text-25\"","group":"","type":"text","x":"-320","y":"-50","posX":"-320","posY":"-50","size":"35","sizeX":"35","sizeY":"35","rotate":"0","ejsRotate":"0","fillColor":"\"#000000\"","text":"EJS.utilities.formatFloat(n2,3)","undefined":"","height":"35","transform":"","offset":"","fill":"\"#000000\"","selectColor":"#000000","visible":"","measured":"","draggable":"","sensitivity":"","press":"","drag":"","release":"","enter":"","exit":"","CODE_EDITORContent":"  for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n      de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","prelimcode":"","evol_event_zero_cond-1":"return (xf+300);","evol_event_action-1":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;","evol_event_zero_cond-2":"return -(xf-300);","evol_event_action-2":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;","CODE_Constraints":"lxe1=xe1-xf;\nlxe2=xe2-xf;\n for (var i=0;i<10;i++){\n      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;\n      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;\n      dde1=de1-fxe1/fxe11;\n      de1=dde1;\n     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;\n     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;\n     dde2=de2-fxe2/fxe22;\n      de2=dde2;\n   }\nxd1=xe1-de1;\nxd2=xe2-de2;\nsxe1=ye1/(xe1-xd1);\nb=-ye1*xd1/(xe1-xd1);\nsxe2=ye2/(xe2-xd2);\nd=-ye2*xd2/(xe2-xd2);\nxm=(d-b)/(sxe1-sxe2);\nym=(sxe1*d-sxe2*b)/(sxe1-sxe2);\n\nfor (var j=0;j<num;j++){\n     lxe1n[j]=xe1-xfn[j];\n     lxe2n[j]=xe2-xfn[j];\n     for (var i=0;i<10;i++){\n      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];\n      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];\n      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];\n      de1n[j]=dde1n[j];\n      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];\n     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];\n     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];\n     de2n[j]=dde2n[j];\n     }\nxd1n[j]=xe1-de1n[j];\nxd2n[j]=xe2-de2n[j];\nsxe1n[j]=ye1/(xe1-xd1n[j]);\nbn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);\nsxe2n[j]=ye2/(xe2-xd2n[j]);\ndn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);\nxmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);\nymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);\n}\n","CODE_CUSTOMER":""}],"derivsTxt":"_v[10].value = _y[_state];_state++;for(var i=0;i<xfn.length;i++){\r\nxfn[i] = _y[_state];\r\n_v[35].value[i] = _y[_state];\r\n_state++;\r\n}\r\nEJS.rk4.myEvalVar();dydx[_state2] = vxf;_state2++;for(var i=0;i<xfn.length;i++){\r\ndydx[_state2] = vxfn;\r\n_state2++;\r\n}\r\n","shmTxt":"var _state=0;\r\nEJS.rk4.shm[_state] = xf;\r\n_state++;\r\nfor(var i=0;i<xfn.length;i++){\r\nEJS.rk4.shm[_state] = xfn[i];\r\n_state++;\r\n}\r\n","shm2varTxt":"var _state=0;\r\nxf = EJS.rk4.shm[_state];\r\n_state++;\r\nfor(var i=0;i<xfn.length;i++){\r\nxfn[i] = EJS.rk4.shm[_state]; \r\n_state++;\r\n}\r\n","perlimcode":"","events":[{"page":"eventBM-1","event_enable":"true","interations":"","type":"state_event","event_method":"bisection","event_zero_cond":"return (xf+300);","event_tol":"0.001","event_action":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf+100;\nyfn[0]=yf;\nxfn[1]=xf+50;\nyfn[1]=yf+40;\nxfn[2]=xf+50;\nyfn[2]=yf-40;\nxfn[3]=xf-75;\nyfn[3]=yf;\nxfn[4]=xf-110;\nyfn[4]=yf-22;\nxfn[5]=xf-110;\nyfn[5]=yf+22;\nxfn[6]=xf+75;\nyfn[6]=yf;"},{"page":"eventBM-2","event_enable":"true","interations":"","type":"state_event","event_method":"bisection","event_zero_cond":"return -(xf-300);","event_tol":"0.001","event_action":"vxf=-vxf;\nvxfn=-vxfn;\nxfn[0]=xf-100;\nyfn[0]=yf;\nxfn[1]=xf-50;\nyfn[1]=yf+40;\nxfn[2]=xf-50;\nyfn[2]=yf-40;\nxfn[3]=xf+75;\nyfn[3]=yf;\nxfn[4]=xf+110;\nyfn[4]=yf-22;\nxfn[5]=xf+110;\nyfn[5]=yf+22;\nxfn[6]=xf-75;\nyfn[6]=yf;"}],"evolution":{"autostart":"0"},"filename":"tvN7iL1511917540560","user":"mhchang020@gmail.com","Elements":[{"type":"circle","id":"circle-0","property":[{"name":"cx","value":"0"},{"name":"cy","value":"0"},{"name":"rx","value":"400"},{"name":"ry","value":"200"},{"name":"sizeX","value":"800"},{"name":"sizeY","value":"400"},{"name":"posX","value":"0"},{"name":"posY","value":"-200"},{"name":"fillColor","value":"colorS"},{"name":"lineColor","value":""},{"name":"lineWidth","value":"1.5"},{"name":"transform","value":""},{"name":"circleStyle","value":"\"RECTANGLE\""},{"name":"ejsRotate","value":"0"},{"name":"draggable","value":""}]},{"type":"trace","id":"trace-14","property":[{"name":"posX","value":"xf"},{"name":"posY","value":"yf"},{"name":"cx","value":"-125"},{"name":"cy","value":"-300"},{"name":"sizeX","value":"ad1/3"},{"name":"sizeY","value":"ad1/3"},{"name":"r","value":"0"},{"name":"fillColor","value":"\"#800000\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":""},{"name":"amount","value":"800"},{"name":"cycle","value":"true"}]},{"type":"trace","id":"trace-15","property":[{"name":"posX","value":"xm"},{"name":"posY","value":"ym"},{"name":"cx","value":"-95.69704851567104"},{"name":"cy","value":"-162.14924867972633"},{"name":"sizeX","value":"ad1/3"},{"name":"sizeY","value":"ad1/3"},{"name":"r","value":"0"},{"name":"fillColor","value":"\"#ff0000\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":""},{"name":"amount","value":"800"},{"name":"cycle","value":"true"}]},{"type":"image","id":"image-9","property":[{"name":"posX","value":"200"},{"name":"posY","value":"200"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"sizeX","value":"45"},{"name":"sizeY","value":"45"},{"name":"width","value":"45"},{"name":"height","value":"45"},{"name":"imagefile","value":"\"./uploads/rJbD9S9ef.png\""},{"name":"ejsRotate","value":"0"}]},{"type":"image","id":"image-10","property":[{"name":"posX","value":"150"},{"name":"posY","value":"200"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"sizeX","value":"45"},{"name":"sizeY","value":"45"},{"name":"width","value":"45"},{"name":"height","value":"45"},{"name":"imagefile","value":"\"./uploads/rJbD9S9ef.png\""},{"name":"ejsRotate","value":"0"}]},{"type":"polygon","id":"polygon-11","property":[{"name":"dashArray","value":""},{"name":"data","value":""},{"name":"xData","value":"[xfn[2],xfn[0],xfn[1],xfn[3],xfn[4],xfn[5],xfn[3],xfn[2],xfn[1]]"},{"name":"yData","value":"[yfn[2],yfn[0],yfn[1],yfn[3],yfn[4],yfn[5],yfn[3],yfn[2],yfn[1]]"},{"name":"posX","value":""},{"name":"posY","value":""},{"name":"polygonStyle","value":"ture"},{"name":"fillColor","value":"colorf"},{"name":"lineWidth","value":"ad1"},{"name":"lineColor","value":"\"#800000\""}]},{"type":"polygon","id":"polygon-13","property":[{"name":"dashArray","value":""},{"name":"data","value":""},{"name":"xData","value":"[xmn[2],xmn[0],xmn[1],xmn[3],xmn[4],xmn[5],xmn[3],xmn[2],xmn[1]]"},{"name":"yData","value":"[ymn[2],ymn[0],ymn[1],ymn[3],ymn[4],ymn[5],ymn[3],ymn[2],ymn[1]]"},{"name":"posX","value":""},{"name":"posY","value":""},{"name":"polygonStyle","value":"false"},{"name":"fillColor","value":"\"#ff9b6a\""},{"name":"lineWidth","value":"5"},{"name":"lineColor","value":"\"#ff0000\""}]},{"type":"line","id":"line-4","property":[{"name":"dashArray","value":""},{"name":"x1","value":"0"},{"name":"y1","value":"0"},{"name":"x2","value":"-163.3012077720346"},{"name":"y2","value":"-200"},{"name":"sizeX","value":"-de1"},{"name":"sizeY","value":"-ye1"},{"name":"posX","value":"xe1"},{"name":"posY","value":"ye1"},{"name":"fillColor","value":"\"#808080\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"ad1"},{"name":"stroke","value":""},{"name":"strokewidth","value":""}]},{"type":"line","id":"line-5","property":[{"name":"dashArray","value":""},{"name":"x1","value":"0"},{"name":"y1","value":"0"},{"name":"x2","value":"-135.68828288966463"},{"name":"y2","value":"-200"},{"name":"sizeX","value":"-de2"},{"name":"sizeY","value":"-ye2"},{"name":"posX","value":"xe2"},{"name":"posY","value":"ye2"},{"name":"fillColor","value":"\"#808080\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"ad1"},{"name":"stroke","value":""},{"name":"strokewidth","value":""}]},{"type":"line","id":"line-6","property":[{"name":"dashArray","value":""},{"name":"x1","value":"0"},{"name":"y1","value":"0"},{"name":"x2","value":"161.6987922279654"},{"name":"y2","value":"300"},{"name":"sizeX","value":"lxe1-de1"},{"name":"sizeY","value":"-yf"},{"name":"posX","value":"xf"},{"name":"posY","value":"yf"},{"name":"fillColor","value":"\"#808080\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"ad1"},{"name":"stroke","value":""},{"name":"strokewidth","value":""}]},{"type":"line","id":"line-7","property":[{"name":"dashArray","value":""},{"name":"x1","value":"0"},{"name":"y1","value":"0"},{"name":"x2","value":"139.31171711033537"},{"name":"y2","value":"300"},{"name":"sizeX","value":"(lxe2-de2)"},{"name":"sizeY","value":"-yf"},{"name":"posX","value":"xf"},{"name":"posY","value":"yf"},{"name":"fillColor","value":"\"#808080\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"ad1"},{"name":"stroke","value":""},{"name":"strokewidth","value":""}]},{"type":"line","id":"line-9","property":[{"name":"dashArray","value":""},{"name":"x1","value":"0"},{"name":"y1","value":"0"},{"name":"x2","value":"132.39584074363646"},{"name":"y2","value":"162.14924867972633"},{"name":"sizeX","value":"xd1-xm"},{"name":"sizeY","value":"-ym"},{"name":"posX","value":"xm"},{"name":"posY","value":"ym"},{"name":"fillColor","value":"\"#8000ff\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"ad1"},{"name":"stroke","value":""},{"name":"strokewidth","value":""}]},{"type":"line","id":"line-10","property":[{"name":"dashArray","value":""},{"name":"x1","value":"0"},{"name":"y1","value":"0"},{"name":"x2","value":"110.00876562600641"},{"name":"y2","value":"162.14924867972633"},{"name":"sizeX","value":"xd2-xm"},{"name":"sizeY","value":"-ym"},{"name":"posX","value":"xm"},{"name":"posY","value":"ym"},{"name":"fillColor","value":"\"#8000ff\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"ad1"},{"name":"stroke","value":""},{"name":"strokewidth","value":""}]},{"type":"circle","id":"circle-12","property":[{"name":"cx","value":"0"},{"name":"cy","value":"0"},{"name":"rx","value":"0"},{"name":"ry","value":"0"},{"name":"sizeX","value":"ad1*2"},{"name":"sizeY","value":"ad1*2"},{"name":"posX","value":"xfn[6]"},{"name":"posY","value":"yfn[6]"},{"name":"fillColor","value":"\"#800000\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"1.5"},{"name":"transform","value":""},{"name":"circleStyle","value":""},{"name":"ejsRotate","value":"0"},{"name":"draggable","value":""}]},{"type":"circle","id":"circle-14","property":[{"name":"cx","value":"0"},{"name":"cy","value":"0"},{"name":"rx","value":"5"},{"name":"ry","value":"5"},{"name":"sizeX","value":"10"},{"name":"sizeY","value":"10"},{"name":"posX","value":"xmn[6]"},{"name":"posY","value":"ymn[6]"},{"name":"fillColor","value":"\"#ff0000\""},{"name":"lineColor","value":""},{"name":"lineWidth","value":"1.5"},{"name":"transform","value":""},{"name":"circleStyle","value":""},{"name":"ejsRotate","value":"0"},{"name":"draggable","value":""}]},{"type":"button","id":"button-0"},{"type":"button","id":"button-1"},{"type":"text","id":"text-18","property":[{"name":"text","value":"\"A\""},{"name":"posX","value":"-50"},{"name":"posY","value":"-80"},{"name":"sizeX","value":"stext1"},{"name":"sizeY","value":"stext1"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"width","value":"60"},{"name":"height","value":"60"},{"name":"ejsRotate","value":"0"},{"name":"fillColor","value":"\"#0000ff\""}]},{"type":"text","id":"text-19","property":[{"name":"text","value":"\"B\""},{"name":"posX","value":"xm-10"},{"name":"posY","value":"ym-25"},{"name":"sizeX","value":"stext1"},{"name":"sizeY","value":"stext1"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"width","value":"60"},{"name":"height","value":"60"},{"name":"ejsRotate","value":"0"},{"name":"fillColor","value":"\"#0000ff\""}]},{"type":"text","id":"text-20","property":[{"name":"text","value":"\"C\""},{"name":"posX","value":"xf-30"},{"name":"posY","value":"yf-20"},{"name":"sizeX","value":"stext1"},{"name":"sizeY","value":"stext1"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"width","value":"60"},{"name":"height","value":"60"},{"name":"ejsRotate","value":"0"},{"name":"fillColor","value":"\"#0000ff\""}]},{"type":"image","id":"image-21","property":[{"name":"posX","value":"xn+20"},{"name":"posY","value":"yn"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"sizeX","value":"sized*7"},{"name":"sizeY","value":"sized*7"},{"name":"width","value":"210"},{"name":"height","value":"210"},{"name":"imagefile","value":"\"./uploads/rkTu1wclf.png\""},{"name":"ejsRotate","value":"0"}]},{"type":"circle","id":"circle-21","property":[{"name":"cx","value":"0"},{"name":"cy","value":"0"},{"name":"rx","value":"75"},{"name":"ry","value":"75"},{"name":"sizeX","value":"sized*5"},{"name":"sizeY","value":"sized*5"},{"name":"posX","value":"xn"},{"name":"posY","value":"yn"},{"name":"fillColor","value":"'rgba(255,255,255,0)'"},{"name":"lineColor","value":""},{"name":"lineWidth","value":"1.5"},{"name":"transform","value":""},{"name":"circleStyle","value":"\"ELLIPSE\""},{"name":"ejsRotate","value":"0"},{"name":"draggable","value":""}]},{"type":"slider","id":"slider-2"},{"type":"text","id":"text-23","property":[{"name":"text","value":"\"n1=1.000\""},{"name":"posX","value":"-390"},{"name":"posY","value":"25"},{"name":"sizeX","value":"35"},{"name":"sizeY","value":"45"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"width","value":"35"},{"name":"height","value":"35"},{"name":"ejsRotate","value":"0"},{"name":"fillColor","value":"\"#000000\""}]},{"type":"text","id":"text-24","property":[{"name":"text","value":"\"n2=\""},{"name":"posX","value":"-390"},{"name":"posY","value":"-50"},{"name":"sizeX","value":"35"},{"name":"sizeY","value":"35"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"width","value":"35"},{"name":"height","value":"35"},{"name":"ejsRotate","value":"0"},{"name":"fillColor","value":"\"#000000\""}]},{"type":"text","id":"text-25","property":[{"name":"text","value":"EJS.utilities.formatFloat(n2,3)"},{"name":"posX","value":"-320"},{"name":"posY","value":"-50"},{"name":"sizeX","value":"35"},{"name":"sizeY","value":"35"},{"name":"x","value":"0"},{"name":"y","value":"0"},{"name":"width","value":"35"},{"name":"height","value":"35"},{"name":"ejsRotate","value":"0"},{"name":"fillColor","value":"\"#000000\""}]}],"VERSION":"1.0"};

  EJS.loadJSFile(FILENAME,loadJSONData);    
  
}
 
EJS.data._EJS_LOAD_XML();

EJS.loadJSFileCallBack = function(loadJSONData,callback){
  console.log('loadJSFileCallBack');
  var dobj = EJS.data;

  //for segment array used.
  try{
    if(typeof(_EJS_INITIALIZATION)!='undefined') _EJS_INITIALIZATION();
  }catch(e){
    console.log('_EJS_INITIALIZATION() ERROR');
  }

    
  //load drawingPanel
  if(loadJSONData.drawingPanel){
    EJS.drawingPanel = loadJSONData.drawingPanel;
    var xmin = new Function('return '+ EJS.drawingPanel.minimumX)(),
        xmax = new Function('return '+ EJS.drawingPanel.maximumX)(),
        ymin = new Function('return '+ EJS.drawingPanel.minimumY)(),
        ymax = new Function('return '+ EJS.drawingPanel.maximumY)(),    
        viewBox = {'minimumX':xmin,'maximumX':xmax,'minimumY':ymin,'maximumY':ymax};   
    this.SVGViewBox(viewBox);   
  }else{
    EJS.drawingPanel = {autoscaleX:"",autoscaleY:"",minimumX:"-400",minimumY:"-400",maximumX:"400",maximumY:"400"};
  }
 
  EJS.rk4.fps = new Function('return '+ loadJSONData.FramesPerSecond)();
  EJS.rk4.h = new Function('return '+ loadJSONData.Increment)();
  
    
    if(typeof(loadJSONData.defineVars)!=="undefined"){
      dobj.modelvariables.defineVarsList = [];
              
      for(var i=0,len=loadJSONData.defineVars.length;i<len;i++){                    
        EJS.loadVarData(loadJSONData.defineVars[i]);
      }

    }
    

    
    //load evolution events
    if(loadJSONData.evolution){
      dobj.autostart = loadJSONData.evolution.autostart || 1;
    }

    // if(dobj.autostart=="1"){            
    //   $("#model_autostart").prop("checked", true);
    //   //EJS.data.autostart = 1;
    // }

    dobj.events = loadJSONData.events;
    dobj.evolutionEvent = loadJSONData.evolutionEvents;
    
    if(dobj.events){
      var events = dobj.events,
          len = events.length;

      for(var i=0;i<len;i++){
        var id = i+1;
                
        // $("#evol_event_type-"+id+" option[value="+events[i].type+"]").prop('selected',true);    
    
        // $("#evol_event_interations-"+id).val(events[i].interations);
        // $("#evol_event_zero_cond-"+id).val(events[i].event_zero_cond);            
        // $("#evol_event_tol-"+id).val(events[i].event_tol);
        // $("#evol_event_action-"+id).val(events[i].event_action);
        if(events[i].event_enable=="true"){
          $("#evol_event_enable-"+id).prop("checked", true);
          events[i].eventFlag = 1;
        }else{
          events[i].eventFlag = -1;
        }

      }

    }else{

      $("#evol_event_type-1 option[value="+loadJSONData.evolutionEvents.type+"]").prop('selected',true);    
    
      if(loadJSONData.evolutionEvents.interations) $("#evol_event_interations-1").val(loadJSONData.evolutionEvents.interations);
      if(loadJSONData.evolutionEvents.event_zero_cond) $("#evol_event_zero_cond-1").val(loadJSONData.evolutionEvents.event_zero_cond);
      if(loadJSONData.evolutionEvents.event_tol) $("#evol_event_tol-1").val(loadJSONData.evolutionEvents.event_tol);
      if(loadJSONData.evolutionEvents.event_action) $("#evol_event_action-1").val(loadJSONData.evolutionEvents.event_action);
      if(loadJSONData.evolutionEvents.event_enable=="true"){
        $("#evol_event_enable-1").prop("checked", true);
        //EJS.data.events[0].eventFlag = true;
        ERROR.show('請重新存檔');
      }else{
        ERROR.show('請重新存檔');
        //EJS.data.events[0].eventFlag = false;
      }

    }

      
    if($("#_username").val()===loadJSONData.user) $("#filename").val(loadJSONData.filename);
    
    //$("#CODE_EDITORContent").val(loadJSONData.CODE_EDITORContent);
      
    try{
      eval(loadJSONData.CODE_EDITORContent);
    }catch(e){
      console.log('CODE_EDITORContent ERROR');
    }

    // $("#CODE_Constraints").val(loadJSONData.CODE_Constraints);
    // $("#CODE_CUSTOMER").val(loadJSONData.CODE_CUSTOMER);
    $("#INFO_TITLE").val(loadJSONData.INFO_TITLE);    
    //$("title").html("Co-Sci - " + loadJSONData.INFO_TITLE);
    $(".navbar-brand").html("Co-Sci - " + loadJSONData.INFO_TITLE)
    // $(".filename").html(loadJSONData.INFO_TITLE)
    // if(loadJSONData.INFO_PUBLIC=='true'){
    //   $("#INFO_PUBLIC").prop("checked", loadJSONData.INFO_PUBLIC);
    // }
    // $("#INFO_AUTHOR").val(loadJSONData.INFO_AUTHOR);
    // $("#oriFn").val(loadJSONData.oriSimFilename);
    // $("#INFO_DESC").val(loadJSONData.INFO_DESC);
    // $("#INFO_KEYWORDS").val(loadJSONData.INFO_KEYWORDS);
    //$("#INFO_ABSTRACT").val(loadJSONData.INFO_ABSTRACT);
    //console.log(loadJSONData.INFO_ABSTRACT);
    try{
      $('#INFO_ABSTRACT').summernote('code', loadJSONData.INFO_ABSTRACT);
    }catch(e){
      $('#INFO_ABSTRACT').val(loadJSONData.INFO_ABSTRACT);
    }
    //if($("#INFO_ABSTRACT").val()){$("#INFO_ABSTRACT").height($("#INFO_ABSTRACT").val().split("\n").length*23.5);}

    $("#prelimcode").val(loadJSONData.perlimcode);        
    //$("#defaultVarAdd_col").click();
    //EJS.showTab('defineVarTab-1');
    
    //
    //$("[id^='defineVarBMTable']").sortable();
    //$("[id^='defineVarBMTable']").disableSelection();
    
    EJS.VERSION = loadJSONData.VERSION || null;
    
    if(EJS.VERSION!==EJS.CHKVER && window.location.pathname=='/dev/'){
      EJSINFO.show('<span lang="en">模擬版本與現有系統版本不同，建議重新儲存模擬</span>');
    }

      //load all elements data  
      if(loadJSONData.VERSION===EJS.CHKVER){
        //console.log('start loading object');
        // console.log(loadJSONData.newElVars);
        if( typeof(loadJSONData.newElVars) !== "undefined"){
          //EJS.loading_dynatree(loadJSONData.newElVars,true);
          EJS.Run.loadObj(loadJSONData.newElVars,true);
          EJS.data.Elements = loadJSONData.newElVars;
          EJS.object.array =  loadJSONData.newElVars;
        }
      }else{           
        if( typeof(loadJSONData.Elements) !== "undefined"){
          d3.selectAll(".node").remove();    
          if(EJS.gup("id")){
            EJS.loading_dynatree(EJS.data.state[0].Elements,true);
          }else{      
            EJS.data.Elements = loadJSONData.Elements;
            console.log("load Elements");
            EJS.loading_dynatree(loadJSONData.Elements,true);
          }       
        }   
        if(typeof(loadJSONData.Control)!=="undefined"){        
          EJS.loading_dynatree(loadJSONData.Control,true);
        }
    } 


    $(".description").html($("#INFO_TITLE").val());

    _play();
    
    //run page
    if(EJS.data.runFirst){
      EJS.data.runFirst = false;
      $("#infoModalLabel").html(loadJSONData.INFO_TITLE);
      //$("#infoModalContent").html(loadJSONData.INFO_ABSTRACT.replace(/\n/g, "<br />"));
      $("#infoUser").append(loadJSONData.user);
    }

    
    //EJS.data.badSetDefaultLang(lang.currentLang);
    //EJS.data.setSimluationLang(lang.currentLang);
    
  
    (callback && typeof(callback) === "function") && callback();
    
}


EJS.sys.language = "zh-tw";


EJS.drawingPanel = {autoscaleX:"",autoscaleY:"",minimumX:"-400",minimumY:"-400",maximumX:"400",maximumY:"400"};
/* rk4 start */
EJS.rk4.data = [],  
EJS.rk4.totalPoints = 1,      
EJS.rk4.h=0.02,
EJS.rk4.interval = null,
EJS.rk4.fps = 20,
EJS.rk4.myFrequency = null,
EJS.rk4.shm = null,
EJS.rk4.prevShm = null,
EJS.rk4.prevShmIdx = new Array(),
EJS.rk4.events = {},
EJS.rk4.timer = -1,
EJS.rk4.time = 0,
EJS.rk4.o = null,
EJS.rk4._view_per_point_x = 1,
EJS.rk4._view_per_point_y = 1,
EJS.rk4.defineVarsList = null,        
EJS.rk4.rvoVarsList = null;
EJS.rk4._EJS_PAUSE = false;
EJS.data.forkDefineVarsList = {};
EJS.data.runFirst = true;

EJS.data.setDefineVarsValue = function(){//0623
  //console.log('EJS.data.setDefineVarsValue');
  var len = EJS.data.modelvariables.defineVarsList.length;
  for(var i=0;i<len;i++){
  EJS.data.modelvariables.defineVarsList[i].value = eval(EJS.data.modelvariables.defineVarsList[i].name);
  } 
}

EJS.rk4.getNewValue  = function(){           
  this.defineVarsList =  EJS.data.modelvariables.defineVarsList;      
  this.rvoVarsList =  EJS.data.modelvariables.rvoVarsList;
}   

EJS.resetValue = function(){
  var def = EJS.data.modelvariables.defineVarsList;
  for(var i=0;i<def.length;i++){
    def[i].value = new Function('return '+ def[i].name)();
  }
}

EJS.rk4.myEvalVar = function(exportVar,importVar,chk){

  var uobj = EJS.utilities;

  
  if(importVar=='' || typeof(importVar)=='undefined'){
    importVar = EJS.data.modelvariables.defineVarsList;
  }
  
  var defineVars = importVar,
      defineVarsInit = '';

  for(var i=0,len=defineVars.length;i<len;i++){    
    
    
    var _d = uobj.eval(defineVars[i].name);
    
    if(typeof(_d)=="undefined") return;
    var _len = _d.length;
    //console.log(_len,_d,typeof(_d));
    if(_len && typeof(_d)=="object"){    
      for(var j=0;j<_len;j++){
        defineVarsInit += defineVars[i].name + '['+j+']=' + _d[j];
        if(j<_len-1) defineVarsInit += ',' ;
      }         
    }else if(typeof(_d)=="string"){
      defineVarsInit += defineVars[i].name + '="' + defineVars[i].value + '"';
    }else{
      defineVarsInit += defineVars[i].name + '=' + defineVars[i].value;
    } 
    
    (i<len-1) ? defineVarsInit += ',' : defineVarsInit += ';' ; 
  }
    // console.log(defineVarsInit);
    
  try{      
    eval(defineVarsInit);
    return eval(exportVar);      
  }catch(e){
    
    if(typeof(exportVar)=='undefined') return;

    if(exportVar.indexOf('"')==0){
      return '""'+exportVar+'""';
    }else{
      return exportVar;  
    }
    
  }

}






/*
 * @param y is shm array
 * @param x is time(hh)
 * 
 */
EJS.rk4.derivs = function(_x,_y){
  return _EJS_DERIVS(_x,_y);
}

EJS.rk4.rk4 = function(y,h){
  
/* Runge-Kutta forth-order method */

  var hh=h/2.,
      h6=h/6.,
      xh=hh,
      yt=[],
      dydx = null,
      dym = null,
      dyt = null,
      yout=[],
      len = y.length;
      
  
      dydx=EJS.rk4.derivs(xh,y);  
  
  for(var i=0;i<len;i++){
    yt[i]=y[i]+hh*dydx[i];
  } 
  
  dyt=this.derivs(xh,yt);
  for(var i=0;i<len;i++){
    yt[i]=y[i]+hh*dyt[i];
  }

  dym=this.derivs(xh,yt);
 
  for(var i=0;i<len;i++){
    yt[i]=y[i]+h*dym[i];
    dym[i]+=dyt[i];
  }
 
  dyt=this.derivs(h,yt);

  for(var i=0;i<len;i++){ 
    yout[i]=y[i]+h6*(dydx[i]+dyt[i]+2*dym[i]);
  }

  return yout;
}


EJS.rk4.evolution_event = function(id){
  
  if(typeof('_EJS_EVOLUTION_EVENT_'+id)!="undefined"){
    new Function('return _EJS_EVOLUTION_EVENT_'+id+'()')();
    var defineVars = EJS.rk4.defineVarsList;        

    for(var i=0,len=defineVars.length;i<len;i++){
      defineVars[i].value = new Function('return '+ defineVars[i].name)();
    }
    
    EJS.rk4.shm = _EJS_EVOLUTION_INIT(); 
  }     
}

EJS.rk4.eventCheck = function(idx,err,fn){
  var evt = EJS.rk4.events[idx];
  
  if(evt.n==1){
      evt.make0shm = EJS.rk4.prevShm;
      EJS.rk4.shm = EJS.rk4.prevShm;      
      _EJS_SHM2VAR();
  }else{
      evt.make0shm = evt.make1shm;
  } 


  if(fn() > 0){        
    evt.k = 1;
  }else if(fn() < 0){        
    evt.k = -1;
  }else{      
     new Function("_USER_EVENT_ACTION_"+idx+"()")();
     EJS.rk4.updateDefineVar();  
     _EJS_EVOLUTATION();
     EJS.rk4.shm = this.rk4(EJS.rk4.shm,(1-evt.m)*this.h);          
    return true;
  }

  
  evt.m = evt.m + evt.k * 1 / Math.pow(2,evt.n);
  EJS.rk4.shm = this.rk4(evt.make0shm, evt.k * this.h/Math.pow(2,evt.n));  
  evt.make1shm = EJS.rk4.shm;    
  evt.n++;

  if(Math.abs(fn()) < err){
    console.log('check event : success');
    new Function("_USER_EVENT_ACTION_"+idx+"()")();
     EJS.rk4.updateDefineVar();  
     _EJS_EVOLUTATION();     
     EJS.rk4.shm = this.rk4(EJS.rk4.shm,(1-evt.m)*this.h);        
    return true;
  }else{
    if(evt.n>10){
      console.log('evt.n > 11');
      new Function("_USER_EVENT_ACTION_"+idx+"()")();
      EJS.rk4.updateDefineVar();  
      _EJS_EVOLUTATION();
      EJS.rk4.shm = this.rk4(EJS.rk4.shm,(1-evt.m)*this.h);    
      return true;
    }
  } 


  for(var i=0;i<EJS.data.events.length;i++){
      if(evt.n==0 && EJS.data.events[i].eventFlag && EJS.data.events[i].event_enable=="true"){
        console.log('evolution event');
        this.evolution_event(i);
      }
  }  

  return false;
  
}

// dt - dt/EJS.rk4.prevShmIdx*2

EJS.rk4.getData = function() {
    
  if (this.data.length > 0)
    this.data = this.data.slice(1);  
  while (this.data.length < this.totalPoints) {   
    var tmpx=0,
        tmpy=0;   
    /*
     * Desc: 執行rk4之前先重新載入變數的值    
     * Date: 2015/2/4 add by squall
    */
    if(typeof(_EJS_EVOLUTION_INIT)=="undefined") return;

    EJS.rk4.shm = _EJS_EVOLUTION_INIT();      
    
      
    EJS.rk4.prevShm = jQuery.extend([], EJS.rk4.shm);

    EJS.rk4.shm = this.rk4(EJS.rk4.shm,this.h);
            
    for(var i=0;i<EJS.data.events.length;i++){
      if(EJS.data.events[i].eventFlag && EJS.data.events[i].event_enable=="true") this.evolution_event(i);
    }
  
    reDraw();

    this.data.push(this.o);
  }        
}



EJS.rk4.shapeSetMove = function(myObj){
  
  var _X = uobj.eval(myObj.attr("posX")),
      _Y = uobj.eval(myObj.attr("posY")),
      _SX = uobj.eval(myObj.attr("sizeX")),
      _SY = uobj.eval(myObj.attr("sizeY"));

  myObj.each(function(d,i) { 
    
    $(this).attr("cx", function(){
      if(typeof(_X)=="object")
        return _X[i];
      else
        return _X;
    }).attr("cy", function(){
      if(typeof(_Y)=="object")
        return _Y[i];
      else
        return _Y;
    }).attr("rx", function(){
      if(typeof(_SX)=="object")
        return _SX[i];
      else
        return _SX;
    }).attr("ry", function(){
      if(typeof(_SY)=="object")
        return _SY[i];
      else
        return _SY;
    }); 


  });
  
}

EJS.rk4.segmentSetMove = function(myObj){

  var _X = uobj.eval(myObj.attr("posX")),
      _Y = uobj.eval(myObj.attr("posY")),
      _SX = uobj.eval(myObj.attr("sizeX")),
      _SY = uobj.eval(myObj.attr("sizeY"));


   myObj.each(function(d,i) {         
    if(typeof(_X)=="object")
        _x1 =  _X[i];
      else
        _x1 =  _X;

      if(typeof(_SX)=="object")
        _x2 =  _SX[i];
      else
        _x2 =  _SX;
     if(typeof(_Y)=="object")
        _y1 =  _Y[i];
      else
        _y1 =  _Y;

      if(typeof(_SY)=="object")
        _y2 =  _SY[i];
      else
        _y2 =  _SY; 

    $(this).attr("x1", function(){
      return _x1;
    }).attr("y1", function(){
      return _y1;
    }).attr("x2", function(){
      return _x1+_x2;

    }).attr("y2", function(){


      return _y1+_y2;
    });     
  });

}


EJS.rk4.circleMove = function(myObj){

  var position = function(id){
    var d3Obj = d3.selectAll("#" + id + " .circle"),
        d3Rect = d3.selectAll("#" + id + " .rect"),
        _x = new Function('return '+ d3Obj.attr("posX"))(),
        _y = new Function('return '+ d3Obj.attr("posY"))(),
        _r = new Function('return '+ d3Obj.attr("ejsRotate"))(),
        _rx = new Function('return '+ d3Obj.attr("sizeX"))(),
        _ry = new Function('return '+ d3Obj.attr("sizeY"))();
        
        if(typeof(_r)=="undefined" || _r==null) _r = 0;
         
      //dynamic circle raius  
      d3Obj.attr("rx",_rx/2);
      d3Obj.attr("ry",_ry/2);

      d3Rect.attr("x",0 - _rx/2);
      d3Rect.attr("y",0 - _ry/2);
      d3Rect.attr("width",_rx);
      d3Rect.attr("height",_ry);          
      return "translate("+_x+","+_y+") rotate("+EJS.utilities.deg2rad(_r)+")"; 
  }
  d3.selectAll("#"+myObj).attr("transform", position(myObj));
}

EJS.rk4.rectMove = function(myObj){
  var position = function(id){
    var d3Obj = d3.selectAll("#" + id + " .rect"),
        _x = new Function('return '+ d3Obj.attr("posX"))(),
        _y = new Function('return '+ d3Obj.attr("posY"))(),
        //_r = new Function('return '+ d3Obj.attr("ejsRotate"))(),
        _rx = new Function('return '+ d3Obj.attr("sizeX"))(),
        _ry = new Function('return '+ d3Obj.attr("sizeY"))();
        
    if(typeof(_r)=="undefined" || _r==null) _r = 0;
        
      //dynamic circle raius
    d3Obj.attr("x",0 - _rx/2);
    d3Obj.attr("y",0 - _ry/2);
    d3Obj.attr("width",_rx);
    d3Obj.attr("height",_ry);           
    return "translate("+_x+","+_y+") ";//rotate("+_r+")"; 
  }
  d3.selectAll("#"+myObj).attr("transform", position(myObj));
}


EJS.resetSliders=function(){
    var d=EJS.data.controlArray;
    for(var i=0;i<d.length;i++){
      if(d[i].type=="slider"){
        $('input[id="'+d[i].id+'"]').val(d[i].initialValue);
        $('input[id="'+d[i].id+'-input"]').val(d[i].initialValue);
        $('span[id="'+d[i].id+'-value"]').text(d[i].initialValue);
      }
    }
};

EJS.plottingActPanel = function() {
  if(EJS.rk4.defineVarsList==null) return;

  var defineVars = EJS.rk4.defineVarsList;
}

EJS.rk4.updateDefineVar = function(){
  if(EJS.rk4.defineVarsList==null) return;

  var defineVars = EJS.rk4.defineVarsList;

  for(var i=0,len=defineVars.length;i<len;i++){      
    defineVars[i].value = new Function('return '+ defineVars[i].name)();
  }
}

EJS.rk4.update = function() {     

  reDraw();

  if(EJS.data.autostart!="0") {    
    EJS.rk4.getData(this.shm);
    if(EJS.data.autostart) EJS.rk4.time++;
  
    _EJS_FIXEDRELATIONS();
  }

  EJS.rk4.updateDefineVar();
  if(typeof(reDraw)!="undefined") reDraw();

  for(var i=0,len=EJS.data.circleArray.length;i<len;i++){
    var obj = EJS.data.circleArray[i];      
    
    if((obj.attr("type")=="trail" || obj.attr("type")=="trace") && EJS.data.autostart!="0"){
      EJS.saveTracker(obj.attr("id"));
      EJS.View.redrawCircle(obj.attr("id"),EJS.svg.tracker[obj.attr("id")]);
    }
  }
  
  //EJS.showVariable();
  
}

EJS.rk4.updateSpring = function(id){
  var springValue = {};  
      springValue.r_posX = new Function('return '+ d3.selectAll("#"+ id +" .spring").attr("posX"))(),
      springValue.r_posY = new Function('return '+ d3.selectAll("#"+ id +" .spring").attr("posY"))(),
      springValue.r_sizeX = new Function('return '+ d3.selectAll("#"+ id +" .spring").attr("sizeX"))(),
      springValue.r_sizeY = new Function('return '+ d3.selectAll("#"+ id +" .spring").attr("sizeY"))(),
      springValue.radius = EJS.rk4.myEvalVar(d3.selectAll("#"+ id +" .spring").attr("radius")),
      springValue.pointsPerLoop = EJS.rk4.myEvalVar(d3.selectAll("#"+ id +" .spring").attr("pointsPerLoop")),
      springValue.segments = EJS.rk4.myEvalVar(d3.selectAll("#"+ id +" .spring").attr("segments"));          
  
  EJS.View.createSpringBySVG(id,true,springValue);  

}


EJS.sync = false;

EJS.View.setObjPanel = function(id){
  
  var obj = _(EJS.object.array).find(function(o) {
    if(typeof(o)!="undefined") return o.id == id;        
  });   
  
  $("#attr_id").val(obj.id);
  $("#attr_name").val(obj.name);

  $("#attr_posX").val(obj.posX);
  $("#attr_posY").val(obj.posY);
  $("#attr_sizeX").val(obj.sizeX);
  $("#attr_sizeY").val(obj.sizeY);
  $("#attr_fillColor").val(obj.fillColor);
  
  //
  $("#attr_draggable").val(obj.draggable);
  $("#attr_press").val(obj.press);
  $("#attr_drag").val(obj.drag);
  $("#attr_release").val(obj.release);
  $("#attr_enter").val(obj.enter);
  $("#attr_exit").val(obj.exit);

  if($("#attr_fillColor").val()) $("#selectColor").val($("#attr_fillColor").val().replace(/"/g,''));

  $("#attr_lineWidth").val(obj.lineWidth);

  if($("#attr_lineColor").val()){
    $("#selectLineColor").val($("#attr_lineColor").val().replace(/"/g,''));
    $("#attr_lineColor").val(obj.lineColor);
  }
  if(obj.transform) $("#attr_transform").val('"'+obj.transform+'"'); 
  if(obj.text) $("#attr_text").val(obj.text);

  $("#attr_ejsRotate").val(obj.ejsRotate);
  $("#attr_circleStyle").val(obj.circleStyle);
  $("#attr_amount").val(obj.amount);            
//  EJS.customerDynatreeV1_0(obj);

} 

EJS.rk4.demo_start = function(){


  if(EJS.data.autostart==1) $("#demo_start").attr("disabled","true"); 

  //init start
  if(typeof(_EJS_VARINIT)!=="undefined" && EJS.gup("id")==""){          
      _EJS_VARINIT();     
  }else{    
    //load defineVars 
    try{
      EJS.setLoadState(EJS.data.state[0].defineVars); 
    }catch(e){
      console.log("EJS.setLoadState failed");
      console.log(e);
    }
  } 
  
  _EJS_INITIALIZATION();    
  
  this.getNewValue(); 
  EJS.data.setDefineVarsValue();  
  
  EJS.rk4.shm = _EJS_EVOLUTION_INIT();  

  this.interval = 1000/this.fps; 

  if(this.timer == -1 ){    
    this.timer=setInterval(this.update,this.interval);          
  } 
  
} 


EJS.rk4.demo_pause = function(){
  if(this._EJS_PAUSE){    
    this.timer=setInterval(this.update,this.interval);  
    this._EJS_PAUSE = false;
  }else{
    clearInterval(this.timer);    
    this.timer = -1;  
    this._EJS_PAUSE = true;
  }

  checkButtonStatus();
  EJS.rk4.updateDefineVar();
  //EJS.showVariable();  

}

EJS.rk4.demo_stop = function(){   
  
  //將變數還原成初始值
  $("#demo_start").removeAttr("disabled");
  //customer function
  clearInterval(this.timer);
  this.timer = -1;      

  if(typeof(_EJS_VARINIT)!=="undefined"){ 
    _EJS_VARINIT();
    this.getNewValue();
    _EJS_VARINIT();
    EJS.data.setDefineVarsValue();
    EJS.rk4.updateDefineVar();//0726
  
    // for(var i=0;i<EJS.data.events.length;i++){
    //   EJS.data.events[i].eventFlag="true";    
    // }
  }
};

/* rk4 end */ 

EJS.View.drawingPanel = {
  "scales": {
    "autoscaleX":"Autoscale X","autoscaleY":"Autoscale Y","minimumX":"Minimum X","maximumX":"Maximum X","minimumY":"Minimum Y","maximumY":"Maximum Y" 
  } 
}   


EJS.View.redrawCircle = function(id,data){  
  var circleData = data;    
  var svgContainer = d3.select("#container #svgElement g"),
      circles = d3.select("#container #svgElement #"+id);  
  var p = d3.selectAll("#"+id+" circle")
    .data(data)    
    .attr("cx", function (data) { return data.x; })
    .attr("cy", function (data) { return data.y; })
    .attr("r", function (data) { return data.r; })
    .style("fill", function (data) { return data.fillColor; })
}



EJS.View.createTrace = function(id,attr,reset){

  let uobj = EJS.utilities,
      _x = uobj.eval(attr.posX),
      _y = uobj.eval(attr.posY),
      r = uobj.eval(attr.sizeX),
      objName = attr.name || `"${id}"`,
      group = attr.group || "";

      // console.log('create trace');
      // console.log(attr);
  var circleData = [],
      amount = attr.amount || 100;    
  for (var i = 0; i < amount; i++) {
      circleData.push({
          x: _x,
          y: _y
      });
  } 
  var circles;
  

  if(reset){
    console.log('reset trace',id);
    d3.selectAll("#"+id+" .circle").remove();
    
        circles = d3.select("#"+id)
                    .attr("id",id)
                    .attr("type", "trace")
                    .attr("class", "trace");
  }else{
    circles= d3.select("#container #svgElement g")
    .append("g")
    .attr("id",id)
    .attr("type", "trace")
    .attr("class", "trace");

  }


  if(group!="") circles = d3.select("#"+group)
                            .append("svg:g")
                            .attr("id",id)
                            .attr("type", "trace")
                            .attr("class", "trace");






  var cg = circles.selectAll("#"+id).data(circleData)
             .enter()
             .append("circle");
  
  
        cg.attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
          .attr("type", "trace")
          .attr("class", "trace")
          .attr("posX", attr.posX)
          .attr("posY", attr.posY)
          .attr("sizeX", attr.sizeX)
          .attr("sizeY", attr.sizeY)
          .attr("cycle", attr.cycle)
          .attr("r", r)         
          .attr("amount", attr.amount)
          .attr("fillColor", attr.fillColor)               
          .style("fill", attr.fillColor.replace(/\"/g,'')); 

  EJS.svg.createTracker(id);
  
  if(!reset){
    if(this.checkid(id)) return;

    EJS.data.circleArray.push(circles);
    EJS.object.array.push({
      id:id,
      name:objName,
      group: group,
      type:'trace',
      posX: attr.posX,
      posY: attr.posY,
      sizeX: attr.sizeX,
      sizeY: attr.sizeY,
      // cx: attr.posX,
      // cy: attr.posY,
      amount: attr.amount,      
      fillColor: attr.fillColor,
      // r: attr.r,
      cycle: attr.cycle
      
    });
  }

}


EJS.View.createTrial = EJS.View.createTrace;
/*
 * Create Segment Set start
 * 
 */
EJS.View.createSegmentSet = function(id,attr,reDraw){
  // console.log('createSegmentSet');
  // console.log(id,attr);
  
  var uobj = EJS.utilities,      
      objName = attr.name || id,
      group = attr.group || "",
      line = d3.select("#container #svgElement g"),
      circleData = [],
      _x1,_y1,_x2,_y2;
    
    _x1 = uobj.eval(attr.x1) || uobj.eval(attr.posX) || 0;
    _y1 = uobj.eval(attr.y1) || uobj.eval(attr.posY) || 0;
    _x2 = uobj.eval(attr.x2) || uobj.eval(attr.sizeX) || 0;
    _y2 = uobj.eval(attr.y2) || uobj.eval(attr.sizeY) || 0;

    
    _lineWidth = uobj.eval(attr.lineWidth),
    _lineColor = uobj.eval(attr.fillColor) || [this.getRandomColor(),this.getRandomColor(),this.getRandomColor(),this.getRandomColor(),this.getRandomColor()],
    amount = uobj.eval(attr.amount) || 5;

  for (var i = 0; i < amount; i++) {
          
    (typeof(_x1[i])!='undefined') ? __x1 = _x1[i] : __x1 = _x1;
    (typeof(_x2[i])!='undefined') ? __x2 = _x2[i] : __x2 = _x2;
    (typeof(_y1[i])!='undefined') ? __y1 = _y1[i] : __y1 = _y1;
    (typeof(_y2[i])!='undefined') ? __y2 = _y2[i] : __y2 = _y2;
    (typeof(_lineWidth[i])!='undefined') ? __lineWidth = _lineWidth[i] : __lineWidth = _lineWidth;
    if (typeof(_lineColor[i])!='undefined' && typeof(_lineColor)=='object')  __lineColor = _lineColor[i];
    if (typeof(_lineColor[i])!='undefined' && typeof(_lineColor)=='string') __lineColor = _lineColor;
  
    if(isNaN(__x1)) __x1 = 0;
    if(isNaN(__x2)) __x2 = 0;
    if(isNaN(__y1)) __y1 = 0;
    if(isNaN(__y2)) __y2 = 0;

    
      circleData.push({
          x1: parseFloat(__x1),
          y1: parseFloat(__y1),
          x2: parseFloat(__x1)+parseFloat(__x2),
          y2: parseFloat(__y1)+parseFloat(__y2),
          strokeWidth: parseFloat(__lineWidth),
          lineColor: __lineColor
      });
      
  }


  var circles = d3.select("#container #svgElement g")
                  .append("g")
                  .attr("id",id)
                  .attr("type", "segmentSet")
                  .attr("class", "segmentSet");
                             
  if(reDraw){
    d3.selectAll("#"+id+" .segmentSet").remove();

    circles = d3.select("#"+id)
                .attr("id",id)
                .attr("type", "segmentSet")
                .attr("class", "segmentSet");
    
  }

  var cg = circles.selectAll("#"+id).data(circleData)
                  .enter()
                  .append("line");
             
  cg.attr('x1', function (d) { return d.x1; })
    .attr('y1', function (d) { return d.y1; })
    .attr('x2', function (d) { return d.x2; })
    .attr('y2', function (d) { return d.y2; })
    .attr("sizeX", attr.sizeX)
    .attr("sizeY", attr.sizeY)  
    .attr("posX", attr.posX)
    .attr("posY", attr.posY)      
    .attr("amount", attr.amount)      
    .attr("type", "segmentSet")
    .attr("class", "segmentSet")
    .attr("fillColor", attr.fillColor)
    .attr("lineColor", attr.lineColor)    
    .attr("lineWidth", attr.lineWidth)
    .style("stroke", function(d){ return d.lineColor;})
    .style("stroke-width", function (d) { return d.strokeWidth; })
    .style("fill", uobj.eval(attr.fillColor)); 

  if(this.checkid(id)){
    var a = _(EJS.object.array).find(function(o) {
      if(typeof(o)!="undefined") return o.id == id;        
    });   
    
    a.x1Type = Array.isArray(_x1);
    a.y1Type = Array.isArray(_y1);
    a.x2Type = Array.isArray(_x2);
    a.y2Type = Array.isArray(_y2);
    a.lineWidthType = Array.isArray(_lineWidth);

    return;
  }
  
  EJS.data.circleArray.push(circles);  
  
  EJS.object.array.push({
    id:id,
    idx: EJS.object.array.length,
    name:objName,
    group: group,
    type:'segmentSet',
    x1:attr.posX,
    x1Type: Array.isArray(_x1),
    y1:attr.posY,
    y1Type: Array.isArray(_y1),
    x2:attr.sizeX,
    x2Type: Array.isArray(_x2),
    y2:attr.sizeY,
    y2Type: Array.isArray(_y2),
    lineWidthType: Array.isArray(_lineWidth),
    lineWidth: attr.lineWidth,
    amount:attr.amount,
    fillColor: attr.fillColor,
    lineColor: attr.lineColor,
    lineWidth: attr.lineWidth,
    posX: attr.posX,
    posY: attr.posY,
    sizeX: attr.sizeX,
    sizeY: attr.sizeY,
    
   });
}

EJS.View.getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/*
 * Create Arrow Set start
 * 
 */
EJS.View.createArrowSet = function(id,attr,reDraw){

  
  var uobj = EJS.utilities,
      objName = attr.name || id,
      line = d3.select("#container #svgElement g"),
      circleData = [],_x1,_y1,_x2,_y2,_lineWidth,    
      _lineColor = uobj.eval(attr.fillColor) || ["#0b0bc6","#0b0bc6","#13d641","#0b0bc6","#c113d6"],
      amount = uobj.eval(attr.amount) || 5,
      group = attr.group || "";

    
    _x1 = uobj.eval(attr.x1) ||uobj.eval(attr.posX) || 0;
    _y1 = uobj.eval(attr.y1) || uobj.eval(attr.posY) || 0;
    _x2 = uobj.eval(attr.x2) || uobj.eval(attr.sizeX) || 0;
    _y2 = uobj.eval(attr.y2) || uobj.eval(attr.sizeY) || 0;
    _lineWidth = uobj.eval(attr.lineWidth) || [1,2,3,4,5];
        

  for (var i = 0; i < amount; i++) {
    
    (typeof(_x1[i])!='undefined') ? __x1 = _x1[i] : __x1 = _x1;
    (typeof(_x2[i])!='undefined') ? __x2 = _x2[i] : __x2 = _x2;
    (typeof(_y1[i])!='undefined') ? __y1 = _y1[i] : __y1 = _y1;
    (typeof(_y2[i])!='undefined') ? __y2 = _y2[i] : __y2 = _y2;
    (typeof(_lineWidth[i])!='undefined') ? __lineWidth = _lineWidth[i] : __lineWidth = _lineWidth;
    if (typeof(_lineColor[i])!='undefined' && typeof(_lineColor)=='object')  __lineColor = _lineColor[i];
    if (typeof(_lineColor[i])!='undefined' && typeof(_lineColor)=='string') __lineColor = _lineColor;
  
    
    if(isNaN(__x1)) __x1 = 0;
    if(isNaN(__x2)) __x2 = 0;
    if(isNaN(__y1)) __y1 = 0;
    if(isNaN(__y2)) __y2 = 0;

      circleData.push({
          x1: parseFloat(__x1),
          y1: parseFloat(__y1),
          x2: parseFloat(__x1)+parseFloat(__x2),
          y2: parseFloat(__y1)+parseFloat(__y2),
          strokeWidth: parseFloat(__lineWidth),
          lineColor: __lineColor
      });
      
  }

  if(reDraw){
    d3.selectAll("#"+id+" .arrowSet").remove();   
  }        

  var circles = d3.select("#container #svgElement g")
                  .append("g")
                  .attr("id",id)
                  .attr("type", "arrowSet")
                  .attr("class", "arrowSet");
                             
                             
  var cg = circles.selectAll("#"+id).data(circleData)
                  .enter()
                  .append("line");
             
  cg.attr('x1', function (d) { return d.x1; })
    .attr('y1', function (d) { return d.y1; })
    .attr('x2', function (d) { return d.x2; })
    .attr('y2', function (d) { return d.y2; })
    .attr("sizeX", attr.sizeX)
    .attr("sizeY", attr.sizeY)  
    .attr("posX", attr.posX)
    .attr("posY", attr.posY)            
    .attr("type", "arrowSet")
    .attr("class", "arrowSet")
    .attr("amount", attr.amount)
    .attr("marker-end", "url(#triangle"+id+")")
    .style("stroke", function(d){ return d.lineColor;})
    .attr("fillColor", attr.fillColor)
    .attr("lineColor", attr.lineColor)
    .attr("lineWidth",  attr.lineWidth)   
    .style("stroke-width", function (d) { return d.strokeWidth; })
    .style("fill", uobj.eval(attr.fillColor));//.replace(/\"/g,'')

   circles.append("marker")
    .attr("id", "triangle"+id)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 0)
    .attr("refY", 5)
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 6)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
    .style("fill", uobj.eval(attr.fillColor))//.replace(/\"/g,'')
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z");

  if(this.checkid(id)) return;
  
  EJS.data.circleArray.push(circles);  
  
  EJS.object.array.push({
    id:id,
    name: objName,
    group: group,
    type:'arrowSet',
    x1:attr.posX,
    x1Type: Array.isArray(_x1),
    y1:attr.posY,
    y1Type: Array.isArray(_y1),
    x2:attr.sizeX,
    x2Type: Array.isArray(_x2),
    y2:attr.sizeY,
    y2Type: Array.isArray(_y2),
    lineWidthType: Array.isArray(__lineWidth),
    lineWidth: attr.lineWidth,
    amount:attr.amount,     
    //old version
    fillColor: attr.fillColor,
    posX: attr.posX,
    posY: attr.posY,
    sizeX: attr.sizeX,
    sizeY: attr.sizeY
   });
}

/* create circle array start */
EJS.View.createShapeSet = function(id,attr,redraw){
 
  var uobj = EJS.utilities,
      circleData = [],
      _x = uobj.eval(attr.posX) || 0,
      _y = uobj.eval(attr.posY) || 0,
      _sizeX = uobj.eval(attr.sizeX) || 0,
      _sizeY = uobj.eval(attr.sizeY) || 0,
      _lineColor = uobj.eval(attr.fillColor) || [this.getRandomColor(),this.getRandomColor(),this.getRandomColor(),this.getRandomColor(),this.getRandomColor()],
      amount = uobj.eval(attr.amount) || 10,
      reDraw = redraw || false,
      objName = attr.name || id,
      group = attr.group || "";


  for (var i = 0; i < amount; i++) {
    
    (typeof(_x[i])!='undefined') ? __x = _x[i] : __x = _x;
    (typeof(_y[i])!='undefined') ? __y = _y[i] : __y = _y;
    (typeof(_sizeX[i])!='undefined') ? __sizeX = _sizeX[i] : __sizeX = _sizeX;
    (typeof(_sizeY[i])!='undefined') ? __sizeY = _sizeY[i] : __sizeY = _sizeY;    
    if (typeof(_lineColor[i])!='undefined' && typeof(_lineColor)=='object')  __lineColor = _lineColor[i];
    if (typeof(_lineColor[i])!='undefined' && typeof(_lineColor)=='string') __lineColor = _lineColor;

      circleData.push({
          x: parseFloat(__x),
          y: parseFloat(__y),
          sizeX: Math.abs(parseFloat(__sizeX))/2,
          sizeY: Math.abs(parseFloat(__sizeY))/2,
          lineColor: __lineColor
      });
        
        
  }

  var cg = null,
      svgContainer = null,
      circles = null;
  

  if(reDraw){    
    d3.selectAll("#"+id+" .shapeSet").remove();
  }
  
  svgContainer = d3.select("#container #svgElement g");
  circles = d3.select("#container #svgElement g")
                .append("g")
                .attr("id",id)
                .attr("type", "shapeSet")
                .attr("class", "node");                                                         
  cg = circles.selectAll("#"+id).data(circleData)
                .enter()
                .append("ellipse");

   
  cg.attr("cx", function (d,i) { return d.x || 0; })
    .attr("cy", function (d,i) { return d.y || 0; })
    .attr("rx", function (d,i) { return d.sizeX || 0; })
    .attr("ry", function (d,i) { return d.sizeY || 0; })
    .attr("type", "shapeSet")
    .attr("class", "shapeSet")
    .attr("posX", attr.posX)
    .attr("posY", attr.posY)
    .attr("sizeX", attr.sizeX)
    .attr("sizeY", attr.sizeY)
    .attr("amount", attr.amount)
    .attr("fillColor", attr.fillColor)               
    .style("fill", function(d){ return d.lineColor;});
  
  if(!redraw){
    if(this.checkid(id)) return;

    EJS.data.circleArray.push(circles); 
    EJS.object.array.push({
        id:id,
        name:objName,
        group: group,
        type:'shapeSet',
        cx:attr.posX,
        cxType: Array.isArray(_x),
        cy:attr.posY,
        cyType: Array.isArray(_y),
        rx:attr.sizeX,
        rxType: Array.isArray(_sizeX),
        ry:attr.sizeY,
        ryType: Array.isArray(_sizeY),
        amount:attr.amount,
        posX:attr.posX,
        posY:attr.posY,
        sizeX:attr.sizeX,
        sizeY:attr.sizeY,
        fillColor:attr.fillColor
     });
  }

}
/* create circle array end */


EJS.View.createCircleBySVG = function(id,attrs){

  var uobj = EJS.utilities,
      circle = d3.select("#container #svgElement g"),
      d = (typeof(data)=='undefined') ? [{x:0,y:0}] : data,
      posX = uobj.eval(attrs.cx) || uobj.eval(attrs.posX) || 0,
      posY = uobj.eval(attrs.cy) || uobj.eval(attrs.posY) || 0,
      styleColor = "rgb(255, 0, 0)",
      fillColor = uobj.eval(attrs.fillColor) || '#0000ff',//attrs.fillColor.replace(/"/g,''),
      showCircle = "none",
      showRect = "none",
      rx = uobj.eval(attrs.sizeX) || uobj.eval(attrs.rx) || 0,
      ry = uobj.eval(attrs.sizeY) || uobj.eval(attrs.ry) || 0,
      rotate = uobj.eval(attrs.ejsRotate) || 0,
      objName = attrs.name || id,
      circleStyle = uobj.eval(attrs.circleStyle),
      group = attrs.group || "";
      
  //if(attrs.fillColor) fillColor = attrs.fillColor.replace(/"/g,'');    
  (circleStyle == "WHEEL") ? styleColor = "rgb(255,0,0)" : styleColor = "rgb(255,0,0,1)" ;
    
//console.log('circleStyle:%s',circleStyle);

  if(circleStyle=="RECTANGLE"){

    showCircle = "none";
    showRect = "";
  }else{
    showCircle = "";
    showRect = "none";
  }
  

  var node = circle.selectAll("#container svg").data(d).enter().append("svg:g");
        
  if(group!="") node = d3.select("#"+group).append("svg:g");  

  node.attr("type", "circle")
    .attr("class", "node")
    .attr("id", id)
    .attr("name", objName)
    .attr("transform","translate("+ posX +","+ posY +") rotate("+ uobj.deg2rad(rotate) +")")
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));
    // .on("click", function(d) {               
    //    EJS.View.setObjPanel(id);
    // });

  node.append("ellipse")         
      .attr("class","circle")
      .attr("circleStyle","ELLIPSE")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("rx", rx/2)
      .attr("ry", ry/2)
      .attr("sizeX", attrs.sizeX)
      .attr("sizeY", attrs.sizeY)   
      .attr("posX", attrs.posX)
      .attr("posY", attrs.posY)
      .attr("fill", fillColor)
      .attr("fillColor", attrs.fillColor)
      .attr("lineColor", attrs.lineColor)
      .attr("lineWidth", attrs.lineWidth)
      .attr("transform", "")
      .attr("circleStyle", attrs.circleStyle)
      .attr("ejsRotate", attrs.ejsRotate)
      .attr("display", showCircle);
    
  node.append("line")
      .attr("class", "line-h")
      .attr('x1', (rx*-1)/2)
      .attr('y1', 0)
      .attr('x2', rx/2)
      .attr('y2', 0)    
      .style("stroke", styleColor)            
      .style("stroke-width", 1);
  
  node.append("line")
      .attr("class", "line-v")
      .attr('x1', 0)
      .attr('y1', (ry*-1)/2)
      .attr('x2', 0)
      .attr('y2', ry/2)   
      .style("stroke", styleColor)            
      .style("stroke-width", 1);    
  
  //show rectangle
  node.append("rect")        
      .attr("class","rect")   
      .attr("x", (0-rx/2))
      .attr("y", (0-ry/2))
      .attr("width", rx)
      .attr("height", ry)
      .attr("sizeX", attrs.sizeX)
      .attr("sizeY", attrs.sizeY)   
      .attr("posX", attrs.posX)
      .attr("posY", attrs.posY)
      .style("fill", fillColor)
      .attr("fillColor", attrs.fillColor)
      .attr("lineColor", attrs.lineColor)
      .attr("lineWidth", attrs.lineWidth)
      .attr("display", showRect);
  
  if(this.checkid(id)) return;

  EJS.data.circleArray.push(node);  

  EJS.object.array.push({
    id:id,
    name:objName,
    type:'circle',
    cx:attrs.posX,
    cy:attrs.posY,
    rx:attrs.sizeX,
    ry:attrs.sizeY,
    rotate:attrs.ejsRotate,
    circleStyle:attrs.circleStyle,
    //draggable: attrs.draggable,
    //for old version
    ejsRotate: attrs.ejsRotate, 
    posX: attrs.posX,
    posY: attrs.posY,
    sizeX: attrs.sizeX,
    sizeY: attrs.sizeY,
    fillColor: attrs.fillColor,
    lineColor: attrs.lineColor,
    lineWidth: attrs.lineWidth,
    group: group
  });
}



EJS.View.createLineBySvg = function(id,attr,reDraw){
  
  // console.log(attr);
  var uobj = EJS.utilities,
      line = d3.select("#container #svgElement g"),
      d = [{x:0,y:0}],
      objName = attr.name || `"${id}"`,
      defX1 = uobj.eval(attr.posX) || 0,
      defY1 = uobj.eval(attr.posY) || 0,
      sizeX = uobj.eval(attr.sizeX) || 0,
      sizeY = uobj.eval(attr.sizeY) || 0,      
      defX2 = parseFloat(defX1) + parseFloat(sizeX),
      defY2 = parseFloat(defY1) + parseFloat(sizeY),
      dashArray = uobj.eval(attr.dashArray) || "",
      group = attr.group || "",
      node = null;

    node = line.selectAll("#container svg").data(d).enter().append("svg:g");
  
  if(group!="") node = d3.select("#"+group).append("svg:g");

    
    // .on("click", function(d) {               
    //    EJS.View.setObjPanel(id);
    // });
    if(attr.fillColor) var fillColor = attr.fillColor.replace(/"/g,'') || "#000000";

  // console.log(defX1,defY1,defX2,defY2);
if(reDraw){
  console.log('reDraw Line');
    node = d3.select("#"+id).attr("type", "line")
    .attr("class", "node")
    .attr("id", id)
    .attr("transform",function(d){
      return "translate(" + uobj.eval(attr.posX) + "," + uobj.eval(attr.posY) + ")";  
    })
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));

    node = d3.select("#"+id+ " line");
  }else{
    node.attr("type", "line")
    .attr("class", "node")
    .attr("id", id)
    .attr("transform",function(d){
      return "translate(" + uobj.eval(attr.posX) + "," + uobj.eval(attr.posY) + ")";  
    })
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));
    
    node = node.append("line");
  }
  
      node.attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', uobj.eval(attr.sizeX))
      .attr('y2', uobj.eval(attr.sizeY))
      .attr("posX", attr.posX)
      .attr("posY", attr.posY)            
      .attr("sizeX", attr.sizeX)
      .attr("sizeY", attr.sizeY)  
      .attr("class","line")
      .attr("fillColor", attr.fillColor)
      .attr("lineColor", attr.lineColor)
      .attr("lineWidth", attr.lineWidth)
      .attr("stroke-dasharray", dashArray)
      //.style("stroke", style.stroke)
      .style("stroke", uobj.eval(fillColor))
      .style("stroke-width", uobj.eval(attr.lineWidth))
      .call(d3.behavior.drag().on("drag", EJS.View.lineMove))
      .on("click", function(d,i) {
          console.log(this.id); 
      })
      
  if(this.checkid(id)) return;
  EJS.data.circleArray.push(node);
  EJS.object.array.push({
    id:id,
    name:objName,
    group: group,
    type:'line',
    x1:attr.posX,
    y1:attr.posY,
    x2:attr.sizeX,
    y2:attr.sizeY,
    rotate: attr.rotate,
    ejsRotate: attr.ejsRotate,    
    posX: attr.posX,
    posY: attr.posY,
    sizeX: attr.sizeX,
    sizeY: attr.sizeY,
    dashArray: attr.dashArray,
    lineWidth:attr.lineWidth,
    fillColor: attr.fillColor,
    lineWidth: attr.lineWidth    
  });
        
}

EJS.View.createArrowBySVG = function(id,attrs,reDraw){
  // console.log('createArrowBySVG');
  // console.log(attrs);
  var uobj = EJS.utilities,
      objName = attrs.name || id,
      group = attrs.group || "";

      
  if(EJS.gup('id')!=""){
    
    var defX1 = attrs.x1,
        defY1 = attrs.y1,
        defX2 = attrs.x2,
        defY2 = attrs.y2,
        posX = attrs.posX,
        posY = attrs.posY,
        sizeX = attrs.sizeX,
        sizeY = attrs.sizeY;        
  }else{
    var defX1 = new Function('return '+ attrs.posX)(),
        defY1 = new Function('return '+ attrs.posY)(),
        defX2 = parseFloat(defX1) + new Function('return '+ attrs.sizeX)(),
        defY2 = parseFloat(defY1) + new Function('return '+ attrs.sizeY)(),
        posX = attrs.posX,
        posY = attrs.posY,
        sizeX = attrs.sizeX,
        sizeY = attrs.sizeY,
        lineWidth = attrs.lineWidth;
  } 
  var  d = (typeof(data)=='undefined') ? [{x:0,y:0}] : data;

  var fillColor = attrs.fillColor.replace(/"/g,'') || "#000000"; 

  var line = d3.select("#container #svgElement g");   
  var node = line.selectAll("#container svg")
      .data(d)
      .enter()
      .append("svg:g");

  if(group!="") node = d3.select("#"+group).append("svg:g");
    
  if(reDraw){
    node = d3.select("#"+id).attr("type", "arrow")
    .attr("class", "node")
    .attr("id", id)
    .attr("transform",function(d){
      return "translate(" + uobj.eval(attrs.posX) + "," + uobj.eval(attrs.posY) + ")";  
    })
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));

    node = d3.select("#"+id+ " line")
              .attr("class", "arrow")
              .attr('x1',0)
              .attr('y1',0)
              .attr('x2',uobj.eval(attrs.sizeX))
              .attr('y2',uobj.eval(attrs.sizeY))
              .attr("posX", attrs.posX)
              .attr("posY", attrs.posY)
              .attr("sizeX", sizeX)
              .attr("sizeY", sizeY)             
              .attr("marker-end", "url(#triangle"+id+")")
              .attr("fillColor", '"'+fillColor+'"')
              .attr("lineWidth", lineWidth)    
              .style("stroke", uobj.eval(fillColor))
              .style("stroke-width", uobj.eval(lineWidth))
              .call(d3.behavior.drag().on("drag", EJS.View.arrowMove));
    //console.log(fillColor);

     d3.select("#triangle"+id).attr("viewBox", "0 0 10 10")
     .attr("refX", 0)
     .attr("refY", 5)
     .attr("markerUnits", "strokeWidth")
     .attr("markerWidth", 6)
     .attr("markerHeight", 4)
     .attr("orient", "auto")
     .style("fill", uobj.eval(fillColor))
     .append("path")
     .attr("d", "M 0 0 L 10 5 L 0 10 z");   
  }else{
    node.attr("type", "arrow")    
      .attr("id", id)
      .attr("transform",function(d){
        return "translate(" + uobj.eval(attrs.posX) + "," + uobj.eval(attrs.posY) + ")";  
      });     
      node.append("line")
      .attr("class", "arrow")
      .attr('x1',0)
      .attr('y1',0)
      .attr('x2',uobj.eval(attrs.sizeX))
      .attr('y2',uobj.eval(attrs.sizeY))
      .attr("posX", attrs.posX)
      .attr("posY", attrs.posY)
      .attr("sizeX", sizeX)
      .attr("sizeY", sizeY)             
      .attr("marker-end", "url(#triangle"+id+")")
      .attr("fillColor", '"'+fillColor+'"')
      .attr("lineWidth", lineWidth)    
      .style("stroke", uobj.eval(fillColor))
      .style("stroke-width", uobj.eval(lineWidth))
      .call(d3.behavior.drag().on("drag", EJS.View.arrowMove));

      node.append("marker")        
      .attr("id", "triangle"+id)
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 0)
      .attr("refY", 5)
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 6)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .style("fill", fillColor)
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z"); 
  }


      
          
    
        // .on("click", function(d) {               
        //   EJS.View.setObjPanel(id);
        // });
               

    node.append("line")
        .data([0])
        .attr("class", "arrowMove")
        .attr('x1',defX2)
        .attr('y1',defY2)
        .attr('x2',defX2+parseFloat(uobj.eval(lineWidth)*3))
        .attr('y2',defY2+parseFloat(uobj.eval(lineWidth)*3))          
        .style("stroke", "rgba(255,0,0,0)")       
        .style("stroke-width", lineWidth*3)
        .call(d3.behavior.drag().on("drag", function(){



        var _dt = d3.select(this),
            _id = $(this).parent().attr("id"),
            _a = d3.select("#"+_id+" line");
            _aX2 = "",
            _aY2 = "",
            _y = 0,
            _x = 0,            
            x0 = _a.attr("x1"),
            y0 = _a.attr("y1"),
            x1 = _a.attr("x2"),
            y1 = _a.attr("y2"),
            x2 = _a.attr("x2"),
            y2 = _a.attr("y2"),            
            calcD = function(_x1,_y1,_x2,_y2){
              return Math.sqrt(Math.pow((_x2-_x1),2) + Math.pow((_y2-_y1),2));
            },
            ab = 0,
            bc = 0,            
            _aSizeX = x1-x0,
            _aSizeY = y1-y0,
            c0 = Math.atan2(_aSizeY,_aSizeX),
            c2 = 0,
            d =lineWidth*3;


            _aX2 = d3.event.dx+parseFloat(_a.attr("x2"));
            _aY2 = d3.event.dy+parseFloat(_a.attr("y2"));
            c0 = Math.atan2(_aSizeY,_aSizeX);
            
            _a.attr("x2", _aX2);
            _a.attr("y2", _aY2);
        
            _dt.attr("x1", _aX2);  
            _dt.attr("y1", _aY2);  

            _aSizeX = _aX2-x0;
            _aSizeY = _aY2-y0;

            c2=Math.atan2(_aSizeY,_aSizeX);

            _dt.attr("x2", _aX2 + d*Math.cos(c2));
            _dt.attr("y2", _aY2 + d*Math.sin(c2));
            
   
      }))

    if(this.checkid(id)) return;      
    EJS.data.circleArray.push(node);
    EJS.object.array.push({
      id:id,
      name:objName,
      group: group,
      type:'arrow',
      x1:attrs.posX,
      y1:attrs.posY,
      x2:attrs.sizeX,
      y2:attrs.sizeY,
      lineWidth:lineWidth,
      "stroke-width":lineWidth,
      //old version
      rotate: attrs.rotate,
      ejsRotate: attrs.ejsRotate, 
      posX: attrs.posX,
      posY: attrs.posY,
      sizeX: attrs.sizeX,
      sizeY: attrs.sizeY,
      lineWidth: attrs.lineWidth,
      fillColor: attrs.fillColor
    });

}

//computePoints   
EJS.View.createSpringBySVG = function(id,redraw,attrs){
  //console.log(attrs.pointsPerLoop);
  // console.log('create Spring');
  //console.log(attrs);
  
  var uobj = EJS.utilities,
      defaultSpring = EJS.View.Default.Spring,
      pointsPerLoop = parseFloat(uobj.eval(attrs.pointsPerLoop)) || defaultSpring.pointsPerLoop ,
      radius = parseFloat(uobj.eval(attrs.radius)) || defaultSpring.radius,
      segments = parseFloat(uobj.eval(attrs.segments)) || defaultSpring.segments,
      thinExtremes = false,
      x = parseFloat(uobj.eval(attrs.r_posX)) || parseFloat(uobj.eval(attrs.posX)) || 0,
      y = parseFloat(uobj.eval(attrs.r_posY)) || parseFloat(uobj.eval(attrs.posY)) || 0,
      sizex = parseFloat(uobj.eval(attrs.r_sizeX)) || parseFloat(uobj.eval(attrs.sizeX)) || 0,
      sizey = parseFloat(uobj.eval(attrs.r_sizeY)) || parseFloat(uobj.eval(attrs.sizeY)) || 0,
      // posX = attrs.r_posX || attrs.posX,
      // posY = attrs.r_posY || attrs.posY,
      // sizeX = attrs.r_sizeX || attrs.sizeX,
      // sizeY = attrs.r_sizeX || attrs.sizeY,
      length = sizex*sizex+sizey*sizey,
      u2x,
      u2y,
      delta,
      jsonPoints = [],
      zeroLength = false,
      pre = pointsPerLoop/2,
      objName = attrs.name || id,
      group = attrs.group || "",
      lineColor = attrs.lineColor || "#000000";


  if(length===0){
    zeroLength = true;    
    length=0;
  } 

  zeroLength = false;
  length = Math.sqrt(length);
  u2x = -sizey/length;
  u2y = sizex/length;
  delta = (2.0*Math.PI/pointsPerLoop);  
  if(radius<0){
    delta *= -1;
  }
  
  for(var i = 0;i<=segments;i++){
    var k;
    if(thinExtremes) {
      if(i<pre) {
          k = 0;
      } else if(i<pointsPerLoop) {
          k = i-pre;
      } else if(i>(segments-pre)) {
          k = 0;
      } else if(i>(segments-pointsPerLoop)) {
          k = segments-i-pre;
      } else {
          k = pre;
      }
    } else {
      k = pre;
    }
        
  var angle = (Math.PI/2+i*delta),
        cos = Math.cos(angle); //, sin = Math.sin(angle);
        xPoints = [],
        yPoints = [],
        xPoints[i] = (x+i*sizex/segments+k*radius*cos*u2x/pre) || 0 ,
        yPoints[i] = (y+i*sizey/segments+k*radius*cos*u2y/pre) || 0 ;
  jsonPoints.push({x:xPoints[i],y:yPoints[i]});
        
    var solenoid=0.0;
    if(solenoid!=0.0) {
      var cte = k*Math.cos(i*2*Math.PI/pointsPerLoop)/pre;
      xPoints[i] += solenoid*cte*sizex;
      yPoints[i] += solenoid*cte*sizey;
    }
  }
    //var circle = d3.select("#container #svgElement g");
    //computeGeneralPath(jsonPoints,id,redraw);
    //var spring = d3.select("#container svg");
    
  var d3line2 = d3.svg.line()
                  .x(function(d){return d.x;})
                  .y(function(d){return d.y;})
                  .interpolate("linear");
  if(redraw){   
   
    d3.select("#"+id+" .spring").attr("d", d3line2(jsonPoints))
                                .attr("posX",attrs.r_posX)
                                .attr("posY",attrs.r_posY)            
                                .attr("sizeX",attrs.r_sizeX)
                                .attr("sizeY",attrs.r_sizeY)
                                .attr("r_posX", attrs.r_posX)
                                .attr("r_posY", attrs.r_posY)
                                .attr("r_sizeX", attrs.r_sizeX)
                                .attr("r_sizeY", attrs.r_sizeY)
                                .attr("pointsPerLoop", attrs.pointsPerLoop)
                                .attr("radius", attrs.radius)
                                .attr("segments", attrs.segments)
                                .attr("lineColor", "\""+lineColor+"\"")
                                .attr("lineWidth", attrs.lineWidth)
                                .style("stroke-width", uobj.eval(attrs.lineWidth))
                                .style("stroke", lineColor)
                                .style("fill", "none");
    return;
  }


  //var spring = d3.select("#container #svgElement g");

  var spring = d3.select("#container #svgElement g"),
           d = [{x:0,y:0}];
  
  var node = spring.selectAll("#container svg")
    .data(d)
    .enter().append("svg:g")
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));
    // .on("click", function(d) {               
    //    EJS.View.setObjPanel(id);
    // });
  
  if(group!="") node = d3.select("#"+group).append("svg:g");

    node.attr("type", "spring")   
    .attr("id", id)
    .attr("transform",function(d){
      //return "translate(" + d.x + "," + d.y + ")";  
    })
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));
      
    

  node.append("svg:path")
      .attr("d", d3line2(jsonPoints))
      .attr("id", id)
      .attr("type", "spring")
      .attr("class", "spring")
      .attr("posX",attrs.r_posX)
      .attr("posY",attrs.r_posY)            
      .attr("sizeX",attrs.r_sizeX)
      .attr("sizeY",attrs.r_sizeY)                               
      .attr("r_posX", attrs.r_posX)
      .attr("r_posY", attrs.r_posY)
      .attr("r_sizeX", attrs.r_sizeX)
      .attr("r_sizeY", attrs.r_sizeY)
      .attr("pointsPerLoop",attrs.pointsPerLoop)
      .attr("radius",attrs.radius)
      .attr("segments", attrs.segments)
      .attr("lineWidth", attrs.lineWidth)
      .attr("fillColor", lineColor)
      .style("stroke-width", uobj.eval(attrs.lineWidth))
      .style("stroke", uobj.eval(lineColor))
      .style("fill", "none"); 

  if(this.checkid(id)) return;  
  EJS.data.circleArray.push(node);          
  EJS.object.array.push({
    id:id,
    name:objName,
    group: group,
    type:'spring',
    posX:attrs.r_posX,
    posY:attrs.r_posY,     
    sizeX:attrs.r_sizeX, 
    sizeY:attrs.r_sizeY, 
    radius:attrs.radius, 
    pointsPerLoop:attrs.pointsPerLoop, 
    segments:attrs.segments, 
    lineColor: lineColor, 
    lineWidth:attrs.lineWidth,
    rotate: attrs.rotate,
    ejsRotate: attrs.ejsRotate,
    //for old versionr_posX:attrs.posX,
    r_posX: attrs.r_posX, 
    r_posY: attrs.r_posY, 
    r_sizeX: attrs.r_sizeX, 
    r_sizeY: attrs.r_sizeY 
  });

}

EJS.View.createImageBySVG = function(id,attrs){  

  var posX =  new Function('return '+ attrs.posX)() || 0,
      posY =  new Function('return '+ attrs.posY)() || 0,
      rotate = new Function('return '+ attrs.ejsRotate)() || 0,
      objName = attrs.name || id,
      group = attrs.group || "";

  attrs.x = new Function('return '+ attrs.x)();  
  attrs.y = new Function('return '+ attrs.y)();
  attrs.width = new Function('return '+ attrs.width)();
  attrs.height = new Function('return '+ attrs.height)();
  


  var line = d3.select("#container #svgElement g"),
      d = (attrs)?[{x:attrs.x,y:attrs.y}]:[{x:0,y:0}];

    
  var node = line.selectAll("#container svg")
    .data(d)
    .enter().append("svg:g")
    .attr("type", "image")
    .attr("class", "node")
    .attr("id", id)
    .attr("transform",function(d){
      return "translate(" + posX + "," + posY + ") rotate("+ EJS.utilities.deg2rad(rotate) +")"; 
    })
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));
    // .on("click", function(d) {               
    //    EJS.View.setObjPanel(id);
    // });
          
  node.append("image") 
      .attr("xlink:href", attrs.imagefile.replace(/"/g,''))
      .attr("class","image")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", attrs.width)
      .attr("height", attrs.height)
      .attr("sizeX", attrs.sizeX)
      .attr("sizeY", attrs.sizeY)   
      .attr("posX", attrs.posX)
      .attr("posY", attrs.posY)
      .attr("ejsRotate", attrs.ejsRotate)
      .attr("imagefile", attrs.imagefile)
      .attr("offset", "")   
      .attr("transform", "translate("+(parseFloat(attrs.height)/2)*-1+","+parseFloat(attrs.width)/2+") scale(1,-1)");
      //.attr("transform", "translate("+((parseFloat(attrs.x)+parseFloat(attrs.height)/2))*-1+","+(parseFloat(attrs.y)+parseFloat(attrs.width)/2)+") scale(1,-1)");
  if(this.checkid(id)) return;
  EJS.data.circleArray.push(node);    
  EJS.object.array.push({
    id:id,
    name:objName,
    group: group,
    type:'image',
    posX:attrs.posX,
    posY:attrs.posY, 
    sizeX:attrs.sizeX, 
    sizeY:attrs.sizeY,
    width: attrs.width,
    height: attrs.height,
    ejsRotate: attrs.ejsRotate,
    imagefile: attrs.imagefile
  });  
}


EJS.View.createTextBySVG = function(id,attrs){

  // console.log('createText');
  // console.log(attrs);
  var uobj = EJS.utilities,
      _x = uobj.eval(attrs.x) || uobj.eval(attrs.posX) || 0,
      _y = uobj.eval(attrs.y) || uobj.eval(attrs.posY) || 0,
      _w = uobj.eval(attrs.size) || uobj.eval(attrs.sizeX) || 0,
      _h = uobj.eval(attrs.size) || uobj.eval(attrs.sizeY) || 0,
      rotate = uobj.eval(attrs.rotate) || uobj.eval(attrs.ejsRotate) || 0,
      line = d3.select("#container #svgElement g"),
      d = [{x:_x,y:_y}],
      fillColor = attrs.fillColor,
      objName = attrs.name || id,
      group = attrs.group || "";
//   if(fillColor) fillColor = e(fillColor).replace(/\"/g,''); 
  var node = line.selectAll("#container svg")
    .data(d)
    .enter().append("svg:g")
    .attr("type", "text")
    .attr("class", "node")
    .attr("id", id)
    .attr("transform",function(d){
      return "translate(" + d.x + "," + d.y + ") rotate(" + EJS.utilities.deg2rad(rotate) + ")";   
    })
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));
    // .on("click", function(d) {               
    //    EJS.View.setObjPanel(id);
    // });
    
   

    node.append("text")
        .attr("class", "text")
        //.attr("id", id) 
        .text(attrs.text.replace(/"/g,''))
        .attr("text", attrs.text)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", _w)
        .attr("height", _h)
        .attr("posX", attrs.posX)
        .attr("posY", attrs.posY)
        .attr("size", attrs.sizeX)
        .attr("sizeX", attrs.sizeX)
        .attr("sizeY", attrs.sizeY)
        .attr("lang", "en")
        .attr("data-lang-token", id+"_text")
        .attr("fillColor", attrs.fillColor)
        .attr("ejsRotate", attrs.ejsRotate)
        .attr("transform", " scale(1,-1)")
        .style("font-size", uobj.eval(attrs.sizeX))
        .style("fill", fillColor.replace(/"/g,''));
    if(this.checkid(id)) return;      
    EJS.data.circleArray.push(node);
    EJS.object.array.push({
      id:id,
      name:objName,
      group: group,
      type:'text',
      x:attrs.posX,
      y:attrs.posY,
      posX: attrs.posX,
      posY: attrs.posY,
      size:attrs.sizeX,
      sizeX: attrs.sizeX,
      sizeY: attrs.sizeY,
      rotate:attrs.ejsRotate,      
      ejsRotate: attrs.ejsRotate,
      fillColor: fillColor,
      text:attrs.text
    });

}


EJS.View.createPolygonData = function(xA,yA){

  
  var uobj = EJS.utilities,
      _x = uobj.eval(xA),
      _y = uobj.eval(yA),
      str = "";
  
  if(xA.indexOf('"')==0){
    var _xA = _x.split(","),
        _yA = _y.split(",");
    for(var i=0,len=_xA.length;i<len;i++){
      if(str!="") str += ",";
      if(typeof(_yA[i])=='undefined') _yA[i] = 0;
      str += _xA[i] + " " + _yA[i];
    }

  }else{
    if(typeof(_x)=="undefined"){
      return "";
    }

    for(var i=0,len=_x.length;i<len;i++){
      if(str!="") str += ",";
      if(typeof(_y[i])=='undefined') _y[i] = 0;
      str += _x[i] + " " + _y[i];
    }

  }

  
  return str;

}

EJS.View.createPolygonBySVG = function(id,attrs){

  let uobj = EJS.utilities,
      line = d3.select("#container svg g"),
      d = [{x:0,y:0}],
      points = EJS.View.createPolygonData(attrs.xData,attrs.yData),
      showPolygon = "none",
      showPolyline = "none",
      style = uobj.eval(attrs.polygonStyle),
      objName = attrs.name || `"${id}"`,
      dashArray = uobj.eval(attrs.dashArray) || "",      
      group = attrs.group || "";


  var node = line.selectAll("#container svg")
    .data(d)
    .enter().append("svg:g");

  if(group!="") node = d3.select("#"+group).append("svg:g");

    node.attr("type","polygon")
    .attr("class", "node")
    .attr("id", id)
    // .attr("transform",function(d){
    //   return "translate(" + d.x + "," + d.y + ")";  
    // })
    .call(EJS.View.onDragDrop(this.dragmove,this.dropHandler,this.dragStartHandler,id));
    // .on("click", function(d) {               
    //    EJS.View.setObjPanel(id);
    // });

    (style) ? showPolygon = "show" : showPolyline = "show";
    
    node.append("polygon") 
        .attr("class","polygon")
        .attr("points", points)
        .attr("data", attrs.data)
        .attr("xData", attrs.xData)
        .attr("yData", attrs.yData)
        .attr("posX", attrs.posX)
        .attr("posY", attrs.posY)        
        .attr("lineColor", attrs.lineColor)
        .attr("stroke", uobj.eval(attrs.lineColor))
        .attr("stroke-width", uobj.eval(attrs.lineWidth))
        .attr("lineWidth", attrs.lineWidth)
        .attr("polygonStyle", attrs.polygonStyle)
        .attr("fillColor", attrs.fillColor)
        .attr("display", showPolygon)
        .attr("stroke-dasharray", dashArray)
        .style("fill", uobj.eval(attrs.fillColor));  

    node.append("polyline") 
        .attr("class","polyline")
        .attr("points", points)
        .attr("data", attrs.data)
        .attr("xData", attrs.xData)
        .attr("yData", attrs.yData)
        .attr("posX", attrs.posX)
        .attr("posY", attrs.posY)        
        .attr("lineColor", attrs.lineColor)
        .attr("stroke", uobj.eval(attrs.lineColor))
        .attr("stroke-width", uobj.eval(attrs.lineWidth))
        .attr("lineWidth", attrs.lineWidth)
        .attr("polygonStyle", attrs.polygonStyle)
        .attr("fillColor", attrs.fillColor)
        .attr("display", showPolyline)
        .attr("stroke-dasharray", dashArray)
        .style("fill", uobj.eval(attrs.fillColor));  

    

  if(this.checkid(id)) return;
  EJS.data.circleArray.push(node);      
  EJS.object.array.push({
    id:id,
    name:objName,
    group: group,
    type:'polygon',
    polygonStyle:attrs.polygonStyle,
    lineColor:attrs.lineColor,
    lineWidth:attrs.lineWidth,
    fillColor: attrs.fillColor,
    rotate: attrs.rotate,
    ejsRotate: attrs.ejsRotate,
    xData:attrs.xData,
    yData:attrs.yData,
    posX: attrs.posX,
    posY: attrs.posY,
    dashArray: attrs.dashArray    
  });
}



EJS.View.createAnalyticCurve = function(id,attrs){
 
  var uobj = EJS.utilities,
      x = "[-100, -50, 0, 50, 100]",
      y = [100,130,130,30,70, 30],
      line = d3.select("#container svg g"),
      d = [{x:0,y:0}],      
      points = "0 0,8.16326530612245 16.037944853115757,16.3265306122449 30.381027876116327,24.489795918367346 41.513497258872874,32.6530612244898 48.25889319905016,40.816326530612244 49.904374106735915,48.97959183673469 46.27604845105371,57.142857142857146 37.75735131158289,65.3061224489796 25.248523632922755,73.46938775510205 10.07147634357551,81.63265306122449 -6.169906868108935,89.79591836734694 -21.759265163764848,97.95918367346938 -35.049142552410665,106.12244897959184 -44.635088144657665,114.28571428571429 -49.50407605479178,122.44897959183673 -49.14156019628153,130.6122448979592 -43.58585060803948,138.77551020408163 -33.4240649168286,146.9387755102041 -19.730082778152084,155.10204081632654 -3.9510601612869642,163.26530612244898 12.245503550598965,171.42857142857142 27.147983965121643,179.59183673469389 39.1815131387923,187.75510204081633 47.07440885391884,195.91836734693877 49.992563760765144,204.08163265306123 47.62759237657302,212.24489795918367 40.229420721483564,220.40816326530611 28.57987457590008,228.57142857142858 13.91005750584312,236.73469387755102 -2.229749998604072,244.89795918367346 -18.13392144132744,253.0612244897959 -32.12173193115457,261.2244897959184 -42.714974234975784,269.38775510204084 -48.79417312062484,277.55102040816325 -49.71688953226708,285.7142857142857 -45.38561242092235,293.8775510204082 -36.258063540774344,302.0408163265306 -23.29882621849968,310.2040816326531 -7.877409882275306,318.3673469387755 8.37647728808117,326.53061224489795 23.745153057823803,334.6938775510204 36.604482777525,342.85714285714283 45.59551507888935,351.0204081632653 49.768093467398586,359.18367346938777 48.68126719103195,367.3469387755102 42.44989014089905,375.51020408163265 31.732483293848794,383.6734693877551 17.661643372793247,391.83673469387753 1.7243520152347658,400 -14.395165833253266",
      objName = attrs.name || id,
      group = attrs.group || "";
      

  var node = line.selectAll("#container svg")
    .data(d)
    .enter().append("svg:g");

if(group!="") node = d3.select("#"+group).append("svg:g");

    node.attr("type","analyticCurve")
    .attr("class", "node")
    .attr("id", id);
    // .attr("transform",function(d){
    //   return "translate(" + d.x + "," + d.y + ")";  
    // });
    
  node.append("polyline") 
        .attr("class","analyticCurve")
        .attr("points", points)
        .attr("point", attrs.point)
        .attr("minimum", attrs.minimum)
        .attr("maximum", attrs.maximum)        
        .attr("xFn", attrs.xFn)
        .attr("yFn", attrs.yFn)
        .attr("variable", attrs.variable)
        .attr("posX", attrs.posX)
        .attr("posY", attrs.posY)        
        .attr("lineColor", attrs.lineColor)
        .attr("stroke", "#0000ff")
        .attr("stroke-width", "4")
        .attr("lineWidth", attrs.lineWidth)        
        //.attr("fillColor", attrs.fillColor)        
        .style("fill", "none");  

    
  if(this.checkid(id)) return;

  EJS.data.circleArray.push(node);      
  EJS.object.array.push({
    id:id,
    name:objName,
    group: group,
    type:'analyticCurve',
    minimum:attrs.minimum,
    maximum:attrs.maximum,
    point:attrs.point,
    xFn:attrs.xFn,
    yFn:attrs.yFn,
    variable:attrs.variable,
    lineColor:attrs.lineColor,
    lineWidth:attrs.lineWidth,
    group: group});

}


EJS.View.checkid = function(id){
  for(var key in EJS.object.array){
    if(EJS.object.array[key]['id']==id) return true;
  }
  return false;

}

EJS.View.createSlider = function(id,attrs){
    var uobj = EJS.utilities,
        actionTxt = null,
        objName = attrs.name || id,
        group = attrs.group || "";

  (typeof(attrs.action)!="undefined") ? actionTxt = attrs.action.replace(/"/g,'') : actionTxt = "" ;

  var node = {
      "id":id,
      "name":objName,
      "group": group,
      "type":"slider",
      "minimum":attrs.minimum,
      "maximum":attrs.maximum,
      "variable":attrs.variable,
      "initialValue":attrs.initialValue,
      "format":attrs.format,
      "action":attrs.action,
      "split":attrs.split,
      "step":attrs.step,
      "close":attrs.close
  };

  $("#framecontentTop").append("<div class=\"" + id + "\" style=\"position:relative\">\n    <div class=\"variableTxt\" style=\"position:relative;width:25px;text-align:center;display: inline-block\">" + attrs.variable + "</div>\n    <i class=\"glyphicon glyphicon-plus\"></i>    \n    <label>\n      <input type=\"range\" step=\"" + attrs.step + "\" id=\"" + id + "\" min=\"" + attrs.minimum + "\" max=\"" + attrs.maximum + "\" value=\"" + attrs.initialValue + "\" variable=\"" + attrs.variable + "\" >\n    </label>\n    <i class=\"glyphicon glyphicon-minus\"></i>    \n    <input type=\"number\" style=\"width:50px\" id=\"" + id + "-input\" value=\"" + attrs.initialValue + "\" step=\"" + attrs.step + "\">\n    <span id=\"" + id + "-format\" lang=\"en\" data-lang-token=\"" + id + "_format\">" + uobj.eval(attrs.format) + "</span></div>\n      ");
  
  if(this.checkid(id)) return;
  
  EJS.data.controlArray.push(node);
  EJS.object.array.push(node);
}


EJS.View.createplottingPanel = function(id,attrs){
  var objName = attrs.name || id,
      group = attrs.group || "",
      node = {
        "id":id,
        "name":objName,
        "group":group,
        "type":"plottingPanel",
        "X":attrs.X,
        "Y":attrs.Y,
        "amount":attrs.amount,
        "xTitle":attrs.xTitle,
        "yTitle":attrs.yTitle,
        "lineType":attrs.lineType
      };

  if(this.checkid(id)) return;
  EJS.data.controlArray.push(node);   
  EJS.object.array.push(node);
}

EJS.View.createButton = function(id,attrs){
  var uobj = EJS.utilities,
      objName = attrs.name || id,
      group = attrs.group || ""
      node = {
        "id":id,
        "name":objName,
        "group": group,
        "type":"button",
        "text":attrs.text,
        "action":attrs.action
      };
  
      console.log('create button:'+id);
  //$("#framecontentTop").append('<input type="button" id="'+id+'" value='+uobj.eval(attrs.text)+'>');
  console.log(attrs.text);
  $("#framecontentTop").append('<button id="'+id+'" lang="en" data-lang-token="'+id+'_text">'+uobj.eval(attrs.text)+'</button>');
  

  if(this.checkid(id)) return;

  EJS.data.controlArray.push(node);   
  EJS.object.array.push(node);  
}

EJS.View.createGroup = function(id, attrs, reDraw){
  var uobj = EJS.utilities,
      objName = attrs.name || id,
      group = attrs.group || "",
      d3Obj = d3.select("#container #svgElement g"),
      nodeData = {
        "id":id,
        "name":objName,
        "group": group,
        "type":"group",
        "posX":attrs.posX,
        "posY":attrs.posY,
        "sizeX": attrs.sizeX,
        "sizeY": attrs.sizeY,
        "transform": attrs.transform,
        "rotate": attrs.ejsRotate},
        rotate = uobj.eval(attrs.ejsRotate) || 0;
  


    if(reDraw) {
      var node = d3.select("#"+id)    
    .attr("name", objName)
    .attr("transform","translate("+ uobj.eval(attrs.posX) +","+ uobj.eval(attrs.posY) +") rotate("+ uobj.deg2rad(rotate) +")");
  
      return;
    }

  var posX = uobj.eval(attrs.posX) || 0,
      posY = uobj.eval(attrs.posY) || 0,
      node = d3.select("#container #svgElement g")    
                .append("svg:g")
                .attr("type", "group")
                .attr("class", "node")
                .attr("id", id)
                .attr("name", objName)
                .attr("transform","translate("+ posX +","+ posY +") rotate("+ uobj.deg2rad(rotate) +")");
    



  if(this.checkid(id)) return;    
  EJS.data.controlArray.push(nodeData);   
  EJS.object.array.push(nodeData);  
}

EJS.View.createTwoStateButton = function(id,attrs){
  
  var uobj = EJS.utilities,      
      objName = attrs.name || id,
      group = attrs.group || "",
      node = {};
  
  node.id = id; 
  node.name = objName;
  node.group = group;

  for(var key in attrs){
    node[key] = attrs[key];
  }
  console.log(node);
  //<span class="glyphicon glyphicon-link" aria-hidden="true"></span>
  $("#framecontentTop").append('<button id="'+id+'" class="btn btn-default" type="twoStateButton" lang="en" data-lang-token="'+id+'_text"> '+uobj.eval(attrs.on_text)+'</button>');

  if(this.checkid(id)) return;
  EJS.data.controlArray.push(node);   
  EJS.object.array.push(node);
}

EJS.View.createCheckboxButton = function(id,attrs){

  var uobj = EJS.utilities,
      node = {},
      objName = attrs.name || id,
      group = attrs.group || "";

  for(var key in attrs){    
    node[key] = attrs[key];
  }

  node.group = group;  
  node.id = id;
  node.name = objName;
  
  //$("#framecontentTop").append('<label><input id="'+id+'" type="checkbox"><span id="'+id+'-txt" lang="en" data-lang-token="'+id+'">'+uobj.eval(attrs.text)+'</span></label>');
  $("#framecontentTop").append('<label><input id="'+id+'" type="checkbox"><span id="'+id+'-txt" lang="en" data-lang-token="'+id+'_text">'+uobj.eval(attrs.text)+'</span></label>');
  if(this.checkid(id)) return;
  EJS.data.controlArray.push(node);   
  EJS.object.array.push(node);
}

EJS.View.createRadioButton = function(id,attrs){
  
  var uobj = EJS.utilities,
      node = new Object(),
      objName = attrs.name || id,
      group = attrs.group || "";
  
  node.id = id; 
  node.name = objName;
  node.group = group;

  for(var key in attrs){
    node[key] = attrs[key];
  }

  $("#framecontentTop").append('<label><input id="'+id+'" type="radio"><span id="'+id+'-txt">'+uobj.eval(attrs.text)+'</span></label>');
  if(this.checkid(id)) return;
  EJS.data.controlArray.push(node);   
  EJS.object.array.push(node);
}
    


EJS.View.printValue = function(sliderID, idx, inputVal, flag) {
  
  var val = $("#"+sliderID).val(),
      max = parseFloat($("#"+sliderID).attr("max")),
      min = parseFloat($("#"+sliderID).attr("min")),
      o = EJS.data.controlArray,
      textbox = '',
      obj = null;
    
 for(var key in o){
   if(o[key].id == sliderID) obj = o[key];
 }

  if(typeof(inputVal)!='undefined'){    
    val = inputVal;
    if(flag){
      if(val>=max){
        val = max;
      }else if(val<=min) {
        val = min;
      }

      $("#"+sliderID+"-input").val(val)
    }

    //
    $("#"+sliderID).val(val);
    
  }else{
    
    $("#"+sliderID+"-input").val(val);
    
  }
  
  if(typeof(obj.format)!="undefined") textbox = obj.format.replace(/\"/g,'');

  if(textbox!=''){
    var t = textbox.replace(parseSentenceForNumber(textbox),val);
    
    $("#"+sliderID+"-value").html(t);  
  }else{
    $("#"+sliderID+"-value").html(val);  
  }
  

  EJS.setValue($("#"+sliderID).attr("variable"),val);
    
  var defineVars = EJS.rk4.defineVarsList;        
  for(var i=0,len=defineVars.length;i<len;i++){
    defineVars[i].value = new Function('return '+ defineVars[i].name)();
  }

}


EJS.View.setSlider = function(node){
  $('#'+node.id).slider({
    min: node.minimum,
    max: node.maximum,
    value: node.initialValue,
    step:1,
    formater: function(value) {
      return node.format + formatFloat(value,2);
    }
  }).on('slide', function(ev){
    //var g_value = formatFloat(ev.value,2);
    console.log(g_value);
    //g = g_value;
    //$("#defineVarBMTable1_4_2").val("g_value")
  //defineVarsList[3].value = g;
  });
}   

EJS.View.onDragDrop = function(dragHandler, dropHandler, dragStartHandler,objId){
  var drag = d3.behavior.drag();
      
  drag.on("dragstart", function(d){
    dragStartHandler(d,objId)
  }).on("drag", function(d){
    dragHandler(d,objId);
  }).on("dragend", function(d){
    dropHandler(d,objId);
  });
      
    return drag;
}   
    
EJS.View.dragStartHandler = function(d,objId){
  //eval(EJS.object.array[0].press);
  // var _obj = _(EJS.object.array).find(function(o) {      
  //   return o.id == objId;        
  // });   
      
  // new Function('return '+ _obj.press)();
    try{    
      dragFn[objId].dragStart();
    }catch(e){
      console.log(objId,e);
    }

    EJS.data.setDefineVarsValue();  
    EJS.rk4.updateDefineVar();  
    
}
EJS.View.dragHandler = function(d,objId){

  console.log('==dragHandler==');
  // var _obj = _(EJS.object.array).find(function(o) {      
  //   return o.id == objId;        
  // });   
      
  // new Function('return '+ _obj.drag)();
    try{    
      dragFn[objId].drag();
    }catch(e){
      console.log(objId,e);
    }
    EJS.data.setDefineVarsValue();
    EJS.rk4.updateDefineVar();
}

EJS.View.dropHandler = function(d,objId){
  console.log('droped');
  // var _obj = _(EJS.object.array).find(function(o) {      
  //   return o.id == objId;        
  // });   

  try{    
    dragFn[objId].drop();
  }catch(e){
    console.log(objId,e);
  }
  EJS.data.setDefineVarsValue();
  EJS.rk4.updateDefineVar();
  //console.log(_obj.release);
  //new Function('return '+ _obj.release)();
} 

EJS.View.checkVar = function(name){
  var v = EJS.data.modelvariables.defineVarsList;
      obj = _(v).find(function(o) {
        return o.name == name;
      });
  if(typeof(obj)=="object" ) return true;
  if(name == parseFloat(name)) return true;

  return false;
}

EJS.View.dragmove = function(d,objId){
  
  var obj = d3.select("#"+objId),      
      $id = objId, //obj.attr("id"),  
      o = _(EJS.object.array).find(function(x) {
        return x.id == $id;
      }),
      oType = o.type,
      xMove = EJS.View.checkVar(o.posX),
      yMove = EJS.View.checkVar(o.posY);
      EJS.View.setObjPanel($id);
  
  //console.log('dragmove,',o.posX,o.posY);
  d.x = EJS.utilities.eval(o.posX);
  d.y = EJS.utilities.eval(o.posY);

  if(xMove && (o.draggable=='"ENABLED_ANY"' || o.draggable=='"ENABLED_X"')) d.x += d3.event.dx;
  if(yMove && (o.draggable=='"ENABLED_ANY"' || o.draggable=='"ENABLED_Y"')) d.y += d3.event.dy;

  
  obj.attr("transform","translate(" + d.x + "," + d.y + ")");  


  if(xMove) EJS.View.setMoveVal(obj.select("."+oType),"posX",d.x);
  if(yMove) EJS.View.setMoveVal(obj.select("."+oType),"posY",d.y);
   
}
  
EJS.View.lineMove = function(){
  this.parentNode.appendChild(this);
  var dragTarget = d3.select(this);
  dragTarget.attr("x1", function(){return d3.event.dx + parseInt(dragTarget.attr("x1"))})
            .attr("y1", function(){return d3.event.dy + parseInt(dragTarget.attr("y1"))})
            .attr("x2", function(){return d3.event.dx + parseInt(dragTarget.attr("x2"))})
            .attr("y2", function(){return d3.event.dy + parseInt(dragTarget.attr("y2"))});  
}

EJS.View.setMoveVal = function(obj,attr,val){
  

  if(!EJS.utilities.checkVar(obj.attr(attr),val)){
    //console.log(obj.attr(attr),attr,val);
    obj.attr(attr,val);
    $("#attr_"+attr).val(val);
  }else{
    
  }
  
  EJS.rk4.updateDefineVar();  
  
}

EJS.View.arrowMove = function(){
  
  var dragTarget = d3.select(this),
      rect = $(this).parent().find(".arrowMove"),
      defX1,
      defY1,
      defX2,
      defY2;
    
    EJS.View.setObjPanel($(this).parent().attr("id"));

  dragTarget
      .attr("x1", function(){
        defX1 = d3.event.dx + parseInt(dragTarget.attr("x1"));
        
        EJS.View.setMoveVal(dragTarget,"posX",defX1);

        return defX1;
      }).attr("y1", function(){
          defY1 = d3.event.dy + parseInt(dragTarget.attr("y1"));
          EJS.View.setMoveVal(dragTarget,"posY",defY1);
          return defY1;
      }).attr("x2", function(){
        
          defX2 = d3.event.dx + parseInt(dragTarget.attr("x2"));
          EJS.View.setMoveVal(dragTarget,"sizeX",defX2);
          return defX2;
      }).attr("y2", function(){        
          defY2 = d3.event.dy + parseInt(dragTarget.attr("y2"));
          EJS.View.setMoveVal(dragTarget,"sizeY",defY2);
          return defY2;
      });

  //計算箭頭上的方塊
  var calcD = function(_x1,_y1,_x2,_y2){
              // console.log(_x1,_y1,_x2,_y2);
              // console.log((_x2-_x1),(_y2-_y1));
              return Math.sqrt(Math.pow((_x2-_x1),2) + Math.pow((_y2-_y1),2));
      },
      ab = 0,
      bc = 0,
      x0 = parseFloat(dragTarget.attr("x1")),
      y0 = parseFloat(dragTarget.attr("y1")),
      x1 = parseFloat(dragTarget.attr("x2")),
      y1 = parseFloat(dragTarget.attr("y2"));
      ab = calcD(x0,y0,x1,y1);
      bc = dragTarget.attr("lineWidth")*3;

      y2 = ((parseFloat(y1)-parseFloat(y0))*(parseFloat(ab)+parseFloat(bc)))/parseFloat(ab) + parseFloat(y0);
      x2 = ((parseFloat(x1)-parseFloat(x0))*(parseFloat(ab)+parseFloat(bc)))/parseFloat(ab) + parseFloat(x0);

      if(dragTarget.attr("x1")<dragTarget.attr("x2")){
        rect.attr("x1", x1);  
        rect.attr("x2", x2);
      } if(dragTarget.attr("x1")>dragTarget.attr("x2")){
        rect.attr("x1", x1);  
        rect.attr("x2", parseFloat(x2));
      }
      
      if(dragTarget.attr("y1")<dragTarget.attr("y2")){
        rect.attr("y1", y1);
        rect.attr("y2", parseFloat(y2));
      } if(dragTarget.attr("y1")>dragTarget.attr("y2")){
        rect.attr("y1", y1);
        rect.attr("y2", parseFloat(y2));
      }
      
} 

/* EJS Model */



/*
 * 從資料庫中載入物件
 * 
 * 
 */
EJS.Run.loadObj = function(elm, first){
  var elmLen = elm.length || 0,      
      controlArray = EJS.object.array;

      for(var i=0;i<elmLen;i++){
        if(!elm[i]) continue;            
        if(typeof(elm[i].property)!=="undefined" && EJS.VERSION!==EJS.CHKVER){
          for(var j=0;j<elm[i].property.length;j++){
            var _id = elm[i].property[j].name,
                _value = elm[i].property[j].value;
    
            eval("tmp_value."+elm[i].property[j].name+" = elm[i].property[j].value;");
    
          }
        }else{
          tmp_value = elm[i];
        }
    
      if(typeof(_EJS_VARINIT)!='undefined') _EJS_VARINIT();
    
        switch (elm[i].type.trim()){
          case 'group':
            EJS.View.createGroup(elm[i].id,elm[i]);
            break;
          case 'slider':             
            EJS.View.createSlider(elm[i].id,elm[i]);
            break;
          case 'button':
            EJS.View.createButton(elm[i].id,elm[i]);
            break;      
          case 'twoStateButton':
            EJS.View.createTwoStateButton(elm[i].id,elm[i]);
            break;        
          case 'checkbox':
            EJS.View.createCheckboxButton(elm[i].id,elm[i]);
            break;
          case 'radio':
            EJS.View.createRadioButton(elm[i].id,elm[i]);
            break;  
          case 'plottingPanel':    
            EJS.View.createplottingPanel(elm[i].id,elm[i]);
            break;  
          case 'circle':
              EJS.View.createCircleBySVG(elm[i].id, tmp_value);        
              //EJS.View.createRectBySVG(elm[i].id, tmp_value);
              break;
          case 'rect':
              EJS.View.createRectBySVG(elm[i].id, tmp_value);         
              break;  
          case 'line':
              EJS.View.createLineBySvg(elm[i].id, tmp_value);
            break;
          case 'arrow':
              EJS.View.createArrowBySVG(elm[i].id, tmp_value);      
            break;
          case 'spring':        
              EJS.View.createSpringBySVG(elm[i].id,false,tmp_value);
            break;
          case 'image':
              EJS.View.createImageBySVG(elm[i].id,tmp_value);
            break;
          case 'text':
              EJS.View.createTextBySVG(elm[i].id,tmp_value);
            break;  
          case 'polygon':        
              EJS.View.createPolygonBySVG(elm[i].id,tmp_value);
            break;
          case 'analyticCurve':
            EJS.View.createAnalyticCurve(elm[i].id,tmp_value);
            EJS.View.updateAnalyticCurve(elm[i].id,true);
            break;
          case 'trace':
          case 'trail':
            EJS.View.createTrace(elm[i].id,tmp_value);
            //EJS.svg.createTracker(elm[i].id);
            break;
          case 'shapeSet':
            EJS.View.createShapeSet(elm[i].id,tmp_value);                   
            break;   
          case 'segmentSet':    
            EJS.View.createSegmentSet(elm[i].id,tmp_value);
            break;
          case 'arrowSet':              
            EJS.View.createArrowSet(elm[i].id,tmp_value);
            break;               
          default:
            console.log("no %s type",elm[i].type);
            break;
        }                                  
      }    
}

EJS.getPlotData =function(name){
  console.log(_EJS_PLOTTING[name]);
  return _EJS_PLOTTING[name];
}
    
EJS.svg.tracker = [];
// EJS.svg.tracker.attrs = {};
// EJS.svg.tracker.index = 0;

EJS.svg.createTracker = function(id){
  EJS.svg.tracker[id] = [];
  EJS.svg.tracker[id].attrs = {};
  EJS.svg.tracker[id].index = 0;
  EJS.svg.tracker[id].cycle = false;
}
    
EJS.saveTracker = function(id){

  var tracker = EJS.svg.tracker[id],
      d3Obj = d3.selectAll("#"+id+" .trace"),
      data = {
        x:new Function('return '+ d3Obj.attr("posX"))(),
        y:new Function('return '+ d3Obj.attr("posY"))(),
        r:new Function('return '+ d3Obj.attr("sizeX"))(),
        fillColor:new Function('return '+ d3Obj.attr("fillColor"))()
      },
      trackerSize = parseInt(d3Obj.attr("amount"))-1,
      idx = -1;
  
  tracker.cycle = new Function('return '+ d3Obj.attr("cycle"))();

  if ((tracker.index > trackerSize) && tracker.cycle){
    tracker.index = 0;    
  }    
  
  tracker[tracker.index] = data;  
  tracker.index++;
      
}


EJS.saveEJSstatus = function(jsondata){
  var setting = {
         url: "/saveStatus",
         type: "POST",
         dataType: "text",    
         data: jsondata
  },
  def = $.ajax(setting);

  def.done(function(data){
    console.log('save status success');               
    location.href="?name="+$("#filename").val();
    //this.loadJSFile($("#filename").val());
  }).fail(function(data){      
    //console.log("ajax is fail");
  }).always(function(data){
    $.unblockUI();
    //console.log("always");
  }); 
}



EJS.snapshot = function(filename,email){
  
  var snapshot = $("#container").html().trim().replace(/\n/g, "").replace(/\t/g, "");
    
  var setting = {
     url: "/snapshot",
     type: "POST",
     dataType: "json",    
     data: {snapshot:snapshot,filename:filename,email:email}
  },

  def = $.ajax(setting);
  def.done(function(data){
    if(data.code==200){            
      EJSINFO.show("Take a snapshot.");                               
    }    
    //location.href="?name="+$("#filename").val();
    //this.loadJSFile($("#filename").val());
  }).fail(function(data){      
    console.log("ajax is fail");
  }).always(function(data){
    //$.unblockUI();
    console.log("always");
  });  
}

EJS.saveControlData = function(controlObj,index){
  var oobj = EJS.object,
      type = controlObj.type,
      _obj = _(EJS.object.array).find(function(o) {
          if(typeof(o)!="undefined") return o.id == controlObj.id;        
      });   

  if(type=="range") type="slider";

  for(var key in oobj[type]){
    
    var varValue = $('#attr_'+key).val();
    if(typeof varValue != "undefined") {
      _obj[key] = varValue;
      controlObj[key] = varValue;
    }
  }

  return;

  for (key in controlObj){
    var varValue = null;
    if(key=="id") continue; 
    /*
     * 判斷使用者使用常數或變數,若使用變數則去modelvariables中取得變數的值
    */  
    if(EJS.data.getValue($("#attr_"+key).val(),EJS.data.modelvariables.defineVarsList)!=-1){
      //remove by squall @2015/7/3 
      //varValue = EJS.rk4.myEvalVar($("#attr_"+key).val());
      varValue = $('#attr_'+key).val();
      console.log(varValue);
    }else if(key=="action" || key=="format"){
      varValue = $('#attr_'+key).val();
    }else{
      if($('#attr_'+key).val()!=""){
      //remove by squall @2015/7/3 
      //varValue = EJS.rk4.myEvalVar($("#attr_"+key).val());
        varValue = $('#attr_'+key).val();
      }
    }
    
    if(typeof varValue != "undefined"){
      controlObj[key] = varValue;
      if(key=='variable') controlObj[key] = $("#attr_"+key).val();      
    }
  }
  //change slider view 
  $("#"+controlObj.id).attr("min",controlObj['minimum']);
  $("#"+controlObj.id).attr("max",controlObj['maximum']);
  $("#"+controlObj.id).val(controlObj['initialValue']);
  $("#"+controlObj.id+"-value").text(controlObj['initialValue']);   
}

EJS.setValue = function(myVar,value){
  
  var defineVarsList = EJS.data.modelvariables.defineVarsList,
      len = defineVarsList.length;

      console.log(defineVarsList);
  for(var i=0;i<len;i++){
    var name = defineVarsList[i]['name'];
    if(name==myVar){
      eval(myVar+"="+value);
      return 0;
    }
  }    
  
  return;
  
  





  var tabLength = $("#defineVarSubTab li").length, 
    thisDefineVarsList = [],   
    thisIdx = 0;
   
   //console.log(myVar)
   //x = new Function('return '+ d3.selectAll("#" + id + " .circle").attr("posX"))(),
  
  
  for(var i=1;i<tabLength;i++){
        //console.log(value);
    $("[id^='defineVarBMTable"+i+"'][id$='_1']").each (function() {
      var tmpIdx = $(this).attr("id").split("_"),
          name = $("#defineVarBMTable"+i+"_"+tmpIdx[1]+"_1").val();
            
      if(name==myVar){      
        $("#defineVarBMTable"+i+"_"+tmpIdx[1]+"_2").val(value);
        eval(myVar+"="+value);
        //EJS.updateDefineVarBMTable();             
        return 0;
      }           
    });  
  }     
  //console.log("update");  
  //EJS.rk4.update(); //not working ?
} 

EJS.data.decimal = 2;
$("#EJS_DECIMAL").on("click change", function(){
  EJS.data.decimal = $(this).val();
  $("#EJS_DECIMAL-input").val(EJS.data.decimal);
});

$("#EJS_DECIMAL-input").on("click change", function(){
  EJS.data.decimal = $(this).val();
  $("#EJS_DECIMAL").val(EJS.data.decimal);
});
    
EJS.showVariable = function(){
  
  checkButtonStatus();

  var tmp_tr = "",
      len = EJS.data.modelvariables.defineVarsList.length
      _V = EJS.data.modelvariables.defineVarsList;
  

   
    for(var i=0;i<len;i++){
      if(_V[i].visiable=="true" || _V[i].visiable==true){
        
        if(typeof(_V[i].format)=="undefined") _V[i].format = "0.00";

        tmp_tr += "<tr class=\"active\" align=\"right\">\n                    <td>" + _V[i].name + "</td>\n                    <td class=\"col-md-4\" >" + EJS.utilities.custFormat(EJS.utilities.eval(_V[i].name), _V[i].format) + "</td>\n                    <td><span lang=\"en\" data-lang-token=\"" + _V[i].name + "_comment\">" + _V[i].comment + "</span></td>\n                  </tr>";
      }
    
    } 
    
    //console.log(tmp_tr);
    $('#showVar > table > tbody').html(tmp_tr);
  
    
}

EJS.SVGViewBox = function(viewBox,scale){

  /* example:
    viewport 是 xmin,ymin,w,h
    針對座標點(x,y)會轉成xp,yp給svg","其轉化關係為
    xp = (x-min) * width/w;
    yp = (height) -(y-ymin)*height/h
  */

  var xmin = parseFloat(viewBox.minimumX),
      xmax = parseFloat(viewBox.maximumX),
      ymax = parseFloat(viewBox.minimumY),           
      ymin = parseFloat(viewBox.maximumY),
      width = Math.abs(xmax-xmin),
      height = Math.abs(ymax-ymin),
      translateX = Math.abs(xmin),
      translateY = Math.abs(ymin),
      viewBoxVal = 0 + ","+ 0 + ","+ width + ","+ height,
      scaleX = 800/width;
      scaleY = 800/height*(-1);
  //console.log(width,scaleX);
    d3.selectAll("#svgElement").attr("viewBox",viewBoxVal);
    //translateY
    d3.selectAll("#svgTransform").attr("transform","translate("+ (xmin*-1) +", "+ ymin +") scale("+scaleX+","+scaleY+")"); 
}

EJS.getStatusList = function(filename){
  var statusFile = null;  

  var setting = {
    url: '/getStatusList',
    type: "post",
    data: {'parentFile':filename},
    dataType: "json"  
  }
  
  def = $.ajax(setting);
     
  def.done(function(data){                        
    $("#statuslist ul li").remove();
    for(var i=0,len=data.length;i<len;i++){
      var filelist = "";
      (data[i].statusDesc) ? statusDesc = data[i].statusDesc : statusDesc = "No description.";
      filelist = '<li style="background-color:#f1f1f1;width:300px">Parent File: '+
             '<a href="/run/?name='+data[i].parentFile+'&id='+data[i]._id+'" class="openfiles" id="'+data[i]._id+'">'+ data[i].parentFile+'</a><br> '+
             'Description: '+statusDesc+
             '<br> User: '+data[i].user+'<br>Time:'+data[i].init_date;
             //'<br>Download:<a href="/tmp/'+data[i].filename+'.xml">ejs</a>';
             
      filelist += '<hr></li>';
      //console.log(myDate.toDateString('yyyy')+" "+myDate.toTimeString());
      $("#statuslist ul").append(filelist);
    }
  }).fail(function(data){      
      console.log("ajax is fail");
  }).always(function(data){
      //console.log("always");
  });   
}


EJS.getSnapshotList = function(filename){
  var statusFile = null,
      setting = {
        url: '/getStatusList',
        type: "post",
        data: {'parentFile':filename},
        dataType: "json"  
      },  
      def = $.ajax(setting);
     
  def.done(function(data){                       
    $("#statuslist div").remove();
    for(var i=0,len=data.length;i<len;i++){
      var filelist = "";
      (data[i].statusDesc) ? statusDesc = data[i].statusDesc : statusDesc = "No description.";
      filelist = '<div class="col-lg-3 col-md-4 col-xs-6 thumb"><a class="thumbnail" href="/group/?name='+data[i].parentFile+'&id='+data[i]._id+'" class="openfiles" id="'+data[i]._id+'"><img class="img-responsive" src="http://placehold.it/300x300" alt="">' +
                // '<p>Parent File: ' + data[i].parentFile+'</p>'+
                 '<p>Description: '+statusDesc + '</p>' +
                 '<p> User: '+data[i].user+'</p><p>Time:'+data[i].init_date +'</p></a></div>';      
      $("#statuslist").append(filelist);
    }
  }).fail(function(){      
      console.log("ajax is fail");
  });  
  
}

EJS.loadState = function(stateid){
  console.log("loadState:"+stateid);
  var setting = {
    url: "/loadState",
    type: "POST",
    dataType: "json",   
    data: {stateid:stateid}
  },

  def = $.ajax(setting);
  def.done(function(data){    
    EJS.data.state = data;
    EJS.setLoadState(EJS.data.state[0].defineVars);
  }).fail(function(data){      
    //console.log("ajax is fail");
  }).always(function(data){
    $.unblockUI();
    //console.log("always");
  }); 
}

EJS.setLoadState = function(data){
  for(var i=0,len=data.length;i<len;i++){
    eval(data[i].name+"="+data[i].value+";"); 
  }  
}


EJS.saveState = function(description){
  var defineVars = EJS.data.modelvariables.defineVarsList,
      elementVars = [],
      statusDesc = description,
      username = null;
  
  if ($("#_username").val()) username = $("#_username").val();//gup.(name/user/nickname) 
  
  /* save elements state start */
  for(var i=0,len=EJS.data.circleArray.length;i<len;i++){
    if(EJS.data.circleArray[i].attr("id")!=null){
      var obj = EJS.data.circleArray[i],
          d3Obj = d3.selectAll("#"+obj.attr("id")+ " ."+obj.attr("type")),
          elements = [],
          savePropertList = null; 
          savePropertList = EJS.data.getPropertList(obj);
      
      for(var j=0,saveLen=savePropertList.length;j<saveLen;j++){      
        elements.push({'name':savePropertList[j],'value':d3Obj.attr(savePropertList[j])});
      }   
      elementVars.push({'type':obj.attr("type"),'id':obj.attr("id"),property:elements});
    }
    
  }
  /* save elements state end */
    
  if(username){
    saveJson  = {       
      'parentFile': EJS.gup('name'),    
      'user': username,
      'defineVars': defineVars,
      'Elements': elementVars,
      'statusDesc': statusDesc
    }
    //console.log(saveJson);
    this.saveEJSstatus(saveJson);
    //$("#STATUS_DESC").val("");
  }else{
    console.log("no login");
    alert("請先登入");
  }
        
}

/* 
 * Description: 
 * 載入EJS Model的變數內容
 * Load EJS Model Variables Page 
 * 
 * 
 */
EJS.loadVarData = function(data){
  
  var tmp_tr = '',
      tmpId = '',
      page = data.page,
      id = 0,
      varVisiableTxt = "",
      varVisiableFlag = "";
            
  
  
  if((typeof(data.visiable) == "undefined") || (data.visiable == "false")) {    
    varVisiableFlag = false;
  } else{  

    varVisiableFlag = true;
  }

  EJS.data.modelvariables.defineVarsList.push({
    'index':id,
    'name':data.name,
    'value':data.value,
    'inputValue':'"'+data.value+'"',
    'page':page,
    'dimension':data.dimension,
    'comment':data.comment,
    'visiable':varVisiableFlag,
    'format':data.format,
    'unit': data.unit});
  
  //$('#'+page+' > tbody:last').before(tmp_tr);
 
}

EJS.AlertInfo = function(t) {
    alert(t);
     if(window.location.pathname=='/activity/'){
        EJS.socket.showStatus(t);
      };
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

/* EJS customer function start */
EJS.FN.alert = function(txt){
  //EJSINFO
  bootbox.alert(txt, function() {
    //Example.show("Hello world callback");
  });
}
/* EJS customer function end*/



$(function() {
  EJSINFO.init({
    "selector": ".alert-info"
  });
    
  ERROR.init({
    "selector": ".alert-danger"
  });

  MSGSHOW.init({
    "selector": ".alert-info"
  })

});

/**
 * This tiny script just helps us demonstrate
 * what the various EJSINFO callbacks are doing
 */
var EJSINFO = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);
        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(4000).fadeOut();
    };

    return that;
}());


var ERROR = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.fadeIn().delay(4000).fadeOut();
    };

    return that;
}());

var MSGSHOW = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);
        elem.find("span").html(text).append('<div><input class="msgClose closebtn" type="button" value="close"></div>');
        elem.delay(200).fadeIn()//.delay(4000).fadeOut();
    };

    return that;
}());


function _E_(val){
  //console.log(val);
  try{
      return new Function('return '+ val)(); 
  }catch(e){      
      //EJSINFO.show(v);      
      console.log(val);
      return val;
  }
  
}



var __FORMER = console.log;
console.error = function(msg){
  __FORMER.apply(console, arguments);
    //$("#debug2").html("<div>" + msg + "</div>");
    ERROR.show(msg);
}

window.onerror = function(message, url, linenumber) {
    //console.log("JavaScript error: " + message + " on line " + linenumber + " for " + url);
    console.error("Error: " + message);
}



function checkButtonStatus(){

  if(EJS.data.autostart==1){    
    $("#demo_play").hide();
    $("#demo_pause").show();
  }else{
    $("#demo_play").show();  
    $("#demo_pause").hide();
  }
}

function _play(){  
  EJS.data.playState = 1; 
  try{
    EJS.rk4.demo_start();
  }catch(e){
    console.log('demo start failed');
  }
  checkButtonStatus();
  
}



function _start(){
  EJS.data.autostart = 1;
  checkButtonStatus();
}

function _reset(){  
  
  
  for(var i=0;i<EJS.data.events.length;i++){
      EJS.rk4.prevShmIdx[i] = 0;
      EJS.data.events[i].eventFlag = 1;
      EJS.rk4.events[i] = {n:1,m:0,k:1,make0shm:[],make1shm:[]};
  }  

  for(var i=0,len=EJS.object.array.length;i<len;i++){
    var o = EJS.object.array[i];
    
    if(o.type=="twoStateButton"){
      console.log(o.type);
      var uobj = EJS.utilities;
      $("#"+o.id).html(uobj.eval(o['on_text']));
    }
  }
  
  

  //checkbox unchecked
  $("#framecontentTop input[type=checkbox]").prop("checked",false);  
  $("#showVar").find("input[type=checkbox]").prop("checked",true);
  $("#selectAll").attr('value', "uncheck");
  $("#selectAll").removeClass().attr("class", "glyphicon glyphicon-check pull-right");


  //EJS.rk4.prevShmIdx = 0;
  EJS.data.playState = 0;
  EJS.rk4.time = 0;
  // console.log("time",EJS.rk4.time);
  EJS.rk4._EJS_PAUSE = false;
    
  ($("#model_autostart").prop("checked")) ? EJS.data.autostart = 1 : EJS.data.autostart =0; 

  EJS.rk4.demo_stop();
  //EJS.rk4.demo_start();
  _play();    
  checkButtonStatus();
  $("input[id^=slider]").prop("disabled",false);
  EJS.rk4.time = 0;
  EJS.rk4.updateDefineVar();
  //EJS.showVariable();
  EJS.resetSliders();
  EJS.setSegmentSetAll();
  
  if(EJS.VERSION==EJS.CHKVER){
    var elms = EJS.data.Elements;
    for(var elm in elms){      
      var _o = elms[elm];            
      if(_o.type=='trace' || _o.type=='trail'){                  
        d3.selectAll("#"+_o.id +" .trace").remove();
        EJS.svg.tracker[_o.id].index = 0;
        EJS.View.createTrace(_o.id,_o,'reset');      
      }      
    }

    
    
  }else{
    for(var elm in EJS.data.Elements){
      
      var _o = EJS.data.Elements[elm];
      
        if(_o.type=='trace' || _o.type=='trail'){
          var _id = _o.id,
              tmpVal = {};
          if(typeof(_o.property)!=="undefined"){    

            for(var j=0,len = _o.property.length;j<len;j++){
              var oId = _o.property[j].name,
                  oVal = _o.property[j].value;
                  tmpVal[oId] = oVal;   
            }          
            d3.selectAll("#"+_id).remove();
            EJS.svg.tracker[_id].index = 0;
            EJS.View.createTrace(_id,tmpVal,'reset');
          }
          

      }
      
    }
  }


  
  var _old_alert = window.alert;
  window.alert = function() {_old_alert.apply(window,arguments)};
  //clearInterval(EJS.recData.autoRecTimer);    
  // EJS.recData.autoRecTimer = -1;
  //EJS.rk4._EJS_PAUSE = false;
};

$(document).on("click", ".msgClose", function(){
  EJS.alertClose();
});


/* jQuery emitter test */
(function(jQuery) {
 
  jQuery.eventEmitter = {
    _JQInit: function() {
      this._JQ = jQuery(this);
    },
    emit: function(evt, data) {
      !this._JQ && this._JQInit();
      this._JQ.trigger(evt, data);
    },
    once: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.one(evt, handler);
    },
    on: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.bind(evt, handler);
    },
    off: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.unbind(evt, handler);
    }
  };
 
}(jQuery));

function ALERT(text,fn) {
  var option = {
    text:'',
    firewroks: false,
    audio: false,
    audioUrl: '/uploads/fireworks.wav'
  }

  if(typeof(text)=="string"){
    option.text = text;
  }else{
    option.text = text.text || "";
    option.fireworks = text.fireworks || false;
    option.audio = text.audio || false;
    option.audioUrl = text.audioUrl || '/uploads/fireworks.wav';
  }

  $(".msgContent").html(option.text);
  if(option.fireworks) $(".firework").show();
  $(".EJSAlert").show();
  EJS.rk4.demo_pause();  
  if(option.audioUrl) $("#alertAudio")[0].src = option.audioUrl;
  if(option.audio) $("#alertAudio")[0].play();
  this.callback = fn;
}
 
jQuery.extend(ALERT.prototype, jQuery.eventEmitter);

var myApp,myAppFlag = false;

EJS.alertClose = function(){
  $(".EJSAlert").hide();
  $(".firework").hide();
  $("#alertAudio")[0].pause();
  $("#alertAudio")[0].currentTime = 0;
  myApp.emit('closeMsg');
  myApp = null;
}

EJS.alert = function(showContent, callback){

  if(myApp) return;
  myApp = new ALERT(showContent, callback);

  myApp.on('closeMsg', function() {  
    EJS.rk4.demo_pause();
    (this.callback && typeof(this.callback) === "function") && this.callback();
  });

}

function _pause(){
  // console.log("_pause()");
  EJS.data.playState = 2; 
  //EJS.rk4._EJS_PAUSE = false;
  
  
  EJS.rk4.demo_pause();
  _EJS_FIXEDRELATIONS();
  reDraw(); 
}  

function _EJS_SET_FPS(fps){  
  EJS.rk4.interval = 1000/fps;
  clearInterval(EJS.rk4.timer);
  EJS.rk4.timer=setInterval(EJS.rk4.update,EJS.rk4.interval);
}

function parseSentenceForNumber(sentence){
    var matches = sentence.replace(/,/g, '').match(/(\+|-)?((\d+(\.\d+)?)|(\.\d+))/);
    return matches && matches[0] || null;
}

var _EJS_chartValInit = function(myVar,qu){  
  qu.shift();
  qu.push(myVar);
  return qu; 
}


EJS.flipCard= function(obj,faceTo){
  //console.log(obj);
  if(faceTo=='bottom'){
    $(obj).children('.front').hide();
    $(obj).children('.back').show();
  }else{
    $(obj).find('.front').show();
    $(obj).find('.back').hide();    
  }
};

function isInArray(value, array){
  return array.indexOf(value) > -1;
}

EJS.setSegmentSet = function(id){
//  $EJS.View.createSegmentSet("${o.id}",EJS.object.array[${i}],true)
var obj = _(EJS.object.array).find(function(o) {
  if(typeof(o)!="undefined") return o.id == id;        
});

EJS.View.createSegmentSet(obj.id,obj,true);

}

EJS.setSegmentSetAll = function(){
  
  var obj = EJS.object.array
  for(var key in obj){
    var o = obj[key];
    if(o.type=="segmentSet"){
      EJS.View.createSegmentSet(o.id,o,true);
    }
  }
  
  
}

EJS.MOE = function(){
    var url = "http://140.115.197.16/?school=ncu&app=tw.cosci.refraction"

    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function (data) {
        console.log(data)        
      }
    });
}

