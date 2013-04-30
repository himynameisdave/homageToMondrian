

function init()	{
	
	//	Ref the canvas now that the document has been initialized
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	
	//	Let's fill the canvas with a white background.
	ctx.fillStyle = "#fff";
	ctx.fillRect(0,0,800,500);
	
	//	Bind a click event to the button.
	$("#paintBtn").click('click', paintIt);

};//	End of init function;




////	Despite it's name, this function doesnt do any painting but instead some calulations
function		paintIt()		{
		
	//	ref the selected dropdown option
		var selectedOption = $("#dropdown option:selected").text();   
		
		switch(selectedOption){
		
		case "3 rows  x  4 columns":	
			widthDivider = 4;
			heightDivider = 3;
			gridCount = widthDivider * heightDivider;
			wOffsetMultiplier = 100;
			hOffsetMultiplier = 62.5;
			calcDimentions();
		break;
		
		case "4 rows  x  5 columns":	
			widthDivider = 5;
			heightDivider = 4;
			gridCount = widthDivider * heightDivider;
			wOffsetMultiplier = 75;
			hOffsetMultiplier = 46.875;
			calcDimentions();
		break;
		
		case "5 rows  x  6 columns":	
			widthDivider = 6;
			heightDivider = 5;
			gridCount = widthDivider * heightDivider;
			wOffsetMultiplier = 50;
			hOffsetMultiplier = 31.25;
			calcDimentions();
		break;
		
		case "6 rows  x  7 columns":	
			widthDivider = 7;
			heightDivider = 6;
			gridCount = widthDivider * heightDivider;
			wOffsetMultiplier = 25;
			hOffsetMultiplier = 15.625;
			calcDimentions();
		break;
		
		};//	End of switch statement
	
};//	End of paintIt function




////	This is a function that is set out to calculate each of the widths/heights
function 	calcDimentions()	{
	
	widthsArray = new Array();
	
	heightsArray = new Array();
	
	for(i=0; i < widthDivider; i++){
	
		widthsArray[i] = (fullWidth/widthDivider);
				
	}
	
	for(i=0; i < heightDivider; i++){
	
		heightsArray[i] = (fullHeight/heightDivider);
		
	}
	
	for(i = 0; i < widthsArray.length; i++){
		
		offset = Math.floor(Math.random() * wOffsetMultiplier) + 1;
		
		if(oldRandomIndex != null){
		
			randomIndex = Math.floor(Math.random() * widthsArray.length);
		
		}else{
			
			randomIndex = newRandomIndex(oldRandomIndex,randomIndex,widthsArray.length);
			
		};
		
		widthsArray[randomIndex] = widthsArray[randomIndex] + offset;
		
		oldRandomIndex = randomIndex;
		
		randomIndex = newRandomIndex(oldRandomIndex,randomIndex,widthsArray.length);
		
		widthsArray[randomIndex] = widthsArray[randomIndex] - offset;
		
	};
	
	oldRandomIndex = null;
	
	for(i = 0; i < heightsArray.length; i++){
		
		offset = Math.floor(Math.random() * hOffsetMultiplier) + 1;
		
		if(oldRandomIndex != null){
		
			randomIndex = Math.floor(Math.random() * heightsArray.length);
		
		}else{
			
			randomIndex = newRandomIndex(oldRandomIndex,randomIndex,heightsArray.length);
			
		};
		
		heightsArray[randomIndex] = heightsArray[randomIndex] + offset;
		
		oldRandomIndex = randomIndex;
		
		randomIndex = newRandomIndex(oldRandomIndex,randomIndex,heightsArray.length);
		
		heightsArray[randomIndex] = heightsArray[randomIndex] - offset;
				
	};
	
	fillTheGrid();
	
	vertLinePainter();
	horizLinePainter();
	
};




////		Small function to take care of picking a new random index number...
////		three paramaters, all data from the original function
function	newRandomIndex(oldIndex,rIndex,arrLength)	{
	
	while(oldIndex == rIndex){
			
		rIndex = Math.floor(Math.random() * arrLength);
			
	};
	
	return rIndex;
	
};



////		Handles drawing out our initial lines.
function	vertLinePainter()		{
	
	var dimentionAdder = 0
	
	var strokeWidth = new Array();
		
	for(i=0; i < widthsArray.length; i++){
		
		dimentionAdder += widthsArray[i];
		
		strokeWidth[i] = ((Math.floor(Math.random() * 6) + 1) * 2) - 1;
		
		if(i > 0){
			
			for(j = 0; j < i; j++){
			
				while(strokeWidth[i] == strokeWidth[j]){
					
					strokeWidth[i] = ((Math.floor(Math.random() * 6) + 1) * 2) - 1;
					
				};
			};
		};
		
		ctx.beginPath();
		ctx.moveTo(dimentionAdder,0);
		ctx.lineTo(dimentionAdder,500);
		ctx.lineWidth = strokeWidth[i];
		ctx.closePath();
		ctx.stroke();
		
	};
		
};//	End of vertLinePainter()



function		horizLinePainter()		{
	
	var dimentionAdder = 0;
	
	var strokeWidth = new Array();
		
	for(i=0; i < heightsArray.length; i++){
		
		dimentionAdder += heightsArray[i];
		
		strokeWidth[i] = ((Math.floor(Math.random() * 7) + 1) * 2) - 1;
		
		if(i > 0){
			
			for(j = 0; j < i; j++){
			
				while(strokeWidth[i] == strokeWidth[j]){
					
					strokeWidth[i] = ((Math.floor(Math.random() * 7) + 1) * 2) - 1;
					
				};
			};
		};
		
		ctx.beginPath();
		ctx.moveTo(0,dimentionAdder);
		ctx.lineTo(800,dimentionAdder);
		ctx.lineWidth = strokeWidth[i];
		ctx.closePath();
		ctx.stroke();
		
	};
	
};//	End of horizLinePainter()




////	This next function produces an array, that is the length of the number of rectangles in the grid,
////	which are all boolean values determining if a rectangle is to be colored or not. It uses a shuffle
////	component to ease this process:
function	isItColored()		{
	
	//	Local variable used to store the exact number of filled squares on the grid
	var filledSquares = Math.round(gridCount * 0.25);
		
	//	This is a global variable, although we want to reset the array each time, thus this:
	isColored = new Array();
	
	//	Loop through all of the items in the grid
	for(i=0; i < gridCount; i++){
		
		//	Sets the first 25% to 'true'
		if(i <= filledSquares){
			
			isColored[i] = true;
					
		}else if(i > filledSquares){
		
		//	Sets the rest to 'false'
			isColored[i] = false;
			
		};
	
	};
	
	//	Now we shuffle them!
	for(i=0; i < 10000; i++){
		
		var x = Math.floor(Math.random() * isColored.length);
		var y = Math.floor(Math.random() * isColored.length);
		var holder = isColored[x];
		
		isColored[x] = isColored[y];
		
		isColored[y] = holder;
		
	};
		
};///	Ends the is it colored function




////	We need a function that is able to store which, if any, of the colours checkboxes are checked.
////	This is accomplished in a very simple way:
function	colorsChecked()		{
	
	var iCount = 0;
	colorsChosen = new Array();
	
	if($("#blue").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.blue;
		iCount = iCount + 1;
		
	};
	if($("#red").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.red;
		iCount = iCount + 1;
		
	};
	if($("#yellow").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.yellow;
		iCount = iCount + 1;
		
	};
	if($("#green").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.green;
		iCount = iCount + 1;
		
	};
	if($("#pink").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.pink;
		iCount = iCount + 1;
		
	};
	if($("#violet").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.violet;
		iCount = iCount + 1;
		
	};
	if($("#grey").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.grey;
		iCount = iCount + 1;
		
	};
	if($("#navy").is(":checked")){
		
		colorsChosen[iCount] = colorIndex.navy;
		iCount = iCount + 1;
		
	};
	if(colorsChosen[0] == undefined){
		
		colorsChosen[0] = "#fff";
		
	};
	
};//	End of the colorsChecked function




////		fillTheGrid is the actual-factual drawing function. It puts everything together like so:

function		fillTheGrid()		{
	
	//	To start, let's call those two functions:
	//	To tell us which cells are coloured:
	
	isItColored();
	//	To tell us which colors are available:
	colorsChecked();
	
	var xPos = 0;
	var yPos = 0;
	var indexer = 0;
	var randColor;
	
	//	This first loop goes through each COLUMN
	for(i=0; i < widthDivider; i++){
		
		yPos = 0;
		
	//	This next loop goes through each ROW
		for(j=0; j < heightDivider; j++){
			
			//	Only if there is actually a color that has been checked do we pick a random color:
			if(colorsChosen[0] != undefined){
								
				randColor = Math.floor(Math.random() * colorsChosen.length);
				
			};
			
			//	If the current cell is to be colored, let the color be randomly selected from the bunch
			if(isColored[indexer] == true){
				
				ctx.fillStyle = colorsChosen[randColor];
				
			}
			//	Otherwise, fill it with white:
			else if(isColored[indexer] == false){
				
				ctx.fillStyle = "#fff";
			
			}
			
			//	Actually draws the rectangle. Pretty awesome.
			ctx.fillRect(xPos,yPos,widthsArray[i],heightsArray[j]);
			
			//	Now we must change some things for next time:
			yPos += heightsArray[j];
			
			indexer += 1;
			
		};//	End of row loop
		
		//	Now we must change some things for next time:
		xPos += widthsArray[i];
				
	};//	End of column loop
		
};



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
||||																												||||
||||										V	A	R	I	A	B	L	E	S										||||
||||																												||||
========================================================================================================================*/

//		The two most important variables, the canvas and canvas context.
var 	canvas;
var 	ctx;

//		These just happen to be the full dimentions of the canvas, as set in my css file.
var 	fullWidth	=	800;
var 	fullHeight	=	500;

//		These two arrays store all of the individual widths and heights of each individual square
var		widthsArray;
var		heightsArray;

//		How much are we going to divide each width/height dimention by?
var 	widthDivider;
var 	heightDivider;

//		Gridcount is the count of the number of rectangles in the grid:
var 	gridCount;

//		Used to pick a random array number
var 	randomIndex;

//		So that we know what the old index was
var 	oldRandomIndex;

//		Used to store the amount of offset is being applied.
var 	offset;
//		Used as a multiplier, different for each of the choices.
var 	offsetMultiplier;

//		This stores the actual color values.
var		colorIndex = new Object();
		colorIndex.blue 	= "#0514F0";
		colorIndex.red 		= "#EB2F38";
		colorIndex.yellow 	= "#F6FF00";
		colorIndex.green 	= "#119E3C";
		colorIndex.pink 	= "#F2277C";
		colorIndex.violet 	= "#96298D";
		colorIndex.grey 	= "#8C8C8C";
		colorIndex.navy 	= "#202775";

//		This soon to be Array will let us know which rectangles are to be coloured:
var		isColored;

//		This also soon to be array stores the selected colours:
var		colorsChosen;


$(document).ready(init);