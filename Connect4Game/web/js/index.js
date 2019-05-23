$(document).ready(function(){

		//global variables 

		//initialize trackers 
 		var clicked_cells1 = [];
 		var clicked_cells2 = [];

 		//initialize players
 		var player_turn = 0;
 		var new_level;


 		//get reference to the game canvas
 		var game_canvas =  $("#game_canvas");

 		var filled_column_tracker;  



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
	 				table_row += '<td> <div id="r' + row + 'c' + col + '" class="coin_cell colorWarmBg"></div></td>';
	 				col ++;
	 			}

	 			//end a row
	 			table_row += '</tr>'; 
	 			game_canvas.append(table_row);
	 			row++;
	 		}
		}


		//find diagonal connections
		function scanForDiagonalConnections(clicked_cells, player){

			clicked_cells.forEach(function(item, index, array) {

				var row_num_str = item[0];
				var col_num_str = item[1];
				var row_num = parseInt(row_num_str);
				var col_num = parseInt(col_num_str);

				connected_elements = 1; // this item is connected to itself

				
				//in a diagonal connection, the row and column can both increase by 1 (or decrease, depending on view)
				while(row_num < 6 && col_num < 7){

					row_num = row_num + 1;
					col_num = col_num + 1;
					var check_for = row_num.toString() + col_num.toString();

					if(clicked_cells.includes(check_for)){
						connected_elements = connected_elements + 1;
						if(connected_elements == 4){
							gameOver(player, "4 coins diagonally connected");  
						}
					}else{
						break; // the chain is broken 
					}


				}

				/************  OR **************** CASE 2 ******************/
				//re initialize 
				var row_num = parseInt(row_num_str);
				var col_num = parseInt(col_num_str);

				connected_elements = 1; // this item is connected to itself

				//in a diagonal connection, the row can increase while the column decrease by 1 (or viceversa, depending on view)
				while(row_num > -1 && col_num < 7){

					row_num = row_num - 1;
					col_num = col_num + 1;
					var check_for = row_num.toString() + col_num.toString();

					if(clicked_cells.includes(check_for)){
						connected_elements = connected_elements + 1;
						if(connected_elements == 4){
							gameOver(player, "diagonally connected");  
						}
					}else{
						break; // the chain is broken 
					}


				}


			  	
			});

			

			
			
		}

		
		//find vertical connections
		function scanForVerticalConnection(clicked_cells, player){


			clicked_cells.forEach(function(item, index, array) {

				var row_num_str = item[0];
				var col_num_str = item[1];
				var row_num = parseInt(row_num_str);

				connected_elements = 1; // this item is connected to itself

				// in a vertical connection, the col stays the same, the row decreases (or increases, depending on view point)
				while(row_num > -1){

					row_num = row_num - 1;
					var check_for = row_num.toString() + col_num_str;

					if(clicked_cells.includes(check_for)){
						connected_elements = connected_elements + 1;
						if(connected_elements == 4){
							gameOver(player, "4 coins vertically connected");  
						}
					}else{
						break; // the chain is broken 
					}


				}

			  	
			});


			
			
		}

		//find horizontal connections
		function scanForHorizontalConnection(clicked_cells, player){

			clicked_cells.forEach(function(item, index, array) {

				var row_num_str = item[0];
				var col_num_str = item[1];
				var col_num = parseInt(col_num_str);

				connected_elements = 1; // this item is connected to itself

				// in a horizontal connection, the row stays the same, the col increases (or decreases, depending on view point)
				while(col_num < 7){

					col_num = col_num + 1;
					var check_for = row_num_str + col_num.toString();

					if(clicked_cells.includes(check_for)){
						connected_elements = connected_elements + 1;
						if(connected_elements == 4){
							gameOver(player , "4 coins connected horizontally");  
						}
					}else{
						break; // the chain is broken 
					}


				}






			});

			
			
		}


		//shows winner
		function gameOver(player, msg){
			if (player != 3 ) {
				alert("PLAYER " +  player + " wins : " + msg);
			
			} else {
				alert("It's a draw : GAME OVER");
			}
			reset();
		}


		//resets everything
		function reset(){
			clicked_cells1 = [];
 			clicked_cells2 = [];

 			//initialize players
 			if(player_turn == 0 || player_turn == 2){
 			 	player_turn = 1;
				$("#instructions").removeClass("colorDarkPurpleBg");
				$("#instructions").addClass("darkerGoldenYellowBg");
				$("#instructions").text("Player 1's Turn");

 			}else{
 				player_turn = 2;
 				$("#instructions").removeClass("darkerGoldenYellowBg");
				$("#instructions").addClass("colorDarkPurpleBg");
				$("#instructions").text("Player 2's Turn");

 			}

 			new_level = true;

 			 //initialize the canvas
 			game_canvas.empty(); 

 			initializeGameBoard(game_canvas);

 		
 			
		}

		


 		/**************** GAME PLAY ********************************/

 		//START GAME
 		reset();

 		//when user clicks a cell
 		$("#game_canvas").on("click", '.coin_cell', function(){

 			if(new_level){
 				new_level = false;
 				//initialize with a 5 (for 0-5 ie. 6 rows, with 5 being the bottom row) value for 7 (columns) elements
 			 	filled_column_tracker = [5, 5, 5, 5, 5, 5, 5];  
 			}
 			



 		

 			var clicked_cell_id = this.id;				// expecting an id of form e.g. r1c1  
 			var clicked_column_str  = clicked_cell_id[3];   // get the very last character, which will be column number
 			var row_to_fill = filled_column_tracker[clicked_column_str];
 			var cell_to_fill    = 'r' +  row_to_fill + 'c' + clicked_column_str;
 			var row_to_fill_str = row_to_fill.toString();
 			var cell_to_fill_only_numbers = row_to_fill_str + clicked_column_str;
 			

 		

 			// fill this cell
			$("#" + cell_to_fill).removeClass("colorWarmBg");

			if(player_turn == 1){
				$("#" + cell_to_fill).addClass("goldenYellowBg"); 
				clicked_cells1.push(cell_to_fill_only_numbers); 

				if(clicked_cells1.length > 3){
				scanForDiagonalConnections(clicked_cells1, player_turn);
				scanForVerticalConnection(clicked_cells1, player_turn);
				scanForHorizontalConnection(clicked_cells1, player_turn);
				}


				player_turn = 2; // change player turn
				$("#instructions").removeClass("darkerGoldenYellowBg");
				$("#instructions").addClass("colorDarkPurpleBg");
				$("#instructions").text("Player 2's Turn");


			}else{
				$("#" + cell_to_fill).addClass("colorDarkPurpleBg");
				clicked_cells2.push(cell_to_fill_only_numbers); 

				if(clicked_cells2.length > 3){
				scanForDiagonalConnections(clicked_cells2, player_turn);
				scanForVerticalConnection(clicked_cells2, player_turn);
				scanForHorizontalConnection(clicked_cells2, player_turn);
				}


				player_turn = 1; // change player turn
				$("#instructions").removeClass("colorDarkPurpleBg");
				$("#instructions").addClass("darkerGoldenYellowBg");
				$("#instructions").text("Player 1's Turn");
			}
			
		

			filled_column_tracker[clicked_column_str]   = filled_column_tracker[clicked_column_str] - 1 //decrement row position 
 			if(filled_column_tracker[clicked_column_str] == -1){
 				i = 0;
 				while(i<7){
 					if(filled_column_tracker[i] != -1)
 						break;
 					i++;
 				}
 				if(i == 7)
 					gameOver(3); // 3 means both players loose 
 				
 			}

			

			

 			

 		});




 		// when reset is clicked 
 		$("#reset").on('click', function(){

 			reset();
 		});





 		
 		
 			

});

