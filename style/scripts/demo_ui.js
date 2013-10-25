
function changeText( el, newText ) {
	// Safari work around
	if ( el.innerText ) {
		el.innerText = newText;
	} else if ( el.firstChild && el.firstChild.nodeValue ) {
		el.firstChild.nodeValue = newText;
	}
}


function toggleToc() {
	var tocmain = document.getElementById( 'toc' );
	var toc = document.getElementById('toc').getElementsByTagName('ul')[0];
	var toggleLink = document.getElementById( 'togglelink' );

	if ( toc && toggleLink && toc.style.display == 'none' ) {
		changeText( toggleLink, tocHideText );
		toc.style.display = 'block';
		document.cookie = "hidetoc=0";
		tocmain.className = 'toc';
	} else {
		changeText( toggleLink, tocShowText );
		toc.style.display = 'none';
		document.cookie = "hidetoc=1";
		tocmain.className = 'toc tochidden';
	}
}


function showTocToggle() {
	if ( document.createTextNode ) {
		// Uses DOM calls to avoid document.write + XHTML issues

		var linkHolder = document.getElementById( 'toctitle' );
		var existingLink = document.getElementById( 'togglelink' );
		if ( !linkHolder || existingLink ) {
			// Don't add the toggle link twice
			return;
		}

		var outerSpan = document.createElement( 'span' );
		outerSpan.className = 'toctoggle';

		var toggleLink = document.createElement( 'a' );
		toggleLink.id = 'togglelink';
		toggleLink.className = 'internal';
		toggleLink.href = 'javascript:toggleToc()';
		toggleLink.appendChild( document.createTextNode( tocHideText ) );

		outerSpan.appendChild( document.createTextNode( '[' ) );
		outerSpan.appendChild( toggleLink );
		outerSpan.appendChild( document.createTextNode( ']' ) );

		linkHolder.appendChild( document.createTextNode( ' ' ) );
		linkHolder.appendChild( outerSpan );

		var cookiePos = document.cookie.indexOf( "hidetoc=" );
		if ( cookiePos > -1 && document.cookie.charAt( cookiePos + 8 ) == 1 ) {
			toggleToc();
		}
	}
}



if (window.showTocToggle) { var tocShowText = "显示"; var tocHideText = "隐藏"; showTocToggle(); }



$(function(){

	if(window.top != window){
		$('#wrapper').css({
			borderColor:'#fff'
		})
	}
})