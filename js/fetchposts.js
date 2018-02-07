// fetchposts.js
// Detta scriptet gör så att man kan få wordpress posts att visas på hemsidan


(function ($){
	$(document).ready(function(){
		var url = "http://www.javascript.fear-some.com/wp/wp-json/wp/v2/posts/?_embed=true&filter[orderby]=date&order=asc";
		$.ajax({
		type : "GET",
		url : url,
		timeout : 2000,
		beforesend: function (){
		console.log('before');
		},
		complete : function () {
			console.log('COMPLETE');
		}, success : function (minData) {
			console.log(minData);
			displayWP(minData);
		}, error : function () {
			console.log('ERROR');
		}
		})

		function displayWP (pData){
// En funktion som loopar igenom posterna från wordpress och sparar information i olika variablar
			for (var i = 0; i < pData.length; i++) {
			console.log('detta är pdata id', pData[i].id);
			var articleId = pData[i].id;
			if(pData[i]._embedded['wp:featuredmedia']) {
				var wpTitle = pData[i].title.rendered;
				var wpContent = pData[i].content.rendered;
			var wpBild = pData[i]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
			var frag_json = pData[i]._embedded['wp:featuredmedia'][0];
			var wpCaption = frag_json.caption.rendered;
			var wpFeaturedmediaTitle = frag_json.title.rendered;

			var navigationMenu = ''; // Ett script så att navigationsmenyn skapas på html sidan
			navigationMenu += '<li class="button">';
			navigationMenu += '<a id="nav' + articleId + '"';
			navigationMenu += 'href="#' + 'article' + articleId + '">';
			navigationMenu += wpTitle + '</a>';
			navigationMenu += '</li>';
			$('.ulnav').append(navigationMenu); // Här appenderas (sätter sig in) .ulnav till navigationsmenyn

			$("a").mouseover(function(){  // Ett script för att få en mouseover effekt
        $(this).css("background-color", "yellow"); // Här ändras färgen till gul
				$(this).css("text-decoration", "underline"); // Här får den även en underline
				$(this).css("font-size", "18px"); // Här ändras font-sizen till 18px
    });
		$("a").mouseout(function(){ // När man tar bort musen från a så ändras allt till föregående status
        $(this).css("background-color", "transparent"); // Den tar bort background-color från gul till transparent
				$(this).css("text-decoration", "none"); // Den tar bort underline
				$(this).css("font-size", "16px"); // Den ändrar från 18px till 16px
    });

			$('nav a').on('click', function(event){
				event.preventDefault(); // Tar bort #post3 till exempel. Den tar bort html reglerna med knappar
				var artLoc = this.hash;
				console.log('this href: ' + artLoc);

				$('html, body').animate({ // Animation för scroll (knapp)
					scrollTop: $(artLoc).offset().top
				})
			});

// Här skapas html taggarna genom Javascript, wordpress variablarna skapas också här
			var wpHTML = '';
			wpHTML += '<figure>';
			wpHTML += '<img class="imgSizer" src="' + wpBild + '">';
			wpHTML += '<figcaption class="imgSizerText">' + '<h2>' +wpFeaturedmediaTitle + '</h2>' + wpCaption + '</figcaption>';
			wpHTML += '</figure>';
			wpHTML += '<article class="artClass" id="' + 'article' + articleId + '">';
			wpHTML += '<h1>' + wpTitle + '</h1>';
			wpHTML += wpContent;
			wpHTML += '</article>';
			wpHTML += '<hr>';
			$('.content').append(wpHTML); // Så som .ulnav tidigare, skapas även här .content inuti wpHTML
			}
		}
	}

	});
})(jQuery)
