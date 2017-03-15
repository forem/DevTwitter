//🚀 🚀 🚀

var links = null;

fetch('https://dev.to/api/articles')
.then(function(response) {
	response.json().then(function(data) {
		links = data;
		insertLinks(data);
	});
}).catch(function(err) {
	console.log(err);
});

setInterval(function(){
	if (links) {
		insertLinks(links);
	}
},50)

function insertLinks(data){
	var trendsBox = document.getElementsByClassName("Trends")[0];
	var devBox = document.getElementById("dev-to-trends");
	if (!trendsBox || devBox) return;
	var newItem = document.createElement("DIV");
	newItem.innerHTML = trendsHTML(listHTML(data));
	insertAfter(newItem, trendsBox);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function twitterLink(item) {
	if (!item.user.twitter_username) return '';
	return '&nbsp; (<a style="display:inline;color:#8899a6;" href="https://twitter.com/'+item.user.twitter_username+'">@'+item.user.twitter_username+'</a>)'
}

function listHTML(data) {
	return data.slice(0, 11).map(function(item){
		return linkItemHTML(item)
	}).join("");
}

function linkItemHTML(item) {
	return '<li class="trend-item js-trend-item  context-trend-item">\
					<a target="_blank" class="pretty-link js-nav js-tooltip u-linkComplex" href="'+item.url+'">\
					<span class="u-linkComplex-target trend-name" dir="ltr">'+item.title+'</span>\
					</a>\
					<div class="js-nav trend-item-context"></div>\
					<div class="js-nav trend-item-stats">\
						'+item.user.name+twitterLink(item)+'\
					</div>\
					</li>'
}

function trendsHTML(listItems) {
	return '<div class="Trends module">\
					<div class="trends-inner"><div class="flex-module trends-container context-trends-container">\
				  <div class="flex-module-header">\
				  <h3><span class="trend-location js-trend-location">dev.to</span></h3>\
				  </div>\
				  <div class="flex-module-inner">\
					<ul class="trend-items js-trends" id="dev-to-trends">\
					'+listItems+'</ul></div></div></div>'
}
