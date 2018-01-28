var data;

(function(data) {

data.parties = data.parties.map(party);
data.topics = data.topics.map(topic);

data.topic = function(name) {
  var t = topic({name: name, re: new RegExp("\\b(" + d3.requote(name) + ")\\b", "gi")}, data.topics.length);
  data.topics.push(t);
  return t;
};

function party(party) {
  party.speeches = party.speeches.map(speech);
  party.sections = sections(party.speeches);
  party.wordCount = d3.sum(party.sections, function(d) { return countWords(d.speech.text.substring(d.i, d.j)); });
  return party;
}

function speech(text, i) {
  return {text: text, id: i};
}

function sections(speeches) {
  var speakerRe = /(?:\n|^)([A-Z\.()\- ]+): /g,
      sections = [];

  speeches.forEach(function(speech) {
    var speakerName = "AUDIENCE",
        match,
        i = speakerRe.lastIndex = 0;
    while ((match = speakerRe.exec(speech.text))) {
      if (match.index > i) sections.push({speaker: speakerName, speech: speech, i: i, j: match.index});
      speakerName = match[1];
      i = speakerRe.lastIndex;
    }
    sections.push({speaker: speakerName, speech: speech, i: i, j: speech.text.length});
  });

  return sections.filter(function(d) { return !/^AUDIENCE\b/.test(d.speaker); });
}

function topic(topic, i) {
  topic.id = i;
  topic.count = 0;
  topic.cx = topic.x;
  topic.cy = topic.y;

  topic.parties = data.parties.map(function(party) {
    var count = 0,
        mentions = [];

    party.sections.forEach(function(section) {
      var text = section.speech.text.substring(section.i, section.j), match;
      topic.re.lastIndex = 0;
      while ((match = topic.re.exec(text))) {
        ++count;
        mentions.push({
          topic: topic,
          section: section,
          i: section.i + match.index,
          j: section.i + topic.re.lastIndex
        });
      }
    });

    topic.count += count = count / party.wordCount * 1000;
    return {count: count, mentions: mentions};
  });

  return topic;
}

window.topic = topic;

function countWords(text) {
  return text.split(/\s+/g)
      .filter(function(d) { return d !== "—"; })
      .length;
}

})(data =
{ parties:
  [ { name: "democrat"
    , speeches:
      [
        "BILL SHORTEN: " +
        "Women and Men of Australia\n",
, "DONALD TRUMP -SATIRE: McGann also predicted that Trump was too chickensh!t to pick up the phone and make the call himself He was right Ultimately Trump tried to coerce several other staff members to do it All refused And he didn't have the stones to do his own Dirty Work.\n"
, "ALICE: Because of a crooked electorate which Trump don't deny The Republicans and Trump are nothing but a bunch of lying criminals Blue in 2018 and 2020 At least Obama won both the Electorate and the Popular vote https://t.co/Z6r3j8rIAK\n"
, "BENBEN: ‘Look at the car wreck! Morning Joe laughs out loud at Sean Hannity’s ‘desperation over Trump-Mueller report https://t.co/KdlvTq7Hru\n"
, "OANDA ALERTS: #MarketPulse Trump Davos Speech Headlines Lively Session [https://t.co/UMPde5XoU9 https://t.co/M2HFjJEe3a\n"
, "ALAN BERK: he hasn`t been that great for economy obama set the table f for this so i make some money and i guess i`m part of the 1 per cent THE DAMAGE TRUMP IS DOING MIGHT NOT BE REPAIRABLE\n"
, "THE PHODOGRAPHER: Good for them The best way to deal with Trump is to Embarrass him during a Live Media covered Event #REBUKETRUMPONAIR\n"
, "MULBERRY STREET #FBPE: Personally I'm less impressed by Trump claiming he would like to apologise for retweeting views held by a far-right fringe group views which led to the murder of a sitting MP than I would be by him saying he denounced and no longer holds those views himself.\n"
, "USANATIONALIST4TRUMP: Dems opposing a immigration deal that gives them 1.8 million new voters &amp maybe political control of a state or 2 cus trump asks for some cuts is super chutzpah shows a deal is not wat they want\n"
, "JERRY REINOEHL: Correct some are This one purchased at the first NC Trump rally in 2015 does not have a source tag That's why we need to MAGA so the hats will be produced here https://t.co/m4mnFXwW3k\n"
, "USA-MAGA-BLOCKED: He gave them a VERY generous offer and they refused it DACA folks must be livid already protested Schumer DACA expires in March Trump is giving Dems rope to hang themselves They never learn CHILL.\n"
, "THE CALM SCRIBE: Trump has to do everything better than everyone else Including bringing the doomsday clock closer to midnight Thanks for that.\n"
, "ZACH COOK: can you explain how trump has anything with the pats or super bowl Your article was complete trash\n"
, "STABLE GENIUS: 'The classic four stages of #Trump #denial 1 I didn't do it!1 2 I don't remember it!1!1! 3 It wasn't a big deal!1!1! !1!1! 4 Who did YOU vote for?!?!???!1!?ß?\n"
, "SWATTEX1: Actually no...not everyone got the same treatment as Trump And yes the “progressives have been marching whining and been over the top since he was President-elect that’s not impressive or profound in any form.\n"
, "BTYSHEEN: Trump:we going 2 build the biggest bestest beautiful wall Mexico is going 2 pay 4 it Trumpers:qYEAH #MAGA WINNING Trump:we going 2 build biggest wall &amp get the money bk from mexico Trumpers yeah MAGA Trump:we going 2 build the wall &amp 4 u2 give me 25 billion Trumpers yeah #maga\n"
, "GLOVESAREOFF: The abridged Trump Dictionary Fake News Shxt gotta cover this up Believe Me=I’m lying to you Trust Me=I’m still lying Hoax=Oh crap they know about Rusher Witch Hunt damn this guy Mueller is too clean I may not be able to fool him A deal of Love I love myself.\n"
, "AMERICAN LOSER: He did do it He ordered McGahan to fire Mueller. McGahan refused. It's like hiring someone to kill someone and paying them but they refuse to do it That's still a crime The Trump Crime Family is going down Bigly Not #sad https://t.co/RzV4hLZMoa\n"
, "LEAH #LOVEMYPLANET: Who said we have a government Constitution suspended under Patriot act Americans are ignorant and we got Trump How lucky can you get https://t.co/bZ9ZrVsIvy\n"
, "MERVYN SULLIVAN: President Trump should defer any visit to the UK until after the UK has taken back its independence &amp sovereignty from the EU hopefully in March 2019 Only them should the UK be worthy of a visit from THE GREAT MAN!!!!\n"
, "SMITTY: What's pretty much guaranteeing that Trump will talk with Mueller is everyone telling him not to. 'You're not the boss of me!'\n"
, "WALID MUHAMMAD: The 2018 ranking taken at the end of the past year gives us insight into whether Trump has truly made America great again The result is most disappointing The U.S has fallen from its No 4 position in 2016 to now being No 8 in the world US News https://t.co/n9dFej8Kqq\n"
, "BORNEO TRADING GROUP: Watch President Trump speak at the World Economic Forum in Davos https://t.co/39KIeEu5KC\n"
, "SECRET SOCIETY STABLE GENIUS:  berset Everyone has a look on their face that says 'Wow Trump really is a shithole.'\n"
, "US POLITICS 247: WATCH Donald Trump Mike Pence Hold Rally in Cleveland OH LIVE Stream Right Side Broadcasting https://t.co/4svnj4irH1\n"
, "DONT PUT NAME ON TWI: Trump’s First Year Was a Successful War on Obama’s Eight https://t.co/iJxVWjBYAH\n"
, "MICHELE SCHIESSER: Donald Trump crashes the gasbag party at Davos Washington Times Wesley Pruden He seems to be having a good time https://t.co/1TjYIRIf4h\n"
, "GRASS ROOTS: Trump ‘Apologises to Piers Morgan for Britain First Retweets https://t.co/EWkblkxTGh https://t.co/CKFfnElhY6\n"
, "SEOUL KOREA DP: Asian shares recoup losses dollar steady as eyes on Trump CT Post #losses https://t.co/NhaPM3kFgw\n"
, "DON'BEABABY: More money This lady deserves more money She had sexual relations with trump She deserves a boatload of money. Therapy’s expensive.\n"
, "IAN PFEIFFER: One side of the media is over the top pro Trump the other suffers from Trump derangement syndrome both sides are regularly having to retract their stories and the entire Media wonders why we their audience thinks they're all full of s***\n"
, "BIG FLORIDA: The best guys keep up the great work America 1st again under President Trump Thank the good Lord above 🇺🇸\n"
, "TIMOTHY JOHNSON: Paul Ryan and no other republican wants to stand up against trump as long as they get what they want.\n"
, "HIKING2COLORADO: Guggenheim Museum insults Trump family with offer of golden toilet for White House https://t.co/3IOWOKcS26 #FoxNews ��� 😂\n"
, "ESTEBAN TRUJILLO: Brother Patrick J Buchanan outlines the true crime of President Trump obstruction of injustice The cabal atop.. https://t.co/ufVxZXcKBe\n"
, "#RELEASETHEMEMO #INSURANCEPOLICY #SECRETSOCIETY: Trump's son in law is Jewish his daughter converted he is a personal friend of the PM of Israel and strong support for Israel has been a pillar of his foriegn policy so far Try again 'Muh Racist, or 'Muh anti Semite doesn't work without facts anymore\n"
, "KVAN:  Sevigny Whoa you with your whole 198 you’re so popular ��� get a life Trump is 20 steps ahead of you Demokkkrats ❄ libtards Just sit back and watch the show but make sure you have safe spaces.\n"
, "WKJ: Wap Kon Jorge News:https://t.co/xADQnHNgrd President Trump’s presence in Davos Switzerland is notable for several reasons starting with his values which are clearly at odds with the forum’s majority https://t.co/PsZFM9hYNf https://t.co/Y50c2jxQOT\n"
, "AMY HAMILTON: Trump administration wants to end NASA funding for the International Space Station by 2025 https://t.co/JVCsGsPfNT via https://t.co/9tV8CFVVpK\n"
, "KELLY GETCHE: ��� The America First president comes to Davos Read Trump's full exclusive interview with CNBC CNBC https://t.co/VyYrUicvkf\n"
, "MARIA: Trump is not a spoiled rich kid?\n"
, "PATRIOT 24/7: 🦅President Trump says a report that he ordered special counsel Robert Mueller fired in June 2017 is #FakeNews‼ https://t.co/aj9JInUU1I\n"
, "SHARE B.C NEWS: Trump Ordered Mueller Fired but Backed Off When White House Counsel Threatened to Quit New York Times https://t.co/FvbYUNMgJp\n"
, "ICONNEWS: Check out my new blog post https://t.co/9Bffie1KeQ\n"
, "KRQE.COM HEADLINES: Here’s what Trump wants in an immigration bill https://t.co/7A19qI6A0D\n"
, "EMPEROR COMMODUS LLC: Watch President Trump speak at the World Economic Forum in Davos https://t.co/3IXHcukSbr\n"
, "THE IRISHMAN: via Trump speaks in Davos addresses the World Economic Forum - live blog https://t.co/dPVKWmZpE4 #tcot https://t.co/Dkb7US54CO\n"
, "ANDY SCHMICKLE: Your publicly stated position appears to be forcing a racist poison pill aimed to please white nationalists in order to restore something that existed when Trump took office That's not fake news That's just reprehensible.\n"
, "AUGUSTIN KARASANGABO: The Latest Trump calls Rwandan President Kagame a 'friend https://t.co/x1IZyJlke6 #FoxNews\n"
, "MARILYN HOLZ 111: As my late husband Art used to say in his best W Virginia drawl ... YEEHAW! ~~ O’Donnell said “It says.. https://t.co/5HKOLld5U6\n"
      ]
    }
  , { name: "republican"
    , speeches:
      [
        "MALCOLM TURNBULL: " +
        "Thank you, thank you very much.\n",
, "BOB GESSERT: your prediction about Trump is just as crazy as you are Your Open Society is the REAL danger to America! We will continue to ensure the DNC falls heavily! Finally getting the corrupt asses out of government! We ARE MAGA Go away you fear monger!\n"
, "BG: Hes literally none of those things hahahaha but whatever keep living in your fantasy world with Trump as the boogeyman Ps.. take a look at ur 401k and economy and stock market and consumer confidence What a bad guy right Look at companies raising minimum wage Youre a fool.\n"
, "K.B.: Soros calls Trump administration a 'danger to the world https://t.co/yjtJLgnA71 #FoxNews &gt;Comming from a war criminal Another clown who needs to keep his mouth shut.\n"
, "TIM BAK: “If you are telling me they’re horrible people horrible racist people I would certainly apologise if you’d like me to do that I think he means apologize to the horrible racist people .. bc always 'good people on both sides of racism. https://t.co/xo9AirAfun\n"
, "MITCH METZGER: The people that join these marches are either naive uninformed socialists muslim lesbians gays anti-Trump,.. https://t.co/8JS4ouNaC9\n"
, "LIVEDAVE: Trump calls report he ordered Mueller fired 'fake news CBS News #liar https://t.co/u1FoQn0cDa\n"
, "NICK KELSIER: Put down the crack pipe Dnesh And quit letting trump *** you up the ***\n"
, "KARLA: Not interested in his hate trump and let’s give illegals a free ride speech Dems have nothing else\n"
, "GENE BRYANT: Jerry Falwell Jr Defends Trump Amid Porn Star Affair Allegations 'We Are All Equally Bad https://t.co/HcLDNSdHF5\n"
, "EMILYSUMIKO: Wouldn't make enough money Maybe they'll just act like Trump never happened and try other go back to just being conservative.\n"
, "ROSSILY COMPRESSED: Fake News A control freak's ramblings Not a thing Dismissed To send away Trump 'Dismisses as fake news A thing in a megalomaniac's head not an actual thing 'Trump alleges to be fake news accurate?\n"
, "THE ROSE BUSHES: In Davos Trump Calls Mueller Report 'Fake News https://t.co/9ucBB1h3Bk\n"
, "THELUCY3: Oh wait that's math trump not educated enough for simple math Old dirty family money buys them their degrees Clearly didn't buy them any class or common sense or decency.\n"
, "THEMALAYSIANINSIGHT: Trump sends ‘warmest regards to African leaders after alleged slur https://t.co/JJV6FgaMm8\n"
, "THOMAS C EDWARDS 111: He justified his re-tweet and took no responsibility for any damage he may have done There can be no justification for his re-tweeting something from a radical organization Trump doesn't have the ability to say he's sorry for anything he's done.\n"
, "DUANE DA`VEIN: The Democrats aren't going to accept any deal that Trump brings to the table Trump knows that There is no way the Democrats will let Trump take any credit for helping those illegal aliens known as dreamers.\n"
, "WTVC NEWSCHANNEL 9: NEW Trump calls NYTimes report he ordered Mueller's firing 'fake news' https://t.co/SckeI2yiUx\n"
, "NEVERGIVEUP: Oh pls Trump have trillions away in tax cuts And companies are not govignwage hikes which would be long term like tax cuts They are giving one time bonus as sops And daft people are celebrating that.\n"
, "BLACK HAWK:  sara We strongly condemned Nikki Haley for her statements in the UN General Assembly regarding Jerusalem as capital of Israel She and Trump should go to hell Obama/Clinton for whatever bad they did DID NOT GAVE JERUSALEM TO ISRAEL.\n"
, "CHRIS BOYD: Obstruction of Justice,you name it Trump should be going to jail.\n"
, "CATHERINE CHISNALL: I think because they have been told that Hillary (and Bill Clinton are much worse than Trump and do much worse things That is the only possible reason I can think of.\n"
, "CARLO: How much credit should be given to the Trump administration for the rallies on Wall Street has mentioned it at least 25 times this month.\n"
, "KASTA KEYPS: It's not a sincere apology from Trump at all I agree 😔😡\n"
, "KAREN DAVIDSON:  dek There are more senators and representatives that believed this secret society fake news Even Trump did Shows you how stupid these people are They should be voted out of office.\n"
      ]
    }
  ]
, speakers:
  {

    "BILL SHORTEN":
    { name: "Bill Shorten"
    , title: "Opposition Leader (Labor Party)"
    },

 "BEST OFFSHORE BROKER": { name: "BEST OFFSHORE BROKER", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "BOB GESSERT": { name: "BOB GESSERT", title: "Date: 26 Jan 2018 Rating: -0.205" } ,
 "FREDDY": { name: "FREDDY", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "DONALD TRUMP -SATIRE": { name: "DONALD TRUMP -SATIRE", title: "Date: 26 Jan 2018 Rating: 0.027" } ,
 "MITZI LIVINGSTON": { name: "MITZI LIVINGSTON", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "BG": { name: "BG", title: "Date: 26 Jan 2018 Rating: -0.071" } ,
 "K.B.": { name: "K.B.", title: "Date: 26 Jan 2018 Rating: -0.400" } ,
 "ALICE": { name: "ALICE", title: "Date: 26 Jan 2018 Rating: 0.075" } ,
 "BENBEN": { name: "BENBEN", title: "Date: 26 Jan 2018 Rating: 0.100" } ,
 "TIM BAK": { name: "TIM BAK", title: "Date: 26 Jan 2018 Rating: -0.417" } ,
 "COLLEY CIBBER": { name: "COLLEY CIBBER", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "MITCH METZGER": { name: "MITCH METZGER", title: "Date: 26 Jan 2018 Rating: -0.300" } ,
 "OANDA ALERTS": { name: "OANDA ALERTS", title: "Date: 26 Jan 2018 Rating: 0.136" } ,
 "ALAN BERK": { name: "ALAN BERK", title: "Date: 26 Jan 2018 Rating: 0.800" } ,
 "THE PHODOGRAPHER": { name: "THE PHODOGRAPHER", title: "Date: 26 Jan 2018 Rating: 0.612" } ,
 "DAISY VIVALDI": { name: "DAISY VIVALDI", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "LIVEDAVE": { name: "LIVEDAVE", title: "Date: 26 Jan 2018 Rating: -0.500" } ,
 "MULBERRY STREET #FBPE": { name: "MULBERRY STREET #FBPE", title: "Date: 26 Jan 2018 Rating: 0.417" } ,
 "USANATIONALIST4TRUMP": { name: "USANATIONALIST4TRUMP", title: "Date: 26 Jan 2018 Rating: 0.157" } ,
 "JERRY REINOEHL": { name: "JERRY REINOEHL", title: "Date: 26 Jan 2018 Rating: 0.250" } ,
 "COACHH2015": { name: "COACHH2015", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "NICK KELSIER": { name: "NICK KELSIER", title: "Date: 26 Jan 2018 Rating: -0.156" } ,
 "USA-MAGA-BLOCKED": { name: "USA-MAGA-BLOCKED", title: "Date: 26 Jan 2018 Rating: 0.200" } ,
 "THE CALM SCRIBE": { name: "THE CALM SCRIBE", title: "Date: 26 Jan 2018 Rating: 0.350" } ,
 "CSM": { name: "CSM", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "KARLA": { name: "KARLA", title: "Date: 26 Jan 2018 Rating: -0.175" } ,
 "GENE BRYANT": { name: "GENE BRYANT", title: "Date: 26 Jan 2018 Rating: -0.700" } ,
 "CHRISTOPHER STOKES": { name: "CHRISTOPHER STOKES", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "ZACH COOK": { name: "ZACH COOK", title: "Date: 26 Jan 2018 Rating: 0.217" } ,
 "KRYSTYNA4450": { name: "KRYSTYNA4450", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "STABLE GENIUS": { name: "STABLE GENIUS", title: "Date: 26 Jan 2018 Rating: 0.083" } ,
 "SWATTEX1": { name: "SWATTEX1", title: "Date: 26 Jan 2018 Rating: 0.017" } ,
 "BTYSHEEN": { name: "BTYSHEEN", title: "Date: 26 Jan 2018 Rating: 0.675" } ,
 "GLOVESAREOFF": { name: "GLOVESAREOFF", title: "Date: 26 Jan 2018 Rating: 0.095" } ,
 "AMERICAN LOSER": { name: "AMERICAN LOSER", title: "Date: 26 Jan 2018 Rating: 0.047" } ,
 "LEAH #LOVEMYPLANET": { name: "LEAH #LOVEMYPLANET", title: "Date: 26 Jan 2018 Rating: 0.333" } ,
 "MERVYN SULLIVAN": { name: "MERVYN SULLIVAN", title: "Date: 26 Jan 2018 Rating: 0.333" } ,
 "SMITTY": { name: "SMITTY", title: "Date: 26 Jan 2018 Rating: 0.250" } ,
 "ZA NEWS": { name: "ZA NEWS", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "EMILYSUMIKO": { name: "EMILYSUMIKO", title: "Date: 26 Jan 2018 Rating: -0.042" } ,
 "WALID MUHAMMAD": { name: "WALID MUHAMMAD", title: "Date: 26 Jan 2018 Rating: 0.113" } ,
 "DEBORAH DICLEMENTI": { name: "DEBORAH DICLEMENTI", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "ROSSILY COMPRESSED": { name: "ROSSILY COMPRESSED", title: "Date: 26 Jan 2018 Rating: -0.220" } ,
 "ERICD": { name: "ERICD", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "THE ROSE BUSHES": { name: "THE ROSE BUSHES", title: "Date: 26 Jan 2018 Rating: -0.500" } ,
 "BORNEO TRADING GROUP": { name: "BORNEO TRADING GROUP", title: "Date: 26 Jan 2018 Rating: 0.200" } ,
 "SECRET SOCIETY STABLE GENIUS": { name: "SECRET SOCIETY STABLE GENIUS", title: "Date: 26 Jan 2018 Rating: 0.150" } ,
 "US POLITICS 247": { name: "US POLITICS 247", title: "Date: 26 Jan 2018 Rating: 0.211" } ,
 "DR ALI BAKEER": { name: "DR ALI BAKEER", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "JEFF M": { name: "JEFF M", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "DONT PUT NAME ON TWI": { name: "DONT PUT NAME ON TWI", title: "Date: 26 Jan 2018 Rating: 0.500" } ,
 "THE ROSE BUSHES": { name: "THE ROSE BUSHES", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "THELUCY3": { name: "THELUCY3", title: "Date: 26 Jan 2018 Rating: -0.117" } ,
 "MICHELE SCHIESSER": { name: "MICHELE SCHIESSER", title: "Date: 26 Jan 2018 Rating: 0.700" } ,
 "GRASS ROOTS": { name: "GRASS ROOTS", title: "Date: 26 Jan 2018 Rating: 0.250" } ,
 "BILL PRESS": { name: "BILL PRESS", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "SEOUL KOREA DP": { name: "SEOUL KOREA DP", title: "Date: 26 Jan 2018 Rating: 0.083" } ,
 "DON'BEABABY": { name: "DON'BEABABY", title: "Date: 26 Jan 2018 Rating: 0.250" } ,
 "IAN PFEIFFER": { name: "IAN PFEIFFER", title: "Date: 26 Jan 2018 Rating: 0.021" } ,
 "UTNEWS": { name: "UTNEWS", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "BIG FLORIDA": { name: "BIG FLORIDA", title: "Date: 26 Jan 2018 Rating: 0.625" } ,
 "KIGALI NEWS": { name: "KIGALI NEWS", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "TIMOTHY JOHNSON": { name: "TIMOTHY JOHNSON", title: "Date: 26 Jan 2018 Rating: 0.071" } ,
 "NEIL FOX": { name: "NEIL FOX", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "HIKING2COLORADO": { name: "HIKING2COLORADO", title: "Date: 26 Jan 2018 Rating: 0.089" } ,
 "KIGALI NEWS": { name: "KIGALI NEWS", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "ESTEBAN TRUJILLO": { name: "ESTEBAN TRUJILLO", title: "Date: 26 Jan 2018 Rating: 0.350" } ,
 "THEMALAYSIANINSIGHT": { name: "THEMALAYSIANINSIGHT", title: "Date: 26 Jan 2018 Rating: -0.050" } ,
 "LANI MICHELLE 2.0": { name: "LANI MICHELLE 2.0", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "THOMAS C EDWARDS 111": { name: "THOMAS C EDWARDS 111", title: "Date: 26 Jan 2018 Rating: -0.050" } ,
 "DUANE DA`VEIN": { name: "DUANE DA`VEIN", title: "Date: 26 Jan 2018 Rating: -0.500" } ,
 "#RELEASETHEMEMO #INSURANCEPOLICY #SECRETSOCIETY": { name: "#RELEASETHEMEMO #INSURANCEPOLICY #SECRETSOCIETY", title: "Date: 26 Jan 2018 Rating: 0.133" } ,
 "KVAN": { name: "KVAN", title: "Date: 26 Jan 2018 Rating: 0.360" } ,
 "WTVC NEWSCHANNEL 9": { name: "WTVC NEWSCHANNEL 9", title: "Date: 26 Jan 2018 Rating: -0.182" } ,
 "WKJ": { name: "WKJ", title: "Date: 26 Jan 2018 Rating: 0.150" } ,
 "AMY HAMILTON": { name: "AMY HAMILTON", title: "Date: 26 Jan 2018 Rating: 0.100" } ,
 "KELLY GETCHE": { name: "KELLY GETCHE", title: "Date: 26 Jan 2018 Rating: 0.300" } ,
 "NEVERGIVEUP": { name: "NEVERGIVEUP", title: "Date: 26 Jan 2018 Rating: -0.050" } ,
 "BLACK HAWK": { name: "BLACK HAWK", title: "Date: 26 Jan 2018 Rating: -0.072" } ,
 "MARIA": { name: "MARIA", title: "Date: 26 Jan 2018 Rating: 0.375" } ,
 "CHRIS BOYD": { name: "CHRIS BOYD", title: "Date: 26 Jan 2018 Rating: -0.100" } ,
 "BLOG OFFICIAL": { name: "BLOG OFFICIAL", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "CATHERINE CHISNALL": { name: "CATHERINE CHISNALL", title: "Date: 26 Jan 2018 Rating: -0.200" } ,
 "CARLO": { name: "CARLO", title: "Date: 26 Jan 2018 Rating: -0.050" } ,
 "PATRIOT 24/7": { name: "PATRIOT 24/7", title: "Date: 26 Jan 2018 Rating: 0.357" } ,
 "SHARE B.C NEWS": { name: "SHARE B.C NEWS", title: "Date: 26 Jan 2018 Rating: 0.068" } ,
 "ICONNEWS": { name: "ICONNEWS", title: "Date: 26 Jan 2018 Rating: 0.136" } ,
 "KRQE.COM HEADLINES": { name: "KRQE.COM HEADLINES", title: "Date: 26 Jan 2018 Rating: 0.200" } ,
 "KAI": { name: "KAI", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "EMPEROR COMMODUS LLC": { name: "EMPEROR COMMODUS LLC", title: "Date: 26 Jan 2018 Rating: 0.200" } ,
 "THE IRISHMAN": { name: "THE IRISHMAN", title: "Date: 26 Jan 2018 Rating: 0.168" } ,
 "SCOTT CROSSON": { name: "SCOTT CROSSON", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "KASTA KEYPS": { name: "KASTA KEYPS", title: "Date: 26 Jan 2018 Rating: -0.250" } ,
 "KAREN DAVIDSON": { name: "KAREN DAVIDSON", title: "Date: 26 Jan 2018 Rating: -0.300" } ,
 "ANDY SCHMICKLE": { name: "ANDY SCHMICKLE", title: "Date: 26 Jan 2018 Rating: 0.083" } ,
 "AUGUSTIN KARASANGABO": { name: "AUGUSTIN KARASANGABO", title: "Date: 26 Jan 2018 Rating: 0.500" } ,
 "MARILYN HOLZ 111": { name: "MARILYN HOLZ 111", title: "Date: 26 Jan 2018 Rating: 0.350" } ,
 "WESTERN WISC AFL-CIO": { name: "WESTERN WISC AFL-CIO", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "MARSHALL FANT IV": { name: "MARSHALL FANT IV", title: "Date: 26 Jan 2018 Rating: 0.000" } ,
 "JTOMKA": { name: "JTOMKA", title: "Date: 26 Jan 2018 Rating: 0.000" } 

    , "MALCOLM TURNBULL":
    { name: "Malcolm Turnbull"
    , title: "Prime Minister of Australia (Liberal)"
    }

  }
, topics:
  [
       { name: "President", re: /\b(president)\b/gi, x: 491, y: 200 },
       { name: "new", re: /\b(new)\b/gi, x: 76, y: 556 },
       { name: "fake", re: /\b(fake)\b/gi, x: 84, y: 512 },
       { name: "Davos", re: /\b(davos)\b/gi, x: 887, y: 543 },
       { name: "money", re: /\b(money)\b/gi, x: 879, y: 488 },
       { name: "people", re: /\b(people)\b/gi, x: 640, y: 652 },
       { name: "MAGA", re: /\b(maga)\b/gi, x: 386, y: 655 },
       { name: "call", re: /\b(call)\b/gi, x: 584, y: 162 },
       { name: "Mueller", re: /\b(mueller)\b/gi, x: 802, y: 342 },
       { name: "deal", re: /\b(deal)\b/gi, x: 152, y: 157 },
       { name: "want", re: /\b(want)\b/gi, x: 58, y: 509 },
       { name: "thing", re: /\b(thing)\b/gi, x: 725, y: 834 },
       { name: "time", re: /\b(time)\b/gi, x: 540, y: 213 },
       { name: "report", re: /\b(report)\b/gi, x: 592, y: 77 },
       { name: "ordered", re: /\b(ordered)\b/gi, x: 720, y: 429 },
       { name: "Watch", re: /\b(watch)\b/gi, x: 77, y: 696 },
       { name: "America", re: /\b(america)\b/gi, x: 154, y: 577 },
       { name: "great", re: /\b(great)\b/gi, x: 214, y: 478 },
       { name: "good", re: /\b(good)\b/gi, x: 799, y: 86 },
       { name: "going", re: /\b(going)\b/gi, x: 234, y: 817 },
       { name: "side", re: /\b(side)\b/gi, x: 631, y: 804 },
       { name: "everyone", re: /\b(everyone)\b/gi, x: 785, y: 761 },
       { name: "re", re: /\b(re)\b/gi, x: 711, y: 826 },
       { name: "think", re: /\b(think)\b/gi, x: 739, y: 823 },
       { name: "racist", re: /\b(racist)\b/gi, x: 98, y: 376 },
       { name: "give", re: /\b(give)\b/gi, x: 532, y: 288 },
       { name: "wall", re: /\b(wall)\b/gi, x: 537, y: 296 },
       { name: "Oh", re: /\b(oh)\b/gi, x: 181, y: 461 },
       { name: "much", re: /\b(much)\b/gi, x: 188, y: 827 }
  ]
});

(function() {

var width = 970,
    height = 540;

var collisionPadding = 4,
    clipPadding = 4,
    minRadius = 16, // minimum collision radius
    maxRadius = 65, // also determines collision search radius
    maxMentions = 100, // don't show full transcripts
    activeTopic; // currently-displayed topic

var formatShortCount = d3.format(",.0f"),
    formatLongCount = d3.format(".1f"),
    formatCount = function(d) { return (d < 10 ? formatLongCount : formatShortCount)(d); };

var r = d3.scale.sqrt()
    .domain([0, d3.max(data.topics, function(d) { return d.count; })])
    .range([0, maxRadius]);

var force = d3.layout.force()
    .charge(0)
    .size([width, height - 80])
    .on("tick", tick);

var node = d3.select(".g-nodes").selectAll(".g-node"),
    label = d3.select(".g-labels").selectAll(".g-label"),
    arrow = d3.select(".g-nodes").selectAll(".g-note-arrow");

d3.select(".g-nodes").append("rect")
    .attr("class", "g-overlay")
    .attr("width", width)
    .attr("height", height)
    .on("click", clear);

d3.select(window)
    .on("hashchange", hashchange);

d3.select("#g-form")
    .on('keydown', count)
    .on("submit", submit);

updateTopics(data.topics);
hashchange();

// Update the known topics.
function updateTopics(topics) {
  topics.forEach(function(d) {
    d.r = r(d.count);
    d.cr = Math.max(minRadius, d.r);
    d.k = fraction(d.parties[0].count, d.parties[1].count);
    if (isNaN(d.k)) d.k = .5;
    if (isNaN(d.x)) d.x = (1 - d.k) * width + Math.random();
    d.bias = .5 - Math.max(.1, Math.min(.9, d.k));
  });
  force.nodes(data.topics = topics).start();
  updateNodes();
  updateLabels();
  updateArrows();
  tick({alpha: 0}); // synchronous update
}

// Update the displayed nodes.
function updateNodes() {
  node = node.data(data.topics, function(d) { return d.name; });

  node.exit().remove();

  var nodeEnter = node.enter().append("a")
      .attr("class", "g-node")
      .attr("xlink:href", function(d) { return "#" + encodeURIComponent(d.name); })
      .call(force.drag)
      .call(linkTopic);

  var democratEnter = nodeEnter.append("g")
      .attr("class", "g-democrat");

  democratEnter.append("clipPath")
      .attr("id", function(d) { return "g-clip-democrat-" + d.id; })
    .append("rect");

  democratEnter.append("circle");

  var republicanEnter = nodeEnter.append("g")
      .attr("class", "g-republican");

  republicanEnter.append("clipPath")
      .attr("id", function(d) { return "g-clip-republican-" + d.id; })
    .append("rect");

  republicanEnter.append("circle");

  nodeEnter.append("line")
      .attr("class", "g-split");

  node.selectAll("rect")
      .attr("y", function(d) { return -d.r - clipPadding; })
      .attr("height", function(d) { return 2 * d.r + 2 * clipPadding; });

  node.select(".g-democrat rect")
      .style("display", function(d) { return d.k > 0 ? null : "none" })
      .attr("x", function(d) { return -d.r - clipPadding; })
      .attr("width", function(d) { return 2 * d.r * d.k + clipPadding; });

  node.select(".g-republican rect")
      .style("display", function(d) { return d.k < 1 ? null : "none" })
      .attr("x", function(d) { return -d.r + 2 * d.r * d.k; })
      .attr("width", function(d) { return 2 * d.r; });

  node.select(".g-democrat circle")
      .attr("clip-path", function(d) { return d.k < 1 ? "url(#g-clip-democrat-" + d.id + ")" : null; });

  node.select(".g-republican circle")
      .attr("clip-path", function(d) { return d.k > 0 ? "url(#g-clip-republican-" + d.id + ")" : null; });

  node.select(".g-split")
      .attr("x1", function(d) { return -d.r + 2 * d.r * d.k; })
      .attr("y1", function(d) { return -Math.sqrt(d.r * d.r - Math.pow(-d.r + 2 * d.r * d.k, 2)); })
      .attr("x2", function(d) { return -d.r + 2 * d.r * d.k; })
      .attr("y2", function(d) { return Math.sqrt(d.r * d.r - Math.pow(-d.r + 2 * d.r * d.k, 2)); });

  node.selectAll("circle")
      .attr("r", function(d) { return r(d.count); });
}

// Update the displayed node labels.
function updateLabels() {
  label = label.data(data.topics, function(d) { return d.name; });

  label.exit().remove();

  var labelEnter = label.enter().append("a")
      .attr("class", "g-label")
      .attr("href", function(d) { return "#" + encodeURIComponent(d.name); })
      .call(force.drag)
      .call(linkTopic);

  labelEnter.append("div")
      .attr("class", "g-name")
      .text(function(d) { return d.name; });

  labelEnter.append("div")
      .attr("class", "g-value");

  label
      .style("font-size", function(d) { return Math.max(8, d.r / 2) + "px"; })
      .style("width", function(d) { return d.r * 2.5 + "px"; });

  // Create a temporary span to compute the true text width.
  label.append("span")
      .text(function(d) { return d.name; })
      .each(function(d) { d.dx = Math.max(d.r * 2.5, this.getBoundingClientRect().width); })
      .remove();

  label
      .style("width", function(d) { return d.dx + "px"; })
    .select(".g-value")
      .text(function(d) { return formatShortCount(d.parties[0].count) + " - " + formatShortCount(d.parties[1].count); });

  // Compute the height of labels when wrapped.
  label.each(function(d) { d.dy = this.getBoundingClientRect().height; });
}

// Update the active topic.
function updateActiveTopic(topic) {
  d3.selectAll(".g-head").attr("class", topic ? "g-head g-has-topic" : "g-head g-hasnt-topic");
  if (activeTopic = topic) {
    node.classed("g-selected", function(d) { return d === topic; });
    updateMentions(findMentions(topic));
    d3.selectAll(".g-head a").text(topic.name);
    d3.select(".g-democrat .g-head span.g-count").text(formatCount(topic.parties[0].count));
    console.log(topic.parties[0].count);
    d3.select(".g-republican .g-head span.g-count").text(formatCount(topic.parties[1].count));
    console.log(topic.parties[1].count);
  } else {
    node.classed("g-selected", false);
    updateMentions(sampleMentions());
    d3.selectAll(".g-head a").text("various topics");
    d3.selectAll(".g-head span.g-count").text("some number of");
  }
}

// Update displayed excerpts.
function updateMentions(mentions) {
  var column = d3.selectAll(".g-mentions")
      .data(mentions);

  column.select(".g-truncated")
      .style("display", function(d) { return d.truncated ? "block" : null; });

  var mention = column.selectAll(".g-mention")
      .data(groupMentionsBySpeaker, function(d) { return d.key; });

  mention.exit().remove();

  mention.selectAll("p")
      .remove();

  var mentionEnter = mention.enter().insert("div", ".g-truncated")
      .attr("class", "g-mention");

  mentionEnter.append("div")
      .attr("class", "g-speaker")
      .text(function(d) { var s = data.speakers[d.key]; return s ? s.name : d.key; });

  mentionEnter.append("div")
      .attr("class", "g-speaker-title")
      .text(function(d) { var s = data.speakers[d.key]; return s && s.title; });

  mention
      .sort(function(a, b) { return b.values.length - a.values.length; });

  var p = mention.selectAll("p")
      .data(function(d) { return d.values; })
    .enter().append("p")
      .html(function(d) { return d.section.speech.text.substring(d.start, d.end).replace(d.topic.re, "<a>$1</a>"); });

  if (activeTopic) {
    p.attr("class", "g-hover");
  } else {
    p.each(function(d) {
      d3.select(this).selectAll("a")
          .datum(d.topic)
          .attr("href", "#" + encodeURIComponent(d.topic.name))
          .call(linkTopic);
    });
  }
}

// Bind the arrow path elements with their associated topic.
function updateArrows() {
  arrow = arrow.data(
      data.topics.filter(function(d) { return d.arrow; }),
      function(d) { return this.id ? this.id.substring(8) : d.arrow; });
}

// Return a random sample of mentions per party, one per topic.
// Mentions are returned in chronological order.
function sampleMentions() {
  return data.parties.map(function(party, i) {
    return data.topics
        .map(function(d) { return d.parties[i].mentions; })
        .filter(function(d) { return d.length; })
        .map(function(d) { return d[Math.floor(Math.random() * d.length)]; })
        .sort(orderMentions);
  });
}

// Return displayable mentions per party for the specified topic.
// If too many, a random sample of matching mentions is returned.
// Mentions are returned in chronological order.
function findMentions(topic) {
  return data.parties.map(function(party, i) {
    var mentions = topic.parties[i].mentions;
    if (mentions.length > maxMentions) {
      shuffle(mentions).length = maxMentions;
      mentions.sort(orderMentions);
      mentions.truncated = true;
    }
    return mentions;
  });
}

// Group mentions by speaker, collapse overlapping excerpts.
function groupMentionsBySpeaker(mentions) {
  return d3.nest()
      .key(function(d) { return d.section.speaker; })
      .rollup(collapseMentions)
      .entries(mentions);
}

// Given an array of mentions, computes the start and end point of the context
// excerpt, and then collapses any overlapping excerpts.
function collapseMentions(mentions) {
  var sentenceRe = /([!?.)]+)\s+/g, // sentence splitting requires NLP
      i,
      n = mentions.length,
      d0,
      d1;

  // First compute the excerpt contexts.
  for (i = 0; i < n; ++i) {
    d0 = mentions[i];
    d0.start = excerptStart(d0);
    d0.end = excerptEnd(d0);
  }

  // Then collapse any overlapping excerpts (from the same speech).
  for (i = 1, d1 = mentions[0]; i < n; ++i) {
    d0 = d1;
    d1 = mentions[i];
    if (d1.section.speech.id === d0.section.speech.id
        && d1.start >= d0.start
        && d1.start < d0.end) {
      d1.start = -1;
      d0.end = d1.end;
      d1 = d0;
    }
  }

  // Returns the start index of the excerpt for the specified mention.
  function excerptStart(mention) {
    var i = sentenceRe.lastIndex = Math.max(mention.section.i, mention.i - 80), match;
    while (match = sentenceRe.exec(mention.section.speech.text)) {
      if (match.index < mention.i - 20) return match.index + match[0].length;
      if (i <= mention.section.i) break;
      sentenceRe.lastIndex = i = Math.max(mention.section.i, i - 20);
    }
    return mention.section.i;
  }

  // Returns the end index of the excerpt for the specified mention.
  function excerptEnd(mention) {
    var i = mention.section.j, match;
    sentenceRe.lastIndex = mention.j + 40;
    match = sentenceRe.exec(mention.section.speech.text);
    return match ? Math.min(match.index + match[1].length, i) : i;
  }

  return mentions.filter(function(d) { return d.start >= 0; });
}

// Orders mentions chronologically: by speech and position within speech.
function orderMentions(a, b) {
  return a.section.speech.id - b.section.speech.id || a.i - b.i;
}

// Assign event handlers to topic links.
function linkTopic(a) {
  a   .on("click", click)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
}

// Returns the topic matching the specified name, approximately.
// If no matching topic is found, returns undefined.
function findTopic(name) {
  for (var i = 0, n = data.topics.length, t; i < n; ++i) {
    if ((t = data.topics[i]).name === name || new RegExp("^" + (t = data.topics[i]).re.source + "$", "i").test(name)) {
      return t;
    }
  }
}

// Returns the topic matching the specified name, approximately.
// If no matching topic is found, a new one is created.
function findOrAddTopic(name) {
  var topic = findTopic(name);
  if (!topic) {
    topic = data.topic(name.substring(0, 1).toUpperCase() + name.substring(1));
    topic.y = 0;
    updateTopics(data.topics);
  }
  return topic;
}

// Simulate forces and update node and label positions on tick.
function tick(e) {
  node
      .each(bias(e.alpha * 105))
      .each(collide(.5))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  label
      .style("left", function(d) { return (d.x - d.dx / 2) + "px"; })
      .style("top", function(d) { return (d.y - d.dy / 2) + "px"; });

  arrow.style("stroke-opacity", function(d) {
    var dx = d.x - d.cx, dy = d.y - d.cy;
    return dx * dx + dy * dy < d.r * d.r ? 1: 0;
  });
}

// A left-right bias causing topics to orient by party preference.
function bias(alpha) {
  return function(d) {
    d.x += d.bias * alpha;
  };
}

// Resolve collisions between nodes.
function collide(alpha) {
  var q = d3.geom.quadtree(data.topics);
  return function(d) {
    var r = d.cr + maxRadius + collisionPadding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    q.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d) && d.other !== quad.point && d !== quad.point.other) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.cr + quad.point.r + collisionPadding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

// Fisher–Yates shuffle.
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// Given two quantities a and b, returns the fraction to split the circle a + b.
function fraction(a, b) {
  var k = a / (a + b);
  if (k > 0 && k < 1) {
    var t0, t1 = Math.pow(12 * k * Math.PI, 1 / 3);
    for (var i = 0; i < 10; ++i) { // Solve for theta numerically.
      t0 = t1;
      t1 = (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) / (1 - Math.cos(t0));
    }
    k = (1 - Math.cos(t1 / 2)) / 2;
  }
  return k;
}

// Update the active topic on hashchange, perhaps creating a new topic.
function hashchange() {
  var name = decodeURIComponent(location.hash.substring(1)).trim();
  updateActiveTopic(name && name != "!" ? findOrAddTopic(name) : null);
}

// Count how many matches your current word has.
// Count how many matches your current word has.
function count() {
  var name = this.search, have, nums = ['', ''];
  setTimeout(function() {
    name = name.value.trim();
    if (name.length) {
      have = topic({ name: name
                   , re: new RegExp("\\b(" + d3.requote(name) + ")\\b", "gi")
                   });
      nums = have.parties.map(function(d) { return d.mentions.length; });
    }
    d3.selectAll('.word-count').data(nums).text(function(d){return d;});
  }, 0);
}

// Trigger a hashchange on submit.
function submit() {
  var name = this.search.value.trim();
  location.hash = name ? encodeURIComponent(name) : "!";
  this.search.value = "";
  d3.event.preventDefault();
}

// Clear the active topic when clicking on the chart background.
function clear() {
  location.replace("#!");
}

// Rather than flood the browser history, use location.replace.
function click(d) {
  location.replace("#" + encodeURIComponent(d === activeTopic ? "!" : d.name));
  d3.event.preventDefault();
}

// When hovering the label, highlight the associated node and vice versa.
// When no topic is active, also cross-highlight with any mentions in excerpts.
function mouseover(d) {
  node.classed("g-hover", function(p) { return p === d; });
  if (!activeTopic) d3.selectAll(".g-mention p").classed("g-hover", function(p) { return p.topic === d; });
}

// When hovering the label, highlight the associated node and vice versa.
// When no topic is active, also cross-highlight with any mentions in excerpts.
function mouseout(d) {
  node.classed("g-hover", false);
  if (!activeTopic) d3.selectAll(".g-mention p").classed("g-hover", false);
}

})();
