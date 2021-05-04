var t = 0,dt = 0.05,FPS = 20,mode = 0,n1 = 1,n2 = 1.333,xe1 = 200,ye1 = 200,xe2 = 150,ye2 = 200,xf = -125,yf = -300,n21s = n2*n2-n1*n1,lxe1 = xe1-xf,de1 = 150,dde1 = 0,fxe1 = 0,fxe11 = 0,xd1 = xe1-de1,lxe2 = xe2-xf,de2 = 150,dde2 = 0,fxe2 = 0,fxe22 = 0,xd2 = xe2-de2,sxe1 = 0,b = 0,sxe2 = 0,d = 0,xm = 0,ym = 0,vxf = 0,xn = 250,yn = 100,num = 7,xfn = new Array(num),yfn = new Array(num),lxe1n = new Array(num),de1n = new Array(num),dde1n = new Array(num),fxe1n = new Array(num),fxe11n = new Array(num),xd1n = new Array(num),lxe2n = new Array(num),de2n = new Array(num),dde2n = new Array(num),fxe2n = new Array(num),fxe22n = new Array(num),xd2n = new Array(num),sxe1n = new Array(num),bn = new Array(num),sxe2n = new Array(num),dn = new Array(num),xmn = new Array(num),ymn = new Array(num),vxfn = 0,ad1 = 0,sizea = 122,sizeb = 0,sizec = 0,colorf = "none",stext1 = 60,sized = 30,cgs = 255-Math.round((n2-1)*110),colorS = `rgba(0,${cgs},255,0.4)`,_EJS_PLOTTING = [];
function _EJS_VARINIT(){
t = 0,dt = 0.05,FPS = 20,mode = 0,n1 = 1,n2 = 1.333,xe1 = 200,ye1 = 200,xe2 = 150,ye2 = 200,xf = -125,yf = -300,n21s = n2*n2-n1*n1,lxe1 = xe1-xf,de1 = 150,dde1 = 0,fxe1 = 0,fxe11 = 0,xd1 = xe1-de1,lxe2 = xe2-xf,de2 = 150,dde2 = 0,fxe2 = 0,fxe22 = 0,xd2 = xe2-de2,sxe1 = 0,b = 0,sxe2 = 0,d = 0,xm = 0,ym = 0,vxf = 0,xn = 250,yn = 100,num = 7,xfn = new Array(num),yfn = new Array(num),lxe1n = new Array(num),de1n = new Array(num),dde1n = new Array(num),fxe1n = new Array(num),fxe11n = new Array(num),xd1n = new Array(num),lxe2n = new Array(num),de2n = new Array(num),dde2n = new Array(num),fxe2n = new Array(num),fxe22n = new Array(num),xd2n = new Array(num),sxe1n = new Array(num),bn = new Array(num),sxe2n = new Array(num),dn = new Array(num),xmn = new Array(num),ymn = new Array(num),vxfn = 0,ad1 = 0,sizea = 122,sizeb = 0,sizec = 0,colorf = "none",stext1 = 60,sized = 30,cgs = 255-Math.round((n2-1)*110),colorS = `rgba(0,${cgs},255,0.4)`,_EJS_PLOTTING = [];for(var _i=0;_i<num;_i++){
 xfn[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 yfn[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 lxe1n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 de1n[_i]=150;
 }
for(var _i=0;_i<num;_i++){
 dde1n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 fxe1n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 fxe11n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 xd1n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 lxe2n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 de2n[_i]=150;
 }
for(var _i=0;_i<num;_i++){
 dde2n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 fxe2n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 fxe22n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 xd2n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 sxe1n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 bn[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 sxe2n[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 dn[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 xmn[_i]=0;
 }
for(var _i=0;_i<num;_i++){
 ymn[_i]=0;
 }
EJS.rk4.h = dt;
EJS.rk4.interval = (1000/20);

}
function _EJS_EVOLUTION_INIT(){
var _y=[];
var len=0;
_y[len] = xf;

len=_y.length;
for(var i=0;i< xfn.length;i++){
_y[i+len] = xfn[i];
}
len=_y.length;
return _y;

}
function _EJS_PERLIMCODE(){

}
function _EJS_DERIVS(_x,_y){
  var dydx = [], 
    _v = EJS.rk4.defineVarsList,
    _state2=0,_state=0;
_v[10].value = _y[_state];_state++;for(var i=0;i<xfn.length;i++){
xfn[i] = _y[_state];
_v[35].value[i] = _y[_state];
_state++;
}
EJS.rk4.myEvalVar();dydx[_state2] = vxf;_state2++;for(var i=0;i<xfn.length;i++){
dydx[_state2] = vxfn;
_state2++;
}
return dydx
;}
function _EJS_EVOLUTATION(){
var _state=0;
EJS.rk4.shm[_state] = xf;
_state++;
for(var i=0;i<xfn.length;i++){
EJS.rk4.shm[_state] = xfn[i];
_state++;
}

}
function _EJS_SHM2VAR(){
var _state=0;
xf = EJS.rk4.shm[_state];
_state++;
for(var i=0;i<xfn.length;i++){
xfn[i] = EJS.rk4.shm[_state]; 
_state++;
}

}
function _EJS_EVOLUTION_EVENT_0(){
 if(_USER_ZERO_CONDITION_0() < 0.001){ _USER_EVENT_ACTION_0();}
}
function _USER_EVENT_ACTION_0(){
vxf=-vxf;
vxfn=-vxfn;
xfn[0]=xf+100;
yfn[0]=yf;
xfn[1]=xf+50;
yfn[1]=yf+40;
xfn[2]=xf+50;
yfn[2]=yf-40;
xfn[3]=xf-75;
yfn[3]=yf;
xfn[4]=xf-110;
yfn[4]=yf-22;
xfn[5]=xf-110;
yfn[5]=yf+22;
xfn[6]=xf+75;
yfn[6]=yf;}
function _USER_ZERO_CONDITION_0(){
 return (xf+300);}
$("#controllerPanel").on("click","input[type='range']", function(){(EJS.gup("gn")) ? EJS.updateActivityVar() : EJS.showVariable();});function _EJS_EVOLUTION_EVENT_1(){
 if(_USER_ZERO_CONDITION_1() < 0.001){ _USER_EVENT_ACTION_1();}
}
function _USER_EVENT_ACTION_1(){
vxf=-vxf;
vxfn=-vxfn;
xfn[0]=xf-100;
yfn[0]=yf;
xfn[1]=xf-50;
yfn[1]=yf+40;
xfn[2]=xf-50;
yfn[2]=yf-40;
xfn[3]=xf+75;
yfn[3]=yf;
xfn[4]=xf+110;
yfn[4]=yf-22;
xfn[5]=xf+110;
yfn[5]=yf+22;
xfn[6]=xf-75;
yfn[6]=yf;}
function _USER_ZERO_CONDITION_1(){
 return -(xf-300);}
$("#controllerPanel").on("click","input[type='range']", function(){(EJS.gup("gn")) ? EJS.updateActivityVar() : EJS.showVariable();});function _EJS_FIXEDRELATIONS(){
t = EJS.rk4.time * dt;lxe1=xe1-xf;
lxe2=xe2-xf;
 for (var i=0;i<10;i++){
      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;
      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;
      dde1=de1-fxe1/fxe11;
      de1=dde1;
     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;
     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;
     dde2=de2-fxe2/fxe22;
      de2=dde2;
   }
xd1=xe1-de1;
xd2=xe2-de2;
sxe1=ye1/(xe1-xd1);
b=-ye1*xd1/(xe1-xd1);
sxe2=ye2/(xe2-xd2);
d=-ye2*xd2/(xe2-xd2);
xm=(d-b)/(sxe1-sxe2);
ym=(sxe1*d-sxe2*b)/(sxe1-sxe2);

for (var j=0;j<num;j++){
     lxe1n[j]=xe1-xfn[j];
     lxe2n[j]=xe2-xfn[j];
     for (var i=0;i<10;i++){
      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];
      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];
      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];
      de1n[j]=dde1n[j];
      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];
     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];
     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];
     de2n[j]=dde2n[j];
     }
xd1n[j]=xe1-de1n[j];
xd2n[j]=xe2-de2n[j];
sxe1n[j]=ye1/(xe1-xd1n[j]);
bn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);
sxe2n[j]=ye2/(xe2-xd2n[j]);
dn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);
xmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);
ymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);
}
 _EJS_EVOLUTATION(); 
}
//CUSTOMER FUNCTION 

$("#controllerPanel").on("click","#button-0",function(){     $(this).val("該捕哪裡?");_reset();
mode=0;
vxf=0;
vxfn=0;
ad1=0;
stext1=60;
colorf="none";
sized=30;

lxe1=xe1-xf;
lxe2=xe2-xf;
 for (var i=0;i<10;i++){
      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;
      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;
      dde1=de1-fxe1/fxe11;
      de1=dde1;
     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;
     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;
     dde2=de2-fxe2/fxe22;
      de2=dde2;
   }
xd1=xe1-de1;
xd2=xe2-de2;
sxe1=ye1/(xe1-xd1);
b=-ye1*xd1/(xe1-xd1);
sxe2=ye2/(xe2-xd2);
d=-ye2*xd2/(xe2-xd2);
xm=(d-b)/(sxe1-sxe2);
ym=(sxe1*d-sxe2*b)/(sxe1-sxe2);

for (var j=0;j<num;j++){
     lxe1n[j]=xe1-xfn[j];
     lxe2n[j]=xe2-xfn[j];
     for (var i=0;i<10;i++){
      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];
      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];
      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];
      de1n[j]=dde1n[j];
      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];
     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];
     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];
      de2n[j]=dde2n[j];
     }
xd1n[j]=xe1-de1n[j];
xd2n[j]=xe2-de2n[j];
sxe1n[j]=ye1/(xe1-xd1n[j]);
bn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);
sxe2n[j]=ye2/(xe2-xd2n[j]);
dn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);
xmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);
ymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);
};EJS.rk4.updateDefineVar();EJS.showVariable();});$("#controllerPanel").on("click","#button-1",function(){     $(this).val("游來游去");_reset();
mode=1;
vxf=-50;
vxfn=-50;
ad1=5;
colorf=`rgba(255,140,0,1)`;
stext1=0;
sized=0;

lxe1=xe1-xf;
lxe2=xe2-xf;
 for (var i=0;i<8;i++){
      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;
      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;
      dde1=de1-fxe1/fxe11;
      de1=dde1;
     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;
     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;
     dde2=de2-fxe2/fxe22;
      de2=dde2;
   }
xd1=xe1-de1;
xd2=xe2-de2;
sxe1=ye1/(xe1-xd1);
b=-ye1*xd1/(xe1-xd1);
sxe2=ye2/(xe2-xd2);
d=-ye2*xd2/(xe2-xd2);
xm=(d-b)/(sxe1-sxe2);
ym=(sxe1*d-sxe2*b)/(sxe1-sxe2);

for (var j=0;j<num;j++){
     lxe1n[j]=xe1-xfn[j];
     lxe2n[j]=xe2-xfn[j];
     for (var i=0;i<10;i++){
      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];
      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];
      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];
      de1n[j]=dde1n[j];
      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];
     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];
     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];
      de2n[j]=dde2n[j];
     }
xd1n[j]=xe1-de1n[j];
xd2n[j]=xe2-de2n[j];
sxe1n[j]=ye1/(xe1-xd1n[j]);
bn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);
sxe2n[j]=ye2/(xe2-xd2n[j]);
dn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);
xmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);
ymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);
};EJS.rk4.updateDefineVar();EJS.showVariable();});var slider_2 = function(){ n21s=n2*n2-n1*n1;
if (n2==1){
    colorS="#f1f1f1";
} else {
cgs=255-Math.round((n2-1)*110);
colorS=`rgba(0,${cgs},255,0.4)`;
}
for (var i=0;i<10;i++){
      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;
      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;
      dde1=de1-fxe1/fxe11;
      de1=dde1;
     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;
     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;
     dde2=de2-fxe2/fxe22;
      de2=dde2;
   }
xd1=xe1-de1;
xd2=xe2-de2;
sxe1=ye1/(xe1-xd1);
b=-ye1*xd1/(xe1-xd1);
sxe2=ye2/(xe2-xd2);
d=-ye2*xd2/(xe2-xd2);
xm=(d-b)/(sxe1-sxe2);
ym=(sxe1*d-sxe2*b)/(sxe1-sxe2);
xfn[0]=xf-100;
yfn[0]=yf;
xfn[1]=xf-50;
yfn[1]=yf+40;
xfn[2]=xf-50;
yfn[2]=yf-40;
xfn[3]=xf+75;
yfn[3]=yf;
xfn[4]=xf+110;
yfn[4]=yf-22;
xfn[5]=xf+110;
yfn[5]=yf+22;
xfn[6]=xf-75;
yfn[6]=yf;

for (var j=0;j<num;j++){
     lxe1n[j]=xe1-xfn[j];
     lxe2n[j]=xe2-xfn[j];
     for (var i=0;i<10;i++){
      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];
      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];
      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];
      de1n[j]=dde1n[j];
      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];
     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];
     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];
      de2n[j]=dde2n[j];
     }
xd1n[j]=xe1-de1n[j];
xd2n[j]=xe2-de2n[j];
sxe1n[j]=ye1/(xe1-xd1n[j]);
bn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);
sxe2n[j]=ye2/(xe2-xd2n[j]);
dn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);
xmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);
ymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);
}
}
$("#controllerPanel").on("click", "#slider-2", function(){ 
 EJS.View.printValue("slider-2","2");
slider_2();
EJS.rk4.updateDefineVar();

EJS.showVariable();

});
$("#controllerPanel").on("keyup change blur", "#slider-2-input", function(e){ 
 var flag = (e.type == "focusout" || e.type =="change") ? true : false;var val = $(this).val();  
 EJS.View.printValue("slider-2","2",val,flag);
slider_2();
EJS.rk4.updateDefineVar();

EJS.showVariable();

});

function reDraw(){
d3.select("#circle-0").attr("transform","translate("+(0)+","+(-200)+") rotate("+(EJS.utilities.deg2rad(0))+")").select("#circle-0 .circle").attr("rx",(800)/2).attr("ry",(400)/2).attr("cx",0).attr("cy",0).style("fill",colorS);d3.select("#circle-0").select("#circle-0 .rect").attr("x",0-(800)/2).attr("y",0-(400)/2).attr("width",(800)).attr("height",(400)).style("fill",colorS);d3.selectAll("#image-9").attr("transform","translate("+(200)+","+(200)+") rotate("+EJS.utilities.deg2rad(0)+")");
                   d3.selectAll("#image-9 .image").attr("width", 45).attr("height", 45).attr("transform", "translate("+(parseFloat(45)/2)*-1+","+parseFloat(45)/2+") scale(1,-1)");d3.selectAll("#image-10").attr("transform","translate("+(150)+","+(200)+") rotate("+EJS.utilities.deg2rad(0)+")");
                   d3.selectAll("#image-10 .image").attr("width", 45).attr("height", 45).attr("transform", "translate("+(parseFloat(45)/2)*-1+","+parseFloat(45)/2+") scale(1,-1)");d3.selectAll("#polygon-11 .polygon").attr("points",function(){
                    var str = "",
                        pX=[xfn[2],xfn[0],xfn[1],xfn[3],xfn[4],xfn[5],xfn[3],xfn[2],xfn[1]],
                        pY=[yfn[2],yfn[0],yfn[1],yfn[3],yfn[4],yfn[5],yfn[3],yfn[2],yfn[1]];

                    for(var i=0,len=pX.length;i<len;i++){
                      if(str!="") str += ",";
                      if(typeof(pY[i])=="undefined") pY[i] = 0;
                      str += pX[i] + " " + pY[i];    
                    }    
                    return str; 
                  })
                  .style("fill", colorf)
                  .attr("stroke", "#800000")
                  .attr("stroke-width", ad1);d3.selectAll("#polygon-13 .polyline").attr("points",function(){
                    var str = "",
                        pX=[xmn[2],xmn[0],xmn[1],xmn[3],xmn[4],xmn[5],xmn[3],xmn[2],xmn[1]],
                        pY=[ymn[2],ymn[0],ymn[1],ymn[3],ymn[4],ymn[5],ymn[3],ymn[2],ymn[1]];

                    for(var i=0,len=pX.length;i<len;i++){
                      if(str!="") str += ",";
                      if(typeof(pY[i])=="undefined") pY[i] = 0;
                      str += pX[i] + " " + pY[i];    
                    }    
                    return str; 
                  })
                  .style("fill", "#ff9b6a")
                  .attr("stroke", "#ff0000")
                  .attr("stroke-width", 5);d3.select("#line-4")
                  .attr("transform","translate("+(xe1)+","+(ye1)+")")
                  .select("#line-4 .line")
                  .attr("x1",0)
                  .attr("y1",0)
                  .attr("x2",(-de1))
                  .attr("y2",(-ye1))
                  .style("stroke", "#808080")
                  .style("stroke-width",ad1);d3.select("#line-5")
                  .attr("transform","translate("+(xe2)+","+(ye2)+")")
                  .select("#line-5 .line")
                  .attr("x1",0)
                  .attr("y1",0)
                  .attr("x2",(-de2))
                  .attr("y2",(-ye2))
                  .style("stroke", "#808080")
                  .style("stroke-width",ad1);d3.select("#line-6")
                  .attr("transform","translate("+(xf)+","+(yf)+")")
                  .select("#line-6 .line")
                  .attr("x1",0)
                  .attr("y1",0)
                  .attr("x2",(lxe1-de1))
                  .attr("y2",(-yf))
                  .style("stroke", "#808080")
                  .style("stroke-width",ad1);d3.select("#line-7")
                  .attr("transform","translate("+(xf)+","+(yf)+")")
                  .select("#line-7 .line")
                  .attr("x1",0)
                  .attr("y1",0)
                  .attr("x2",((lxe2-de2)))
                  .attr("y2",(-yf))
                  .style("stroke", "#808080")
                  .style("stroke-width",ad1);d3.select("#line-9")
                  .attr("transform","translate("+(xm)+","+(ym)+")")
                  .select("#line-9 .line")
                  .attr("x1",0)
                  .attr("y1",0)
                  .attr("x2",(xd1-xm))
                  .attr("y2",(-ym))
                  .style("stroke", "#8000ff")
                  .style("stroke-width",ad1);d3.select("#line-10")
                  .attr("transform","translate("+(xm)+","+(ym)+")")
                  .select("#line-10 .line")
                  .attr("x1",0)
                  .attr("y1",0)
                  .attr("x2",(xd2-xm))
                  .attr("y2",(-ym))
                  .style("stroke", "#8000ff")
                  .style("stroke-width",ad1);d3.select("#circle-12").attr("transform","translate("+(xfn[6])+","+(yfn[6])+") rotate("+(EJS.utilities.deg2rad(0))+")").select("#circle-12 .circle").attr("rx",(ad1*2)/2).attr("ry",(ad1*2)/2).attr("cx",0).attr("cy",0).style("fill","#800000");d3.select("#circle-12").select("#circle-12 .rect").attr("x",0-(ad1*2)/2).attr("y",0-(ad1*2)/2).attr("width",(ad1*2)).attr("height",(ad1*2)).style("fill","#800000");d3.select("#circle-14").attr("transform","translate("+(xmn[6])+","+(ymn[6])+") rotate("+(EJS.utilities.deg2rad(0))+")").select("#circle-14 .circle").attr("rx",(10)/2).attr("ry",(10)/2).attr("cx",0).attr("cy",0).style("fill","#ff0000");d3.select("#circle-14").select("#circle-14 .rect").attr("x",0-(10)/2).attr("y",0-(10)/2).attr("width",(10)).attr("height",(10)).style("fill","#ff0000");d3.select("#text-18").attr("transform","translate("+(-50)+","+(-80)+") rotate("+EJS.utilities.deg2rad(0)+")").select("#text-18 .text").attr("x",0).attr("y",0).text("A").style("fill","#0000ff").style("font-size",stext1);d3.select("#text-19").attr("transform","translate("+(xm-10)+","+(ym-25)+") rotate("+EJS.utilities.deg2rad(0)+")").select("#text-19 .text").attr("x",0).attr("y",0).text("B").style("fill","#0000ff").style("font-size",stext1);d3.select("#text-20").attr("transform","translate("+(xf-30)+","+(yf-20)+") rotate("+EJS.utilities.deg2rad(0)+")").select("#text-20 .text").attr("x",0).attr("y",0).text("C").style("fill","#0000ff").style("font-size",stext1);d3.selectAll("#image-21").attr("transform","translate("+(xn+20)+","+(yn)+") rotate("+EJS.utilities.deg2rad(0)+")");
                   d3.selectAll("#image-21 .image").attr("width", sized*7).attr("height", sized*7).attr("transform", "translate("+(parseFloat(sized*7)/2)*-1+","+parseFloat(sized*7)/2+") scale(1,-1)");d3.select("#circle-21").attr("transform","translate("+(xn)+","+(yn)+") rotate("+(EJS.utilities.deg2rad(0))+")").select("#circle-21 .circle").attr("rx",(sized*5)/2).attr("ry",(sized*5)/2).attr("cx",0).attr("cy",0).style("fill",'rgba(255,255,255,0)');d3.select("#circle-21").select("#circle-21 .rect").attr("x",0-(sized*5)/2).attr("y",0-(sized*5)/2).attr("width",(sized*5)).attr("height",(sized*5)).style("fill",'rgba(255,255,255,0)');d3.select("#text-23").attr("transform","translate("+(-390)+","+(25)+") rotate("+EJS.utilities.deg2rad(0)+")").select("#text-23 .text").attr("x",0).attr("y",0).text("n1=1.000").style("fill","#000000").style("font-size",35);d3.select("#text-24").attr("transform","translate("+(-390)+","+(-50)+") rotate("+EJS.utilities.deg2rad(0)+")").select("#text-24 .text").attr("x",0).attr("y",0).text("n2=").style("fill","#000000").style("font-size",35);d3.select("#text-25").attr("transform","translate("+(-320)+","+(-50)+") rotate("+EJS.utilities.deg2rad(0)+")").select("#text-25 .text").attr("x",0).attr("y",0).text(EJS.utilities.formatFloat(n2,3)).style("fill","#000000").style("font-size",35);
EJS.SVGViewBox({'minimumX':-400,'maximumX':400,'minimumY':-400,'maximumY':400});
}function _EJS_INITIALIZATION(){
      for (var i=0;i<10;i++){
      fxe1=n21s*Math.pow(de1,4)-2*n21s*lxe1*Math.pow(de1,3)+(n21s*lxe1*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*Math.pow(de1,2)-2*n2*n2*ye1*ye1*lxe1*de1+n2*n2*ye1*ye1*lxe1*lxe1;
      fxe11=4*n21s*Math.pow(de1,3)-6*n21s*lxe1*Math.pow(de1,2)+2*(n21s*lxe1+n2*n2*ye1*ye1-n1*n1*yf*yf)*de1-2*n2*n2*ye1*ye1*lxe1;
      dde1=de1-fxe1/fxe11;
      de1=dde1;
     fxe2=n21s*Math.pow(de2,4)-2*n21s*lxe2*Math.pow(de2,3)+(n21s*lxe2*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*Math.pow(de2,2)-2*n2*n2*ye2*ye2*lxe2*de2+n2*n2*ye2*ye2*lxe2*lxe2;
     fxe22=4*n21s*Math.pow(de2,3)-6*n21s*lxe2*Math.pow(de2,2)+2*(n21s*lxe2+n2*n2*ye2*ye2-n1*n1*yf*yf)*de2-2*n2*n2*ye2*ye2*lxe2;
     dde2=de2-fxe2/fxe22;
      de2=dde2;
   }
xd1=xe1-de1;
xd2=xe2-de2;
sxe1=ye1/(xe1-xd1);
b=-ye1*xd1/(xe1-xd1);
sxe2=ye2/(xe2-xd2);
d=-ye2*xd2/(xe2-xd2);
xm=(d-b)/(sxe1-sxe2);
ym=(sxe1*d-sxe2*b)/(sxe1-sxe2);
xfn[0]=xf-100;
yfn[0]=yf;
xfn[1]=xf-50;
yfn[1]=yf+40;
xfn[2]=xf-50;
yfn[2]=yf-40;
xfn[3]=xf+75;
yfn[3]=yf;
xfn[4]=xf+110;
yfn[4]=yf-22;
xfn[5]=xf+110;
yfn[5]=yf+22;
xfn[6]=xf-75;
yfn[6]=yf;

for (var j=0;j<num;j++){
     lxe1n[j]=xe1-xfn[j];
     lxe2n[j]=xe2-xfn[j];
     for (var i=0;i<10;i++){
      fxe1n[j]=n21s*Math.pow(de1n[j],4)-2*n21s*lxe1n[j]*Math.pow(de1n[j],3)+(n21s*lxe1n[j]*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*Math.pow(de1n[j],2)-2*n2*n2*ye1*ye1*lxe1n[j]*de1n[j]+n2*n2*ye1*ye1*lxe1n[j]*lxe1n[j];
      fxe11n[j]=4*n21s*Math.pow(de1n[j],3)-6*n21s*lxe1n[j]*Math.pow(de1n[j],2)+2*(n21s*lxe1n[j]+n2*n2*ye1*ye1-n1*n1*yfn[j]*yfn[j])*de1n[j]-2*n2*n2*ye1*ye1*lxe1n[j];
      dde1n[j]=de1n[j]-fxe1n[j]/fxe11n[j];
      de1n[j]=dde1n[j];
      fxe2n[j]=n21s*Math.pow(de2n[j],4)-2*n21s*lxe2n[j]*Math.pow(de2n[j],3)+(n21s*lxe2n[j]*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*Math.pow(de2n[j],2)-2*n2*n2*ye2*ye2*lxe2n[j]*de2n[j]+n2*n2*ye2*ye2*lxe2n[j]*lxe2n[j];
     fxe22n[j]=4*n21s*Math.pow(de2n[j],3)-6*n21s*lxe2n[j]*Math.pow(de2n[j],2)+2*(n21s*lxe2n[j]+n2*n2*ye2*ye2-n1*n1*yfn[j]*yfn[j])*de2n[j]-2*n2*n2*ye2*ye2*lxe2n[j];
     dde2n[j]=de2n[j]-fxe2n[j]/fxe22n[j];
      de2n[j]=dde2n[j];
     }
xd1n[j]=xe1-de1n[j];
xd2n[j]=xe2-de2n[j];
sxe1n[j]=ye1/(xe1-xd1n[j]);
bn[j]=-ye1*xd1n[j]/(xe1-xd1n[j]);
sxe2n[j]=ye2/(xe2-xd2n[j]);
dn[j]=-ye2*xd2n[j]/(xe2-xd2n[j]);
xmn[j]=(dn[j]-bn[j])/(sxe1n[j]-sxe2n[j]);
ymn[j]=(sxe1n[j]*dn[j]-sxe2n[j]*bn[j])/(sxe1n[j]-sxe2n[j]);
}

    
    EJS.rk4.time=t;
  }
var dragFn = {};
            

            dragFn['circle-0'] = {};
            dragFn['circle-0'].drag = function(){
              
            }
            dragFn['circle-0'].drop = function(){
              
            }
            dragFn['circle-0'].dragStart = function(){
              
            }

            $("#container").on("click","#circle-0",function(){
              console.log('click');              
            }).on("mouseover","#circle-0", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#circle-0", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['trace-14'] = {};
            dragFn['trace-14'].drag = function(){
              
            }
            dragFn['trace-14'].drop = function(){
              
            }
            dragFn['trace-14'].dragStart = function(){
              
            }

            $("#container").on("click","#trace-14",function(){
              console.log('click');              
            }).on("mouseover","#trace-14", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#trace-14", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['trace-15'] = {};
            dragFn['trace-15'].drag = function(){
              
            }
            dragFn['trace-15'].drop = function(){
              
            }
            dragFn['trace-15'].dragStart = function(){
              
            }

            $("#container").on("click","#trace-15",function(){
              console.log('click');              
            }).on("mouseover","#trace-15", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#trace-15", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['image-9'] = {};
            dragFn['image-9'].drag = function(){
              
            }
            dragFn['image-9'].drop = function(){
              
            }
            dragFn['image-9'].dragStart = function(){
              
            }

            $("#container").on("click","#image-9",function(){
              console.log('click');              
            }).on("mouseover","#image-9", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#image-9", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['image-10'] = {};
            dragFn['image-10'].drag = function(){
              
            }
            dragFn['image-10'].drop = function(){
              
            }
            dragFn['image-10'].dragStart = function(){
              
            }

            $("#container").on("click","#image-10",function(){
              console.log('click');              
            }).on("mouseover","#image-10", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#image-10", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['polygon-11'] = {};
            dragFn['polygon-11'].drag = function(){
              
            }
            dragFn['polygon-11'].drop = function(){
              
            }
            dragFn['polygon-11'].dragStart = function(){
              
            }

            $("#container").on("click","#polygon-11",function(){
              console.log('click');              
            }).on("mouseover","#polygon-11", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#polygon-11", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['polygon-13'] = {};
            dragFn['polygon-13'].drag = function(){
              
            }
            dragFn['polygon-13'].drop = function(){
              
            }
            dragFn['polygon-13'].dragStart = function(){
              
            }

            $("#container").on("click","#polygon-13",function(){
              console.log('click');              
            }).on("mouseover","#polygon-13", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#polygon-13", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['line-4'] = {};
            dragFn['line-4'].drag = function(){
              
            }
            dragFn['line-4'].drop = function(){
              
            }
            dragFn['line-4'].dragStart = function(){
              
            }

            $("#container").on("click","#line-4",function(){
              console.log('click');              
            }).on("mouseover","#line-4", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#line-4", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['line-5'] = {};
            dragFn['line-5'].drag = function(){
              
            }
            dragFn['line-5'].drop = function(){
              
            }
            dragFn['line-5'].dragStart = function(){
              
            }

            $("#container").on("click","#line-5",function(){
              console.log('click');              
            }).on("mouseover","#line-5", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#line-5", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['line-6'] = {};
            dragFn['line-6'].drag = function(){
              
            }
            dragFn['line-6'].drop = function(){
              
            }
            dragFn['line-6'].dragStart = function(){
              
            }

            $("#container").on("click","#line-6",function(){
              console.log('click');              
            }).on("mouseover","#line-6", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#line-6", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['line-7'] = {};
            dragFn['line-7'].drag = function(){
              
            }
            dragFn['line-7'].drop = function(){
              
            }
            dragFn['line-7'].dragStart = function(){
              
            }

            $("#container").on("click","#line-7",function(){
              console.log('click');              
            }).on("mouseover","#line-7", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#line-7", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['line-9'] = {};
            dragFn['line-9'].drag = function(){
              
            }
            dragFn['line-9'].drop = function(){
              
            }
            dragFn['line-9'].dragStart = function(){
              
            }

            $("#container").on("click","#line-9",function(){
              console.log('click');              
            }).on("mouseover","#line-9", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#line-9", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['line-10'] = {};
            dragFn['line-10'].drag = function(){
              
            }
            dragFn['line-10'].drop = function(){
              
            }
            dragFn['line-10'].dragStart = function(){
              
            }

            $("#container").on("click","#line-10",function(){
              console.log('click');              
            }).on("mouseover","#line-10", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#line-10", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['circle-12'] = {};
            dragFn['circle-12'].drag = function(){
              
            }
            dragFn['circle-12'].drop = function(){
              
            }
            dragFn['circle-12'].dragStart = function(){
              
            }

            $("#container").on("click","#circle-12",function(){
              console.log('click');              
            }).on("mouseover","#circle-12", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#circle-12", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['circle-14'] = {};
            dragFn['circle-14'].drag = function(){
              
            }
            dragFn['circle-14'].drop = function(){
              
            }
            dragFn['circle-14'].dragStart = function(){
              
            }

            $("#container").on("click","#circle-14",function(){
              console.log('click');              
            }).on("mouseover","#circle-14", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#circle-14", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['button-0'] = {};
            dragFn['button-0'].drag = function(){
              
            }
            dragFn['button-0'].drop = function(){
              
            }
            dragFn['button-0'].dragStart = function(){
              
            }

            $("#container").on("click","#button-0",function(){
              console.log('click');              
            }).on("mouseover","#button-0", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#button-0", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['button-1'] = {};
            dragFn['button-1'].drag = function(){
              
            }
            dragFn['button-1'].drop = function(){
              
            }
            dragFn['button-1'].dragStart = function(){
              
            }

            $("#container").on("click","#button-1",function(){
              console.log('click');              
            }).on("mouseover","#button-1", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#button-1", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['text-18'] = {};
            dragFn['text-18'].drag = function(){
              
            }
            dragFn['text-18'].drop = function(){
              
            }
            dragFn['text-18'].dragStart = function(){
              
            }

            $("#container").on("click","#text-18",function(){
              console.log('click');              
            }).on("mouseover","#text-18", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#text-18", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['text-19'] = {};
            dragFn['text-19'].drag = function(){
              
            }
            dragFn['text-19'].drop = function(){
              
            }
            dragFn['text-19'].dragStart = function(){
              
            }

            $("#container").on("click","#text-19",function(){
              console.log('click');              
            }).on("mouseover","#text-19", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#text-19", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['text-20'] = {};
            dragFn['text-20'].drag = function(){
              
            }
            dragFn['text-20'].drop = function(){
              
            }
            dragFn['text-20'].dragStart = function(){
              
            }

            $("#container").on("click","#text-20",function(){
              console.log('click');              
            }).on("mouseover","#text-20", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#text-20", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['image-21'] = {};
            dragFn['image-21'].drag = function(){
              
            }
            dragFn['image-21'].drop = function(){
              
            }
            dragFn['image-21'].dragStart = function(){
              
            }

            $("#container").on("click","#image-21",function(){
              console.log('click');              
            }).on("mouseover","#image-21", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#image-21", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['circle-21'] = {};
            dragFn['circle-21'].drag = function(){
              
            }
            dragFn['circle-21'].drop = function(){

              if (mode==0){
    if (Math.abs(xn-xf)<30 && Math.abs(yn-yf)<30) {
    ad1=5;
    colorf=`rgba(255,140,0,1)`;
   EJS.alert("捕到魚了");
    stext1=0;
    sized=0;
    } else {
    ad1=0;
    colorf="none";
    stext1=60;
    EJS.alert("猜錯了，再試一次");
    }
}
            }
            dragFn['circle-21'].dragStart = function(){
              
            }

            $("#container").on("click","#circle-21",function(){
              console.log('click');              
            }).on("mouseover","#circle-21", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#circle-21", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['slider-2'] = {};
            dragFn['slider-2'].drag = function(){
              
            }
            dragFn['slider-2'].drop = function(){
              
            }
            dragFn['slider-2'].dragStart = function(){
              
            }

            $("#container").on("click","#slider-2",function(){
              console.log('click');              
            }).on("mouseover","#slider-2", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#slider-2", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['text-23'] = {};
            dragFn['text-23'].drag = function(){
              
            }
            dragFn['text-23'].drop = function(){
              
            }
            dragFn['text-23'].dragStart = function(){
              
            }

            $("#container").on("click","#text-23",function(){
              console.log('click');              
            }).on("mouseover","#text-23", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#text-23", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['text-24'] = {};
            dragFn['text-24'].drag = function(){
              
            }
            dragFn['text-24'].drop = function(){
              
            }
            dragFn['text-24'].dragStart = function(){
              
            }

            $("#container").on("click","#text-24",function(){
              console.log('click');              
            }).on("mouseover","#text-24", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#text-24", function(){
              console.log("mouseout");
              
            });
          
            

            dragFn['text-25'] = {};
            dragFn['text-25'].drag = function(){
              
            }
            dragFn['text-25'].drop = function(){
              
            }
            dragFn['text-25'].dragStart = function(){
              
            }

            $("#container").on("click","#text-25",function(){
              console.log('click');              
            }).on("mouseover","#text-25", function(){	
              console.log("mouseover");
              
            }).on("mouseout","#text-25", function(){
              console.log("mouseout");
              
            });
          