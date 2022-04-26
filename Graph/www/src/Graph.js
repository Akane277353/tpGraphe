/*####################################################
Graph
####################################################*/

/*####################################################
Graph
####################################################*/
function setupGraph() {
	return [
	[],
	[]
	]
}

function estVide(g){
	return g[0].length == 0 && g[1].length == 0;
}


/*####################################################
Neux
####################################################*/


//ADD

function addNeux(Graph,name,data){
	let id = getIdNeux(Graph,name);
	if (id != -1) {
		throw "Il existe déjà un neu de ce nom !"
	}else{
		Graph[0].push([name,data]);
	}
	
	return Graph;
}

//GET
function getNeuName(neu){
	return neu[0];
}
function getNeuData(neu){
	return neu[1];
}
function getIdNeux(Graph,name) {
	let id = -1;
	for (var i = 0; i < Graph[0].length; i++) {
		if (Graph[0][i][0] == name) {
			id = i;
		}
	}
	return id;
}
function getAllNeu(Graph) {
	return Graph[0];
}


function getNeux(Graph,name) {
	let id = getIdNeux(Graph,name);
	if (id == -1) {
		console.log(name);
		throw "Aucun neux connu sous ce nom !";
	}
	return Graph[0][id];
}

function nbNeux(Graph) {
	return Graph[0].length;
}

//DEL
function DelNeu(Graph,name) {
	Graph = DelAllLink(Graph,name);
	let ls = [];
	for (var i = 0; i < Graph[0].length; i++) {
		if (Graph[0][i][0] != name) {
			ls.push(Graph[0][i]);
		}
	}
	Graph[0] = ls;
	return Graph;

}

/*####################################################
Link
####################################################*/
//ADD
function link(Graph,name1,name2,type = null){
	let add = true;
	let id1 = getIdNeux(Graph,name1);
	if (id1 == -1) {
		add = false;
		console.log(name1);
		throw "Aucun neux connu sous ce nom !";

	}
	let id2 = getIdNeux(Graph,name2);
	if (id2 == -1) {
		add = false;
		console.log(name2);
		throw "Aucun neux connu sous ce nom !";
	}
	let existe = false;
	for (var i = 0; i < Graph[1].length && existe == false; i++) {
		if (Graph[1][i][0] == name1 && Graph[1][i][1] == name2 && Graph[1][i][2] == type) {
			existe = true
		}
		if (Graph[1][i][0] == name2 && Graph[1][i][1] == name1 && Graph[1][i][2] == type) {
			existe = true
		}
	}
	if (existe == false && add) {
		Graph[1].push([name1,name2,type]);
	}
			
		
	
	
	return Graph;
}
//function 
function linksInNeux(links) {
	let ls = [];
	for (var i = 0; i < links.length; i++) {
		ls.push(links[i][1]);
	}
	return ls;
}
//GET
function GetLinkInfo(link) {
	return link[0];
}
function GetLinkNeux(link) {
	return link[1];
}
function GetLinksByType(Graph,name,type) {
	let links = GetLinks(Graph,name);
	let ls = [];
	for (var i = 0; i < links.length; i++) {
		
		if (links[i][0] == type) {
			ls.push(links[i]);

		}
	}
	return ls;
}
function GetLinks(Graph,name){
	let ls = [];
	for (var i = 0; i < Graph[1].length; i++) {
		if(Graph[1][i][0] == name){
			ls.push([Graph[1][i][2],getNeux(Graph,Graph[1][i][1])]);
		}
		if(Graph[1][i][1] == name){
			ls.push([Graph[1][i][2],getNeux(Graph,Graph[1][i][0])]);
		}
	}
	return ls;
}

//DEL
function DumpLink(Graph) {
	Graph[1] = [];
	return Graph;
}

function DelAllLink(Graph,name) {
	let ls = [];
	for (var i = 0; i < Graph[1].length; i++) {
		if (Graph[1][i][0] != name && Graph[1][i][1] != name) {
			ls.push(Graph[1][i]);
		}
	}
	Graph[1] = ls;
	return Graph;	
}

function DelLink(Graph,name1,name2) {
	let ls = [];
	for (var i = 0; i < Graph[1].length; i++) {
		if ((Graph[1][i][0] != name1 || Graph[1][i][1] != name2) && (Graph[1][i][1] != name1 || Graph[1][i][0] != name2)) {
			ls.push(Graph[1][i]);
		}
	}
	Graph[1] = ls;
	return Graph;
}


/*####################################################
code
####################################################*/

function neuxEstDansTab(neu,tab) {
	let id = -1;
	for (var j = 0; j < tab.length; j++) {
		if (getNeuName(neu) == getNeuName(tab[j])) {
			id = j;
		}
	}
	return id != -1;
}
function ajoutTabNeux(tab,newTab) {
	for (var i = 0; i < newTab.length; i++) {
		
		if (neuxEstDansTab(newTab[i],tab) == false) {
			tab.push(newTab[i]);
		}
	}
	return tab;
}

function graphLargeurDabort(Graph,name) {
	let ls = [getNeux(Graph,name)];
	let lecture = 0;
	let max = graphProfondeurDabort(Graph,name).length;

	while (ls.length < max){
		let newTab = [];
		for (var i = 0; i < ls.length; i++) {
			let nameC = getNeuName(ls[i]);
			let links = linksInNeux(GetLinks(Graph,nameC));
			newTab = ajoutTabNeux(newTab,links);
		}
		ls = ajoutTabNeux(ls,newTab);
	}

	return ls;
}
function uniqueNeux(base,soustraire) {
	let ls = [];
	for (var i = 0; i < base.length; i++) {
		if (neuxEstDansTab(base[i],soustraire)==false) {
			ls.push(base[i]);
		}
	}
	return ls;
}
function graphProfondeurDabortRec(Graph,neu,ls){
	let links = linksInNeux(GetLinks(Graph,getNeuName(neu)));
	ls = ajoutTabNeux(ls,[neu]);
	links = uniqueNeux(links,ls);
	
	if(links.length != 0) {
		for (var i = 0; i < links.length; i++) {
			if (neuxEstDansTab(links[i],ls) == false) {
				ls = ajoutTabNeux(ls,graphProfondeurDabortRec(Graph,links[i],ls));
			}
		}
	}
	return ls;
}

function graphProfondeurDabort(Graph,name) {
	let ls = [];
	let lecture = 0;
	ls = graphProfondeurDabortRec(Graph,getNeux(Graph,name),ls);

	return ls;
}
function isConnexe(Graph) {
	let test = true;
	let neux = getAllNeu(Graph);
	return graphLargeurDabort(Graph,getNeuName(neux[0])).length == neux.length;
}

try{
	module.exports = {
		//initialisation
		init : setupGraph,
		//neux
		NAdd : addNeux,
		NGetName : getNeuName,
		NGetID : getIdNeux,
		NGetAll : getAllNeu,
		NGet : getNeux, 
		NNb : nbNeux,
		NDel : DelNeu,
		//link

		Link : link,
		LGet : GetLinks,
		LGetByType : GetLinksByType,
		LGetInfo : GetLinkInfo,
		LGetNeux : GetLinkNeux,
		LDump : DumpLink,
		LDelAll : DelAllLink,
		LDel : DelLink,

		//function
		NeuxInArray : neuxEstDansTab,
		MergeArrayNeux : ajoutTabNeux,
		SoustraireNeuxArray : uniqueNeux,

		isConnexe : isConnexe,

		//Parcourt
		ParLargeurDabort : graphLargeurDabort,
		ParProfondeurDabort : graphProfondeurDabort,

		//test
		test : function (Graph){
			let graph = Graph.init();
			for (var i = 1; i <= 7; i++) {
				graph = Graph.NAdd(graph,i,["num1",i]);
			}

			graph = Graph.Link(graph,2,3);
			graph = Graph.Link(graph,1,3,"link");
			graph = Graph.Link(graph,1,4,"link");
			graph = Graph.Link(graph,4,7,"link");
			graph = Graph.Link(graph,7,1,"link");
			graph = Graph.Link(graph,5,7,"link");
			graph = Graph.Link(graph,7,6,"link");


			console.log("###################### Largeur");
			console.log(Graph.ParLargeurDabort(graph,4));


			console.log("###################### Profondeur");
			console.log(Graph.ParProfondeurDabort(graph,4));



			console.log("###################### Connexe Vrai");
			console.log(Graph.isConnexe(graph));


			for (var i = 1; i <= 3; i++) {
				graph = Graph.NAdd(graph,10+i,["num2",i]);
			}

			console.log("###################### Connexe Faux");
			console.log(Graph.isConnexe(graph));


			console.log("###################### Links ALL");
			console.log(Graph.LGet(graph,3));
			console.log("###################### Links TYPE link");
			console.log(Graph.LGetByType(graph,3,"link"));
		}
	}
}catch{
	console.log("err exports");
}