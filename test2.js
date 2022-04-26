const puppeteer = require('puppeteer');
const C = require('./module');
const fs = require('fs')

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
    console.log(e)
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
        console.log(e)
    }
    return friend
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
            tab.push([liste[i].name.split("\n")[0], [liste[i].picture, randint(0, 255), randint(0, 255), randint(0, 255)]])
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
        console.log(e)
      }

    if (! private){
        try {
            lFollowers = await getInfo(browser, page, url, 1)
        } catch (e){
            console.log(e)
        }

        try {
            lFollowing = await getInfo(browser, page, url, 2)
        } catch (e){
            console.log(e)
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


async function scrapInsta(browser, page, pseudo) {

    var url = "https://www.instagram.com/" + pseudo + "/"

    await page.goto(url);
    
    var tab = []
    var lFriends = []


        var {lFollowers, lFollowing} = await info(browser, page, url)

        tab = await beautify(tab, lFollowers.liste)
        tab = await beautify(tab, lFollowing.liste)
        // SEND

        lFriends = await getFriendFrom2l(pseudo, lFollowers.liste, lFollowing.liste)
        lFriends = await follow(lFriends, lFollowers.liste, pseudo)
        lFriends = await follow(lFriends, lFollowing.liste, pseudo)
        // SEND
    
    console.log("terminado")
    return {tab, lFriends}
}

async function getImg(browser, page){
    await page.waitForSelector('div[class="eC4Dz"]');
    let info = await page.evaluate(() => {
        let imgData = document.getElementsByTagName("img")[0];
        return imgData.src;
    });
    return info;
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
    var newL = {tab:[], lFriends:[]}
    var amis = await getFriend(tab.lFriends)
    for (var i = 0; i < amis.length; i++){
        for (var j = 0; j < liste.tab.length; j++){
            if (amis[i] == liste.tab[j][0]){
                newL.tab.push(liste.tab[j])
                newL.lFriends.push([pseudo, amis[i], "Amis"])
            }
        }
    }
    return newL
}

async function getAll(browser, page, liste){
    console.log("getAll")
    try {
        var amis = await getFriend(liste.lFriends)
        for (var i = 0; i < amis.length; i++){
            try {
                friend = await scrapInsta(browser, page, amis[i])
                var add = await addFriendListe(liste, friend, amis[i])
                console.log(add)
                // SEND
            } catch (e){
                console.log(e)
            }
        }

    } catch (e){
        console.log(e)
    }
    return 0
}

async function init(){
    const {browser, page} = await connect("https://www.instagram.com");

    var tab = []
    var friend = []

    //ninitrotroz

    try {
        friend = await scrapInsta(browser, page, "quentinurbex")
    } catch (e){
        console.log(e)
    }

    try {
        console.log("try")
       ok = await getAll(browser, page, friend)
    } catch (e){
        console.log(e)
    }

    /*
    console.log("tab[0]")
    console.log(tab)
    console.log("friend")
    console.log(friend)
    */
    console.log("terminado")
    await closeBrowser(browser);
}

init()