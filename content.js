function findAncestor (el, cls) {
	if (el.nodeName !== cls && el.parentElement !== null) {
		return findAncestor(el.parentElement, cls);
	} else {
		if (el.parentElement == null)
			return null;
		else 
			return el;
	}
}

function nodeInsertedCallback(event) {
	var removed = 0;
	var els = document.querySelectorAll("a[href^='https://allegro.pl']");
	var hrefs = [];
	for (var i = 0, l = els.length; i < l; i++) {
		var el = els[i];
		if (el.innerHTML.indexOf("img") !== -1 && el.innerHTML.indexOf("ul") == -1) {
			var h = el.href.split("?");
			var h2 = h[0].split("-");
			var h3 = h[0].replace(h2[h2.length - 1], "");
			if (hrefs.indexOf(h3) == -1) {
				if (h3 !== "") {
					hrefs[i] = h3;
				}
			} else {
				var anc = findAncestor(el, "ARTICLE");
				if (anc !== null) {
					anc.style.opacity = 0;
					anc.style.position = 'absolute';
					anc.style.left = '-9999px';
					removed++;
				}
			}
		}
	}
	chrome.extension.sendMessage(removed.toString());
};

var listing = document.getElementById('opbox-listing');
listing.addEventListener('DOMSubtreeModified', nodeInsertedCallback);
