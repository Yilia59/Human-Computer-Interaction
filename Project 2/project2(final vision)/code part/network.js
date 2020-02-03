//import movie.js

/**************************************************************************************
Programmers: Jingwan Li, Yuyang Wang, Branden Hidalgo
Program:     HCI Project 2
Course:      CSCI 490: Human-Computer Interaction
Semester:    Fall
Instructor:  Maoyuan Sun
Date Due:    12/01/19
**************************************************************************************/
//Golbal value
var arrayA = new Array();
var arrayB = new Array();
var nodeArrayL, nodeLinkL, nodeArrayR, nodeLinkR;
var dictL, dictR;
var matches = [];
var actorName;
var myTextArea = $('#myTextarea');

// create diagram to show the subnetwork
function init() {
	var $ = go.GraphObject.make;
	/***************************** Left subnetwork **********************************/	
myDiagramL = $(go.Diagram, "myDiagramDivL",
				{	// double-click in background creates new node
					//"clickCreatingTool.archetypeNodeData": {},
					"undoManager.isEnabled": true
				});
					
myDiagramL.nodeTemplate =
			$(go.Node, "Auto",
			// added the name property
			$(go.Shape, { stroke: null, name: "NODE"/*, fill : "lightblue"*/}, 
					new go.Binding("figure", "fig"),
					new go.Binding("fill", "color")),
		//			new go.Binding("fill", "isSelected", function (sel) {
		//				if(sel) return "cyan";
		//			}).ofObject("")),
			$(go.TextBlock,
				{ margin: 5 },
				new go.Binding("text", "text"))
		);


		myDiagramL.linkTemplate = 
				$(go.Link,	{ relinkableFrom: true, relinkableTo: true },
				$(go.Shape, { stroke: "steelblue", strokeWidth: 1.5 })
				//,$(go.Shape, { toArrow: "OpenTriangle", stroke: "steelblue" })
			);
//save the movie into the object, and save in the array for show in node
	nodeArrayL = [	
		{ key: "Johnny Depp", text: "Johnny Depp", color:"lightblue", fig:"Procedure" , content : "Angelina Jolie Pitt:The Tourist"},	
		{ key: "John Belushi", text: "John Belushi", color:"lightblue", fig:"Procedure", content : "1941"},	
		{ key: "Christopher Lee", text: "Christopher Lee", color:"lightblue", fig:"Procedure", content: "The Lord of the Ring: The Fellowship of the Ring" },	
		{ key: "Milla Jovovich", text: "Milla Jovovich", color:"lightblue", fig:"Procedure", content : "The Three Musketeers"},					
		{ key: "Mike Epps", text: "Mike Epps", color:"lightblue", fig:"Procedure", content : "Resident Evil: Extinction" },
		{ key: "Orlando Bloom", text: "Orlando Bloom", color:"lightblue", fig:"Procedure", content: "Pirates of the Caribbean: The Curse of the Black Pearl"},
		{ key: "Salma Hayek", text: "Salma Hayek", color:"lightblue", fig:"Procedure", content : "Once Upon A Time In Mexico"},
		{ key: "Constance Marie", text: "Constance Marie", color:"lightblue", fig:"Procedure", content : "Puss in Boots" },	
		{ key: "Tom Cruise", text: "Tom Cruise", color:"lightblue", fig:"Procedure", content : "Oblivion" },
		{ key: "Bruce Willis", text: "Bruce Willis", color:"lightblue", fig:"Procedure", content : "The Fifth Element" },
		{ key: "Morgan Freeman", text: "Morgan Freeman", color:"lightblue", fig:"Procedure", content : "Armageddon" },
		{ key: "Channing Tatum", text: "Channing Tatum", color:"lightblue", fig:"Procedure", content : "G.I. Joe: Retaliation" },
		{ key: "LL Cool J", text: "LL Cool J", color:"lightblue", fig:"Procedure", content : "Charlie's Angels" },
		{ key: "Ruth Wilson", text: "Ruth Wilson", color:"lightblue", fig:"Procedure", content: "The Lone Ranger" },
		{ key: "Robert Duvall", text: "Robert Duvall", color:"lightblue", fig:"Procedure", content : "Jack Reacher" },
		{ key: "Will Ferrell", text: "Will Ferrell", color:"lightblue", fig:"Procedure", content : "The Lego Movie" },		
		{ key: "Dwayne Johnson", text: "Dwayne Johnson", color:"lightblue", fig:"Procedure", content : "Faster" },
		{ key: "Bill Murray", text: "Bill Murray", color:"lightblue", fig:"Procedure", content : "Get Smart" },		
		{ key: "Michael Rapaport", text: "Michael Rapaport", color:"lightblue", fig:"Procedure", content : "The 6th Day" },
		{ key: "Dax Flame", text: "Dax Flame", color:"lightblue", fig:"Procedure", content : "21 Jump Street" }	
	]
//	show link between each node
	nodeLinkL = [		
		{ from: "Johnny Depp", to: "Ruth Wilson" },
		{ from: "Orlando Bloom", to: "Christopher Lee" },
		{ from: "Christopher Lee", to: "John Belushi" },
		{ from: "Johnny Depp", to: "Salma Hayek" },
		{ from: "Johnny Depp", to: "Orlando Bloom" },
		{ from: "Salma Hayek", to: "Constance Marie" },
		{ from: "Orlando Bloom", to: "Milla Jovovich"},
		{ from: "Milla Jovovich", to: "Bruce Willis"},
		{ from: "Milla Jovovich", to: "Mike Epps"},
		{ from: "Bruce Willis", to: "Morgan Freeman"},
		{ from: "Dwayne Johnson", to: "Mike Epps"},
		{ from: "Morgan Freeman", to: "Will Ferrell"},
		{ from: "Morgan Freeman", to: "Tom Cruise"},
		{ from: "Dwayne Johnson", to: "Will Ferrell"},
		{ from: "Tom Cruise", to: "Robert Duvall"},
		{ from: "Robert Duvall", to: "Michael Rapaport"},
		{ from: "Dwayne Johnson", to: "Channing Tatum"},
		{ from: "Dwayne Johnson", to: "Bill Murray"},
		{ from: "Bill Murray", to: "LL Cool J"},
		{ from: "Channing Tatum", to:"Dax Flame"}
	]
//updata graph
		myDiagramL.model = new go.GraphLinksModel(nodeArrayL, nodeLinkL);
			
		myDiagramL.addDiagramListener("ObjectSingleClicked", function (d) {		
			var shape = myDiagramL.findNodeForKey(d.subject.Rb);
			if(shape !== null) {
				for( var x = 0; x < nodeArrayL.length; x++){
					if( d.subject.Rb == nodeArrayL[x].text && !arrayA.includes(nodeArrayL[x].content)){
							arrayA.push(nodeArrayL[x].content);
							nodeArrayL[x].color = "yellow";	
//							for (var i=0; i < 20;i++) {
//								if(nodeArrayR[x].content == dictL[i]['movie_title']){
//									console.log(dictL[i]['movie_title']);
//									console.log(dictL[i]['actor_1_name']);
//								}
//							}
						}						
					myDiagramL.model = new go.GraphLinksModel(nodeArrayL, nodeLinkL);
				}
			}
		})

/***************************** Right subnetwork **********************************/	
	myDiagramR =
	$(go.Diagram, "myDiagramDivR",
			{
				// double-click in background creates new node
				//"clickCreatingTool.archetypeNodeData": {},
				"undoManager.isEnabled": true
			});

	myDiagramR.nodeTemplate =
		$(go.Node,"Auto",
		$(go.Shape,
		{ stroke: null, name: "NODE"/*, fill : "lightblue"*/}, 
			new go.Binding("figure", "fig"),
			new go.Binding("fill", "color")),
			
//			new go.Binding("fill", "isSelected", function (sel) {
//				if(sel) return "cyan";
//			}).ofObject("")),
		$(go.TextBlock,{ margin: 5 },
		new go.Binding("text", "text"))
	);


myDiagramR.linkTemplate = 
		$(go.Link,	{ relinkableFrom: true, relinkableTo: true },
		$(go.Shape, { stroke: "steelblue", strokeWidth: 1.5 })
		//,$(go.Shape, { toArrow: "OpenTriangle", stroke: "steelblue" })
	);

nodeArrayR = [		
		{ key: "Thomas McDonell", text: "Thomas McDonell", color:"lightblue", fig:"Procedure", content:"Prom" },										
		
		{ key: "Cameron Monaghan", text: "Cameron Monaghan", color:"lightblue", fig:"Procedure", content:"Click" },
		
		{ key: "Gedde Watanabe", text: "Gedde Watanabe", color:"lightblue", fig:"Procedure", content:"UHF" },
		{ key: "Miranda Cosgrove", text: "Miranda Cosgrove", color:"lightblue", fig:"Procedure", content:"Despicable Me" },	
		{ key: "Mark Moses", text: "Mark Moses", color:"lightblue", fig:"Procedure", content:"Seeking a Friend for the End of the World" },
		{ key: "Adam Sandler", text: "Adam Sandler", color:"lightblue", fig:"Procedure", content:"Just Go with It" },
		{ key: "Steve Buscemi", text: "Steve Buscemi", color:"lightblue", fig:"Procedure", content:"Grown Ups" },
		
		{ key: "Georgina Cates", text: "Georgina Cates", color:"lightblue", fig:"Procedure", content:"Bad Grandpa" },	
		{ key: "Jackson Nicoll", text: "Jackson Nicoll", color:"lightblue", fig:"Procedure", content:"Fun Size" },
		{ key: "Jaime King", text: "Jaime King", color:"lightblue", fig:"Procedure", content:"Slackers" },		
		{ key: "Kate Winslet", text: "Kate Winslet", color:"lightblue", fig:"Procedure", content:"Romance & Cigarettes" },
		{ key: "Hugh Jackman", text: "Hugh Jackman", color:"lightblue", fig:"Procedure", content:"Flushed Away" },
		{ key: "Taron Egerton", text: "Taron Egerton", color:"lightblue", fig:"Procedure", content:"Eddie the Eagle" },
		{ key: "Bob Gunton", text: "Bob Gunton", color:"lightblue", fig:"Procedure", content:"The Glimmer Man" },
		{ key: "Alexa PenaVega", text: "Alexa PenaVega", color:"lightblue", fig:"Procedure", content:"Spy Kids 2: Island of Lost Dreams" },
		
		{ key: "Bailee Madison", text: "Bailee Madison", color:"lightblue", fig:"Procedure", content:"Parental Guidance" },
		{ key: "Steve Carell", text: "Steve Carell", color:"lightblue", fig:"Procedure", content:"Sleepover" },
		{ key: "Fran Drescher", text: "Fran Drescher", color:"lightblue", fig:"Procedure", content:"Hotel Transylvania 2" },
		{ key: "Jon Heder", text: "Jon Heder", color:"lightblue", fig:"Procedure", content:"School for Scoundrels" },
		{ key: "Sarah Silverman", text: "Sarah Silverman", color:"lightblue", fig:"Procedure", content:"School of Rock" }
	]
nodeLinkR = [ 

		{ from: "Adam Sandler", to: "Bailee Madison" },
		{ from: "Bailee Madison", to: "Gedde Watanabe" },
		{ from: "Gedde Watanabe", to: "Fran Drescher" },
		{ from: "Adam Sandler", to: "Cameron Monaghan" },
		{ from: "Cameron Monaghan", to: "Thomas McDonell" },
		{ from: "Thomas McDonell", to: "Jackson Nicoll" },
		{ from: "Gedde Watanabe", to: "Jaime King" },
		{ from: "Jackson Nicoll", to: "Georgina Cates" },
		{ from: "Steve Buscemi", to: "Adam Sandler" },
		{ from: "Steve Buscemi", to: "Kate Winslet" },
		{ from: "Fran Drescher", to: "Adam Sandler" },
		{ from: "Fran Drescher", to: "Steve Buscemi" },
		{ from: "Kate Winslet", to: "Hugh Jackman" },
		{ from: "Hugh Jackman", to: "Taron Egerton" },
		{ from: "Steve Buscemi", to: "Alexa PenaVega" },
		{ from: "Alexa PenaVega", to: "Bob Gunton" },
		{ from: "Alexa PenaVega", to: "Steve Carell" },
		{ from: "Steve Carell", to: "Mark Moses" },
		{ from: "Steve Carell", to: "Miranda Cosgrove" },
		{ from: "Miranda Cosgrove", to: "Sarah Silverman" },
		{ from: "Sarah Silverman", to: "Jon Heder" }
	]

	myDiagramR.model = new go.GraphLinksModel(nodeArrayR, nodeLinkR);
	


	
	myDiagramR.addDiagramListener("ObjectSingleClicked", function (d) {	
		var shape = myDiagramR.findNodeForKey(d.subject.Rb);
		if(shape !== null) 
			for( var x = 0; x < nodeArrayR.length; x++){
				if( d.subject.Rb == nodeArrayR[x].key && !arrayB.includes(nodeArrayR[x].content)){				
						//movie name put into array
						arrayB.push(nodeArrayR[x].content);
						nodeArrayR[x].color = "yellow";	
				}
				myDiagramR.model = new go.GraphLinksModel(nodeArrayR, nodeLinkR);
					
			}
		})
}

// clear left button
function clearL(){
	for (var i = 0; i < arrayA.length; i++) {
		for (var x = 0; x < nodeArrayL.length; x++) {
			if(arrayA[i] == nodeArrayL[x].content){
				nodeArrayL[x].color = "lightblue";
			}
		}		
	}		
	myDiagramL.model = myDiagramL.model = new go.GraphLinksModel(nodeArrayL, nodeLinkL);
	arrayA = [];	
}

// clear right button
function clearR(){
	for (var i = 0; i < arrayB.length; i++) {
		for (var x = 0; x < nodeArrayR.length; x++) {
			if(arrayB[i] == nodeArrayR[x].content){
				nodeArrayR[x].color = "lightblue";
			}
		}		
	}		
	myDiagramR.model = myDiagramR.model = new go.GraphLinksModel(nodeArrayR, nodeLinkR);
	arrayB = [];	
}

// compare the similarity between A&B 
function CompareAB() {
	var tempDicA = new Array;
	var tempDicB = new Array;
	var tempDicA_key= new Array;
	var tempDicB_key= new Array;
	var tempDicA_total = new Array;
	var tempDicB_total = new Array;
	var tempDic = new Array;
	var tempA = new Array;
	var tempB = new Array;
	var lengthA, lengthB = 0;
	var labels1 = [];
	var tempSim = 1.0;

	//left network
	for(var i =0; i < arrayA.length; i++){
		for(var j=0; j < dictL.length; j++){
			if(arrayA[i].toUpperCase().trim() === dictL[j]['movie_title'].toUpperCase().trim()){
				tempDicA.push(dictL[j]);
				tempDicA_key.push(dictL[j]);		
			}
		}
	}
	// save plot keywords into array
	tempDicA_key.forEach(saveIntoArrayA);
	
	function saveIntoArrayA(item,index,tempDicA_key) {
		tempDicA_key[index] = item["plot_keywords"];
		tempDicA_total[index] = item["plot_keywords"].split("|");
		tempDicA_key[index] = item["plot_keywords"].split(/[ |]+/); 
		
	}
	
	//right network
	for(var i =0; i < arrayB.length; i++){
			for(var j=0; j < dictR.length; j++){
				if(arrayB[i].toUpperCase().trim() === dictR[j]['movie_title'].toUpperCase().trim()){
					tempDicB.push(dictR[j]);
					tempDicB_key.push(dictR[j]);						
				}
			}
		}
	tempDicB_key.forEach(saveIntoArrayB);

	function saveIntoArrayB(item,index,tempDicB_key) {
		tempDicB_key[index] = item["plot_keywords"];
		tempDicB_total[index] = item["plot_keywords"].split("|"); 
		tempDicB_key[index] = item["plot_keywords"].split(/[ |]+/); 
	}
	

	var sameResult = getMatch(tempDicA_key, tempDicB_key);
	
	// if no similarity infomation
	if(sameResult == 0){
		document.getElementById("Similarity").innerHTML = "0%";
		document.getElementById("keyword").innerHTML = "NULL";
		document.getElementById("aTitle").innerHTML = "No matching information";
		
		myDiagramR.addDiagramListener("ObjectSingleClicked", function (d) {
			window.location.reload();	
		})
		myDiagramL.addDiagramListener("ObjectSingleClicked", function (d) {
			window.location.reload();
		})
	}
	// if has similarity information
	else{
		document.getElementById("keyword").innerHTML = sameResult;
		for(var j = 0; j < sameResult.length; j++){
			for (var i = 0; i < tempDicA_key.length; i++) {
				if(tempDicA_key[i].includes(sameResult[j]) ){
					for (var y = 0; y < nodeArrayL.length; y++) {
						if(tempDicA[i]['movie_title'].toUpperCase().trim() === nodeArrayL[y].content.toUpperCase().trim() ){
								document.getElementById("aTitle").innerHTML = "Subnetwork A";
								nodeArrayL[y].color = "lightgreen";
								if(!tempA.includes(tempDicA[i])){
									tempA.push(tempDicA[i]);
								}
						}

					}
				}
			}
			for (var a = 0; a < tempDicB_key.length; a++) {
				if(tempDicB_key[a].includes(sameResult[j])){
					for (var x = 0; x < nodeArrayR.length; x++) {
						if(tempDicB[a]['movie_title'].toUpperCase().trim() === nodeArrayR[x].content.toUpperCase().trim() ){
							document.getElementById("bTitle").innerHTML = "Subnetwork B";
							nodeArrayR[x].color = "lightgreen"; 
							if(!tempB.includes(tempDicB[a])){
								tempB.push(tempDicB[a]);
							}
						}
					}																		
				}
			}	
		}
	}
	

	// Updata content information
	if(tempA.length !== 0 && tempB.length !== 0){
		var labels1 = ['actor_1_name','movie_title', 'plot_keywords']; 
		buildTable(labels1, tempA, document.getElementById('a'));
		buildTable(labels1, tempB	, document.getElementById('b'));
		var tempResult = ((countSim(tempDicA_total) + countSim(tempDicB_total) ) / 2 * 100);
		document.getElementById("Similarity").innerHTML= parseFloat(tempResult).toFixed(2)+"%";
		
		myDiagramR.addDiagramListener("ObjectSingleClicked", function (d) {
			window.location.reload();	
		})
		myDiagramL.addDiagramListener("ObjectSingleClicked", function (d) {
			window.location.reload();
		})
	}
	
	function countSim(a) {
		for(var i = 0; i < a.length; i++){
			tempSim *= sameResult.length/a[i].length;
		}
		return tempSim;
// way2
//		for(var i = 0; i < a.length; i++){
//			var counttotal += a[i].length;
//		}
//		return tempSim;
}

	myDiagramL.model = myDiagramL.model = new go.GraphLinksModel(nodeArrayL, nodeLinkL);
	myDiagramR.model = myDiagramR.model = new go.GraphLinksModel(nodeArrayR, nodeLinkR);

}

// build table function
function buildTable(labels, objects, container) {
	var table = document.createElement('table');
	var thead = document.createElement('thead');
	var tbody = document.createElement('tbody');

	var theadTr = document.createElement('tr');
	for (var i = 0; i < labels.length; i++) {
		var theadTh = document.createElement('th');
		theadTh.innerHTML = labels[i];
		theadTr.appendChild(theadTh);
	}
	thead.appendChild(theadTr);
	table.appendChild(thead);

	for (j = 0; j < objects.length; j++) {
		var tbodyTr = document.createElement('tr');
		for (k = 0; k < labels.length; k++) {
			var tbodyTd = document.createElement('td');
			tbodyTd.innerHTML = objects[j][labels[k].toLowerCase()];
			tbodyTr.appendChild(tbodyTd);
		}
		tbody.appendChild(tbodyTr);
	}
	table.appendChild(tbody);
	container.appendChild(table);
}

// compare match information between two arrays
function getMatch(a, b) {
	var matches = [];
	if(a.length == 0 || b.length == 0 || a[0].length == 0 || b[0].length == 0){
		return matches;
	}
	for ( var i = 0; i < a.length; i++ ) {
		for( var j = 0; j < a[i].length; j++ ){
			for ( var e = 0; e < b.length; e++ ) {
				for ( var f = 0; f < b[e].length; f++){
					if ( a[i][j] === b[e][f] && !matches.includes(a[i][j])) {
						matches.push( a[i][j] );
					}
				}
			}
		}
	}
	return matches;
}
// compare match information in one array
function getMatchInOne(a) {
	var matches = [];
	var sorted_arr = a.slice().sort(); // You can define the comparing function here. 
										 // JS by default uses a crappy string compare.
										 // (we use slice to clone the array so the
										 // original array won't be modified)
	for (var i = 0; i < sorted_arr.length - 1; i++) {
		if (sorted_arr[i + 1] == sorted_arr[i]) {
			matches.push(sorted_arr[i]);
		}
	}
	console.log(matches);
	return matches;
}



/****************************** Data *****************************/
dictL = [
	{director_name: "Florian Henckel von Donnersmarck", actor_1_name:"Johnny Depp", actor_2_name: "Angelina Jolie Pitt", movie_title:"Angelina Jolie Pitt:The Tourist", title_year:2010, content_rating:"PG-13",	genres:"Action|Romance|Thriller", color: "Color", num_critic_for_reviews:321, duration:103, director_facebook_likes:207,	actor_3_facebook_likes:3000, actor_1_facebook_likes:40000,	gross:67631157,			num_voted_users:176598,	cast_total_facebook_likes:55175, actor_3_name: "Rufus Sewell",	facenumber_in_poster:0,	plot_keywords:	"police surveillance|surveillance van|tailing a_suspect|tourist|venice italy|friend|teenage girl", movie_imdb_link:"http://www.imdb.com/title/tt1243957/?ref_=fn_tt_tt_1", num_user_for_reviews:374, language:"English", country:"USA", budget:100000000, actor_2_facebook_likes:11000, imdb_score: 6.0, aspect_ratio: 2.35, movie_facebook_likes : 25000},
	{director_name: "Gore Verbinski", actor_1_name:"Johnny Depp", actor_2_name: "Orlando Bloom"	, movie_title:"Pirates of the Caribbean: The Curse of the Black Pearl", title_year:2003, content_rating:"PG-13", genres:"Action|Adventure|Fantasy", color: "Color", num_critic_for_reviews:271, duration:143, director_facebook_likes:563,	actor_3_facebook_likes:1000, actor_1_facebook_likes:40000,	gross:305000000,			num_voted_users:809474,	cast_total_facebook_likes:48184, actor_3_name: "Jack Davenport",	facenumber_in_poster:3,	plot_keywords:	"caribbean|curse|governor|pirate|undead",movie_imdb_link:"http://www.imdb.com/title/tt0325980/?ref_=fn_tt_tt_1",num_user_for_reviews:2113, language:"English", country:"USA", budget:140000000, actor_2_facebook_likes:5000, imdb_score: 8.1 , aspect_ratio: 2.35, movie_facebook_likes : 10000},
	{director_name: "Gore Verbinski", actor_1_name:"Johnny Depp", actor_2_name: "Ruth Wilson", movie_title:"The Lone Ranger", title_year:2013, content_rating:"PG-13",		genres:"Action|Adventure|Western", color: "Color", num_critic_for_reviews:450, duration:150, director_facebook_likes:563,	actor_3_facebook_likes:1000, actor_1_facebook_likes:40000,	gross:89289910,			num_voted_users:181792,	cast_total_facebook_likes:45757, actor_3_name: "Tom Wilkinson",	facenumber_in_poster:3,	plot_keywords:	"horse|outlaw|texas|texas ranger|train",movie_imdb_link:"http://www.imdb.com/title/tt1210819/?ref_=fn_tt_tt_1",num_user_for_reviews:711, language:"English", country:"USA", budget:215000000, actor_2_facebook_likes:2000, imdb_score: 6.5 , aspect_ratio: 2.35, movie_facebook_likes : 48000},
	{director_name: "Peter Jackson", actor_1_name:"Christopher Lee", actor_2_name: "Orlando Bloom", movie_title:"The Lord of the Ring: The Fellowship of the Ring", title_year:2001, content_rating:"PG-13",		genres:"Action|Adventure|Drama|Fantasy", color: "Color", num_critic_for_reviews:297, duration:171, director_facebook_likes:0,	actor_3_facebook_likes:857, actor_1_facebook_likes:16000,	gross:314000000,			num_voted_users:1238746,	cast_total_facebook_likes:22342, actor_3_name: "Billy Boyd",	facenumber_in_poster:2,	plot_keywords:	"elf|hobbit|middle earth|quest|ring",movie_imdb_link:"http://www.imdb.com/title/tt0120737/?ref_=fn_tt_tt_1",num_user_for_reviews:5060, language:"English", country:"New Zealand", budget:93000000, actor_2_facebook_likes:5000, imdb_score: 8.8 , aspect_ratio: 2.35, movie_facebook_likes : 21000},
	{director_name: "Steven Spielberg", actor_1_name:"Christopher Lee", actor_2_name: "John Belushi", movie_title:"1941", title_year:1979, content_rating:"PG",		genres:"Action|Comedy|War", color: "Color", num_critic_for_reviews:56, duration:142, director_facebook_likes:14000,	actor_3_facebook_likes:642, actor_1_facebook_likes:16000,	gross:0,			num_voted_users:25193,	cast_total_facebook_likes:20201, actor_3_name: "Treat Williams",	facenumber_in_poster:5,	plot_keywords:	"california|captain|cult film|pearl harbor|submarine",movie_imdb_link:"http://www.imdb.com/title/tt0078723/?ref_=fn_tt_tt_1",num_user_for_reviews:217, language:"English", country:"USA", budget:35000000, actor_2_facebook_likes:1000, imdb_score: 5.9 , aspect_ratio: 2.35, movie_facebook_likes : 2000},
	{director_name: "Robert Rodriguez", actor_1_name:"Johnny Depp", actor_2_name: "Salma Hayek", movie_title:"Once Upon a Time in Mexico", title_year:2003, content_rating:"R",		genres:"Action|Crime|Thriller", color: "Color", num_critic_for_reviews:178, duration:102, director_facebook_likes:0,	actor_3_facebook_likes:876, actor_1_facebook_likes:40000,	gross:55845943,			num_voted_users:130094,	cast_total_facebook_likes:46186, actor_3_name: "Enrique Iglesias",	facenumber_in_poster:1,	plot_keywords:	"agent|cia|mariachi|mexican|president",movie_imdb_link:"http://www.imdb.com/title/tt0285823/?ref_=fn_tt_tt_1",num_user_for_reviews:471, language:"English", country:"USA", budget:29000000, actor_2_facebook_likes:4000, imdb_score: 6.4 , aspect_ratio: 1.78, movie_facebook_likes : 0},
	{director_name: "Chris Miller", actor_1_name:"Constance Marie", actor_2_name:"Salma Hayek" , movie_title:"Puss in Boots", title_year:2011, content_rating:"PG",		genres:"Action|Adventure|Animation|Comedy|Family|Fantasy", color: "Color", num_critic_for_reviews:246, duration:90, director_facebook_likes:50,	actor_3_facebook_likes:397, actor_1_facebook_likes:4000,	gross:149000000,			num_voted_users:114287,	cast_total_facebook_likes:5046, actor_3_name: "Amy Sedaris",	facenumber_in_poster:0,	plot_keywords:	"betrayal|egg|friend|goose|hero",movie_imdb_link:"http://www.imdb.com/title/tt0448694/?ref_=fn_tt_tt_1",num_user_for_reviews:137, language:"English", country:"USA", budget:130000000, actor_2_facebook_likes:442, imdb_score: 6.7 , aspect_ratio: 2.35, movie_facebook_likes : 16000},
	{director_name: "Paul W.S. Anderson", actor_1_name:"Milla Jovovich", actor_2_name: "Logan Lerman"	, movie_title:"The Three Musketeers", title_year:2011, content_rating:"PG-13",		genres:"Action|Adventure|Romance", color: "Color", num_critic_for_reviews:228, duration:110, director_facebook_likes:545,	actor_3_facebook_likes:5000, actor_1_facebook_likes:14000,	gross:20315324,			num_voted_users:88542,	cast_total_facebook_likes:27694, actor_3_name: "Orlando Bloom",	facenumber_in_poster:8,	plot_keywords:	"box office flop|cardinal richelieu|critically bashed|duel|musketeer",movie_imdb_link:"http://www.imdb.com/title/tt1509767/?ref_=fn_tt_tt_1",num_user_for_reviews:254, language:"English", country:"Germany", budget:75000000, actor_2_facebook_likes:8000, imdb_score: 5.8 , aspect_ratio: 2.35, movie_facebook_likes : 19000},
	{director_name: "Luc Besson", actor_1_name:"Milla Jovovich", actor_2_name: "Bruce Willis", movie_title:"The Fifth Element", title_year:1997, content_rating:"PG-13",		genres:"Action|Adventure|Sci-Fi", color: "Color", num_critic_for_reviews:173, duration:126, director_facebook_likes:0,	actor_3_facebook_likes:10000, actor_1_facebook_likes:14000,	gross:63540020,			num_voted_users:343274,	cast_total_facebook_likes:39319, actor_3_name: "Gary Oldman",	facenumber_in_poster:2,	plot_keywords:	"1910s|alien|artificially created woman|love|taxi driver",movie_imdb_link:"http://www.imdb.com/title/tt0119116/?ref_=fn_tt_tt_1",num_user_for_reviews:742, language:"English", country:"France", budget:93000000, actor_2_facebook_likes:13000, imdb_score: 7.7 , aspect_ratio: 2.35, movie_facebook_likes : 18000},
	{director_name: "Russell Mulcahy", actor_1_name:"Milla Jovovich", actor_2_name: "Mike Epps", movie_title:"Resident Evil: Extinction", title_year:2007, content_rating:"R",		genres:"Action|Horror|Sci-Fi|Thriller", color: "Color", num_critic_for_reviews:216, duration:94, director_facebook_likes:85,	actor_3_facebook_likes:443, actor_1_facebook_likes:14000,	gross:50648679,			num_voted_users:149549,	cast_total_facebook_likes:16225, actor_3_name: "James Tumminia",	facenumber_in_poster:1,	plot_keywords:	"clone|convoy|crow|desert|satellite",movie_imdb_link:"http://www.imdb.com/title/tt0432021/?ref_=fn_tt_tt_1",num_user_for_reviews:348, language:"English", country:"France", budget:45000000, actor_2_facebook_likes:706, imdb_score: 6.3 , aspect_ratio: 2.35, movie_facebook_likes : 0},
	{director_name: "Michael Bay", actor_1_name:"Bruce Willis", actor_2_name: "Steve Buscemi", movie_title:"Armageddon", title_year:1998, content_rating:"PG-13",		genres:"Action|Adventure|Sci-Fi|Thriller", color: "Color", num_critic_for_reviews:167, duration:153, director_facebook_likes:0,	actor_3_facebook_likes:537, actor_1_facebook_likes:13000,	gross:202000000,			num_voted_users:322395,	cast_total_facebook_likes:26029, actor_3_name: "Will Patton",	facenumber_in_poster:0,	plot_keywords:	"asteroid|astronaut|bomb|meteorite|outer space",movie_imdb_link:"http://www.imdb.com/title/tt0120591/?ref_=fn_tt_tt_1",num_user_for_reviews:1171, language:"English", country:"USA", budget:140000000, actor_2_facebook_likes:12000, imdb_score: 6.6 , aspect_ratio: 2.35, movie_facebook_likes : 11000},
	{director_name: "George Tillman Jr.", actor_1_name:"Dwayne Johnson", actor_2_name: "Tom Berenger", movie_title:"Faster", title_year:2010, content_rating:"R",		genres:"Action|Crime|Drama|Thriller", color: "Color", num_critic_for_reviews:196, duration:98, director_facebook_likes:88,	actor_3_facebook_likes:706, actor_1_facebook_likes:12000,	gross:23225911,			num_voted_users:80574,	cast_total_facebook_likes:14699, actor_3_name: "Mike Epps",	facenumber_in_poster:1,	plot_keywords:	"gun|prison|reference_to god|reference_to jesus christ|vengeance",movie_imdb_link:"http://www.imdb.com/title/tt1433108/?ref_=fn_tt_tt_1",num_user_for_reviews:157, language:"English", country:"USA", budget:24000000, actor_2_facebook_likes:854, imdb_score: 6.5 , aspect_ratio: 2.35, movie_facebook_likes : 12000},
	{director_name: "Phil Lord", actor_1_name:"Morgan Freeman", actor_2_name: "Will Ferrell", movie_title:"The Lego Movie", title_year:2014, content_rating:"PG",		genres:"Action|Adventure|Animation|Comedy|Family|Fantasy", color: "Color", num_critic_for_reviews:435, duration:100, director_facebook_likes:97,	actor_3_facebook_likes:2000, actor_1_facebook_likes:11000,	gross:258000000,			num_voted_users:246698,	cast_total_facebook_likes:22128, actor_3_name: "Alison Brie",	facenumber_in_poster:0,	plot_keywords:	"based on toy|dual personality|evil businessman|good cop bad cop|lego",movie_imdb_link:"http://www.imdb.com/title/tt1490017/?ref_=fn_tt_tt_1",num_user_for_reviews:471, language:"English", country:"Australia", budget:60000000, actor_2_facebook_likes:8000, imdb_score: 7.8 , aspect_ratio: 2.35, movie_facebook_likes : 64000},
	{director_name: "Joseph Kosinski", actor_1_name:"Tom Cruise", actor_2_name:"Morgan Freeman" , movie_title:"Oblivion", title_year:2013, content_rating:"PG-13",		genres:"Action|Adventure|Mystery|Sci-Fi", color: "Color", num_critic_for_reviews:539, duration:124, director_facebook_likes:364,	actor_3_facebook_likes:1000, actor_1_facebook_likes:11000,	gross:89021735,			num_voted_users:387436,	cast_total_facebook_likes:22004, actor_3_name: "ZoÃ« Bell",	facenumber_in_poster:0,	plot_keywords:	"cabin in_the woods|drone|flying through_a thunderstorm|post apocalypse|sex in_a pool",movie_imdb_link:"http://www.imdb.com/title/tt1483013/?ref_=fn_tt_tt_1",num_user_for_reviews:892, language:"English", country:"USA", budget:120000000, actor_2_facebook_likes:10000, imdb_score: 7 , aspect_ratio: 2.35, movie_facebook_likes : 71000},
	{director_name: "Adam McKay", actor_1_name:"Dwayne Johnson", actor_2_name: "Will Ferrell", movie_title:"The Other Guys", title_year:2010, content_rating:"PG-13",		genres:"Action|Comedy|Crime", color: "Color", num_critic_for_reviews:265, duration:116, director_facebook_likes:285,	actor_3_facebook_likes:956, actor_1_facebook_likes:12000,	gross:119000000,			num_voted_users:189806,	cast_total_facebook_likes:20233, actor_3_name: "Derek Jeter",	facenumber_in_poster:2,	plot_keywords:	"capitalist|detective|investigation|new york city|police",movie_imdb_link:"http://www.imdb.com/title/tt1386588/?ref_=fn_tt_tt_1",num_user_for_reviews:316, language:"English", country:"USA", budget:100000000, actor_2_facebook_likes:8000, imdb_score: 6.7 , aspect_ratio: 2.35, movie_facebook_likes : 16000},
	{director_name: "Christopher McQuarrie", actor_1_name:"Robert Duvall", actor_2_name:"Tom Cruise", movie_title:"Jack Reacher", title_year:2012, content_rating:"PG-13",		genres:"Action|Crime|Mystery|Thriller", color: "Color", num_critic_for_reviews:387, duration:130, director_facebook_likes:188,	actor_3_facebook_likes:1000, actor_1_facebook_likes:10000,	gross:80033643,			num_voted_users:226570,	cast_total_facebook_likes:16385, actor_3_name: "David Oyelowo",	facenumber_in_poster:2,	plot_keywords:	"coma|mysterious villain|police chase|shooting range|sniper",movie_imdb_link:"http://www.imdb.com/title/tt0790724/?ref_=fn_tt_tt_1",num_user_for_reviews:448, language:"English", country:"USA", budget:60000000, actor_2_facebook_likes:3000, imdb_score: 7 , aspect_ratio: 2.35, movie_facebook_likes : 38000},
	{director_name: "Roger Spottiswoode", actor_1_name:"Robert Duvall", actor_2_name: "Michael Rapaport", movie_title:"The 6th Day", title_year:2000, content_rating:"PG-13",		genres:"Action|Mystery|Sci-Fi|Thriller", color: "Color", num_critic_for_reviews:170, duration:123, director_facebook_likes:55,	actor_3_facebook_likes:956, actor_1_facebook_likes:3000,	gross:34543701,			num_voted_users:100001,	cast_total_facebook_likes:5839, actor_3_name: "Tony Goldwyn",	facenumber_in_poster:1,	plot_keywords:	"clone|cloning|future|laser gun|murder",movie_imdb_link:"http://www.imdb.com/title/tt0216216/?ref_=fn_tt_tt_1",num_user_for_reviews:289, language:"English", country:"USA", budget:82000000, actor_2_facebook_likes:975, imdb_score: 5.9 , aspect_ratio: 2.35, movie_facebook_likes : 0},
	{director_name: "Jon M. Chu", actor_1_name:"Channing Tatum", actor_2_name: "Dwayne Johnson", movie_title:"G.I. Joe: Retaliation", title_year:2013, content_rating:"PG-13",		genres:"Action|Adventure|Sci-Fi|Thriller", color: "Color", num_critic_for_reviews:351, duration:122, director_facebook_likes:209,	actor_3_facebook_likes:934, actor_1_facebook_likes:17000,	gross:123000000,			num_voted_users:146352,	cast_total_facebook_likes:31958, actor_3_name: "Elodie Yung",	facenumber_in_poster:6,	plot_keywords:	"general|gi joe|martial arts|ninja|president",movie_imdb_link:"http://www.imdb.com/title/tt1583421/?ref_=fn_tt_tt_1",num_user_for_reviews:288, language:"English", country:"USA", budget:130000000, actor_2_facebook_likes:12000, imdb_score: 5.8 , aspect_ratio: 2.35, movie_facebook_likes : 42000},
	{director_name: "Peter Segal", actor_1_name:"Bill Murray", actor_2_name: "Dwayne Johnson", movie_title:"Get Smart", title_year:2008, content_rating:"PG-13",		genres:"Action|Adventure|Comedy", color: "Color", num_critic_for_reviews:265, duration:110, director_facebook_likes:88,	actor_3_facebook_likes:11000, actor_1_facebook_likes:13000,	gross:130000000,			num_voted_users:168172,	cast_total_facebook_likes:44798, actor_3_name: "Anne Hathaway",	facenumber_in_poster:1,	plot_keywords:	"airplane|misunderstanding|obese woman|overweight woman|spy",movie_imdb_link:"http://www.imdb.com/title/tt0425061/?ref_=fn_tt_tt_1",num_user_for_reviews:380, language:"English", country:"USA", budget:80000000, actor_2_facebook_likes:12000, imdb_score: 6.5 , aspect_ratio: 1.85, movie_facebook_likes : 0},
	{director_name: "McG", actor_1_name:"Bill Murray", actor_2_name: "LL Cool J", movie_title:"Charlie's Angels", title_year:2000, content_rating:"PG-13",		genres:"Action|Adventure|Comedy|Crime|Thriller", color: "Color", num_critic_for_reviews:181, duration:94, director_facebook_likes:368,	actor_3_facebook_likes:466, actor_1_facebook_likes:13000,	gross:125000000,			num_voted_users:145350,	cast_total_facebook_likes:15419, actor_3_name: "Kelly Lynch",	facenumber_in_poster:0,	plot_keywords:	"booty shake|box office hit|duct tape over mouth|first part|martial arts",movie_imdb_link:"http://www.imdb.com/title/tt0160127/?ref_=fn_tt_tt_1",num_user_for_reviews:643, language:"English", country:"USA", budget:92000000, actor_2_facebook_likes:1000, imdb_score: 5.5 , aspect_ratio: 2.35, movie_facebook_likes : 0},
	{director_name: "Phil Lord", actor_1_name:"Channing Tatum", actor_2_name: "Dax Flame", movie_title:"21 Jump Street", title_year:2012, content_rating:"R",		genres:"Action|Comedy|Crime", color: "Color", num_critic_for_reviews:375, duration:109, director_facebook_likes:97,	actor_3_facebook_likes:839, actor_1_facebook_likes:17000,	gross:13800000,			num_voted_users:408302,	cast_total_facebook_likes:19968, actor_3_name: "Rob Riggle",	facenumber_in_poster:2,	plot_keywords:	"narcotics|parody|police|remake|undercover cop",movie_imdb_link:"http://www.imdb.com/title/tt1232829/?ref_=fn_tt_tt_1",num_user_for_reviews:345, language:"English", country:"USA", budget:42000000, actor_2_facebook_likes:971, imdb_score: 7.2 , aspect_ratio: 2.35, movie_facebook_likes : 39000}
	];
dictR = [
	{director_name:"Dennis Dugan", actor_1_name:"Adam Sandler", actor_2_name: "Bailee Madison",actor_3_name:"Kevin Nealon", movie_title:"Just Go with It", title_year:2011,   content_rating:"PG-13",genres:"Comedy|Romance",                 color: "Color", num_critic_for_reviews:204, duration:117,   director_facebook_likes:221,actor_3_facebook_likes:503, actor_1_facebook_likes:11000,	gross:103028109,	num_voted_users:172878,cast_total_facebook_likes:16325, facenumber_in_poster:1,	plot_keywords:"chick flick|hawaii|love|plastic surgeon|woman wearing_a string bikini",        movie_imdb_link:"http://www.imdb.com/title/tt1564367/?ref_=fn_tt_tt_1", num_user_for_reviews:203, language:"English", country:"USA",   budget:80000000,  actor_2_facebook_likes:3000, imdb_score:6.4, aspect_ratio:1.85, movie_facebook_likes:19000},
	{director_name:"Frank Coraci", actor_1_name:"Adam Sandler", actor_2_name: "Cameron Monaghan",actor_3_name:"Julie Kavner", movie_title:"Click", title_year:2006,           content_rating:"PG-13",genres:"Comedy|Drama|Fantasy|Romance",   color: "Color", num_critic_for_reviews:173, duration:107,   director_facebook_likes:153,actor_3_facebook_likes:233, actor_1_facebook_likes:11000,	gross:137340146,	num_voted_users:246492,cast_total_facebook_likes:12700, facenumber_in_poster:1,	plot_keywords:"architect|frozen time|obese man|remote control|stopped time",                  movie_imdb_link:"http://www.imdb.com/title/tt0389860/?ref_=fn_tt_tt_1", num_user_for_reviews:685, language:"English", country:"USA",   budget:70000000,  actor_2_facebook_likes:1000, imdb_score:6.4, aspect_ratio:1.85, movie_facebook_likes:7000},
	{director_name:"John Gray", actor_1_name:"Alexa PenaVega", actor_2_name: "Bob Gunton",actor_3_name:"Keenen Ivory Wayans", movie_title:"The Glimmer Man", title_year:1996, content_rating:"R",genres:"Action|Comedy|Crime|Drama|Thriller", color: "Color", num_critic_for_reviews:39, duration:91,     director_facebook_likes:29,actor_3_facebook_likes:322,  actor_1_facebook_likes:2000,	gross:20400913,	        num_voted_users:15455,cast_total_facebook_likes:3855, facenumber_in_poster:1,	plot_keywords:"detective|heavy rain|murder|partner|serial killer",                            movie_imdb_link:"http://www.imdb.com/title/tt0116421/?ref_=fn_tt_tt_1", num_user_for_reviews:80, language:"English", country:"USA",    budget:45000000,  actor_2_facebook_likes:461,  imdb_score:5.3, aspect_ratio:1.85, movie_facebook_likes:451},
	{director_name:"Andy Fickman", actor_1_name:"Bailee Madison", actor_2_name: "Gedde Watanabe",actor_3_name:"Tom Everett Scott", movie_title:"Parental Guidance", title_year:2012, content_rating:"PG",genres:"Comedy|Family",              color: "Color", num_critic_for_reviews:139, duration:105,   director_facebook_likes:99,actor_3_facebook_likes:433,  actor_1_facebook_likes:3000,	gross:77264926,	        num_voted_users:21176,cast_total_facebook_likes:5740, facenumber_in_poster:5,	plot_keywords:"chores|father figure|helicopter parents|in-laws|punishment",                   movie_imdb_link:"http://www.imdb.com/title/tt1047540/?ref_=fn_tt_tt_1", num_user_for_reviews:107, language:"English", country:"USA",   budget:25000000,  actor_2_facebook_likes:448,  imdb_score:6.1, aspect_ratio:1.85, movie_facebook_likes:0},
	{director_name:"Joe Nussbaum", actor_1_name:"Thomas McDonell", actor_2_name:"Cameron Monaghan" ,actor_3_name:"Aimee Teegarden", movie_title:"Prom", title_year:2011,             content_rating:"PG",genres:"Comedy|Drama",               color: "Color", num_critic_for_reviews:83, duration:104,    director_facebook_likes:18,actor_3_facebook_likes:741,  actor_1_facebook_likes:1000,	gross:10106233,	        num_voted_users:12702,cast_total_facebook_likes:5190, facenumber_in_poster:0,	plot_keywords:"decoration|father daughter relationship|high school|prom|teenager",            movie_imdb_link:"http://www.imdb.com/title/tt1604171/?ref_=fn_tt_tt_1", num_user_for_reviews:32, language:"English", country:"USA",    budget:8000000,   actor_2_facebook_likes:962,  imdb_score:5.4, aspect_ratio:1.85, movie_facebook_likes:0},
	{director_name:"Jay Levey", actor_1_name:"Fran Drescher", actor_2_name: "Gedde Watanabe",actor_3_name:"Michael Richards", movie_title:"UHF", title_year:1989,                    content_rating:"PG-13",genres:"Comedy|Drama",            color: "Color", num_critic_for_reviews:59, duration:150,    director_facebook_likes:3,actor_3_facebook_likes:448,   actor_1_facebook_likes:859,	gross:6157157,	        num_voted_users:21416,cast_total_facebook_likes:3942, facenumber_in_poster:1,	plot_keywords:"gambling|imagination|television|television station|tv show",                   movie_imdb_link:"http://www.imdb.com/title/tt0098546/?ref_=fn_tt_tt_1", num_user_for_reviews:198, language:"English", country:"USA",   budget:5000000,   actor_2_facebook_likes:448,   imdb_score:7, aspect_ratio:1.85,  movie_facebook_likes:0},
	{director_name:"David Bowers", actor_1_name:"Hugh Jackman", actor_2_name: "Kate Winslet",actor_3_name:"David Suchet", movie_title:"Flushed Away", title_year:2006,               content_rating:"PG",genres:"Adventure|Animation|Comedy|Family", color: "Color", num_critic_for_reviews:135, duration:85,  director_facebook_likes:42,actor_3_facebook_likes:586,  actor_1_facebook_likes:20000,	gross:64459316,	num_voted_users:85086,cast_total_facebook_likes:35161, facenumber_in_poster:0,	plot_keywords:"boat|frog|rat|sewer|toad",                                                     movie_imdb_link:"http://www.imdb.com/title/tt0424095/?ref_=fn_tt_tt_1", num_user_for_reviews:122, language:"English", country:"UK",    budget:149000000, actor_2_facebook_likes:14000, imdb_score:6.7, aspect_ratio:1.85, movie_facebook_likes:0 },
	{director_name:"Dexter Fletcher", actor_1_name:"Hugh Jackman", actor_2_name: "Taron Egerton",actor_3_name:"Tim McInnerny", movie_title:"Eddie the Eagle", title_year:2016,       content_rating:"PG-13",genres:"Biography|Comedy|Drama|Sport",   color: "Color", num_critic_for_reviews:216, duration:106, director_facebook_likes:452,actor_3_facebook_likes:141, actor_1_facebook_likes:20000,	gross:15785632,	num_voted_users:32507,cast_total_facebook_likes:21195, facenumber_in_poster:3,	plot_keywords:"1988 winter olympics|coach|ski jumper|winter|winter olympics",                 movie_imdb_link:"http://www.imdb.com/title/tt1083452/?ref_=fn_tt_tt_1", num_user_for_reviews:119, language:"English", country:"UK",    budget:23000000,  actor_2_facebook_likes:732,   imdb_score:7.5, aspect_ratio:2.35, movie_facebook_likes:15000 },
	{director_name:"Dewey Nicks", actor_1_name:"Jaime King", actor_2_name: "Gedde Watanabe",actor_3_name:"Jim Rash", movie_title:"Slackers", title_year:2002,                        content_rating:"R",genres:"Comedy|Romance",                     color: "Color", num_critic_for_reviews:66, duration:86,   director_facebook_likes:4,actor_3_facebook_likes:424,   actor_1_facebook_likes:960,	gross:4814244,	        num_voted_users:12437,cast_total_facebook_likes:2415, facenumber_in_poster:4,	plot_keywords:"blackmail|fall|love|nerd|scam",                                                movie_imdb_link:"http://www.imdb.com/title/tt0240900/?ref_=fn_tt_tt_1", num_user_for_reviews:107, language:"English", country:"Canada", budget:11000000, actor_2_facebook_likes:448,   imdb_score:5.3, aspect_ratio:1.85, movie_facebook_likes:405},
	{director_name:"Todd Phillips", actor_1_name:"Jon Heder", actor_2_name: "Sarah Silverman",actor_3_name:"Jacinda Barrett", movie_title:"School for Scoundrels", title_year:2006,  content_rating:"PG-13",genres:"Comedy",                         color: "Color", num_critic_for_reviews:110, duration:108, director_facebook_likes:480,actor_3_facebook_likes:579, actor_1_facebook_likes:970,	gross:17803796,	        num_voted_users:26100,cast_total_facebook_likes:4374, facenumber_in_poster:1,	plot_keywords:"paintball|paintball gun|pepper spray|tennis|what happened_to epilogue",        movie_imdb_link:"http://www.imdb.com/title/tt0462519/?ref_=fn_tt_tt_1", num_user_for_reviews:97, language:"English", country:"USA",     budget:20000000, actor_2_facebook_likes:931,   imdb_score:5.9, aspect_ratio:2.35, movie_facebook_likes:484 },
	{director_name:"John Turturro", actor_1_name:"Kate Winslet", actor_2_name: "Steve Buscemi",actor_3_name:"Eddie Izzard", movie_title:"Romance & Cigarettes", title_year:2005,     content_rating:"R",genres:"Comedy|Musical|Romance",             color: "Color", num_critic_for_reviews:87, duration:105,  director_facebook_likes:0,actor_3_facebook_likes:776,   actor_1_facebook_likes:14000,	gross:540085,	num_voted_users:10052,cast_total_facebook_likes:28004, facenumber_in_poster:0,	plot_keywords:"anal sex|death|dream|poem|sex",                                                movie_imdb_link:"http://www.imdb.com/title/tt0368222/?ref_=fn_tt_tt_1", num_user_for_reviews:69, language:"English", country:"USA",     budget:0,        actor_2_facebook_likes:12000, imdb_score:6.3, aspect_ratio:2.35, movie_facebook_likes:0 },
	{director_name:"Jeff Tremaine", actor_1_name:"Jackson Nicoll", actor_2_name: "Georgina Cates",actor_3_name:"Grasie Mercedes", movie_title:"Bad Grandpa", title_year:2013,        content_rating:"R",genres:"Comedy",                             color: "Color", num_critic_for_reviews:157, duration:102, director_facebook_likes:79,actor_3_facebook_likes:27,   actor_1_facebook_likes:925,	gross:101978840,	num_voted_users:77724,cast_total_facebook_likes:1018, facenumber_in_poster:0,	plot_keywords:"child beauty pageant|grandson|hidden camera|jackass|road trip",                movie_imdb_link:"http://www.imdb.com/title/tt3063516/?ref_=fn_tt_tt_1", num_user_for_reviews:162, language:"English", country:"USA",    budget:15000000, actor_2_facebook_likes:38,    imdb_score:6.6, aspect_ratio:1.85, movie_facebook_likes:26000},
	{director_name:"Richard Linklater", actor_1_name:"Miranda Cosgrove", actor_2_name: "Sarah Silverman",actor_3_name:"Mike White", movie_title:"School of Rock", title_year:2003,   content_rating:"PG-13",genres:"Comedy|Music",                   color: "Color", num_critic_for_reviews:204, duration:108, director_facebook_likes:0,actor_3_facebook_likes:487,   actor_1_facebook_likes:2000,	gross:81257845,	num_voted_users:210680,cast_total_facebook_likes:4403, facenumber_in_poster:1,	plot_keywords:"battle of the bands|rock band|school teacher|substitute teacher|teacher",      movie_imdb_link:"http://www.imdb.com/title/tt0332379/?ref_=fn_tt_tt_1", num_user_for_reviews:479, language:"English", country:"USA",    budget:35000000, actor_2_facebook_likes:931,   imdb_score:7.1, aspect_ratio:1.85,         movie_facebook_likes:0},
	{director_name:"Genndy Tartakovsky", actor_1_name:"Steve Buscemi", actor_2_name: "Adam Sandler",actor_3_name:"Fran Drescher", movie_title:"Hotel Transylvania 2", title_year:2015,  content_rating:"PG",genres:"Animation|Comedy|Family|Fantasy", color: "Color", num_critic_for_reviews:152, duration:89, director_facebook_likes:266,actor_3_facebook_likes:859, actor_1_facebook_likes:12000,	gross:169692572,	         num_voted_users:56501,cast_total_facebook_likes:26839, facenumber_in_poster:0,	plot_keywords:"california|dracula|hotel|transylvania|vampire",                movie_imdb_link:"http://www.imdb.com/title/tt2510894/?ref_=fn_tt_tt_1", num_user_for_reviews:97, language:"English", country:"USA",     budget:80000000, actor_2_facebook_likes:11000, imdb_score:6.7, aspect_ratio:1.85, movie_facebook_likes:16000},
	{director_name:"Dennis Dugan", actor_1_name:"Steve Buscemi", actor_2_name: "Adam Sandler",actor_3_name:"Salma Hayek", movie_title:"Grown Ups", title_year:2010,                     content_rating:"PG-13",genres:"Comedy",                       color: "Color", num_critic_for_reviews:179, duration:102,                   director_facebook_likes:221,actor_3_facebook_likes:4000, actor_1_facebook_likes:12000,	gross:162001186, num_voted_users:181443,cast_total_facebook_likes:28497, facenumber_in_poster:4,	plot_keywords:"basketball|coach|daughter|high school|high school basketball", movie_imdb_link:"http://www.imdb.com/title/tt1375670/?ref_=fn_tt_tt_1", num_user_for_reviews:311, language:"English", country:"USA", budget:80000000, actor_2_facebook_likes:11000, imdb_score:6, aspect_ratio:1.85,   movie_facebook_likes:12000},
	{director_name:"Robert Rodriguez", actor_1_name:"Steve Buscemi", actor_2_name: "Alexa PenaVega",actor_3_name:"Emily Osment", movie_title:"Spy Kids 2: Island of Lost Dreams", title_year:2002, content_rating:"PG",genres:"Action|Adventure|Comedy|Family|Sci-Fi", color: "Color", num_critic_for_reviews:103, duration:100,  director_facebook_likes:0,actor_3_facebook_likes:1000,   actor_1_facebook_likes:12000,	gross:85570368,  num_voted_users:44885,cast_total_facebook_likes:18291, facenumber_in_poster:1,	plot_keywords:"island|mad scientist|scientist|sequel|spy",                            movie_imdb_link:"http://www.imdb.com/title/tt0287717/?ref_=fn_tt_tt_1", num_user_for_reviews:107, language:"English", country:"USA", budget:38000000, actor_2_facebook_likes:2000,  imdb_score:5.1, aspect_ratio:1.85, movie_facebook_likes:478},
	{director_name:"Joe Nussbaum", actor_1_name:"Steve Carell", actor_2_name: "Alexa PenaVega",actor_3_name:"Hunter Parrish", movie_title:"Sleepover", title_year:2004,                            content_rating:"PG",genres:"Comedy|Romance",                       color: "Color", num_critic_for_reviews:52, duration:89,     director_facebook_likes:18,actor_3_facebook_likes:2000,  actor_1_facebook_likes:7000,	gross:8070311,	 num_voted_users:12706,cast_total_facebook_likes:13626, facenumber_in_poster:9,	plot_keywords:"best friend|party|rival|scavenger hunt|sleepover",                     movie_imdb_link:"http://www.imdb.com/title/tt0368975/?ref_=fn_tt_tt_1", num_user_for_reviews:75, language:"English", country:"USA",  budget:10000000, actor_2_facebook_likes:2000,  imdb_score:5.3, aspect_ratio:1.85, movie_facebook_likes:0 },
	{director_name:"Lorene Scafaria", actor_1_name:"Steve Carell", actor_2_name: "Mark Moses",actor_3_name:"Rob Huebel", movie_title:"Seeking a Friend for the End of the World", title_year:2012, content_rating:"R",genres:"Adventure|Comedy|Drama|Romance|Sci-Fi", color: "Black and White", num_critic_for_reviews:265, duration:101, director_facebook_likes:63,actor_3_facebook_likes:172,  actor_1_facebook_likes:7000,	gross:6619173,	  num_voted_users:87203,cast_total_facebook_likes:7747, facenumber_in_poster:2,	plot_keywords:"candle|end of the world|letter|record|road trip",              movie_imdb_link:"http://www.imdb.com/title/tt1307068/?ref_=fn_tt_tt_1", num_user_for_reviews:221, language:"English", country:"USA", budget:10000000, actor_2_facebook_likes:353,   imdb_score:6.7, aspect_ratio:2.35, movie_facebook_likes:25000},
	{director_name:"Pierre Coffin", actor_1_name:"Steve Carell", actor_2_name: "Miranda Cosgrove",actor_3_name:"Jack McBrayer", movie_title:"Despicable Me", title_year:2010,                      content_rating:"PG",genres:"Animation|Comedy|Family",              color: "Color", num_critic_for_reviews:304, duration:87,            director_facebook_likes:275,actor_3_facebook_likes:975, actor_1_facebook_likes:7000,	gross:251501645,  num_voted_users:385943,cast_total_facebook_likes:11608, facenumber_in_poster:0,	plot_keywords:"girl|minion|moon|pyramid|white picket fence",          movie_imdb_link:"http://www.imdb.com/title/tt1323594/?ref_=fn_tt_tt_1", num_user_for_reviews:296, language:"English", country:"USA", budget:69000000, actor_2_facebook_likes:2000,  imdb_score:7.7, aspect_ratio:1.85, movie_facebook_likes:31000},
	{director_name:"Josh Schwartz", actor_1_name:"Jackson Nicoll", actor_2_name: "Thomas McDonell",actor_3_name:"Osric Chau", movie_title:"Fun Size", title_year:2012,                             content_rating:"PG-13",genres:"Adventure|Comedy",                  color: "Color", num_critic_for_reviews:77, duration:86,             director_facebook_likes:90,actor_3_facebook_likes:635,  actor_1_facebook_likes:962,	gross:9402410,	  num_voted_users:11233,cast_total_facebook_likes:3715, facenumber_in_poster:1,	plot_keywords:"adult humor|best friend|friend|halloween|teenage girl",        movie_imdb_link:"http://www.imdb.com/title/tt1663143/?ref_=fn_tt_tt_1", num_user_for_reviews:32, language:"English", country:"USA",  budget:14000000, actor_2_facebook_likes:925,   imdb_score:5.4, aspect_ratio:2.35, movie_facebook_likes:0}	
	];

