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

    topic.count += count = count / party.wordCount * 25e3;
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
, "DAVEY CROKETT: the stock market went up under obama because of quantitative easing ie dumping trillions in now its going up because of earnings &amp the #trump effect this is too easy"
, "PAOLO PERINI: _des I hope so Italy needs more quantitative easing hopefully matched with less financial austerity"
, "ESTELLE P ARD: No change to quantitative easing or interest rates as the euro surges against the dollar #Draghi has half an hour to prepare to prepare his anti-Mnuchin routine and talk it back down as best he can"
, "MAKKABA CO. LTD.: Yield on 10-year Japanese Govt Bonds edge lower as BOJ shoot theories of early reduction in quantitative easing.. https://t.co/XVyU1pCH9R"
, "MAKKABA CO. LTD.: Yield on 10-year Japanese Govt Bonds edge lower as BOJ shoot theories of early reduction in quantitative easing ##BoJ ##bonds ##central_banks ##fundamental_analysis ##politics ##usdjpy https://t.co/qfBaA8tITe https://t.co/N2o8gspEMq"
, "TOM BARFIELD: No change to quantitative easing or interest rates as the euro surges against the dollar #Draghi has half an hour to prepare to prepare his anti-Mnuchin routine and talk it back down as best he can"
, "LAURA P REZ-CEJUELA: Mario Draghi's job today will be to calm the speculative chatter and reassure everybody that the ECB is not going to walk away from quantitative easing just yet https://t.co/SNYcWAyrmm"
, "HEIKO VOIGTS: Some Macro Economics for dummies (like me How quantitative easing works (it's like printing money but more subtle) https://t.co/kKF9dA0VPu"
, "JEAN COMTE: Mario Draghi's job today will be to calm the speculative chatter and reassure everybody that the ECB is not going to walk away from quantitative easing just yet https://t.co/SNYcWAyrmm"
, "HALIM  ZBERRAK: European Central Bank officials are arguing over their next moves in the context of a strong Eurozone economy some officials want to head towards a wind-down of quantitative easing soon others are more cautious https://t.co/8CvzT30hIv via"
, "SHAIKH ABDUL KABIR: #QE Quantitative Easing ... the introduction of new money into the money supply by a central bank."
, "MAKKABA CO. LTD.: Yield on 10-year Japanese Govt Bonds edge lower as BOJ shoot theories of early reduction in quantitative easing.. https://t.co/41PHuvXJDW"
, "MAKKABA CO. LTD.: Yield on 10-year Japanese Govt Bonds edge lower as BOJ shoot theories of early reduction in quantitative easing ##BoJ ##bonds ##central_banks ##fundamental_analysis ##politics ##usdjpy https://t.co/DwEIYaBz0g https://t.co/mu7mHzGzl9"
, "PETER PETER: BofE quantitative easing (almost 500bn is part of the national debt It was money created and pumped into the markets it mainly benefitted the 1 who own stocks and shares and the reason why they have ultra-rich have doubled their wealth since 2008 https://t.co/4zbtyGiB80"
, "HOT_COVFEFE: The ONLY reason stocks were holding their own w Obozo in power was because the Fed was printing TONS of money...called Quantitative Easing."
, "JOHN LOCKE: BofE quantitative easing (almost 500bn is part of the national debt It was money created and pumped into the markets it mainly benefitted the 1 who own stocks and shares and the reason why they have ultra-rich have doubled their wealth since 2008 https://t.co/4zbtyGiB80"
, "DAILY NEWS: 'Why Strong Growth Is a Headache for the European Central Bank by JACK EWING via NYT https://t.co/LJCpJxQjIZ Keywords Quantitative Easing Banking and Financial Institutions https://t.co/NfTabkniGe"
, "JACK EWING: Mario Draghi's job today will be to calm the speculative chatter and reassure everybody that the ECB is not going to walk away from quantitative easing just yet https://t.co/SNYcWAyrmm"
, "WHY HAS EVERYONE MADE THEIR NAME SO LONG?: Radio 4 talking about the dollar vs the euro and quantitative easing It's too early for this."
, "YOUNG CORPORATE: Look I have studied economics and you then tell me I need to brush up on monetary theory Friedman postulates that all expansions in the money supply (aka printing money or quantitative easing are necessarily inflationary Thus my original point about inflation"
, "FOUNDING DUDE: Interest rates and monetary policy are barely changed over the last 12 months Quantitative easing ended under Obama."
, "VINCENT SLATER: The only Trickle Down Economics is the cheap credit available through monetary policy and quantitative easing This is where quite literally first receivers of new money are able to lend it with all the liquidity in the world with little concern."
, "SARA #PCPEU #NHSLOVE: There was no problem affording the £435 billion in quantitative easing of financial markets No one says money won't help when they make the rich even richer."
, "OFFTHETOP: Krugman is the #1 perp of derp Quantitative easing and a 0 prime created the new normal of 1.5 GDP It wasn’t a solution it was a holding pattern to disguise a faulty solution Now that the economy is taking off he can only point fingers at the past https://t.co/SXkUkmxAIS"
, "MIHR THAKAR: In his paper Quantitative Easing Entrance and Exit Strategies Alan S Blinder reasons that Quantitative Easing is mostly looked at as something aberrant https://t.co/xJ3gbQyrGh"
, "HUURACTIEBREDA: QUANTITATIVE EASING THE RICH"
, "JUSTIN MAGNER: You can't praise for digging us out of the Great Recession through Quantitative Easing without acknowledging that QE was the biggest contributor to wealth inequality in American history."
, "JEREMY GAVINS: Regarding all this money the top 1 have accumulated has the figure got anything to do with the billions pumped into the bottomless pit called Quantitative easing which seems to have disappeared somewhere?"
, "CLAYTON HOLMES: Special council is the new quantitative easing"
, "OLD WHIG: _pontin BTW 2009-12 Quantitative Easing was a first order cause One of the most massive wealth redistributions in post war period 90 of wealth creation went to top 1% Underpinned by regulations that already had caused oligopolies in Finance Energy Utilities occupational licensing"
, "PERIKLIS FERESIADIS: What must be done to achieve 3.3 unemployment Create large funds in USA and the Euro-zone financed by quantitative easing and use them to cut taxes and increase social welfare benefits for the people not the bureaucracy https://t.co/ISbzscrctX"
, "BOOMS AND BUSTS SHOW: The BoE is not independent lol Brown changed inflation remit and darling overrode MPC in fin crisis Quantitative easing is also government debt cancelling which is why the states debt that people quote is redundant https://t.co/2QiHGH0JbR"
, "ANDREW: _dsa Whilst I agree with you what the FED did with tarp was effectively writing a check to sure up a failed economic system. The fed issuing currency to wall st through quantitative easing and direct 0 loans is also basically writing checks. Current practice can't continue."
, "BASEDMUHAMMAD: Exactly what are those Obama policies that boosted our economy Quantitative easing Isn’t growth"
, "KIKO: _REPORT Real growth not made up of Monopoly money ��� that demoncrats would dump into the market under quantitative easing that weekend America"
, "SIR BRADLEY RICHARD: In his paper Quantitative Easing Entrance and Exit Strategies Alan S Blinder reasons that Quantitative Easing is mostly looked at as something aberrant https://t.co/xJ3gbQyrGh"
, "BEATRIZ CAICEDO: If financial crisis banks get support through «quantitative easing» If social crisis business gets support through «qualitative easing» Gimme a break Heads I win tails you lose How about just giving people money Worked for the banks https://t.co/IVp78Xe5bB vía"
, "FELIX ALVARADO: If financial crisis banks get support through «quantitative easing» If social crisis business gets support through «qualitative easing» Gimme a break Heads I win tails you lose How about just giving people money Worked for the banks https://t.co/IVp78Xe5bB vía"
, "GONZALO MONROY: The whole 'weaker U.S dollar is an euphism for sofisticated 'quantitative easing'. Cheap dollar in the end."
, "MASKANI YA TAIFA: In his paper Quantitative Easing Entrance and Exit Strategies Alan S Blinder reasons that Quantitative Easing is mostly looked at as something aberrant https://t.co/xJ3gbQyrGh"
, "SINGH: In his paper Quantitative Easing Entrance and Exit Strategies Alan S Blinder reasons that Quantitative Easing is mostly looked at as something aberrant https://t.co/xJ3gbQyrGh"
, "CRAIG MCLAREN: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "RODRIGO FERNANDEZ: Important corporate bond purchases use of the ECB's balance sheet to promote market-based finance For securitisation the ECB's approach was even more aggressive institution-building collateral easing quantitative easing and regulatory easing. -&gt https://t.co/ZYLFZvJbtF https://t.co/uO6LZ0DBGi"
, "ALEXANDER FOX: You could combine the concepts of corporate accountancy molecular biology and quantitative easing into a single PowerPoint slide and I’d still find it more interesting and understandable than the #UEFANationsLeague. #bbcfootball"
, "JOE BEATTIE: Near zero interest rates,quantitative easing are acedemic excersizes in theory Unloading all those bonds,maybe best to have someone a little more practical in charge?"
, "RAJAN DHALL MSTA: The BoE is not independent lol Brown changed inflation remit and darling overrode MPC in fin crisis Quantitative easing is also government debt cancelling which is why the states debt that people quote is redundant https://t.co/2QiHGH0JbR"
, "DAVID BELLE: The BoE is not independent lol Brown changed inflation remit and darling overrode MPC in fin crisis Quantitative easing is also government debt cancelling which is why the states debt that people quote is redundant https://t.co/2QiHGH0JbR"
, "STANISLAS JOURDAN: Important corporate bond purchases use of the ECB's balance sheet to promote market-based finance For securitisation the ECB's approach was even more aggressive institution-building collateral easing quantitative easing and regulatory easing. -&gt https://t.co/ZYLFZvJbtF https://t.co/uO6LZ0DBGi"
, "BENJAMIN BRAUN: Important corporate bond purchases use of the ECB's balance sheet to promote market-based finance For securitisation the ECB's approach was even more aggressive institution-building collateral easing quantitative easing and regulatory easing. -&gt https://t.co/ZYLFZvJbtF https://t.co/uO6LZ0DBGi"
, "RICHARD PHILLIPS: _Beagle _brexit _trickett _blog 'The money is created digitally' that doesn't answer where it came from Sounds very much like 'out of thin air or from the 'Magic Money Tree' AFAIK banks can't lend out reserves! seems to agree https://t.co/bRC024gupm"
, "MAKKABA CO. LTD.: Yield on 10-year Japanese Govt Bonds edge lower as BOJ shoot theories of early reduction in quantitative easing.. https://t.co/esBkyygwPg"
, "MAKKABA CO. LTD.: Yield on 10-year Japanese Govt Bonds edge lower as BOJ shoot theories of early reduction in quantitative easing https://t.co/OwwWhCwExv"
, "MAKKABA CO. LTD.: Yield on 10-year Japanese Govt Bonds edge lower as BOJ shoot theories of early reduction in quantitative easing https://t.co/x6w7HoGHoA"
, "ERIC BLYLER: In defense of the skeptics the broad and hazy reach and legacy of Quantitative Easing is not yet clear But yeah what a bunch of partisan douchebags."
, "SCIRP PAPERS: Exploring Solutions for the Negative Impact of US Quantitative Easing on Taiwan #GlobalImbalance More https://t.co/JqMc26HYOX"
, "FORTUNE COOKIE: Trickery without structural change at Davos economist Prof William White puts it in plain language '...central banks launched the huge social experiment of QE [quantitative easing with carelessly little thought about the side-effects... https://t.co/ubdHxKTHGl"
, "RAHIM: The crypto markets needs Quantitative easing lol"
, "THE CRYPTO KID: Central banks and quantitative easing lmao uh oh"
, "NDER KARAO LANO LU: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "#HUSKERS: _First _Patriot _tim _USMC _USA_2016 You lose https://t.co/Anc0UzKCzm"
, "ALEX (A.J.): President Trump’s nominee to head the Federal Reserve Jerome Powell has been confirmed by the United States Senate Good choice Not as opposed to disastrous quantitative easing as I’d like but good choice."
, "#HUSKERS: _First _Patriot _tim _USMC _USA_2016 Really Quantitative easing mean anything to you?"
, "NHSGECONOMICS: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "BULLDOG: Mika got Joe flip flopping and say things he never said when Trump was running for office Obama’s growth came from quantitative easing and taxpayers Obamacare nightmare still going on and no one knows exactly how the paying the money back from QE 1-4 is going to work out .😍"
, "CHRISTIAN: Yeah that's from Fed Reserve Quantitative Easing Flooding investment banks with cheap at .325 overnight rates."
, "GHULAM NABI: Deeply dishonest Tories You must know that there really is a magic money tree of sorts the one that conjured up £435 billion in reserves for quantitative easing to boost the stock market the extra billion in bribes for the DUP corporate welfare for the likes of Virgin etc."
, "SOCIOBLAH   #PCPEU: Deeply dishonest Tories You must know that there really is a magic money tree of sorts the one that conjured up £435 billion in reserves for quantitative easing to boost the stock market the extra billion in bribes for the DUP corporate welfare for the likes of Virgin etc."
, "HOPENOTFEAR #NHSLOVE: Deeply dishonest Tories You must know that there really is a magic money tree of sorts the one that conjured up £435 billion in reserves for quantitative easing to boost the stock market the extra billion in bribes for the DUP corporate welfare for the likes of Virgin etc."
, "MATTHEW A THOMPSON: 'We need the social equivalent of quantitative easing #WEF18 https://t.co/10HqlJcCPU"
, "JENNY CHEN: Probably not of case of the markets rewarding the rich as much of a byproduct of the fed gov pouring 2 trillion into big bank via quantitative easing and other stimulus packages All this goes to cheap loans (for companies) cheap credit (for shoppers) https://t.co/p1E9TGNmdG"
, "CAROLINE LEWIS: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "JAMES MACEACHERN: It has fallen though and still hasn't recovered Quantitative easing isn't a long term fix The central bank can't just continually print new money to buy back UK's bonds (debt without consequences."
, "RICHARD FIELD: _Blanchflower Reminds me of Bernanke and his push for zero interest rate policies and quantitative easing Neither of which addressed the underlying problem of excess debt in the financial system but both of which did create problems for the real economy."
, "JAMES MACEACHERN: The Tories also have to be blamed for their chosen way of handling the situation The quantitative easing mainly happened under the Tories and they have greatly increased UK's debt although they have reduced the deficit but in a damaging way."
, "CONGRESS WEALTH MGMT: The Fed commenced quantitative easing in 2011 so it's taken 5 years of somewhat coordinated money printing/bond buying to drive more than $14 trillion of sovereign debt to negative yields If it took five years to do that it may take a decade to unwind it perhaps longer https://t.co/2zLWzLznNC"
, "CHARLIE ALPHA: You can't make this shit up The same people that cry about wealth inequality laud the very policies since 2009 that has sent nearly all wealth creation to top 1 % Quantitative Easing https://t.co/LFRLuHFECg"
, "FESTUS BREW QUANSAH: 'Today I believe we need the social equivalent of quantitative easing a new social contract that provides what we might term “qualitative easing for societies struggling with the realities of a transforming world.'......Prof Schwab to participants of 2018"
, "JAMES MACEACHERN: Main reason why it's affordable is because the UK's relied on £435bn of quantitative easing which has involved the Bank of England purchasing UK gilts on the second hand market so that UK Gov is effectively paying servicing costs of those gilts to itself That has consequences."
, "VYKROMOND: glad they sorted out quantitative easing lol.. looking forward to the crypto volcker rule!"
, "ARB: You can't make this shit up The same people that cry about wealth inequality laud the very policies since 2009 that has sent nearly all wealth creation to top 1 % Quantitative Easing https://t.co/LFRLuHFECg"
, "ATENEA: You can't make this shit up The same people that cry about wealth inequality laud the very policies since 2009 that has sent nearly all wealth creation to top 1 % Quantitative Easing https://t.co/LFRLuHFECg"
, "OLD WHIG: You can't make this shit up The same people that cry about wealth inequality laud the very policies since 2009 that has sent nearly all wealth creation to top 1 % Quantitative Easing https://t.co/LFRLuHFECg"
, "TWIDERPADER: These bankers have been making an absolute killing for the last decade There was absolutely no need to give them a break on taxes The responsible thing to do was to pay down the debt by taxing these bankers that took nearly all the benefits from Fed Reserve quantitative easing"
, "AARON PORTER: _This_Week _Mar_016 _tiny Waiting for him to 'level' with the American people He knows that our economic bubble is going to burst soon &amp the dollar is going to crash if Federal Reserve doesn't resume the quantitative easing that they were doing during the Obama years (2)"
, "OZRENV: 2-as a result of Quantitative Easing of the last decade when over 50 Trillion got printed &amp pumped out Large Corp are drowning in cash with nowhere safe to invest."
, "JAMES MACEACHERN: England can't even cover its own expenditure never mind loan anything to Scotland I've already explained this to you The UK has been bailed out twice it has £1.8tr debt and is relying on £435bn of quantitative easing Are you suggesting that the UK shouldn't be independent?"
, "CHAUNCEY TURMAN: _S_1967 Remember quantitative easing Obama &amp the federal reserve printed over $80 billion/month for years...taxpayer funded gov't debt Sure looks like wall st was propped up with loans we have to pay back Note after WWII Pres Truman (D was anti-communism Obama (D)....mehhh https://t.co/MjmKcvmE1v"
, "WELSH TREASURY: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "JEFF GROLL: Now growth is organic Corporations having their taxes cut are investing more in the U.S. Jobs are coming back here Also stock market was propped up during Obama admin with all of the quantitative easing."
, "ANDY SMITH #FBPE: _Bad_John_4 _foster _ron _three _Chigley _Vaporium _Josserand _Chapman101 _Leaver No but then you wouldn't understand my dear friend! Why do you have to revert to personal attacks is that all you have. Just one point the economy is doing better than expected because of massive quantitative easing who is paying for all that in the long run?!"
, "LAURA SANDISON: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "MARY JUDAH: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "VIRGIL: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "ANNA MARIE: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "HMS: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "SUN: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "CARL DEVITT: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "ATARAXIA INVESTMENTS: On the bright side this gives us insight into the diminishing rate of return with quantitative easing as a microcosm of Central Banks and global financial markets https://t.co/0wZDdfEKhK https://t.co/0wZDdfEKhK"
, "VERNER VERASS: 'Quantitative easing has a way of adding zeros to invent large sums of money where there was none before. If persons other than a government does it it's called counterfeiting https://t.co/iW4bzTiLJk"
, "ANDREW MUNDELL: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "MIKI LEIGH: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "FRANK0_1962: Ok explain the stock market the only reason the market grew on your Obama was due to quantitative easing Obama's economy never got close to 3 in fact it was stagnant under Obama"
, "RICHARD CAMPBELL: Excellent blog from colleagues showing the power of #FlowofFunds statistics Using Flow of Funds to measure the effects of Quantitative Easing https://t.co/rbukjxaC02"
, "IVAN K COHEN: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "MARIANNE SENSIER: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "LC: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "PETER NOYES: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "SI EGAN: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "CHRIS PAPADOPOULLOS: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "J: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "PETER WHITEFORD: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "DINA MEDLAND: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "DOORUJ RAMBACCUSSING: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "DIANE COYLE: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "ONS: We’re using Flow of Funds statistics to show how the cash created through Quantitative Easing moved around the economy and changed the holdings of financial institutions Read our latest blogpost https://t.co/9m8ePm88FT"
, "BENJAMIN JONES: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "TRUMPEANS.COM: You are right about this Steph When you look at the unheard of quantitative easing efforts and the FACT our nations debt grew more under Obama than all previous presidents COMBINED it should be apparent We cannot tax print money and borrow our way out."
, "FT SPECIAL REPORTS: We need the social equivalent of quantitative easing a new social contract https://t.co/chFPEHWGhI"
, "MATTHEW JERVOIS: Last year we spoke to former #pensions minister Baroness Altmann about how quantitative easing has created a time bomb for many savers #QE https://t.co/aZRI1c3y3O"
, "2GLOCKS: Haha here is the average drone opinion on the economy. Has no clue what quantitative easing is basket of SDR or the CIPS payment system."
, "SHORTORLONG: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "JACK PARKER: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "CHRISTOPHER RUCINSKI: I liked a video https://t.co/rVFnwcQJEy Economics explainer What is Quantitative Easing?"
, "JOHN HAMPSHIRE: #global #economy If the world thought there would be no negative consequences of quantitative easing some think otherwise https://t.co/xI6dk5JE9N"
, "RICH FERGUSON: pump 9 trillion into economic debt and use the unconventional monetary policy of Quantitative easing to lower interest rates and increase the money supply is as much fiscal leadership as Viagra is to fertility."
, "NATHAN KANABROCKI: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "NICK AND NATE DIAZ: Partially right but all that quantitative easing we did is finally catching up We have degraded purchasing power and foreign lenders are going to pick this up and evaluate Owning any u.s currency atm is like having a bullseye on your back."
, "WOUTER VOS: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "JOONG KIM: I agree Ronnie In a world of autocracy and quantitative easing where the central banks around the world destroy value I think precious metals bitcoin and commodities are the only way to hedge In a system of debt one of the two parties is always the slave."
, "LEONARD MARQUEZ: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "TAMMY QUACKENBUSH: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "HARRY PARSONS: The Federal Reserve gave the biggest banks $85 billion dollars a month for seven years under Barack Obama known as quantitative easing This is after the Federal Reserve had a bailout (TARP that was so large the down payment was $27.5 trillion."
, "ANN BANKS: The Federal Reserve gave the biggest banks $85 billion dollars a month for seven years under Barack Obama known as quantitative easing This is after the Federal Reserve had a bailout (TARP that was so large the down payment was $27.5 trillion."
, "ROTH BARBARIAN: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "JAY BROWN: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "PETER CLUSKEY: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "RICHARD C BALLANTYNE: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "LARS SCHALL: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "ANN CARRIAGE: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "MONICA HENRY: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "VICTORIA: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "ROB JONES: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "JHOON: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "LYRICAL ESTATE AGENT: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "PERCY BROWNE: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "EL JEFE GRANDE: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "CRAIG DAVID HOVEY: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "GIZZTER MCFACE: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "JASON HIVES: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "POLITICS IR: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "SNAKE OIL BARON: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "NUNYA BIDNESS: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "CASEJJ: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "NICK THIELMAN: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "LJS MCCULLY: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "MIKAEL FROM: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "LOCKEAN LIBERTARIAN: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "ELCUERVO: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "ANNETTE ASHLEY     FREE SPEECH=DEMOCRACY #WATON: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "HORUS: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "PETER DONALDSON: Deeply dishonest Tories You must know that there really is a magic money tree of sorts the one that conjured up £435 billion in reserves for quantitative easing to boost the stock market the extra billion in bribes for the DUP corporate welfare for the likes of Virgin etc."
, "CLEM: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "ANGELUS CAELIS: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "MICHAEL: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "DAVID BELLE: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "1 780-910-1715: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "SEAN: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "ALCIBIADES GREGORIO: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "BERNHARD HAMMER: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "OPPENHEIMERS BLOCKCHAINMEMO: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "HALBERSTRAM: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "ANDY ANDERSON: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "PAUL REDMOND: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "RO3041: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "DDEBURGEN: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "BRIAN CORBETT: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "WILLY WHEELIE BIN: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "TOUGH DELTA: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "VELOMARC: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "DIDACLOPEZ: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "PICASSO;: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "NON-SEQUITUR.CO.UK /GAB/: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "J T FUENTES: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "DAVID MCKAY: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "HAMZA: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "RAPHA L GUIONNET: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "CONSERVATIVE OF AZ: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, "MARK: Since '08 Keynesian economists have said we need lower interest rates more quantitative easing more regulation &amp more government spending. This is exactly what caused the crash! It's akin to drinking yourself sober. We warned them They didn't listen https://t.co/zS3xFY7W1J"
, ": If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "PRAGMATIC CULTURE: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "TONY MOBBS: 'The power to create money a public good which works to serve society rather than burderning it with more and more debt This could be done through Sovereign Money Creation or “quantitative easing (essentially creating new money for people” https://t.co/QVe7u73vRC"
, "TRADESIFT: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "DSTOLLER: Janet Yellen’s 4yrs as Federal Reserve Chair ends on 1/31/18 During which the central bank implemented 5 rate hikes and began reversing the $4 Trillion of bond purchases from 2008‐14 during “Quantitative Easing, a innovative program started under Bernanke"
, "DAVE EBNER: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "ANARCHIST PUNK DAD: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "CHUCK MORRISON: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "HAMZA: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "CHERSKOUBO: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "TONYKELLY: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "HELEN PICKARD: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "MURAD MAHMUDOV: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "CHATHAM HOUSE: 'While austerity programmes lowered the support available for those at the bottom of the income distribution quantitative easing artificially inflated the prices of many financial assets rewarding the usually already wealthy holders of these assets. https://t.co/COmV2dGleV"
, "BURNOUT_: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "ALP SERMET: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "J.S FARINET: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "LORD Y: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "VOLPE: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "WHOKNOWS: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "HUEGELKIND: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "ROGER WINDHORST: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "KELLIE LARSON: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "NARNFAN: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "ROTHBARDIAN: If Oxfam wasn’t economically illiterate they would realize that central banks are the main reason for the widening income gap Inflation quantitative easing bank bailouts and corporate bond buying benefit the rich not the poor https://t.co/2Go4y9g3v1"
, "MRS PRIM: The Federal Reserve gave the biggest banks $85 billion dollars a month for seven years under Barack Obama known as quantitative easing This is after the Federal Reserve had a bailout (TARP that was so large the down payment was $27.5 trillion."
, "JULIESKYRED: 'The power to create money a public good which works to serve society rather than burderning it with more and more debt This could be done through Sovereign Money Creation or “quantitative easing (essentially creating new money for people” https://t.co/QVe7u73vRC"
, "RAKESH: 3 cool concepts in this article 1 Bitcoin/crypto has value 2 Bitcoin isn't going to zero 3 The rise of crypto is tied to quantitative easing (2008 #bitcoin #blockchain https://t.co/E99adFbsko"
, "JOSHUA KONKLE: 3 cool concepts in this article 1 Bitcoin/crypto has value 2 Bitcoin isn't going to zero 3 The rise of crypto is tied to quantitative easing (2008 #bitcoin #blockchain https://t.co/E99adFbsko"
, "STEVEN: Great read about unintended consequences HT https://t.co/8l9m2NnqKW"
, "CHET HAMBY SR.: The Federal Reserve gave the biggest banks $85 billion dollars a month for seven years under Barack Obama known as quantitative easing This is after the Federal Reserve had a bailout (TARP that was so large the down payment was $27.5 trillion."
, "#ALPSTWT: The Federal Reserve gave the biggest banks $85 billion dollars a month for seven years under Barack Obama known as quantitative easing This is after the Federal Reserve had a bailout (TARP that was so large the down payment was $27.5 trillion."
, "MATTHEW RAGNOLI: 'The power to create money a public good which works to serve society rather than burderning it with more and more debt This could be done through Sovereign Money Creation or “quantitative easing (essentially creating new money for people” https://t.co/QVe7u73vRC"
, "ALLEN OWENS: How Quantitative Easing Works https://t.co/hAdZ46cCqw #trickledowneconomy (haha does it #richgetricher #Toryfails"
      ]
    }
  , { name: "republican"
    , speeches:
      [
        "MALCOLM TURNBULL: " +
        "Thank you, thank you very much.\n",
, "DYLAN YOUNG: Thank Obama after 8 years of quantitative easing which is basically the same as printing money."
, "WILLIAM EVANS: I was a victim of Quantitative Easing Can we sue?"
, "WIL IWILL: Keep spending 30billion a month on quantitative easing keep bailing out a broke and discredited Greece and hope to wangle loads of money from the UK for eternity... It's a ponsy scheme that needs to end to save EUROPE not the eu!! https://t.co/YBYkLp7iMm"
, "JDIRT#RELEASETHEMEMO: Why did some of them rely on quantitative easing?"
, "TONY RUSI: China's Economy and Currency and US Dollar weakness from end of quantitative easing and Trump policy https://t.co/dpnfJWEl9L"
, "DOLLAR STORE COWBOY: *Barry white voice quantitative easing"
, "DOLLAR STORE COWBOY: Is that like quantitative easing of Bitcoin via tether"
, "JAN WILDEBOER: I do wonder if QE (quantitative easing and the #cryptocurrency valuation hype/bubble are somehow connected It might not be at all Maybe it's correlation only."
, "SAEED: Scarcity and Spotlight Effects on Term Structure Quantitative Easing in Japan https://t.co/OLfRtvlHNQ #QuantLinkADay"
, "STUART W: I've read a lot of Keynes That doesn't change that capital controls are a defined thing If you mean something else then don't use the term 'capital controls' Just like I wouldn't call it 'quantitative easing because it isn't that and would lead to me looking a fool."
, "LISA COSTA: _hanke I agree ...this currency crisis will continue as the dollar drops in value People are just standing around as there wealth is being diminished with quantitative easing ��� when will the masses start waking up"
, "NK GAMBOA ROSALES: Stable China Economy and reserve currency goal Weak US dollar policy China economy passing by 2020 https://t.co/2uwcbU9sbF #Innovation"
, "CAROL CLEGG: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "ANTI SOCIAL: How can you analyze this correctly but get every other topic 100 wrong? You didn't criticize: Iraq war Afghanistan war Syria war Yemen war Pakistan Somalia Libya Or the bailout of Wall Street +$4.5 Trillion quantitative easing Or BLM Or Occupy Or No DAPL Or Income Inequality"
, "ALBERT YEFIMOV: Stable China Economy and reserve currency goal Weak US dollar policy China economy passing by .. https://t.co/8hXEYQQeyb"
, "LOWELL THE BERNER: How can you analyze this correctly but get every other topic 100 wrong? You didn't criticize: Iraq war Afghanistan war Syria war Yemen war Pakistan Somalia Libya Or the bailout of Wall Street +$4.5 Trillion quantitative easing Or BLM Or Occupy Or No DAPL Or Income Inequality"
, "ALBERT YEFIMOV: China’s Economy and Currency and US Dollar weakness from end of quantitative easing and Trump .. https://t.co/XXgDVOLFnE"
, "MATHEW CRAWFORD: Or quantitative easing and the rise of bitcoin have weakened the dollar. #BuyBitcoin"
, "TOP SOULJA: China’s Economy and Currency and US Dollar weakness from end of quantitative easing and Trump policy https://t.co/zZJe0nkVF6 #iot #fututre https://t.co/1xUF2phE6v"
, "MIRAJISH: China’s Economy and Currency and US Dollar weakness from end of quantitative easing and Trump policy https://t.co/zZJe0nkVF6 #iot #fututre https://t.co/1xUF2phE6v"
, "NEXTBIGFUTURE: China's Economy and Currency and US Dollar weakness from end of quantitative easing and Trump policy https://t.co/dpnfJWEl9L"
, "WENDY JOY: All eyes on the ECB on 25 Jan 2018 #ECB #EUR #EURUSD •The interest rate decision will be announced by ECB and is expected to remain at 0.0% •The focus is on the future of ECB’s rate hike path or the Quantitative Easing (QE program https://t.co/h4TwmnCD6k"
, "JOHN HOWARD: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "ETO MARKETS: All eyes on the ECB on 25 Jan 2018 #ECB #EUR #EURUSD •The interest rate decision will be announced by ECB and is expected to remain at 0.0% •The focus is on the future of ECB’s rate hike path or the Quantitative Easing (QE program https://t.co/h4TwmnCD6k"
, "ALLAN: Tether is doing quantitative easing At least the crypto play version of it Let me explain."
, "DAVIDC: _sable Has the CBO ever been correct once Answer Nope... Talk to me about Obama's policy of quantitative easing and monetizing debt $12 TRILLION... Don't do the history of now..."
, "GENTIL   PL R ME: _negi _002 _will _Ro _Geekthulhu The massive financial bubble which started popping w the subprime crisis but was reinflated with hysterical quantitative easing &amp such."
, "JORGE M: Then if you hate low taxes so much you can donate to the IRS If you love Big Gov and Socialism you can always move to Cuba I mean stop the nonsense already 3 GDP growth in consecutive quarters and inching to 4 without having to print trillions with Quantitative Easing"
, "GERRY MARTIN: Quantitative Easing Of Solace #MakeAFilmCheaper"
, "EPSTEIN'S MOTHER: _Dude Return to your virtual world where quantitative easing was a pro-growth strategy"
, "MARCHELLA: _IsJohn PMs precious metals QE Quantitative Easing BTFD Buy the fucking dip FRNs federal reserve notes FX Foreign Exchange ZIRP Zero Interest Rate Percentage NIRP Negative Interest Rate Percentage FRB Fractional Reserve Banking Will help when navigating econ twitter"
, "DAVIDC: 80 billion a month into the market under Quantitative easing The last injection was October 2016 This included several $1Trillion injections over 8 years They have done Zero under Trump and also raised the rate 3 times The market was fake under Obama Hints why -"
, "CARL DEVITT: Role on the death of the EU It's bust it's pension scheme is bust it's banks are trillions in bad debt and only surviving by quantitative easing it's not democratic and ruled by unelected trash that answer to nobody but themselves and probably Rothchilds or Soros"
, "MITCHELL COGERT: I spoke with Vincent Reinhart Chief Economist to preview 's presentation at the upcoming Insurer Investment Forum “#QuantitativeEasing Past Present and Future. Watch here https://t.co/ZPRBzmVto2 https://t.co/P0qpDQtNSi"
, "KEVIN TIERNEY: Audit the fed and consider ending it entirely It is already political with currency manipulation and quantitative easing"
, "BAGCHI: You are wrong That is an awfully written article that conflates quantitative easing with bailouts written by a travel writer citing no facts and with no mention of GS."
, "DROPTHEBALL: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "TRISH MCGREGOR: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "LMS: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "ALTON COGERT: I spoke with Vincent Reinhart Chief Economist to preview 's presentation at the upcoming Insurer Investment Forum “#QuantitativeEasing Past Present and Future. Watch here https://t.co/ZPRBzmVto2 https://t.co/P0qpDQtNSi"
, "CRYPTOVALEUR: Anyone else get the feeling that #cryptocurrency will make quantitative easing look like child’s play? #btc #bitcoin #crypto"
, "ARUPA TESOLIN: Anyone else get the feeling that #cryptocurrency will make quantitative easing look like child’s play? #btc #bitcoin #crypto"
, "JUSTIN MAGNER: You mean Obama's Quantitative Easing that was the chief contributor to the economic inequality you are apparently rallying against today?"
, "SUE WHITTINGHAM: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "TIMOTHY BAIR: And the FED is ticked because it keeps INFLATION in check...and throws wrench in their schemes to hide years and trillions in 'quantitative easing with 'quantitative tightening and usurpation of Treasury and Congress SOLE CONSTITUTIONAL fiduciary authority‼️"
, "FLAP ZAPPA #FBPE FOREVER BREXIT PRO EXIT: _A_Flap _174 By QE does he mean Queen Elizabeth or Quantitative Easing Presumably by the FTSE he means the index which is just a number not sure how it can also be a cheap debt bubble."
, "KEVIN TILDSLEY: _A_Flap _174 By QE does he mean Queen Elizabeth or Quantitative Easing Presumably by the FTSE he means the index which is just a number not sure how it can also be a cheap debt bubble."
, "STUPID SIMPLE CRYPTO: If banking wasn't highly speculative quantitative easing would have been unnecessary Also housing bubble would have never happened"
, "CRYPTOGRABBER: Financial inequality rooted in quantitative easing policy Simon Dixon debates https://t.co/qKv7TyO2Wt https://t.co/JBl6Np7Tl4"
, "JAN HUNTER: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "AYAN DOSS: #RT If Quantitative Easing (QE is inflationary in theory but deflationary in practice will Quantitative Tightening (QT have the opposite effect (13D Research https://t.co/ykt4xoj2LK"
, "BEAMING PENGUIN: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "BREXIT WATCH: Current Quantitative Easing related figures Gilt purchases £434.96 billion Corporate bond purchases £9.89 billion Loans made through the Term Funding Scheme £103,28 billion https://t.co/SZ0miCipDd"
, "SCUGNIZZO60: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "ZAC NATE: Quantitative easing policies has left us with worthless money in savings . inflation is biting !!"
, "OLD WHIG: _pontin Do you agree that Quantitative Easing has worsened wealth inequality in the US and EU?"
, "TED CLUBBERLANG: UK deficit will have to rise by over £20 billion once losses accruing from Quantitative Easing are taken into account https://t.co/bgEPNfHopL"
, "SILLY MILLY: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "IRINA: UK deficit will have to rise by over £20 billion once losses accruing from Quantitative Easing are taken into account https://t.co/bgEPNfHopL"
, "MARK BROWN: UK deficit will have to rise by over £20 billion once losses accruing from Quantitative Easing are taken into account https://t.co/bgEPNfHopL"
, "LARRY: UK deficit will have to rise by over £20 billion once losses accruing from Quantitative Easing are taken into account https://t.co/bgEPNfHopL"
, "DIANE JAMES MEP: UK deficit will have to rise by over £20 billion once losses accruing from Quantitative Easing are taken into account https://t.co/bgEPNfHopL"
, "DAVE ROBERTS.: Gilts held under Quantitative Easing had a market value of £536 billion last February Since then the market has lost 4 in value implying a £20 billion loser for the Treasury Taxes up public sector cuts or bigger deficit Tell us"
, "WENDY PUERTO: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "FIRE PROJECT: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "DIANE JAMES MEP: Gilts held under Quantitative Easing had a market value of £536 billion last February Since then the market has lost 4 in value implying a £20 billion loser for the Treasury Taxes up public sector cuts or bigger deficit Tell us"
, "MARK BROWN: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "SHARON NASH-UPTON: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "MUMMYGIRL BEV STEIN: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "UKIP TAMWORTH: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "PHIL CUNNINGTON: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "BAS: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "DIANE JAMES MEP: Could the confirm that the UK Treasury will have to cover multi billion pound losses as a result of Gilts held under Quantitative Easing maintain current market values My estimate is £22 billion and counting"
, "LINDA PRECIOUS: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "LANCE: Jim . Seriously Quantitative Easing billions in stimulus “reinvestment of your TAX dollars as the gov saw fit to distribute bailed=failed . that can’t and didn’t create economic growth🙄Yes let the banks fail it would have cost the tax payers less #20.6 trillion debt"
, "ROSEFIRE FOUNDATION: Reduced quantitative easing likely to have only limited impact for corporate borrowing costs in EMEA says Moody’s Matthias Heck in Zurich https://t.co/BWb4m1NyiJ #MDYSCreditTrends https://t.co/3KpdRgNlau"
, "IT'S BUFFOON: With the help of historically low interest rates and quantitative easing You baffoon Not organically."
, "DEPLORABLE BMH: Quantitative easing fiat currency"
, "TILLY: With the help of historically low interest rates and quantitative easing You baffoon Not organically."
, "NEP-MAC: https://t.co/j6ZZQiwcXp Quantitative easing and bank risk taking evidence from lending John Kandrac Bernd Schlusche https://t.co/TsRfJLxwMS"
, "NEP-CBA: https://t.co/CyfpHTuZHV Quantitative easing and bank risk taking evidence from lending John Kandrac Bernd Schlusche https://t.co/GjmJIAMtp9"
, "FIGHTANOTHERROUND: Is this a correct translation (or transcription if you gave the interview in French) Quantitative Easing will have no consequences For Draghi maybe but for the economy Bitcoin is a symptom of the consequences of QE no https://t.co/Z7HGOy9SCl"
, "ROBERT M IOBBI: Obama stimulated the economy with 1T pissed away another 2T in quantitative easing and still NO JOBS Bailed out all the banks 2 He failed"
, "STEVE HUSKER: Obama’s economy was based on printing trillions of dollars Remember quantitative easing Trump eases foolish regulations lowers taxes and creates jobs!"
, "SALLY JANE ISFREE: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "MOODY'S INVESTORS SERVICE: Reduced quantitative easing likely to have only limited impact for corporate borrowing costs in EMEA says Moody’s Matthias Heck in Zurich https://t.co/BWb4m1NyiJ #MDYSCreditTrends https://t.co/3KpdRgNlau"
, "HELEN NANGONZI: 'The process of tapering quantitative easing is a major risk to the global outlook We need to think seriously about the implications of this. #SCBMarketOutlook https://t.co/DBzQhiWako"
, "STANDARD CHARTERED: 'The process of tapering quantitative easing is a major risk to the global outlook We need to think seriously about the implications of this. #SCBMarketOutlook https://t.co/DBzQhiWako"
, "RICH TVAFRICA: 'The process of tapering quantitative easing is a major risk to the global outlook We need to think seriously about the implications of this. #SCBMarketOutlook https://t.co/DBzQhiWako"
, "CHRISTINE FLANAGAN: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "QUILLION GLOBAL: Ever since the global financial crisis quantitative easing (QE measures have resulted in low https://t.co/MWEv4wwwue"
, "KAREN: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "MR.TENPERCENT%: Quantitative easing Bank of England https://t.co/WquM8Cd64n MOD are struggling with spending while the BoE continues QE :("
, "JIM BOND: _Beagle _brexit _trickett _blog Correctly known as Quantitative Easing Asset Purchase Programme The money is created digitally and exchanged for assets such as government bonds (Gilts and corporate bonds ergo it is assetised Your chicken egg scenario is funny BOE quote below. https://t.co/pktCkkOzt7"
, "KATZ: 8 year sugar hit fuelled by quantitative easing has enriched the banks and impoverished fixed interest investors or forced moms and dads to seek yield in risky markets."
, "TIA MILLAR: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "GAIL JONES: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "CAROL580532: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "DORIAN FURLONGER: I may be wrong but when non-inflationary Quantitative Easing is possible (anywhere in the world) why not use it to finance a Social Investment Fund for projects such as the one supported here by &amp that create transformative opportunities for those in poverty https://t.co/ATZzJI5BHL"
, "ORMY 27: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "GENA MERRETT: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "NICOLETTE COLLINS: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "PETAL539: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "FRANCES HILTON: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "JANETTE KING: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "DER OBERST #BREXIT: _up Actually it isn’t as the was over valued agains the and it was only in Oct 2017 that the European Bank slashed its quantitative easing of the Euro"
, "RICHADICK: Quantitative Easing https://t.co/DpfI82XVrE via"
, "SRICHARAN: You can talk about Debt Ceiling Quantitative easing government messups in the past the whole reason why bitcoin exists"
, "BUZZ JAZZ JENKINS: U r delusional Simply not true Granted stock market was doing well in the 2nd term but that was bc of all the paper thrown into the economy via quantitative easing 1–2&amp;3 mind you All he did was add over 10 trillion dollars in debt Now go home get your fucking shine box!"
, "RNR CAPITAL(SOON): Powell has been a skeptic of round 3 of quantitative easing https://t.co/ZRwzaabCAy"
, "MARY PATRICIA MORGAN: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "COLIN DARDIS: There's also this https://t.co/ejMLD3MWtq And of course you can't rely on quantitative easing as that leads to inflation."
, "PERFECT STRANGER: Crazy how much has changed in my life the past 4 years Inflation rates quantitative easing expansionary monetary policy got a hair cut,"
, "BRANDON CONSORTI: Crazy how much has changed in my life the past 4 years Inflation rates quantitative easing expansionary monetary policy got a hair cut,"
, "ELIZABETH PAYTON: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "TODD LEGGENS: Less regulations lower taxes Funny not 1 year of 3 growth in 8 years Oh that's right it was Bush economy for 8 years Stock market would have been shit also if not for quantitative easing for O's 8 years Just sit back and watch the economy moron."
, "RHIAN PALMER: Using Flow of Funds to measure the effects of Quantitative Easing https://t.co/d2LpYBfR9f"
, "DAVE AND SUE BIRCH: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "MORGAN: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "MAYBEL MUNRO: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "POOR PARGE: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "LOST IN CONFUSION#NHSLOVE: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "PHIL READ: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "EMMA: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "FRANCES MARTIN: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "MAGGI WALKER: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "MAC BALZAC: What your small and narrow mind fails to perceive is that the stock market is a reflection of the overall optimism of the average American. It's not the usual type of bubble generated by quantitative easing https://t.co/Y46OvbqbrY"
, "CAROL CLEGG: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "SHARON: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "STUART NIMMO: _m I think it's called 'quantitative easing these days."
, "GREG JACKSON: A sobering warning here of the potential for another big crash NZ should be protected against the worst effects by its strong banking system and the fact we didn’t rush into quantitative easing bu there still could be big waves ahead https://t.co/HSrO6KR5Zu"
, "NANAJ: A sobering warning here of the potential for another big crash NZ should be protected against the worst effects by its strong banking system and the fact we didn’t rush into quantitative easing bu there still could be big waves ahead https://t.co/HSrO6KR5Zu"
, "DAIRYMAN: A sobering warning here of the potential for another big crash NZ should be protected against the worst effects by its strong banking system and the fact we didn’t rush into quantitative easing bu there still could be big waves ahead https://t.co/HSrO6KR5Zu"
, "DEAN CANNOT MOVE VERY NIMBLY: A sobering warning here of the potential for another big crash NZ should be protected against the worst effects by its strong banking system and the fact we didn’t rush into quantitative easing bu there still could be big waves ahead https://t.co/HSrO6KR5Zu"
, "ANJI YOUNG: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "RAFFAELE ORIANI: From 'quantitative to 'qualitative easing #davos2018 https://t.co/41qWKqSAF2"
, "CLLR KATE LEWIS: #WASPI don't believe anyone who says we can't afford pension equality _Campaign How to waste £445 billion (The Failure of Quantitative Easing https://t.co/RGBpZzTZpw via"
, "CRIMSON JIHAD: It took $80 BILLION dollars a month of our tax dollars in the form of Quantitative Easing by Obama and near-zero interest rates to keep the stock market propped up."
, "TOCHI ONYEBUCHI: More valuable Davos insight 'A policy of quantitative easing will not have the same effect on the rap game as it would have on the trap game I believe that bears considering in this increasingly intertwined world. #WEF18"
, "CRYPTOGRABBER: Financial inequality rooted in quantitative easing policy Simon Dixon debates https://t.co/1KseRTUjC0 https://t.co/wMN6r1TWbi"
, "SYLVAN LANE: This was as an alternative to quantitative easing."
, "TAD GWIAZDOWSKI: European Central Bank unleashes quantitative easing https://t.co/ngOh6Nafo1 via #Teaching #QE #Eurozone #Eurocrisis"
, "BENJAMIN BRAUN: Sounds like the _org worrying about post-crisis quantitative easing? It’s the BIS (2012 worrying about balance sheets of Asian central banks accumulating FX reserves in the 2000s. https://t.co/ze9ZX2cASj https://t.co/rvUhh1DN2o"
, "WINNERS EDGE TRADING: Quantitative easing explained here https://t.co/u0FxJKfWII"
, "TIM BLACK: Quantitative easing explained here https://t.co/dFklSUhAAs"
, "13D GLOBAL STRATEGY RESEARCH: Further QT could trigger a weaker U.S dollar which would counterintuitively put upward pressure on consumer price inflation https://t.co/0XzfXgPnOL"
, "PATRICK BALLWEG: The results of Quantitative Easing https://t.co/9Z3IhJClKe"
, "MOODYSANALYTICS ECON: Bank of #Japan is up to its neck in #stimulus but tightening policy now could derail the gains made since quantitative easing began Today's Economy https://t.co/cfu4rVGjxB #QE"
, "MRTIMOTHYBOBBINS: It wasn't QE per se but the actions attached to it I was using it as shorthand for the BofE's actions around that time However as QE money bolstered the markets it had an indirect effect on shoring up the pound. https://t.co/X8bpacoVRB"
, "VOCRADIO W ROB DOC: _mitov Hey _mitov do us all a favor and Google/search “Effects of Quantitative Easing &amp then get back us Also research the Dow Jones &amp what/who it’s exclusively comprised of &amp then explain how that represents the avg US citizen We’ll wait #FakeNews"
, "DPLORABLEBSTRD: Uh negative The Federal Reserve began printing an exorbitant amount of money and funneling it into the banks It was called Quantitative Easing look it up Obama had little to Do with it as it was a Fed idea And all it Did was write an open check to the banks that we pay back"
, "NOUVELLE DONNE: ��� 📽 Live from _EESC Pierre Larrouturou presents the initiative which proposes using quantitative easing to fund the green transition https://t.co/xSTPKBvBNY #GreenQE https://t.co/oGhddSbTxX"
, "ROB BRUCE: Not only do #Trump's unfunded #TaxCuts make an existing bubble (already blown up by quantitative easing far worse It also ensures the #FederalGovernment will have no room for manoeuvre if it bursts #WEF18 should not be championing reckless economic policies driven by greed."
, "NICK MACDH IBHIDH: _sutton73 Ask him what's his view on quantitative easing"
, "BEN WEAVER: Further QT could trigger a weaker U.S dollar which would counterintuitively put upward pressure on consumer price inflation https://t.co/0XzfXgPnOL"
, "TYLER JOHNSON: Also Obama's economy was built off of quantitative easing by the fed and virtually 0 interest rates It was propped up artificially Trumps economy is built on earnings all while the fed is tightening yet market is still performing"
, "I AM: In Europe and in Japan they've been performing Quantitative Easing meaning they've been printing money to stabilize their economy but at the same time it's causing a bubble that will eventually pop Regardless the Euro is too weak because Greece and Italy are broke."
, "TRACY I: Or approximately 30 minutes of US central bank quantitative easing https://t.co/Px0kJXu1OP"
, "MODZETTE: That’s when you should take the opportunity to educate people on the 8 years of quantitative easing."
, "RICK RUSSELL: Dude this is what I said if you would read and comprehend I said the stock market came back to where it was pre 2007-08 because of quantitative easing and zero interest rates by the Federal Reserve not because of policy initiatives as you suggest by your graph...think!"
, "WALT ARMOUR: Unwinding QE Might Hurt the Economy https://t.co/ev1hCXmxMC After th 2008 financial meltdown nearly blew up th world’s financial system 4rmr Fed Res chairman Bernanke implemented a program known as Quantitative Easing (QE) Fed printed money &amp bought up billions $ of “bad paper. https://t.co/WrvJZ0RNtL"
, "DR SHADOW: Or approximately 30 minutes of US central bank quantitative easing https://t.co/Px0kJXu1OP"
, "BRYAN MOORE: “If Quantitative Easing (QE is inflationary in theory but deflationary in practice will… https://t.co/wrk72gdD65 ."
, "MORPHO ADVISORY LTD: “If the Fed and other major central banks had not lowered interest rates to zero (or below) it would have been harder for corporations to justify financial engineering at the expense of capital investment. https://t.co/SFynUNPTRQ https://t.co/FnFxCu6XGA"
, "CANUTE: 'Financial engineering goes hand-in-hand with management compensation practices that focus on short-term at the expense of long-term performance.” https://t.co/hQbhr0wa5e https://t.co/oB8bRauw82"
, "STUART BROOKES: _b_linton It's called quantitative easing and we have done it on numerous occasions."
, "STEVE HUSKER: Obama’s success?? I guess you mean quantitative easing when Obama printed billions of dollars every month to prop up the exit Remember QE1 and 2??"
, "G.R LINDEN: Ever wished you could create money out of thin air Click here to find out how It's The Economy Stupid-.. https://t.co/tlWezpGKHA"
, "G.R LINDEN: Ever wished you could create money out of thin air Click here to find out how It's The Economy Stupid Quantitative Easing https://t.co/xpEmbsa8DT"
, "LIBERTYNEWS: Great time to take a machete to all of that crap Justin i.e The Department of Energy Education and while you’re at it shut down the Fed or at the very least leave a wrench or two behind in their quantitative easing machine Just sayin’..."
, "ERIC GUBERA: Great time to take a machete to all of that crap Justin i.e The Department of Energy Education and while you’re at it shut down the Fed or at the very least leave a wrench or two behind in their quantitative easing machine Just sayin’..."
, "KIANA T ELIZABETH: Spelling is all that you got No intelligent statement about how demonicrats have been fiscally responsible over the last 9 years How it was republicans that ran up a 20 trillion debt Or how Obamas quantitative easing and raising taxes energized the economy."
, "CRYPTOGRABBER: Financial inequality rooted in quantitative easing policy Simon Dixon debates https://t.co/NO0MyeQVRt https://t.co/ZCPrsJgRae"
, "ROBOLOGY: Quantitative easing hmm."
, "CANNY FUTURIST: “If the Fed and other major central banks had not lowered interest rates to zero (or below) it would have been harder for corporations to justify financial engineering at the expense of capital investment. https://t.co/SFynUNPTRQ https://t.co/FnFxCu6XGA"
, "13D GLOBAL STRATEGY RESEARCH: “If the Fed and other major central banks had not lowered interest rates to zero (or below) it would have been harder for corporations to justify financial engineering at the expense of capital investment. https://t.co/SFynUNPTRQ https://t.co/FnFxCu6XGA"
, "CHAUNCEY TURMAN: Business as usual or is she creating some distance from for herself from Obama era devastating quantitative easing If the FBI NSA &amp CIA are morally bankrupt the money gatekeepers can't possibly be a part of the larger scheme could they https://t.co/V6s7CEPwtT"
, "BARRY BURTON: The error here is the empty pockets image Makes for simple interpretation but while the wealthiest have had a windfall in quantitative easing others are not at zero increase."
      ]
    }
  ]
, speakers:
  {

    "BILL SHORTEN":
    { name: "Bill Shorten"
    , title: "Opposition Leader (Labor Party)"
    },

 "DYLAN YOUNG": { name: "DYLAN YOUNG", title: "2018-01-25" } ,
 "DAVEY CROKETT": { name: "DAVEY CROKETT", title: "2018-01-25" } ,
 "WILLIAM EVANS": { name: "WILLIAM EVANS", title: "2018-01-25" } ,
 "PAOLO PERINI": { name: "PAOLO PERINI", title: "2018-01-25" } ,
 "WIL IWILL": { name: "WIL IWILL", title: "2018-01-25" } ,
 "JDIRT#RELEASETHEMEMO": { name: "JDIRT#RELEASETHEMEMO", title: "2018-01-25" } ,
 "TONY RUSI": { name: "TONY RUSI", title: "2018-01-25" } ,
 "DOLLAR STORE COWBOY": { name: "DOLLAR STORE COWBOY", title: "2018-01-25" } ,
 "DOLLAR STORE COWBOY": { name: "DOLLAR STORE COWBOY", title: "2018-01-25" } ,
 "ESTELLE P ARD": { name: "ESTELLE P ARD", title: "2018-01-25" } ,
 "MAKKABA CO. LTD.": { name: "MAKKABA CO. LTD.", title: "2018-01-25" } ,
 "MAKKABA CO. LTD.": { name: "MAKKABA CO. LTD.", title: "2018-01-25" } ,
 "JAN WILDEBOER": { name: "JAN WILDEBOER", title: "2018-01-25" } ,
 "SAEED": { name: "SAEED", title: "2018-01-25" } ,
 "TOM BARFIELD": { name: "TOM BARFIELD", title: "2018-01-25" } ,
 "STUART W": { name: "STUART W", title: "2018-01-25" } ,
 "LISA COSTA": { name: "LISA COSTA", title: "2018-01-25" } ,
 "LAURA P REZ-CEJUELA": { name: "LAURA P REZ-CEJUELA", title: "2018-01-25" } ,
 "HEIKO VOIGTS": { name: "HEIKO VOIGTS", title: "2018-01-25" } ,
 "JEAN COMTE": { name: "JEAN COMTE", title: "2018-01-25" } ,
 "NK GAMBOA ROSALES": { name: "NK GAMBOA ROSALES", title: "2018-01-25" } ,
 "HALIM  ZBERRAK": { name: "HALIM  ZBERRAK", title: "2018-01-25" } ,
 "SHAIKH ABDUL KABIR": { name: "SHAIKH ABDUL KABIR", title: "2018-01-25" } ,
 "MAKKABA CO. LTD.": { name: "MAKKABA CO. LTD.", title: "2018-01-25" } ,
 "MAKKABA CO. LTD.": { name: "MAKKABA CO. LTD.", title: "2018-01-25" } ,
 "CAROL CLEGG": { name: "CAROL CLEGG", title: "2018-01-25" } ,
 "ANTI SOCIAL": { name: "ANTI SOCIAL", title: "2018-01-25" } ,
 "ALBERT YEFIMOV": { name: "ALBERT YEFIMOV", title: "2018-01-25" } ,
 "PETER PETER": { name: "PETER PETER", title: "2018-01-25" } ,
 "LOWELL THE BERNER": { name: "LOWELL THE BERNER", title: "2018-01-25" } ,
 "ALBERT YEFIMOV": { name: "ALBERT YEFIMOV", title: "2018-01-25" } ,
 "HOT_COVFEFE": { name: "HOT_COVFEFE", title: "2018-01-25" } ,
 "MATHEW CRAWFORD": { name: "MATHEW CRAWFORD", title: "2018-01-25" } ,
 "TOP SOULJA": { name: "TOP SOULJA", title: "2018-01-25" } ,
 "MIRAJISH": { name: "MIRAJISH", title: "2018-01-25" } ,
 "JOHN LOCKE": { name: "JOHN LOCKE", title: "2018-01-25" } ,
 "DAILY NEWS": { name: "DAILY NEWS", title: "2018-01-25" } ,
 "NEXTBIGFUTURE": { name: "NEXTBIGFUTURE", title: "2018-01-25" } ,
 "WENDY JOY": { name: "WENDY JOY", title: "2018-01-25" } ,
 "JOHN HOWARD": { name: "JOHN HOWARD", title: "2018-01-25" } ,
 "ETO MARKETS": { name: "ETO MARKETS", title: "2018-01-25" } ,
 "JACK EWING": { name: "JACK EWING", title: "2018-01-25" } ,
 "WHY HAS EVERYONE MADE THEIR NAME SO LONG?": { name: "WHY HAS EVERYONE MADE THEIR NAME SO LONG?", title: "2018-01-25" } ,
 "YOUNG CORPORATE": { name: "YOUNG CORPORATE", title: "2018-01-25" } ,
 "ALLAN": { name: "ALLAN", title: "2018-01-25" } ,
 "DAVIDC": { name: "DAVIDC", title: "2018-01-25" } ,
 "GENTIL   PL R ME": { name: "GENTIL   PL R ME", title: "2018-01-25" } ,
 "JORGE M": { name: "JORGE M", title: "2018-01-25" } ,
 "GERRY MARTIN": { name: "GERRY MARTIN", title: "2018-01-25" } ,
 "EPSTEIN'S MOTHER": { name: "EPSTEIN'S MOTHER", title: "2018-01-25" } ,
 "MARCHELLA": { name: "MARCHELLA", title: "2018-01-25" } ,
 "DAVIDC": { name: "DAVIDC", title: "2018-01-25" } ,
 "FOUNDING DUDE": { name: "FOUNDING DUDE", title: "2018-01-25" } ,
 "CARL DEVITT": { name: "CARL DEVITT", title: "2018-01-25" } ,
 "MITCHELL COGERT": { name: "MITCHELL COGERT", title: "2018-01-24" } ,
 "VINCENT SLATER": { name: "VINCENT SLATER", title: "2018-01-24" } ,
 "SARA #PCPEU #NHSLOVE": { name: "SARA #PCPEU #NHSLOVE", title: "2018-01-24" } ,
 "KEVIN TIERNEY": { name: "KEVIN TIERNEY", title: "2018-01-24" } ,
 "BAGCHI": { name: "BAGCHI", title: "2018-01-24" } ,
 "DROPTHEBALL": { name: "DROPTHEBALL", title: "2018-01-24" } ,
 "OFFTHETOP": { name: "OFFTHETOP", title: "2018-01-24" } ,
 "TRISH MCGREGOR": { name: "TRISH MCGREGOR", title: "2018-01-24" } ,
 "LMS": { name: "LMS", title: "2018-01-24" } ,
 "ALTON COGERT": { name: "ALTON COGERT", title: "2018-01-24" } ,
 "CRYPTOVALEUR": { name: "CRYPTOVALEUR", title: "2018-01-24" } ,
 "ARUPA TESOLIN": { name: "ARUPA TESOLIN", title: "2018-01-24" } ,
 "MIHR THAKAR": { name: "MIHR THAKAR", title: "2018-01-24" } ,
 "HUURACTIEBREDA": { name: "HUURACTIEBREDA", title: "2018-01-24" } ,
 "JUSTIN MAGNER": { name: "JUSTIN MAGNER", title: "2018-01-24" } ,
 "JUSTIN MAGNER": { name: "JUSTIN MAGNER", title: "2018-01-24" } ,
 "SUE WHITTINGHAM": { name: "SUE WHITTINGHAM", title: "2018-01-24" } ,
 "TIMOTHY BAIR": { name: "TIMOTHY BAIR", title: "2018-01-24" } ,
 "JEREMY GAVINS": { name: "JEREMY GAVINS", title: "2018-01-24" } ,
 "FLAP ZAPPA #FBPE FOREVER BREXIT PRO EXIT": { name: "FLAP ZAPPA #FBPE FOREVER BREXIT PRO EXIT", title: "2018-01-24" } ,
 "KEVIN TILDSLEY": { name: "KEVIN TILDSLEY", title: "2018-01-24" } ,
 "STUPID SIMPLE CRYPTO": { name: "STUPID SIMPLE CRYPTO", title: "2018-01-24" } ,
 "CLAYTON HOLMES": { name: "CLAYTON HOLMES", title: "2018-01-24" } ,
 "OLD WHIG": { name: "OLD WHIG", title: "2018-01-24" } ,
 "PERIKLIS FERESIADIS": { name: "PERIKLIS FERESIADIS", title: "2018-01-24" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "2018-01-24" } ,
 "JAN HUNTER": { name: "JAN HUNTER", title: "2018-01-24" } ,
 "AYAN DOSS": { name: "AYAN DOSS", title: "2018-01-24" } ,
 "BOOMS AND BUSTS SHOW": { name: "BOOMS AND BUSTS SHOW", title: "2018-01-24" } ,
 "BEAMING PENGUIN": { name: "BEAMING PENGUIN", title: "2018-01-24" } ,
 "BREXIT WATCH": { name: "BREXIT WATCH", title: "2018-01-24" } ,
 "SCUGNIZZO60": { name: "SCUGNIZZO60", title: "2018-01-24" } ,
 "ZAC NATE": { name: "ZAC NATE", title: "2018-01-24" } ,
 "OLD WHIG": { name: "OLD WHIG", title: "2018-01-24" } ,
 "TED CLUBBERLANG": { name: "TED CLUBBERLANG", title: "2018-01-24" } ,
 "SILLY MILLY": { name: "SILLY MILLY", title: "2018-01-24" } ,
 "ANDREW": { name: "ANDREW", title: "2018-01-24" } ,
 "BASEDMUHAMMAD": { name: "BASEDMUHAMMAD", title: "2018-01-24" } ,
 "IRINA": { name: "IRINA", title: "2018-01-24" } ,
 "MARK BROWN": { name: "MARK BROWN", title: "2018-01-24" } ,
 "LARRY": { name: "LARRY", title: "2018-01-24" } ,
 "DIANE JAMES MEP": { name: "DIANE JAMES MEP", title: "2018-01-24" } ,
 "DAVE ROBERTS.": { name: "DAVE ROBERTS.", title: "2018-01-24" } ,
 "KIKO": { name: "KIKO", title: "2018-01-24" } ,
 "WENDY PUERTO": { name: "WENDY PUERTO", title: "2018-01-24" } ,
 "FIRE PROJECT": { name: "FIRE PROJECT", title: "2018-01-24" } ,
 "DIANE JAMES MEP": { name: "DIANE JAMES MEP", title: "2018-01-24" } ,
 "MARK BROWN": { name: "MARK BROWN", title: "2018-01-24" } ,
 "SHARON NASH-UPTON": { name: "SHARON NASH-UPTON", title: "2018-01-24" } ,
 "MUMMYGIRL BEV STEIN": { name: "MUMMYGIRL BEV STEIN", title: "2018-01-24" } ,
 "UKIP TAMWORTH": { name: "UKIP TAMWORTH", title: "2018-01-24" } ,
 "PHIL CUNNINGTON": { name: "PHIL CUNNINGTON", title: "2018-01-24" } ,
 "BAS": { name: "BAS", title: "2018-01-24" } ,
 "DIANE JAMES MEP": { name: "DIANE JAMES MEP", title: "2018-01-24" } ,
 "SIR BRADLEY RICHARD": { name: "SIR BRADLEY RICHARD", title: "2018-01-24" } ,
 "BEATRIZ CAICEDO": { name: "BEATRIZ CAICEDO", title: "2018-01-24" } ,
 "FELIX ALVARADO": { name: "FELIX ALVARADO", title: "2018-01-24" } ,
 "LINDA PRECIOUS": { name: "LINDA PRECIOUS", title: "2018-01-24" } ,
 "GONZALO MONROY": { name: "GONZALO MONROY", title: "2018-01-24" } ,
 "LANCE": { name: "LANCE", title: "2018-01-24" } ,
 "MASKANI YA TAIFA": { name: "MASKANI YA TAIFA", title: "2018-01-24" } ,
 "ROSEFIRE FOUNDATION": { name: "ROSEFIRE FOUNDATION", title: "2018-01-24" } ,
 "IT'S BUFFOON": { name: "IT'S BUFFOON", title: "2018-01-24" } ,
 "DEPLORABLE BMH": { name: "DEPLORABLE BMH", title: "2018-01-24" } ,
 "TILLY": { name: "TILLY", title: "2018-01-24" } ,
 "SINGH": { name: "SINGH", title: "2018-01-24" } ,
 "CRAIG MCLAREN": { name: "CRAIG MCLAREN", title: "2018-01-24" } ,
 "NEP-MAC": { name: "NEP-MAC", title: "2018-01-24" } ,
 "NEP-CBA": { name: "NEP-CBA", title: "2018-01-24" } ,
 "FIGHTANOTHERROUND": { name: "FIGHTANOTHERROUND", title: "2018-01-24" } ,
 "ROBERT M IOBBI": { name: "ROBERT M IOBBI", title: "2018-01-24" } ,
 "RODRIGO FERNANDEZ": { name: "RODRIGO FERNANDEZ", title: "2018-01-24" } ,
 "STEVE HUSKER": { name: "STEVE HUSKER", title: "2018-01-24" } ,
 "ALEXANDER FOX": { name: "ALEXANDER FOX", title: "2018-01-24" } ,
 "SALLY JANE ISFREE": { name: "SALLY JANE ISFREE", title: "2018-01-24" } ,
 "MOODY'S INVESTORS SERVICE": { name: "MOODY'S INVESTORS SERVICE", title: "2018-01-24" } ,
 "HELEN NANGONZI": { name: "HELEN NANGONZI", title: "2018-01-24" } ,
 "STANDARD CHARTERED": { name: "STANDARD CHARTERED", title: "2018-01-24" } ,
 "RICH TVAFRICA": { name: "RICH TVAFRICA", title: "2018-01-24" } ,
 "JOE BEATTIE": { name: "JOE BEATTIE", title: "2018-01-24" } ,
 "RAJAN DHALL MSTA": { name: "RAJAN DHALL MSTA", title: "2018-01-24" } ,
 "CHRISTINE FLANAGAN": { name: "CHRISTINE FLANAGAN", title: "2018-01-24" } ,
 "DAVID BELLE": { name: "DAVID BELLE", title: "2018-01-24" } ,
 "STANISLAS JOURDAN": { name: "STANISLAS JOURDAN", title: "2018-01-24" } ,
 "BENJAMIN BRAUN": { name: "BENJAMIN BRAUN", title: "2018-01-24" } ,
 "QUILLION GLOBAL": { name: "QUILLION GLOBAL", title: "2018-01-24" } ,
 "RICHARD PHILLIPS": { name: "RICHARD PHILLIPS", title: "2018-01-24" } ,
 "KAREN": { name: "KAREN", title: "2018-01-24" } ,
 "MR.TENPERCENT%": { name: "MR.TENPERCENT%", title: "2018-01-24" } ,
 "JIM BOND": { name: "JIM BOND", title: "2018-01-24" } ,
 "KATZ": { name: "KATZ", title: "2018-01-24" } ,
 "TIA MILLAR": { name: "TIA MILLAR", title: "2018-01-24" } ,
 "GAIL JONES": { name: "GAIL JONES", title: "2018-01-24" } ,
 "CAROL580532": { name: "CAROL580532", title: "2018-01-24" } ,
 "DORIAN FURLONGER": { name: "DORIAN FURLONGER", title: "2018-01-24" } ,
 "ORMY 27": { name: "ORMY 27", title: "2018-01-24" } ,
 "GENA MERRETT": { name: "GENA MERRETT", title: "2018-01-24" } ,
 "NICOLETTE COLLINS": { name: "NICOLETTE COLLINS", title: "2018-01-24" } ,
 "PETAL539": { name: "PETAL539", title: "2018-01-24" } ,
 "FRANCES HILTON": { name: "FRANCES HILTON", title: "2018-01-24" } ,
 "JANETTE KING": { name: "JANETTE KING", title: "2018-01-24" } ,
 "MAKKABA CO. LTD.": { name: "MAKKABA CO. LTD.", title: "2018-01-24" } ,
 "MAKKABA CO. LTD.": { name: "MAKKABA CO. LTD.", title: "2018-01-24" } ,
 "MAKKABA CO. LTD.": { name: "MAKKABA CO. LTD.", title: "2018-01-24" } ,
 "DER OBERST #BREXIT": { name: "DER OBERST #BREXIT", title: "2018-01-24" } ,
 "ERIC BLYLER": { name: "ERIC BLYLER", title: "2018-01-24" } ,
 "SCIRP PAPERS": { name: "SCIRP PAPERS", title: "2018-01-24" } ,
 "FORTUNE COOKIE": { name: "FORTUNE COOKIE", title: "2018-01-24" } ,
 "RICHADICK": { name: "RICHADICK", title: "2018-01-24" } ,
 "SRICHARAN": { name: "SRICHARAN", title: "2018-01-24" } ,
 "BUZZ JAZZ JENKINS": { name: "BUZZ JAZZ JENKINS", title: "2018-01-24" } ,
 "RNR CAPITAL(SOON)": { name: "RNR CAPITAL(SOON)", title: "2018-01-24" } ,
 "MARY PATRICIA MORGAN": { name: "MARY PATRICIA MORGAN", title: "2018-01-24" } ,
 "RAHIM": { name: "RAHIM", title: "2018-01-24" } ,
 "COLIN DARDIS": { name: "COLIN DARDIS", title: "2018-01-24" } ,
 "THE CRYPTO KID": { name: "THE CRYPTO KID", title: "2018-01-24" } ,
 "PERFECT STRANGER": { name: "PERFECT STRANGER", title: "2018-01-24" } ,
 "BRANDON CONSORTI": { name: "BRANDON CONSORTI", title: "2018-01-23" } ,
 "NDER KARAO LANO LU": { name: "NDER KARAO LANO LU", title: "2018-01-23" } ,
 "ELIZABETH PAYTON": { name: "ELIZABETH PAYTON", title: "2018-01-23" } ,
 "#HUSKERS": { name: "#HUSKERS", title: "2018-01-23" } ,
 "ALEX (A.J.)": { name: "ALEX (A.J.)", title: "2018-01-23" } ,
 "#HUSKERS": { name: "#HUSKERS", title: "2018-01-23" } ,
 "TODD LEGGENS": { name: "TODD LEGGENS", title: "2018-01-23" } ,
 "RHIAN PALMER": { name: "RHIAN PALMER", title: "2018-01-23" } ,
 "NHSGECONOMICS": { name: "NHSGECONOMICS", title: "2018-01-23" } ,
 "DAVE AND SUE BIRCH": { name: "DAVE AND SUE BIRCH", title: "2018-01-23" } ,
 "MORGAN": { name: "MORGAN", title: "2018-01-23" } ,
 "BULLDOG": { name: "BULLDOG", title: "2018-01-23" } ,
 "MAYBEL MUNRO": { name: "MAYBEL MUNRO", title: "2018-01-23" } ,
 "CHRISTIAN": { name: "CHRISTIAN", title: "2018-01-23" } ,
 "GHULAM NABI": { name: "GHULAM NABI", title: "2018-01-23" } ,
 "POOR PARGE": { name: "POOR PARGE", title: "2018-01-23" } ,
 "LOST IN CONFUSION#NHSLOVE": { name: "LOST IN CONFUSION#NHSLOVE", title: "2018-01-23" } ,
 "SOCIOBLAH   #PCPEU": { name: "SOCIOBLAH   #PCPEU", title: "2018-01-23" } ,
 "PHIL READ": { name: "PHIL READ", title: "2018-01-23" } ,
 "HOPENOTFEAR #NHSLOVE": { name: "HOPENOTFEAR #NHSLOVE", title: "2018-01-23" } ,
 "EMMA": { name: "EMMA", title: "2018-01-23" } ,
 "MATTHEW A THOMPSON": { name: "MATTHEW A THOMPSON", title: "2018-01-23" } ,
 "FRANCES MARTIN": { name: "FRANCES MARTIN", title: "2018-01-23" } ,
 "MAGGI WALKER": { name: "MAGGI WALKER", title: "2018-01-23" } ,
 "MAC BALZAC": { name: "MAC BALZAC", title: "2018-01-23" } ,
 "JENNY CHEN": { name: "JENNY CHEN", title: "2018-01-23" } ,
 "CAROL CLEGG": { name: "CAROL CLEGG", title: "2018-01-23" } ,
 "SHARON": { name: "SHARON", title: "2018-01-23" } ,
 "STUART NIMMO": { name: "STUART NIMMO", title: "2018-01-23" } ,
 "CAROLINE LEWIS": { name: "CAROLINE LEWIS", title: "2018-01-23" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "2018-01-23" } ,
 "RICHARD FIELD": { name: "RICHARD FIELD", title: "2018-01-23" } ,
 "GREG JACKSON": { name: "GREG JACKSON", title: "2018-01-23" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "2018-01-23" } ,
 "CONGRESS WEALTH MGMT": { name: "CONGRESS WEALTH MGMT", title: "2018-01-23" } ,
 "CHARLIE ALPHA": { name: "CHARLIE ALPHA", title: "2018-01-23" } ,
 "NANAJ": { name: "NANAJ", title: "2018-01-23" } ,
 "DAIRYMAN": { name: "DAIRYMAN", title: "2018-01-23" } ,
 "DEAN CANNOT MOVE VERY NIMBLY": { name: "DEAN CANNOT MOVE VERY NIMBLY", title: "2018-01-23" } ,
 "ANJI YOUNG": { name: "ANJI YOUNG", title: "2018-01-23" } ,
 "FESTUS BREW QUANSAH": { name: "FESTUS BREW QUANSAH", title: "2018-01-23" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "2018-01-23" } ,
 "VYKROMOND": { name: "VYKROMOND", title: "2018-01-23" } ,
 "ARB": { name: "ARB", title: "2018-01-23" } ,
 "ATENEA": { name: "ATENEA", title: "2018-01-23" } ,
 "OLD WHIG": { name: "OLD WHIG", title: "2018-01-23" } ,
 "RAFFAELE ORIANI": { name: "RAFFAELE ORIANI", title: "2018-01-23" } ,
 "TWIDERPADER": { name: "TWIDERPADER", title: "2018-01-23" } ,
 "CLLR KATE LEWIS": { name: "CLLR KATE LEWIS", title: "2018-01-23" } ,
 "CRIMSON JIHAD": { name: "CRIMSON JIHAD", title: "2018-01-23" } ,
 "AARON PORTER": { name: "AARON PORTER", title: "2018-01-23" } ,
 "TOCHI ONYEBUCHI": { name: "TOCHI ONYEBUCHI", title: "2018-01-23" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "2018-01-23" } ,
 "OZRENV": { name: "OZRENV", title: "2018-01-23" } ,
 "SYLVAN LANE": { name: "SYLVAN LANE", title: "2018-01-23" } ,
 "JAMES MACEACHERN": { name: "JAMES MACEACHERN", title: "2018-01-23" } ,
 "CHAUNCEY TURMAN": { name: "CHAUNCEY TURMAN", title: "2018-01-23" } ,
 "TAD GWIAZDOWSKI": { name: "TAD GWIAZDOWSKI", title: "2018-01-23" } ,
 "WELSH TREASURY": { name: "WELSH TREASURY", title: "2018-01-23" } ,
 "BENJAMIN BRAUN": { name: "BENJAMIN BRAUN", title: "2018-01-23" } ,
 "WINNERS EDGE TRADING": { name: "WINNERS EDGE TRADING", title: "2018-01-23" } ,
 "TIM BLACK": { name: "TIM BLACK", title: "2018-01-23" } ,
 "13D GLOBAL STRATEGY RESEARCH": { name: "13D GLOBAL STRATEGY RESEARCH", title: "2018-01-23" } ,
 "JEFF GROLL": { name: "JEFF GROLL", title: "2018-01-23" } ,
 "PATRICK BALLWEG": { name: "PATRICK BALLWEG", title: "2018-01-23" } ,
 "ANDY SMITH #FBPE": { name: "ANDY SMITH #FBPE", title: "2018-01-23" } ,
 "LAURA SANDISON": { name: "LAURA SANDISON", title: "2018-01-23" } ,
 "MOODYSANALYTICS ECON": { name: "MOODYSANALYTICS ECON", title: "2018-01-23" } ,
 "MARY JUDAH": { name: "MARY JUDAH", title: "2018-01-23" } ,
 "VIRGIL": { name: "VIRGIL", title: "2018-01-23" } ,
 "ANNA MARIE": { name: "ANNA MARIE", title: "2018-01-23" } ,
 "HMS": { name: "HMS", title: "2018-01-23" } ,
 "SUN": { name: "SUN", title: "2018-01-23" } ,
 "CARL DEVITT": { name: "CARL DEVITT", title: "2018-01-23" } ,
 "ATARAXIA INVESTMENTS": { name: "ATARAXIA INVESTMENTS", title: "2018-01-23" } ,
 "MRTIMOTHYBOBBINS": { name: "MRTIMOTHYBOBBINS", title: "2018-01-23" } ,
 "VERNER VERASS": { name: "VERNER VERASS", title: "2018-01-23" } ,
 "ANDREW MUNDELL": { name: "ANDREW MUNDELL", title: "2018-01-23" } ,
 "MIKI LEIGH": { name: "MIKI LEIGH", title: "2018-01-23" } ,
 "FRANK0_1962": { name: "FRANK0_1962", title: "2018-01-23" } ,
 "VOCRADIO W ROB DOC": { name: "VOCRADIO W ROB DOC", title: "2018-01-23" } ,
 "RICHARD CAMPBELL": { name: "RICHARD CAMPBELL", title: "2018-01-23" } ,
 "DPLORABLEBSTRD": { name: "DPLORABLEBSTRD", title: "2018-01-23" } ,
 "IVAN K COHEN": { name: "IVAN K COHEN", title: "2018-01-23" } ,
 "MARIANNE SENSIER": { name: "MARIANNE SENSIER", title: "2018-01-23" } ,
 "LC": { name: "LC", title: "2018-01-23" } ,
 "PETER NOYES": { name: "PETER NOYES", title: "2018-01-23" } ,
 "SI EGAN": { name: "SI EGAN", title: "2018-01-23" } ,
 "CHRIS PAPADOPOULLOS": { name: "CHRIS PAPADOPOULLOS", title: "2018-01-23" } ,
 "J": { name: "J", title: "2018-01-23" } ,
 "PETER WHITEFORD": { name: "PETER WHITEFORD", title: "2018-01-23" } ,
 "DINA MEDLAND": { name: "DINA MEDLAND", title: "2018-01-23" } ,
 "DOORUJ RAMBACCUSSING": { name: "DOORUJ RAMBACCUSSING", title: "2018-01-23" } ,
 "DIANE COYLE": { name: "DIANE COYLE", title: "2018-01-23" } ,
 "ONS": { name: "ONS", title: "2018-01-23" } ,
 "NOUVELLE DONNE": { name: "NOUVELLE DONNE", title: "2018-01-23" } ,
 "ROB BRUCE": { name: "ROB BRUCE", title: "2018-01-23" } ,
 "BENJAMIN JONES": { name: "BENJAMIN JONES", title: "2018-01-23" } ,
 "TRUMPEANS.COM": { name: "TRUMPEANS.COM", title: "2018-01-23" } ,
 "FT SPECIAL REPORTS": { name: "FT SPECIAL REPORTS", title: "2018-01-23" } ,
 "MATTHEW JERVOIS": { name: "MATTHEW JERVOIS", title: "2018-01-23" } ,
 "NICK MACDH IBHIDH": { name: "NICK MACDH IBHIDH", title: "2018-01-23" } ,
 "2GLOCKS": { name: "2GLOCKS", title: "2018-01-23" } ,
 "BEN WEAVER": { name: "BEN WEAVER", title: "2018-01-23" } ,
 "SHORTORLONG": { name: "SHORTORLONG", title: "2018-01-23" } ,
 "JACK PARKER": { name: "JACK PARKER", title: "2018-01-23" } ,
 "TYLER JOHNSON": { name: "TYLER JOHNSON", title: "2018-01-23" } ,
 "I AM": { name: "I AM", title: "2018-01-23" } ,
 "CHRISTOPHER RUCINSKI": { name: "CHRISTOPHER RUCINSKI", title: "2018-01-23" } ,
 "JOHN HAMPSHIRE": { name: "JOHN HAMPSHIRE", title: "2018-01-23" } ,
 "RICH FERGUSON": { name: "RICH FERGUSON", title: "2018-01-23" } ,
 "NATHAN KANABROCKI": { name: "NATHAN KANABROCKI", title: "2018-01-23" } ,
 "TRACY I": { name: "TRACY I", title: "2018-01-23" } ,
 "NICK AND NATE DIAZ": { name: "NICK AND NATE DIAZ", title: "2018-01-23" } ,
 "WOUTER VOS": { name: "WOUTER VOS", title: "2018-01-23" } ,
 "JOONG KIM": { name: "JOONG KIM", title: "2018-01-23" } ,
 "MODZETTE": { name: "MODZETTE", title: "2018-01-23" } ,
 "LEONARD MARQUEZ": { name: "LEONARD MARQUEZ", title: "2018-01-23" } ,
 "RICK RUSSELL": { name: "RICK RUSSELL", title: "2018-01-23" } ,
 "TAMMY QUACKENBUSH": { name: "TAMMY QUACKENBUSH", title: "2018-01-23" } ,
 "HARRY PARSONS": { name: "HARRY PARSONS", title: "2018-01-23" } ,
 "ANN BANKS": { name: "ANN BANKS", title: "2018-01-23" } ,
 "ROTH BARBARIAN": { name: "ROTH BARBARIAN", title: "2018-01-23" } ,
 "JAY BROWN": { name: "JAY BROWN", title: "2018-01-23" } ,
 "PETER CLUSKEY": { name: "PETER CLUSKEY", title: "2018-01-22" } ,
 "RICHARD C BALLANTYNE": { name: "RICHARD C BALLANTYNE", title: "2018-01-22" } ,
 "LARS SCHALL": { name: "LARS SCHALL", title: "2018-01-22" } ,
 "ANN CARRIAGE": { name: "ANN CARRIAGE", title: "2018-01-22" } ,
 "MONICA HENRY": { name: "MONICA HENRY", title: "2018-01-22" } ,
 "VICTORIA": { name: "VICTORIA", title: "2018-01-22" } ,
 "ROB JONES": { name: "ROB JONES", title: "2018-01-22" } ,
 "WALT ARMOUR": { name: "WALT ARMOUR", title: "2018-01-22" } ,
 "JHOON": { name: "JHOON", title: "2018-01-22" } ,
 "DR SHADOW": { name: "DR SHADOW", title: "2018-01-22" } ,
 "LYRICAL ESTATE AGENT": { name: "LYRICAL ESTATE AGENT", title: "2018-01-22" } ,
 "PERCY BROWNE": { name: "PERCY BROWNE", title: "2018-01-22" } ,
 "EL JEFE GRANDE": { name: "EL JEFE GRANDE", title: "2018-01-22" } ,
 "BRYAN MOORE": { name: "BRYAN MOORE", title: "2018-01-22" } ,
 "CRAIG DAVID HOVEY": { name: "CRAIG DAVID HOVEY", title: "2018-01-22" } ,
 "GIZZTER MCFACE": { name: "GIZZTER MCFACE", title: "2018-01-22" } ,
 "MORPHO ADVISORY LTD": { name: "MORPHO ADVISORY LTD", title: "2018-01-22" } ,
 "JASON HIVES": { name: "JASON HIVES", title: "2018-01-22" } ,
 "POLITICS IR": { name: "POLITICS IR", title: "2018-01-22" } ,
 "SNAKE OIL BARON": { name: "SNAKE OIL BARON", title: "2018-01-22" } ,
 "CANUTE": { name: "CANUTE", title: "2018-01-22" } ,
 "NUNYA BIDNESS": { name: "NUNYA BIDNESS", title: "2018-01-22" } ,
 "CASEJJ": { name: "CASEJJ", title: "2018-01-22" } ,
 "NICK THIELMAN": { name: "NICK THIELMAN", title: "2018-01-22" } ,
 "LJS MCCULLY": { name: "LJS MCCULLY", title: "2018-01-22" } ,
 "MIKAEL FROM": { name: "MIKAEL FROM", title: "2018-01-22" } ,
 "LOCKEAN LIBERTARIAN": { name: "LOCKEAN LIBERTARIAN", title: "2018-01-22" } ,
 "ELCUERVO": { name: "ELCUERVO", title: "2018-01-22" } ,
 "ANNETTE ASHLEY     FREE SPEECH=DEMOCRACY #WATON": { name: "ANNETTE ASHLEY     FREE SPEECH=DEMOCRACY #WATON", title: "2018-01-22" } ,
 "HORUS": { name: "HORUS", title: "2018-01-22" } ,
 "PETER DONALDSON": { name: "PETER DONALDSON", title: "2018-01-22" } ,
 "CLEM": { name: "CLEM", title: "2018-01-22" } ,
 "ANGELUS CAELIS": { name: "ANGELUS CAELIS", title: "2018-01-22" } ,
 "MICHAEL": { name: "MICHAEL", title: "2018-01-22" } ,
 "DAVID BELLE": { name: "DAVID BELLE", title: "2018-01-22" } ,
 "1 780-910-1715": { name: "1 780-910-1715", title: "2018-01-22" } ,
 "SEAN": { name: "SEAN", title: "2018-01-22" } ,
 "STUART BROOKES": { name: "STUART BROOKES", title: "2018-01-22" } ,
 "ALCIBIADES GREGORIO": { name: "ALCIBIADES GREGORIO", title: "2018-01-22" } ,
 "BERNHARD HAMMER": { name: "BERNHARD HAMMER", title: "2018-01-22" } ,
 "OPPENHEIMERS BLOCKCHAINMEMO": { name: "OPPENHEIMERS BLOCKCHAINMEMO", title: "2018-01-22" } ,
 "HALBERSTRAM": { name: "HALBERSTRAM", title: "2018-01-22" } ,
 "ANDY ANDERSON": { name: "ANDY ANDERSON", title: "2018-01-22" } ,
 "PAUL REDMOND": { name: "PAUL REDMOND", title: "2018-01-22" } ,
 "RO3041": { name: "RO3041", title: "2018-01-22" } ,
 "DDEBURGEN": { name: "DDEBURGEN", title: "2018-01-22" } ,
 "BRIAN CORBETT": { name: "BRIAN CORBETT", title: "2018-01-22" } ,
 "WILLY WHEELIE BIN": { name: "WILLY WHEELIE BIN", title: "2018-01-22" } ,
 "TOUGH DELTA": { name: "TOUGH DELTA", title: "2018-01-22" } ,
 "VELOMARC": { name: "VELOMARC", title: "2018-01-22" } ,
 "DIDACLOPEZ": { name: "DIDACLOPEZ", title: "2018-01-22" } ,
 "PICASSO;": { name: "PICASSO;", title: "2018-01-22" } ,
 "NON-SEQUITUR.CO.UK /GAB/": { name: "NON-SEQUITUR.CO.UK /GAB/", title: "2018-01-22" } ,
 "J T FUENTES": { name: "J T FUENTES", title: "2018-01-22" } ,
 "DAVID MCKAY": { name: "DAVID MCKAY", title: "2018-01-22" } ,
 "HAMZA": { name: "HAMZA", title: "2018-01-22" } ,
 "RAPHA L GUIONNET": { name: "RAPHA L GUIONNET", title: "2018-01-22" } ,
 "CONSERVATIVE OF AZ": { name: "CONSERVATIVE OF AZ", title: "2018-01-22" } ,
 "STEVE HUSKER": { name: "STEVE HUSKER", title: "2018-01-22" } ,
 "MARK": { name: "MARK", title: "2018-01-22" } ,
 "G.R LINDEN": { name: "G.R LINDEN", title: "2018-01-22" } ,
 "G.R LINDEN": { name: "G.R LINDEN", title: "2018-01-22" } ,
 "": { name: "", title: "2018-01-22" } ,
 "PRAGMATIC CULTURE": { name: "PRAGMATIC CULTURE", title: "2018-01-22" } ,
 "TONY MOBBS": { name: "TONY MOBBS", title: "2018-01-22" } ,
 "TRADESIFT": { name: "TRADESIFT", title: "2018-01-22" } ,
 "DSTOLLER": { name: "DSTOLLER", title: "2018-01-22" } ,
 "LIBERTYNEWS": { name: "LIBERTYNEWS", title: "2018-01-22" } ,
 "ERIC GUBERA": { name: "ERIC GUBERA", title: "2018-01-22" } ,
 "DAVE EBNER": { name: "DAVE EBNER", title: "2018-01-22" } ,
 "ANARCHIST PUNK DAD": { name: "ANARCHIST PUNK DAD", title: "2018-01-22" } ,
 "KIANA T ELIZABETH": { name: "KIANA T ELIZABETH", title: "2018-01-22" } ,
 "CHUCK MORRISON": { name: "CHUCK MORRISON", title: "2018-01-22" } ,
 "HAMZA": { name: "HAMZA", title: "2018-01-22" } ,
 "CHERSKOUBO": { name: "CHERSKOUBO", title: "2018-01-22" } ,
 "TONYKELLY": { name: "TONYKELLY", title: "2018-01-22" } ,
 "CRYPTOGRABBER": { name: "CRYPTOGRABBER", title: "2018-01-22" } ,
 "ROBOLOGY": { name: "ROBOLOGY", title: "2018-01-22" } ,
 "HELEN PICKARD": { name: "HELEN PICKARD", title: "2018-01-22" } ,
 "MURAD MAHMUDOV": { name: "MURAD MAHMUDOV", title: "2018-01-22" } ,
 "CHATHAM HOUSE": { name: "CHATHAM HOUSE", title: "2018-01-22" } ,
 "CANNY FUTURIST": { name: "CANNY FUTURIST", title: "2018-01-22" } ,
 "BURNOUT_": { name: "BURNOUT_", title: "2018-01-22" } ,
 "ALP SERMET": { name: "ALP SERMET", title: "2018-01-22" } ,
 "J.S FARINET": { name: "J.S FARINET", title: "2018-01-22" } ,
 "LORD Y": { name: "LORD Y", title: "2018-01-22" } ,
 "VOLPE": { name: "VOLPE", title: "2018-01-22" } ,
 "WHOKNOWS": { name: "WHOKNOWS", title: "2018-01-22" } ,
 "HUEGELKIND": { name: "HUEGELKIND", title: "2018-01-22" } ,
 "ROGER WINDHORST": { name: "ROGER WINDHORST", title: "2018-01-22" } ,
 "KELLIE LARSON": { name: "KELLIE LARSON", title: "2018-01-22" } ,
 "NARNFAN": { name: "NARNFAN", title: "2018-01-22" } ,
 "ROTHBARDIAN": { name: "ROTHBARDIAN", title: "2018-01-22" } ,
 "MRS PRIM": { name: "MRS PRIM", title: "2018-01-22" } ,
 "JULIESKYRED": { name: "JULIESKYRED", title: "2018-01-22" } ,
 "13D GLOBAL STRATEGY RESEARCH": { name: "13D GLOBAL STRATEGY RESEARCH", title: "2018-01-22" } ,
 "CHAUNCEY TURMAN": { name: "CHAUNCEY TURMAN", title: "2018-01-22" } ,
 "RAKESH": { name: "RAKESH", title: "2018-01-22" } ,
 "JOSHUA KONKLE": { name: "JOSHUA KONKLE", title: "2018-01-22" } ,
 "STEVEN": { name: "STEVEN", title: "2018-01-22" } ,
 "CHET HAMBY SR.": { name: "CHET HAMBY SR.", title: "2018-01-22" } ,
 "#ALPSTWT": { name: "#ALPSTWT", title: "2018-01-22" } ,
 "BARRY BURTON": { name: "BARRY BURTON", title: "2018-01-22" } ,
 "MATTHEW RAGNOLI": { name: "MATTHEW RAGNOLI", title: "2018-01-22" } ,
 "ALLEN OWENS": { name: "ALLEN OWENS", title: "2018-01-22" } 

    , "MALCOLM TURNBULL":
    { name: "Malcolm Turnbull"
    , title: "Prime Minister of Australia (Liberal)"
    }

  }
, topics:
  [
       { name: "https", re: /\b(https)\b/gi, x: 196, y: 168 },
       { name: "interest", re: /\b(interest)\b/gi, x: 450, y: 325 },
       { name: "rates", re: /\b(rates)\b/gi, x: 49, y: 760 },
       { name: "lower", re: /\b(lower)\b/gi, x: 132, y: 759 },
       { name: "listen", re: /\b(listen)\b/gi, x: 656, y: 540 },
       { name: "crash", re: /\b(crash)\b/gi, x: 819, y: 869 },
       { name: "Keynesian", re: /\b(keynesian)\b/gi, x: 105, y: 270 },
       { name: "spending", re: /\b(spending)\b/gi, x: 19, y: 859 },
       { name: "easing", re: /\b(easing)\b/gi, x: 249, y: 314 },
       { name: "exactly", re: /\b(exactly)\b/gi, x: 849, y: 159 },
       { name: "Since", re: /\b(since)\b/gi, x: 498, y: 688 },
       { name: "warned", re: /\b(warned)\b/gi, x: 568, y: 178 },
       { name: "government", re: /\b(government)\b/gi, x: 839, y: 331 },
       { name: "regulation", re: /\b(regulation)\b/gi, x: 431, y: 421 },
       { name: "sober", re: /\b(sober)\b/gi, x: 709, y: 159 },
       { name: "drinking", re: /\b(drinking)\b/gi, x: 445, y: 132 },
       { name: "need", re: /\b(need)\b/gi, x: 411, y: 651 },
       { name: "said", re: /\b(said)\b/gi, x: 647, y: 338 },
       { name: "akin", re: /\b(akin)\b/gi, x: 692, y: 431 },
       { name: "economists", re: /\b(economists)\b/gi, x: 323, y: 165 },
       { name: "amp", re: /\b(amp)\b/gi, x: 238, y: 403 },
       { name: "caused", re: /\b(caused)\b/gi, x: 388, y: 77 },
       { name: "co", re: /\b(co)\b/gi, x: 132, y: 251 },
       { name: "Easing", re: /\b(easing)\b/gi, x: 314, y: 469 },
       { name: "central", re: /\b(central)\b/gi, x: 408, y: 650 },
       { name: "zS3xFY7W1J", re: /\b(zs3xfy7w1j)\b/gi, x: 155, y: 651 },
       { name: "Failure", re: /\b(failure)\b/gi, x: 4, y: 847 },
       { name: "believe", re: /\b(believe)\b/gi, x: 431, y: 569 },
       { name: "anyone", re: /\b(anyone)\b/gi, x: 141, y: 678 },
       { name: "says", re: /\b(says)\b/gi, x: 850, y: 833 },
       { name: "WASPI", re: /\b(waspi)\b/gi, x: 356, y: 819 },
       { name: "_Campaign", re: /\b(_campaign)\b/gi, x: 359, y: 501 },
       { name: "RGBpZzTZpw", re: /\b(rgbpzztzpw)\b/gi, x: 309, y: 837 },
       { name: "waste", re: /\b(waste)\b/gi, x: 828, y: 505 },
       { name: "co", re: /\b(co)\b/gi, x: 262, y: 181 },
       { name: "billion", re: /\b(billion)\b/gi, x: 217, y: 807 },
       { name: "equality", re: /\b(equality)\b/gi, x: 115, y: 395 },
       { name: "pension", re: /\b(pension)\b/gi, x: 24, y: 103 },
       { name: "afford", re: /\b(afford)\b/gi, x: 445, y: 251 },
       { name: "corporate", re: /\b(corporate)\b/gi, x: 172, y: 527 },
       { name: "easing", re: /\b(easing)\b/gi, x: 297, y: 813 }
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
    d3.select(".g-republican .g-head span.g-count").text(formatCount(topic.parties[1].count));
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
