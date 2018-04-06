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
, "WALLACE NOLL:  Stockman the chinese are the masters at using quantitative easing to focus industry's efforts to dominate whatever sector they choose to dominate The American system of financing new endeavors is failing;\n"
, "POSITIVE MONEY EUROPE: Greening quantitative easing isn't a new thing Back in 2015 it was already being proposed by the French government's think tank  Gouv https://t.co/tZ7OAICesE\n"
, "RASHEED MUHAMMAD: (Video Sub-Prime Mortgages and Quantitative Easing IS The New Normal https://t.co/qhB90dQXBx https://t.co/JPWOeoANGQ\n"
, "LARRY CHIANG: Nice chart What does it look like if you use Wu Xia for the nominal funds rate instead to account for QE (Quantitative Easing) [HT #QE7 https://t.co/2jjiX5Sexr\n"
, "BENZTRADER: Sub-Prime Mortgages and Quantitative Easing IS The New Normal Economic.. https://t.co/2bCNEa5e9i via\n"
, "DEVRA #REUNION: The new economics shows this to be the case One version was the quantitative easing which put 'money into financial institutions Should have actually printed the stuff and sent a good lot to every individual in the UK This would have helped the poor and revived the economy https://t.co/P6CL42Kjoz\n"
, "MARGINALREVOLUTIONU: NEW video How the Fed Works After the Great Recession https://t.co/BFpQtXtu5c explores how and why the Fed changed tactics when the 2008 financial crisis hit #econ #Macro #FederalReserve https://t.co/wfHD4y9xU8\n"
, "EKEM BRANCH: Bank of England has established that the costs to date of #EURef outcome are £700m a week in lost economic output (GDP) despite a virtual doubling of emergency measures (Quantitative Easing to stabilise financial markets after The Great Recession #TheGreatBrexitDelusion https://t.co/jQGcWkGcq3\n"
, "JACK DUNN: The stock market has been disconnected from reality for years due to Quantitative Easing.  regan More jobs full-time jobs means a better economy ADP showed MTM increases in every Sector seasonally adjusted More jobs more real estate sales more retail\n"
, "TUOMAS MALINEN: #QuantitativeTightening 'Experts warn that the global money supply is slowing much faster than widely appreciated suggesting that the shift away from quantitative easing by the major central banks is already starting to have profound consequences.' https://t.co/OUsJRImo7c\n"
, "THE JUDD SCHOOL ECONOMICS POLITICS DEPARTMENT: Remember QE isn’t printing more money Excellent video here for Yr13 Economists Quantitative Easing (Evaluating QE in the UK Economy https://t.co/WpDPGOyP4b via #aqaeconomics #revision\n"
, "SACHIN GARG: I wld say quantitative easing 3.0 print more money...stimulus to economy and devalue dollar...that's universal tarrif A better fit for tat.\n"
, "JESSE GREEN: There was no recovery lol It was just reinflating a bubble due to constant FED quantitative easing and 0 interest rates Looks like you also know nothing Bush made the housing bubble Obama made the everything bubble He just got lucky to exit before it pops.\n"
, "KK: Economic Policy followed after World War 2 by US is coming back to haunt them Also Quantitative Easing.\n"
, "IG:HKVIBEZ: You forgot to add 'printed more money via quantitative easing https://t.co/hkPxBNtxj2\n"
, "RICHARD MONAGHAN: The entire problem here is the theory that an increase in the deficit spending will be inflationary Yet after nearly 10 years of Quantitative Easing this entire theory has been proven to be just nonsense.\n"
, "BEN RICKERT: If the supply growth matters that much why hasn't there been massive dollar inflation after the huge supply increase via quantitative easing?\n"
, "G RAN OLSSON: “Yet after nearly 10 years of Quantitative Easing this entire theory has been proven to be just nonsense There are so many loaded assumptions hidden at its core that one must wonder how rational people still believe in a theory that cannot be proven by history. https://t.co/ZRIZmMHRTF\n"
, "BLOOMBERG ECONOMICS: Good economic news is no longer unspeakable in Japan The central bank has been too obsessed with reassuring investors that stimulus would continue https://t.co/FwdPxQaWxf via https://t.co/gpZu1GYn6S\n"
, "COLFESECONOMICS: #AQAEcon perfect for macro. Quantitative Easing (Evaluating QE in the UK Economy https://t.co/4sLvXdu3tT via\n"
, "TEDHU: Good News Is No Longer Unspeakable in Japan https://t.co/NdkvnJSLvI\n"
, "DAVID MARTIN: Good economic news is no longer unspeakable in Japan reports  Eco https://t.co/QWdiYx543j via\n"
, "YUKO TAKEO: Good economic news is no longer unspeakable in Japan reports  Eco https://t.co/3vmjWqsUvW via\n"
, "WANALYTICS:  Rock That’s because your thinking has been trained by 10 years of quantitative easing This is a different environment now.. healthy markets that aren’t supported by 0 money don’t just set all time highs every month.\n"
, "CHRIS KLINEPETER:  Fetish Because they just printed magical money with quantitative easing Held very low interest rates There will be many problems because of this Adding to the deficit with no intention to correct it\n"
, "BLOOMBERG VIEW: Good economic news is no longer unspeakable in Japan reports  Eco https://t.co/8yEWWPKZIh https://t.co/uMd9AFfLFX\n"
, "COYOTES BAR:  j thank you you have just confirmed that you are so dumb its unbelievable have you never heard of a central bank or quantitative easing how about knowing the tories have borrowed more money than EVERY gvmnt ever!! in just 8 years!! politics and finance isn't for you\n"
, "BLOOMBERG: Good economic news is no longer unspeakable in Japan reports  Eco https://t.co/kFFFRuyzQJ via https://t.co/hrT9ThT1RR\n"
, "IRC NOT ROOTBEER: Their stock price is seriously grossly over inflated anyway just like Flakebook Twitter and many others. over inflated with tax payer quantitative easing money funneled into the stock market to pump it up under Obamas admin.\n"
, "KEITH BURGE: The predictions assumed Article 50 would be triggered immediately and did not factor in the huge quantitative easing undertaken But in time the predictions will come to pass should Brexit proceed.\n"
, "JAMES MACEACHERN:  3502  payne  Anderson  scott  watson You support a United Kingdom that defends its status as a sovereign independent country at any cost including bailouts big deficits debt of 259 of GDP high inflation high interest rates £435bn of quantitative easing high unemployment oil crises and human lives etc.\n"
, "LUKE BRADLEY:  Dot J 'Quantitative Easing not as clumsy or as random as a stimulus bill a more elegant weapon for a more civilized age.'\n"
, "PMG_BARNHAM: More than a simple comparison of the current scheme cash flow i.e taking future projected income and expenditure and discounting back to present time whilst recognising that Quantitative easing whilst inflating current assets values has reduced future investments returns\n"
, "CROUTON: Austerity is a lie Most developed countries are owed as much as they owe If they chose to pay off each other’s debts they would have a balanced budget Just like all the banks did in ‘08 (except they got quantitative easing and increased their monopolies before doing that)\n"
, "ED CONWAY: Quantitative easing represented a £350,000-plus boost for Britain's wealthiest 10% according to the 's own analysis And the oldest benefited most of all https://t.co/prKOxDiDPg https://t.co/aFJLx6vA8q\n"
, "TONY CLEWES #FBPE:  Flaneur16  may How much money has the Bank of England and the US Fed spent on Quantitative Easing Look at UK Balance of Payments for a basket case economy caused by UK government ignoring manufacturing.\n"
, "MRA MARKETING: Monetarists say shift from quantitative easing is causing money supply slowdown and risks economic global showdown later this year  mag https://t.co/x5XnD41yKj\n"
, "ANDREA: Remarkable that the PMIs are so low considering the amount of #quantitative #easing that the has put in the #system.#Risk #riskmanagement #news #NewsDay\n"
, "DEEPAK SINGH: How much world has changed since Nov 2015? Interest rates in the US back then was near zero percent. Now it is near 1.75% Quantitative Easing now is in History books\n"
, "TUTOR2U ECONOMICS: NEW REVISION VIDEO for A LEVEL &amp IB ECONOMICS Quantitative Easing (Monetary Policy Update 2018) This is an essential new revision video for all Year 13 Economics students as they prepare for the summer exams Superb update on use of Quantitative Easing https://t.co/IW8lGu4bTs\n"
, "MARKET PRICE INDEX: #Uganda is not alone Many African countries loaded up on cheap credit during the quantitative-easing era and now face elevated interest costs as developed-market rates creep up #ConsultMPI\n"
, "JAMES CRAWFORD: More mortgages &amp high suv sales to minorities driving sales driving debt being covered by quantitative easing???\n"
, "JEFF SANDERS: The stock markets rise is easily attributable to federal reserve quantitative easing that was performed to stop the 2008 crisis from becoming the 2008 depression Alas those actions merely kicked the can and I am pretty sure the trump depression will be starting soon.\n"
, "HAKON KHAJAVEI: Begs the question why did President Obama specifically win because of the recession Didn’t all of the candidates run during the recession Also fun fact the president doesn’t have control of the money supply (quantitative easing) Thats the federal reserve.\n"
, "STACEY JOHNSON:  beat3r 1 Trump supporters are the ONLY wants to initiate Obama discussion thus far. 2 No it’s not a coincidence that rates were not hiked during Obama’s time We were in a period of quantitative easing for reasons that make sense now inflation is concern Use your head.\n"
, "PREPARE MATHEW 25: Love ya ted kusinsky but obama stole 50 Percent then put back 37 Percent leaving a loss of 13 percent and SUPERMAN DONALD JOHN TRUMP AND QUANTITATIVE EASING AND Magic Has HAD ALL GAINS WAIT 5 MINUTES ITS GOING TO CRASH BIG WITH YUAN PETRO DOLLAR PRESIDENT U THE KING https://t.co/t9z9X8gxfz\n"
, "MYTRADEPH-ABACUS SEC: Today's Short Takes In Focus Quantitative Easing $FLI $SMPH $RLC $ALI $MEG $VLL $BEL $RLT $SLI $GERI Read the full report at https://t.co/r7o32ppvVy #ShortTakes #SwitchToMyTrade\n"
, "GREG POWELL: It was the Federal Reserve massive quantitative easing 1,2 &amp 3 that brought us out of the Great Recession Obama policies were anti-business and anti-growth.\n"
, "KAZ LOKUCIEWSKI: I'm an objective remainer There can be no over all 'forecast I would bank on so many variables including influx outflow of illicit funds though London unrestricted by EU anti tax avoidance directive increasing pension age and quantitative easing https://t.co/faMRjREh2Z\n"
, "ROONOMICS: If a question comes up in June to the effect 'Explain how QE works or 'Has QE been an effective policy' this article from Tutor2U is brilliant https://t.co/cpb94yb1uF\n"
, "BETHLEHEM: I know bitcoin &amp cryptocurrency aren't synonymous however there is 21 million bitcoin total in circulation This was Nakamoto's solution to the derivative/quantitative easing BS that actually did more damage to the global economy than helped it.\n"
, "KRIS: Decreasing demand for food?! Who believes this stuff? I have explained this 1 million times COST of doing business is sky high due to Quantitative easing which shot up the commodity prices Hence farmers are making no money https://t.co/E1aapsrVT6\n"
, "PAUL TOWER: Thanks Trump Worst opening since the Great Depression FYI it's only gonna get worse from here now that quantitative easing has tightened Will be good for #Bitcoin #Crypto #cryptocurrency #tyt https://t.co/UQYvsm5ktR\n"
, "JOSEPH JONES: Quantitative Easing Troubled Asset Relief Program Too Big to Fail. … Short Term Incentive for Rental (STIR) Established 2009 After rebrand to Rental 100 bringing ever more impressive levels of unaffordability\n"
, "TEEMU SINTONEN: In this upside-down world borrowers get paid and savers penalized Central bank unconventional monetary policy tools such as negative interest rates #NIRP and quantitative easing #QE punish banks that have a sound financial position with cash instead of further extending loans https://t.co/Gt0XA7PIqV\n"
, "DPLORABLEBSTRD: You really need to learn economics He did nothing for the economic crisis even while President After the crash of '08 the Fed simply instituted Quantitative Easing It was an open ended blank check to the bankers payed for by the little guy And he as a senator supported it\n"
, "ANDREAS CSEH: It doesn’t take a genius to notice that something is up with the #markets The great economic crash of 2008 barely shows up against the enormity of both the Dot Com boom and the “Quantitative Easing boom of the past five or six years 🎈��� https://t.co/gXKRldJHQ1 https://t.co/ZvVCE9YHoR\n"
, "AGENT CRYPTIC PSYPHER: Pay all UK 25-year-olds a £10000 inheritance says thinktank https://t.co/ZR6BlRCgUj As effective as quantitative easing with same result\n"
, "ALFRED GILLHAM: Just joking but may need them Had problems with a £20 Scottish note in Brighton Wouldn't accept So much for quantitative easing!\n"
, "1911A1CUSTOM: Nah Just get the Fed to print more Recycle reuse renew It’s called quantitative easing.\n"
, "JEFF WHITE: yes. This 'miraculous Quantitative Easing... So.. if 'money becomes available at near zero cost.. might not the wealthiest in the world use it to buy up every greenbelt every mine (Rio Tinton anyone) every seaport &amp shipping company? Right.. under.. our.. noses\n"
, "VINAY RAO: March is usually bearish sentiment (not sure why) The risk is that global economic outlook improves and fiats are not debased by quantitative easing So crypto coins stop seeming worthwhile but blockchain and fiat linked tokens abound.\n"
, "JULIAN COX: Fact: Under Obama not only was tax given to the Federal Reserve to write another $10 Trillion of debt (mostly bonds to add insult to injury tax was paid directly to Wall Street to bid up the bond market!!!!!!! Look up Quantitative Easing The above is a perfect description.\n"
, "GERALD NASH: That’s what I was thinking Like today’s quantitative easing methods actually seem to be working just fine imo\n"
, "TERRY VICTORY: You honestly have no idea about the dynamics of Quantitative Easing if you compare these charts.\n"
, "ONEDADSFINANCE: Umm.. quantitative easing isn’t fiscal ‘spending but thanks for coming out.\n"
, "CHASFAX: Slowest growth of any developed country we'd be in recession now without quantitative easing manufacturers planning to shed tens of thousands of jobs financial companies choosing between Frankfurt and Paris and we won't be leaving for nearly three years No drama eh?\n"
, "MARK JEFFERSON: Then the federal reserve decided quantitative easing would help keep the country from default so they started “printing money as fast as they could expanding the supply and lowering interest rates to help keep the economy artificially afloat.\n"
, "DANIEL MCBRIDE: Quantitative easing ‘reduced UK wealth inequality’ says BoE driven mainly buy QE inflating house prices. Younger people have been priced out the housing market and so in future we'll see wealth inequality sky-rocket. https://t.co/Mblq4CvHLh via #inequality #housing\n"
, "MATT PALASKY: Quantitative easing the subject of this article is not giving free money away It is the government injecting money into the economy by purchasing investments.\n"
, "HOWARD ARCHER: Likely to be a controversial view #Quantitative #easing ‘reduced #UK #wealth inequality’ says #BoE https://t.co/Hn42YzRGt0 via\n"
, "MARTIN GOODSON: 'Quantitative easing ‘reduced UK wealth inequality’ says BoE says FT in most gullible headline ever How about all the people with zero wealth They seem to be completely missing from the first graph https://t.co/I5u9cjy7EX via\n"
, "THAT SCOTTISH GUY: There will be more quantitative easing if banks not lending to each other,your dollar/pound worth less,inflation will rise\n"
, "DANIEL WALTER: Getting the conclusion that fits nicely but looks fake Quantitative easing ‘reduced UK wealth inequality’ says BoE https://t.co/9Ca5xuUJCV via\n"
, "RANJAN BALAKUMARAN: Quantitative easing ‘reduced UK wealth inequality’ says BoE via Nearly fell for this https://t.co/rnBnMOyYOn\n"
, "ANDREW MCNALLY: How can raising the price of a necessity reduce inequality It crowds out the scope to own productive assets #housepriceillusion Quantitative easing ‘reduced UK wealth inequality’ says BoE via https://t.co/UO8QElGcPS\n"
, "ENOCH POWELL:  kudlow The Fed printed $4 trillion out of thin air and pumped it into the markets under quantitative easing during the Obama years and our GDP growth never cracked 2 in 8 years Bank were basically given free money to loan and the economy never managed more than a shrug.\n"
, "WYNOTME307:  sable  always  Jammin  Y 6  pleiades  nod  USA That is fine We have been short of money for years. What do you not understand about 'quantitative Easing? Our US Currency is setting over in Europe If they buy Euros we get our money back Huge win for USA.\n"
, "IAN HOPKINS: While may and her cronies throw quantitative easing at banks and the city of london imagine flipping that upside down and easing youth pain to create economic movement The current approach as Walton with child poverty rate at over 40%.\n"
, "JASON: TARP was just the first round Shit at least the banks had to pay back that money The quantitative easing was nothing more than trillions in printed cash.\n"
, "JASON: Amazing how you found the strength to give major banks trillions in quantitative easing It takes real courage to support “what is possible!”\n"
, "JASON: Weird we never talk about things being too expensive when it comes to funding 800 overseas military installations Only some We did 17 trillion in quantitative easing that’s a cute term for free money Those banks are larger and more profitable than they’ve ever been.\n"
, "JASON: Only cost millions of pensions and homes lost tens of thousands of suicides But billionaires who received quantitative easing (free money and 0 loans paid it back What a hero!!!\n"
, "ELYK SNOMMIS: “Trickle down is a made up term by leftist to denigrate “supply side economics It’s been shown throughout history that lowering taxes on investors and producers creates wealth Not artificial wealth like Obama’s Quantitative Easing garbage Real wealth that people invest.\n"
, "PATRICK GERARD: There’s only a correction if the markets are rational Quantitative Easing made a good case that they aren’t Stock buybacks arguably make a case they aren’t And yeah Russia They’re betting on global collapse on multiple fronts because it’s their only hope of survival...\n"
, "THE PROPHET: The real estate market in BC and ON got ahead of themselves but in the long term there may actually be some truth to the statement “if you don’t buy your kids a house they won’t be able to afford one. Family wealth becomes very important in a world of quantitative easing.\n"
, "ZORAIDA S NCHEZ: Abenomics Looks a Lot Like Reaganomics 'Abe’s reforms like Reagan’s are best described as neoliberal Kuroda enacted a dramatic program of quantitative easing that finally ended the country’s long spell of deflation' https://t.co/CSuPSWwbO1 https://t.co/Ld6ieCrykJ\n"
, "CATHY BAILEY: Now the Nobel Prize Committee regretted giving Obama that award for doing nothing As far as Stock Market why not do some research on quantitative easing as the Feds pumping into the markets.\n"
, "PAUL GAMBLES:  InTheWilds  v20  UK  Lloyd But if we have to revisit QE NIRP&amp;ZIRP again (&amp I agree w that we ain't seen 0 yet then here's a golden oldie from back in 2014 (in the presentation version of this I quoted Blackadder 'total blocks but for the CNBC article I toned it down https://t.co/6F4LOM3JrT\n"
, "BILL MILLER:  witkowski No it's not Jedi you are not Look at the type of jobs created by 44.. They were not sustainable The market went up due to quantitative easing.. cheap money.. 10s of millions gave up and left the job market making the artificially low Go.past the headlines dig padiwan\n"
, "BRIAN J HURLEY:  Ken  weed Obama manipulated the Bond market to keep interest rates down to look good and cost America trillions “quantitative easing look into it then try to blame trump\n"
, "BILL MILLER:  ellis90  heider No that was quantitative easing.. cheap $ and 0 interest. No thanks 44\n"
, "KITTYSCALP: Stage 3 Public forced to sell off their bags before 15th of April to pay 2017 gains Smart money finish to distribute stocks at the highs to dumb money Central banks Quantitative Easing bubble burst stock market crash Stage 4 for cryptos and precious metals\n"
, "THE ROMBACH REPORT: Jeff Have the Federal Reserve pay for the wall out of $100 billion income it earns from its $4 trillion portfolio of govt debt purchased via the Fed's QUANTITATIVE EASING program during the Great Recession If not the Fed will only remit that income back to US Treasury.\n"
, "JOSEPH LEEMAN: I'm sure Trump will get blamed.. you know not the end of Quantitative Easing or cheap money https://t.co/03mquzKsKF\n"
, "TIMOTHY WILLIS: Good to see quantitative easing letting up in the face of higher interest rates Oh wait.. Perhaps can help me understand U.S Fed buys $2.9 bln of mortgage bonds sells none https://t.co/HV7TumqteT\n"
, "ABHISHEK RAJURKAR: Quantitative easing has pernicious effects that favour the wealthy John Butler https://t.co/mf2hAq05Xf\n"
, "SIMON MAYHEW-ARCHER: Why is mid-morning TV dedicated to “exposing low-level insurance scammers and benefit cheats Where are the daytime programmes about the Panama papers property-owning money-launderers &amp the efficacy of quantitative easing Which causes more damage to the “common person” 🤔\n"
, "VERNER VERASS: Shifting decimal point 2create $$: …central banks create money by buying securities such as government bonds from banks,-w-electronic cash that didn't exist before New money swells size-o-bank reserves in economy by the quantity-o-assets purchased—hence 'quantitative easing https://t.co/cUSYEi5iMK\n"
, "ROSIE RICHENS #FBPE #WATON #ABTV: If money isn’t devalued when you put more into circulation why has the pound been devalued Mark Carney pumped £300Bn of quantitative easing into the FTSE when the pound crashed The pound ended up being devalued against other currencies That was nothing to do with productivity.\n"
, "WALTON MCGUINTY: picture Quantitative Easing 4 coming to a market near you.\n"
, "ANDREW WAUGH: You couldn't vote for Juncker or his pals and the EU budget and the subsidies and who the EU grants accession to or quantitative easing or pretty much everything else Just like the rest of us actually.\n"
, "MAREKANI ?: Hotep capitalism 101 'arbeit macht frei or a whole lot of quantitative easing redlining Jim Crow &amp crony capitalism (guess it depends on what side of the Atlantic you reside https://t.co/R0BY3NgPI4\n"
, "DR SIMON LEE: Melrose was ready for action takeover target GKN wasn't Like the rescue of the banks and quantitative easing this is the triumph of short-termism and rentier interests over long-term wealth creation Welcome to 'Global Britain'. https://t.co/uR2cUeEagt #AltAusterity\n"
, "PHIL WEBBER: Spending more on NHS would save the UK money by enabling more people to work longer and pay more tax Govt spent £475bn on Quantitative easing and no-one even blinked Tax is there to keep inflation under control Spend on NHS a v.g investment.\n"
, "HAKON REDDER: ECBs Knot “Top priority is to normalize monetary policy and strengthen EMU men også Acknowledged the need to move slowly ECB’s balance sheet could stay inflated for years .. reinvest the proceeds of debt holdings under quantitative easing as they mature Hvad er signalet ?\n"
, "ZVI: Natural (Uncontrolled/Non-elastic Scarcity Controlled/Elastic Money Supply Open Market Operations Quantitative Easing “MV=P…Que Love and Circularity in the Time of Crypto by Anshuman Mehta https://t.co/u4WVf9gGRa\n"
, "THE GAYTRIARCH FLEETING MOMENTS OF COGNIZANCE: Housing market collapses the president attempts Keynesian economic theory to 'jump start the economy through quantitative easing. This sudden surge of money in the economy siphons almost directly to the wealthy as they hold the majority of ownership.\n"
, "ALEXANDER CHENG: Investors confidence on US market is the strongest basing on Dow Jones over 4,000 points since January 2017 The US market sans quantitative easing is back by real GDP from manufacturing construction finance unemp rate..🇺🇸🙏🏻🤠🍷🏌️\n"
, "NAPOLEON: Which is not being responded to Under 40s can't afford houses, wages have been stagnant and quantitative easing has not benefited the masses Corbyn could well ride this to a win.\n"
, "LUKAS DUPASS: You can thank Obama's 'Quantitative Easing Wall Street subsidiza program during his admin.. $blns went to Obama Choice WS Stocks being fed by US Treasury.. approx $11bln in 8 yrs sound right https://t.co/8oNdvslpmN\n"
, "KIKO KOBAYASHI: Once nuclear power generation melts down or explodes, Just as we can not control, Now in the world of finance, Including controversial quantitative easing and loss of value of Fiat Currency separated from.. https://t.co/sbdQhwPtNd\n"
, "WILMA SCHROVER:  of Europe Hardly a nightmare with an ECB creating 80 billion per month out of nothing Quantitative easing is easy .. and quantitative.\n"
, "ALAN SKED: Latest economic indicators suggest that the economic revival in Europe may have peaked This will cause doubts about ending the ECB’s quantitative easing in October Meanwhile Italy’s economic situation remains unclear until a new government can be found Expect confusion.\n"
, "SHADYBOOTS: no doubt, quantitative easing Fed mandated low interest rates and deficit spending are the basis of our current economic stability. it wont last QE is ending,rates rising\n"
, "GUY KILTY: This is a great listen on the effects of a decade of Quantitative Easing https://t.co/qDNGflpS24\n"
, "JOE SHMOE:  IS TOXIC Gfc mate Read about it. Also take a look quantitative easing and tell me we aren’t headed towards a #creditBubble The neoliberal economic myth you staunchly defending is debunked.\n"
, "POSITIVE MONEY: Today 7pm Southampton Is Inflation a Danger with Quantitative Easing for People https://t.co/nsAIvICK4b All welcome #QEforPeople\n"
, "BANK OF ENGLAND RESEARCH: #bankunderground How have low interest rates and quantitative easing affected individual households in the UK Find out more here… https://t.co/MqAED41i3B https://t.co/zpFqebFoGq\n"
, "SCHOLAR OF NOTHING: More related to new tranche's of Quantitative Easing coming India's way https://t.co/O2Q1aOUg9x\n"
, "JUDAS THOMAS: Perhaps you have heard the words of Queen Rotschild Lucifandres is my hell Is she your savior? 'My gradnmother is no devil worshipper.' we want money to work for us not the other way around thanks for the quantitative easing it will fix the quantity before quantity problem.\n"
, "S T E V E: Which of my Business for Scotland ‘friends do you suggest I ask https://t.co/sEMcBwyLP7 Please advise Thanks.\n"
, "JIM H:  YVA All is changing under t leadership of Monetary devaluation set in motion by liberal policy of quantitative easing &amp manufacturing will return once t trade imbalances r corrected &amp playing fields bcome level again US is THE major consumer nation&amp;others need r mkts 2survive\n"
, "TONY: What history are you referencing exactly Pre or post unprecedented quantitative easing #QE1 #QE2 #QE3 #QE4?\n"
, "NAH    BABY    NAH: THE PRICE WE WILL PAY FOR QUANTITATIVE EASING Fed’s Bostic says sympathetic to adopting price-level targeting https://t.co/UmirlxCtPD\n"
, "FACTSNOPINIONS: The paper more or less shredded former Fed chief Ben Bernanke’s favorite defense of his quantitative easing (QE programs that QE lowered Treasury yields. Bernanke Beliefs Busted New Research Foretells QE Domination https://t.co/45aCGeIZ25\n"
, "STEPHEN IERARDO: Hahahahahahahahaha yeah the market increased under Obama because he took over after a recession which was more like a depression papered over with quantitative easing PAHHHLLLEEEESSE\n"
, "NATHANIEL    JGUTHRIE:  salupa5 LOL The comment of the ignorant right here folks Pitty Christopher here for he lacks any understanding of what he speaks. https://t.co/BU2viezrVb QE1 was set in place in November 2008 Your ignorance is just so sad.\n"
, "AGORACOM GEORGE: 1 'Toronto home buyers (AKA .. the market 2 When 'Quantitative Easing &amp 'Stimulus became policy 10 years ago the entire purpose was to .. wait for it .. stimulate investment You can't complain when it actually happens. 3 The market will correct or rise on its own\n"
, "ROBERT PEARSON: of course Any easing whether qualitative or quantitative is designed to counter deflationary forces and introduce inflation Why would you do it otherwise The key thing is that if easing is to be successful it must be readily and quickly reversible.\n"
, "POSITIVE MONEY: Tomorrow 6.30pm Southampton Is Inflation a Danger with Quantitative Easing for People https://t.co/nsAIvICK4b All welcome #QEforPeople\n"
, "LAUREN A JOHNSTON: in the presence of lumpy demography and voluntary voting policies of intergenerational easing as much as quantitative easing may instigate a structurally shift in the marginal ability to consume changing the marginal propensity to consume and thus lifting aggregate demand.\n"
, "ALEXANDER CHENG: The strongest US market is back by stronger economy with increased productions from manufacturing and other sectors including jobs take-home pay and investors confidence sans quantitative easing a real GDP strength.🇺🇸🤠🙏🏻🍷🏌️\n"
, "EDWARD HARRISON: 'Despite the continued decline in nominal interest rates under the ECB’s quantitative easing programme since January 2015 the real interest rate for Italians remains higher than 1% in contrast the real interest rate for Germans is –1%'\n"
, "VASILY NEKRASOV: Many 'experts' at least in Germany state nowadays currently the markets are driven by macroeconomic factors (FED and ECB policies quantitative easing etc thus the #stockpicking does not make sense We show that it still does. https://t.co/XiOwSx4l6t\n"
, "DPLORABLEBSTRD: Pls point to the Obam a policy that is responsible for the current boom Ya can't because he wasnt responsible during his presidency just as he's not responsible now During his presidency the Fed Res implemented Quantitative Easing Wanna talk about rich assholes Id start there\n"
, "TEODROSE FIKRE: 'Right to work is no different than 'collateral damage and 'Quantitative Easing' grifters and leeches deploy euphemisms to hide their pernicious intentions https://t.co/WsdsCwx1x9\n"
, "ROY TOPOL: South Africa's unique version of quantitative easing.. https://t.co/xLPP9Uruhn\n"
, "BIGERNMCCRAKEN: Be holier than thou art if you want-I watched my beloved country get ran in the ground for 8 years Markets propped up by quantitative easing no growth in the economy men using women’s bathrooms and now its shown our intel agencies were used against political opponents.\n"
, "PRICE ACTION: What a joker 😂 Yes let's vote for more Quantitative Easing more food banks higher rates of homelessness less fire fighters &amp police...\n"
, "THEPRODIGALCHAMPION: Paid for by the same people who fund TYT.😂😂��� I love how you have to stage your points I didn't like Obama because of the NDAA TARP State Back Terrorism in Syria Lybia and Ukraine Quantitative Easing 1,2,3 trying to pass TPP ACA .\n"
, "DAVID HAMU: Weak argument The strong economy probably has more to do with 2 factors: 1 Fed chair Yellen Quantitative Easing 2 Trump's Tax Reform\n"
, "PAIGE KRISTINSON: Essentially that is equivalent to printing money or as it's called these day quantitative easing The downside is that by devaluing the money in this way can lead to high inflation Back in the late 1970's inflation was high so everyone decided it was not such a good idea.\n"
, "EM TAYLOR #FBPE: And we would have been if Mark Carney hadn't pumped 40 years worth of EU money into the banks to prop them up the very next day But you've conveniently forgotten that Nothing like a bit of quantitative easing to right your idiocy eh?\n"
, "DIMITRIS T ANTONATOS: Praise for Obama everyone seems to be giving him is completely off Quantitative easing and the 4.5 trillion he gave to corporate America is the biggest scam anyone has ever given to the rich in this country 4.5 trillion Such a mistake to vote for him twice.\n"
, "BERNAS: I think the printer should issue some more USDT for that juicy quantitative easing on the crypto markets.. God damn is that not going to hurt when it bursts!\n"
, "BOOTIFULGREY:  politics The magic money tree was invoked in quantitative easing in the trillions but unfortunately it wasn't spent on nhs or anything else useful Without debt there is no economy It isn't like a household budget.\n"
, "EKEM BRANCH:  clegg Name countries with which the UK has a trade surplus #TheGreatBrexitDelusion “EU Membership costs more than benefits. UK has lost c£700m a week in GDP since #EURef Full #Leave storm yet to hit Quantitative Easing to counteract ‘08 crash was doubled in ‘16 to avert new crisis.\n"
, "WIZGICIANBRB: Quantitative easing does not create financial assets It does not go into the pockets of billionaires QE is monetary policy. Congress fiscal policy creates new financial assets and enriches billionaires through corporate subsidies tax breaks etc. Hudson yes.\n"
, "GUS KUEHNE: Down the road to destruction of the $US Dollar expect that the Fed will start a new program of quantitative easing soon.. they can't fight inflation by just raising interest rates because doing so would increase interest on the debt to crushing levels.\n"
, "POSITIVE MONEY: Good points by 'The problem with quantitative easing is that all the extra wealth went to people with the lowest propensity to spend it. Future QE should be designed to direct money into the real economy https://t.co/XvO6jYJusk\n"
, "PAUL ROMANO: What factors may have affected recent volatility Take a closer look at how rising interest rates and inflation plus the Fed’s move to end quantitative easing may have affected investor behavior according to Ameriprise economic experts https://t.co/uEhEDaTabp\n"
, "JOY DOREEN BIIRA: “Uganda is not alone Many African countries loaded up on cheap credit during the quantitative-easing era and now face elevated interest costs as developed-market rates creep up. .. https://t.co/Z1n4nIxEBC\n"
, "JANET STEAD:  za Yes if only they concentrated on good free education and health paid for by honest to goodness taxpayers and a bit of quantitative easing Taking away the land will cause chaos and disinvestment When Roger Federer builds his first SA school it will be a day to celebrate unity.\n"
, "SCHOLAR OF NOTHING:  mahajan This is a kind of quantitative easing Just keep on reissuing NCDs with actual repayment\n"
, "ROB CARVER: There is an abbreviated version of my piece on QE and fixed income CTA strategies on the site https://t.co/gBRrvHeMv4\n"
, "THE LIBERTY MACHINE: Wow You do know what Quantitative Easing is right Also when you start a trade war with China and the DJIA is down 3000 points from the 52 week high that isn’t the day to brag about the economy #Economics101\n"
, "MARMADUKEBLACK: That's just old German speak for Quantitative Easing.\n"
, "ALISTAIR NICHOLLS: Translation we want the Bank of England to increase interest rates (now that there's no more free money from Quantitative Easing https://t.co/YhxqJUenKk\n"
, "AXA IM UK: IFA What’s moving #investment markets and how can history shape our understanding of potential opportunities today as well as threats Learn more about what’s happening in the world of #finance in our Economic calendar https://t.co/RgGJUvsnKH https://t.co/0DWU9nq0kG\n"
, "NIPUN KALRA: $EURUSD is cheap in PPP terms Quantitative easing is slowing down and will soon come to a halt in Euro Potential hikes in 2019 Euro is fundamentally a long bet on a long horizon.\n"
      ]
    }
  , { name: "republican"
    , speeches:
      [
        "MALCOLM TURNBULL: " +
        "Thank you, thank you very much.\n",
, ": Nick Rowe Quantitative easing is a stupid way to deal with the ze.. https://t.co/RsAXHFhj2p よ https://t.co/r214lklsAa\n"
, "JEEPY: I don't think people like you really understand how GODDAMNED UPSIDE DOWN the fucking economy was that Dubya handed over to Obama I have a MBA and can tell you we were on planet WTF None of my profs ever mentioned quantitative easing in 1994 'cause THAT'S CRAZY TALK.\n"
, "GREGORY RHO: i'm not sure if you liberal dirtbags have ever heard of quantitative easing but those microblips you're blaming on trump aren't what you should be concerned about the real hurt is coming and it has very little to do with the current president.\n"
, "GORDON GRANT: Read up on quantitative easing and you'll see that governments are already printing vast amounts of money from thin air US govt has created 4.5trillion USD worth since the GFC.\n"
, "WALTER LANGE: As long as Draghi is carrying on his quantitative easing program (30 bln per month) markets will go up.y\n"
, "CASEY SCHUHMACHER:  Otto Every lawyer economist and politico is against it We are in a mess (thank you quantitative easing) it's time to quit with the shell game and get back to goods having real value\n"
, "HOONG-WAI:  Rees Mogg Another Remainer who is ignorant of economics It is not economically advantageous to 'prop up the pound' Carney was exercising Quantitative Easing for other reasons.\n"
, "0      0: https://t.co/MAjjFpTuDo Subprime mortgages And Quantitative Easing is The New Normal / Silver Reports Uncut\n"
, "RAY L: Still the quantitative easing from Dodd Frank Bill The Federal Reserve added more than $4 trillion to its balance sheet in the half decade between 2009 and 2014 This money is artificially inflating the market to keep 401K’s up https://t.co/Tu6gS46nr5\n"
, "CITIZEN KANE: Currencies are created If you consider £360B of UK Quantitative Easing it was electronically created from nothing UK gained but no one lost out as UK inflation rate decreased https://t.co/bFAeWUeBuC\n"
, "PT: No it’s not Markets stopped rising when quantitative easing turned to quantitative tightening This just makes them jump up and down.\n"
, "JACK DUNN: We could find $85B a month for Quantitative Easing.. We can't find $25B for the #FourPillars plan Seriously.\n"
, "TOM UREN: Not sure if this is quantitative easing or seignoriage...\n"
, "ACE KOZMO: Obama was releasing money into the system..quantitative easing..fake money that devalued the American dollar..and intern falsely propped up the stock markets ..Trump will never do that..\n"
, "FRED QUIN: This is a correction to bernakes quantitative easing run for the past 8 years now that interest rates are taking affect and trade wars that should have happened years ago are taking affect\n"
, "MUSSO: The FT ��� &lt;Rates are expected to remain at historic lows until the middle of next year. 👉Before then the bank is set to call time on quantitative easing probably at the end of this year&gt;\n"
, "VANGUARD UK ADVISERS: Bond yields are rising as central banks withdraw emergency measures raising interest rates and winding down quantitative easing However we expect the pace of increases to be slow and rates to remain low https://t.co/MK594pCFs1 https://t.co/0K4fZhTpsI\n"
, "BTG ADVISORY: Nearly three-quarters of retired households lost over £500 in savings income due to the Bank of England’s strategy of quantitative easing following the financial crisis https://t.co/sunhmrfo6Z\n"
, "ELINA SEPP L: 'Rates are expected to remain at historic lows until the middle of next year Before then the bank is set to call time on quantitative easing probably at the end of this year would not discuss the timing of any tightening. https://t.co/Bal3SiX92J\n"
, "KEVIN A TUCKER: Obama for almost his enitire Presidency artificially put billions into the market d “quantitative easing” Liberals hate facts Worst most income racsist dishonest corrupt President in US history.\n"
, "KEVIN A TUCKER: SUCH BULLSHIT Obama for almost his enitire Presidency artificially put billions into the market d “quantitative easing” Worst most income racsist dishonest corrupt President in US history.\n"
, "KEVIN A TUCKER: SUCH BULLSHIT Obama for almost his enitire Presidency artificially put billions into the market d “quantitative easing” Worst most income racsist dishonest corrupt President in US history.\n"
, "GR8MKR2017: Quantitative Easing is the only thing Obama could manage given 8 years of GOP recalcitrance &amp obstruction The GOP deliberately did all they could to strangle the economy thinking they could destroy Obama’s administration Rump has ridden the coattails of the Obama recovery.\n"
, "WALLACE NOLL: china uses quantitative easing for national goals including infrastructure and the conquest of any industry they wish to conquer they create money from thin air and fund businesses to take over whatever sector they want then they forgive loans and do it again;\n"
, "ZAKBOT: Flow (Sail Away Sail Away)” I get shit all over this *sprays chrome paint into Canada but austerity. Quantitative easing\n"
, "LORENZO: So Wall Street sould dictate our foreign policy Trump could always do Quantitative Easing like the Obama administration did to falsely raise the stock market..\n"
, "MILTONMIKE: So no The economy did not like Obama at all Without 10 years of 0 interest rates and trillions in mostly wasted stimulus and fed quantitative easing The markets would have been much lower All that fake stuff has ended and Trump has reversed nearly every Obama policy.\n"
, "JONNYJAMES: even worse 100s of billions of taxpayer was used to 'bail out the banksters No one went to prison Elite crimes were rewarded The largest financial crimes in US history were rewarded with several TRILLION in subsidies tax-breaks bailouts &amp 'quantitative easing (QE)\n"
, "DPLORABLEBSTRD:  skibenes  gypsies He didn't turn the economy around In '08 before his presidency even began the Fed instituted Quantitative Easing It was basically an open ended blank check to the mega banks It was followed by QE2 etc and falsely propped up the market Obama had nothing to do with it.\n"
, "THE EQUEDIA LETTER: The Dramatic Drop and Quantitative Easing 4 https://t.co/ccbNBp67eP\n"
, "CAPITAL CONFLICT: The Currency Wars are over Having tripled the monetary base as a per cent of GDP the world’s major central banks are now winding up No more quantitative easing No more attempts to devalue the dollar euro or yen https://t.co/AxWu110Dor\n"
, "CLLR JOHN FULHAM: #Labour’s decision to print £435bn in quantitative easing/new money kept hospitals heated police paid services secured by exceptionally funding the deficit The alternative would’ve been vicious trap of modern Greek proportions #PoliticsMakesADifference https://t.co/7AOHL0Ilci\n"
, "WHAT IF INVESTING: Someone at should be made to write a paper on causation &amp correlation then be fired for writing this crap What nonsense Quantitative easing ‘reduced UK wealth inequality’ says BoE https://t.co/U7yiJADNye via\n"
, "FRANKLIN DEHOUSSE: Extremely stimulating contribution about quantitative easing and #inequality #QE https://t.co/3jIsR9HGKd via\n"
, "ROBIN WIGGLESWORTH: Quantitative easing ‘reduced UK wealth inequality’ says BoE Regardless hard money types bleating about inequality always sounded pretty ridiculous. https://t.co/rvLg3MmU5f\n"
, "JACOB HENSON: You're retarded if you think quantitative easing is the answer.\n"
, "JASON: It wasn’t less expensive Quantitative easing it literally free money to the largest banks to the tune of nearly the national debt https://t.co/0QQDbDzn6I\n"
, "JASON: And it was Obama who did the quantitative easing which dwarfs TARP Further Obama didn’t have to go along with TARP but I guess it’s hard not to when you already let Citigroup pick Cabinet.\n"
, "DR CHRIS GRAVES:  arch The reason for the failure of Gilts Plus is quantitative easing and the break in the relationship between gilts and equities /5\n"
, "JOHN HAMPSHIRE:  rod Yep correctly did not maintain the small Aussie version of quantitative easing (QE that got us through the GFC from 2008 and began winding it back.\n"
, "PETER OBRIEN: 1 Quantitative easing is the reason the EU is broke 2 GDP got nothing to do with it. 3 Raw numbers mean everything 2008 11.7 2016 41.1 You lie. 4 It's not yours It belongs to the nation And it's not to be spent on crackpot economics.\n"
, "REYNARD FOXX: 1 Yes you can heard of quantitative easing? 2 GDP is cash flow to cover repayments 3 Raw numbers mean nothing 2008 28% 1972 21% 4 It IS mine\n"
, "NICHOLAS MEGNA:  characterz Are you speaking about QE Quantitative Easing Zero Interest Rate Policy and endless bailouts which transferred $14T trillion with a T to US globalists And never punished the criminal bankers or pursue charges of war crimes against W?\n"
, "GARY VAUGHN: Dollar down 14 after his first year and interest rates spiking Tell the damn truth about the jobs All those came from Quantitative easing and you morons know it so that goes to the black man Trump is killing the economy Numbers don't lie.\n"
, "ALEXANDER CHENG:  Cat The Dow Jones closed with 400 million trades From January 2017 to current Dow Jones still has 4,000 points cushion The US market’s strength is back by stronger indications from finance manufacturing retails and sans quantitative easing real-time GDP.🇺🇸\n"
, "VANGUARD UK ADVISERS: Bond yields are rising as central banks withdraw emergency measures raising interest rates and winding down quantitative easing However we expect the pace of increases to be slow and rates to remain low https://t.co/YMzXjW7sM6 https://t.co/XxB12lZopb\n"
, "SIMON BROOKE: Or rather 'when it goes wrong we'll be bailed out with enormous injections of taxpayer money and quantitative easing so whatever happens to the little people we'll be personally rich'\n"
, "S1W: So the bubble is going to pop soon Heck of a correlation here (weird one at that) Will ‘quantitative easing help keep the stock market alive Where are we now what Q4 Q5… https://t.co/fHBLzcEakM\n"
, "ELI C.: Even you are an economic Imbecile What idiot Hussein did was “Quantitative Easing he made the illusion of a robust economy by Printing money Money for the stock market to use but the private sector couldn’t benefit That moron couldn’t get near 3 GDP 1st one NEVER to do it\n"
, "ANDI LUTZ: https://t.co/ocNUGe7EHs Quantitative Easing Analyzing The Argument Of Stock Market Indifference We recently came across an article on SA that rejects the notion of quantitative easing's impact on the stock market Although we do agree with the author that QE did little to imp…\n"
, "BENNY FITZSCROUNGER: We haven't left yet and while other nations economies have grown the UKs is stagnant there are affects valuation and a whopping intervention by the B of E quantitative easing firms leaving but we haven't had the Brexshit cliff and that won't come until after the transition.\n"
, "COLIN:  Amene Ohh and 1 Was deregulating Wall Street again 10 years after global meltdown by criminals on Wall Street Who lost their homes to pay quantitative easing again in the trillions Who went to jail?\n"
, "VANGUARD UK ADVISERS: Bond yields are rising as central banks withdraw emergency measures raising interest rates and winding down quantitative easing However we expect the pace of increases to be slow and rates to remain low https://t.co/yDvku8Nj8i https://t.co/l6sPdAp2iP\n"
, "TVB777: You google 'quantitative easing' and I'll block you to avoid unnecessary long arguments.\n"
, "GUS GARCIA III: GDP up. Wages up Employment up Black and Hispanic employment way up Homeownership up Corporate earnings up US investment up Manufacturing jobs up. ...without $7.5 Trillion Of quantitative easing ...without 0 Fed rates Even as Fed has raised rates 4x since election.\n"
, "PAPIKI: Am I the only one who sees having a currency not backed by gold as wrong Or is quantitative easing good If any other person does it they go to jail but the banks do it everyday Banks are literally ruining our economy how ironic.. P.s Banks are outdated. #Blockchain\n"
, "DANNY ANSON: NOT THE POOR 'Quantitative Easing Explained Who Gets Fed’s Printed Money Text and… https://t.co/6wYUp3Q6Pt\n"
, "SIALO KIMIRING: Because of 'quantitative easing and other economic factors of the USA since 2008 that feed potential hyper inflation the USA leans on Communist China to purchase US Treasury Bonds China is forced to support the US .. and recently Europe #KingsofEast\n"
, "KANK THE ANTI OLIGARCH: Cancelling student debt sounds impossible until you realize that the government spent trillions on the iraq war and the federal bailout yet cancelling student debt would be in the billions Quantitative easing through the federal reserve isn't impossible people.\n"
, "TONY FORREST:  3502  Anderson  scott  payne  watson  U A R Quantitative Easing Previously you were of the opinion that QE was a cure for constipation You may be anally retentive but if anything you have a bad case of keyboard incontinence?\n"
, "CHRIS IVES: Suspected that might be the case Probably something to do with the Petro-Yuan https://t.co/eB1unMdJoS It's not like the government lies to us is it Quantitative Easing was for the people so long as you are a banker needing to shore up your balance sheets!\n"
, "DAKOTA REYNOLDS: And there were other ppl who wanted it because the Democrats and Republicans both had several candidates Plus his economic policy of quantitative easing into the federal Reserve did not did nothing but devalue the dollar A BIG reason I hated him was his disastrous treating of\n"
, "S T E V E:  Anderson  scott  payne  watson  U A R I wonder just WHO is confused here briGenius or biz4Scotland https://t.co/sEMcBwyLP7\n"
, "GIORGINAS:  eu  may Oh dear.. Did you miss the £435 billion of quantitative easing ie Printing money the #uk did Did you miss shocking #uk productivity levels Did you miss the fact #uk camouflages some of its pension liabilities making its debt gdp ratio look better than it really is?\n"
, "ALIN TONCZ: Yeah by pumping fake printed money into it Oidiot was good at manipulating details just to show results Quantitative easing was the name of the game and you Libs got played for 8 straight years.\n"
, "DENNIS USHER: Look up quantitative easing Mike The only president in our history that never saw 3 GDP in any one quarter Pathetic!\n"
, "DANIEL LACALLE: Scary: Quantitative Easing and the “New Normal in Monetary Policy https://t.co/QsVe0esOF6\n"
, "K G HOHENSTAUFFEN: Gaddafi was murdered because he wanted a return to Gold Standard Something that the ideologues of Quantitative Easing hated https://t.co/vKuspcatD7\n"
, "VIVEK SRINIVASAN: This will be beyond devastating to the US economy and more importantly to the dollar This will expose the fundamental of the dollar A move like Quantitative Easing will not be possible in the future. If China is involved: Almost all of Africa will mov https://t.co/jSqlCaudLX\n"
, "CHABIS: '$45M in new SLand shillings is injected into the economy annually Shocking levels of quantitative easing has led to hyperinflation and the depreciation of the local currency  jama https://t.co/CUJup8fn9M\n"
, "VANGUARD UK ADVISERS: Bond yields are rising as central banks withdraw emergency measures raising interest rates and winding down quantitative easing However we expect the pace of increases to be slow and rates to remain low https://t.co/eVfTdyOIqB https://t.co/ad6Mr17RCK\n"
, "KEN NONEOFURBUSINESS: Only because all of the quantitative easing that was going on and all the other money that the Fed dumped into the market\n"
, "TREVOR GREEN: Or they could just print money as a percentage of the GDP quantitative easing and leave us the fuck alone.\n"
, "SOOTSG: You mean the stock market increase built on the 5 Trillion dollars of play money the fed printed through quantitative easing and zero fed rate Yet the economy never grew above 2 annually Not a great return on the overall 10 Trillion of Obama debt.\n"
, "KEITH JONES:  YVA Sorry to hurt your feelings zack the reason the dow went up under shit stain was his printing of 2 trillion dollars under his quantitative easing plan.. Also the banks were not paying any interest on savings or cd's so the only place to put investment was the market.\n"
, "JAY TROLLSTEIN II: Sorry Trump isn't doesn't Quantitative Easing and 0 interest rates helping him.\n"
, "EDWARD BROWN:  Kotecha Grew at a slow rate due to quantitative easing.\n"
, "ZACH RICHARDS: The national debt has just passed $21T Labor force participation rate is at a dismal 63% Quantitative easing has brought unimaginable inflation The Feds artificial rates have created bubbles across multiple asset classes Consumer debt is at an all time high Strong???\n"
, "COLIN: Gave Trillion to crooks on Wall Street in quantitative easing because “to big to fail while making millions conned US citizens and globally homeless And guess what Democrats are letting them do it again hand in hand with Republicans Absolutely repugnant https://t.co/4zZwL4KrqY\n"
, "DAMARIS COLHOUN: 'The idea that we can suddenly reverse quantitative easing and have no knock-on consequences for stocks seems a little pie-in-the-sky. https://t.co/OeP0JAh8AC\n"
      ]
    }
  ]
, speakers:
  {

    "BILL SHORTEN":
    { name: "Bill Shorten"
    , title: "Opposition Leader (Labor Party)"
    },

 "ANDREA": { name: "ANDREA", title: "Date: 05 Apr 2018 Rating: 0.000" } ,
 "SHARESWATCH.COM.AU": { name: "SHARESWATCH.COM.AU", title: "Date: 05 Apr 2018 Rating: 0.000" } ,
 "": { name: "", title: "Date: 05 Apr 2018 Rating: -0.800" } ,
 "JEEPY": { name: "JEEPY", title: "Date: 05 Apr 2018 Rating: -0.331" } ,
 "WALLACE NOLL": { name: "WALLACE NOLL", title: "Date: 05 Apr 2018 Rating: 0.045" } ,
 "POSITIVE MONEY EUROPE": { name: "POSITIVE MONEY EUROPE", title: "Date: 05 Apr 2018 Rating: 0.045" } ,
 "RASHEED MUHAMMAD": { name: "RASHEED MUHAMMAD", title: "Date: 05 Apr 2018 Rating: 0.143" } ,
 "RICHARD SCHOFIELD": { name: "RICHARD SCHOFIELD", title: "Date: 05 Apr 2018 Rating: 0.000" } ,
 "MY INFO": { name: "MY INFO", title: "Date: 05 Apr 2018 Rating: 0.000" } ,
 "LARRY CHIANG": { name: "LARRY CHIANG", title: "Date: 05 Apr 2018 Rating: 0.600" } ,
 "GREGORY RHO": { name: "GREGORY RHO", title: "Date: 05 Apr 2018 Rating: -0.073" } ,
 "BENZTRADER": { name: "BENZTRADER", title: "Date: 04 Apr 2018 Rating: 0.162" } ,
 "DEVRA #REUNION": { name: "DEVRA #REUNION", title: "Date: 04 Apr 2018 Rating: 0.073" } ,
 "JACK DUNN": { name: "JACK DUNN", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "GORDON GRANT": { name: "GORDON GRANT", title: "Date: 04 Apr 2018 Rating: -0.033" } ,
 "BLACKSTRAT": { name: "BLACKSTRAT", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "WALTER LANGE": { name: "WALTER LANGE", title: "Date: 04 Apr 2018 Rating: -0.050" } ,
 "BRIAN NORWOOD": { name: "BRIAN NORWOOD", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "CASEY SCHUHMACHER": { name: "CASEY SCHUHMACHER", title: "Date: 04 Apr 2018 Rating: -0.094" } ,
 "MARGINALREVOLUTIONU": { name: "MARGINALREVOLUTIONU", title: "Date: 04 Apr 2018 Rating: 0.312" } ,
 "HOONG-WAI": { name: "HOONG-WAI", title: "Date: 04 Apr 2018 Rating: -0.138" } ,
 "EKEM BRANCH": { name: "EKEM BRANCH", title: "Date: 04 Apr 2018 Rating: 0.333" } ,
 "0      0": { name: "0      0", title: "Date: 04 Apr 2018 Rating: -0.071" } ,
 "JACK DUNN": { name: "JACK DUNN", title: "Date: 04 Apr 2018 Rating: 0.368" } ,
 "TUOMAS MALINEN": { name: "TUOMAS MALINEN", title: "Date: 04 Apr 2018 Rating: 0.078" } ,
 "RAY L": { name: "RAY L", title: "Date: 04 Apr 2018 Rating: -0.089" } ,
 "GOLDEN SEEDS FX": { name: "GOLDEN SEEDS FX", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "CITIZEN KANE": { name: "CITIZEN KANE", title: "Date: 04 Apr 2018 Rating: -0.400" } ,
 "THE JUDD SCHOOL ECONOMICS POLITICS DEPARTMENT": { name: "THE JUDD SCHOOL ECONOMICS POLITICS DEPARTMENT", title: "Date: 04 Apr 2018 Rating: 0.750" } ,
 "SACHIN GARG": { name: "SACHIN GARG", title: "Date: 04 Apr 2018 Rating: 0.350" } ,
 "ALTERNATIVERETURN": { name: "ALTERNATIVERETURN", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "JESSE GREEN": { name: "JESSE GREEN", title: "Date: 04 Apr 2018 Rating: 0.252" } ,
 "PT": { name: "PT", title: "Date: 04 Apr 2018 Rating: -0.156" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "DANIEL MOSS": { name: "DANIEL MOSS", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "KK": { name: "KK", title: "Date: 04 Apr 2018 Rating: 0.100" } ,
 "IG:HKVIBEZ": { name: "IG:HKVIBEZ", title: "Date: 04 Apr 2018 Rating: 0.500" } ,
 "RICHARD MONAGHAN": { name: "RICHARD MONAGHAN", title: "Date: 04 Apr 2018 Rating: 0.033" } ,
 "BEN RICKERT": { name: "BEN RICKERT", title: "Date: 04 Apr 2018 Rating: 0.200" } ,
 "G RAN OLSSON": { name: "G RAN OLSSON", title: "Date: 04 Apr 2018 Rating: 0.108" } ,
 "BLUE COAT ECONOMICS": { name: "BLUE COAT ECONOMICS", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "BLOOMBERG ECONOMICS": { name: "BLOOMBERG ECONOMICS", title: "Date: 04 Apr 2018 Rating: 0.100" } ,
 "COLFESECONOMICS": { name: "COLFESECONOMICS", title: "Date: 04 Apr 2018 Rating: 1.000" } ,
 "RENAUD HUCK": { name: "RENAUD HUCK", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "TEDHU": { name: "TEDHU", title: "Date: 04 Apr 2018 Rating: 0.700" } ,
 "DAVID MARTIN": { name: "DAVID MARTIN", title: "Date: 04 Apr 2018 Rating: 0.450" } ,
 "YUKO TAKEO": { name: "YUKO TAKEO", title: "Date: 04 Apr 2018 Rating: 0.450" } ,
 "NEWSCO INC.": { name: "NEWSCO INC.", title: "Date: 04 Apr 2018 Rating: 0.000" } ,
 "WANALYTICS": { name: "WANALYTICS", title: "Date: 03 Apr 2018 Rating: 0.250" } ,
 "CHRIS KLINEPETER": { name: "CHRIS KLINEPETER", title: "Date: 03 Apr 2018 Rating: 0.333" } ,
 "JACK DUNN": { name: "JACK DUNN", title: "Date: 03 Apr 2018 Rating: -0.333" } ,
 "BLOOMBERG VIEW": { name: "BLOOMBERG VIEW", title: "Date: 03 Apr 2018 Rating: 0.450" } ,
 "COYOTES BAR": { name: "COYOTES BAR", title: "Date: 03 Apr 2018 Rating: 0.111" } ,
 "TOM UREN": { name: "TOM UREN", title: "Date: 03 Apr 2018 Rating: -0.250" } ,
 "BLOOMBERG": { name: "BLOOMBERG", title: "Date: 03 Apr 2018 Rating: 0.450" } ,
 "IRC NOT ROOTBEER": { name: "IRC NOT ROOTBEER", title: "Date: 03 Apr 2018 Rating: 0.250" } ,
 "KEITH BURGE": { name: "KEITH BURGE", title: "Date: 03 Apr 2018 Rating: 0.400" } ,
 "DANIEL LACALLE": { name: "DANIEL LACALLE", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "JORDAN": { name: "JORDAN", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "Date: 03 Apr 2018 Rating: 0.080" } ,
 "LUKE BRADLEY": { name: "LUKE BRADLEY", title: "Date: 03 Apr 2018 Rating: 0.183" } ,
 "ACE KOZMO": { name: "ACE KOZMO", title: "Date: 03 Apr 2018 Rating: -0.200" } ,
 "PMG_BARNHAM": { name: "PMG_BARNHAM", title: "Date: 03 Apr 2018 Rating: 0.062" } ,
 "CROUTON": { name: "CROUTON", title: "Date: 03 Apr 2018 Rating: 0.169" } ,
 "BILL CREGO": { name: "BILL CREGO", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "ED CONWAY": { name: "ED CONWAY", title: "Date: 03 Apr 2018 Rating: 0.550" } ,
 "STEPHEN MILLER": { name: "STEPHEN MILLER", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "TONY CLEWES #FBPE": { name: "TONY CLEWES #FBPE", title: "Date: 03 Apr 2018 Rating: 0.050" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "FRED QUIN": { name: "FRED QUIN", title: "Date: 03 Apr 2018 Rating: -0.250" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "QUANTMINDS": { name: "QUANTMINDS", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "MRA MARKETING": { name: "MRA MARKETING", title: "Date: 03 Apr 2018 Rating: 0.067" } ,
 "ANDREA": { name: "ANDREA", title: "Date: 03 Apr 2018 Rating: 0.375" } ,
 "MUSSO": { name: "MUSSO", title: "Date: 03 Apr 2018 Rating: -0.025" } ,
 "VANGUARD UK ADVISERS": { name: "VANGUARD UK ADVISERS", title: "Date: 03 Apr 2018 Rating: -0.114" } ,
 "BTG ADVISORY": { name: "BTG ADVISORY", title: "Date: 03 Apr 2018 Rating: -0.006" } ,
 "DEEPAK SINGH": { name: "DEEPAK SINGH", title: "Date: 03 Apr 2018 Rating: 0.100" } ,
 "TUTOR2U ECONOMICS": { name: "TUTOR2U ECONOMICS", title: "Date: 03 Apr 2018 Rating: 0.318" } ,
 "GLOBALCAPITAL": { name: "GLOBALCAPITAL", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "ELINA SEPP L": { name: "ELINA SEPP L", title: "Date: 03 Apr 2018 Rating: -0.025" } ,
 "KEVIN A TUCKER": { name: "KEVIN A TUCKER", title: "Date: 03 Apr 2018 Rating: -0.450" } ,
 "KEVIN A TUCKER": { name: "KEVIN A TUCKER", title: "Date: 03 Apr 2018 Rating: -0.317" } ,
 "KEVIN A TUCKER": { name: "KEVIN A TUCKER", title: "Date: 03 Apr 2018 Rating: -0.317" } ,
 "MARKET PRICE INDEX": { name: "MARKET PRICE INDEX", title: "Date: 03 Apr 2018 Rating: 0.300" } ,
 "PARKSTONE ECONOMICS": { name: "PARKSTONE ECONOMICS", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "ICHAEL G #MLK50": { name: "ICHAEL G #MLK50", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "THE LAST DON": { name: "THE LAST DON", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "GR8MKR2017": { name: "GR8MKR2017", title: "Date: 03 Apr 2018 Rating: -0.100" } ,
 "JAMES CRAWFORD": { name: "JAMES CRAWFORD", title: "Date: 03 Apr 2018 Rating: 0.330" } ,
 "CAMPION SIXTH FORM": { name: "CAMPION SIXTH FORM", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "JEFF SANDERS": { name: "JEFF SANDERS", title: "Date: 03 Apr 2018 Rating: 0.105" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "BOLO": { name: "BOLO", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "HAKON KHAJAVEI": { name: "HAKON KHAJAVEI", title: "Date: 03 Apr 2018 Rating: 0.550" } ,
 "STACEY JOHNSON": { name: "STACEY JOHNSON", title: "Date: 03 Apr 2018 Rating: 0.100" } ,
 "WILLIAM HARKER": { name: "WILLIAM HARKER", title: "Date: 03 Apr 2018 Rating: 0.000" } ,
 "PREPARE MATHEW 25": { name: "PREPARE MATHEW 25", title: "Date: 03 Apr 2018 Rating: 0.250" } ,
 "MYTRADEPH-ABACUS SEC": { name: "MYTRADEPH-ABACUS SEC", title: "Date: 03 Apr 2018 Rating: 0.175" } ,
 "WALLACE NOLL": { name: "WALLACE NOLL", title: "Date: 03 Apr 2018 Rating: -0.400" } ,
 "GREG POWELL": { name: "GREG POWELL", title: "Date: 03 Apr 2018 Rating: 0.400" } ,
 "ZAKBOT": { name: "ZAKBOT", title: "Date: 03 Apr 2018 Rating: -0.200" } ,
 "LORENZO": { name: "LORENZO", title: "Date: 02 Apr 2018 Rating: -0.263" } ,
 "KAZ LOKUCIEWSKI": { name: "KAZ LOKUCIEWSKI", title: "Date: 02 Apr 2018 Rating: 0.250" } ,
 "ROONOMICS": { name: "ROONOMICS", title: "Date: 02 Apr 2018 Rating: 0.750" } ,
 "BETHLEHEM": { name: "BETHLEHEM", title: "Date: 02 Apr 2018 Rating: 0.125" } ,
 "KRIS": { name: "KRIS", title: "Date: 02 Apr 2018 Rating: 0.018" } ,
 "TUTOR2U GEOFF": { name: "TUTOR2U GEOFF", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "PAUL TOWER": { name: "PAUL TOWER", title: "Date: 02 Apr 2018 Rating: 0.050" } ,
 "MAURICE": { name: "MAURICE", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "MICHAEL J WALKER": { name: "MICHAEL J WALKER", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "REV DAN WOODHOUSE": { name: "REV DAN WOODHOUSE", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "MAURITIUSGOLD": { name: "MAURITIUSGOLD", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "MILTONMIKE": { name: "MILTONMIKE", title: "Date: 02 Apr 2018 Rating: -0.100" } ,
 "JONNYJAMES": { name: "JONNYJAMES", title: "Date: 02 Apr 2018 Rating: -0.133" } ,
 "JOSEPH JONES": { name: "JOSEPH JONES", title: "Date: 02 Apr 2018 Rating: 0.083" } ,
 "TEEMU SINTONEN": { name: "TEEMU SINTONEN", title: "Date: 02 Apr 2018 Rating: 0.017" } ,
 "JASON": { name: "JASON", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "DPLORABLEBSTRD": { name: "DPLORABLEBSTRD", title: "Date: 02 Apr 2018 Rating: 0.035" } ,
 "ANDREAS CSEH": { name: "ANDREAS CSEH", title: "Date: 02 Apr 2018 Rating: 0.200" } ,
 "DPLORABLEBSTRD": { name: "DPLORABLEBSTRD", title: "Date: 02 Apr 2018 Rating: -0.133" } ,
 "MARK RIDER": { name: "MARK RIDER", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "LAWRENCE TURNER": { name: "LAWRENCE TURNER", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "AGENT CRYPTIC PSYPHER": { name: "AGENT CRYPTIC PSYPHER", title: "Date: 02 Apr 2018 Rating: 0.300" } ,
 "NAME CANNOT BE BLANK": { name: "NAME CANNOT BE BLANK", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "ALFRED GILLHAM": { name: "ALFRED GILLHAM", title: "Date: 02 Apr 2018 Rating: 0.250" } ,
 "TODD POWELL": { name: "TODD POWELL", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "1911A1CUSTOM": { name: "1911A1CUSTOM", title: "Date: 02 Apr 2018 Rating: 0.500" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "JEFF WHITE": { name: "JEFF WHITE", title: "Date: 02 Apr 2018 Rating: 0.262" } ,
 "VINAY RAO": { name: "VINAY RAO", title: "Date: 02 Apr 2018 Rating: 0.040" } ,
 "JULIAN COX": { name: "JULIAN COX", title: "Date: 02 Apr 2018 Rating: 0.376" } ,
 "THE EQUEDIA LETTER": { name: "THE EQUEDIA LETTER", title: "Date: 02 Apr 2018 Rating: -0.433" } ,
 "GERALD NASH": { name: "GERALD NASH", title: "Date: 02 Apr 2018 Rating: 0.208" } ,
 "ANH NGUYEN": { name: "ANH NGUYEN", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "NEP-CBA": { name: "NEP-CBA", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "JG1977": { name: "JG1977", title: "Date: 02 Apr 2018 Rating: 0.000" } ,
 "NEP-MAC": { name: "NEP-MAC", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "TERRY VICTORY": { name: "TERRY VICTORY", title: "Date: 01 Apr 2018 Rating: 0.600" } ,
 "ONEDADSFINANCE": { name: "ONEDADSFINANCE", title: "Date: 01 Apr 2018 Rating: 0.200" } ,
 "EMIR OMERAGI": { name: "EMIR OMERAGI", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "LARK FI": { name: "LARK FI", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "CAPITAL CONFLICT": { name: "CAPITAL CONFLICT", title: "Date: 01 Apr 2018 Rating: -0.247" } ,
 "CHASFAX": { name: "CHASFAX", title: "Date: 01 Apr 2018 Rating: 0.067" } ,
 "AL MONTEITH": { name: "AL MONTEITH", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "BRADLEY KIESER": { name: "BRADLEY KIESER", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "FLORIAN KEULERS": { name: "FLORIAN KEULERS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "MARK JEFFERSON": { name: "MARK JEFFERSON", title: "Date: 01 Apr 2018 Rating: 0.100" } ,
 "MAURO DEL CORNO": { name: "MAURO DEL CORNO", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "MARK CURRAN": { name: "MARK CURRAN", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "DANIEL MCBRIDE": { name: "DANIEL MCBRIDE", title: "Date: 01 Apr 2018 Rating: 0.056" } ,
 "S B": { name: "S B", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "PROSPER HOME LOANS": { name: "PROSPER HOME LOANS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "CLLR JOHN FULHAM": { name: "CLLR JOHN FULHAM", title: "Date: 01 Apr 2018 Rating: -0.033" } ,
 "MATT PALASKY": { name: "MATT PALASKY", title: "Date: 01 Apr 2018 Rating: 0.117" } ,
 "MIKE HARRIS": { name: "MIKE HARRIS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "WHAT IF INVESTING": { name: "WHAT IF INVESTING", title: "Date: 01 Apr 2018 Rating: -0.800" } ,
 "HOWARD ARCHER": { name: "HOWARD ARCHER", title: "Date: 01 Apr 2018 Rating: 0.275" } ,
 "ROGER MAYER": { name: "ROGER MAYER", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "MARTIN GOODSON": { name: "MARTIN GOODSON", title: "Date: 01 Apr 2018 Rating: 0.183" } ,
 "MICHEL NEUMARK": { name: "MICHEL NEUMARK", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "THAT SCOTTISH GUY": { name: "THAT SCOTTISH GUY", title: "Date: 01 Apr 2018 Rating: 0.400" } ,
 "JASON NEIL PATTISON": { name: "JASON NEIL PATTISON", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "THABANG": { name: "THABANG", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "EAGLESTAR.NET": { name: "EAGLESTAR.NET", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "PEDRO SOUSA": { name: "PEDRO SOUSA", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "DANIEL WALTER": { name: "DANIEL WALTER", title: "Date: 01 Apr 2018 Rating: 0.050" } ,
 "RANJAN BALAKUMARAN": { name: "RANJAN BALAKUMARAN", title: "Date: 01 Apr 2018 Rating: 0.100" } ,
 "FRANKLIN DEHOUSSE": { name: "FRANKLIN DEHOUSSE", title: "Date: 01 Apr 2018 Rating: -0.125" } ,
 "BRIAN GROOM": { name: "BRIAN GROOM", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "CHRISTIAN EBUDDY": { name: "CHRISTIAN EBUDDY", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "TAPAN SAHNI": { name: "TAPAN SAHNI", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "VESA AHONIEMI": { name: "VESA AHONIEMI", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "YUICHI": { name: "YUICHI", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "ORELEX": { name: "ORELEX", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "ARCHES EUROPE": { name: "ARCHES EUROPE", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "ROBIN WIGGLESWORTH": { name: "ROBIN WIGGLESWORTH", title: "Date: 01 Apr 2018 Rating: -0.125" } ,
 "ANDREW MCNALLY": { name: "ANDREW MCNALLY", title: "Date: 01 Apr 2018 Rating: 0.600" } ,
 "JAIME HARTIG CFP": { name: "JAIME HARTIG CFP", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "FINANCE RADAR": { name: "FINANCE RADAR", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "US BUSINESS NEWS": { name: "US BUSINESS NEWS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "JACOB HENSON": { name: "JACOB HENSON", title: "Date: 01 Apr 2018 Rating: -0.800" } ,
 "HELLO NEWS": { name: "HELLO NEWS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "MYALLIES NEWS": { name: "MYALLIES NEWS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "FINANCIAL TIMES": { name: "FINANCIAL TIMES", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "GORDON'S ECONOMICS": { name: "GORDON'S ECONOMICS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "GAVIN JACKSON": { name: "GAVIN JACKSON", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "MSSMONEY": { name: "MSSMONEY", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "RICHARD LEE": { name: "RICHARD LEE", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "OCEANSIDE HOTELS": { name: "OCEANSIDE HOTELS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "MYBRANDOWL": { name: "MYBRANDOWL", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "ENOCH POWELL": { name: "ENOCH POWELL", title: "Date: 01 Apr 2018 Rating: 0.167" } ,
 "DATAMAN": { name: "DATAMAN", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "UNIPREMUIM PAPERS": { name: "UNIPREMUIM PAPERS", title: "Date: 01 Apr 2018 Rating: 0.000" } ,
 "WYNOTME307": { name: "WYNOTME307", title: "Date: 31 Mar 2018 Rating: 0.323" } ,
 "DAN BITHER": { name: "DAN BITHER", title: "Date: 31 Mar 2018 Rating: 0.000" } ,
 "MIKE": { name: "MIKE", title: "Date: 31 Mar 2018 Rating: 0.000" } ,
 "IAN HOPKINS": { name: "IAN HOPKINS", title: "Date: 31 Mar 2018 Rating: 0.015" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: 0.000" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: 0.008" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: 0.000" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: 0.216" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: -0.042" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: 0.037" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: -0.146" } ,
 "JASON": { name: "JASON", title: "Date: 31 Mar 2018 Rating: 0.133" } ,
 "ELYK SNOMMIS": { name: "ELYK SNOMMIS", title: "Date: 31 Mar 2018 Rating: 0.074" } ,
 "PATRICK GERARD": { name: "PATRICK GERARD", title: "Date: 31 Mar 2018 Rating: 0.140" } ,
 "DR CHRIS GRAVES": { name: "DR CHRIS GRAVES", title: "Date: 31 Mar 2018 Rating: -0.317" } ,
 "CHRISTOPHER KELAHER": { name: "CHRISTOPHER KELAHER", title: "Date: 31 Mar 2018 Rating: 0.000" } ,
 "THE PROPHET": { name: "THE PROPHET", title: "Date: 31 Mar 2018 Rating: 0.234" } ,
 "ZORAIDA S NCHEZ": { name: "ZORAIDA S NCHEZ", title: "Date: 31 Mar 2018 Rating: 0.129" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 31 Mar 2018 Rating: 0.000" } ,
 "JOHN HAMPSHIRE": { name: "JOHN HAMPSHIRE", title: "Date: 31 Mar 2018 Rating: -0.125" } ,
 "PETER OBRIEN": { name: "PETER OBRIEN", title: "Date: 31 Mar 2018 Rating: -0.214" } ,
 "REYNARD FOXX": { name: "REYNARD FOXX", title: "Date: 31 Mar 2018 Rating: -0.272" } ,
 "CATHY BAILEY": { name: "CATHY BAILEY", title: "Date: 31 Mar 2018 Rating: 0.100" } ,
 "PAUL GAMBLES": { name: "PAUL GAMBLES", title: "Date: 31 Mar 2018 Rating: 0.036" } ,
 "NICHOLAS MEGNA": { name: "NICHOLAS MEGNA", title: "Date: 31 Mar 2018 Rating: -0.263" } ,
 "BILL MILLER": { name: "BILL MILLER", title: "Date: 31 Mar 2018 Rating: 0.069" } ,
 "SCOTT PARRISH": { name: "SCOTT PARRISH", title: "Date: 31 Mar 2018 Rating: 0.000" } ,
 "BRIAN J HURLEY": { name: "BRIAN J HURLEY", title: "Date: 31 Mar 2018 Rating: 0.272" } ,
 "BILL MILLER": { name: "BILL MILLER", title: "Date: 31 Mar 2018 Rating: 0.150" } ,
 "THE CORNER": { name: "THE CORNER", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "KITTYSCALP": { name: "KITTYSCALP", title: "Date: 30 Mar 2018 Rating: 0.007" } ,
 "GARY VAUGHN": { name: "GARY VAUGHN", title: "Date: 30 Mar 2018 Rating: -0.218" } ,
 "ALEXANDER CHENG": { name: "ALEXANDER CHENG", title: "Date: 30 Mar 2018 Rating: -0.033" } ,
 "THE ROMBACH REPORT": { name: "THE ROMBACH REPORT", title: "Date: 30 Mar 2018 Rating: 0.267" } ,
 "CATHERINE MARY WAFER#FBPE": { name: "CATHERINE MARY WAFER#FBPE", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "RICKROW": { name: "RICKROW", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "VANGUARD UK ADVISERS": { name: "VANGUARD UK ADVISERS", title: "Date: 30 Mar 2018 Rating: -0.114" } ,
 "ABDULLAH ALJINAAHI": { name: "ABDULLAH ALJINAAHI", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "JOSEPH LEEMAN": { name: "JOSEPH LEEMAN", title: "Date: 30 Mar 2018 Rating: 0.450" } ,
 "TIMOTHY WILLIS": { name: "TIMOTHY WILLIS", title: "Date: 30 Mar 2018 Rating: 0.475" } ,
 "SUNEYE RAE HOLMES": { name: "SUNEYE RAE HOLMES", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "ABHISHEK RAJURKAR": { name: "ABHISHEK RAJURKAR", title: "Date: 30 Mar 2018 Rating: 0.500" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "ANDY STEPHENSON": { name: "ANDY STEPHENSON", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "GIAMPAOLO": { name: "GIAMPAOLO", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "SIMON MAYHEW-ARCHER": { name: "SIMON MAYHEW-ARCHER", title: "Date: 30 Mar 2018 Rating: 0.100" } ,
 "VERNER VERASS": { name: "VERNER VERASS", title: "Date: 30 Mar 2018 Rating: 0.045" } ,
 "RAY SLAYMAKER": { name: "RAY SLAYMAKER", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "BEN MCCONAGHY": { name: "BEN MCCONAGHY", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "ROSIE RICHENS #FBPE #WATON #ABTV": { name: "ROSIE RICHENS #FBPE #WATON #ABTV", title: "Date: 30 Mar 2018 Rating: 0.188" } ,
 "VERNER VERASS": { name: "VERNER VERASS", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "SIMON BROOKE": { name: "SIMON BROOKE", title: "Date: 30 Mar 2018 Rating: -0.078" } ,
 "S1W": { name: "S1W", title: "Date: 30 Mar 2018 Rating: -0.200" } ,
 "ROBERT RICHER": { name: "ROBERT RICHER", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "BILL": { name: "BILL", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "ELI C.": { name: "ELI C.", title: "Date: 30 Mar 2018 Rating: -0.350" } ,
 "MICHELLE LEMARIE": { name: "MICHELLE LEMARIE", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "STOCK MARKET TIME": { name: "STOCK MARKET TIME", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "BOOK MANAGEMENT": { name: "BOOK MANAGEMENT", title: "Date: 30 Mar 2018 Rating: 0.000" } ,
 "WALTON MCGUINTY": { name: "WALTON MCGUINTY", title: "Date: 29 Mar 2018 Rating: 0.100" } ,
 "ANDI LUTZ": { name: "ANDI LUTZ", title: "Date: 29 Mar 2018 Rating: -0.094" } ,
 "IG:HKVIBEZ": { name: "IG:HKVIBEZ", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "ANDREW WAUGH": { name: "ANDREW WAUGH", title: "Date: 29 Mar 2018 Rating: 0.150" } ,
 "BENNY FITZSCROUNGER": { name: "BENNY FITZSCROUNGER", title: "Date: 29 Mar 2018 Rating: -0.062" } ,
 "JARRATT DAVIS": { name: "JARRATT DAVIS", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "MAREKANI ?": { name: "MAREKANI ?", title: "Date: 29 Mar 2018 Rating: 0.200" } ,
 "DR SIMON LEE": { name: "DR SIMON LEE", title: "Date: 29 Mar 2018 Rating: 0.275" } ,
 "PHIL WEBBER": { name: "PHIL WEBBER", title: "Date: 29 Mar 2018 Rating: 0.350" } ,
 "COLIN": { name: "COLIN", title: "Date: 29 Mar 2018 Rating: -0.050" } ,
 "HAKON REDDER": { name: "HAKON REDDER", title: "Date: 29 Mar 2018 Rating: 0.100" } ,
 "ZVI": { name: "ZVI", title: "Date: 29 Mar 2018 Rating: 0.200" } ,
 "THE GAYTRIARCH FLEETING MOMENTS OF COGNIZANCE": { name: "THE GAYTRIARCH FLEETING MOMENTS OF COGNIZANCE", title: "Date: 29 Mar 2018 Rating: 0.200" } ,
 "ALEXANDER CHENG": { name: "ALEXANDER CHENG", title: "Date: 29 Mar 2018 Rating: 0.100" } ,
 "NAPOLEON": { name: "NAPOLEON", title: "Date: 29 Mar 2018 Rating: 0.800" } ,
 "TIMMYDARTZ": { name: "TIMMYDARTZ", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "ZORAIDA S NCHEZ": { name: "ZORAIDA S NCHEZ", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "VANGUARD UK ADVISERS": { name: "VANGUARD UK ADVISERS", title: "Date: 29 Mar 2018 Rating: -0.114" } ,
 "CATHY BAILEY": { name: "CATHY BAILEY", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "CATHY BAILEY": { name: "CATHY BAILEY", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "TVB777": { name: "TVB777", title: "Date: 29 Mar 2018 Rating: -0.225" } ,
 "JFMCKEON": { name: "JFMCKEON", title: "Date: 29 Mar 2018 Rating: 0.000" } ,
 "LUKAS DUPASS": { name: "LUKAS DUPASS", title: "Date: 29 Mar 2018 Rating: 0.343" } ,
 "KIKO KOBAYASHI": { name: "KIKO KOBAYASHI", title: "Date: 28 Mar 2018 Rating: 0.197" } ,
 "MICHAEL GARZA": { name: "MICHAEL GARZA", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "THE FINANCIAL FRIEND": { name: "THE FINANCIAL FRIEND", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "GOWDY FINANCIAL GRP": { name: "GOWDY FINANCIAL GRP", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "COIN SPECTATOR": { name: "COIN SPECTATOR", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "WILMA SCHROVER": { name: "WILMA SCHROVER", title: "Date: 28 Mar 2018 Rating: 0.071" } ,
 "GUS GARCIA III": { name: "GUS GARCIA III", title: "Date: 28 Mar 2018 Rating: -0.083" } ,
 "NEONTASTER": { name: "NEONTASTER", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "ALAN SKED": { name: "ALAN SKED", title: "Date: 28 Mar 2018 Rating: 0.247" } ,
 "TOM COLLINS": { name: "TOM COLLINS", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "SHADYBOOTS": { name: "SHADYBOOTS", title: "Date: 28 Mar 2018 Rating: 0.050" } ,
 "BANK OF ENGLAND RESEARCH": { name: "BANK OF ENGLAND RESEARCH", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "PAPIKI": { name: "PAPIKI", title: "Date: 28 Mar 2018 Rating: -0.053" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "DANNY ANSON": { name: "DANNY ANSON", title: "Date: 28 Mar 2018 Rating: -0.400" } ,
 "BIGERNMCCRAKEN": { name: "BIGERNMCCRAKEN", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "GUY KILTY": { name: "GUY KILTY", title: "Date: 28 Mar 2018 Rating: 0.800" } ,
 "JOE SHMOE": { name: "JOE SHMOE", title: "Date: 28 Mar 2018 Rating: 0.200" } ,
 "SIALO KIMIRING": { name: "SIALO KIMIRING", title: "Date: 28 Mar 2018 Rating: -0.045" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "POSITIVE MONEY": { name: "POSITIVE MONEY", title: "Date: 28 Mar 2018 Rating: 0.800" } ,
 "KANK THE ANTI OLIGARCH": { name: "KANK THE ANTI OLIGARCH", title: "Date: 28 Mar 2018 Rating: -0.478" } ,
 "TONY FORREST": { name: "TONY FORREST", title: "Date: 28 Mar 2018 Rating: -0.433" } ,
 "CHRIS IVES": { name: "CHRIS IVES", title: "Date: 28 Mar 2018 Rating: -0.062" } ,
 "BANK OF ENGLAND RESEARCH": { name: "BANK OF ENGLAND RESEARCH", title: "Date: 28 Mar 2018 Rating: 0.167" } ,
 "SCHOLAR OF NOTHING": { name: "SCHOLAR OF NOTHING", title: "Date: 28 Mar 2018 Rating: 0.212" } ,
 "GABBYGIRL": { name: "GABBYGIRL", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "JON YATES": { name: "JON YATES", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "JUDAS THOMAS": { name: "JUDAS THOMAS", title: "Date: 28 Mar 2018 Rating: 0.038" } ,
 "MYSNUGGLE_EBOOKS": { name: "MYSNUGGLE_EBOOKS", title: "Date: 28 Mar 2018 Rating: 0.000" } ,
 "DAKOTA REYNOLDS": { name: "DAKOTA REYNOLDS", title: "Date: 27 Mar 2018 Rating: -0.254" } ,
 "S T E V E": { name: "S T E V E", title: "Date: 27 Mar 2018 Rating: 0.200" } ,
 "JIM H": { name: "JIM H", title: "Date: 27 Mar 2018 Rating: 0.062" } ,
 "THE CORNER": { name: "THE CORNER", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "S T E V E": { name: "S T E V E", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "S T E V E": { name: "S T E V E", title: "Date: 27 Mar 2018 Rating: -0.400" } ,
 "GIORGINAS": { name: "GIORGINAS", title: "Date: 27 Mar 2018 Rating: -0.100" } ,
 "TONY": { name: "TONY", title: "Date: 27 Mar 2018 Rating: 0.425" } ,
 "NAH    BABY    NAH": { name: "NAH    BABY    NAH", title: "Date: 27 Mar 2018 Rating: 0.500" } ,
 "ALIN TONCZ": { name: "ALIN TONCZ", title: "Date: 27 Mar 2018 Rating: -0.000" } ,
 "FACTSNOPINIONS": { name: "FACTSNOPINIONS", title: "Date: 27 Mar 2018 Rating: 0.194" } ,
 "STEPHEN IERARDO": { name: "STEPHEN IERARDO", title: "Date: 27 Mar 2018 Rating: 0.500" } ,
 "NATHANIEL    JGUTHRIE": { name: "NATHANIEL    JGUTHRIE", title: "Date: 27 Mar 2018 Rating: 0.195" } ,
 "FXTRADER HUB": { name: "FXTRADER HUB", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "DENNIS USHER": { name: "DENNIS USHER", title: "Date: 27 Mar 2018 Rating: -0.500" } ,
 "AGORACOM GEORGE": { name: "AGORACOM GEORGE", title: "Date: 27 Mar 2018 Rating: 0.200" } ,
 "DANIEL LACALLE": { name: "DANIEL LACALLE", title: "Date: 27 Mar 2018 Rating: -0.071" } ,
 "MIRIAM BRETT": { name: "MIRIAM BRETT", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "ROBERT PEARSON": { name: "ROBERT PEARSON", title: "Date: 27 Mar 2018 Rating: 0.321" } ,
 "POSITIVE MONEY": { name: "POSITIVE MONEY", title: "Date: 27 Mar 2018 Rating: 0.800" } ,
 "K G HOHENSTAUFFEN": { name: "K G HOHENSTAUFFEN", title: "Date: 27 Mar 2018 Rating: -0.450" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "PUR48TED (PRONOUNCED PER-FOR-A-TED)": { name: "PUR48TED (PRONOUNCED PER-FOR-A-TED)", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "VIVEK SRINIVASAN": { name: "VIVEK SRINIVASAN", title: "Date: 27 Mar 2018 Rating: -0.020" } ,
 "LAUREN A JOHNSTON": { name: "LAUREN A JOHNSTON", title: "Date: 27 Mar 2018 Rating: 0.200" } ,
 "ALEXANDER CHENG": { name: "ALEXANDER CHENG", title: "Date: 27 Mar 2018 Rating: 0.025" } ,
 "EDWARD HARRISON": { name: "EDWARD HARRISON", title: "Date: 27 Mar 2018 Rating: 0.217" } ,
 "VASILY NEKRASOV": { name: "VASILY NEKRASOV", title: "Date: 27 Mar 2018 Rating: 0.067" } ,
 "DPLORABLEBSTRD": { name: "DPLORABLEBSTRD", title: "Date: 27 Mar 2018 Rating: 0.135" } ,
 "CHABIS": { name: "CHABIS", title: "Date: 27 Mar 2018 Rating: -0.288" } ,
 "TEODROSE FIKRE": { name: "TEODROSE FIKRE", title: "Date: 27 Mar 2018 Rating: 0.143" } ,
 "ROY TOPOL": { name: "ROY TOPOL", title: "Date: 27 Mar 2018 Rating: 0.375" } ,
 "BIGERNMCCRAKEN": { name: "BIGERNMCCRAKEN", title: "Date: 27 Mar 2018 Rating: 0.350" } ,
 "QUANTMINDS": { name: "QUANTMINDS", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "VANGUARD UK ADVISERS": { name: "VANGUARD UK ADVISERS", title: "Date: 27 Mar 2018 Rating: -0.114" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "NEP-MON": { name: "NEP-MON", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "PRICE ACTION": { name: "PRICE ACTION", title: "Date: 27 Mar 2018 Rating: 0.271" } ,
 "JAMES THORP": { name: "JAMES THORP", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 27 Mar 2018 Rating: 0.000" } ,
 "THEPRODIGALCHAMPION": { name: "THEPRODIGALCHAMPION", title: "Date: 27 Mar 2018 Rating: 0.167" } ,
 "KEN NONEOFURBUSINESS": { name: "KEN NONEOFURBUSINESS", title: "Date: 27 Mar 2018 Rating: -0.062" } ,
 "TREVOR GREEN": { name: "TREVOR GREEN", title: "Date: 27 Mar 2018 Rating: -0.400" } ,
 "SOOTSG": { name: "SOOTSG", title: "Date: 27 Mar 2018 Rating: -0.178" } ,
 "BRANDON REEVES": { name: "BRANDON REEVES", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "DAVID HAMU": { name: "DAVID HAMU", title: "Date: 26 Mar 2018 Rating: 0.186" } ,
 "PAIGE KRISTINSON": { name: "PAIGE KRISTINSON", title: "Date: 26 Mar 2018 Rating: 0.103" } ,
 "EM TAYLOR #FBPE": { name: "EM TAYLOR #FBPE", title: "Date: 26 Mar 2018 Rating: 0.071" } ,
 "KEITH JONES": { name: "KEITH JONES", title: "Date: 26 Mar 2018 Rating: -0.233" } ,
 "DILLON": { name: "DILLON", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "DIMITRIS T ANTONATOS": { name: "DIMITRIS T ANTONATOS", title: "Date: 26 Mar 2018 Rating: 0.119" } ,
 "JAY TROLLSTEIN II": { name: "JAY TROLLSTEIN II", title: "Date: 26 Mar 2018 Rating: -0.500" } ,
 "BREAKS 'N REVS": { name: "BREAKS 'N REVS", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "BERNAS": { name: "BERNAS", title: "Date: 26 Mar 2018 Rating: 0.625" } ,
 "BOOTIFULGREY": { name: "BOOTIFULGREY", title: "Date: 26 Mar 2018 Rating: 0.050" } ,
 "EKEM BRANCH": { name: "EKEM BRANCH", title: "Date: 26 Mar 2018 Rating: 0.329" } ,
 "WIZGICIANBRB": { name: "WIZGICIANBRB", title: "Date: 26 Mar 2018 Rating: 0.034" } ,
 "GUS KUEHNE": { name: "GUS KUEHNE", title: "Date: 26 Mar 2018 Rating: 0.127" } ,
 "EDWARD BROWN": { name: "EDWARD BROWN", title: "Date: 26 Mar 2018 Rating: -0.213" } ,
 "POSITIVE MONEY": { name: "POSITIVE MONEY", title: "Date: 26 Mar 2018 Rating: 0.200" } ,
 "PAUL ROMANO": { name: "PAUL ROMANO", title: "Date: 26 Mar 2018 Rating: 0.100" } ,
 "ZACH RICHARDS": { name: "ZACH RICHARDS", title: "Date: 26 Mar 2018 Rating: -0.002" } ,
 "JOY DOREEN BIIRA": { name: "JOY DOREEN BIIRA", title: "Date: 26 Mar 2018 Rating: 0.300" } ,
 "JANET STEAD": { name: "JANET STEAD", title: "Date: 26 Mar 2018 Rating: 0.390" } ,
 "JASON O'MAHONY": { name: "JASON O'MAHONY", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "SCHOLAR OF NOTHING": { name: "SCHOLAR OF NOTHING", title: "Date: 26 Mar 2018 Rating: 0.300" } ,
 "ROB CARVER": { name: "ROB CARVER", title: "Date: 26 Mar 2018 Rating: 0.100" } ,
 "NEP-EEC": { name: "NEP-EEC", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "THE LIBERTY MACHINE": { name: "THE LIBERTY MACHINE", title: "Date: 26 Mar 2018 Rating: 0.098" } ,
 "MARMADUKEBLACK": { name: "MARMADUKEBLACK", title: "Date: 26 Mar 2018 Rating: 0.050" } ,
 "COLIN": { name: "COLIN", title: "Date: 26 Mar 2018 Rating: -0.075" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "ALISTAIR NICHOLLS": { name: "ALISTAIR NICHOLLS", title: "Date: 26 Mar 2018 Rating: 0.075" } ,
 "AXA IM UK": { name: "AXA IM UK", title: "Date: 26 Mar 2018 Rating: 0.233" } ,
 "CERBERUS RADIO NETWORK": { name: "CERBERUS RADIO NETWORK", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "ETMARKETS": { name: "ETMARKETS", title: "Date: 26 Mar 2018 Rating: 0.000" } ,
 "NIPUN KALRA": { name: "NIPUN KALRA", title: "Date: 26 Mar 2018 Rating: 0.029" } ,
 "DAMARIS COLHOUN": { name: "DAMARIS COLHOUN", title: "Date: 25 Mar 2018 Rating: -0.094" } 

    , "MALCOLM TURNBULL":
    { name: "Malcolm Turnbull"
    , title: "Prime Minister of Australia (Liberal)"
    }

  }
, topics:
  [
       { name: "money", re: /\b(money)\b/gi, x: 608, y: 344 },
       { name: "market", re: /\b(market)\b/gi, x: 55, y: 398 },
       { name: "Obama", re: /\b(obama)\b/gi, x: 50, y: 276 },
       { name: "economy", re: /\b(economy)\b/gi, x: 396, y: 734 },
       { name: "economic", re: /\b(economic)\b/gi, x: 648, y: 300 },
       { name: "Fed", re: /\b(fed)\b/gi, x: 574, y: 830 },
       { name: "US", re: /\b(us)\b/gi, x: 587, y: 131 },
       { name: "year", re: /\b(year)\b/gi, x: 589, y: 253 },
       { name: "interest", re: /\b(interest)\b/gi, x: 33, y: 81 },
       { name: "QE", re: /\b(qe)\b/gi, x: 283, y: 759 },
       { name: "trillion", re: /\b(trillion)\b/gi, x: 323, y: 709 },
       { name: "bank", re: /\b(bank)\b/gi, x: 264, y: 656 },
       { name: "back", re: /\b(back)\b/gi, x: 306, y: 337 },
       { name: "new", re: /\b(new)\b/gi, x: 368, y: 187 },
       { name: "now", re: /\b(now)\b/gi, x: 608, y: 237 },
       { name: "debt", re: /\b(debt)\b/gi, x: 551, y: 43 },
       { name: "inflation", re: /\b(inflation)\b/gi, x: 719, y: 854 },
       { name: "GDP", re: /\b(gdp)\b/gi, x: 878, y: 127 },
       { name: "nothing", re: /\b(nothing)\b/gi, x: 299, y: 728 },
       { name: "Trump", re: /\b(trump)\b/gi, x: 201, y: 75 },
       { name: "people", re: /\b(people)\b/gi, x: 610, y: 4 },
       { name: "look", re: /\b(look)\b/gi, x: 858, y: 418 },
       { name: "rate", re: /\b(rate)\b/gi, x: 243, y: 155 },
       { name: "time", re: /\b(time)\b/gi, x: 430, y: 831 },
       { name: "real", re: /\b(real)\b/gi, x: 267, y: 252 },
       { name: "good", re: /\b(good)\b/gi, x: 449, y: 783 },
       { name: "stock", re: /\b(stock)\b/gi, x: 785, y: 882 }
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
