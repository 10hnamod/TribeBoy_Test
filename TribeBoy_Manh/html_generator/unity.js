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
   			
		var clickTag = "https://play.google.com/store/apps/details?id=com.one.m2.world";
   		if (getMobileOS()=="iOS"){
   			clickTag = "https://apps.apple.com/vn/app/id1617245942";
   		}
   		window.playsound = true; 

		window.openStore = function() {
			mraid.open(clickTag);
		}
	</script>  
	  <script type="text/javascript">
	// Wait for the SDK to become ready 
	if (mraid.getState() === 'loading') {
		mraid.addEventListener('ready', onSdkReady); 
	} else {
		onSdkReady();
	}
	function onSdkReady() {
	// Wait for the ad to become viewable for the first time
		if (mraid.isViewable()) {
			showMyAd(); 
		} else {
			mraid.addEventListener('viewableChange', function(viewable) {
				if (viewable) { 
					mraid.removeEventListener('viewableChange', arguments.callee);
					showMyAd();
				}
			}); 
		} 	
	}
	function showMyAd(){
		startGame();
	}

</script>