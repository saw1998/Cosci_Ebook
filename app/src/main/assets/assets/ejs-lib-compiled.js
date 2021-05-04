var EJS = EJS || {};

EJS.namespace = function (ns_string) {
  var parts = ns_string.split('.'),
      parent = EJS,
      i;

  //去除掉最前頭多餘的全域名稱
  if (parts[0] === "EJS") {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    //如果屬性不存在則建立
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};

EJS.gup = function (parameter) {
  parameter = parameter.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + parameter + "=([^&#]*)",
      regex = new RegExp(regexS),
      results = regex.exec(window.location.href);

  if (results == null) {
    return "";
  } else {
    return results[1];
  }
};

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

(function () {
  var uobj = EJS.utilities,
      oobj = EJS.object,
      dobj = EJS.data,
      tobj = EJS.template,
      defColor = '"#0000ff"';

  dobj.CATEGORY = []; //_EJS_CATEGORY
  dobj.KEYWORDS = []; //_EJS_KEYWORDS
  //template obj
  tobj.variableTitle = `
        <tr>
          <th><span lang="en">Variable</span></th>
          <th><span lang="en">Initial value</span></th>
          <th><span lang="en">Type</span></th>
          <th><span lang="en">Dimension</span></th>
          <th><span lang="en">Comments</span></th>
          <th><span lang="en">Unit</span></th>
          <th></th>
          <th><span lang="en">Decimal digits</span></th>
        </tr>`;

  //EJS Object start
  oobj.array = [];

  oobj.circle = {
    "cx": 0, "cy": 0, "rx": 30, "ry": 30, "sizeX": "30", "sizeY": "30", "posX": 0, "posY": 0, "fillColor": defColor,
    "lineColor": "", "lineWidth": "1.5", "transform": "translate(0,0)", "circleStyle": "", "ejsRotate": "0",
    "draggable": "" };

  oobj.arrow = { "x1": 10, "y1": 50, "x2": 50, "y2": 50, "sizeX": "40", "sizeY": "40", "posX": "10", "posY": "10", "fillColor": defColor, "lineColor": "", "lineWidth": "3", "stroke": "rgb(6,120,155)", "strokewidth": 4 };
  oobj.trail = { "posX": 0, "posY": 0, "cx": "", "cy": "", "sizeX": "10", "sizeY": "10", "r": "10", "fillColor": defColor, "lineColor": "", "lineWidth": "1.5", "amount": 100, "cycle": true };
  oobj.trace = { "posX": 0, "posY": 0, "cx": "", "cy": "", "sizeX": "10", "sizeY": "10", "r": "10", "fillColor": defColor, "lineColor": "", "lineWidth": "1.5", "amount": 100, "cycle": true };
  oobj.line = { "x1": 10, "y1": 80, "x2": 80, "y2": 80, "sizeX": "80", "sizeY": "80", "posX": "10", "posY": "10", "fillColor": defColor, "lineColor": "", "lineWidth": "4", "stroke": "rgb(6,120,155)", "strokewidth": 4 };

  oobj.spring = { "posX": 10, "posY": 10, "sizeX": 100, "sizeY": 100, "r_posX": 10, "r_posY": 10, "r_sizeX": 100, "r_sizeY": 100, "pointsPerLoop": 20, "radius": 10, "segments": 150, "fillColor": defColor, "lineWidth": "2.5" };
  oobj.image = { "posX": 0, "posY": 0, "x": 0, "y": 0, "sizeX": 120, "sizeY": 120, "width": 120, "height": 120, "imagefile": "/img/ejs_image.png", "ejsRotate": "0" };
  oobj.text = { "text": "\"Default text\"", "posX": 10, "posY": 10, "sizeX": 100, "sizeY": 100, "x": 10, "y": 10, "width": 10, "height": 10, "ejsRotate": 0, "fillColor": '"#000000"' };
  oobj.polygon = { "data": "[100 100,130 130,130 250,130 30,130 70]", "xData": "[100, 130, 130, 130, 80]", "yData": "[100, 130,250,30,70]", "posX": "", "posY": "", "polygonStyle": "false", "fillColor": defColor, "lineWidth": 2, "lineColor": defColor };
  oobj.analyticCurve = { "point": "400", "minimum": "0", "maximum": "400", "variable": "x", "xFn": "x", "yFn": "50*Math.sin(0.04*x)", "posX": "", "posY": "", "fillColor": defColor, "lineWidth": 4, "lineColor": defColor };

  oobj.shapeSet = { "cx": 30, "cy": 30, "rx": 30, "ry": 30, "sizeX": "30", "sizeY": "30", "posX": "[0,50,100,150,200]", "posY": "[0,50,100,150,200]", "fillColor": defColor, "lineColor": "", "lineWidth": "1.5", "transform": "translate(0,0)", "circleStyle": "", "ejsRotate": "0", "amount": 5 };
  oobj.segmentSet = { "x1": "[0,50,100,150,200]", "y1": "[0,0,0,0,0]", "x2": 30, "y2": 30, "sizeX": "30", "sizeY": "30", "posX": "[0,50,100,150,200]", "posY": "[0,0,0,0,0]", "fillColor": defColor, "lineColor": "", "lineWidth": "4", "transform": "translate(0,0)", "ejsRotate": "0", "amount": 5 };
  oobj.arrowSet = { "x1": "[-100,-50,0,50,100]", "y1": "[0,0,0,0,0]", "x2": 30, "y2": 30, "sizeX": "30", "sizeY": "30", "posX": "[-100,-50,0,50,100]", "posY": "[0,0,0,0,0]", "fillColor": defColor, "lineColor": "", "lineWidth": "4", "transform": "translate(0,0)", "ejsRotate": "0", "amount": 5 };

  oobj.slider = { "type": "slider", "minimum": 0, "maximum": 50, "variable": "", "initialValue": 4, "step": 1, "split": 0, "close": "", "action": "", "format": "" };
  oobj.range = { "type": "slider", "minimum": 0, "maximum": 50, "variable": "", "initialValue": 4, "split": 0, "close": "", "action": "" };
  oobj.button = { "type": "button", "text": "\"button\"", "action": "" };
  oobj.twoStateButton = { "type": "twoStateButton", "text": "twoStateButton", "variable": "_isPaused", "on_text": "\"Play\"", "on_action": "_start()", "on_hotKey": "", "off_text": "\"Pause\"", "off_action": "_pause()", "off_hotKey": "" };
  oobj.checkbox = { "type": "checkbox", "text": "\"checkbox\"", "variable": "", "on_action": "_start()", "off_action": "_pause()", "action": "console.log(1);" };
  oobj.radio = { "type": "radio", "text": "\"radiobutton\"", "variable": "", "on_action": "_start()", "off_action": "_pause()" };
  oobj.plottingPanel = { "type": "plottingPanel", "X": "", "Y": "", "amount": 50, "xTitle": "", "yTitle": "", "lineType": "\"line\"" };
  oobj.group = { "type": "group", "posX": "", "posY": "", "sizeX": "", "sizeY": "", "transform": "" };
  //EJS Object End

  //ejsAttr to svgAttr start
  oobj.attrs = [];

  oobj.attrs['circle'] = {
    attrs: {
      'posX': 'cx',
      'posY': 'cy',
      'sizeX': 'rx',
      'sizeY': 'ry',
      'ejsRotate': 'rotate',
      'circleStyle': 'circleStyle',
      'draggable': 'draggable'
    },
    styles: {
      'fillColor': 'fillColor',
      'lineColor': 'stroke',
      'lineWidth': 'stroke-width'
    }
  };

  oobj.attrs['line'] = {
    attrs: {
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2'
    },
    styles: {
      'fillColor': 'stroke',
      'lineColor': 'stroke',
      'lineWidth': 'stroke-width'
    }
  };

  oobj.attrs['arrow'] = {
    attrs: {
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2'
    },
    styles: {
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width'
    }
  };

  oobj.attrs['spring'] = {
    attrs: {
      'posX': 'r_posX',
      'posY': 'r_posY',
      'sizeX': 'r_sizeX',
      'sizeY': 'r_sizeY'
    },
    styles: {
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width'
    }
  };

  oobj.attrs['image'] = {
    attrs: {
      'posX': 'x',
      'posY': 'y',
      'ejsRotate': 'rotate',
      'sizeX': 'width',
      'sizeY': 'height',
      'imagefile': "xlink:href"
    }
  };

  oobj.attrs['text'] = {
    attrs: {
      'posX': 'x',
      'posY': 'y',
      'sizeX': 'size',
      'sizeY': 'height',
      'text': "text",
      "ejsRotate": 'rotate'
    },
    styles: {
      'fillColor': 'fill'
    }
  };

  oobj.attrs['polygon'] = {
    attrs: {
      'posX': 'x',
      'posY': 'y',
      'sizeX': 'width',
      'sizeY': 'height',
      'data': "data",
      'xData': "xData",
      'yData': "yData",
      "polygonStyle": "polygonStyle"
    },
    style: {
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width',
      'lineColor': 'stroke'
    }
  };

  oobj.attrs['trace'] = {
    attrs: {
      'posX': 'posX',
      'posY': 'posY',
      'sizeX': 'sizeX',
      'sizeY': 'sizeY',
      'fillColor': 'fill',
      'amount': 'amount',
      'cycle': 'cycle'
    }
  };

  oobj.attrs['trail'] = {
    attrs: {
      'posX': 'posX',
      'posY': 'posY',
      'sizeX': 'sizeX',
      'sizeY': 'sizeY',
      'fillColor': 'fill',
      'amount': 'amount',
      'cycle': 'cycle'
    }
  };

  oobj.attrs['shapeSet'] = {
    attrs: {
      'posX': 'cx',
      'posY': 'cy',
      'sizeX': 'rx',
      'sizeY': 'ry',
      'ejsRotate': 'rotate',
      'circleStyle': 'circleStyle',
      'amount': 'amount'
    },
    styles: {
      'fillColor': 'fill'
    }
  };

  oobj.attrs['segmentSet'] = {
    attrs: {
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2',
      'fillColor': 'fill',
      'amount': 'amount'
    },
    styles: {
      'lineWidth': 'stroke-width'
    }
  };

  oobj.attrs['arrowSet'] = {
    attrs: {
      'posX': 'x1',
      'posY': 'y1',
      'sizeX': 'x2',
      'sizeY': 'y2',
      'fillColor': 'fill',
      'amount': 'amount'
    },
    styles: {
      'lineWidth': 'stroke-width'
    }
  };

  oobj.attrs['analyticCurve'] = {
    attrs: {
      'point': 'point',
      'minimum': 'minimum',
      'maximum': 'maximum',
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
    styles: {
      'fillColor': 'fillColor',
      'lineWidth': 'stroke-width',
      'lineColor': 'stroke'
    }
  };

  oobj.attrs['slider'] = {
    attrs: {
      'action': 'action'
    }

    //ejsAttr to svgAttr end

    //Translate 
  };uobj.simLists = {};
  uobj.simListsIdx = 0;
  uobj.window;

  uobj.createMulitLang = function () {

    let langs = [],
        v = EJS.data.modelvariables.defineVarsList,
        o = EJS.object.array;

    for (let key in v) {
      let d = v[key];
      if (d['comment'] || d['unit']) {
        //console.log(d['name'],d['comment'],d['unit']);
        langs.push({ name: d['name'] + '_comment', val: d['comment'] });
        langs.push({ name: d['name'] + '_unit', val: d['unit'] });
      }
    }

    for (let key in o) {
      let d = o[key];
      switch (d.type) {
        case 'slider':
          langs.push({ name: d['id'] + "_format", val: d['format'] });
          break;
        case 'button':
        case 'checkbox':
          langs.push({ name: d['id'] + "_text", val: d['text'] });
          break;
        case 'twoStateButton':
          langs.push({ name: d['id'] + "_on_text", val: d['on_text'] });
          langs.push({ name: d['id'] + "_off_text", val: d['off_text'] });
          break;
        case 'text':
          langs.push({ name: d['id'] + "_text", val: d['text'] });
          break;

      }
    }

    langs.push({ name: "ml_infoTitle", val: $("#INFO_TITLE").val() });
    return langs;
  };

  uobj.defaultLang = function () {

    EJS.data.multilang = this.createMulitLang();

    let obj = { "token": {} },
        l = {};
    for (let key in EJS.data.multilang) {
      let d = EJS.data.multilang[key];
      if (d.val) {
        l[d.name] = d.val.trim().replace(/\"/g, '');
      } else {
        l[d.name] = d.val;
      }
    }

    obj = {
      "token": l
    };

    let setting = {
      url: '/saveMultiLang',
      type: "post",
      dataType: "JSON",
      data: { data: obj, filename: EJS.gup('name'), lang: $("#setMultiLang").val(), id: $("#multilang_id").val() }
    },
        def = $.ajax(setting);
    def.done(function (data) {
      $("#multilang_id").val(data.id);
    });
  };

  uobj.eval = function (val) {
    try {
      return new Function('return ' + val)();
    } catch (e) {
      return val;
    }
  };

  uobj.checkJSCode = function (textarea) {
    let code = $("#" + textarea).val();

    try {
      let test = eval(code);
      if (typeof test == "undefined") {
        EJSINFO.show('<span lang="en">OK</span>');
        return true;
      }
      if (test.toString() == "NaN") {
        ERROR.show("Something is wrong, please check.");
        return false;
      } else {
        EJSINFO.show('<span lang="en">OK</span>');
        return true;
      }
    } catch (e) {
      ERROR.show(e);
      console.log(e);
      return false;
    }
  };

  uobj.checkObjName = function (len, objType, callback) {
    var chkId = objType + "-" + len,
        flag = false;

    for (var key in EJS.object.array) {

      if (chkId == EJS.object.array[key].id) {
        flag = true;
        len++;
      }
    }

    if (flag) {
      return uobj.checkObjName(len, objType);
    } else {
      return len;
    }
  };

  uobj.translate = function (fn) {

    EJS.data._EJS_LOAD_XML(fn, function () {
      console.log('translate_save');
      EJS.saveJsonData(function (data) {
        console.log(data);
        uobj.translate_save(data);
      });
    });
  };

  uobj.translate_run = function () {
    console.log('EJS.utilities.simListsIdx:' + EJS.utilities.simListsIdx);
    uobj.window = window.open("http://127.0.0.1:8080/dev/?resave=true&name=" + uobj.simLists[EJS.utilities.simListsIdx]);
    uobj.window.onbeforeunload = function () {
      console.log('onbeforeunload');
      EJS.utilities.simListsIdx++;
      this.translate_run();
    };
  };

  uobj.translate_getlist = function () {

    $.getJSON("/tmp/allfile.json", function (json) {
      uobj.simLists = json;
      // for(var key in json){
      //   uobj.translate(json[key]);
      // }
      uobj.translate_run();
    }).done(function () {}).fail(function (e) {
      console.log("error");
    });
  };

  uobj.translate_save = function (jsondata) {
    console.log('translate_save');
    var setting = {
      url: "/savedata",
      type: "POST",
      dataType: "text",
      data: jsondata
    },
        def = $.ajax(setting);

    def.done(function (data) {
      if (data == "success") {
        console.log('call next file.');
        window.close();
      }
    }).fail(function (data) {
      console.log("ajax is fail");
    });
  };

  //get ejss list
  uobj.getEJSSList = function () {
    var setting = {
      url: '/getFilelist',
      type: "post",
      dataType: "json",
      data: { idx: _EJS_EJSSLIST_IDX, keyword: EJS.cookies.keyword, type: 'ejss' }
    },
        def = $.ajax(setting);

    def.done(function (data) {

      var systemAdmin = data[0] && data[0].del === "remove" ? true : false;

      uobj.createFilelist(data, 'ejss');
    }).fail(function (data) {
      console.log("ajax is fail");
    });
  };

  //get file list
  //function _EJS_GetMyFiles(){
  uobj.getMyFiles = function () {

    // var setting = {
    //     url: '/getMyFiles',
    //     type: "get",
    //     dataType: "json"
    // }
    // EJS.cookies.sortby = sort || EJS.cookies.sortby; 

    // if(sort){
    //   _EJS_MYFILELIST_IDX = 0;
    //   $("#myfile > div").remove();      
    // }

    var setting = {
      url: '/getFilelist',
      type: "post",
      dataType: "json",
      data: { idx: _EJS_MYFILELIST_IDX, keyword: EJS.cookies.keyword, owner: 'self' }
    },
        def = $.ajax(setting);

    def.done(function (data) {
      //var data = $.parseJsonAndSort(rowData,'init_date',false)  
      //(data.length==0) ? $("#myfileTitle").html("no data") : $("#myfileTitle").html("Your simluations.");  
      //console.log(data);
      //$("#myfile div").remove();     
      var systemAdmin = data[0] && data[0].del === "remove" ? true : false;
      if (systemAdmin && _EJS_MYFILELIST_IDX == 0) {
        var appstr = `<div class='col-md-12'>
                          <form action="/uploadImportFile" method="post" style="display: inline" enctype="multipart/form-data">
                            <input type="file" name="file" id="file" style="margin:0px;display: inline" class='col-md-1'>
                            <input type="submit" class='btn btn-info col-md-1' value="Import">
                            </input>
                          </form>
                          <button class='btn btn-success col-md-1'><a href="/downloadSimulation/?simID=allPublic" style="text-decoration:none; color:white;"><span class='glyphicon glyphicon-download'>Export</span></a></button>
                        </div>`;
        $("#myfile").append(appstr);
      }
      uobj.createFilelist(data, 'self');
    }).fail(function (data) {
      console.log("ajax is fail");
    }).always(function () {
      console.log("always");
    });
  };

  //取得所有檔案列表
  //function _EJS_GET_Filelists(sort){
  uobj.getFileLists = function (sort) {
    //console.log("sort:"+sort)
    EJS.cookies.sortby = sort || EJS.cookies.sortby;
    if (sort) {
      _EJS_FILELIST_IDX = 0;
      $("#filelist > div").remove();
    }
    var setting = {
      url: '/getFilelist',
      type: "post",
      dataType: "json",
      data: { sort: EJS.cookies.sortby, idx: _EJS_FILELIST_IDX, keyword: EJS.cookies.keyword }
    },
        def = $.ajax(setting);
    def.done(function (data) {
      var systemAdmin = data[0] && data[0].del === "remove" ? true : false;
      if (systemAdmin && _EJS_FILELIST_IDX == 0) {
        var appstr = `<div class='col-md-12'>
                          <form action="/uploadImportFile" method="post" style="display: inline" enctype="multipart/form-data">
                            <input type="file" name="file" id="file" style="margin:0px;display: inline" class='col-md-1'>
                            <input type="submit" class='btn btn-info col-md-1' value="Import">
                            </input>
                          </form>
                          <button class='btn btn-success col-md-1'><a href="/downloadSimulation/?simID=allPublic" style="text-decoration:none; color:white;"><span class='glyphicon glyphicon-download'>Export</span></a></button></div>`;
        // <button class='btn-xs btn-info' id="simView">Views</button>
        //                 </div>`;
        $("#filelist").append(appstr);
        //$("#simView").on('click',uobj.getSimViewList);
      }
      uobj.createFilelist(data);
      //}
    }).fail(function (data) {
      console.log("ajax is fail");
    }).always(function (data) {
      console.log("always");
    });
  };

  uobj.getSimViewList = function () {
    var setting = {
      url: '/getFilelistAll',
      type: "post",
      dataType: "json",
      data: { sort: EJS.cookies.sortby, keyword: EJS.cookies.keyword }
    },
        def = $.ajax(setting);
    def.done(function (data) {
      let tbody = "";
      //console.log(data);
      for (var i = 0, len = data.length; i < len; i++) {
        var d = data[i];
        tbody += d.INFO_TITLE != "" ? "<tr><td>" + d.INFO_TITLE + "</td><td>" + data[i].pageviews + "</td></tr>" : "<tr><td>None</td><td>" + data[i].pageviews + "</td></tr>";
      }
      let tableContent = `<div class="col-xs-12">
                           <table class="statTable table-striped table-bordered col-md-12">
                          <thead><tr><th class="col-xs-8">Title</th><th class="col-xs-1">Views</th></tr></thead>
                          <tbody>${tbody}</tbody>`;
      var w = window.open("", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
      $(w.document.body).html($(tableContent).html());
    });
  };

  uobj.createFilelist = function (data, owner) {
    var _class = '';
    owner == 'self' ? _class = 'myfile' : _class = 'allfiles';
    for (var i = 0, len = data.length; i < len; i++) {
      var d = data[i],
          title = d.INFO_TITLE != "" ? d.INFO_TITLE : "None",
          myDate = new Date(d.init_date),
          establishData = uobj.timeformat(myDate.toGMTString()),
          shortTitle = title.substring(0, 12),
          keywordsArray = typeof d.INFO_KEYWORDS === "undefined" ? [] : d.INFO_KEYWORDS.split(","),
          keywordsSpan = "";
      for (let key in keywordsArray) {
        if (keywordsArray[key] != "") {
          keywordsSpan += `<span lang='en'>${keywordsArray[key]}<span>、`;
        }
      }
      keywordsSpan = keywordsSpan.substring(0, keywordsSpan.length - 1);
      var coverPhoto = data[i].snapshot ? data[i].filename : "../img/noimage",
          filelist = "",
          authorName = d.authorName ? d.authorName : "NoName",
          notStar = !data[i].star,
          notChoice = !data[i].choice,
          isStarIcon = data[i].star ? "glyphicon-star" : "glyphicon-star-empty",
          isChoiceIcon = data[i].choice ? "glyphicon-ok-sign blue" : "glyphicon-ok-circle gray",
          admin = data[i].del === "remove" || !data[i].authorName ? 1 : 0,
          isAuthor = data[i].isAuthor,
          isPopular = data[i].pageviews >= 200 ? `<img src='/img/hot.gif' width='20' height='20'>` : ``,
          uploader = '';

      if (owner == 'ejss') {
        uploader = `<div class="row" style="padding-left:15px;"><span lang="en">Uploader</span>：<a href="/userinfo/?type=ejs&info=${d.filename}">${authorName}</a></div>`;
        authorName = '<a href="http://weelookang.blogspot.tw" target="_blank">Loo Kang Lawrence WEE</a>';
      }

      filelist = `<div class="simList thumbnail col-xs-6 col-md-4" onmouseleave="EJS.flipCard(this,'top')">
                      <div class="col-xs-4 col-md-4 imgZoom"><img src ='/svg/${coverPhoto}.png' width="85" style="margin-top:45px"></div>
                      <div class="col-xs-8 col-md-8 simDetail" onmouseover="EJS.flipCard(this,'bottom')">
                        <h4><a href="/run/?name=${d.filename}" target="_blank" class="openfiles" id="${d.filename}" title="${title}">${shortTitle}</a></h4>
                        <div class="row" style="padding-left:15px;"><span lang="en">Author</span>：<a href="/userinfo/?type=ejs&info=${d.filename}">${authorName}</a></div>
                        ${uploader}
                        <div class="front row" style="padding-left:15px;">
                          <div><span lang="en">Keywords</span><span style="word-wrap:break-word;">：${keywordsSpan}</span></div>
                          <div class="controlPanel">
                            &nbsp;<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> ${data[i].pageviews}
                            &nbsp;<span class="glyphicon glyphicon-export" aria-hidden="true"></span>${d.citedCount}
                            &nbsp;${isPopular}
                          </div>
                        </div>
                        <div class="back" style="display:none;">
                          <div><span lang="en">Creation Date</span>：${establishData}</div>`;
      /*if(typeof(data[i].from_gn)!=="undefined"){
        activitylist += `<div><span lang="en">Source</span>：<a href="/../logInActivity/?gn=${data[i].from_gn}" data-toggle="tooltip" title="${data[i].from_gnTitle}">${fromgnTitle}</a></div>`;
      }*/

      console.log(data[i], data[i].choice);

      filelist += `<p></p>`;
      if (admin) {
        filelist += ` 
              <div class="pull-right" style="margin-top:65px">
                <span class="del" value="${d.filename}" style="margin:3px;">
                  <b><a href="#" style="color:red"><span class="glyphicon glyphicon glyphicon-trash" style="color:red"></span></a></b>
                </span>&nbsp;
                <span id="${d.filename}" class="myfile" value="${notStar}">
                  <a class="star" value="${d.filename}"><span class="glyphicon ${isStarIcon} warning" aria-hidden="true"></span></a>
                </span>
                <span id="${d.filename}" class="myfile" value="${notChoice}">
                <a class="choice" value="${d.filename}"><span class="glyphicon ${isChoiceIcon} warning" aria-hidden="true"></span></a>
              </span>
              </div>`;
      }
      if (isAuthor) {
        filelist += `   <div><a style="margin:3px;" href="/dev/?name=${d.filename}" class="openfiles" id="${d.filename}" tooltip="${title}">
                                <span class="glyphicon glyphicon-edit" style="color:green"></span>
                                <span lang="en">Edit Simulation</span>
                                </a>
                          </div>`;
      }
      filelist += `     <div><a style="margin:3px;" href="/group/?name=${d.filename}&sim=${title}">
                                  <span class="glyphicon glyphicon-plus"></span>
                                  <span lang="en">Build Activities</span>
                                </a>
                          </div> 
                          <div><a style="margin:3px;" href="/dev/?name=${d.filename}&cpSim=1" class="openfiles" id="${d.filename}">
                                  <span class="glyphicon glyphicon-duplicate" style="color:purple"></span> 
                                  <span lang="en">Copy Simulation</span></a>
                                </a>
                          </div>                          
                          <div><a style="margin:3px;" class="relatedSim" href="#loadfiles" id="${d.oriSimFilename}_${d.filename}_${title}">
                                  <span class="glyphicon glyphicon-list-alt" style="color:black"></span>
                                  <span lang="en">Related Simulation</span>
                                </a>
                          </div> 
                          <div><input type="hidden" class="filename" value="${d.filename}">
                                <a style="margin:3px;" class="getActivityList" href="#">
                                  <span class="glyphicon glyphicon-list" style="color:grey"></span>
                                  <span lang="en">List Activities</span>
                                </a>
                          </div> 
                        </div>
                      </div>
                    </div></div>`;

      if (owner == 'self') {
        $("#myfile").append(filelist);
      } else if (owner == 'ejss') {
        $("#ejssList").append(filelist);
      } else {
        $("#filelist").append(filelist);
      }
    }
  };

  uobj.createActList = function (data, type) {
    //console.log(data);
    if (data[0].NoContent) {
      $("#myActivityfile").html(`<div class="col-md-12"><div class="alert alert-warning col-md-offset-1 col-md-10">Please <a href='/login'>Log in</a>...</div><div class="col-md-1"></div></div>`);return;
    } else if (data) {
      //else{ $("#activityfile > div").remove();}

      for (var i = 0; i < data.length; i++) {

        var desc = data[i].desc.length > 10 ? data[i].desc.substr(0, 10) + "..." : data[i].desc || "未命名",
            //"<span lang='en'>Untitle</span>",
        teachinginfo = data[i].teachinginfo.length > 40 ? data[i].teachinginfo.substr(0, 40) + "..." : data[i].teachinginfo || "<span lang='en'>No Description</span>",
            Collabor = data[i].CollaborMode,
            myDate = new Date(data[i].init_date),
            establishData = uobj.timeformat(myDate.toGMTString()),
            isStarIcon = data[i].star ? "glyphicon-star" : "glyphicon-star-empty",
            isChoiceIcon = data[i].choice ? "glyphicon-choice" : "glyphicon-choice-empty",
            notStar = !data[i].star,
            author = data[i].authorName ? `<a href='/userinfo/?type=activity&info=${data[i].groupname}'>${data[i].authorName}</a>` : "Visitor",
            fromgnTitle = data[i].from_gnTitle ? data[i].from_gnTitle.substr(0, 8) + "..." : data[i].from_gnTitle || "活動來源",
            admin = data[i].del === "remove" ? 1 : 0,
            isAuthor = data[i].isAuthor,
            coverPhoto = data[i].coverPhoto ? data[i].coverPhoto : "../img/noSnapShot",
            photoLink = '',
            photoLinkEnd = '',
            isPopular = data[i].pageviews >= 200 ? `<img src='/img/hot.gif' width='20' height='20'>` : ``;

        if ((data[i].identity == "Teacher" || data[i].identity == "Scientist") && data[i].coverPhoto) {
          photoLink = `<a target="_blank" href='/run/?name=${data[i].coverPhoto}'>`;
          photoLinkEnd = `</a>`;
        }

        var activitylist = `<div class="activityList thumbnail col-xs-6 col-md-4" onmouseleave="EJS.flipCard(this,'top')">
                          <div class="col-xs-4 col-md-4 imgZoom">${photoLink}<img src ='/svg/${coverPhoto}.png' width="85" height="85" style="margin-top:45px">${photoLinkEnd}</div>
                          <div class="col-xs-8 col-md-8 actDetail" onmouseover="EJS.flipCard(this,'bottom')">
                            <h4><a href="../logInActivity/?gn=${data[i].groupname}" data-toggle="tooltip" title="${data[i].desc}" target="_activity" class="listTiltle">${desc}</a></h4> 
                            <div><span lang="en">Author</span>：${author}</div>
                            <div class="front">   
                              <div style="margin-left:70px;text-indent:-70px;text-align: justify;"><span lang="en">Description</span>：${teachinginfo}</div>
                              <div class="controlPanel">
                                &nbsp;<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> ${data[i].pageviews}
                                &nbsp;${isPopular}
                              </div>
                            </div>
                            <div class="back" style="display:none;">
                              <div><span lang="en">Creation Date</span>：${establishData}</div>`;
        if (typeof data[i].from_gn !== "undefined") {
          activitylist += `<div><span lang="en">Source</span>：<a href="/../logInActivity/?gn=${data[i].from_gn}" data-toggle="tooltip" title="${data[i].from_gnTitle}">${fromgnTitle}</a></div>`;
        }
        activitylist += `<p></p>`;
        if (admin) {
          activitylist += ` <div class="pull-right" style="margin-top:65px"><span class="delActivity" value="${data[i].groupname}" style="margin:3px;"><span class="glyphicon glyphicon glyphicon-trash" style="color:red"></span></span>
                                &nbsp;<span id="${data[i].groupname}" class="activity" value="${notStar}"><a class="star" value="${data[i].filename}"><span class="glyphicon ${isStarIcon} warning" aria-hidden="true"></span></a></span></div>`;
        }
        if (isAuthor) {
          activitylist += '   <div><a class="editAct" href="../group/?gn=' + data[i].groupname + '&edit=' + data[i].from_gn + '"><span class="glyphicon glyphicon-edit"  style="color:green"></span> <span lang="en">Edit Activity</span></a></div>';
        }
        activitylist += `     <div><a style="margin:3px;" class="relatedWork" href="#activity" id="${data[i].from_gn}_${data[i].groupname}">
                                      <span class="glyphicon glyphicon-list-alt" style="color:black"></span>
                                      <span lang="en">Related Activity</span>
                                    </a>
                              </div> 
                              <div><a style="margin:3px;" class="cpAct" href="../group/?gn=${data[i].groupname}&cp=1">
                                      <span class="glyphicon glyphicon-duplicate"></span > 
                                      <span lang="en">Copy Activity</span>
                                    </a>
                              </div>
                            </div>
                          </div>
                        </div></div>`;
        /*if (Collabor=="Single"){
            //activitylist += '<span class=""><img src="/img/Single.png" style="width:35px;padding:5px"></span>';
            //activitylist += '<span class=""><img src="/svg/${data[i].coverPhoto}.png" style="width:35px;padding:5px"></span>';
        }else{
            //activitylist += '<span class=""><img src="/img/Group.png" style="width:35px;padding:5px"></span>';
            //activitylist += `<span class=""><img src="/svg/${data[i].coverPhoto}.png" style="width:35px;padding:5px"></span>`;
        }*/
        var fromgn;
        //chi parent activity 20151221
        /* remove by squall @2016/4/27 
        if(data[i].from_gn){
          //alert(data[i].from_gn);
          var setting = {
            url: "/getActivity",
            async: false,
            type: "POST",
            dataType: "JSON",   
            data: {gn:data[i].from_gn}
          },
          def = $.ajax(setting);
          def.done(function(from_data){
            if(from_data[0]){
              fromgn=from_data[0].desc;
              activitylist += '<div><span lang="en">Source</span>:<a href="../activity/?gn='+data[i].from_gn+'&name='+data[i].filename+'">'+from_data[0].desc+'</a></div>';
            }else{
              activitylist += '<div><span lang="en">Source</span>:none</div>';                 
            }          
          });
        }*/
        //chi chi parent activity end 20151221


        //activitylist += '<a style="margin:3px;" href="../group/?gn='+data[i].groupname+'&name='+data[i].filename+'"><span class="glyphicon glyphicon glyphicon-trash" style="color:red"></span></a>';
        //activitylist += '<a style="margin:3px;"  href="../group/?gn='+data[i].groupname+'&name='+data[i].filename+'&edit='+data[i].from_gn+'"><span class="glyphicon glyphicon-edit"  style="color:green"></span> <span lang="en">Edit</span></a>';
        //activitylist += '<a style="margin:3px;" href="../group/?gn='+data[i].groupname+'&name='+data[i].filename+'&cp=1"><span class="glyphicon glyphicon-duplicate"></span > <span lang="en">Copy</span></a>';
        //console.log(data[i].desc,data[i].author);
        //       activitylist +='<span class="pull-right" style="position:absolute;bottom:2px;right:178px;margin:0;"><a href="activity/?gn='+data[i].from_gn+'&name='+data[i].filename+'"><span class="glyphicon glyphicon-chevron-right  style="color:blue"></span> 活動來源</a></span>';//copy      
        //       activitylist +='<span class="pull-right" style="position:absolute;bottom:2px;right:180px;margin:0;"><a href="activity/?gn='+data[i].from_gn+'&name='+data[i].filename+'"><span class="glyphicon glyphicon-chevron-right  style="color:blue"></span> from</a></span>';//copy      

        if (type == "self") {
          $("#myActivityfile").append(activitylist);
        } else if (type == "visitor") {
          $("#anonyActivityfile").append(activitylist);
        } else {
          $("#activityfile").append(activitylist);
        }
      }
      //$('body').scrollTop(0);
    }
  };
  /* 判斷是否為單一變數 */
  uobj.checkVar = function (chkVar, value) {
    /*
    let v = EJS.data.modelvariables.defineVarsList;
      obj = _(v).find(function(o) {
        return o.name == name;
      });
    if(typeof(obj)=="object" ) return true;
    if(name == parseFloat(name)) return true;
    */
    var chkList = EJS.data.modelvariables.defineVarsList,
        len = chkList.length;

    for (var i = 0; i < len; i++) {
      if (chkList[i].name == chkVar) {

        uobj.setVal2Var(chkVar, value);
        uobj.eval(`${chkVar}=${value}`);
        return true;
      }
    }

    return false;
  };

  uobj.setVal2Var = function (chkVar, value) {
    var len = $("#defineVarSubTab li").length,
        //第一個li為 +
    thisDefineVarsList = [],
        thisIdx = 0;

    for (var i = 1; i < len; i++) {
      $("[id^='defineVarBMTable" + i + "'][id$='_1']").each(function () {
        var tmpIdx = $(this).attr("id").split("_"),
            name = $("#defineVarBMTable" + i + "_" + tmpIdx[1] + "_1").val();
        if (name == chkVar) {
          $("#defineVarBMTable" + i + "_" + tmpIdx[1] + "_2").val(value);
        }
      });
    }
  };

  uobj.timeformat = function (initTime) {
    var myDate = new Date(initTime),
        filelist = "",
        month = myDate.getMonth() > 8 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1),
        year = myDate.getFullYear(),
        date = myDate.getDate() > 9 ? myDate.getDate() : "0" + myDate.getDate(),
        hr = myDate.getHours() > 9 ? myDate.getHours() : "0" + myDate.getHours(),
        min = myDate.getMinutes() > 9 ? myDate.getMinutes() : "0" + myDate.getMinutes(),
        sec = myDate.getSeconds() > 9 ? myDate.getSeconds() : "0" + myDate.getSeconds(),
        time = year + "/" + month + "/" + date + " " + hr + ":" + min + ":" + sec;
    return time;
  };

  /*
      * Desc: 取小數點至 N 位數
      * Author: Squall
      * 
      */
  uobj.formatFloat = function (num, pos) {
    var size = Math.pow(10, pos);
    return (Math.round(num * size) / size).toFixed(pos);
  };

  uobj.custFormat = function (num, format) {
    //let pos = 0;
    //    return new Array(width + 1 - (number + '').length).join('0') + number;

    if (format.match(/\./g)) {
      let pos = format.split('.'),
          size = Math.pow(10, pos[1].length);

      return (Math.round(num * size) / size).toFixed(pos[1].length);
    } else {
      let size = Math.pow(10, 0);
      return (Math.round(num * size) / size).toFixed(0);
    }
  };
  /*
  * Desc: 角度徑度轉換
  * c(角度)=theta(徑度)*180 /Math.PI 
  *
  */
  uobj.deg2rad = function (deg) {
    return parseFloat(deg) / Math.PI * 180;
  };
})();

//動態載入JAVASCRIPT //
EJS.loadJSFile = function (jsname, loadJSONData) {

  script = jQuery("<script>").prop({
    async: true,
    charset: "utf-8",
    src: "tmp/" + jsname + ".js"
  }).on("load error", callback = function (evt) {
    script.remove();
    callback = null;
    if (evt) {
      if (evt.type == "complete") {
        console.log("success");
      } else {
        EJS.loadJSFileCallBack(loadJSONData);
      }
    }
  });
  document.head.appendChild(script[0]);
};
