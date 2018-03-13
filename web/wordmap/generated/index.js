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
, "KRIS: The skills shortage would disappear if they paid normal wages which they can't because quantitative easing is ruining supply chains https://t.co/6YLPPA5kN4\n"
, "KRIS: As i have explained wages offered are too low for the skills they want to buy. Hence skilled people refuse to work for low wages in Germany and elsewhere. Reason Quantitative easing and low rates which have cracked global supply chains https://t.co/6YLPPA5kN4\n"
, "MICHAEL TARPEY: Oh come on Chas no conspiracy here Look up Quantitative Easing by Federal Reserve It is the electronic creation of from nothing This is the modern day printing press Go to YouTube What is Quantitative Easing and look and listen to economists defination.\n"
, "CURRENCIES.CO.UK: Quantitative Easing and Italian election update read more here https://t.co/l01osHRtBq #GBPEUR #EURGBP\n"
, "THINK CURRENCY: Quantitative Easing and Italian election update read more here https://t.co/ZOVN8YjHoI #GBPEUR #EURGBP\n"
, "POWERBROKER SOFTWARE: Global deal flow defies headwinds facing property investors Despite headwinds posed by the unwinding of quantitative easing in the west and regulatory clampdown to the east global commercial real estate markets are back trading near record peaks a https://t.co/dykCTFvYI3\n"
, "FTA: #ftadvertisingFT Property Global Despite headwinds posed by the unwinding of quantitative easing in the west and regulatory clampdown to the east global commercial real estate markets are back trading near record peaks a decade after https://t.co/fj8qWVbJAf #ftadvertising https://t.co/YbKioutIvx\n"
, "SI PEERTROWSKI: Quantitative easing is precisely that We have already been printing money Second if economic output expands due to printed money then it mitigates inflation.\n"
, "THE PROPHET: The search for a true “store of value has led me down a deeper philosophical path than I anticipated What do we value?How do you preserve wealth in a world of quantitative easing and ultra low interest rates??\n"
, "ROSS NUGENT: Global Markets in 'Uncharted Waters of Volatility The Bank for International Settlements the so-called central bank for central banks thinks global market volatility is here to stay as policymakers unwind years of easy money and quantitative easing.\n"
, "MALLOWSTREETPENSIONS: NEW An easing to quantitative easing Markets react to ECB announcement video https://t.co/3mPnFPmAJ3 https://t.co/8UI95j57no\n"
, "GOODSTAR: Ok Genius How much did the £465bn in Quantitative Easing Cost you?\n"
, "INERTIA: Its not gambling Its a long call. Long #HODL investment in the reinvention of financial independence An opt out of the debt based ponzi scheme we so lovingly refer to as 'quantitative easing'\n"
, "MICHAEL LAMARR: The stock market did go up under BHO because of quantitative easing not because of a good economy The only jobs created under BHO were low paying part time jobs that he had nothing to do with The man did everything possible to kill our economy.\n"
, "CHRIS BARLOW: Yes and quantitative easing an eye watering 500 billion from the magic tree made the assets of the asset rich richer and benefited the good volk didly squat.\n"
, "MIKE MILLAR:  m  Damo  Raval And Cameron started the quantitative easing program that has literally given a half trillion to the bank's and isn't on the govt book but the boe That is benefit system for record profit making bank's none has gone into the economy as the rich (surprise surprise )kept it all.\n"
, "CRUDE LIBERTARIAN: #bbcdp The brilliance of quantitative easing instituted by Gordon Brown maintained by the Conservatives is corroding pensions it's the price of the so-called 'cheap borrowing that politicians are unwilling to address.\n"
, "ACCURATETRADING: I stopped my rant short because I have meeting soon but this is opposite of the Federal Reserve forced Quantitative Easing I'll end my shortened rant with my favorite Rick Santelli 'Rant of the Year from 2/9/09 https://t.co/RjyaC8mjEI #stockmarket $DIA $QQQ $SPY $SPSM\n"
, "CHRIS MCGRATH: 'Quantitative easing on Re Magic Money Tree U.K government BoE found £200,000,000,000 in 2009 Austerity is a political choice https://t.co/hmy2BdMbQY\n"
, "MC: QE BofE ‘we make these purchases from the private sector’ ‘most of these assets are government bonds (also known as gilts)’..... https://t.co/3JKRpyFkuM\n"
, "SHAREEFBABIKR: Airdrops QE This is a NO FUD tweet it’s just food for thoughts do you think the #blockchain instrument called airdrops equals to the quantitative easing of the legacy financial system did the enfant technology reached the easing stage already or we are putting it on high spe\n"
, "FOOL ON THE HILLZ: The Alms Industry supports the Arms Industry &amp Religious Relics &amp Icons are the ultimate Crypto Currency That's the underlying drive for Never ending Crusading World Wars as High Priest Clerics Caste Class seek Quantitative Easing through other Political Memes such as Genocide!\n"
, "FOOL ON THE HILLZ: #Clausewitz War &amp Genocide is the continuation of Quantitative Easing by other Political Means &amp more Economic Memes!\n"
, "TED: If the money given to the banks by the Tory govt as Quantitative Easing had been used to hire people to public sector jobs on good pay instead it would have done more for the economy &amp the knock-on spending would have helped with the debt #bbcnews\n"
, "ROTHSCHILDISH  WE COLONIZED KANGZ!:  HasCome  wolf  87to98  Sayz  i    of hesse  York GDP growth is how all national leaders are measured historically Not just obama!Total gdp growth under obama was 1.6% That’s 3rd world This is what happenes when you spend most of you Energy on how to fluff the numbers Like with QE (quantitative easing) His QE didn’t work\n"
, "POLITICAL DOBERMAN: Actually that is a perfect description of politics Obama Care quantitative easing Deficit spending Unfunded liabilities Gawd I could go on....\n"
, "UNLIVABLEREGION: Instead of targeting foreign speculators it's 'eat the rich only 'rich is anyone who lived worked paid taxes 40 yrs Meanwhile govt creates real estate bubble with quantitative easing and immigration then takes it out of YOUR inheritance You won't cheer when it's your turn\n"
, "DAVID BINNS: Tracked it down online A superb article about Quantitative Easing from last October which I dug out and reread this morning A great primer for understanding the lynchpin to our present economic climate https://t.co/LPYF0GkFW6\n"
, "MANCHESTER FOR EUROPE #FBPE#ABTV#WATON: The Impact Studies sounds pretty horrendous for the North West and don’t forget that they were forecasts for leaving the EU which we haven’t as get and also didn’t allow for the quantitative easing and loosening of monetary policy by the Bank of England https://t.co/wsnYM6hqCE\n"
, "#EX-RVID5774 [ TC]: John Oliver Quantitative Easing Debunked By Real Journalist https://t.co/TA82jew7A2 via\n"
, "DAVID B COHEN: Quantitative easing Grasshopper The work of the Fed not Obama And given that job growth gets harder as more time passes since the last recession the current state of the economy is impressive That's why optimism abounds.\n"
, "WALLACE NOLL: China is also building infrastructure projects all over the world you can bet they use this special financing source quantitative easing by public banks for those also; https://t.co/AUxUzvRZ2g\n"
, "RICH EAGLESON: You are right (not about Mexico lol but Obama's Quantitative Easing did nothing to really help anyone accept the big banks and the stock market is the president for ALL He's interested in helping everyone.\n"
, "BOB KERNS: Are you talking about Quantitative Easing That's kind of a mixed bag because much of people's savings are in the form of stock Yet stock ownership (direct or in mutual funds is heavily weighted toward the wealthier 'The rich get richer is out of control.\n"
, "BOYD'S BACKYARD: Quantitative easing is my favorite term from economics that also describes constipation cures.\n"
, "ANGRY NORTHERNER #FBPE: Oh yeah totally But that's done via one of many Quantitative Easing mechanisms Eg injecting it as a loan from a central bank into the banking system to then be loaned out to in turn stimulate the economy QE isn't just printing money though.\n"
, "JAY: Central Bank wants to stop printing euro notes here . good times are back . the ladies stopping the quantitative easing and are literally stopping printing money https://t.co/baCXJxELoa\n"
, "IMPERIAL BUSINESS: Professor David Miles warns that quantitative easing may never end Read the full article https://t.co/hV697ONvSd #finance #quantitativeeasing #qe https://t.co/aUl5gSNuuY\n"
, "JOHN IOANNOU: The irony is that you shouldn't be texting while you work But don't let me spoil your venture capital fund raising campaign I'm sure you'll get millions maybe billions due to quantitative easing.\n"
, "T J LEVI: He already has ALL of Obama's quantitative easing and bailouts did squat for economic growth or job creation I guess shovel ready jobs weren't that shovel ready He added more debt to the national debt then ALL presidents before him combined Community organizer for hire !\n"
, "CAPPY LOVE: Sovereign debt issues coming VERY VERY soon for most countries We can thank the central banks for this after the financial crisis with their bailout/quantitative easing policy to save the “to big to fail banks.\n"
, "JUST PURE INFORMATION:  Sur #LookingForNews &gt;&gt;&gt WSJ With central banks winding down quantitative easing hedge funds find more room to trade https://t.co/trtQ9iQuuo via https://t.co/ewkC6sMXRz https://t.co/cmRisPg5Hq\n"
, "SKENDERBEG: With central banks winding down quantitative easing hedge funds find more room to trade https://t.co/tLCG7JqoNS via https://t.co/rs6GSmoeXh\n"
, "SYKESFANCLUB: New post 'An Easing To Quantitative Easing Markets React To ECB Announcement https://t.co/AOH9GVWRyk\n"
, "BRIAN CHOLERTON:  Swindon Austerity isn't hitting everyone Quantitative easing working massively in favour of those with tangible assets and hit those with savings hardest The rich get richer while those below them pay for it Classic policy #UnrigtheSystem\n"
, "FAKE LNP: This will enable Quantitative Easing during the next financial crisis We can repurchase those bonds Isn't that great?\n"
, "JACKSCHITT:  hill123  ao  ric  Gorelioni  Badger  ray239  Villa Not hyperinflation. Inflation yes but we are not like Venezuela...yet. If the Fed starts Quantitative Easing again which is printing more money then it's time to worry https://t.co/gMUD6cIy2w\n"
, "LOWELL THE BERNER: Causing a $23Trillion loss in the stock market... $4.5 Trillion in Quantitative Easing 3 bailouts and direct cash infusions plus taxpayers guaranteeing Too Big To Fail policy continues? Good Job Lloyd.\n"
, "MODERNAGE BUDDHA: &amp then they try &amp fix the problem like in 2008 by inflating the currency &amp quantitative easing We borrow &amp print money to buy our own treasury bonds &amp to buy stocks to artificially cause a boom but that only adds liabilities on top of our trillions in debt plus entitlements owed\n"
, "TERRY W ROBERTSON:  gail To this day more able bodied Males are out of Workforce during Obama under-employed was at Record highs The Economy was growing at average of 2.2 per Year Corporate Taxes/Regs were at World highs Only reason Market did well is numerous Quantitative Easing/Low Interest Rates.\n"
, "BG BINGHAM: You make this way too easy I suggest you look up the words quantitative easing Lol Obama made his fat cat golfing buddies on Wall Street rich Mega rich! https://t.co/NRXWVpontw\n"
, "ZORRO BORICUA: Quantitative Easing wasn’t a real bull market Now the real bull market begins based on real supply and demand.\n"
, "JOE M: Because the Fed isn't going to throw out rate hikes like beads at mardi gra.. It's going to be a steady 3-4 hikes per year until we completely get away from quantitative easing. That said your point does nothing to detract from what is clearly a strong economy.\n"
, "DEAN RIGGS:  AKA Becker  s Quantitative easing is pretty much printing money for banks to loan And that's only the recent bs.\n"
, "CLIFFY: Right along with all that quantitative easing 😂\n"
, "FRANKLIN: No It has it uses It can be used to 'charge a slowing economy for eg by Quantitative Easing purchase of govt securities thereby increasing money supply which encourages lending and improves economic activity But just printing money is not the ideal way https://t.co/rNpzc5vcXk\n"
, "AXA IM UK: IFA Three years ago the European Central Bank started its #QuantitativeEasing programme Learn more about its impact in our Economic calendar https://t.co/2AnaULs90l https://t.co/BCEg72sPYG\n"
, "JOE JONKLER: We are hearing the same as this from across the Atlantic and for the very good reason that it's long overdue including in the UK https://t.co/mZBvbVevv1 #QE #Interest #Rates\n"
, "GREYBEARD:  aonami I know all about quantitative easing A dodgy practice at the best of times yet not actually printing money If Capitalism wasn't so bent this practice would be illegal\n"
, "BIG INDIAN BEAR: Please explain to your investors the impact (and now reverse impact of Quantitative Easing 10yr bull market finished Zero cost money no longer available Money is expensive now so risks higher so equities lower 🐻🐻🐻🐻\n"
, "JW: Short answer Greed Poverty a byproduct of bad economic policy compounded by quantitative easing that has greatly skewed the distribution of wealth Addiction in large part the influence of pharmaceutical industry and the flood of opiates being prescribed.\n"
, "BIG INDIAN BEAR: Nifty50 Nov '08 2550 Nifty50 Mar '18 10300 We have been in a bull market since 9yrs! Liquidity (quantitative easing has driven prices of all asset classes Now interest rates are rising globally after a decade High possibility of a multi-year bear market phase #Nifty\n"
, "FOREX FOR ALL: Forex Euro Rises As ECB Drops Pledge To Extend QE ======== https://t.co/FOFS7hSVLi The euro rose across the board on Thursday after the European Central Bank dropped its pledge to expand its quantitative easing bond purchasing stimulus...... More: https://t.co/CmD4FV4Ipz https://t.co/d2M41TcoUR\n"
, "IAN BULLOUGH: Absolute rubbish Butter mountains milk lakes CAP payments protectionism Quantitative easing on a massive scale forced immigration quotas Eurozone crushing southern economies massive youth unemployment The Single Market is the definition of protectionism and isolation.\n"
, "POSITIVE MONEY EUROPE:  ZYN 1 We are talking about giving 500 to 1000 EUR one shot Who would stop working for that kind of money 2 HM still more equitable than pushing asset prices through quantitative easing.\n"
, "WILLY SMYTHE:  Groupthink ...or DJT just gave NK what they want To be seen as equal on the world stage NK has offered to meet with the last 4 sitting presidents This is nothing new PS GW Bush did quantitative easing too LOL🤷🏼‍♂ but hey keep on believing in a reality TV show host.\n"
, "FXCC FOREX TRADING: US Economic growth continued at a moderate paste #ECB left its interest rates #quantitativeeasing and forward guidance unchanged https://t.co/LsTKu1pHQX #DailyAnalysis #ForexTrading #FXCC #ABrokerOnYourSide #News #FX #MorningRollCall\n"
, "EMMANUEL ASHIBUOGWU:  Batey The build up and signs to the imminent Global financial collapse is all around us huge unsustainable debt US Govt borrowing in trillions of dollars poor political leadership greedy politicians federal reserve printing excess dollars in what it calls quantitative easing\n"
, "BIDASK CAPITAL: European Central Bank dropped its pledge to expand its quantitative easing bond purchasing stimulus program in a more hawkish rate statement than expected. The central bank also left euro zone interest rates unchanged at a record low of zero as expected.\n"
, "ANDREW PALMER: Japan has learned that dropping rates to zero and keeping them there is not very effective Quantitative easing (QE does not work no matter how large the intervention becomes It’s interesting that this experiment doesn’t seem to matter to anyone.\n"
, "STEVE DEMETRIOU: I see it as interest rates being up against the zero lower bound an unprecedented and not well understood phenomenon that resisted quantitative easing hence the several rounds of QE Monetary policy alone was insufficient booster and Obama was thwarted by the GOP fiscally.\n"
, "MAULDIN ECONOMICS: The always entertaining Grant Williams wakes up the SIC crowd after lunch with some visual aids we can’t possibly describe Briefly they involve snakes ladders and quantitative easing https://t.co/8xxHOQp6Vj #sic2018 #2018sic #economy https://t.co/i6tYNxxVQM\n"
, "JON LIEBERKIND: The #euro was on a roundtrip today #ECB President #Draghi dropped his pledge to increase quantitative easing if the inflation outlook or financial conditions were to worsen the so-called “easing bias. However this hawkish statement were then followed by more dovish tunes https://t.co/hpHxf0z64X\n"
, "WALLACE NOLL: not only that they're using quantitative easing to finance infrastructure improvements both in China &amp around the world while US uses quantitative easing to give money to rich people on the excuse that it stops the financial bubbles from collapsing.\n"
, "REDGE NKOSI: Here https://t.co/I0WHsd0x88 and here among many others https://t.co/EY2bPZOAmn That is QE for China There are many more.\n"
, "TREVOR CASWELL: Sigh “Dow 36,000, a book he co-authored near the peak of the dot-com bubble argued equity markets would soar yet further His concern that quantitative easing might spark inflation proved wrong and his claim recent tax cuts could pay for themselves cuts against most analyses. https://t.co/wBCrrcI73M\n"
, "FRONT BUSINESS NEWS: Market Extra 5 takeaways from the ECB’s tiny step toward a QE exit https://t.co/jiWPJqaxfC European Central Bank President Mario Draghi pulls off a verbal tightrope act unexpectedly moving a step closer to ending quantitative easing but soothing investor worries.\n"
, "PROFESSOR: There’s broad agreement among Governing Council members that quantitative easing should probably come to a halt by the end of 2018 BBG\n"
, "ZEROHEDGE: There’s broad agreement among Governing Council members that quantitative easing should probably come to a halt by the end of 2018 BBG\n"
, "ANNE LOUISE KER: The European Central Bank has taken a further step towards ending its crisis-era stimulus measures dropping an explicit commitment to buy more bonds and expand its quantitative easing programme if necessary.\n"
, "EDDY FINCH:  Vanseveren their own currency and buy back debt via quantitative easing The banking crisis affected everyone but the eurozone was particularly slow to recover and hasn't ever really recovered if we are being honest The only long-term solution to the euro is in my view greater integration\n"
, "TRADERSNEWS: Equity indices in London rose on Thursday alongside their European peers as European Central Bank chief Mario Draghi signalled that the central bank's exit from quantitative easing would be gradual.\n"
, "CONGRESS WEALTH MGMT: It took five years of unprecedented quantitative easing (money printing/bond buying/drive interest rates lower to get global central banks balance sheets to grow from $5 trillion to more than $17 trillion It may take a decade or longer to work that buying binge off.\n"
, "NEWSGW: Pound LIVE ECB drops quantitative easing programme despite Italian Election uncertainty THE NEWS GROUP OF WORLD https://t.co/8f5DPruBSJ https://t.co/ThaWdnOJWi\n"
, "JON BILLINGS #FBPE: @ cat weasel  J Irwin WIPING OUT DEBT of the banks is a VERY different economic idea to Quantitative easing Quantitative easing is literally producing money in an attempt to control economic factors such as inflation and interest rates as well as increasing demand and supply for investment.\n"
, "WWW.RIGHTNOWNEWS.US: New post (Mario Draghi to END Quantitative Easing despite potential chaos from Italian elections has been published on Right Now News https://t.co/XvVjPnhGKW https://t.co/JlEK03wnPs\n"
, "SHUVANKAR MUKHERJEE: Mario #Draghi forgot #QE stands for 'Quantitative Easing .. If Everything is great in #Eurozone . What the hell is he 'Easing . can you explain this please I'm at a loss ...\n"
, "NEWS GRABBER: BLMBRG Quantitative easing terms is germany But germany was already strong without quantitative easing https://t.co/TnYZSRZ9k6\n"
, "MALUNDA WANDA: Better you read and understand before a rush to comment All governments do that but only coach their actions in technical terms that laymen like you wouldn't understand Ever read or heard of quantitative easing did you understand what it entailed?\n"
, "REDGE NKOSI: What you say &amp think you know as quantitative easing is NOT QE There is a macroeconomic model that gave rise to the phrase QE &amp that what u say is QE is not &amp does not constitute QE It is reserve expansion or high powered money expansion or M1 expansion Thats what banks did https://t.co/ry9znihy8w\n"
, "MORE BUSINESS NEWS: Pound LIVE ECB drops quantitative easing programme despite Italian Election uncertainty https://t.co/BMs8Dqm2kv https://t.co/EL3tlfws9m\n"
, "HANDELSBLATT GLOBAL: The ECB is holding interest rates steady at 0.0 and making no changes to its program of quantitative easing #QE #ECB #EZB\n"
, "FINANCIALPARTNERS: BREAKING ECB holds interest rates steady and makes no changes to its program of quantitative easing https://t.co/OTq2BZN8dQ. https://t.co/NyHqWqjdw6\n"
, "DAILY EXPRESS: Pound LIVE ECB drops quantitative easing programme despite Italian Election uncertainty https://t.co/4H2ClkCzbg\n"
, "BIG MEECHIO KAKU: If you consider the bailouts rounds of Quantitative Easing zero to near zero interest rates the new tax bill ALONG with this legislation...It's quite the pill https://t.co/3hQlCI0Zrw\n"
, "MASTER GUCHI: “Quantitative Easing and Asset Bubbles in a Stock-flow Consistent Framework” Cameron Haas Tai Young-Taft 2017 https://t.co/0jTLGQphqB #経 #経論QE #経論金融\n"
, "FINANZLINKSECONOMY: 🇪��� ECB Holds Rates Steady Removes Possibility of Increase to Quantitative Easing https://t.co/RzFhKmp1Kh INVESTINGcom\n"
, "ECONOMICS GLOBAL: ECB Holds Rates Steady Removes Possibility of Increase to Quantitative Easing #Stocks #Trading #FOREX #Traders #tariff #ECB #Euro #Markets #European #Draghi https://t.co/OxriiVUy6y\n"
, "BLOOMBERG ASIA: BREAKING ECB holds interest rates steady and makes no changes to its program of quantitative easing https://t.co/2ztJcicIgQ https://t.co/qmMX849DzT\n"
, "BLOOMBERG TV: BREAKING ECB holds interest rates steady and makes no changes to its program of quantitative easing https://t.co/TZAiATMr6g https://t.co/1PE5BqTpNO\n"
, "BLOOMBERG: BREAKING ECB holds interest rates steady and makes no changes to its program of quantitative easing https://t.co/crOksgfH57 https://t.co/H9uw6WoKra\n"
, "WILLIAM GEORGE: Retweeted Positive Money Europe ( ): BIG NEWS Quantitative easing might stop in the coming.. https://t.co/oS5mlGJ8CE\n"
, "JERRY TAYLOR #FBPE #LIBDEM #LONDEPENDENCE: @ cat weasel  J Irwin Other descriptions of Quantitative Easing are available I was sceptical initially still harbour doubts but so far it seems to have worked better than I expected Not all Gordon Brown’s ideas were bad The USA Fed and ECB seem to agree.\n"
, "THE CURRENCY SCENE: #currency #cryptocurrency Detailed European Central Bank (ECB Exit Strategy to Keep EUR/USD Bid European Central Bank (ECB to Keep Rates on Hold Stick to Quantitative Easing (QE Program Updated Staff Projections on Tap Will the G https://t.co/Jt63BQrn9k https://t.co/1iiGqeHjCp\n"
, "DAILY EXPRESS: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/yeqW4fIjGE\n"
, "BITCEYLON: #banks get their money from the printing presses of central banks. Some call it printing money without collateral sophisticated countries call is quantitative easing. One causes #hyperinflation the other #deflation depending on the country of origin\n"
, "JERRY FLETCHER: That's what we've seen in the past decades as the superrich have sucked the middle and lower classes dry with various grand thefts like LIBOR quantitative easing corporate bailouts and a raft of others.\n"
, "JONES MAHONEY:  Is A Racket Well many bonds are sold so that is a form of borrowing so yes I am aware of the bs 'quantitative easing that goes on.\n"
, "ALEX SONG: With central banks winding down quantitative easing hedge funds find more room to trade https://t.co/wfhoB6AscN via\n"
, "TOBEY GELDER: Kim please supply references Without references your statements are at best disinformation BTW about $10T of today’s debt was added during the BHO years a lot of it via Quantitative Easing which a great smokescreen for [DemocRAT graft\n"
, "ROBERT LERELOU: 5 c if the economic outlook is very deteriorated and the #USFED is left with no choice other than starting quantitative easing again (and may then have to print great amounts of USD then #BTC will skyrocket alongside other risky assets like stocks.\n"
, "RIGSBY: It can print as much cash as it likes but the prospect of devaluation on world markets should not be ignored quantitative easing I think they call it...\n"
, "CRYPTOIQ: Do you lack the basic technical understanding to make assumptions on what a decentralized exchange is how it functions You're ok with CDOs Bespoke Tranche Opps Fractional Reserve Banking Debt Backed Loans Quantitative Easing but not a trustless measure of value &amp exchange?\n"
, "ASK YOURSELF:  laura And what about the fabled quantitative easing used when bailing out the banks? Of course we can't do that to help the NHS or avoid austerity.\n"
, "WTC: Yea let’s ignore Obama’s print and spend method of artificially propping up the markets through quantitative easing Let’s ignore that part of history right And obama spending more than all presidents combined with nothing to show for it SMH #thanksObama\n"
, "EDDY FINCH:  Osborne  blog can't spend what it likes and issue currency to cover it so it would have to issue bonds then it's up to the bank of England whether it uses quantitative easing to buy the bonds by issuing currency Investors can abandon a currency though and a run on the was a real fear of\n"
, "RON KLINE: Tell that to plp when the looses it value QE is fine when everyone is doing but everyone has stopped now so you will end up with the yen effect a fall in value that will lead to inflation due to our imports https://t.co/XSseb1Odqz\n"
, "PHILIP ALEXANDER: The Fed wants to shrink its balance sheet as quantitative easing winds down But the Basel liquidity coverage ratio might make that much harder than it looks Great analysis from Kris Devasabai https://t.co/eQRaVwJjHC\n"
, "COLUMBIATHREADNEEDLE: Candid discussion between Colin Moore and Ted Truscott on market volatility changing interest rates quantitative easing and emerging markets in this Q&amp;A https://t.co/7RQHWnnzCf\n"
, "EDDY FINCH:  Osborne  blog argue that the UK should not have embarked on the deficit reduction programme it did at the end of 2010 forgetting of course that actually the UK's Bank of England has used quantitative easing (doing exactly what you described here quite extensively where it has deemed it\n"
, "LUCA LUCCHESI: Do you really want more quantitative easing and stimulus Those BoE policies are actually hurting the working class the most They are however really good for those who own equities and assets such as real estate and fancy art.\n"
, "EP CAPITAL: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/7V5l3r7Z23\n"
, "E-RECEP:  SGS An economic depression postponed by quantitative easing...\n"
, "DAILY EXPRESS: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/yeqW4fIjGE\n"
, "CDR AN0NWELL:  Trader  cinerea  National Right.. look who’s been running the Fed Where’s all our money going? It’s not a coincidence Israel’s our largest military sink while also pushing quantitative easing in the Fed You’re a joke shill\n"
, "MPT: Homes are expensive mostly because the banks got involved through credit creation. This Govts policy on Quantitative Easing (QE has just poured more credit creation into asset price speculation and we’ve had some of biggest increases in asset prices in recent times\n"
, "NURJAHANASHA: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday. https://t.co/n8caOGQJgg https://t.co/h0DZa7W0yq\n"
, "NEWS JOX: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday City &amp Business | Finance https://t.co/99n58VZiR4\n"
, "DON MASHAK: I liked a video https://t.co/Yyj0vn2bI7 Quantitative easing\n"
, "ALT KATIE HOPKINS: If people were prevented from voting we'd no longer live in a democracy because that's what a democracy is In addition studied economics &amp seems to have forgotten about quantitative easing which is when a bank 'Prints money for the government rather than borrowing x\n"
, "JEREL SHAW: #deregulate more I'm still in shock when the so-called 'quantitative easing (Giving free money to the banks took place under Obama It appeared to be so arbitrary and surreal Can never (Never satisfy greed as the same ones keep scamming the American public.\n"
, "ROB POTTER: What factors may have affected recent volatility Take a closer look at how rising interest rates and inflation plus the Fed’s move to end quantitative easing may have affected investor behavior according to Ameriprise economic experts https://t.co/egwTi4YbiQ\n"
, "FOXX:  lefty  riri  2016  Bad John 4  O B C H  Initials Eu is heading for disaster You do know it's being proped up with quantitative easing..? The French want out Germans moving very much that way Italy Open your own eyes look deeper.\n"
, "LARRY CHIANG: Quantitative Easing 13 Calling a bubble too early is like being just-sa-wrong https://t.co/QKnKAeUtsZ\n"
, "D MATHESON: ...the socialist just love quantitative easing everybody gets rich like in the Weimar Republic https://t.co/Qt4jQrmBEA\n"
, "VICTOR PUNCH NAZIS LICATA: China produced commodities at a loss just as long as it hurt the US How did the US fight back against this aggressive economic sabotage We printed more money ('quantitative easing') We more than quadrupled our money supply.. so where did the inflation go https://t.co/dZnZcxlLgq\n"
, "KUBIAKFINANCIAL: What factors may have affected recent volatility Take a closer look at how rising interest rates and inflation plus the Fed’s move to end quantitative easing may have affected investor behavior according to Ameriprise economic experts https://t.co/DZgzvJ8lSE\n"
, "MELISSA R POE: 'The academic field of economics rose with our economy and everyone not just economists, talked of costs &amp earnings and cash equivalents &amp quantitative easing Then the economy collapsed and all we had left was this shitty vocabulary. —Amy Rowland\n"
, "WHISTLE BLOGS: Federal Reserve Whistleblower Tells America The REAL Reason For Quantitative Easing https://t.co/IxVs9Fntyj\n"
, "DIAMONDPRIVATEWEALTH: What factors may have affected recent volatility Take a closer look at how rising interest rates and inflation plus the Fed’s move to end quantitative easing may have affected investor behavior according to Ameriprise economic experts https://t.co/nt2piGePOt\n"
, "POSITIVE MONEY: “Osborne and his colleagues ensured that those responsible for the crisis benefited from the Bank of England’s quantitative easing programme which inflated asset prices largely owned by the more affluent” points out https://t.co/rc9KCn2FTF\n"
, "LIBSTURNTAIL&BLOCKME:  faith  lXXl  daniel  MB  manocchio Speaking just economically that's also true The bankers have been running everything for a century A bank picked Obama's cabinet and he gave the 1 $4 trillion The economy 'recovered thru the quantitative easy policy. https://t.co/wDlz5zjznV\n"
, "SAM: All this money is mostly printed on a printing press and it is all legal as it is the Central Banks and its called Quantitative Easing QE..debt\n"
, "DAVID REIGLE: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/s2GWgrZY6L\n"
, "ANGELIQUE:  Marney You can't take back what is already owned by Qatar for example The European Central Bank’s $1.2trn quantitative easing programme has underpinned asset prices including property It has slowed down but it is still substantial Erdogan funded a huge mosque in Cambridge.\n"
, "THEDOBRICKLITTLEGRP: What factors may have affected recent volatility Take a closer look at how rising interest rates and inflation plus the Fed’s move to end quantitative easing may have affected investor behavior according to Ameriprise economic experts https://t.co/4HeBWy4jxL\n"
, "INDIANAPLUS: Bahahahahaha US recovery was exclusively from quantitative easing NOTHING ELSE It has been a decade of free money.\n"
, "L HONDERS: Quantitative easing is alive The ECB's balance sheet is now bigger in than the FED's balance sheet in USD$ https://t.co/pcoqewZbla\n"
, ": When I began studying economics I remember being told (what we now call 'quantitative easing was like a sledgehammer and would never actually be used by the Fed 'Never turned out to be 3 official 'quantitative easings a few years later. Nothing I learned in school was true!\n"
, "ENEWSRADAR: https://t.co/u8gB9ToKE8 The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/p33QWQkD4E\n"
, "WWW.RIGHTNOWNEWS.US: New post (The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday has been published on Right Now News https://t.co/oA7xrzP70o https://t.co/CdV6gyqORN\n"
, "QUANTAMIZE: BOJ Kuroda reiterated that the 2 inflation target is a top priority for the BOJ This may ease investor concerns about a deceleration in the quantitative easing policy pursued by the BOJ #Japan #BOJ $USDJPY $nifty\n"
, "MELBAL BUSINESS NEWS: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/lI51lsCFEF https://t.co/PoAljhkWSq\n"
, "BALMEL DIRECTORY: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/ApjcwJx2nY https://t.co/6dwyqqJ3JL\n"
, "EXPRESS BUSINESS NEW: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday GLOBAL money markets will turn their attention to the ECB meeting later this week for clues as to how and when the bank will withdraw its hefty stimulus programme -» Get https://t.co/2YJAif220A https://t.co/yzGNPGekeG\n"
, "AUTO BLOG GLOBAL: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/MOdF0C3kZr\n"
, "MORE BUSINESS NEWS: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/9lfoq3xdc7 https://t.co/mDkeKQGPAe\n"
, "SOYNADIE: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday City &amp Business Finance https://t.co/ZYaw5XGJoi https://t.co/JbWGjbWmPt\n"
, "SOYNADIE PRESS: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday City &amp Business Finance https://t.co/00HZOXRSFy https://t.co/PH6Xu6vDAg\n"
, "SOYNADIE: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday City &amp Business Finance https://t.co/TB10wTqum0 https://t.co/fdyG7qHOsX\n"
, "SOYNADIE ORG: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday City &amp Business Finance https://t.co/NyTMqokYh7 https://t.co/iVVnX7fOEK\n"
, "PERIODISTA URBANO: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday City &amp Business Finance https://t.co/7KYegsVOif https://t.co/SFku3kT9qc\n"
, "NEWSGW: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday THE NEWS GROUP OF WORLD https://t.co/NjRbwAjlFa https://t.co/x5trs8VXpN\n"
, "DAILY EXPRESS: The end of Quantitative Easing Euro to SOAR as confident ECB meets on Thursday https://t.co/yeqW4fIjGE\n"
, "JOHN BELL: Agenda now appears to have switched to wealth inequality. I wonder how much of that has been caused by the effects of quantitative easing on assets?\n"
, "BEVAN BOY: https://t.co/Dq6EVOhrjE John Redwood lets the cat out of the bag Austerity was unecessary and quantitative easing is more than acceptable for a country that can print its own money.\n"
, "DR PENNIES: market value measured with dollars dollars vastly overvalued inflation...zero cost lending quantitative easing increased speculation high liquidity spending bubble pull back money hedges in finite assets (property/land metals and now crypto) so...pls elaborate?\n"
, "NIGEL CURRIE: Economy booming reduce debt. Economy tanking borrow. Quantitative easing.. OK at the time but is a trick that can't continue indefinitely. Money is created against wealth it really doesn't grow on trees.\n"
, "THE WEB OF EVIL: Along with general tedium of accusations that Labour squandered ££ you can argue all day over quantitative easing but most rightwing critics don't even seem to know that's where the money went I'm SO BORED with the wilful ignorance surrounding Liam Byrne's Treasury note https://t.co/D18J1pZLmX\n"
, "KENNETH WHITE JR: What factors may have affected recent volatility Take a closer look at how rising interest rates and inflation plus the Fed’s move to end quantitative easing may have affected investor behavior according to Ameriprise economic experts https://t.co/9UxhthytkR\n"
, "FRED MCELWAINE:  rook ...forecasts were based on immediate notification of article 50 Carney’s quantitative easing was effectively the ‘emergency budget’ but Leavers are a literal bunch None of these things mattered to Leavers though as soon as the referendum was called they knew how they...\n"
, "JAMES MACEACHERN: Osborne had predicted to have UK running a surplus by 2015 and yet the OBR is now predicting that UK will run a deficit until at least 2031 UK has used quantitative easing to greatly reduce its deficit which will eventually be reversed There are many other ways than austerity.\n"
, "RANDOM NOISE: You think housing is a free market With planning regulations environmental regulations affordable housing regulations quantitative easing local political lobbying.. you are very ill-informed.\n"
, "TRUTH IN ACCOUNTING: great article on quantitative easing We featured it in our newsletter https://t.co/z0jWhVqznR\n"
, ": Fed Reserve Chairman Powell just dropped a major hint that the Central Bank has been aggressively utilizing a controversial tool it used earnestly in response to GREAT RECESSION &amp its aftermath—Bond Purchases also known as Quantitative Easing or #QE https://t.co/NjHm8VcRgR\n"
, "DEPLORABLE SMALL PEOPLE   STABLEGENIUS: You're right It's the Federal Reserve and they propped up Obummer throughout his 8 years with Quantitative Easing. https://t.co/5LIV1HmHAq\n"
      ]
    }
  , { name: "republican"
    , speeches:
      [
        "MALCOLM TURNBULL: " +
        "Thank you, thank you very much.\n",
, "DANIEL SCHULZ: You should see people's faces if you'd explain the 'created out of thin air book money or quantitative easing scam that the global banks do.\n"
, "KRIS: As I explained this several times thus far 'labor shortages means companies can't afford to pay normal wages due to Quantitative Easing and low rates wages have dropped people refuse to work for little money https://t.co/FFQ0Nrpr0i\n"
, "RICHARD WEISS:  leslie  ellie  Misfit  anomaly  Read NZ  red  the People7  To Duopoly Controlling creation of money (spending is limited if creation of money is limited is the way to manage inflation Quantitative easing hasn't resulted in inflation because the money resides in the accounts of the 0.01 which has a low velocity https://t.co/QePnKR1nUM\n"
, "SERIAL TRADER: We haven't even talked about the Federal Reserve's QE1 QE2 QE3 QE3 113 increase. You add up all of Bernanke's quantitative easing and he could have simply just given every single US citizen roughly $10,000 Family of four?...$40,000.\n"
, "JAMES MACEACHERN:  3502  Nabb  U A R UK is a low wage economy and has been running deficits for 43 of the last 50 years It's been bailed out twice and narrowly avoided a third bailout by 2 hours It's currently relying on £435bn of quantitative easing and has a high debt to GDP ratio No-one knows the future.\n"
, "ALEX SCHAEFER: Too Big To Fail and Quantitative Easing are the biggest welfare programs in history Fact more taxpayer money was doled out to criminal banks from 2008 to 2017 than has been given to 'lazy bums and Americans et al since the inception of Welfare programs in America 80 years ago.\n"
, "DARREN MOORE: Tbh this compares favourable to the £350 billion spent on quantitative easing which generated zero value for the public https://t.co/r39Me1Q1I1\n"
, "DAVID B COHEN: It's an opinion piece by an Obama cheerleader it reads like a partisan polemic that demonizes Republicans Economic performance under Obama would have been even worse had the Fed not launched an unsustainable quantitative easing scheme to overcome the Obama-induced credit crunch\n"
, "OBEY THE REPUBLIC:  JKT Quantitative Easing &amp TARP bailouts is not capitalism the merger of quasi provate central banks bailing out private banks threw government endorsements is called fascism,but liberals &amp socialist love giving capitalism a bad name so they adopt the term crony-capitalism 2 fool ppl\n"
, "RICARDO PEDRAZ: Josh Ryan-Collins advocates the ECB should play a stronger role in supporting a sustainable finance system Green macroprudential policies + Green credit guidance Incorporating sustainability criteria into quantitative easing https://t.co/RjXbxw5Xwf\n"
, "EDMUND BURKE: 4 To stanch the arterial exsanguination radical experiments (read Quantitative Easing are tried on a living patient like extreme unction in hopes that the bleeding will stop The result the loss of half a generation's life-goals and no reward for saving 8/\n"
, "CHRIS FAGAN: SAME ECONOMIC IDIOTS THAT TOLD US QUANTITATIVE EASING IS NOT INFLATION......\n"
, "THE RETAIL CRYPTO INVESTOR: Money printing quantitative easing is the tech term But it means the central banks just print money from thin air 😂\n"
, "PEACE UNITY HOPE:  Alexand  Pro  nimmo  riri  Stubble  UK  Sticks Real  Tee  Initials Not the stop the war people we were very let down...we have always had debts so how could we be richest Debts from ending slavery only ended recently Quantitative easing is ordinary tax payers bailing out corrupt banking systems...we should have chucked them out &amp;seized assets\n"
, "THE AUTOMATIC EARTH: Debt Rattle March 11 2018 Quantitative easing too is subject to diminishing returns And quantitative tightening can only make that much worse Some might call this a Catch 22. https://t.co/nmC66GeHym https://t.co/EFrwcH5qG0\n"
, "PROBABLEREPROBATE...: Clap trap Quantitative Easing of 500 Billion Debt of 1.75 Trillion Brexit yet to come Austerity used as political weapon to decimate public services Stagnant wages,productivity &amp a demoralised NHS...Tories are a failed project run by extremist ideologies That's the message.\n"
, "CAPITAL CONFLICT: The Currency Wars are over Having tripled the monetary base as a per cent of GDP the world’s major central banks are now winding up No more quantitative easing No more attempts to devalue the dollar euro or yen https://t.co/AxWu110Dor\n"
, "EXPONENTIAL INVESTOR: The Currency Wars are over Having tripled the monetary base as a per cent of GDP the world’s major central banks are now winding up No more quantitative easing No more attempts to devalue the dollar euro or yen https://t.co/DJeY0OLNvY\n"
, "GEORGE E: Commodities Assets Real Estate etc. Trillions of dollars of quantitative easing &amp stimulas will make a Hard assets bubble like no tomorrow I totally agree with what your layen down.\n"
, "PHILIP KENNEDY [LTC]: Quantitative easing and artificially low interest rates hurt the U.S economy and that’s why Trump is president I help ordinary people financially navigate the Bush/Obama/Trump depression.\n"
, "WALLACE NOLL: US does quantitative easing that results in unjust enrichment for privileged rich people China does quantitative easing that results in a trillion dollars worth of infrastructure projects tax-free America on suicide path losing badly at everything; https://t.co/WaSxsUm0rX\n"
, "ITECOIN HODLER [ TC]:  MAD  LTC  Jake The Litecoin Foundation can not regulate the supply of coins. Ripple has coins lock away for quantitative easing later hmm where have I heard that before?\n"
, "MORNINGSTAR.CO.UK: Hobson QE is Painfully Thankfully Coming to an End THE WEEK: Quantitative easing which few people understood and no one will miss is slowly coming to an end says Rodney Hobson https://t.co/gz8WVojmkh https://t.co/y92vyMNXWz\n"
, "DIANE JAMES MEP: Is there any credence to #Conservative 's assertion that the Bank of England will unwind Quantitative Easing and sell £530 billion of bonds as soon as Base rates hit 'around 2%?\n"
, "MARK TWAIN: Primed by SEVERAL TRILLION dollars in Quantitative Easing of course which goosed the markets to artificially inflated values I am mega bearish on this market as it is disgustingly overvaluated https://t.co/GamZKsm5lO\n"
, "AJ #GOBOLTS: I don't know how this opinion could be taken seriously without referencing the dominant force in the bull market as quantitative easing matched with stock buy backs.\n"
, "ANDYGUITAR:  Trump Train Ever heard of quantitative easing President Trump is trying to undo all of this disastrous Obama crap!\n"
, "MORNINGSTAR.CO.UK: Hobson QE is Painfully Thankfully Coming to an End THE WEEK: Quantitative easing which few people understood and no one will miss is slowly coming to an end says Rodney Hobson https://t.co/MNCJAGbw8w https://t.co/EeRtB3mZhz\n"
, "DAN EXTRA RIFFLE: I'm sorry your friends were all murdered but the real tragedy is quantitative easing https://t.co/SgXaTxbmh7\n"
, "MORNINGSTAR.CO.UK: Hobson QE is Painfully Thankfully Coming to an End THE WEEK: Quantitative easing which few people understood and no one will miss is slowly coming to an end says Rodney Hobson https://t.co/adKgYzTqZ8 https://t.co/pqh7byAIoP\n"
, "CHRISTOPHER A HARTWELL:  veron ...especially when they threaten the cozy status quo of quantitative easing to infinity What a terrible anti-German hit job I expect more from\n"
, "SCOTT BARLOW: I think you mean 'monetary' Central bank printing (whatever you want to call it...quantitative easing etc.\n"
, "COMPOUNDPROFITS: If you mean Quantitative Easing that BUYS other instruments eg Bonds so it cannot repay debt  luggar\n"
, "OZ: by historical standards due to the FOMC’s large-scale purchases of longer-term Treasury and agency debt beginning in 2008 These programs commonly referred as quantitative easing or QE ended in October 2014 and the process of shrinking the Fed’s balance sheet to reduce\n"
, "DAVID BELLE: Quantitative Easing is the BoE cancelling the governments debt so when it matures the debt is about 20-30 lower It just looks like that because it’s on the BoE’s balance sheet still Largely irrelevant if not put back on the market https://t.co/5piCxU6vCp\n"
, "CLARIE DARROW: So if anyone says we are too poor I say wonder why and let’s look at the quantitative easing borrowing mad Westminster government ? Indynow !\n"
, "BOB SMITH: That’s because they’re trapped in the quantitative easing\n"
, "PBI_GESTION: ECB said quantitative easing will continue at the pace of 30 billion euros until at least the end of September but left out the so-called easing bias that the plan could be increased in “size and/or duration if the inflation outlook deteriorates https://t.co/dwJRe3ETGQ\n"
, "PATRICK BROMPTON: What benefits the great EU economy With negative interest rates and quantitative easing of 60 billion Euros per month structural unemployment up to 40 of those under 30 where Spain and Italy are poorer than they were after the 2008 crash and France is riddled with bad debt.\n"
, "CHRIS FAGAN: The same economic MORONS.. Who told us QUANTITATIVE EASING is not Inflation.......\n"
, "MARIO MUNTA: to keep interest rates and pace of quantitative easing at current levels 'for as long as necessary' confirms ECB President Mario Draghi https://t.co/Fq0idhLZws https://t.co/VJY7GoNnXV\n"
, "POSITIVE MONEY EUROPE: It is necessary to align private finance with climate goals but this will only produce effects on medium to long run We need to boost the low carbon transition ASAP We can afford to boost public investments if we coordinate with #ECB's quantitative easing https://t.co/ySDomFV5SZ\n"
, "EDWARD FENLEY: Feed the economy Not sure what you mean by that Do you mean like Quantitative Easing Pumping money into the market?\n"
, "ALASDAIR THOMPSON: Oh you mean quantitative easing which funded the inflation of assets to offset the debts against them But it didn’t increase the price of milk to $250,000 a litre\n"
, "JOE EMERSBERGER: An under-appreciated risk to the UK economy in spite of the BOE’s low interest rates and aggressive quantitative easing during the past decade there is still substantial risk that monetary policy might unnecessarily slow the economy or worse in the coming years https://t.co/b0IGyqA6Sg\n"
, "NEWS BY MURALI KUMAR: The ECB isn’t expected to change policy on Thursday but the Governing Council may discuss a change to pave the way for the end of quantitative easing.\n"
, "MONI RUNA:  robert so the immediate injection of Quantitative easing to cushion us from the fall out was nothing That only bought extra time for companies to plan ahead and that they did Hope you are wrong but tough times ahead You are only safe if you have assets and no children to support\n"
, "CAM INVESTOR: Plus the other jolly ruse Printing it Quantitative easing (easing of the value of the money you have inflation).\n"
, "TONEDAGGER: Sorry but quantitative easing &amp printing money is stagnation not a recovery https://t.co/mhCDfqgYCe\n"
, "RON KLINE: QE is fine when everyone is doing so but employ it unilaterally and the will fall as the yen did This will create inflation as imports increase in price https://t.co/XSseb1Odqz\n"
, "MILE HIGH MESSIAH: It’s complicated obviously lots going on but Obama Quantitative Easing is worse monetary policy in our history and one could only assume he trying to fuck our economy On top of that Obama added more debt than 200 years and 43 POTUS b4 him combined Stop making excuses R none\n"
, "MATT: Mad that people think that Quantitative easing is the same thing as printing money 🙄\n"
, "RICHARD KRAUSS: #USA #Forbes #Headlines #NEWS broadcast by Dalio Tudor And Gross Are All Wrong It is not a bond bear market It will turn bullish And quantitative easing is coming back https://t.co/nfUUF2tSPo\n"
, "MING KERR: It's already proven that Quantitative Easing does not cause runaway inflation and does not have to be spent on banks. Think carefully about that for a few years Steve... You may finally 'get what the Tories have done who they are...\n"
, "MING KERR: 'A government does not need to balance its books...' Quantitative Easing does not have to be spent on banks alone... https://t.co/0UQqSMV1Ry\n"
, "MATT J WHITEHEAD: Our biggest danger right now is actually (3) but significant inflation won't kick in on a measly 30 spending ratio Inflation IS a bad thing which we should watch out for but it's really only a risk if we do quantitative easing in large amounts not take on actual debt.\n"
, "ONE AMIGO: Very bad idea Rates are rising &amp quantitative easing is being reversed.\n"
, "M9 TRADE LEND BTC: 'Quantitative Easing Not a bad name for a Laxative and even a worse name to cover up money printing Stefan Molyneux\n"
, "NEWS BY MURALI KUMAR: The ECB isn’t expected to change policy on Thursday but the Governing Council may discuss a change to pave the way for the end of quantitative easing.\n"
, "JAMES MARTINELLI:  aaron  Troll  obsession  msmarshas  Reality  Girk Yea cuz every president before him f’d over all the new deal regulations which made banking stable But hardly restrictive He gave trillions in quantitative easing to Wall Street also.\n"
, "ALT KATIE HOPKINS: British Intelligence funded my place at to Study #Economics What a waste of (#TaxPayer as as I appear to have forgotten what Quantitative Easing is x https://t.co/vJvknIbe8S\n"
, "GUY VERMINTWAT MEP: you do know they've be falsely inflating their economy with Quantitative Easing to the tune of 2.5 trillion Euro's and buying naff bonds.\n"
, "JERRY TAYLOR #FBPE #LIBDEM #LONDEPENDENCE:  J Irwin @ cat weasel The Coalition did get the economy going and encouraged investment It also continued Brown’s QE program https://t.co/XkBQyPd8yj Historically the government has always been poor at investing money where it’s needed Politics always gets in the way too.\n"
, "BOB KLEINSCHMIDT: It's a little late for controlling the Federal Reserve Rand Shoulda did that during the Obama Administration with Ben Bernanke running the circus 3 rounds of quantitative easing and we're buying our own debt Crazy\n"
, "ARTHOUSE EL POFIT: Too big to fail and just look up Where all the cash from Quantitative easing has gone to as logic would be to give a massive tax break for people earning under £50,000 to increase spending power button no no instead they gave it to the banks and my wage raise this year 3.6%\n"
, "MICHAEL:  de That’s called quantitative easing.. “Printing money is like saying illegal alien.\n"
, "PATRICK CHOVANEC: Mar 5 1918 American economist James Tobin (who developed at least one of the theories behind Quantitative Easing and who oversaw Janet Yellen's dissertation was born in Champaign Illinois #100yearsago https://t.co/GM63MdU4Tx\n"
, "SANTOS TAMANG (BLON): China woke up to surprise even after continuing to buy US Treasury bills after 2008 financial crisis but US shocked Beijing by starting Quantitative Easing printing of new paper dollars The message by DC was “yes it’s our money but it’s your problem now and we don’t care”.\n"
, "L HONDERS: Europe's economy has been ascending. EURUSD is stable lately (also less translation risk compared to EM's or Japan). Quantitative Easing is still active. General P/E's are cheaper than US's P/E's.\n"
, "POLITICSCANBECUTE: Senator Schumer delicately tends to quantitative easing Lick my tears wet the bed with em don't trust liberals!\n"
, "EMILIO PANTOJAS: Where do you get your numbers Shows them to the Board and Judge Swain. Quantitative Easing is not available to PR.\n"
, "KRIS: I have been telling you about supply chains breakdown for 3-4 years already due to low rates and quantitative easing https://t.co/71UV4xdmWy\n"
, "KRIS: I have been telling you about supply chains breakdown for 3-4 years already due to low rates and quantitative easing https://t.co/t4LbXHOVlK\n"
, "EXPONENTIAL INVESTOR: The Currency Wars are over Having tripled the monetary base as a per cent of GDP the world’s major central banks are now winding up No more quantitative easing No more attempts to devalue the dollar euro or yen https://t.co/ns8HlMciCQ\n"
, "CAPITAL CONFLICT: The Currency Wars are over Having tripled the monetary base as a per cent of GDP the world’s major central banks are now winding up No more quantitative easing No more attempts to devalue the dollar euro or yen https://t.co/AxWu110Dor\n"
, "ELSCOTTO: Quantitative Easing wasn’t targeted in the right direction and directly lead to inflation of property prices whilst making borrowing difficult Again the Government has to accept responsibility for its part in creating the problem.\n"
, "TONY WESTON #MMT:  gordon  Swindon UK Bank of England a publib body created £435B for Quantitative Easing Very little inflation happened.\n"
, "KRIS: Maersk going from bad to worse as global trade is cracking faster due to low rates and quantitative easing https://t.co/DTzZ8JLnz1\n"
      ]
    }
  ]
, speakers:
  {

    "BILL SHORTEN":
    { name: "Bill Shorten"
    , title: "Opposition Leader (Labor Party)"
    },

 "KRIS": { name: "KRIS", title: "Date: 13 Mar 2018 Rating: 0.150" } ,
 "KRIS": { name: "KRIS", title: "Date: 13 Mar 2018 Rating: 0.100" } ,
 "DANIEL SCHULZ": { name: "DANIEL SCHULZ", title: "Date: 13 Mar 2018 Rating: -0.200" } ,
 "MALLOWSTREETPENSIONS": { name: "MALLOWSTREETPENSIONS", title: "Date: 13 Mar 2018 Rating: 0.000" } ,
 "MICHAEL TARPEY": { name: "MICHAEL TARPEY", title: "Date: 13 Mar 2018 Rating: 0.200" } ,
 "CURRENCIES.CO.UK": { name: "CURRENCIES.CO.UK", title: "Date: 13 Mar 2018 Rating: 0.250" } ,
 "THINK CURRENCY": { name: "THINK CURRENCY", title: "Date: 13 Mar 2018 Rating: 0.250" } ,
 "POWERBROKER SOFTWARE": { name: "POWERBROKER SOFTWARE", title: "Date: 13 Mar 2018 Rating: 0.050" } ,
 "KRIS": { name: "KRIS", title: "Date: 13 Mar 2018 Rating: -0.010" } ,
 "RICHARD WEISS": { name: "RICHARD WEISS", title: "Date: 13 Mar 2018 Rating: -0.036" } ,
 "ICMR INDIA": { name: "ICMR INDIA", title: "Date: 13 Mar 2018 Rating: 0.000" } ,
 "PIP": { name: "PIP", title: "Date: 13 Mar 2018 Rating: 0.000" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 13 Mar 2018 Rating: 0.000" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 13 Mar 2018 Rating: 0.000" } ,
 "FTA": { name: "FTA", title: "Date: 13 Mar 2018 Rating: 0.050" } ,
 "NEP-MON": { name: "NEP-MON", title: "Date: 13 Mar 2018 Rating: 0.000" } ,
 "BLUE DIAMOND": { name: "BLUE DIAMOND", title: "Date: 13 Mar 2018 Rating: 0.000" } ,
 "RACHIT SHAH": { name: "RACHIT SHAH", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "SERIAL TRADER": { name: "SERIAL TRADER", title: "Date: 12 Mar 2018 Rating: -0.057" } ,
 "SI PEERTROWSKI": { name: "SI PEERTROWSKI", title: "Date: 12 Mar 2018 Rating: 0.119" } ,
 "THE PROPHET": { name: "THE PROPHET", title: "Date: 12 Mar 2018 Rating: 0.049" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "Date: 12 Mar 2018 Rating: -0.006" } ,
 "CONFUSED": { name: "CONFUSED", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "LISETTEINBLUE": { name: "LISETTEINBLUE", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "RICKY MARSH": { name: "RICKY MARSH", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "JOURNO LIST": { name: "JOURNO LIST", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "DANIEL NICOLAUS": { name: "DANIEL NICOLAUS", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "JAMES LAZARUS #FBPE": { name: "JAMES LAZARUS #FBPE", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "LIONEL FRANKENSTEIN": { name: "LIONEL FRANKENSTEIN", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "K": { name: "K", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "ROSS NUGENT": { name: "ROSS NUGENT", title: "Date: 12 Mar 2018 Rating: 0.072" } ,
 "ALEX SCHAEFER": { name: "ALEX SCHAEFER", title: "Date: 12 Mar 2018 Rating: -0.130" } ,
 "MALLOWSTREETPENSIONS": { name: "MALLOWSTREETPENSIONS", title: "Date: 12 Mar 2018 Rating: 0.136" } ,
 "MONEYTRIGZ": { name: "MONEYTRIGZ", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "NISHA LONG": { name: "NISHA LONG", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "GWM GROUP": { name: "GWM GROUP", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "GUARDIAN GS": { name: "GUARDIAN GS", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "GOODSTAR": { name: "GOODSTAR", title: "Date: 12 Mar 2018 Rating: 0.350" } ,
 "INERTIA": { name: "INERTIA", title: "Date: 12 Mar 2018 Rating: 0.125" } ,
 "MICHAEL LAMARR": { name: "MICHAEL LAMARR", title: "Date: 12 Mar 2018 Rating: 0.175" } ,
 "CHRIS BARLOW": { name: "CHRIS BARLOW", title: "Date: 12 Mar 2018 Rating: 0.525" } ,
 "DARREN MOORE": { name: "DARREN MOORE", title: "Date: 12 Mar 2018 Rating: -0.050" } ,
 "MIKE MILLAR": { name: "MIKE MILLAR", title: "Date: 12 Mar 2018 Rating: 0.104" } ,
 "RUSSELL INVESTMENTS": { name: "RUSSELL INVESTMENTS", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "CRUDE LIBERTARIAN": { name: "CRUDE LIBERTARIAN", title: "Date: 12 Mar 2018 Rating: 0.400" } ,
 "ACCURATETRADING": { name: "ACCURATETRADING", title: "Date: 12 Mar 2018 Rating: 0.050" } ,
 "CHRIS FAGAN": { name: "CHRIS FAGAN", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "CHRIS MCGRATH": { name: "CHRIS MCGRATH", title: "Date: 12 Mar 2018 Rating: 0.250" } ,
 "MC": { name: "MC", title: "Date: 12 Mar 2018 Rating: 0.250" } ,
 "SHAREEFBABIKR": { name: "SHAREEFBABIKR", title: "Date: 12 Mar 2018 Rating: 0.080" } ,
 "RICHARD HOLLAND": { name: "RICHARD HOLLAND", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "FOOL ON THE HILLZ": { name: "FOOL ON THE HILLZ", title: "Date: 12 Mar 2018 Rating: 0.006" } ,
 "FOOL ON THE HILLZ": { name: "FOOL ON THE HILLZ", title: "Date: 12 Mar 2018 Rating: 0.156" } ,
 "DAVID B COHEN": { name: "DAVID B COHEN", title: "Date: 12 Mar 2018 Rating: -0.100" } ,
 "OBEY THE REPUBLIC": { name: "OBEY THE REPUBLIC", title: "Date: 12 Mar 2018 Rating: -0.050" } ,
 "BEVAN BOY": { name: "BEVAN BOY", title: "Date: 12 Mar 2018 Rating: 0.000" } ,
 "SCLEROTIC NEUROTIC": { name: "SCLEROTIC NEUROTIC", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "TED": { name: "TED", title: "Date: 11 Mar 2018 Rating: 0.400" } ,
 "GRAEME HOUCHIN": { name: "GRAEME HOUCHIN", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "ECOINTERNET": { name: "ECOINTERNET", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "GORDON VICK": { name: "GORDON VICK", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "ROTHSCHILDISH  WE COLONIZED KANGZ!": { name: "ROTHSCHILDISH  WE COLONIZED KANGZ!", title: "Date: 11 Mar 2018 Rating: 0.100" } ,
 "POLITICAL DOBERMAN": { name: "POLITICAL DOBERMAN", title: "Date: 11 Mar 2018 Rating: 0.500" } ,
 "UNLIVABLEREGION": { name: "UNLIVABLEREGION", title: "Date: 11 Mar 2018 Rating: 0.165" } ,
 "RUSSELL INVESTMENTS": { name: "RUSSELL INVESTMENTS", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "RICARDO PEDRAZ": { name: "RICARDO PEDRAZ", title: "Date: 11 Mar 2018 Rating: -0.050" } ,
 "EDMUND BURKE": { name: "EDMUND BURKE", title: "Date: 11 Mar 2018 Rating: -0.146" } ,
 "CHRIS BURNS": { name: "CHRIS BURNS", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "CHRIS FAGAN": { name: "CHRIS FAGAN", title: "Date: 11 Mar 2018 Rating: -0.200" } ,
 "PHILIP KENNEDY [LTC]": { name: "PHILIP KENNEDY [LTC]", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "DAVID BINNS": { name: "DAVID BINNS", title: "Date: 11 Mar 2018 Rating: 0.307" } ,
 "THE RETAIL CRYPTO INVESTOR": { name: "THE RETAIL CRYPTO INVESTOR", title: "Date: 11 Mar 2018 Rating: -0.200" } ,
 "DRIEHAUS": { name: "DRIEHAUS", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "PEACE UNITY HOPE": { name: "PEACE UNITY HOPE", title: "Date: 11 Mar 2018 Rating: -0.058" } ,
 "MANCHESTER FOR EUROPE #FBPE#ABTV#WATON": { name: "MANCHESTER FOR EUROPE #FBPE#ABTV#WATON", title: "Date: 11 Mar 2018 Rating: 0.250" } ,
 "THE AUTOMATIC EARTH": { name: "THE AUTOMATIC EARTH", title: "Date: 11 Mar 2018 Rating: -0.189" } ,
 "PROBABLEREPROBATE...": { name: "PROBABLEREPROBATE...", title: "Date: 11 Mar 2018 Rating: -0.167" } ,
 "G": { name: "G", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "CAPITAL CONFLICT": { name: "CAPITAL CONFLICT", title: "Date: 11 Mar 2018 Rating: -0.247" } ,
 "#EX-RVID5774 [ TC]": { name: "#EX-RVID5774 [ TC]", title: "Date: 11 Mar 2018 Rating: 0.200" } ,
 "EXPONENTIAL INVESTOR": { name: "EXPONENTIAL INVESTOR", title: "Date: 11 Mar 2018 Rating: -0.247" } ,
 "SIMON ROWE": { name: "SIMON ROWE", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "KENNETH ARMITAGE": { name: "KENNETH ARMITAGE", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "DAVID B COHEN": { name: "DAVID B COHEN", title: "Date: 11 Mar 2018 Rating: 0.280" } ,
 "GEORGE E": { name: "GEORGE E", title: "Date: 11 Mar 2018 Rating: -0.062" } ,
 "JOHN DUMOND": { name: "JOHN DUMOND", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "JEFFREY GRUBB": { name: "JEFFREY GRUBB", title: "Date: 11 Mar 2018 Rating: 0.000" } ,
 "PHILIP KENNEDY [LTC]": { name: "PHILIP KENNEDY [LTC]", title: "Date: 10 Mar 2018 Rating: -0.083" } ,
 "CONSERVATARIAN": { name: "CONSERVATARIAN", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "WALLACE NOLL": { name: "WALLACE NOLL", title: "Date: 10 Mar 2018 Rating: 0.179" } ,
 "RICH EAGLESON": { name: "RICH EAGLESON", title: "Date: 10 Mar 2018 Rating: 0.307" } ,
 "WALLACE NOLL": { name: "WALLACE NOLL", title: "Date: 10 Mar 2018 Rating: -0.008" } ,
 "BOB KERNS": { name: "BOB KERNS", title: "Date: 10 Mar 2018 Rating: 0.179" } ,
 "RUSSELL INVESTMENTS": { name: "RUSSELL INVESTMENTS", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "BOYD'S BACKYARD": { name: "BOYD'S BACKYARD", title: "Date: 10 Mar 2018 Rating: 0.500" } ,
 "BILL CREGO": { name: "BILL CREGO", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "DANIELLE KURTZLEBEN": { name: "DANIELLE KURTZLEBEN", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "ANGRY NORTHERNER #FBPE": { name: "ANGRY NORTHERNER #FBPE", title: "Date: 10 Mar 2018 Rating: 0.167" } ,
 "JAY": { name: "JAY", title: "Date: 10 Mar 2018 Rating: 0.225" } ,
 "ITECOIN HODLER [ TC]": { name: "ITECOIN HODLER [ TC]", title: "Date: 10 Mar 2018 Rating: -0.312" } ,
 "IMPERIAL BUSINESS": { name: "IMPERIAL BUSINESS", title: "Date: 10 Mar 2018 Rating: 0.350" } ,
 "JOHN IOANNOU": { name: "JOHN IOANNOU", title: "Date: 10 Mar 2018 Rating: 0.188" } ,
 "T J LEVI": { name: "T J LEVI", title: "Date: 10 Mar 2018 Rating: 0.306" } ,
 "CAPPY LOVE": { name: "CAPPY LOVE", title: "Date: 10 Mar 2018 Rating: 0.043" } ,
 "JUST PURE INFORMATION": { name: "JUST PURE INFORMATION", title: "Date: 10 Mar 2018 Rating: 0.115" } ,
 "SKENDERBEG": { name: "SKENDERBEG", title: "Date: 10 Mar 2018 Rating: 0.115" } ,
 "SIGNALS.ME": { name: "SIGNALS.ME", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "PROGRESSIVES-R-FOOLS": { name: "PROGRESSIVES-R-FOOLS", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "BULL STREET": { name: "BULL STREET", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "SYKESFANCLUB": { name: "SYKESFANCLUB", title: "Date: 10 Mar 2018 Rating: 0.136" } ,
 "JOHN HAMPSHIRE": { name: "JOHN HAMPSHIRE", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "BRIAN CHOLERTON": { name: "BRIAN CHOLERTON", title: "Date: 10 Mar 2018 Rating: 0.181" } ,
 "NEP-CMP": { name: "NEP-CMP", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "WALLACE NOLL": { name: "WALLACE NOLL", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "MORNINGSTAR.CO.UK": { name: "MORNINGSTAR.CO.UK", title: "Date: 10 Mar 2018 Rating: -0.400" } ,
 "CHRISTIE STEPHENSON": { name: "CHRISTIE STEPHENSON", title: "Date: 10 Mar 2018 Rating: 0.000" } ,
 "DVOLATILITY PRO": { name: "DVOLATILITY PRO", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "FAKE LNP": { name: "FAKE LNP", title: "Date: 09 Mar 2018 Rating: 0.267" } ,
 "DVOLATILITY PRO": { name: "DVOLATILITY PRO", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "JACKSCHITT": { name: "JACKSCHITT", title: "Date: 09 Mar 2018 Rating: 0.500" } ,
 "JOHNNYMULKA": { name: "JOHNNYMULKA", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "TALKMARKETS": { name: "TALKMARKETS", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "RUSSELL INVESTMENTS": { name: "RUSSELL INVESTMENTS", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "LOWELL THE BERNER": { name: "LOWELL THE BERNER", title: "Date: 09 Mar 2018 Rating: 0.075" } ,
 "MODERNAGE BUDDHA": { name: "MODERNAGE BUDDHA", title: "Date: 09 Mar 2018 Rating: 0.125" } ,
 "TERRY W ROBERTSON": { name: "TERRY W ROBERTSON", title: "Date: 09 Mar 2018 Rating: 0.142" } ,
 "BENJAMIN DEAN": { name: "BENJAMIN DEAN", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "DIANE JAMES MEP": { name: "DIANE JAMES MEP", title: "Date: 09 Mar 2018 Rating: -0.800" } ,
 "BG BINGHAM": { name: "BG BINGHAM", title: "Date: 09 Mar 2018 Rating: 0.496" } ,
 "MARK TWAIN": { name: "MARK TWAIN", title: "Date: 09 Mar 2018 Rating: -0.533" } ,
 "AJ #GOBOLTS": { name: "AJ #GOBOLTS", title: "Date: 09 Mar 2018 Rating: -0.333" } ,
 "ANDYGUITAR": { name: "ANDYGUITAR", title: "Date: 09 Mar 2018 Rating: -0.850" } ,
 "FOREX WARRIOR": { name: "FOREX WARRIOR", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "** NEW RESEARCH ***": { name: "** NEW RESEARCH ***", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "MORNINGSTAR.CO.UK": { name: "MORNINGSTAR.CO.UK", title: "Date: 09 Mar 2018 Rating: -0.400" } ,
 "TOBY SHORT": { name: "TOBY SHORT", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "ZORRO BORICUA": { name: "ZORRO BORICUA", title: "Date: 09 Mar 2018 Rating: 0.200" } ,
 "DAN EXTRA RIFFLE": { name: "DAN EXTRA RIFFLE", title: "Date: 09 Mar 2018 Rating: -0.150" } ,
 "MATT BENSON": { name: "MATT BENSON", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "SAGAR": { name: "SAGAR", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "JOE M": { name: "JOE M", title: "Date: 09 Mar 2018 Rating: 0.233" } ,
 "JUSTIN BEAVER": { name: "JUSTIN BEAVER", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "DEAN RIGGS": { name: "DEAN RIGGS", title: "Date: 09 Mar 2018 Rating: 0.113" } ,
 "CLIFFY": { name: "CLIFFY", title: "Date: 09 Mar 2018 Rating: 0.286" } ,
 "MORNINGSTAR.CO.UK": { name: "MORNINGSTAR.CO.UK", title: "Date: 09 Mar 2018 Rating: -0.400" } ,
 "MONEYCORP PAYMENTS": { name: "MONEYCORP PAYMENTS", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "FELIPE DIOGENES": { name: "FELIPE DIOGENES", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "CHRISTOPHER A HARTWELL": { name: "CHRISTOPHER A HARTWELL", title: "Date: 09 Mar 2018 Rating: -0.233" } ,
 "THOMAS ATCHESON": { name: "THOMAS ATCHESON", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "FRANKLIN": { name: "FRANKLIN", title: "Date: 09 Mar 2018 Rating: 0.550" } ,
 "AXA IM UK": { name: "AXA IM UK", title: "Date: 09 Mar 2018 Rating: 0.175" } ,
 "JOE JONKLER": { name: "JOE JONKLER", title: "Date: 09 Mar 2018 Rating: 0.287" } ,
 "CHRIS": { name: "CHRIS", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "GREYBEARD": { name: "GREYBEARD", title: "Date: 09 Mar 2018 Rating: 0.167" } ,
 "BIG INDIAN BEAR": { name: "BIG INDIAN BEAR", title: "Date: 09 Mar 2018 Rating: 0.050" } ,
 "JW": { name: "JW", title: "Date: 09 Mar 2018 Rating: 0.103" } ,
 "BIG INDIAN BEAR": { name: "BIG INDIAN BEAR", title: "Date: 09 Mar 2018 Rating: 0.080" } ,
 "FOREX FOR ALL": { name: "FOREX FOR ALL", title: "Date: 09 Mar 2018 Rating: 0.275" } ,
 "IAN BULLOUGH": { name: "IAN BULLOUGH", title: "Date: 09 Mar 2018 Rating: 0.033" } ,
 "POSITIVE MONEY EUROPE": { name: "POSITIVE MONEY EUROPE", title: "Date: 09 Mar 2018 Rating: 0.550" } ,
 "DAILY EXPRESS": { name: "DAILY EXPRESS", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "WILLY SMYTHE": { name: "WILLY SMYTHE", title: "Date: 09 Mar 2018 Rating: 0.234" } ,
 "FXCC FOREX TRADING": { name: "FXCC FOREX TRADING", title: "Date: 09 Mar 2018 Rating: 0.067" } ,
 "SCOTT BARLOW": { name: "SCOTT BARLOW", title: "Date: 09 Mar 2018 Rating: -0.156" } ,
 "RMB GLOBAL MARKETS": { name: "RMB GLOBAL MARKETS", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "EMMANUEL ASHIBUOGWU": { name: "EMMANUEL ASHIBUOGWU", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "SCOFIELD!": { name: "SCOFIELD!", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "FOREX WARRIOR": { name: "FOREX WARRIOR", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "ROBERTO ROSANO": { name: "ROBERTO ROSANO", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "BIDASK CAPITAL": { name: "BIDASK CAPITAL", title: "Date: 09 Mar 2018 Rating: 0.038" } ,
 "ANDREW PALMER": { name: "ANDREW PALMER", title: "Date: 09 Mar 2018 Rating: 0.161" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 09 Mar 2018 Rating: 0.000" } ,
 "COMPOUNDPROFITS": { name: "COMPOUNDPROFITS", title: "Date: 09 Mar 2018 Rating: -0.219" } ,
 "STEVE DEMETRIOU": { name: "STEVE DEMETRIOU", title: "Date: 09 Mar 2018 Rating: 0.300" } ,
 "OZ": { name: "OZ", title: "Date: 09 Mar 2018 Rating: -0.142" } ,
 "DAVID BELLE": { name: "DAVID BELLE", title: "Date: 08 Mar 2018 Rating: -0.250" } ,
 "CLARIE DARROW": { name: "CLARIE DARROW", title: "Date: 08 Mar 2018 Rating: -0.591" } ,
 "BOB SMITH": { name: "BOB SMITH", title: "Date: 08 Mar 2018 Rating: -0.200" } ,
 "MAULDIN ECONOMICS": { name: "MAULDIN ECONOMICS", title: "Date: 08 Mar 2018 Rating: 0.125" } ,
 "BOB SMALSER": { name: "BOB SMALSER", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "PBI_GESTION": { name: "PBI_GESTION", title: "Date: 08 Mar 2018 Rating: -0.150" } ,
 "PATRICK BROMPTON": { name: "PATRICK BROMPTON", title: "Date: 08 Mar 2018 Rating: -0.067" } ,
 "JON LIEBERKIND": { name: "JON LIEBERKIND", title: "Date: 08 Mar 2018 Rating: 0.250" } ,
 "WALLACE NOLL": { name: "WALLACE NOLL", title: "Date: 08 Mar 2018 Rating: 0.081" } ,
 "WPJ": { name: "WPJ", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "REDGE NKOSI": { name: "REDGE NKOSI", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "REDGE NKOSI": { name: "REDGE NKOSI", title: "Date: 08 Mar 2018 Rating: 0.500" } ,
 "TREVOR CASWELL": { name: "TREVOR CASWELL", title: "Date: 08 Mar 2018 Rating: 0.020" } ,
 "BELT ROAD": { name: "BELT ROAD", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "FRONT BUSINESS NEWS": { name: "FRONT BUSINESS NEWS", title: "Date: 08 Mar 2018 Rating: 0.020" } ,
 "PROFESSOR": { name: "PROFESSOR", title: "Date: 08 Mar 2018 Rating: 0.062" } ,
 "ZEROHEDGE": { name: "ZEROHEDGE", title: "Date: 08 Mar 2018 Rating: 0.062" } ,
 "ANNE LOUISE KER": { name: "ANNE LOUISE KER", title: "Date: 08 Mar 2018 Rating: 0.100" } ,
 "EDDY FINCH": { name: "EDDY FINCH", title: "Date: 08 Mar 2018 Rating: 0.229" } ,
 "DAVID REIGLE": { name: "DAVID REIGLE", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "JOSEPHGERMANOS": { name: "JOSEPHGERMANOS", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "TRADERSNEWS": { name: "TRADERSNEWS", title: "Date: 08 Mar 2018 Rating: 0.120" } ,
 "JONATHAN": { name: "JONATHAN", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "JOUMANNA BERCETCHE": { name: "JOUMANNA BERCETCHE", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "JOHN RYCKMAN": { name: "JOHN RYCKMAN", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "INTL FCSTONE": { name: "INTL FCSTONE", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "CHRIS FAGAN": { name: "CHRIS FAGAN", title: "Date: 08 Mar 2018 Rating: -0.200" } ,
 "MOODYSANALYTICS ECON": { name: "MOODYSANALYTICS ECON", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "MEHRDAD YOUSEFI": { name: "MEHRDAD YOUSEFI", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "AUTO BLOG GLOBAL": { name: "AUTO BLOG GLOBAL", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "CONGRESS WEALTH MGMT": { name: "CONGRESS WEALTH MGMT", title: "Date: 08 Mar 2018 Rating: 0.275" } ,
 "TERENCE HOOSON": { name: "TERENCE HOOSON", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "MARIO MUNTA": { name: "MARIO MUNTA", title: "Date: 08 Mar 2018 Rating: -0.017" } ,
 "MORE BUSINESS NEWS": { name: "MORE BUSINESS NEWS", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "NEWSGW": { name: "NEWSGW", title: "Date: 08 Mar 2018 Rating: 0.068" } ,
 "NEWSPAPER REPORT": { name: "NEWSPAPER REPORT", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "JON BILLINGS #FBPE": { name: "JON BILLINGS #FBPE", title: "Date: 08 Mar 2018 Rating: 0.100" } ,
 "NEWS JOX": { name: "NEWS JOX", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "DAVID GEH CHEOW HOCK": { name: "DAVID GEH CHEOW HOCK", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "WWW.RIGHTNOWNEWS.US": { name: "WWW.RIGHTNOWNEWS.US", title: "Date: 08 Mar 2018 Rating: 0.106" } ,
 "TURFLINE/TRADING": { name: "TURFLINE/TRADING", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "SHUVANKAR MUKHERJEE": { name: "SHUVANKAR MUKHERJEE", title: "Date: 08 Mar 2018 Rating: 0.800" } ,
 "DRIEHAUS": { name: "DRIEHAUS", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "NEWS GRABBER": { name: "NEWS GRABBER", title: "Date: 08 Mar 2018 Rating: 0.433" } ,
 "MELBAL BUSINESS NEWS": { name: "MELBAL BUSINESS NEWS", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "BALMEL DIRECTORY": { name: "BALMEL DIRECTORY", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "EXPRESS BUSINESS NEW": { name: "EXPRESS BUSINESS NEW", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "BANGLADESH NEWS 24": { name: "BANGLADESH NEWS 24", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "CITY A.M.": { name: "CITY A.M.", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "...DAVID JONES": { name: "...DAVID JONES", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "NO MORE EXCUSES": { name: "NO MORE EXCUSES", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "NEWSGW": { name: "NEWSGW", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "BOB HUBBUCK": { name: "BOB HUBBUCK", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "MALUNDA WANDA": { name: "MALUNDA WANDA", title: "Date: 08 Mar 2018 Rating: 0.167" } ,
 "ALESSANDRO": { name: "ALESSANDRO", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "REDGE NKOSI": { name: "REDGE NKOSI", title: "Date: 08 Mar 2018 Rating: 0.160" } ,
 "MORE BUSINESS NEWS": { name: "MORE BUSINESS NEWS", title: "Date: 08 Mar 2018 Rating: 0.068" } ,
 "DAILY EXPRESS": { name: "DAILY EXPRESS", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "HANDELSBLATT GLOBAL": { name: "HANDELSBLATT GLOBAL", title: "Date: 08 Mar 2018 Rating: 0.167" } ,
 "NIKSTRADE": { name: "NIKSTRADE", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "FINANCIALPARTNERS": { name: "FINANCIALPARTNERS", title: "Date: 08 Mar 2018 Rating: 0.167" } ,
 "DAILY EXPRESS": { name: "DAILY EXPRESS", title: "Date: 08 Mar 2018 Rating: 0.068" } ,
 "WALTER VANNELLI #FX": { name: "WALTER VANNELLI #FX", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "BIG MEECHIO KAKU": { name: "BIG MEECHIO KAKU", title: "Date: 08 Mar 2018 Rating: 0.118" } ,
 "MASTER GUCHI": { name: "MASTER GUCHI", title: "Date: 08 Mar 2018 Rating: 0.250" } ,
 "FINANZLINKSECONOMY": { name: "FINANZLINKSECONOMY", title: "Date: 08 Mar 2018 Rating: 0.167" } ,
 "ABUCHI ORJI": { name: "ABUCHI ORJI", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "ECONOMICS GLOBAL": { name: "ECONOMICS GLOBAL", title: "Date: 08 Mar 2018 Rating: 0.083" } ,
 "THE KING OF AMERICA": { name: "THE KING OF AMERICA", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "BLOOMBERG ASIA": { name: "BLOOMBERG ASIA", title: "Date: 08 Mar 2018 Rating: 0.167" } ,
 "BLOOMBERG TV": { name: "BLOOMBERG TV", title: "Date: 08 Mar 2018 Rating: 0.167" } ,
 "BLOOMBERG": { name: "BLOOMBERG", title: "Date: 08 Mar 2018 Rating: 0.167" } ,
 "WILLIAM GEORGE": { name: "WILLIAM GEORGE", title: "Date: 08 Mar 2018 Rating: 0.114" } ,
 "JERRY TAYLOR #FBPE #LIBDEM #LONDEPENDENCE": { name: "JERRY TAYLOR #FBPE #LIBDEM #LONDEPENDENCE", title: "Date: 08 Mar 2018 Rating: 0.011" } ,
 "POSITIVE MONEY EUROPE": { name: "POSITIVE MONEY EUROPE", title: "Date: 08 Mar 2018 Rating: -0.008" } ,
 "PLSA": { name: "PLSA", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "THE CURRENCY SCENE": { name: "THE CURRENCY SCENE", title: "Date: 08 Mar 2018 Rating: 0.080" } ,
 "ALESSANDRO": { name: "ALESSANDRO", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "DAILY EXPRESS": { name: "DAILY EXPRESS", title: "Date: 08 Mar 2018 Rating: 0.500" } ,
 "MEHRDAD YOUSEFI": { name: "MEHRDAD YOUSEFI", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "EMGIST": { name: "EMGIST", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "BSIC": { name: "BSIC", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "URS LA TROMPETTE": { name: "URS LA TROMPETTE", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "EDWARD FENLEY": { name: "EDWARD FENLEY", title: "Date: 08 Mar 2018 Rating: -0.292" } ,
 "BULLISH TRADING": { name: "BULLISH TRADING", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "JEN JONES": { name: "JEN JONES", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "ALASDAIR THOMPSON": { name: "ALASDAIR THOMPSON", title: "Date: 08 Mar 2018 Rating: -0.312" } ,
 "BITCEYLON": { name: "BITCEYLON", title: "Date: 08 Mar 2018 Rating: 0.125" } ,
 "JERRY FLETCHER": { name: "JERRY FLETCHER", title: "Date: 08 Mar 2018 Rating: 0.031" } ,
 "JONES MAHONEY": { name: "JONES MAHONEY", title: "Date: 08 Mar 2018 Rating: 0.375" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "JOE EMERSBERGER": { name: "JOE EMERSBERGER", title: "Date: 08 Mar 2018 Rating: -0.238" } ,
 "NEWS BY MURALI KUMAR": { name: "NEWS BY MURALI KUMAR", title: "Date: 08 Mar 2018 Rating: -0.100" } ,
 "FORBES INVESTING": { name: "FORBES INVESTING", title: "Date: 08 Mar 2018 Rating: 0.000" } ,
 "ALEX SONG": { name: "ALEX SONG", title: "Date: 08 Mar 2018 Rating: 0.115" } ,
 "TOBEY GELDER": { name: "TOBEY GELDER", title: "Date: 08 Mar 2018 Rating: 0.900" } ,
 "ROBERT LERELOU": { name: "ROBERT LERELOU", title: "Date: 08 Mar 2018 Rating: 0.136" } ,
 "RIGSBY": { name: "RIGSBY", title: "Date: 08 Mar 2018 Rating: 0.200" } ,
 "MONI RUNA": { name: "MONI RUNA", title: "Date: 08 Mar 2018 Rating: -0.065" } ,
 "PETER.RAUTH": { name: "PETER.RAUTH", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "CRYPTOIQ": { name: "CRYPTOIQ", title: "Date: 07 Mar 2018 Rating: 0.167" } ,
 "ASK YOURSELF": { name: "ASK YOURSELF", title: "Date: 07 Mar 2018 Rating: 0.700" } ,
 "WTC": { name: "WTC", title: "Date: 07 Mar 2018 Rating: 0.062" } ,
 "JONATHAN WITHALL": { name: "JONATHAN WITHALL", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "CAM INVESTOR": { name: "CAM INVESTOR", title: "Date: 07 Mar 2018 Rating: -0.125" } ,
 "GURTIN MUNI BOND MGT": { name: "GURTIN MUNI BOND MGT", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "EDDY FINCH": { name: "EDDY FINCH", title: "Date: 07 Mar 2018 Rating: 0.200" } ,
 "TONEDAGGER": { name: "TONEDAGGER", title: "Date: 07 Mar 2018 Rating: -0.500" } ,
 "RON KLINE": { name: "RON KLINE", title: "Date: 07 Mar 2018 Rating: -0.042" } ,
 "ERIC": { name: "ERIC", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "RON KLINE": { name: "RON KLINE", title: "Date: 07 Mar 2018 Rating: 0.146" } ,
 "PHILIP ALEXANDER": { name: "PHILIP ALEXANDER", title: "Date: 07 Mar 2018 Rating: 0.186" } ,
 "SEAN GANNON": { name: "SEAN GANNON", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "MILE HIGH MESSIAH": { name: "MILE HIGH MESSIAH", title: "Date: 07 Mar 2018 Rating: -0.043" } ,
 "CARMEL NEALE": { name: "CARMEL NEALE", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "MATT": { name: "MATT", title: "Date: 07 Mar 2018 Rating: -0.312" } ,
 "RICHARD KRAUSS": { name: "RICHARD KRAUSS", title: "Date: 07 Mar 2018 Rating: -0.167" } ,
 "COLUMBIATHREADNEEDLE": { name: "COLUMBIATHREADNEEDLE", title: "Date: 07 Mar 2018 Rating: 0.600" } ,
 "EDDY FINCH": { name: "EDDY FINCH", title: "Date: 07 Mar 2018 Rating: 0.083" } ,
 "FINANCE  DRIVER": { name: "FINANCE  DRIVER", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "LUCA LUCCHESI": { name: "LUCA LUCCHESI", title: "Date: 07 Mar 2018 Rating: 0.338" } ,
 "MING KERR": { name: "MING KERR", title: "Date: 07 Mar 2018 Rating: -0.100" } ,
 "MING KERR": { name: "MING KERR", title: "Date: 07 Mar 2018 Rating: -0.100" } ,
 "JOHN MEHARG": { name: "JOHN MEHARG", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "MATT J WHITEHEAD": { name: "MATT J WHITEHEAD", title: "Date: 07 Mar 2018 Rating: -0.049" } ,
 "EP CAPITAL": { name: "EP CAPITAL", title: "Date: 07 Mar 2018 Rating: 0.500" } ,
 "E-RECEP": { name: "E-RECEP", title: "Date: 07 Mar 2018 Rating: 0.200" } ,
 "CDR AN0NWELL": { name: "CDR AN0NWELL", title: "Date: 07 Mar 2018 Rating: 0.000" } ,
 "DAILY EXPRESS": { name: "DAILY EXPRESS", title: "Date: 07 Mar 2018 Rating: 0.500" } ,
 "CDR AN0NWELL": { name: "CDR AN0NWELL", title: "Date: 07 Mar 2018 Rating: 0.093" } ,
 "MPT": { name: "MPT", title: "Date: 07 Mar 2018 Rating: 0.125" } ,
 "NURJAHANASHA": { name: "NURJAHANASHA", title: "Date: 07 Mar 2018 Rating: 0.500" } ,
 "ONE AMIGO": { name: "ONE AMIGO", title: "Date: 07 Mar 2018 Rating: -0.910" } ,
 "M9 TRADE LEND BTC": { name: "M9 TRADE LEND BTC", title: "Date: 07 Mar 2018 Rating: -0.025" } ,
 "NEWS BY MURALI KUMAR": { name: "NEWS BY MURALI KUMAR", title: "Date: 07 Mar 2018 Rating: -0.100" } ,
 "JAMES MARTINELLI": { name: "JAMES MARTINELLI", title: "Date: 07 Mar 2018 Rating: -0.078" } ,
 "NEWS JOX": { name: "NEWS JOX", title: "Date: 07 Mar 2018 Rating: 0.500" } ,
 "DON MASHAK": { name: "DON MASHAK", title: "Date: 07 Mar 2018 Rating: 0.600" } ,
 "ALT KATIE HOPKINS": { name: "ALT KATIE HOPKINS", title: "Date: 06 Mar 2018 Rating: -0.100" } ,
 "ALT KATIE HOPKINS": { name: "ALT KATIE HOPKINS", title: "Date: 06 Mar 2018 Rating: 0.136" } ,
 "OLIVER BEIGE": { name: "OLIVER BEIGE", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "JEREL SHAW": { name: "JEREL SHAW", title: "Date: 06 Mar 2018 Rating: 0.150" } ,
 "ROB POTTER": { name: "ROB POTTER", title: "Date: 06 Mar 2018 Rating: 0.100" } ,
 "FOXX": { name: "FOXX", title: "Date: 06 Mar 2018 Rating: 0.032" } ,
 "LARRY CHIANG": { name: "LARRY CHIANG", title: "Date: 06 Mar 2018 Rating: 0.100" } ,
 "D MATHESON": { name: "D MATHESON", title: "Date: 06 Mar 2018 Rating: 0.438" } ,
 "GUY VERMINTWAT MEP": { name: "GUY VERMINTWAT MEP", title: "Date: 06 Mar 2018 Rating: -0.400" } ,
 "JERRY TAYLOR #FBPE #LIBDEM #LONDEPENDENCE": { name: "JERRY TAYLOR #FBPE #LIBDEM #LONDEPENDENCE", title: "Date: 06 Mar 2018 Rating: -0.200" } ,
 "VICTOR PUNCH NAZIS LICATA": { name: "VICTOR PUNCH NAZIS LICATA", title: "Date: 06 Mar 2018 Rating: 0.230" } ,
 "KUBIAKFINANCIAL": { name: "KUBIAKFINANCIAL", title: "Date: 06 Mar 2018 Rating: 0.100" } ,
 "MELISSA R POE": { name: "MELISSA R POE", title: "Date: 06 Mar 2018 Rating: 0.200" } ,
 "BRIAN KATULIS": { name: "BRIAN KATULIS", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "WHISTLE BLOGS": { name: "WHISTLE BLOGS", title: "Date: 06 Mar 2018 Rating: 0.200" } ,
 "DIAMONDPRIVATEWEALTH": { name: "DIAMONDPRIVATEWEALTH", title: "Date: 06 Mar 2018 Rating: 0.100" } ,
 "KAI HOWIE": { name: "KAI HOWIE", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "POSITIVE MONEY": { name: "POSITIVE MONEY", title: "Date: 06 Mar 2018 Rating: 0.391" } ,
 "LIBSTURNTAIL&BLOCKME": { name: "LIBSTURNTAIL&BLOCKME", title: "Date: 06 Mar 2018 Rating: 0.361" } ,
 "SAM": { name: "SAM", title: "Date: 06 Mar 2018 Rating: 0.233" } ,
 "DAVID REIGLE": { name: "DAVID REIGLE", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "ANGELIQUE": { name: "ANGELIQUE", title: "Date: 06 Mar 2018 Rating: 0.049" } ,
 "THEDOBRICKLITTLEGRP": { name: "THEDOBRICKLITTLEGRP", title: "Date: 06 Mar 2018 Rating: 0.100" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "INDIANAPLUS": { name: "INDIANAPLUS", title: "Date: 06 Mar 2018 Rating: 0.400" } ,
 "L HONDERS": { name: "L HONDERS", title: "Date: 06 Mar 2018 Rating: 0.050" } ,
 "BOB KLEINSCHMIDT": { name: "BOB KLEINSCHMIDT", title: "Date: 06 Mar 2018 Rating: -0.122" } ,
 "ARTHOUSE EL POFIT": { name: "ARTHOUSE EL POFIT", title: "Date: 06 Mar 2018 Rating: -0.167" } ,
 "": { name: "", title: "Date: 06 Mar 2018 Rating: 0.059" } ,
 "ENEWSRADAR": { name: "ENEWSRADAR", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "WWW.RIGHTNOWNEWS.US": { name: "WWW.RIGHTNOWNEWS.US", title: "Date: 06 Mar 2018 Rating: 0.307" } ,
 "MICHAEL": { name: "MICHAEL", title: "Date: 06 Mar 2018 Rating: -0.375" } ,
 "QUANTAMIZE": { name: "QUANTAMIZE", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "MELBAL BUSINESS NEWS": { name: "MELBAL BUSINESS NEWS", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "BALMEL DIRECTORY": { name: "BALMEL DIRECTORY", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "EXPRESS BUSINESS NEW": { name: "EXPRESS BUSINESS NEW", title: "Date: 06 Mar 2018 Rating: 0.167" } ,
 "AUTO BLOG GLOBAL": { name: "AUTO BLOG GLOBAL", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "MORE BUSINESS NEWS": { name: "MORE BUSINESS NEWS", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "SOYNADIE": { name: "SOYNADIE", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "SOYNADIE PRESS": { name: "SOYNADIE PRESS", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "SOYNADIE": { name: "SOYNADIE", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "SOYNADIE ORG": { name: "SOYNADIE ORG", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "PERIODISTA URBANO": { name: "PERIODISTA URBANO", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "PATRICK CHOVANEC": { name: "PATRICK CHOVANEC", title: "Date: 06 Mar 2018 Rating: -0.150" } ,
 "NEWSGW": { name: "NEWSGW", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "DAILY EXPRESS": { name: "DAILY EXPRESS", title: "Date: 06 Mar 2018 Rating: 0.500" } ,
 "JOHN BELL": { name: "JOHN BELL", title: "Date: 06 Mar 2018 Rating: 0.200" } ,
 "I AM SOVEREIGN": { name: "I AM SOVEREIGN", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "MILLENNIAL FOR TRUMP": { name: "MILLENNIAL FOR TRUMP", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "SANTOS TAMANG (BLON)": { name: "SANTOS TAMANG (BLON)", title: "Date: 06 Mar 2018 Rating: -0.141" } ,
 "L HONDERS": { name: "L HONDERS", title: "Date: 06 Mar 2018 Rating: -0.137" } ,
 "VALUE RESEARCH": { name: "VALUE RESEARCH", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "BEVAN BOY": { name: "BEVAN BOY", title: "Date: 06 Mar 2018 Rating: 0.550" } ,
 "POLITICSCANBECUTE": { name: "POLITICSCANBECUTE", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "DR PENNIES": { name: "DR PENNIES", title: "Date: 06 Mar 2018 Rating: 0.165" } ,
 "POLITICSCANBECUTE": { name: "POLITICSCANBECUTE", title: "Date: 06 Mar 2018 Rating: -0.212" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "NIGEL CURRIE": { name: "NIGEL CURRIE", title: "Date: 06 Mar 2018 Rating: 0.350" } ,
 "RASIKA THAPA": { name: "RASIKA THAPA", title: "Date: 06 Mar 2018 Rating: 0.000" } ,
 "EMILIO PANTOJAS": { name: "EMILIO PANTOJAS", title: "Date: 05 Mar 2018 Rating: -0.200" } ,
 "THE WEB OF EVIL": { name: "THE WEB OF EVIL", title: "Date: 05 Mar 2018 Rating: 0.017" } ,
 "NEP-ACC": { name: "NEP-ACC", title: "Date: 05 Mar 2018 Rating: 0.000" } ,
 "PAUL ROOK": { name: "PAUL ROOK", title: "Date: 05 Mar 2018 Rating: 0.000" } ,
 "KRIS": { name: "KRIS", title: "Date: 05 Mar 2018 Rating: -0.062" } ,
 "KRIS": { name: "KRIS", title: "Date: 05 Mar 2018 Rating: -0.062" } ,
 "TEAMNICK #FBPE": { name: "TEAMNICK #FBPE", title: "Date: 05 Mar 2018 Rating: 0.000" } ,
 "EXPONENTIAL INVESTOR": { name: "EXPONENTIAL INVESTOR", title: "Date: 05 Mar 2018 Rating: -0.247" } ,
 "CAPITAL CONFLICT": { name: "CAPITAL CONFLICT", title: "Date: 05 Mar 2018 Rating: -0.247" } ,
 "KENNETH WHITE JR": { name: "KENNETH WHITE JR", title: "Date: 05 Mar 2018 Rating: 0.100" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 05 Mar 2018 Rating: 0.000" } ,
 "FRED MCELWAINE": { name: "FRED MCELWAINE", title: "Date: 05 Mar 2018 Rating: 0.600" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "Date: 05 Mar 2018 Rating: 0.219" } ,
 "RANDOM NOISE": { name: "RANDOM NOISE", title: "Date: 05 Mar 2018 Rating: 0.150" } ,
 "TRUTH IN ACCOUNTING": { name: "TRUTH IN ACCOUNTING", title: "Date: 05 Mar 2018 Rating: 0.800" } ,
 "": { name: "", title: "Date: 05 Mar 2018 Rating: 0.353" } ,
 "PEDRO DA COSTA": { name: "PEDRO DA COSTA", title: "Date: 05 Mar 2018 Rating: 0.000" } ,
 "ELSCOTTO": { name: "ELSCOTTO", title: "Date: 05 Mar 2018 Rating: -0.038" } ,
 "TONY WESTON #MMT": { name: "TONY WESTON #MMT", title: "Date: 05 Mar 2018 Rating: -0.244" } ,
 "DEPLORABLE SMALL PEOPLE   STABLEGENIUS": { name: "DEPLORABLE SMALL PEOPLE   STABLEGENIUS", title: "Date: 05 Mar 2018 Rating: 0.286" } ,
 "CIGMAN FREUD CERTIFIES TRUMP AS STABLE": { name: "CIGMAN FREUD CERTIFIES TRUMP AS STABLE", title: "Date: 05 Mar 2018 Rating: 0.000" } ,
 "PAUL SHEARD": { name: "PAUL SHEARD", title: "Date: 05 Mar 2018 Rating: 0.000" } ,
 "KRIS": { name: "KRIS", title: "Date: 05 Mar 2018 Rating: -0.245" } 

    , "MALCOLM TURNBULL":
    { name: "Malcolm Turnbull"
    , title: "Prime Minister of Australia (Liberal)"
    }

  }
, topics:
  [
       { name: "money", re: /\b(money)\b/gi, x: 668, y: 412 },
       { name: "central", re: /\b(central)\b/gi, x: 879, y: 745 },
       { name: "end", re: /\b(end)\b/gi, x: 27, y: 730 },
       { name: "debt", re: /\b(debt)\b/gi, x: 549, y: 383 },
       { name: "market", re: /\b(market)\b/gi, x: 749, y: 197 },
       { name: "QE", re: /\b(qe)\b/gi, x: 531, y: 252 },
       { name: "economy", re: /\b(economy)\b/gi, x: 552, y: 193 },
       { name: "interest", re: /\b(interest)\b/gi, x: 330, y: 98 },
       { name: "bank", re: /\b(bank)\b/gi, x: 80, y: 816 },
       { name: "inflation", re: /\b(inflation)\b/gi, x: 869, y: 775 },
       { name: "Obama", re: /\b(obama)\b/gi, x: 875, y: 267 },
       { name: "meets", re: /\b(meets)\b/gi, x: 776, y: 377 },
       { name: "ECB", re: /\b(ecb)\b/gi, x: 445, y: 78 },
       { name: "confident", re: /\b(confident)\b/gi, x: 813, y: 93 },
       { name: "SOAR", re: /\b(soar)\b/gi, x: 650, y: 454 },
       { name: "Euro", re: /\b(euro)\b/gi, x: 378, y: 503 },
       { name: "economic", re: /\b(economic)\b/gi, x: 620, y: 410 },
       { name: "year", re: /\b(year)\b/gi, x: 705, y: 170 },
       { name: "US", re: /\b(us)\b/gi, x: 219, y: 268 },
       { name: "NEW", re: /\b(new)\b/gi, x: 222, y: 668 },
       { name: "asset", re: /\b(asset)\b/gi, x: 345, y: 227 },
       { name: "bond", re: /\b(bond)\b/gi, x: 95, y: 716 },
       { name: "global", re: /\b(global)\b/gi, x: 803, y: 251 },
       { name: "UK", re: /\b(uk)\b/gi, x: 421, y: 315 },
       { name: "now", re: /\b(now)\b/gi, x: 281, y: 40 },
       { name: "people", re: /\b(people)\b/gi, x: 518, y: 699 },
       { name: "trillion", re: /\b(trillion)\b/gi, x: 482, y: 498 }
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
