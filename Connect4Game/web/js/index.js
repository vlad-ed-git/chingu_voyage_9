$(document).ready(function(){


		// draws empty cells across the game board 
 		function initializeGameBoard(game_canvas) {
			//append 6 rows and seven cols
	 		var row = 0;
	 		while(row < 6){

	 			//start a row
	 			var table_row = '<tr>';
	 			var col = 0;
	 			while(col < 7){
	 				//append columns
	 				table_row += '<td id="r' + row + 'c' + col + '" > <div class="coin_cell colorWarmBg"></div></td>';
	 				col ++;
	 			}

	 			//end a row
	 			table_row += '</tr>'; 
	 			game_canvas.append(table_row);
	 			row++;
	 		}
		}



 		//get reference to the game canvas
 		var game_canvas =  $("#game_canvas");

 		initializeGameBoard(game_canvas);


 		
 		
 			

});

