<?php
	/* Nom du fichier Database */
	$base = './us-census.db';
	/* Nom de la table. */
	$table_name = 'census_learn_sql';
	/* Pointeur sur la connexion vers la base SQL */
	$link = null;
	/* Variable globale de retour de la derni�re requ�te SQL effectu�e. */
	$result = null;

	/* Permet de se connecter � la base de donn�es. */
	function connect(){
		global $link,$base;
		try {
			$link = new SQLite3($base);
		}
		catch (SQLiteException $e) {
			die("Erreur d'ouverture de la base de donn�e");
		}
	}

	/* Execute une requ�te SQL vers la base. */
	function execute( $q ){
		global $link, $result;
		connect();
		$result = $link->query($q);
		close();
	}

	/* Permet de r�cup�rer le contenu de la table. */
	function getInfos( $col ){
		global $link, $result,$table_name;
		$ret = array();
		$query = "SELECT age," .$col. " FROM ".$table_name.";";
		execute( $query );
		while( $row = $result->fetchArray() ){
			$ret[] = array( "age" => $row[0],
							"data" => $row[1]
						);
		}
		echo json_encode($ret);
	}

	/* Permet de r�cup�rer les noms des colonnes de la table. */
	function getNames(){
		global $link,$table_name;
		$query = "PRAGMA table_info(".$table_name.")"; 
		execute( $query );
	}

	/* Ferme la connection avec la base de donn�es. */
	function close(){
		global $link;
		$link = null;
	}
?>