// Constant values to be edited easily.
var MAX_DISPLAYED_VALUES = 100, // Max different values displayed on the chart.
	AGE_APPROX = 2; // Number of digits kept after the coma on the age approximation.

/* Called when the user selects a new column. */
function newData(){
	// Added a test to avoid a query on the selection of the empty option.
	if( $("#selector option:selected").text() !== " " ){
		$.ajax({	type : 'POST',
					datatype: "JSON",
					url : "execute.php",
					data : { col:  '"'+ $("#selector option:selected").text() + '"' },
					success : function(datas){
						parseDatas(datas);
					}
				});
	}
}

/* Callback function of the query. */
function parseDatas( json ){
	var result = JSON.parse(json),
		data = [],
		i = 0,
		iMax = result.length,
		j = 0,
		tmp = undefined,
		rows = 0,
		values = 0,
		jMax = 0,
		found = false,
		display = [];
	
	// Count the number of each different values.
	for( i = 0; i < iMax; i++ ){
		// Here I remove empty lines.
		if( result[i]["data"] !== null ){
			jMax = data.length;
			found = false;
			for( j = 0; j < jMax; j++ ){
				// If the current value is already stored we add the informations.
				if( data[j][0] === result[i]["data"] ){
					data[j][1]++;
					data[j][2] += result[i]["age"];
					found = true;
					break;
				}
			}
			// If the value wasn't stored, we create a new data: [ name, count, age sum ]
			if( !found )
				data.push( [ result[i]["data"], 0, result[i]["age"] ] );
		}
	}

	// Sort the array.
	for( i = 0; i < data.length; i++ ){
		tmp = undefined;
		for( j = i; j < data.length; j++ ){
			if( data[j][1] > data[i][1] ){
				tmp = data[j];
				data[j] = data[i];
				data[i] = tmp;
			}
		}
	}

	// Update information values about the chart.
	iMax = data.length;
	if( data.length > MAX_DISPLAYED_VALUES ){
		// Keep the MAX_DISPLAYED_VALUES first values.
		values = data.length - MAX_DISPLAYED_VALUES;
		for( j = data.length - 1; j >= MAX_DISPLAYED_VALUES; j-- ){
			rows += data[j][1];
			data.pop();
		}
	}
	// Count displayed rows.
	rows = result.length - rows;

	// Create the array usable by the chart.
	for( i = 0; i < data.length; i++ ){
		display.push({y: data[i][1], label: data[i][0], age:(data[i][2]/data[i][1]).toFixed(AGE_APPROX)});
	}

	// Chart edition from the site https://canvasjs.com/html5-javascript-column-chart/
	var chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: false,
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			data: [{        
					type: "column",  
					showInLegend: true,
					legendText: " ",
					legendMarkerColor: "grey",
					toolTipContent: "average age: {age}<br/>{label}: {y}",
					dataPoints: display
			}]
	});
	chart.render();
	
	// Display indication values about the datas.
	$("#cr").html(rows);
	$("#hv").text(values);
}