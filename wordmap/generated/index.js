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
, "EGEILEH ANTOINE: Amazon Robotics https://t.co/cr2vi34vWS NAB (National Australia Bank)core banking general manager Andrew Cresp revealed the platform had been deployed to the bank’s 900 branches covering 800 employees and 8 million personal banking customers.http://…https://t.co/FFdUDATQcr\n"
, "POLITICAL HEDGE: Refreshing Your Memory: Previously Posted on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "NATIONWIDE CONTAINER: Australian Business Conditions Surge to Highest on Record The sentiment index jumped seven points to 21 in October and was driven by spikes in sales and profitability gauges according to a National Australia Bank Ltd survey of more than 400 firms con.. https://t.co/XL2dEQ67yk\n"
, "PAUL EBELING: National Australia Bank Limited (NAB:AX Stock Worth Watching Live Trading News https://t.co/ANFBLewQ0V via\n"
, "PROPERTY NETWORK X: The head of Australia's largest agricultural lender National Australia Bank's Khan Horne says the rural property market is running hotter than ever before because of strong fundamentals and low interest rates https://t.co/nG9M4lQpZH #ruralproperty #farming #agriculture\n"
, "MARK THOMAS: ‘Singapore's childcare workers earn just 38 per cent of the national median wage Those in Australia pull in earnings at 91 per cent of the national median. #Singapore Reserve Bank head commenting that more needs to be done to “professionalise the sector https://t.co/9p6eRdIjTu https://t.co/gJFxxr5o0K\n"
, "PROPERTY HQ: The head of Australia's largest agricultural lender National Australia Bank's Khan Horne says the rural property market is running hotter than ever before because of strong fundamentals and low interest rates https://t.co/nG9M4lQpZH #ruralproperty #farming #agriculture\n"
, "LYNDSEY SIMPSON: Great digital innovation by as they integrate with Amazon Alexa https://t.co/k0xn9CisPK via\n"
, "POLITICAL HEDGE: Refreshing Your Memory: Previously Posted on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "SANDRA D KING,ED.D: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed https://t.co/yg5VygJYqZ #banking #SASinsights\n"
, "SAS SOFTWARE: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed https://t.co/yg5VygJYqZ #banking #SASinsights\n"
, "4-TRADERS.COM: National Australia Bank Australian SMSF investors remained red hot for equity in 2017 https://t.co/5zb8NRvwC8\n"
, "IMITAK: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/imJbOccIQE by #Fin  Tech https://t.co/qoaQTFlwG3\n"
, "FINTECH: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/HEZsLJBNbr https://t.co/831Aszm59E\n"
, "TAMMY B TOW: As I said in my tweets it’s based on what I’ve experienced and my reviewers We’ve worked at National Australia Bank Amazon Netflix Dropbox DigitalOcean and Salesforce Didn’t include what we don’t recommend (too much time spent writing postmortems no focus on TTP and TBF).\n"
, "CARRIE HENRY: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/HEZsLJBNbr https://t.co/831Aszm59E\n"
, "SAMUEL ROY: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/HEZsLJBNbr https://t.co/831Aszm59E\n"
, "MICHA VINOGRADOV: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/HEZsLJBNbr https://t.co/831Aszm59E\n"
, "ROBYN POPE: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/HEZsLJBNbr https://t.co/831Aszm59E\n"
, "IAIN BROWN PHD: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/HEZsLJBNbr https://t.co/831Aszm59E\n"
, "WILLIAM HENRY MORGAN: Bank of New Zealand and National Australia Group Europe Limited to a controlled entity of NAFM,\n"
, "WILLIAM HENRY MORGAN: National Australia Bank Limited is the holding company for the Group as well as the main operating company.\n"
, "WILLIAM HENRY MORGAN: National Australia Bank Limited (Exact Name of Registrant as Specified in Its Charter) Australia\n"
, "WILLIAM HENRY MORGAN: Home Information Cases Australia &amp;amp New Zealand Banking Group Ltd v National Westminster Bank Plc &amp;amp ors (2002).\n"
, "POLITICAL HEDGE: Published Precisely on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "NAENAE TRIGGA: Published Precisely on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "GREGORYMCMAHON: Published Precisely on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "POLITICAL HEDGE: Published Precisely on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "MICHAEL HOLLAND: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed https://t.co/yg5VygJYqZ #banking #SASinsights\n"
, "SAS SOFTWARE: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed https://t.co/yg5VygJYqZ #banking #SASinsights\n"
, "DETAR+PLUS: New post National Australia Bank integrates with Amazon Alexa https://t.co/VcwfzaLT9W https://t.co/mNa0GbujOa\n"
, "FRANCESC RIVEROLA: National Australia Bank 2/3 That said it is possible that the official figure underestimates the strength of growth in 2017 given that several local governments have confirmed that 2016 economic data was overstated #forex #fx #forextrading #fxtrading #forextrader #China\n"
, "FRANCESC RIVEROLA: National Australia Bank 1/3 China’s economy grew by 6.9 in 2017 (compared with 6.7 in 2016) the first acceleration in growth since 2010 This was well ahead of the Government’s annual growth target of 6.5% #forex #fx #forextrading #fxtrading #forextrader #fxtrader #China\n"
, "NINE NEWS ADELAIDE: The 'bank of mum and dad is now the fifth biggest lender in Australia with plenty of parents helping their kids get into their first property #9News https://t.co/ZNv2QJRgRb\n"
, "POLITICAL HEDGE: Published Precisely on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "KEITH ARNOLD: &amp  AU say new deals with will mean customer's banking needs are met Pity Licensed Post Offices have to provide these services at a loss to them How is this fair?? https://t.co/Ph9R7xxCVx\n"
, "LNPFAILAUS: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "STINGER: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but their farcical payments to Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "STINGER: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "JUAN ZINO RAMIREZ: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "PENNY FARTHING: Banks save $100millions as Rural &amp Regional branches are closed ideally suited to fill the void but the banks &amp must pay up as the farcical payments to Postal Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "PENNY FARTHING: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but their farcical payments to Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "PENNY FARTHING: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "PENNY FARTHING: Banks save $100millions as Rural &amp Regional branches are closed ideally suited to fill the void but the banks &amp must pay up as the farcical payments to Postal Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "PENNY FARTHING: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "ZENAGUI SIDAHMED: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed https://t.co/yg5VygJYqZ #banking #SASinsights\n"
, "SAS SOFTWARE: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed https://t.co/yg5VygJYqZ #banking #SASinsights\n"
, "ENRIQUE SALDIVAR: How National Australia Bank ( uses hackathons to find the next great idea and help small businesses succeed #banking https://t.co/JQaUNbJGbu https://t.co/snsAJ5iZ22\n"
, "4-TRADERS.COM: Fidelity National Information Services Australiaâs ME Bank Selects FIS as New Cards Platform Provider https://t.co/6lx1zfp0OL\n"
, "MAREE STEWART: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "FAYE ADAMS: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "KEITH ARNOLD: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "PLANETEARTHADVOCATE: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "ANNA K: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "JOE SHMOE: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "TIARA LUNA: National Australia Bank to charge lower interest rates to farmers employing good environmental practice valuing #NaturalCapital\n"
, "MIKEAUBREY: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "#STOPGREED: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "TROOTHMONSTAH: A $5 billion infrastructure loan scheme derided as a secretive Turnbull govt slush fund has attracted further criticism this time from National Australia Bank which says it's is cloaked in secrecy lacks governance and exposes taxpayers to a high risk of losing their money.\n"
, "KEITH ARNOLD: Both &amp  AU have entered a new deal with to provide services Why did Licensee's group only find out about this after the fact What happened to CONSULTATION https://t.co/Ph9R7xxCVx\n"
, "EDWIN CHANDLER: Banks save $100millions as Rural &amp Regional branches are closed ideally suited to fill the void but the banks &amp must pay up as the farcical payments to Postal Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "STEVEN WIBLEN: Sweet deal for BIG 4 who offload obligations to Rural &amp Regional Australia onto Licensed Post Offices PAYMENT DOESN'T COVER COSTS https://t.co/maIRM8Vx1G\n"
, "JANET OLIVER: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but their farcical payments to Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "JANET OLIVER: Banks save $100millions as Rural &amp Regional branches are closed ideally suited to fill the void but the banks &amp must pay up as the farcical payments to Postal Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "STEVEN STANLEY-JONES: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "JANET OLIVER: Both &amp  AU have entered a new deal with to provide banking services claims to always consult with Licensees why wasn't Licensee's group consulted on these deals https://t.co/Ph9R7xxCVx\n"
, "PAUL EBELING: National Australia Bank Limited (NAB.AX Bullish Divergence Live Trading News https://t.co/FONEUcUi8M via\n"
, "LYNDA FROMHOLD: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but their farcical payments to Licensees don't cover their costs? https://t.co/UxeUAaujZ8\n"
, "LYNDA FROMHOLD: Banks save $100millions as Rural &amp Regional branches are closed leaving communities feeling deserted ideally suited to fill void but Agency Payments from the banks must be sufficient for to pay Licensees fairly https://t.co/UxeUAaujZ8\n"
, "STEVEN WIBLEN: Both &amp  AU have entered a new deal with to provide services claims to always consult with Licensees why wasn't Licensee's group consulted on these deals MUTUAL BENEFIT?? https://t.co/Ph9R7xxCVx\n"
, "MADERO: Both &amp  AU have entered a new deal with to provide services Rural &amp Regional Postal Licensees were being grossly underpaid for banking transactions before these deals &amp remain so FAIR?? https://t.co/Ph9R7xxCVx\n"
, "JANET OLIVER: Sweet deal for BIG 4 who offload obligations to Rural &amp Regional Australia onto Licensed Post Offices PAYMENT DOESN'T COVER COSTS https://t.co/maIRM8Vx1G\n"
      ]
    }
  , { name: "republican"
    , speeches:
      [
        "MALCOLM TURNBULL: " +
        "Thank you, thank you very much.\n",
, "HEALTHWELLBEINGPLUS: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/6y7bMYYRZK\n"
, "VIRTUAL CURRENCY: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/curTopOJ8k\n"
, "BBX WORLD: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/m8uzBceljW\n"
, "HR AT APPZPORT: https://t.co/gjV62zYZ8n UK government loses Brexit legal challenge and Nick Parsons of National Australia Bank says https://t.co/3n2RYFuaCp\n"
, "GLOBALTRADINGMADE EZ: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/ZECYvFiqQC\n"
, "LANCE SCOULAR: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/STPqGa5DbY\n"
, "SPEAKERS SITES: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/L3D0WeT8qO\n"
, "BBX NEW SOUTH WALES: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/Jh7LYhxmAF\n"
, "SPARE CAPACITY SALES: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/maxtziTbt8\n"
, "BETTA CASH FLOW: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/JW7P6SBcYo\n"
, "CHRIS PET: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/93xUViV110\n"
, "TRADES&SERVICES BBX: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/1H4usMjhtB\n"
, "WILLIAM HENRY MORGAN: The Company traces its history back to the establishment of The National Bank of Australasia in 1858 National Australia Bank Limited is a public limited company incorporated on June 23 1893 in Australia which is the Company's MORGAN and CARROLL ASSETS\n"
, "POLITICAL HEDGE: Refresh Your Memory: Previously Posted on November 2 2017 5:09 pm║After National Australia Bank Profit Spikes They Lay Off 6,000 Workers https://t.co/D8T4rHt1WL #AFP\n"
, "GLOBAL BIZ MARKETING: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/1WBjg7WBTt\n"
, "SHARECONOMY: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/BcQNn8HzJT\n"
, "UNIVERSITY WATCH: Fact:Politicians have lied for decades about Australia needing 'foreign capital' We have some of worlds largest reserves of Gold Silver Uranium &amp land It all could have been securitised by a National Sovereign Central Bank issuing 1 100yr bonds No need for bankers #treason https://t.co/PLvGn3Bq8R\n"
, "BBX NEW SOUTH WALES: National Australia Bank Limited has refunded $1.7 million to 966 home loan customers after it failed to properly set up mortgage offset accounts via https://t.co/Jh7LYhxmAF\n"
, "ROWLAND MOSBERGEN: What has helped me as a #RSE is my varied background running a small business and writing code for Merril Lynch and National Australia Bank Because engineering is just as much about dealing with people as it is about dealing with technical problems &amp solutions.\n"
, "JESUS VELAZQUEZ: Kamakura for #IFRS9 #CVA #CECL #Credit 100.00 consistency between KRIS default probabilities and traded bond prices for National Australia Bank Mean absolute error 16.3 cents on $100 par value bond $NAB #Australia https://t.co/pNv8FtY4Js\n"
, "DONALD VAN DEVENTER: Kamakura for #IFRS9 #CVA #CECL #Credit 100.00 consistency between KRIS default probabilities and traded bond prices for National Australia Bank Mean absolute error 16.3 cents on $100 par value bond $NAB #Australia https://t.co/pNv8FtY4Js\n"
, "KAMAKURA CORPORATION: Kamakura for #IFRS9 #CVA #CECL #Credit 100.00 consistency between KRIS default probabilities and traded bond prices for National Australia Bank Mean absolute error 16.3 cents on $100 par value bond $NAB #Australia https://t.co/pNv8FtY4Js\n"
, "GLOBALVISIONTRADERS: Stay in the loop. #forex #trading #investing National Australia Bank's Business Confidence Time Left Impact Previous Consensus Actual 11h 43min 6.0 https://t.co/JBL9eqttvU\n"
, "KEITH ARNOLD: 'An appalling trend that threatens the viability of rural communities across Australia Yet refuses to pay Licensed Post Offices viable banking payments Why?? https://t.co/Ph9R7xxCVx\n"
, "STEVEN WIBLEN: 237 bank closures &amp poor telecommunications across Rural &amp Regional Australia makes the Licensed Post Office Network a crucial piece of infrastructure Yet continues to rort &amp exploit them When will Government act https://t.co/Ph9R7xxCVx\n"
      ]
    }
  ]
, speakers:
  {

    "BILL SHORTEN":
    { name: "Bill Shorten"
    , title: "Opposition Leader (Labor Party)"
    },

 "HEALTHWELLBEINGPLUS": { name: "HEALTHWELLBEINGPLUS", title: "Date: 26 Jan 2018 Rating: -0.190" } ,
 "VIRTUAL CURRENCY": { name: "VIRTUAL CURRENCY", title: "Date: 25 Jan 2018 Rating: -0.190" } ,
 "BBX WORLD": { name: "BBX WORLD", title: "Date: 25 Jan 2018 Rating: -0.190" } ,
 "LYNN WILLIAMS": { name: "LYNN WILLIAMS", title: "Date: 25 Jan 2018 Rating: 0.000" } ,
 "RICK HELBING CFP": { name: "RICK HELBING CFP", title: "Date: 25 Jan 2018 Rating: 0.000" } ,
 "EGEILEH ANTOINE": { name: "EGEILEH ANTOINE", title: "Date: 25 Jan 2018 Rating: 0.025" } ,
 "HR AT APPZPORT": { name: "HR AT APPZPORT", title: "Date: 25 Jan 2018 Rating: -0.050" } ,
 "BENI ALIIDRUS": { name: "BENI ALIIDRUS", title: "Date: 25 Jan 2018 Rating: 0.000" } ,
 "BENI ALIIDRUS": { name: "BENI ALIIDRUS", title: "Date: 25 Jan 2018 Rating: 0.000" } ,
 "BENI ALIIDRUS": { name: "BENI ALIIDRUS", title: "Date: 25 Jan 2018 Rating: 0.000" } ,
 "BENI ALIIDRUS": { name: "BENI ALIIDRUS", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "REDMARLIN": { name: "REDMARLIN", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "AUSTRALIAN DOLLAR": { name: "AUSTRALIAN DOLLAR", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "GLOBALTRADINGMADE EZ": { name: "GLOBALTRADINGMADE EZ", title: "Date: 24 Jan 2018 Rating: -0.190" } ,
 "ED HUNTER": { name: "ED HUNTER", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "POLITICAL HEDGE": { name: "POLITICAL HEDGE", title: "Date: 24 Jan 2018 Rating: 0.167" } ,
 "LANCE SCOULAR": { name: "LANCE SCOULAR", title: "Date: 24 Jan 2018 Rating: -0.190" } ,
 "SPEAKERS SITES": { name: "SPEAKERS SITES", title: "Date: 24 Jan 2018 Rating: -0.190" } ,
 "MARK NEWTON": { name: "MARK NEWTON", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "BENI ALIIDRUS": { name: "BENI ALIIDRUS", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "BENI ALIIDRUS": { name: "BENI ALIIDRUS", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "BBX NEW SOUTH WALES": { name: "BBX NEW SOUTH WALES", title: "Date: 24 Jan 2018 Rating: -0.190" } ,
 "DAPI DAPI": { name: "DAPI DAPI", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "BEST PRESTASHOP TEMP": { name: "BEST PRESTASHOP TEMP", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "BEST PRESTASHOP TEMP": { name: "BEST PRESTASHOP TEMP", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "TICKER REPORT": { name: "TICKER REPORT", title: "Date: 24 Jan 2018 Rating: 0.000" } ,
 "NATIONWIDE CONTAINER": { name: "NATIONWIDE CONTAINER", title: "Date: 24 Jan 2018 Rating: 0.250" } ,
 "PAUL EBELING": { name: "PAUL EBELING", title: "Date: 23 Jan 2018 Rating: 0.122" } ,
 "AUSTRALIAN DOLLAR": { name: "AUSTRALIAN DOLLAR", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "AMERICAN ADVISORS": { name: "AMERICAN ADVISORS", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "KHALED AL EMADI": { name: "KHALED AL EMADI", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "#DOHA": { name: "#DOHA", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "SPARE CAPACITY SALES": { name: "SPARE CAPACITY SALES", title: "Date: 23 Jan 2018 Rating: -0.190" } ,
 "DAILY POLITICAL": { name: "DAILY POLITICAL", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "": { name: "", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "TOM ARNOLD": { name: "TOM ARNOLD", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "PROPERTY NETWORK X": { name: "PROPERTY NETWORK X", title: "Date: 23 Jan 2018 Rating: 0.144" } ,
 "MARK THOMAS": { name: "MARK THOMAS", title: "Date: 23 Jan 2018 Rating: 0.500" } ,
 "IGO INFORMATION": { name: "IGO INFORMATION", title: "Date: 23 Jan 2018 Rating: 0.000" } ,
 "PROPERTY HQ": { name: "PROPERTY HQ", title: "Date: 23 Jan 2018 Rating: 0.144" } ,
 "BETTA CASH FLOW": { name: "BETTA CASH FLOW", title: "Date: 22 Jan 2018 Rating: -0.190" } ,
 "SHIWEN YAP": { name: "SHIWEN YAP", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "DEALSTREETASIA": { name: "DEALSTREETASIA", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "CHRIS PET": { name: "CHRIS PET", title: "Date: 22 Jan 2018 Rating: -0.190" } ,
 "LYNDSEY SIMPSON": { name: "LYNDSEY SIMPSON", title: "Date: 22 Jan 2018 Rating: 0.400" } ,
 "POLITICAL HEDGE": { name: "POLITICAL HEDGE", title: "Date: 22 Jan 2018 Rating: 0.167" } ,
 "PRICES HALL": { name: "PRICES HALL", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "SANDRA D KING,ED.D": { name: "SANDRA D KING,ED.D", title: "Date: 22 Jan 2018 Rating: 0.183" } ,
 "SAS SOFTWARE": { name: "SAS SOFTWARE", title: "Date: 22 Jan 2018 Rating: 0.183" } ,
 "JAMES PEMBER": { name: "JAMES PEMBER", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "THE LINCOLNIAN": { name: "THE LINCOLNIAN", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "DEALSTREETASIA": { name: "DEALSTREETASIA", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "VLADIMIR BUDEJICKY": { name: "VLADIMIR BUDEJICKY", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "VENTURECANVAS": { name: "VENTURECANVAS", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "BRENDON LAU": { name: "BRENDON LAU", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "FOREX WARRIOR": { name: "FOREX WARRIOR", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "MATT BAKER": { name: "MATT BAKER", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "EZE WEIGHT LOSS": { name: "EZE WEIGHT LOSS", title: "Date: 22 Jan 2018 Rating: 0.000" } ,
 "4-TRADERS.COM": { name: "4-TRADERS.COM", title: "Date: 21 Jan 2018 Rating: 0.083" } ,
 "IMITAK": { name: "IMITAK", title: "Date: 21 Jan 2018 Rating: 0.183" } ,
 "FINTECH": { name: "FINTECH", title: "Date: 21 Jan 2018 Rating: 0.183" } ,
 "THE LEDGER GAZETTE": { name: "THE LEDGER GAZETTE", title: "Date: 21 Jan 2018 Rating: 0.000" } ,
 "TAMMY B TOW": { name: "TAMMY B TOW", title: "Date: 21 Jan 2018 Rating: 0.300" } ,
 "CARRIE HENRY": { name: "CARRIE HENRY", title: "Date: 21 Jan 2018 Rating: 0.183" } ,
 "SAMUEL ROY": { name: "SAMUEL ROY", title: "Date: 21 Jan 2018 Rating: 0.183" } ,
 "MICHA VINOGRADOV": { name: "MICHA VINOGRADOV", title: "Date: 21 Jan 2018 Rating: 0.183" } ,
 "ROBYN POPE": { name: "ROBYN POPE", title: "Date: 21 Jan 2018 Rating: 0.183" } ,
 "IAIN BROWN PHD": { name: "IAIN BROWN PHD", title: "Date: 21 Jan 2018 Rating: 0.183" } ,
 "TRADES&SERVICES BBX": { name: "TRADES&SERVICES BBX", title: "Date: 21 Jan 2018 Rating: -0.190" } ,
 "CREDO WEALTH": { name: "CREDO WEALTH", title: "Date: 21 Jan 2018 Rating: 0.000" } ,
 "WILLIAM HENRY MORGAN": { name: "WILLIAM HENRY MORGAN", title: "Date: 20 Jan 2018 Rating: 0.032" } ,
 "WILLIAM HENRY MORGAN": { name: "WILLIAM HENRY MORGAN", title: "Date: 20 Jan 2018 Rating: 0.048" } ,
 "WILLIAM HENRY MORGAN": { name: "WILLIAM HENRY MORGAN", title: "Date: 20 Jan 2018 Rating: -0.036" } ,
 "WILLIAM HENRY MORGAN": { name: "WILLIAM HENRY MORGAN", title: "Date: 20 Jan 2018 Rating: 0.089" } ,
 "MOHAMED KABABJI": { name: "MOHAMED KABABJI", title: "Date: 20 Jan 2018 Rating: 0.000" } ,
 "WILLIAM HENRY MORGAN": { name: "WILLIAM HENRY MORGAN", title: "Date: 20 Jan 2018 Rating: 0.136" } ,
 "CYBER COOLEE": { name: "CYBER COOLEE", title: "Date: 20 Jan 2018 Rating: 0.000" } ,
 "REDMARLIN": { name: "REDMARLIN", title: "Date: 20 Jan 2018 Rating: 0.000" } ,
 "POLITICAL HEDGE": { name: "POLITICAL HEDGE", title: "Date: 20 Jan 2018 Rating: -0.167" } ,
 "GLOBAL BIZ MARKETING": { name: "GLOBAL BIZ MARKETING", title: "Date: 20 Jan 2018 Rating: -0.190" } ,
 "JWSOAT BOT": { name: "JWSOAT BOT", title: "Date: 20 Jan 2018 Rating: 0.000" } ,
 "WEEK HERALD": { name: "WEEK HERALD", title: "Date: 20 Jan 2018 Rating: 0.000" } ,
 "MARKETBEAT": { name: "MARKETBEAT", title: "Date: 20 Jan 2018 Rating: 0.000" } ,
 "WOMENS LEGAL SERVICE": { name: "WOMENS LEGAL SERVICE", title: "Date: 20 Jan 2018 Rating: 0.000" } ,
 "SHARECONOMY": { name: "SHARECONOMY", title: "Date: 20 Jan 2018 Rating: -0.190" } ,
 "JOSE CUEVAS": { name: "JOSE CUEVAS", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "ARGENTINA PROJECT": { name: "ARGENTINA PROJECT", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "ADAM DAVEY CEO": { name: "ADAM DAVEY CEO", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "JIM REGITZ": { name: "JIM REGITZ", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "UNIVERSITY WATCH": { name: "UNIVERSITY WATCH", title: "Date: 19 Jan 2018 Rating: -0.062" } ,
 "MI INSURANCE": { name: "MI INSURANCE", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "BENI ALIIDRUS": { name: "BENI ALIIDRUS", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "LUCROR PROPERTY PTY LTD": { name: "LUCROR PROPERTY PTY LTD", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "SAKISC": { name: "SAKISC", title: "Date: 19 Jan 2018 Rating: 0.000" } ,
 "POLITICAL HEDGE": { name: "POLITICAL HEDGE", title: "Date: 19 Jan 2018 Rating: 0.400" } ,
 "NAENAE TRIGGA": { name: "NAENAE TRIGGA", title: "Date: 19 Jan 2018 Rating: 0.400" } ,
 "GREGORYMCMAHON": { name: "GREGORYMCMAHON", title: "Date: 19 Jan 2018 Rating: 0.400" } ,
 "POLITICAL HEDGE": { name: "POLITICAL HEDGE", title: "Date: 19 Jan 2018 Rating: 0.400" } ,
 "NATHAN PARKER": { name: "NATHAN PARKER", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "MICHAEL HOLLAND": { name: "MICHAEL HOLLAND", title: "Date: 18 Jan 2018 Rating: 0.183" } ,
 "SAS SOFTWARE": { name: "SAS SOFTWARE", title: "Date: 18 Jan 2018 Rating: 0.183" } ,
 "NFCBANKING": { name: "NFCBANKING", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NIK MARSHALL": { name: "NIK MARSHALL", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "MICH": { name: "MICH", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "DETAR+PLUS": { name: "DETAR+PLUS", title: "Date: 18 Jan 2018 Rating: 0.136" } ,
 "ANTHONY WELCH": { name: "ANTHONY WELCH", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "MELBOURNE NOW": { name: "MELBOURNE NOW", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NINE NEWS QUEENSLAND": { name: "NINE NEWS QUEENSLAND", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NINE NEWS AUSTRALIA": { name: "NINE NEWS AUSTRALIA", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NINE NEWS SYDNEY": { name: "NINE NEWS SYDNEY", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NINE NEWS GOLD COAST": { name: "NINE NEWS GOLD COAST", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NINE NEWS MELBOURNE": { name: "NINE NEWS MELBOURNE", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NEAR FIELD FORUM": { name: "NEAR FIELD FORUM", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "ROY T SNARR": { name: "ROY T SNARR", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NFC WORLD": { name: "NFC WORLD", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "PASCAL POTY": { name: "PASCAL POTY", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "NFC WORLD": { name: "NFC WORLD", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "BBX NEW SOUTH WALES": { name: "BBX NEW SOUTH WALES", title: "Date: 18 Jan 2018 Rating: -0.190" } ,
 "LAURA VIDAL": { name: "LAURA VIDAL", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "FRANCESC RIVEROLA": { name: "FRANCESC RIVEROLA", title: "Date: 18 Jan 2018 Rating: 0.000" } ,
 "FRANCESC RIVEROLA": { name: "FRANCESC RIVEROLA", title: "Date: 18 Jan 2018 Rating: 0.120" } ,
 "FRANCESC RIVEROLA": { name: "FRANCESC RIVEROLA", title: "Date: 18 Jan 2018 Rating: 0.250" } ,
 "NINE NEWS ADELAIDE": { name: "NINE NEWS ADELAIDE", title: "Date: 18 Jan 2018 Rating: 0.250" } ,
 "POLITICAL HEDGE": { name: "POLITICAL HEDGE", title: "Date: 18 Jan 2018 Rating: 0.400" } ,
 "DAISYKIAMACOW": { name: "DAISYKIAMACOW", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "MEGAN MITCHELL": { name: "MEGAN MITCHELL", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "ROWLAND MOSBERGEN": { name: "ROWLAND MOSBERGEN", title: "Date: 17 Jan 2018 Rating: -0.017" } ,
 "FINANCED PREMIUMS": { name: "FINANCED PREMIUMS", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "JESUS VELAZQUEZ": { name: "JESUS VELAZQUEZ", title: "Date: 17 Jan 2018 Rating: -0.056" } ,
 "JESSICA CLIFFORD": { name: "JESSICA CLIFFORD", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "MARK WHALAN": { name: "MARK WHALAN", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "97.3 ABC ILLAWARRA": { name: "97.3 ABC ILLAWARRA", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "GAVIN COOTE": { name: "GAVIN COOTE", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "KEITH ARNOLD": { name: "KEITH ARNOLD", title: "Date: 17 Jan 2018 Rating: 0.106" } ,
 "ATTORNEY THEO FANIS": { name: "ATTORNEY THEO FANIS", title: "Date: 17 Jan 2018 Rating: 0.000" } ,
 "LNPFAILAUS": { name: "LNPFAILAUS", title: "Date: 17 Jan 2018 Rating: 0.080" } ,
 "STINGER": { name: "STINGER", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "STINGER": { name: "STINGER", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "JUAN ZINO RAMIREZ": { name: "JUAN ZINO RAMIREZ", title: "Date: 16 Jan 2018 Rating: 0.080" } ,
 "POLITICAL HEDGE": { name: "POLITICAL HEDGE", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "PENNY FARTHING": { name: "PENNY FARTHING", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "PENNY FARTHING": { name: "PENNY FARTHING", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "PENNY FARTHING": { name: "PENNY FARTHING", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "PENNY FARTHING": { name: "PENNY FARTHING", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "PENNY FARTHING": { name: "PENNY FARTHING", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "DONALD VAN DEVENTER": { name: "DONALD VAN DEVENTER", title: "Date: 16 Jan 2018 Rating: -0.056" } ,
 "FOREX TROOPER": { name: "FOREX TROOPER", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "FOREX TROOPER": { name: "FOREX TROOPER", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "KAMAKURA CORPORATION": { name: "KAMAKURA CORPORATION", title: "Date: 16 Jan 2018 Rating: -0.056" } ,
 "ZENAGUI SIDAHMED": { name: "ZENAGUI SIDAHMED", title: "Date: 16 Jan 2018 Rating: 0.183" } ,
 "DON HILARIO CFP": { name: "DON HILARIO CFP", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "SCOT L STARK": { name: "SCOT L STARK", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "SAS SOFTWARE": { name: "SAS SOFTWARE", title: "Date: 16 Jan 2018 Rating: 0.183" } ,
 "ENRIQUE SALDIVAR": { name: "ENRIQUE SALDIVAR", title: "Date: 16 Jan 2018 Rating: 0.183" } ,
 "4-TRADERS.COM": { name: "4-TRADERS.COM", title: "Date: 16 Jan 2018 Rating: 0.136" } ,
 "GLOBALVISIONTRADERS": { name: "GLOBALVISIONTRADERS", title: "Date: 16 Jan 2018 Rating: -0.056" } ,
 "FOREX TROOPER": { name: "FOREX TROOPER", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "MAREE STEWART": { name: "MAREE STEWART", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "FAYE ADAMS": { name: "FAYE ADAMS", title: "Date: 16 Jan 2018 Rating: 0.080" } ,
 "FOREX TROOPER": { name: "FOREX TROOPER", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "SMARKETING FOR BTOB": { name: "SMARKETING FOR BTOB", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "KEITH ARNOLD": { name: "KEITH ARNOLD", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "PLANETEARTHADVOCATE": { name: "PLANETEARTHADVOCATE", title: "Date: 16 Jan 2018 Rating: 0.080" } ,
 "ANNA K": { name: "ANNA K", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "JOE SHMOE": { name: "JOE SHMOE", title: "Date: 16 Jan 2018 Rating: 0.080" } ,
 "TIARA LUNA": { name: "TIARA LUNA", title: "Date: 16 Jan 2018 Rating: 0.700" } ,
 "MIKEAUBREY": { name: "MIKEAUBREY", title: "Date: 16 Jan 2018 Rating: 0.080" } ,
 "#STOPGREED": { name: "#STOPGREED", title: "Date: 16 Jan 2018 Rating: 0.080" } ,
 "TROOTHMONSTAH": { name: "TROOTHMONSTAH", title: "Date: 16 Jan 2018 Rating: 0.080" } ,
 "KEITH ARNOLD": { name: "KEITH ARNOLD", title: "Date: 16 Jan 2018 Rating: 0.068" } ,
 "KEITH ARNOLD": { name: "KEITH ARNOLD", title: "Date: 16 Jan 2018 Rating: -0.175" } ,
 "EDWIN CHANDLER": { name: "EDWIN CHANDLER", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "STEVEN WIBLEN": { name: "STEVEN WIBLEN", title: "Date: 16 Jan 2018 Rating: 0.117" } ,
 "STEVEN WIBLEN": { name: "STEVEN WIBLEN", title: "Date: 16 Jan 2018 Rating: -0.133" } ,
 "JANET OLIVER": { name: "JANET OLIVER", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "JANET OLIVER": { name: "JANET OLIVER", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "STEVEN STANLEY-JONES": { name: "STEVEN STANLEY-JONES", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "JANET OLIVER": { name: "JANET OLIVER", title: "Date: 16 Jan 2018 Rating: 0.136" } ,
 "PAUL EBELING": { name: "PAUL EBELING", title: "Date: 16 Jan 2018 Rating: 0.032" } ,
 "LYNDA FROMHOLD": { name: "LYNDA FROMHOLD", title: "Date: 16 Jan 2018 Rating: 0.100" } ,
 "LYNDA FROMHOLD": { name: "LYNDA FROMHOLD", title: "Date: 16 Jan 2018 Rating: 0.375" } ,
 "STEVEN WIBLEN": { name: "STEVEN WIBLEN", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "STEVEN WIBLEN": { name: "STEVEN WIBLEN", title: "Date: 16 Jan 2018 Rating: 0.136" } ,
 "NANCY BALOPOULOS": { name: "NANCY BALOPOULOS", title: "Date: 16 Jan 2018 Rating: 0.000" } ,
 "MADERO": { name: "MADERO", title: "Date: 16 Jan 2018 Rating: 0.209" } ,
 "JANET OLIVER": { name: "JANET OLIVER", title: "Date: 16 Jan 2018 Rating: 0.117" } 

    , "MALCOLM TURNBULL":
    { name: "Malcolm Turnbull"
    , title: "Prime Minister of Australia (Liberal)"
    }

  }
, topics:
  [
       { name: "National", re: /\b(national)\b/gi, x: 599, y: 454 },
       { name: "Australia", re: /\b(australia)\b/gi, x: 468, y: 186 },
       { name: "Rural", re: /\b(rural)\b/gi, x: 185, y: 74 },
       { name: "Bank", re: /\b(bank)\b/gi, x: 499, y: 590 },
       { name: "fill", re: /\b(fill)\b/gi, x: 825, y: 818 },
       { name: "ideally", re: /\b(ideally)\b/gi, x: 437, y: 825 },
       { name: "suited", re: /\b(suited)\b/gi, x: 332, y: 419 },
       { name: "save", re: /\b(save)\b/gi, x: 637, y: 381 },
       { name: "Regional", re: /\b(regional)\b/gi, x: 370, y: 339 },
       { name: "Banks", re: /\b(banks)\b/gi, x: 456, y: 112 },
       { name: "branches", re: /\b(branches)\b/gi, x: 46, y: 73 },
       { name: "central", re: /\b(central)\b/gi, x: 355, y: 105 },
       { name: "via", re: /\b(via)\b/gi, x: 817, y: 142 },
       { name: "home", re: /\b(home)\b/gi, x: 744, y: 792 },
       { name: "great", re: /\b(great)\b/gi, x: 162, y: 376 },
       { name: "hackathons", re: /\b(hackathons)\b/gi, x: 369, y: 477 },
       { name: "million", re: /\b(million)\b/gi, x: 486, y: 884 },
       { name: "refunded", re: /\b(refunded)\b/gi, x: 823, y: 592 },
       { name: "policies", re: /\b(policies)\b/gi, x: 390, y: 744 },
       { name: "businesses", re: /\b(businesses)\b/gi, x: 606, y: 39 },
       { name: "accounts", re: /\b(accounts)\b/gi, x: 452, y: 145 },
       { name: "Bloomberg", re: /\b(bloomberg)\b/gi, x: 411, y: 197 },
       { name: "Limited", re: /\b(limited)\b/gi, x: 97, y: 405 },
       { name: "FX", re: /\b(fx)\b/gi, x: 2, y: 184 },
       { name: "Strategy", re: /\b(strategy)\b/gi, x: 655, y: 380 },
       { name: "next", re: /\b(next)\b/gi, x: 127, y: 726 },
       { name: "find", re: /\b(find)\b/gi, x: 120, y: 561 },
       { name: "small", re: /\b(small)\b/gi, x: 513, y: 253 },
       { name: "discusses", re: /\b(discusses)\b/gi, x: 528, y: 393 },
       { name: "speaks", re: /\b(speaks)\b/gi, x: 623, y: 358 },
       { name: "idea", re: /\b(idea)\b/gi, x: 195, y: 333 },
       { name: "dollar", re: /\b(dollar)\b/gi, x: 874, y: 693 },
       { name: "set", re: /\b(set)\b/gi, x: 89, y: 160 },
       { name: "Ray", re: /\b(ray)\b/gi, x: 867, y: 638 },
       { name: "offset", re: /\b(offset)\b/gi, x: 164, y: 870 },
       { name: "Attrill", re: /\b(attrill)\b/gi, x: 576, y: 888 }
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
