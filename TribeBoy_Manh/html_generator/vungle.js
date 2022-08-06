	<script>
		function getMobileOS() {
			var e = navigator.userAgent || navigator.vendor || window.opera;
            return /android|Android/i.test(e) ? "android" : /iPad|iPhone|iPod|Macintosh/.test(e) && !window.MSStream ? "iOS" : "android";		 
   			}
   		var clickTag = "https://play.google.com/store/apps/details?id=com.one.m2.world";
   		if (getMobileOS()=="iOS"){
   			clickTag = "https://apps.apple.com/vn/app/id1617245942";
   		}
   		{/* window.failedIndex = 0;  */}
		   window.playsound = true;
		window.openStore = function() {
			  parent.postMessage('complete','*');
			parent.postMessage('download','*');
		}

	</script>  