
var userLang = navigator.language || navigator.userLanguage;

$(function () {
	//set language
	//console.log('start loading ejs-common.js');


	//(userLang=="zh-TW") ? userLang = 'zh_TW' : userLang = 'english';
	// if(userLang=="zh-TW") userLang = 'zh_TW';

	// var langCookie = $.cookie("langCookie") || userLang || "english",
	// 	lang = new Lang();

	// //console.log('setLang,'+langCookie);
	// lang.dynamic(langCookie, '/js/langpack/'+langCookie+'.json');

	// lang.loadPack(langCookie, function(err){
	// 	if (!err) {
	// 	// The language pack loaded
	// //console.log('The language pack loaded,',langCookie);

	// EJS.data.setSimluationLang(langCookie);
	// $("#setLang").val(langCookie);

	// } else {
	// 	// There was an error loading the pack
	// console.log(err);
	// }
	//   });

	// $("#setLang").on("change", function(){  

	// 	var lng = $("#setLang").val();

	// 	lang.dynamic(lng, '/js/langpack/'+lng+'.json');

	// 	lang.loadPack(lng, function(err){
	// 		if (!err) {
	// 			// The language pack loaded			
	// 			if(EJS.gup("name")!=""){
	// 				EJS.data.setSimluationLang(lng);
	// 			}else{					
	// 				window.lang.change(lng); 
	// 				$("#infoCategory").trigger("chosen:updated");
	// 				$("#infoKeywords").trigger("chosen:updated");
	// 			}
	// 		} else {
	// 			// There was an error loading the pack
	// 			console.log(err);
	// 		}
	// 	  });

	// 	return false;
	// })
	//set language end.

	EJS.data.badSetDefaultLang = function (lng) {
		let originLang = EJS.utilities.createMulitLang();

		window.lang.change('en');

		if (typeof lang.pack[lng]['token'] == "undefined") return;

		for (let key in originLang) {
			let o = originLang[key]['val'].replace(/\"/g, ''),
			    k = originLang[key]['name'];

			lang.pack[lng]['token'][k] = o;
		}

		EJS.data.setSimluationLang(lng);
	};

	EJS.data.setSimluationLang = function (lng) {
		let filename = EJS.gup("name");
		$.getJSON("/multiLang/" + EJS.gup("name") + "/" + lng, function (json) {

			let originLang = EJS.utilities.createMulitLang();

			for (let key in originLang) {
				let o = originLang[key]['val'].replace(/\"/g, ''),
				    k = originLang[key]['name'];
				lang.pack[lng]['token'][k] = o;
			}

			if (json) {
				let d = json.token;
				for (let key in d) {
					let o = d[key];
					if (o != "") lang.pack[lng]['token'][key] = o;
				}
			} else {
				let originLang = EJS.utilities.createMulitLang();

				for (let key in originLang) {
					let o = originLang[key]['val'],
					    k = originLang[key]['name'];
					lang.pack[lng]['token'][k] = o;
				}
				window.lang.change(lng);
			}

			if (typeof lang.pack[lng]['token']['abstract'] != "undefined" && lang.pack[lng]['token']['abstract'] != "") {
				$("#infoModalContent").html(lang.pack[lng]['token']['abstract']);
				$("#infoModalLabel").html(lang.pack[lng]['token']['ml_infoTitle']);
			} else {
				$("#infoModalContent").html($("#INFO_ABSTRACT").val().replace(/\n/g, "<br />"));
				$("#infoModalLabel").html($("#INFO_TITLE").val().replace(/\n/g, "<br />"));
			}

			$("#infoCategory").trigger("chosen:updated");
			$("#infoKeywords").trigger("chosen:updated");

			window.lang.change(lng);
		}).done(function () {
			//window.lang.change(lng); 

		}).fail(function (e) {

			//window.lang.change(lng); 

			EJS.data.setSimluationDefaultLang(filename);
			console.log("error");
			console.log(e);
		});
	};
});
