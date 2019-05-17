$(document).ready(function(){

		//global variables 

		//initialize trackers 
 		var clicked_cells1 = [];
 		var clicked_cells2 = [];

 		//initialize players
 		var player_turn = 1;



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
		function scanForDiagonalConnectionsDesc(clicked_cells, player){


			clicked_cells.forEach(function(item, index, array) {

				var r = item[0];
				var c = item[1];
				var r_num = parseInt(r);
				var c_num = parseInt(c);

				var line_length = 0;				
				var decrease_r = r_num - 1;
				var decrease_c = c_num - 1;
				var increase_r = r_num + 1;
				var increase_c = c_num + 1;
				while(decrease_r > -1 && decrease_c > -1 && increase_r < 6 && increase_c < 7){
				
				var check_for = decrease_r.toString() + decrease_c.toString()
				var check_for2 =  increase_r.toString() + increase_c.toString()

				var break_out = 1;
				if(clicked_cells.includes(check_for)) {
					break_out = 0;
					line_length = line_length + 1;
					if(line_length == 3)
						gameOver(player); // this player wins 
				}
				if(clicked_cells.includes(check_for2)){
					break_out = 0;
					line_length = line_length + 1;
					if(line_length == 3)
						gameOver(player); // this player wins 
				}
				if(break_out == 1){
					break;
				}else{
					decrease_r--;
					decrease_c--;
					increase_r++;
					increase_c++;
				}

			}

			  	
			});


			
			
		}

		//find diagonal connections
		function scanForDiagonalConnectionsAsc(clicked_cells, player){


			clicked_cells.forEach(function(item, index, array) {

				var r = item[0];
				var c = item[1];
				var r_num = parseInt(r);
				var c_num = parseInt(c);

				var line_length = 0;				
				var decrease_r = r_num - 1;
				var decrease_c = c_num - 1;
				var increase_r = r_num + 1;
				var increase_c = c_num + 1;
				while(decrease_r > -1 && decrease_c > -1 && increase_r < 6 && increase_c < 7){
				
				var check_for = decrease_r.toString() + increase_c.toString()
				var check_for2 =  increase_r.toString() + decrease_c.toString()

				var break_out = 1;
				if(clicked_cells.includes(check_for)) {
					break_out = 0;
					line_length = line_length + 1;
					if(line_length == 3)
						gameOver(player); // this player wins 
				}
				if(clicked_cells.includes(check_for2)){
					break_out = 0;
					line_length = line_length + 1;
					if(line_length == 3)
						gameOver(player); // this player wins 
				}
				if(break_out == 1){
					break;
				}else{
					decrease_r--;
					decrease_c--;
					increase_r++;
					increase_c++;
				}

			}

			  	
			});
			
		}


		//find vertical connections
		function scanForVerticalConnections(clicked_cells, player){


			clicked_cells.forEach(function(item, index, array) {

				var r = item[0];
				var c = item[1];
				var r_num = parseInt(r);
				var c_num = parseInt(c);

				var line_length = 0;			
				var decrease_r = r_num + 1;
				while(decrease_r > -1){
				
				var check_for = decrease_r.toString() + c;
				var break_out = 1;
				if(clicked_cells.includes(check_for)) {
					break_out = 0;
					line_length = line_length + 1;
					if(line_length == 3)
						gameOver(player); // this player wins 
				}
				if(break_out == 1){
					break;
				}else{
					decrease_r--;
				}

			}

			  	
			});


			
			
		}

		//find vertical connections
		function scanForHorizontalConnections(clicked_cells, player){


			clicked_cells.forEach(function(item, index, array) {

				var r = item[0];
				var c = item[1];
				var r_num = parseInt(r);
				var c_num = parseInt(c);

				var line_length = 0;		
				var decrease_c = c_num - 1;
				var increase_c = c_num + 1;
				while(decrease_c > -1 && increase_c < 7){
				
				var check_for = r + increase_c.toString()
				var check_for2 =  r + decrease_c.toString()

				var break_out = 1;
				if(clicked_cells.includes(check_for)) {
					break_out = 0;
					line_length = line_length + 1;
					if(line_length == 3)
						gameOver(player); // this player wins 
				}
				if(clicked_cells.includes(check_for2)){
					break_out = 0;
					line_length = line_length + 1;
					if(line_length == 3)
						gameOver(player); // this player wins 
				}
				if(break_out == 1){
					break;
				}else{
					decrease_c--;
					increase_c++;
				}

			}

			  	
			});


			
			
		}

		//shows winner
		function gameOver(player){
			if (player != 3 ) {
				alert(player + "wins : GAME OVER");
			} else {
				alert("It's a draw : GAME OVER");
			}
		}

		


 		//get reference to the game canvas
 		var game_canvas =  $("#game_canvas");

 		
 		//initialize the canvas
 		initializeGameBoard(game_canvas);

 		var filled_column_tracker = [5, 5, 5, 5, 5, 5, 5];  //initialize with a 5 (for 0-5 ie. 6 rows) value for 7 (columns) elements  


 		

 		//when user clicks a cell
 		$('.coin_cell').on('click', function(){

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

				scanForDiagonalConnectionsDesc(clicked_cells1, player_turn);
				scanForDiagonalConnectionsAsc(clicked_cells1, player_turn);
				scanForVerticalConnections(clicked_cells1, player_turn);
				scanForHorizontalConnections(clicked_cells1, player_turn);


				player_turn = 2; // change player turn
				$("#instructions").text("Player 2's Turn");


			}else{
				$("#" + cell_to_fill).addClass("colorDarkPurpleBg");
				clicked_cells2.push(cell_to_fill_only_numbers); 

				scanForDiagonalConnectionsDesc(clicked_cells2, player_turn);
				scanForDiagonalConnectionsAsc(clicked_cells2, player_turn);
				scanForVerticalConnections(clicked_cells2, player_turn);
				scanForHorizontalConnections(clicked_cells2, player_turn);


				player_turn = 1; // change player turn

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





 		
 		
 			

});

