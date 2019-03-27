// hide to make show up page smoother  //
$("body").hide().fadeIn(2000);
$(".drawing").hide();
$("#overlay").hide();

//  shadow scroll animate //
$(window).scroll(function(){
	$(".animate").css("animation","mymove 5s forwards");
});

//  loop each content to add animation //
$(".animate").each(function(i){
  $(".animate").eq(i).click(function(){
	  $(".animate").eq(i).css("animation","mymove02 3s forwards");
	  if (i == 1) {
	  	$(".drawing").fadeIn("slow");
	  	$("#overlay").show();
	  }
  });
});

// hide overlay background //
$("#overlay").click(function(){
	$("#overlay").hide();
	$(".drawing").hide();
})

// interactive page //
function switchPage(id, child){
	id.click(function(){
		$(".hiding").hide();
		$(".navbar li").removeClass("active-nav");
		$(".navbar li").eq(child).addClass("active-nav");
		$(".hiding").eq(child).fadeIn(2000);
	});
}

// invoke switchPage //
switchPage($("#about"), 0);
switchPage($("#project"), 1);
switchPage($("#timeline"), 2);


// drawing app //
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $("canvas")[0].getContext("2d");
var lastEvent;
var mouseDown = false;


//When clicking on control list items
$(".controls").on("click", "li", function(){
   //Deselect siblingelements
  $(this).siblings().removeClass("selected");

  //Select clicked element
  $(this).addClass("selected");

  //cache current color
  color = $(this).css("background-color");
});



//When add color is pressed
$("#revealColorSelect").click(function() {
  //Show color select or hide the color select
  $("#colorSelect").slideToggle(1000);
});

//Update the new color span
function changeColor() {
 var r = $("#red").val();
 var g = $("#green").val();
 var b = $("#blue").val();
 var a = $("#alpha").val();
 $("#newColor").css("background-color", "rgba(" + r +  "," + g + "," + b + "," + a/100 +")");
}

//When color sliders change
 $("input[type=range]").change(changeColor);


//When add color is pressed
$("#addNewColor").click(function(){
   //Append the color to the control ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});


//On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //Draw lines
  if(mouseDown){
    if (color == "rgb(255, 255, 255)") {
      context.clearRect(e.offsetX- 50, e.offsetY - 50, 100, 100);
    }else{
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
