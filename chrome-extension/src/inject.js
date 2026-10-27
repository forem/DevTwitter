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
	if (!Array.isArray(data)) return;
	var newItem = trendsElement(data);
	insertAfter(newItem, trendsBox);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createElement(tagName, className) {
	var element = document.createElement(tagName);
	if (className) element.className = className;
	return element;
}

function twitterLink(item) {
	if (!item.user || !item.user.twitter_username) return null;
	var username = item.user.twitter_username;
	var link = createElement("a");
	link.style.cssText = "display:inline;color:#8899a6;";
	link.href = "https://twitter.com/" + encodeURIComponent(username);
	link.target = "_blank";
	link.rel = "noopener noreferrer";
	link.textContent = "@" + username;
	return link;
}

function articleItem(item) {
	var listItem = createElement("li", "trend-item js-trend-item context-trend-item");
	var articleUrl;
	try {
		articleUrl = new URL(item.url);
	} catch (err) {
		articleUrl = null;
	}
	if (articleUrl && (articleUrl.protocol === "http:" || articleUrl.protocol === "https:")) {
		var articleLink = createElement("a", "pretty-link js-nav js-tooltip u-linkComplex");
		articleLink.href = articleUrl.href;
		articleLink.target = "_blank";
		articleLink.rel = "noopener noreferrer";
		var title = createElement("span", "u-linkComplex-target trend-name");
		title.dir = "ltr";
		title.textContent = item.title || "";
		articleLink.appendChild(title);
		listItem.appendChild(articleLink);
	}
	listItem.appendChild(createElement("div", "js-nav trend-item-context"));
	var stats = createElement("div", "js-nav trend-item-stats");
	stats.appendChild(document.createTextNode(item.user && item.user.name || ""));
	var authorLink = twitterLink(item);
	if (authorLink) {
		stats.appendChild(document.createTextNode(" ("));
		stats.appendChild(authorLink);
		stats.appendChild(document.createTextNode(")"));
	}
	listItem.appendChild(stats);
	return listItem;
}

function trendsElement(data) {
	var trends = createElement("div", "Trends module");
	var inner = createElement("div", "trends-inner");
	var container = createElement("div", "flex-module trends-container context-trends-container");
	var header = createElement("div", "flex-module-header");
	var heading = createElement("h3");
	var location = createElement("span", "trend-location js-trend-location");
	location.textContent = "dev.to";
	heading.appendChild(location);
	header.appendChild(heading);
	var moduleInner = createElement("div", "flex-module-inner");
	var items = createElement("ul", "trend-items js-trends");
	items.id = "dev-to-trends";
	data.slice(0, 11).forEach(function(item) {
		items.appendChild(articleItem(item));
	});
	moduleInner.appendChild(items);
	container.appendChild(header);
	container.appendChild(moduleInner);
	inner.appendChild(container);
	trends.appendChild(inner);
	return trends;
}
