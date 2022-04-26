
/*####################################################
Import
####################################################*/
const Graph = require('./www/src/Graph.js');
const Exp = require('express');
var cookieParser = require('cookie-parser');
const formidable = require('formidable');



const puppeteer = require('puppeteer-core');
const C = require('./modules/login.js');
const fs = require('fs');

/*####################################################
Test
####################################################*/
//Graph.test(Graph);


//console.log(Graph.ParProfondeurDabort(graphTest,user[0]));


/*####################################################
Const
####################################################*/
const Port = 1024;
const PortSocket = 1024;

const IP = "127.0.0.1";
const app = Exp();
var http = require('http').createServer(app);
var io = require("socket.io")(http);
const MaxSetData = 10;
const NbByCookie = 30;
/*####################################################
Serveur
####################################################*/
app.use(Exp.static('www'));
app.use(cookieParser());


let Data = [
  [
    ['poupipou',null],
    [ 'silver_peach_', null ],
    [ 'overdoom345', null ],
    [ 'franck.mirolo_', null ],
    [ 'm_enorii', null ],
    [ 'doudou_bibiche', null ],
    [ 'dogan.can.sener.55', null ],
    [ 'franck.mirolo_78', null ],
    [ 'carla_tebaldini', null ],
    [ 'serrao_andrea', null ],
    [ 'carla_tebaldini_', null ],
    [ 'carlatebaldini', null ],
    [ 'nunuche77557', null ],
    [ 'vvaalleennttiinnee02', null ],
    [ '___angela123___', null ],
    [ 'sachaxv', null ],
    [ 'rp_yaoi_hen', null ],
    [ 'butime001', null ],
    [ 'alexia_calypso_viper', null ],
    [ 'blookydub', null ],
    [ 'egan_dussaut', null ],
    [ 'sophie.vincent90', null ],
    [ 'handball_championnat', null ],
    [ 'carlatebaldini213', null ],
    [ 'tevia.r', null ]
  ],
  [
    [ 'silver_peach_', 'overdoom345', 'Amis' ],
    [ 'silver_peach_', 'franck.mirolo_', 'Amis' ],
    [ 'silver_peach_', 'm_enorii', 'Amis' ],
    [ 'silver_peach_', 'doudou_bibiche', 'Amis' ],
    [ 'silver_peach_', 'dogan.can.sener.55', 'Amis' ],
    [ 'silver_peach_', 'franck.mirolo_78', 'Amis' ],
    [ 'silver_peach_', 'carla_tebaldini', 'Amis' ],
    [ 'silver_peach_', 'serrao_andrea', 'Amis' ],
    [ 'silver_peach_', 'carla_tebaldini_', 'Amis' ],
    [ 'silver_peach_', 'carlatebaldini', 'Amis' ],
    [ 'silver_peach_', 'nunuche77557', 'Amis' ],
    [ 'silver_peach_', 'vvaalleennttiinnee02', 'Amis' ],
    [ 'silver_peach_', '___angela123___', 'Amis' ],
    [ 'silver_peach_', 'sachaxv', 'Amis' ],
    [ 'silver_peach_', 'rp_yaoi_hen', 'Amis' ],
    [ 'silver_peach_', 'butime001', 'Amis' ],
    [ 'silver_peach_', 'alexia_calypso_viper', 'Amis' ],
    [ 'poupipou', 'silver_peach_', 'Amis' ],
    [ 'poupipou', 'overdoom345', 'Amis' ],
    [ 'poupipou', 'franck.mirolo_', 'Amis' ],
    [ 'poupipou', 'm_enorii', 'Amis' ],
    [ 'poupipou', 'doudou_bibiche', 'Amis' ],
    [ 'poupipou', 'dogan.can.sener.55', 'Amis' ],
    [ 'poupipou', 'franck.mirolo_78', 'Amis' ],
    [ 'poupipou', 'carla_tebaldini', 'Amis' ],
    [ 'poupipou', 'serrao_andrea', 'Amis' ],
    [ 'poupipou', 'carla_tebaldini_', 'Amis' ],
    [ 'poupipou', 'carlatebaldini', 'Amis' ],
    [ 'poupipou', 'nunuche77557', 'Amis' ],
    [ 'poupipou', 'vvaalleennttiinnee02', 'Amis' ],
    [ 'poupipou', '___angela123___', 'Amis' ],
    [ 'poupipou', 'sachaxv', 'Amis' ],
    [ 'poupipou', 'rp_yaoi_hen', 'Amis' ],
    [ 'poupipou', 'butime001', 'Amis' ],
    [ 'poupipou', 'alexia_calypso_viper', 'Amis' ],
    [ 'poupipou', 'blookydub', 'Amis' ],
    [ 'poupipou', 'egan_dussaut', 'Amis' ],
    [ 'poupipou', 'sophie.vincent90', 'Amis' ],
    [ 'poupipou', 'handball_championnat','Amis' ],
    [ 'poupipou', 'carlatebaldini213', 'Amis' ],
    [ 'poupipou', 'tevia.r', 'Follow' ]
  ]
];


app.post('/search', (req, res) => {
	let PageErr = '<!DOCTYPE html><html><head><title>Action</title></head><body onload="main();"></body></html><script type="text/javascript">function main() {document.location.href="http://'+IP+':'+Port+'/";}</script>';
	let PageRes = '<!DOCTYPE html><html><head><title>Action</title></head><body onload="main();"></body></html><script type="text/javascript">function main() {document.location.href="http://'+IP+':'+Port+'/app.html";}</script>';

	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
		let pseudo = fields.pseudo;
		if (estVide(pseudo) || estSrc(pseudo)) {
			res.clearCookie("pseudo");
			res.send(PageErr);
		} else {
            res.clearCookie("pseudo");
            res.cookie("pseudo",pseudo);
            res.send(PageRes);
		}

	});
});

http.listen(Port, () => {
    console.log('Server app listening on port ' + Port);
});



function newConnection(socket) {//Fonction qui gère les connexions
    //les trackeurs / lisener
    SocTracker(socket);
    //WEBadd(socket, `user${WEBcpt}`);

    //code a executé lors de la première conexion
    console.log("nouvel Recherche !");
}

function SocTracker(socket) {
    socket.on("disconnect", WebTrackDisconnction);//déconnection
    socket.on("search",function(data){
        console.log(data);

        // for (var i = 0; i < Data[0].length; i++) {
        //     sendNoeu(socket,Data[0][i][0],{
        //         color:[randint(0,255),randint(0,255),randint(0,255)]
        //     });
        // }
        // for (var i = 0; i < Data[1].length; i++) {
        //     sendLink(socket,Data[1][i][0],Data[1][i][1],Data[1][i][2]);
        // }
        //let pseudo = "pepito_.sama";
        let pseudo = "quentinurbex";
        init(socket,pseudo);
        
        
    });
}

function WebTrackDisconnction(data) {
    console.log("Recherche Terminer");
}

function sendNoeu(socket,pseudo,data){
    socket.emit("Noeu",[pseudo,data]);
}
function sendLink(socket,pseudo1,pseudo2,type){
    socket.emit("Link",[pseudo1,pseudo2,type]);
}
//execute "newConnection" lors de la conexion d'un nouvelle utilisateur
io.on('connection', newConnection);

/*####################################################
Function
####################################################*/

function estVide(txt) {
	return txt.split("\n").join("").split(" ").join("").split("\t").join("").split("\r").join("") == "";
}
function estSrc(txt) {
	return txt.split("<").length > 1 || txt.split(">").length > 1 || txt.split("`").length > 1;
}

function randint(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}


/*####################################################
Code
####################################################*/

async function startBrowser() {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium',
        headless: false
      });
    //const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return {browser, page};
}

async function closeBrowser(browser) {
    return browser.close();
}

async function connect(url) {
    const {browser, page} = await startBrowser();
    page.setViewport({width: 1336, height: 768});

    await page.goto(url);

    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
    await page.waitForSelector('button[type="submit"]');
    await page.type('input[name="username"]', C.username);
    await page.type('input[name="password"]', C.password);
    await page.click('button[type="submit"]');
    await page.evaluate(() => {
        document.querySelector('button[type="submit"]').click();
    })
    await page.waitForNavigation();
    await page.click('button[type="button"]');
    await page.evaluate(() => {
        document.querySelector('button[type="button"]').click();
    })
    await page.waitForNavigation();
    /*await page.evaluate(() => {
        document.querySelector('button').click();
    })*/
    return {browser, page};
}

async function scroll(page)
{
  await page.waitForTimeout(2500)
  try {
    await page.evaluate(()=>{
      document.querySelector('div[class="PZuss"]').scrollIntoView(false);
    });
  }catch (e){
    console.log("processing...")
  }
}

// check if account is private or not
async function checkPrivate(browser, page, url){
    await page.waitForSelector('h2');
    let isPrivateAccount = await page.evaluate(() => {
        // check selector exists
        if (document.getElementsByTagName('h2')[1]){
            if(document.getElementsByTagName('h2')[1].textContent == 'This Account is Private') {
                return true;
            } 
        } else {return false};
    });
    return isPrivateAccount
}

async function getInfo(browser, page, url, int){
    
    await page.goto(url);
    await page.waitForSelector('.wW3k-');
    let liste = [];
    
    if (int == 1){
    let listeBalises = await page.evaluate(() => {
        let infos = document.querySelectorAll('.g47SY');
        infos[1].click();
        return 1;
    });
  }
  else{
    let listeBalises = await page.evaluate(() => {
      let infos = document.querySelectorAll('.g47SY');
      infos[2].click();
      return 1;
  });
  }
  var count = 0
    var stop = false;
    let info = [];
    await page.waitForSelector('div[class="PZuss"]');
    while (!stop && count < 10)
    {
     await scroll(page)

      info = await page.evaluate(() => {
          let l = [];
          let infos = document.querySelectorAll('div[class="t2ksc"]');
          for (info of infos){
              let imgData = info.getElementsByTagName("img")[0];
              let img = "-1";
              if(imgData != undefined){
                  img = imgData.src;
              }
              l.push({
                  name: info.innerText,
                  picture: "" + img,
              })
          }
          return l;
      });
      if (liste.length !== 0 && info.length !== 0)
      {
        if (liste.length == info.length)
        {
          stop = true;
        }
      }
      liste = info;
      info = [];
      await page.waitForTimeout(1000)
      count = count + 1;
    }
    return {liste};
}

function randint(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function tabToString(tab){
    for (var i = 0; i < tab.length; i++){
        console.log(tab[i])
    }
}

async function getFriendFrom2l(pseudo, liste1, liste2){
    var friend = []
    try {
        for(var i = 0; i < liste1.length; i++){
            for(var j = 0; j < liste2.length; j++){
                if(liste1[i].name == liste2[j].name){
                    friend.push([pseudo, liste2[j].name.split("\n")[0], "Amis"])
                }
            }
        }
    }catch (e){
        console.log("processing...")
    }
    return friend
}

async function getFriend(tab){
    console.log("getFriend")
    var friend = []
    for (var i = 0; i < tab.length; i++){
        if (tab[i][2] == "Amis"){
            friend.push(tab[i][1])
        }
    }
    return friend
}

async function addFriendListe(liste, tab, pseudo){
    console.log("addFriendListe")
    var amis = await getFriend(tab.lFriends)
    for (var i = 0; i < amis.length; i++){
        for (var j = 0; j < liste.tab.length; j++){
            if (amis[i] == liste.tab[j][0]){
                liste.lFriends.push([pseudo, amis[i], "Amis"])
            }
        }
    }
    return liste
}

async function beautify(tab, liste){
    for (var i = 0; i < liste.length; i++){
        var inside = false
        for (var j = 0; j < tab.length; j++){
            if (tab[j][0] == liste[i].name.split("\n")[0]){
                inside = true
            }
        }
        if (!inside){
            tab.push([liste[i].name.split("\n")[0], [liste[i].picture, [randint(0, 255), randint(0, 255), randint(0, 255)]]])
        }
    }
    return tab
}


async function info(browser, page, url){
    var lFollowers = []
    var lFollowing = []
    private = false
    try {
        private = await checkPrivate(browser, page, url)
      }catch (e){
        console.log("processing...")
      }

    if (! private){
        try {
            lFollowers = await getInfo(browser, page, url, 1)
        } catch (e){
            console.log("processing...")
        }

        try {
            lFollowing = await getInfo(browser, page, url, 2)
        } catch (e){
            console.log("processing...")
        }
    } else {
        liste = []
        lfollowers = [].push(liste)
        lFollowing = [].push(liste)
    }
    return {lFollowers, lFollowing}
}

async function follow(friends, tab, pseudo){
    for (var i = 0; i < tab.length; i++){
        var inside = false
        for (var j = 0; j < friends.length; j++){
            if (tab[i].name.split("\n")[0] == friends[j][1] && friends[j][0] == pseudo){
                inside = true
            }
        }
        if (! inside){
            friends.push([pseudo, tab[i].name.split("\n")[0], "Follower"])
        }
    }
    return friends
}
async function following(friends, tab, pseudo){
    for (var i = 0; i < tab.length; i++){
        var inside = false
        for (var j = 0; j < friends.length; j++){
            if (tab[i].name.split("\n")[0] == friends[j][1] && friends[j][0] == pseudo){
                inside = true
            }
        }
        if (! inside){
            friends.push([pseudo, tab[i].name.split("\n")[0], "Following"])
        }
    }
    return friends
}

async function getImg(browser, page){
    await page.waitForSelector('div[class="eC4Dz"]');
    let info = await page.evaluate(() => {
        let imgData = document.getElementsByTagName("img")[0];
        return imgData.src;
    });
    return info;
}

async function scrapInsta(browser, page, pseudo) {

    var url = "https://www.instagram.com/" + pseudo + "/"

    await page.goto(url);
    
    var tab = [[pseudo, [await getImg(browser, page), [randint(0, 255), randint(0, 255), randint(0, 255)]]]]
    var lFriends = []

        var {lFollowers, lFollowing} = await info(browser, page, url)

        tab = await beautify(tab, lFollowers.liste)
        tab = await beautify(tab, lFollowing.liste)

        // SEND

        lFriends = await getFriendFrom2l(pseudo, lFollowers.liste, lFollowing.liste)
        lFriends = await follow(lFriends, lFollowers.liste, pseudo)
        lFriends = await following(lFriends, lFollowing.liste, pseudo)
        // SEND
    
    console.log("terminado")
    return {tab, lFriends}
}


async function getAll(browser, page, liste, socket){
    console.log("getAll")
    try {
        var amis = await getFriend(liste.lFriends)
        for (var i = 0; i < amis.length; i++){
            try {
                friend = await scrapInsta(browser, page, amis[i])
                liste = await addFriendListe(liste, friend, amis[i])
                console.log(liste)
                
                let tab = liste.tab;
                let lFriends = liste.lFriends;

                for (var j = 0; j < tab.length; j++) {
                    sendNoeu(socket,tab[j][0],{
                        color:tab[j][1][1],
                        img:tab[j][1][0]
                    });
                }

                for (var j = 0; j < lFriends.length; j++) {
                    sendLink(socket,lFriends[j][0],lFriends[j][1],lFriends[j][2]);
                }
            } catch (e){
                console.log("processing...")
            }
        }

    } catch (e){
        console.log("processing...")
    }
    return 0
}



async function init(socket,pseudo){
    const {browser, page} = await connect("https://www.instagram.com");

    var tab = []
    var friend = []

    try {
        friend = await scrapInsta(browser, page, pseudo,socket)
        let tab = friend.tab;

                let lFriends = friend.lFriends;

                for (var i = 0; i < tab.length; i++) {
                    sendNoeu(socket,tab[i][0],{
                        color:tab[i][1][1],
                        img:tab[i][1][0]
                    });
                }

                for (var i = 0; i < lFriends.length; i++) {
                    sendLink(socket,lFriends[i][0],lFriends[i][1],lFriends[i][2]);
                }
    } catch (e){
        console.log("processing...")
    }

    try {
        console.log("try")
       ok = await getAll(browser, page, friend,socket)
    } catch (e){
        console.log("processing...")
    }
    console.log("fin")

    await closeBrowser(browser);
}