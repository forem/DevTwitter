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

setInterval(function() {
  if (links) {
    insertLinks(links);
  }
}, 50)

function insertLinks(data) {
  var trendsBox = document.getElementsByClassName('css-1dbjc4n r-1u4rsef r-9cbz99 r-t23y2h r-1phboty r-rs99b7 r-15d164r r-1udh08x')[0];
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

  return (`&nbsp; (<a style="display:inline;color:#8899a6;" href="https://twitter.com/${item.user.twitter_username}">@${item.user.twitter_username}</a>)`);
}

function listHTML(data) {
  return data.slice(0, 11).map(function(item) {
    return linkItemHTML(item)
  }).join("");
}

function linkItemHTML(item) {
  return (`<div class="css-1dbjc4n r-my5ep6 r-qklmqi r-1adg3ll">
    <div aria-haspopup="true" data-focusable="true" tabindex="0" class="css-1dbjc4n r-1loqt21 r-6koalj r-1j3t67a r-1w50u8q r-o7ynqc r-6416eg" data-testid="trend" role="link">
      <div dir="ltr" class="css-901oao r-hkyrab r-1qd0xha r-a023e6 r-vw2c0b r-ad9z0x r-bcqeeo r-vmopo1 r-qvutc0"><span class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"><a target="_blank" style="color:rgb(20, 23, 26);text-decoration:none;" href="${item.url}">${item.title}</span></a></div>
      <div dir="auto" class="css-901oao r-1re7ezh r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-vmopo1 r-qvutc0"><span class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0">${item.user.name}${twitterLink(item)}</span></div>
    </div>
  </div>`);
}

function trendsHTML(listItems) {
  return (`<div class="css-1dbjc4n r-1u4rsef r-9cbz99 r-t23y2h r-1phboty r-rs99b7 r-15d164r r-1udh08x">
        <div class="css-1dbjc4n">
            <div class="css-1dbjc4n">
                <section aria-labelledby="accessible-list-0" role="region" class="css-1dbjc4n">
                    <h1 aria-level="1" dir="auto" role="heading" class="css-4rbku5 css-901oao r-4iw3lz r-1xk2f4g r-109y4c4 r-1udh08x r-wwvuq4 r-u8s1d r-92ng3h" id="accessible-list-0">Dev.to Trending</h1>
                    <div aria-label="Timeline: Dev.to Trending" class="css-1dbjc4n">
                        <div class="css-1dbjc4n">
                            <div class="css-1dbjc4n r-1adg3ll" id="dev-to-trends">
                                <div class="css-1dbjc4n">
                                    <div class="css-1dbjc4n r-my5ep6 r-rull8r r-qklmqi r-1wtj0ep r-1j3t67a r-1w50u8q">
                                        <h2 aria-level="2" role="heading" class="css-4rbku5 css-1dbjc4n r-1awozwy r-18u37iz r-1wtj0ep">
                                            <div dir="auto" class="css-901oao css-bfa6kz r-hkyrab r-1qd0xha r-1b6yd1w r-1vr29t4 r-ad9z0x r-1sp7lne r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0">Dev.to</span></div>
                                        </h2>
                                    </div>
                                    ${listItems}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </div>`);
}