<?php 

	// get incoming vars
	$score = $_GET['score']; 
	$attempts = $_GET['attempts'];
	$matches = $_GET['matches'];
	$seconds = $_GET['seconds'];
	$level = $_GET['level'];
	$initials = $_GET['initials'];
	


	// 2.) connect to MySQL
	$conn = mysqli_connect('localhost', 'root', 'mysql') or die("Couldn't connect to MySQL");

	// 3.) connect to database
	mysqli_select_db($conn, 'memoryGame') or die("Couldn't find the Database");
	
	// query to enter new score
$query = "INSERT INTO scores(score, attempts, matches, seconds, level, initials) 
			VALUES('$score', '$attempts', '$matches', '$seconds', '$level', '$initials')";

	mysqli_query($conn, $query);

	// query to retrieve scores
	$query2 = "SELECT * FROM scores 
					WHERE matches > 10
					ORDER BY score DESC
					LIMIT 10";

	$result  = mysqli_query($conn, $query2);
	
	// 
	$tbl = '<h1> High Scores </h1>';
	$tbl .= '<table cellpadding="6">';
	$tbl .= '<tr><th>Rank</th><th>Player</th><th>Score</th>';
	$tbl .= '<th>Level</th><th>Time(s)</th><th>Date</th></tr>';
	
	$i = 1;

	while($row=mysqli_fetch_array($result)){
		
		$tbl .= "<tr><td>" . $i++ . "</td>"; 
		$tbl .= "<td>" . strtoupper($row['initials']) . "</td>";
		$tbl .= "<td>" . $row['score'] . "</td>";
		$tbl .= "<td>" . $row['level'] . "</td>";
		$tbl .= "<td>" . $row['seconds'] . "</td>";
		$tbl .= "<td>" . date('D. M. d, Y - H:i:s', strtotime($row['dateTime'])) . "</td></tr>";
	}

	echo $tbl;
	
//	$highScores = array();
//
//	while($row=mysqli_fetch_array($result)){
//		
//		$row['dateTime'] = date('D. M. d, Y - H:i:s', strtotime($row['dateTime']));
//		
//		array_push($highScores, $row);
//	}
//
//	// echo a JSON obj
//	echo json_encode($highScores)

?>