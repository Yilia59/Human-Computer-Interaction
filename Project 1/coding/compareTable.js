var arrayA = new Array();                                    //Creating the first array for the table (tableA)   
var arrayB = new Array();                                    //Creating the second array for the table (tableB)
var arrayCompare = new Array();                              //Creating an array which is used to store values and compare tableA with tableB
var rowA,rowB, colA,colB;                                    //Creating variables to store the values in the cells of tableA and tableB

//Creating an array which contains 50 abbreviations; One for each city in the U.S.
var arrayCity = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

/*************************************************************************************
Function:  getValue()
Arguments: N/A
Returns:   Random assortment of state abbreviations if table size is permitted. If table size exceeds min and max, an alert is displayed.
Purpose:   Upon click, this function empties the contents of tableA and tableB and uses user input to set the size of each table. 
		   The function then fills the tables with abbreviations of state names from arrayCity() in random order.
Notes:     The minimum table size is 1x1 while the maximum table size is 15x15
*****************************************************************************************/
function getValue() {
	$('#here_tableA').empty();                               //Empty contents from Table A
		$('#here_tableB').empty();                           //Empty contents from Table B
		
	rowA = document.getElementById("rowA").value;            //Store the user input for the number of rows in Table A
	colA = document.getElementById("columnA").value;         //Store the user input for the number of columns in Table A
	rowB = document.getElementById("rowB").value;            //Store the user input for the number of rows in Table B
	colB = document.getElementById("columnB").value;         //Store the user input for the number of columns in Table B
	
	if(rowA > 15 || rowB > 15 || colA > 15 || colB > 15 || rowA <= 0 || rowB <= 0 || colA <= 0 || colB <= 0 ){           //Test for table size requirements
		alert("The minimum table size is 1*1 \n The maximum table size is 15*15 \n\n Please Enter Again!!!");           //Display alert to user if table requirements are not met
	}
	else{	                                                                                                            //If table size requirements are met
			var resultA = "<table border=1>";                                                                           //Set border size for Table A
			resultA += "<tr>";                                                                                          //Establish rows for Table A
			for (var i=0; i<rowA; i++){                                                                                 //Nested for loops will fill the cells of Table A with random assortment of abbreviations
				arrayA[i] = new Array(colA);
				for (var j=0;j<colA;j++){
					arrayA[i][j] = arrayCity[Math.floor(Math.random() * arrayCity.length)];                             //Generate random assortment of abbreviations from arrayCity() and store in two-dimensional array arrayA
					resultA += "<td>" + arrayA[i][j] + "</td>";                                                         //
					if ((j + 1) % colA == 0) {                                                                          //
						resultA += "</tr><tr>";                                                                         //
					}	
				}
			}
			resultA += "</tr>";                                                                                         //Close off rows when finished
			resultA += "</table>";                                                                                      //Close off table when finished
			
			var resultB = "<table border=1>";                                                                           //Set border siz for Table B
				resultB += "<tr>";                                                                                      //Establish rows for Table B 
				for (var i=0; i<rowB;i++){                                                                              //Nested for loops will fill the cells of Table B with random assortment of abbreviations
					arrayB[i] = new Array(colB);
					for (var j=0;j<colB;j++){
						arrayB[i][j] = arrayCity[Math.floor(Math.random() * arrayCity.length)];                         //Generate random assortment of abbreviations from arrayCity() and store in two-dimensional array arrayB
						resultB += "<td>" + arrayB[i][j] + "</td>";                                                     //
						if ((j + 1) % colB == 0) {                                                                      //
							resultB += "</tr><tr>";                                                                     //
						}	
					}
				}
				resultB += "</tr>";                                                                                     //Close off rows when finished 
				resultB += "</table>";                                                                                  //Close off table when finished
			
			$('#here_tableA').append(resultA);                                                                          //
			$('#here_tableB').append(resultB);                                                                          //
	}	
}

/*******************************************************************************************************************************************************
Function:  selectA() 
Arguments: N/A
Purpose:   This function allows the table cells of Table A and Table B to react to user clicks by highlighting itself and all other cells (if any) that contain identical information
Notes:     Upon click, the clicked cell will highlight as well as any identical cells from the same table and the opposite table
********************************************************************************************************************************************************/
 function selectA(){
	var colIndexA, rowIndexA, colIndexB, rowIndexB;                                           //initialize variables used by the click
	var count = 0;                                                                            //
	/********************** tableA highlight*************************/
	//$('td').click(function () {                                                             //
		colIndexA = $(this).parent().children().index($(this));                               //Store the column position from Table A
		rowIndexA = $(this).parent().parent().children().index($(this).parent());             //Store the row position from Table A
		colIndexB = $(this).parent().children().index($(this));                               //Store the column position from Table B
		rowIndexB = $(this).parent().parent().children().index($(this).parent());             //Store the row position from Table B
	//})

	$("#here_tableA:has(td)").click(function(e) {                                             //
		
	 $("#here_tableA td").removeClass("item-1");
	 $("#here_tableB td").removeClass("item-1");
	 var clickedCellA= $(e.target).closest("td");
	 clickedCellA.addClass("item-1");
	
	 var selectedValA = clickedCellA[0].innerText;
	
	$('#here_tableB td').each(function () {
		if($(this).text()==selectedValA){
			$(this).addClass("item-1");
		}
	})
	$('#here_tableA td').each(function () {
			if($(this).text()==selectedValA){
				$(this).addClass("item-1");
			}
		})
})
	

	/********************** tableB highlight*************************/

	$("#here_tableB:has(td)").click(function(e) {
	 $("#here_tableA td").removeClass("item-1");
	 $("#here_tableB td").removeClass("item-1");
	 var clickedCellB= $(e.target).closest("td");
	 clickedCellB.addClass("item-1");
	

	var selectedValB = clickedCellB[0].innerText;
	
	$('#here_tableA td').each(function () {
		if($(this).text()==selectedValB){
			$(this).addClass("item-1");
		}
	})
	$('#here_tableB td').each(function () {
			if($(this).text()==selectedValB){
				$(this).addClass("item-1");
			}
		})
	})	
}


