// Taken from
// https://github.com/evgeni/qifi
// Author: Evgeni Golov
// MIT License
function escape_string (string) {
		var to_escape = ['\\', ';', ',', ':', '"'];
		var hex_only = /^[0-9a-f]+$/i;
		var output = "";
		for (var i=0; i<string.length; i++) {
				if($.inArray(string[i], to_escape) != -1) {
						output += '\\'+string[i];
				}
				else {
						output += string[i];
				}
		}
		if (hex_only.test(output)) {
				output = '"'+output+'"';
		}
		return output;
};
        
function generate() {

		var Litecoin = $('#Litecoin').val();
		var address = $('#address').val();
		var scan = $('#scan').val();
		var key = $('#key').val();

		var qrstring = escape_string(address);

		$('.print .Litecoin .text').text(Litecoin);
		$('.print .key .text').text(key);

		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width: 500,
			height: 500,
			text: qrstring
		});
		
		$('.print .address .text').text(address);
		$('.print .scan .text').text(scan);

		var imageData = document.getElementsByTagName("canvas")[0].toDataURL("image/png",1);
		$('#download .Litecoin .text').text(Litecoin);
		$('#download .key .text').text(key);
		$('#download .address .text').text(address);
		$('#download .scan .text').text(scan);

		$('#qrcodeimg img').attr("src",imageData);
		var canvasSource = document.getElementById('download');
		$('#download').css({display:'block'})
		html2canvas(canvasSource).then((canvas) => {
			 //! MAKE YOUR PDF
			 $('#download').css({display:'none'})
			 var pdf = new jsPDF('p', 'pt', 'letter');
	 
			 for (var i = 0; i <= canvasSource.clientHeight/980; i++) {
				 //! This is all just html2canvas stuff
				 var srcImg  = canvas;
				 var sX      = 0;
				 var sY      = 980*i; // start 980 pixels down for every new page
				 var sWidth  = 900;
				 var sHeight = 980;
				 var dX      = 0;
				 var dY      = 0;
				 var dWidth  = 900;
				 var dHeight = 980;
	 
				 window.onePageCanvas = document.createElement("canvas");
				 onePageCanvas.setAttribute('width', 900);
				 onePageCanvas.setAttribute('height', 980);
				 var ctx = onePageCanvas.getContext('2d');
				 // details on this usage of this function: 
				 // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
				 ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);
	 
				 // document.body.appendChild(canvas);
				 var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
	 
				 var width         = onePageCanvas.width;
				 var height        = onePageCanvas.clientHeight;
	 
				 //! If we're on anything other than the first page,
				 // add another page
				 if (i > 0) {
					 pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
				 }
				 //! now we declare that we're working on that page
				 pdf.setPage(i+1);
				 //! now we add content to that page!
				 pdf.addImage(canvasDataURL, 'PNG', -10, 30, (width*.62), (height*.62));
	 
			 }
			 //! after the for loop is finished running, we save the pdf.
			 pdf.save('Litecoin.pdf');
	   });
};


