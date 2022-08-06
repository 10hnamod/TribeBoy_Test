   	<script>
		/**
		 * Determine the mobile operating system.
		 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
		 *
		 * @returns {String}
		 */
		function getMobileOS() {
			var e = navigator.userAgent || navigator.vendor || window.opera;
            return /android|Android/i.test(e) ? "android" : /iPad|iPhone|iPod|Macintosh/.test(e) && !window.MSStream ? "iOS" : "android";
		}
   			
   		var clickTag = "https://play.google.com/store/apps/details?id=com.balance.redball";
   		if (getMobileOS()=="iOS"){
   			clickTag = "https://apps.apple.com/us/app/cooking-rush-restaurant-game/id1623992858";
   		}
   		{/* window.failedIndex = 0; */}
		   window.playsound = true;
		window.openStore = function() {
			mraid.open(clickTag);
		}
	</script>  