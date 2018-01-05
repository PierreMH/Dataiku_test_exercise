<?php
	include("backend.php");
	getNames();
?>
<!DOCTYPE HTML > 
<html>
	<head>
		<title> US Census </title> 
		<meta http-equiv="content-type" content="text/html; charset=utf-8">

		<link type="text/css" rel="stylesheet" href="./style.css">
		<script type="text/javascript" src="./script.js"></script>
		<script type="text/javascript" src="./libs/jquery-3.2.1.min.js"></script>
		<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
	</head>
	<body>
		<div id="header">
			U.S. Census
		</div>

		<div id="display">
			<br/>
			Explore the U.S. population datas to find the average age regarding different sorting datas.
			<br/>
			<br/>
			
			<div id="selector">
				<select name="row" onchange="newData()">
					<option value='-1'> </option>
				<?php
					while($row = $result->fetchArray()) { 
						echo "<option value='". $row[0] ."'>". $row[1] ."</option>";
					}
				?>
				</select>
				<br/>
				Hidden values: <span id="hv">-</span>
				<br/>
				Clipped rows: <span id="cr">-</span>
				<br/>
				<div id="chartContainer" style="height: 370px; width: 100%;"></div>
			</div>
		</div>
		<div id="footer">
		</div>		
	</body>
</html>