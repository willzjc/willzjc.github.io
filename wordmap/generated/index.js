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
          , "ESMARTME: Slovenia tourism is booming but is it really because of Melania Trump https://t.co/Gc2y29PgpJ\n"
          , "MY DOG JIM: That's classic Trump Always raining on his or someone else's parade He's so starved for attention he shoots himself in the foot several times a day No wonder he was able 2 dodge serving in Vietnam He continues to give himself self inflicted wounds every day.\n"
          , "JADU MANTAR:  trump 😂😂� Hinduism is false kids but the following is true: Earth built in 5 days Light appears when asked for Virgins give birth Dead people can rise Water wine ISIS and evangelists opposite sides of the same braindead coin\n"
          , "U FOUND WALDO!!!: More $$ in my paycheck this week no thanks to the two of you THANK YOU PRESIDENT TRUMP!! #MAGA 🇺🇸\n"
          , "KATJA BEGO: If the intelligence agencies win it’s the end of Trump If they don’t it’s the beginning of something much scarier One of those hinge points in history I suppose.\n"
          , "BLOCKER BOT: Trump protestors 'laughed at police'\n"
          , "ERR:  Trump Train Your values seem to be all over the place Please try to have a consistent thought train for one day.\n"
          , "DYSLEXIC_SNOWFLAKE: There must not be a single honest person in the Trump admin Ben Carson calls for independent review after report of son's involvement HUD listening tour https://t.co/4tZ8uj4Bvw via\n"
          , "JUDITHEFISHER: More &amp more libs think Dems r inadequate leaders CBS &amp CNN SOTU polls showed over 70 of viewrs liked Trump Wait til this time next yr!� https://t.co/2DluklWYat\n"
          , "MIKE: Tomorrow is the day of reckoning Tomorrow is the day that Barack Obama will be shown to be the most power hungry &amp corrupt President in American history. In a few hours my friends the WH will release the memo proving Obama weaponized the DOJ to topple Donald Trump. Enjoy.\n"
          , "TRUMP HOTELS JOBS: This #job might be a great fit for you Pastry Cook I https://t.co/UiLgWDML2l #Hospitality #Miami FL #Hiring\n"
          , "OCCUPY CALGARY (YYC): THE MANY WAYS TRUMP MAKES AMERICA WEAKER AND MORE DANGEROUS Fox and the rest of the president’s supporting.. https://t.co/zCzuq1KuGL\n"
          , "TRUMP: I love Trump #MAGA\n"
          , "JURK: ‘Never any hesitation’ Trump was quickly persuaded to support memo’s release https://t.co/eqULqSq3qO Go for it Trump and prove yourself guilt One year and not any smarter\n"
          , "STEPHENLESLIEJONES: Americans need to realize that they are on their own on this one-not quite I admit Guatemala has nicely sided with them in defiance of democratic principles the other 195 odd countries are of course at fault according to Trump.\n"
          , "PAUL VAN DER MEER: But isn't that exactly what Trump wants??\n"
          , "SCHR DINGER'S KAT: The100 &amp Cancellation that would be the best romance Anything beyond that I just hope it doesn't involve Belamy NO ONE deserves to be involved w/such a genocidal xenophobic morally bankrupt guilt-tripping abusive mass murderer like him Get the women away from mini Trump https://t.co/pTSLKegKdz\n"
          , "SHIRLEY MOORE: Not difficult if you weren't snowed under in the beginning Just more horse manure Trump's believers kept hoping for clarity Now that they know this is all there is the Bigly coverup is all that's left https://t.co/MKgD684fH6\n"
          , "YVONNE NAIRN: 1 had the audacity to visit West Virginia and diss Rep John Manchin(D for not supporting Trump’s Tax Scam conveniently forgets GOP stripped WV of its Healthcare $ even after Manchin has supported many GOP initiatives in the past If THAT is how intends to .....\n"
          , "JJ:  2017 If there was/is corruption at top level of FBI it's important that we find out Not the first law enforcement agency in the world to have issues If Hillary/DNC paid for the Russian discredited dossier that was used to allow spying on Trump that led to Mueller probe big problem!\n"
          , "JANET E DEGEORGE: I was a fan Now you are just another bully with all the power to attack a guest who was blindsided Power really does corrupt absolutely Haley doesn't need you to fight her fight but you loved playing the bully How does it feel just like Trump?\n"
          , "DOUG: You really are well informed This is Sky Part of Fox As close to the truth as Disney As truthful as Trump https://t.co/opfaydA3hm\n"
          , "JORDIVK AKA YURIBCN: How much does each region in #Spain contribute to the Treasury Understand why they are doing everything to prevent even the slightest opportunity for #indyref and hamstring the pro-#independence movement in #Catalonia Can we let money trump #democracy? (million € https://t.co/cJBIZDqdJ3\n"
          , "MY INFO MY NAME IS L: Trump and Ryan should be Removed from office Ryan is a pompous windbag who won by Gerrymandering not because he's the better candidate Ryan should be writing Articles of Impeachment against Trump he's on Team Trump.\n"
          , "ALLEN WEST REPUBLIC: North Korean Defector Honored By Trump Reveals What Struck Him Most About Life On The Outside of the Oppressive.. https://t.co/jHte4556J4\n"
          , "CHRISTOPHER STOKES: Former AG Edwin Meese AG Sessions Doing Great Job for Trump https://t.co/QBtTQgVb2d #breitbartnews\n"
          , "CHRISTOPHER STOKES: Report Special Counsel Zeroing in on Trump Response to Trump Tower Meeting https://t.co/iDHZ4L4HhZ #breitbartnews\n"
          , "ABEL: I liked a video https://t.co/d2YhMPk5TA Jimmy Kimmel Monologue 2/01/2018 Trump's VS FBI Tweet's NFL\n"
          , "KELLY LYNNE: The only explanation as to why so many GOP Career Politicians are going to such transparent lengths to cover for Trump is if they are also trying to cover for themselves If Trump goes down they still have Pence to push their far right agenda So why? 🤔🤔🤔\n"
          , "SUSAN: No one who's been the victim of a personal relationship (parent partner supervisor w/a #narcissist will be surprised by ANYTHING #Trump does The rest of you PLEASE read this description of the person holding US hostage 'How Narcissists Really Think https://t.co/sjYYY2lyiR\n"
          , "DOC PARKER: Trump's legal advisor https://t.co/IqcRu85L8y\n"
          , "LIGHTNDARKNESS: Trump’s #InfrastructureScam is more of the same a $800 billion giveaway to the rich and powerful at the expense of Black Latinx and low-income communities Tell your Member of Congress Support #MillonsOfJobs and reject Trump’s #InfrastructureScam https://t.co/joJ2a3UV0r\n"
          , "CANTU S: Did this woman go to school Not to bright and was in Russia I think all of appointees of trump and the should be investigated with dealings of Russia.\n"
          , "AMZSHOPONLINE: Funny Trump Won Suck It Up Buttercup Long Sleeve T-shirt Buy here: https://t.co/PLQefE9nNm https://t.co/VILZ22lgqr\n"
          , "DEEPFRIED RICE BALLS: 2 steps Want to be President I don't propose a crossword cruise I have a personal interest You need to hire a good campaign manager before Trump or Sanders leave them round faced One who owns an airplane I am here trying hard not to fall into making origamies.\n"
          , "LARRY GIBSON: No no Fake News It was the Biglest watched SOTU Address ever Trump never lies.\n"
          , "AMR: So they are even willing to start a war to obfuscate from the Russia investigation trump is a mobster not a King.\n"
          , "JULIAN ARMSTRONG: Just remember impeach Trump and this is what you might very well get instead... https://t.co/0M1P1seWdc\n"
          , "JENNIE BLOOM: Billionaire Trump donor and climate disinformation funder Rebekah Mercer has no place at the American Museum of Natural History Sign to tell to drop her https://t.co/w6TdWEe8wI via #StandUpforScience\n"
          , "WAYITIS!: Who are the dummies that voted this dummy in the office?Lol now I know what Trump means by drain the swamp Lol Maxine you're an embarrassment to the state of California thank God you have nothing to do with the rest of the country!\n"
          , "BUSTER DELGATO: Could be she's incapable of coming clean People who hang around Trump have a tendency to believe their own bullshit Just look at Kellyanne Conway.\n"
          , "#IDGAFF \_( )_/: Trump just needs to go learn the National Anthem.. first Conquer that...\n"
          , "CHAZ: Hey Brenda your support of President Trump a self proclaimed sexual predator must make your family very proud...WWJD\n"
          , "KAREN CHESTNEY: After Trump claims to love Puerto Rico San Juan mayor unapologetically calls him a hypocrite https://t.co/mpLd1yPOSy\n"
          , "LIBERAL&PROUD1963:  Trump Wow Just wow You expect cooperation when all you do is bob and feint lie and break your word time and time again For shame\n"
          , "ROBIN: How far will you let Trump obstruct justice Smearing the FBI is not working he needs another distraction Is North Korea the next act Are you ready to risk it for Trump Stand up for America.\n"
          , "MEL: Why is Trump getting away with his constant exaggeration &amp lying He is inventing new 'most this &amp that to praise himself almost daily With that being said congrats Mr president for winning the Grammy's the Superbowl &amp the best sociopath in office awards.\n"
          , "REV TOM HOGLE: Democrats will help with NOTHING that might make President Trump look good no matter WHO of HOW MANY are helped by it.\n"
          , "DOTTIE KIBBLEPANTS: Zaklee pal Whever you believe in left of centre right of centre not politically inclined voted Leave voted Remain like Trump don’t like a Trump we iz all entitled to our views and av reasons for dem.\n"
          , "B:  Mom 17 Trump has her on the ropes...she's almost ready yo quit...she's been flushed out...and she's in the open for all too see\n"
          , "DARIN BROWN: Like a true constitutional crisis being under reported Trump refuses to implement the Russia sanctions signed into law last year https://t.co/h8lZCE0YJe\n"
          , "RUTH PUNTON: That won't do Australia any good We probably have to pick up the PM's expenses I am really tired of hearing/reading about Trump and click the remote if I see Malcolm's face .I so much long for a change Let's get up and running quickly https://t.co/MBHbUTfHzY https://t.co/BI5E4LFEGq\n"
          , "LIL SOCIAL EXPERIMENT: Let’s all have a big 3 am laugh at all the Cubans in south Florida who voted for trump and now they’re getting deported.\n"
          , "STELLABLUE: But all the bitches you love can call trump anything they want any it’s ok.\n"
          , "MARIANO: Legal fees consumed 40 of Trump campaign spending at year's end https://t.co/k0gdvioM3k via https://t.co/bJaZXT8iY8\n"
          , "SHARON: Well if this is true where’s trump’s taxes Release those!\n"
          , "DEAN WEST:  Robinson Nunes Trump and their cronies are playing checkers while the FBI is quietly playing chess at the grand master level The stable genius president doesn't know history.\n"
          , "HEALTH NEWS: The Union Has A Climate Crisis And Activists Are Ready To Work Around Trump https://t.co/acByjBaTg3\n"
          , "KING TIMBIG: Diego Maradona's agent claims the Argentina great was denied entry to the United States after making disparaging comments about President Donald Trump.\n"
          , "MICHAEL D SCHMIDT: Apparent Trump legal defense fund uncovered https://t.co/U4uPZZfyzB via\n"
          , "NYZAP: #Trump was already caught on hot mic at #SOTU giving 100 guarantee to release Nunes memo https://t.co/ldQ4nT6P0G #LooseLipsSinkShips #DumbStableGenius\n"
          , "MARIANO: Trump RNC legal bills top $5M in 2017 https://t.co/qe2GkRCQdK via https://t.co/bJaZXT8iY8\n"
          , "CONSERVATIVE LADY: More brilliant commentary from the Trump propaganda network.\n"
          , "BONEBLACK:  kiki #StevenMiller His Dad from the old country. #trump #AMERICA #ImpeachTrump #TrumpCrimeFamily #Nazisinthewhitehouse #TreasonWeasel\n"
          , "18D.MEDIA: North Korea White Paper ‘Lustful Old Man Trump Turned U.S into ‘a Living Hell https://t.co/sKmX7XK0G2 https://t.co/Zj7QZIbKfW\n"
          , "KATE~STILL NASTY!: That's the Kennedy estate in Palm Beach not Joe Kennedy's home Why do RWNJ's have to lie in order to try to discredit Democrats They can't defend Trump so they bring up Hillary or President Obama Trump gives a speech filled w/lies so they attack the Democratic respondent� https://t.co/1ylGSeS2fN\n"
          , "FINLEY CORDAIN: Blocking means 'I win!' Trump sucks and his racist supporters suck more.\n"
          , "CAROL OLSEN: Trump liked a tweet about his 'great friend being accused of sexual misconduct https://t.co/Va5pl3bIOa\n"
          , "KB: Well trump is very stable You know...\n"
          , "IVAN PER: President Trump Arrives to an Amazing Reception at Davos Economic Summit.. https://t.co/volYBtzXsV via\n"
          , "HARAH: Here’s a novel thought for the Circus News Network there Jake🤡Tapeworm—so is wrong now too? You give evil POS new meaning You best worry more abt getting a conscious &amp a soul ❌❌❌#FAKENEWS❌❌❌ #LiberalismIsAMentalDisorder https://t.co/o4hcbmAChp\n"
          , "MELANIA TRUMP: The year is 2021 Donald Trump has been impeached and Britney Spears has taken her rightful place as the President of the United States A third grade classroom rises to recite the national anthem: “GIVE ME A SIIIIIIIIIIIIIGN HIT ME BABY ONE MORE TIME! *dance break https://t.co/oEIbw4I42U\n"
          , "CHRIS TREVI O: You still using Drain the swamp after Trump literally increased more than any other president?\n"
          , "LIFE OF ACTIONS: Samaritans Paint 'Make #America #Love Again #Mural on BHS Grad's Business to cover pro-#Trump https://t.co/q6f3S2KQFk\n"
          , "AYN VAN BERGLAND: Who Really Created the Trump Dossier? Was it really a British intel agent or a Clinton political operative? https://t.co/YLUhI2he5k\n"
          , "PRES COIN: The Impact of President Trump's 'Global Gag Rule on Women's Health is Becoming Clear TIME https://t.co/lcL2Z43lg2\n"
          , "STACYFORTNER: LET'S HAVE TRANSPARENCY 😎👀 John Kelly Trump wants 'everything out' EXCEPT: Trump's tax returns Trump.. https://t.co/mxohpbiRE7\n"
          , "ROJERAILS: TO THE GREATEST MINDS IN POLICY YOU ARE IN WASHINGTON DC AND PRESIDENT TRUMP NEEDS YOUR HELP DON'T SIT THERE ACT https://t.co/JyCsEID5Sq\n"
          , "SKIIN   GLEE: Pelosi Wants Eyes on Slobbering Trump at SOTU Warns Democrats to Stay in Line or Stay Home https://t.co/d61pVKnE5F\n"
          , "SAMANTHA JONES: Trump Is About to Make Tip-Pooling Legal Again Here’s What That Means for Restaurant Workers https://t.co/bSDXqf6a9d via\n"
          , "ANDY FREEDOM:  lindylou  sparkle But nobody is saying they are fit.. apart from Trump He can't even make his lies sound remotely believable What has the planet done to deserve this moron?\n"
          , "MARYHOLLIS TROUP: “Unprecedented” 9 historians on why Trump’s war with the FBI is so stunning https://t.co/gTzV6tXvtT via\n"
          , "NIK KERSHAW: just read your review of piers and trump magical thanks for starting my Friday right ! Xxx\n"
          , "HEALTH NEWS: The Union Has A Climate Crisis And Activists Are Ready To Work Around Trump https://t.co/9BfaPAwyF3\n"
          , "MAYARRI: This was what I was suspended for btw I don't see how that is more abusive than what I've been reporting Trump for Plus it's true He's a pedophile https://t.co/uQO3JVZG6Y\n"
          , "BMINORTHREAT: Maybe it's not 'normal but it should be Trump is just the right size wrench to throw into 'the works'!\n"
          , "DAVID SHIMBERG: Trump is better than A Box of Rocks and I am no genius https://t.co/N9xp3ufo0m\n"
          , "CORA: John Kelly encouraged Trump to pursue the memo! 'Never any hesitation’ Trump was quickly persuaded to support memo’s release https://t.co/b6g8HUIzW3\n"
          , "TWITCHER: Pelosi Wants Eyes on Slobbering Trump at SOTU Warns Democrats to Stay in Line or Stay Home https://t.co/nWlJqprypi\n"
          , "ANTONIA FILMER: ‘Those who reach the top of government undergo a mental transformation in which they believe themselves to represent the nation so that anybody not obeying them becomes condemned as “anti-national . Writes  Nalapat https://t.co/O6pc9fh37p\n"
          , "PATRIOT    LIFELOVER:  Trump Train It has already become absolutely without a doubt apparent to me that they stand for nothing good They stand for hate That is all.\n"
          , "EDMUND SULLIVAN: I’m a Republican Why Is My Party Gaslighting America https://t.co/tStxltzMag via Breaking down Trump’s strategy for fakery step by step based on his NYC real estate roots\n"
          , "DEPLORABLYDEPLORABLE: 🚨wow you should be on the Trump train 🚂 We want all the supporting documents released too If we all put our voices together we can make it happen DM me for the dates and locations of upcoming MAGA rallies Can’t wait 😊 Welcome aboard 🚂🇺🇸💨🚂🇺🇸� https://t.co/JzRJm7qxPv\n"
          , "B: Fast and furious , Iran, NKorea Muslim brotherhood Obama Comey Rice lies,decite, Get Trump I think...I know..karma.. creeps...karma is coming...for you\n"
          , "LAURENCE MONG: Here’s How Many Times Trump Said ‘I in His First SOTU Address Compare That with Obama’s https://t.co/1JcsAl1mjc\n"
          , "VETERAN4TRUMP:  Max You’re right They’d pick Russian bots anyway b/c illegals vote Dem🤦🏾‍♂️\n"
          , "KENNETH G EADE: Trump Orrin Hatch said I am best president in history Orrin Hatch Um not quite https://t.co/AahB8T8rlg via\n"
          , "CYNTHIA: When something is CLEARLY good for EVERYONE.. I mean come on and the compassionate human stories are not about dems or reps... Get over yourselves Dems/Libs Trump reached across the isle many times in his speech and after take the branch! https://t.co/G1W4Q7UiLj\n"
          , "LUIMBE: Trump administration strips consumer watchdog office of enforcement powers in lending discrimination cases The Washington Post More to fix https://t.co/f8TR1Cqxnz\n"
          , "KEN Z: by far the dumbest shit is the America’s next top model girls giving shit to the girl who voted trump lmfao fucken goofy\n"
          , "ROLLIBY: Stormy Daniels (she was going on Kimmel after Trump's State of the Union issued a new statement saying she is denying having an affair with Trump not because of a settlement but because “it never happened.” She would also like you to follow her on Instagram #LiberlalLies\n"
          , "BARBARA LANDREE: Just because you don't want Trump involved he's already involved by opening his mouth and getting caught on hot mic So that part of your plan is already underwater As far as Nunes staff working with the White House we know the answer to that too\n"
          , "STEVEBANNONSNOSE: Don't get too excited just quite yet reports are Russia is pushing for Gowdy to replace Jeff sessions for Attorney General Stay tuned to The Trump shit show.\n"
          , "MAKE ALL GREAT AGAIN: Make Travoise Great Again #MAGA #Trump #donaldtrump #POTUS45\n"
          , "JAY GOOSE: Oh snap my bad....the DOJ are all lying traitors and Trump is an honest Eagle Scout who has never run afoul of law Thank you for straightening that out https://t.co/sNN7IoEX0T\n"
          , "ROBERTO RE: Trump administration's top diplomat in Venezuela continues to press for the release of a jailed Utah man https://t.co/oRm5FyDynx Via\n"
          , "ALI ...BIASED #FBPE: Looks like  Rees Mogg has gone full Trump Quoting propaganda site for news How long before it’s Prison Planet and Hatie Flopkins Learned well from his visits with Steve Bannon. #StopBrexitSaveBritain #FBPE #WATON https://t.co/xxtYxqiERq\n"
          , "TRENDR: Do the Russians love Trump https://t.co/mTHytSyqtr\n"
          , "JOANNE MARSLAND: Money,religion and mother nature (woman are responsible for 99%.....then there's Donald Trump !!!\n"
          , "JEFF BRUNTON: Trump is worrying they are not moving fast enough he needs an urgent distraction from the increasing evidence of Russian collusion\n"
          , "MJ: This is not about the politics of personality folks it's about doing what's needed to advance the lives of the American people Trump is working for the people and doing a magnificent job CNN is at war with the truth and our freedom\n"
          , "MR HANNA: If the Russians did help Trump win it's almost like they love America more than the Democrats (Sarcasm intended)\n"
          , "JOHN M: #Russian had never read the #NunesMemo &amp barely knew abt it But it could help him so national security be damned (as well knew it was coming out https://t.co/BxxtUlrLOx #MemoGate #NunesFakeMemo #Mueller\n"
          , "JONATHAN GIARDINA: How does that song go You young wild girls you'll be the death of me? Could Hope Hicks Be the One to Bring Down Trump https://t.co/Bw3y4M9Foo\n"
          , "SHERRYM: Your right if they where all innocent then this wouldn't even be an issue They're all guilty they prove that every day You can even watch Trumps face he's so guilty it's pitiful Please save us Mr Mueller we don't have much longer Trump is losing it!\n"
          , "SHERRY_RESON: Chain migration racist term of art and other apt observation observations on the sotu https://t.co/hGwIhHIMxK via\n"
          , "HANDCRAFTLINE: 'Never any hesitation' Trump was quickly persuaded to support memo's release https://t.co/CMKF6cz4ez\n"
          , "ART SMITH: Trust in our Government disappears more &amp more Trump is still along way from draining 'THE SWAMP' Wray has got to go!\n"
          , "BILL: Dave Chappelle &amp Kendrick Lamar Open Grammys With Powerful Message Trump Livid https://t.co/H44P5Cc5H8\n"
          , "DAVID BERNARD: Here’s Who Will Sit With the First Lady at the State of the Union President Trump and Melania Trump the first lady have released their joint guest list for the State of the Union address on Tuesday night https://t.co/mQ41rO2CO2\n"
          , "ADRIAN TORR: well done on your interview with trump on Sunday I thought you asked the right questions and got answers that were important and shows people in Britain that trump is actually the right president for when we go to Brexit.\n"
          , "PROF JENS MUELLER: I just had this wild thought I will outlive the Trump Presidency and likely Trump Now that's a cause for bubbly!!!\n"
          , "TEXAN FOR TRUMP: Sara Carter Anti-Trump FBI Agents Fired from Mueller's Team Sidestepped Law for Preserving FBI Messages True PunditTrue Pundit https://t.co/KtQ5cEqZPt\n"
          , "AYN VAN BERGLAND: Former AG Edwin Meese AG Sessions Doing Great Job for Trump Breitbart https://t.co/n94QFujG6B\n"
          , "NUNYABEEZNESS: A bit much but I am for some sort of maritime law keeping shipping out of the area And ban Oil drilling Whaling must end everywhere of course #Trump\n"
          , "MARIA ALLEN: Trump declares &amp;apos;big win for Republicans&amp;apos after shutdown fight https://t.co/fFnQrEkGWf\n"
          , "CARMEN: Trump used to love the media before his presidency but only because he used them to promote himself Have you watched The Confidant Man?\n"
          , "COURAGE: Snowflakes are here I see everyone reaching for their blankies How cute Let papa Trump burb you You know he loves you Please donate your 2019 tax returns to igotubabesnowflake .com no pun intended! P.S Please send me a picture of your favorite bottle.\n"
          , "LESLIE HUGHES: Top Intel Dem blasts GOP for putting Trump “above the national interest https://t.co/GgGobMn1C2\n"
          , "LATASHA WILLIAMS: Top Intel Dem blasts GOP for putting Trump “above the national interest https://t.co/3yuHPd2wbk\n"
          , "NOAH BARKIN: Macron &amp Trump a special relationship � https://t.co/OXF0p7jWIR\n"
          , "JEAN MUMFORD: There's been a mysterious change in Trump's demeanour - and no one knows why Business Insider Australia He’s consulted with his Russian allies and is confident GOP will hold seats in midterms because the vote will BE HACKED AGAIN https://t.co/jIP6EvGVN2\n"
          , "NORM DEPLUME: So Trump allows sanctioned heads of 3 different Russian Intel agencies in 1 wk before refusing to enforce sanctions all while he's under investigation for conspiring with Russia and you think Schumer and Hillary are the ones who've sold out your country?? You're a brilliant man\n"
          , "NOPCWITHME: Throughout all the Trump-Russia hysteria I still haven’t figured out exactly what Russia could or would have done to supposedly help DJT in the election What help did DJT receive from Russia Any of my DEM friends care to enlighten me Good luck.\n"
          , "OUR LADY TRACY OF THE MOST PATIENT: Tell me that this planet is worth saving Cos I don't know anymore. https://t.co/aTgsyA99Pe\n"
          , "BOT_POLITICAL: the-washington-post|The State of the Union got teleprompter Trump The GOP retreat got real Donald Trump.|https://t.co/ichgCRB3vn https://t.co/EY1udQJVDI\n"
          , "MARGARET VENZ: The Trump administration just dealt a major blow to clean water protections https://t.co/9PT8wQjPSl via\n"
          , "DAVID O'HALLORAN: And the horror is that he is a top Trump advisor.\n"
      ]
    }
  , { name: "republican"
    , speeches:
      [
        "MALCOLM TURNBULL: " +
        "Thank you, thank you very much.\n",
          , "CHER DE LUCCIA: Like 45's failure to enforce sanctions this news is hidden under the plume of smoke blown up tRump supporters backsides over Nunes and memo's What else are they distracting us from #BehindTheCurtin #GangOfPutin\n"
          , "DANDY: Sorry No disrespect Just tired and my bedtime If Trump accepted help from Russia the plan was that he would give them something in return .. not punishing Russia for invading another country Ukraine That's what's happening now Trump just broke a law last week...\n"
          , "THE BEST OF AFRICA: 's incredibly shocking propensity to speak his mind has the potential to damage U.S relations with #African states. in our latest post Zangose Tembo explains why #politics #Africa https://t.co/8CSYuF6zrc\n"
          , "ALAN: #BadJokeFriday #poem #rhymes There's an American president called Trump, He's full of shit like Forrest Gump, His hair's a disgrace, He has a fucking orange face, That's why people call him a cunt!\n"
          , "#DEEPSTATELIBERAL: 'The US has had 16 years to build a case against these men and yet 28 of 41 prisoners are held without charge or a trial of any kind a shocking violation of America's founding principles https://t.co/Awjiq9IhKK\n"
          , "MARK S RUSHTON: Donald Trump Faith Misplaced In Memo Reportedly Focused On Carter Page |.. https://t.co/5cpyznOr1p via\n"
          , "JERRY UPTON: Y'all need to hear this!! Is Trump for real? #Topbuzz https://t.co/8Kg07qSe8m WTF There is something wrong with this person we call the president.People need to realize this man Is running our country\n"
          , "A.SILVER-MEMES GIFS: Get enough sleep because it takes a bad toll on your health if you don’t Trump won’t be around for long...but you will 🗽👍\n"
          , "MANNY: Trump's ONLY Failure Letting The Left Neocons Bully Him Into New Russ.. https://t.co/R65TlpBkyT via\n"
          , "GAIL HOOVER: Andrew McCabe should pull a BEAUREGARD and hang in there even if Trump releases the memo Make him fire you Worked for the evil elf Protect the USA\n"
          , "JALAL YACCARINI: This Is Why Donald Trump Is A TOTAL Jackass The Video Evidence https://t.co/x0VHBWcZJm via\n"
          , "CRISTINA YANG: And there are millions of white women who voted for Trump so I'm not sure why Caitlyn's conservatism reverts her back to maleness.\n"
          , "AIMAN DURRANI: My mom sheet mask on screen-recording Donald trump dancing to mere rashq e qamar while modi is on the tabla Me *actual loser basking in the glory of this queen*\n"
          , "LYNNE GEE: What would a Pharisee like you know about God's work You worship the false God Trump https://t.co/ZgzKod8MsG\n"
          , "BH: hate having to look at Muppet before BBL makes me angry inside of my bones glasses to appear more intelligent than actually is beard to give the impression of an actual jawline trump this trump that so edgy https://t.co/9T5NwyUjg5\n"
          , "PATTY PICKARD: Senator Durbin what we need is to get all of you hypocrites out of office Apply all our laws equally from Trump to Clinton to Obama to DREAMERS The real American people want all our laws enforced We are sick of not being heard or represented by you people.\n"
          , "UMAIR TANVEER: Trump memo Ryan plays down impact on Russia inquiry https://t.co/svJ18cNUxy\n"
          , "NEWSWEEK: The Afghanistan war has gotten so bad for the U.S. but the Trump administration is hiding more data https://t.co/TWUWcKFAZi https://t.co/uVBWiKMZyY\n"
          , ".              .: Agree. What happened is simple initially held fast to Repub principles and rejected Trump but was called names like Rino and Establishment and attacked by Trumpists he was so weak he couldn’t handle the pressure and caved He should have never been named Speaker https://t.co/nPDLoqcb84\n"
          , "ZIA MOHAMMED: There's a 'try an ignorant tweet on my Twitter. So you're telling me that it's not just memes and a black Harry Potter thing? Or are you just trying to get Muslims used to being oppressed under Trump?\n"
          , "SUPREME MEME: WAHT MEME zip MMM TRUMP stale meme wee homer pleep WHATAMEMEME\n"
          , "LORI: As opposed to the nice work you've been doing dumbass It's all falling apart traitor You tried to lie by omission on a stupid memo to protect your god Herr Trumpf You will either cause a constitutional panic or the final episode of The Trump Show https://t.co/IlHSijcOF3\n"
          , "COMPLICIT CONGRESS KILLS DEMOCRACY-NEWS AT 11: Do you really think it’s going to end with Trump’s ouster I’m a bit skeptical He’s guilty as sin but I think he’ll get away with it I really do Congress is complicit the only hope for is for Dems take both chambers in Nov Otherwise it’s moot #ObstructionOfJustice\n"
          , "ASH: Crazy Ding and Trump dont have a world title and he has 3.\n"
          , "CYNTHIA COTE: Thank god for people like you I hope we have enough left to protect us all from Trump &amp his Trumpian republicans The insane are running the asylum.\n"
          , "G.O.D.S: NBC POSE TO B LIBERAL THEY THAT RACIST UNDERCOVER RACIST LEAST TRUMP UP FORWARD ABOUT HIM BEIN RACIST NO REPUBLICANS AND DEMOCRATS R RACIST IT DONT MATTER HOW MUCH DEMOCRATS GOT DIVERSITY THATS JUST LIKE A RACIST SAYN THEY NOT A RACIST U BLK BUT U CANT FUCK MY DAUGHTER\n"
          , "PAUL YEE: Analysis Trump's speech ratings were even worse than you might have thought https://t.co/IVJOyfmyt4 . always pushes #Fake Facts Believe me.. must have been a lonely childhood...\n"
          , "HORST BROPHY:  Wheeler President Stephen Miller would deport you with one glance Trump lies to his base pretending we do not have an immigration system in place at all with merits or requirements just an open boarder for any Mexican or Muslim It’s always been and will be White vs Brown.\n"
          , "PAULA TRETKOFF: My main criticism of President Trump so far is his unpredictability Must make it difficult for people to work with him I believe this is a personality problem for Trump for which he needs counseling and also comes from his prior successes when he was used to getting his way.\n"
          , "ANTHONY D'JESUS: EVERYTHING THEY DID was totally ILLEGAL QUESTIONABLE UNETHICAL WELL PLANTED and Meant to Destroy TRUMP and his people from the beginning #TheyMustPayPenaltyForTheirEVILactions https://t.co/KyB2JWXrZS\n"
          , "SAFETYPIN-DAILY: Meteorologists Want To School Trump After He Failed These Climate Change Questions |Via BuzzFeed https://t.co/4mSEO6N3zA\n"
          , "_KJB: that mf donald trump really did lower taxes my paycheck is bigger than usual 🤔🤔\n"
          , "TINISKWERL: #Trump and #Nunes pass #NunesMemo back and forth like a hot potato Neither wants to release it Trump to send back to House Intel #DevinNunes can decide when/where to release #FISAMemo a blatant criminal act of #ObstructionOfJustice it’s a live grenade #Mueller #MuellerTime https://t.co/ZPFLvHvPez\n"
          , "GALAVANT: Proof that right wing is full of retards all over the world not just India Modi Trump https://t.co/wTSGBMeABz\n"
          , "PRESIDENT_TRUMP: Not really..depends on what you are wanting for USA if you want USA to be destroyed from with in.....you would vote trump taking it in the wrong direction\n"
          , "R_OWL_MIRROR: Rubin Trump will be on the “world’s dumbest criminal list https://t.co/vPL9hJ4gZf via 'Mueller is zeroing in on a Trump Tower meeting “cover story” Does realize He is Juggling a ball of White Phosphorous a ball of Napalm &amp a Live Grenade ?\n"
          , "CONSERVATIVE PATRIOT: With videos Maybe it's time for Adam Schiff to seek professional help Talk about insane #FullOfSchiff https://t.co/qkW4xqnAeY #MAGA #Trump https://t.co/zkwLkxvdJb\n"
          , "BUSINESS INSIDER SG: Here’s what’s behind the rumors of an affair between Nikki Haley and Trump https://t.co/mPtktuNVPY https://t.co/lVLZu658O3\n"
          , "JKL: Watching Dirty Money on Netflix. fuck Volkswagon and Donald Trump. thanks for the NOx..\n"
          , "JUST JOE WITH IT: Not much better than delivering receipts &amp hearing a guest tell the girl in their room that quote 'Trump is putting niggers to work.' Bet he smiles in my face when he comes down for breakfast tho.\n"
          , "NICK: I'm a physician who is trying to save desperate people - Mr Trump please help end Syrias agonies https://t.co/W2kVspFTEn\n"
          , "TINA ANGIE ILDEFONSO: THEY ARE BASING TRUMP COLLUSION WITH THE RUSSIANS ON THE FAKE DOSSIER THAT HILLARY PAID $12 MILLION FOR SO THAT.. https://t.co/usn31A2qtQ\n"
          , "A MORBID ATHEIST WHO LOVES DEATHMETAL: This is the second person on my TL today to wish or hope for the death of #Trump What a sick fucking bastard https://t.co/jWWtlhbQW2\n"
          , "IRFAN MALIK JOURNALIST: BABA REHMTA accepted for Pakistani nation and Pakistan all Pakistani nation stand by with BABA REHMTA ,and other side corrupt disloyal wicked immoral vicious uncivil amimics,and indecent politician not accepted for Pakistani democracy #Trump #AllStars3 #BestFanArmy https://t.co/vqZmNHYIiD\n"
          , "SNOTTBOT: allright time to stop talking in garden or else donald trump's going to be done to save the fuck can i even make videos anymore\n"
          , "BAPROCTOR:  Trump Train On what grounds The hope the Dem had to find fault in him has actually found fault in themselves.That his administration is actually uncovering the corruption of the past It’s been going on for years they all just kept their mouths shut He made millions in business not tax$$\n"
          , "DONNIE SCHMIDT: Why are Russian Spies being invited to United States at the same time Trump goes after FBI?? Something stinks and it’s not the lutefisk!!!\n"
          , "DENNIS BUCKLEY: You do mean ....prevent the election of Donald Trump.... right ?\n"
          , "MOJAVE RATTLER:  van These DC jerks Absolutely do not give a rats ass about any citizen until election time. Prez Trump just raised the bar.\n"
          , "GOPISCOMPLICIT: As opposed to the trump’s who would arrest and deport Jesus ...\n"
          , "RABEKKA MARQUEZ: No Nunes is a liar he’s a traitor and a criminal messing and tampering with with documents so no he’ll be going to jails with the trump for messing with our democracy!\n"
          , "ROBERT KNIGHT: You're so tribalistic in your thinking that anyone not 'pro-Trump is automatically 'pro-Obama' Did it ever occur to you that while Obama was a mess that doesn't excuse tRump being a walking pile of dog shit?\n"
          , "BUZZORT: New post (Trump memo Ryan plays down impact on Russia inquiry has been published on Buzzort https://t.co/W625nLgY9g https://t.co/vMZXjT6UcE\n"
          , "ME'ELUM: If Trump is secretly working for Putin why would he build a permanent military base in Ukraine https://t.co/5fqvyHxpht\n"
          , "SDVOSB: TRUMP ADMINISTRATION AMERICA FIRST IS FAKE NEWS TRUMP PENTAGON JUST AWARDED A 1.3 BILLION CONTRACT WHEN THEY VIOLATED THE IRANIAN SANCTIONS AND ARE BLACKLISTED BY KUWAIT GOVERNMENT https://t.co/lCq5z5lDYP\n"
          , "BEN: Coming Soon Trump Thanks May For Not Being Difficult About The NHS Sell-Off #TakingBackControl\n"
          , "R.DAVIDSON: Sad to report that even if the wall is built Trump’s tentacles � would comb-over the wall #laddersneednoapply\n"
          , "AFROPOLITAN: Please people have been even more disrespectful to Trump I know you hate gays so you don't understand why that journalist was so frustrated by how gays are being oppressed in African countries like Zimbabwe &amp African leaders are doing nothing about it.\n"
          , "INVESTIGATIVE PHOTOG: FALSE‼️claims about #SOTU ratings &amp audience size #FakePresident Trump is the creator of #FakeNews https://t.co/36MYTCtVzW\n"
          , "BAMA/PATS FAN BIG BALLER BARKTIST: Crying at this Dirty Money episode on Donald Trump Trump a fool 😂\n"
          , "EFFDONALDTRUMP: FUCK Donald Trump\n"
          , "MIKE CURTIS: Same People Who Orchestrated Ambush on Trump Supporters at Rally! Losers. https://t.co/QlswzPIXPG\n"
          , "TOMI AHONEN: Trump The Man Who Knew Too Little #AddABrandRuinAMovie\n"
          , "EURONEWS: Trump 'set to declassify secret Russia memo https://t.co/j8xocRssjC https://t.co/OSFzUP1dtR\n"
          , "SCHLOMO:  sharp You and your mother are both Trump supporters.\n"
          , "GEE GARZA: It’s people like you this country fucked up you moron Trump is your president don’t forget that bitch😂😂😂😂\n"
          , "THOMAS HARRISON: That's so surprise Trump lies through his teeth every single day He is a pathological liar.\n"
          , "DJULIAN: Poop news getting so desperate they are saying Trump thinking about something is obstruction and rehashing old news opinions from july with no sources cuz the evidence doesn't exist #TDS https://t.co/GYqZvx6v9D\n"
          , "SKIIN   GLEE: WaPo Reporter Falsely Claims Trump Took Pelosi's 'Crumbs Comment 'Out Of Context https://t.co/rpRZfe5MP8\n"
          , "JUICY SPILLER: Playing candy crush wasn’t making a statement Wearing black to oppose trump’s sexual assault allegations was a statement Staying seated to let him know we won’t clap for his tired speech was a statement She did what her constituents wanted ✊🏽\n"
          , "DENNIS BARCHET: What with your's and Trump's predilection for Nicknames It childish and rude. Your use of them shows the weakness of your arguments I will feel very vindicated when the Muellar investigation is complete.\n"
          , "G.ANN: Another Trump lie and propaganda thrown our way https://t.co/qCBBacBUXe\n"
          , "RAM CHARGER: the winter olympic games in border north and south korea and trump ready for turn on the flame¡¡¡¡¡¡¡ that´s stupid\n"
          , "BEAU BOWDEN: I know #Trump loves dropping #media bombshells late on #Fridays but this is #SuperBowl #weekend By #Monday everyone will have forgotten about the #memo.\n"
          , "INFO 24 US: Trump falsely claims mostwatched State of Union #D2 https://t.co/gm7Apss5Br https://t.co/ScLStqYMN2\n"
          , ": When you’re Hispanic people automatically assume you hate trump cause of his immigration proposals lmao Immigration is the last thing on my mind while North Korea is about nuke us any second because of twitter fingers.\n"
          , "NICKY THE: The irony of your response � Stop watching Faux News They are state run propaganda Just keep drinking that Trump kool aid https://t.co/Pkp4AnrXy6\n"
          , "ELIZA WINDSOR: I wouldn't put it past Trump either Friends Nancy and Chuck\n"
          , "KAC: When Donald Trump releases the memo he will be exposing the Democrats and how crooked you are and all of the horrible things you have done to try to destroy our country that's what it will show that's why you don't want it released\n"
          , "ROGER R RIVERA: That leaves Trump out I don’t think anyone was surprised that He was dirty or racist Just another bumbling Idiot who was spending money from dubious sources.. https://t.co/2Jscqjjpm4\n"
          , "HAMZA: Michael Wolff and the Smearing of Nikki Haley https://t.co/UolRJEanL7 Michael Wolff and the Smearing of Nikki Haley The Atlantic Mika Brzezinski Shuts Down Michael Wolff Interview During Spat Over Nikki Haley Rumors HuffPost Wolff fires back at 'Mo https://t.co/6ufRhBYJMy\n"
          , "(   ) ': Trump memo Ryan plays down impact on Russia inquiry https://t.co/QuZXMPOMxA\n"
          , "THE INDEPENDENT: Morning Joe pulls abruptly ends interview with 'Fire and Fury author over Trump affair allegations https://t.co/DSsmfE9VWD https://t.co/HF4KwNUUjR\n"
          , "HANDCRAFTLINE: Trump Falsely Claims Most-Watched State of the Union Address https://t.co/uOvZgSlLrR\n"
          , "GREGORY ALLEN LEEDS: Trump’s Long History With The FBI In 1981 He Offered To “Fully Cooperate https://t.co/Rd3rd87tDA via\n"
          , "WILSON: Stick to writing books instead of trump bashing on twitter every single day!\n"
          , "JOE JOHNSON:  oshea Hard data says streaming not included.. https://t.co/Y5Nq17VB95\n"
          , "JAIMEY PERHAM: Jimmy Kimmel on Trump Releasing Nunes Memo https://t.co/Q8tTNAOm0V via Finally sums this confusing russia investigation in a simple way we all can understand https://t.co/d6VNHuLj3t\n"
          , "BRITTANY MILLER: Trump hits back at Jay-Z after rapper dismissed his claims about black unemployment https://t.co/Am8ezf6RbP\n"
          , "TMCS:  pat henry  Masshole  Foghorn  lonon  Country  Dudderson That's where I think the Dems &amp msm have crossed a line by instilling that hate fueling that rage.. &amp setting it against our President and us They've vilified Trump and his supporters. I've seen tweets where libs say they're justified in *any means used to shut us down &amp; https://t.co/4y9VtcHXpZ\n"
          , "NORTH KOREA 24: North Korea Trump administration's 'sloppy work in Nuclear Posture Review https://t.co/mtiI7ShlhY https://t.co/AR1Tdo3k0b\n"
          , "KIVUMBI NAJIBU: The heads of 3 #Russian intelligence agencies traveled to the #UnitedStates to meet with CIA Director Mike Pompeo amid a series of political rifts between the two sides over US Trump's alleged collusion with Russian officials &amp Washington's renewal of sanctions against Moscow https://t.co/nzfekkiSra\n"
          , "M.: Piers stood behind trump again...I can still see the shite on his nose Any chance of you getting an interview with him🤔\n"
          , "A THOUSAND MOMS: #Mika is hardly a paragon of feminism She bows in defference to Scarborough and they gave #Trump a platform to spew his venom #Wolf is a low life but we all listened and read his book Trump demeans everyone. https://t.co/LcJhBEVx0v\n"
          , "RICHARD MARCHETTI: The Dems want this investigation into Trump and Russia to never end The Dems are want to keep in the news with the FAKE MEDIA shoving down the throat of ever American in the hope it will sway the masses to vote Democrat in mid-term elections.\n"
          , "NATHAN FURST:  PR1D3 Totally makes sense all things being equal BUT you have to consider the source He created a 4 pg memo cherry picked from a 50 pg report &amp has even doctored it since Trump has read it (which indicates Trump gave him “notes”) Shady attempt to discredit the investigations.\n"
          , "DEBATETOLEARN: The dems want to get reelected and having daca on the 2018 ballot box they believe will help them They also want illegal immigration to continue cause it increases our lower class that will be dependant on gov assistance Trump aware of this gives 3X daca but no more illegals\n"
          , "JUSTICEMATTERS!: CIA chief met with SANCTIONED Russian spies officials confirm Defying #RussianSanctions still not implemented by #Trump Admin The meeting represented 'a serious national security issue. -Chuck Schumer https://t.co/ebMjkuEFQQ\n"
          , "ELENI: Chris doesn't have clue what AMERICANS want He hasn't talked to a Joe Schmoe since college or sometime soon after Didn't he say Trump would never win?\n"
          , "CANDICE ANDERSON: Our family is praying for you and your family President Trump 🙇❤💖#POTUS #FLOTUS At this point not sure NP &amp Dems will listen to reason😞🙇\n"
          , "PAUL: Trump hits back at Jay-Z after rapper dismissed his claims about black unemployment\n"
          , "EVERYTHING BLACK: Black Lives Matter protesters spit stomp on flag outside Wisconsin Trump rally Corey Stingley death called hat.. https://t.co/4B4gmP2TLX\n"
          , "STEVE: Your going to be disappointed and let down by Trump.\n"
          , "JULIE: should have done this long ago The nation democracy is dead You let a Russia-GOP coup go 4 a year and the Russians-Jochs have won Tax scam middle class dead debt skyrocketing with tax scam &amp next $1.5 b infra to enrich Trump pals so they can guy new deal\n"
          , "NO NAME: Donald Trump is expected to approve publication of a memo accusing the FBI of abusing its powers.\n"
          , "BASKETBALL JONES: Remember when Kelley was supposed to civilize Trump Now he's drunk the Kool-Aid and/or has Stockholm Syndrome He's aiding and abetting https://t.co/e9sd5PnXhc\n"
      ]
    }
  ]
, speakers:
  {

    "BILL SHORTEN":
    { name: "Bill Shorten"
    , title: "Opposition Leader (Labor Party)"
    },

      "CHER DE LUCCIA": {name: "CHER DE LUCCIA", title: "Date: 02 Feb 2018 Rating: -0.242"},
      "DAVID C KENT JR.": {name: "DAVID C KENT JR.", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DANDY": {name: "DANDY", title: "Date: 02 Feb 2018 Rating: -0.300"},
      "POLITICO EUROPE": {name: "POLITICO EUROPE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "THE BEST OF AFRICA": {name: "THE BEST OF AFRICA", title: "Date: 02 Feb 2018 Rating: -0.125"},
      "ALAN": {name: "ALAN", title: "Date: 02 Feb 2018 Rating: -0.150"},
      "#DEEPSTATELIBERAL": {name: "#DEEPSTATELIBERAL", title: "Date: 02 Feb 2018 Rating: -0.200"},
      "HISTORY NUT": {name: "HISTORY NUT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JENJA": {name: "JENJA", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "LUCIAN KIM": {name: "LUCIAN KIM", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "MARK S RUSHTON": {name: "MARK S RUSHTON", title: "Date: 02 Feb 2018 Rating: -0.200"},
      "JERRY UPTON": {name: "JERRY UPTON", title: "Date: 02 Feb 2018 Rating: -0.267"},
      "KATE CRONK": {name: "KATE CRONK", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ESMARTME": {name: "ESMARTME", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "MY DOG JIM": {name: "MY DOG JIM", title: "Date: 02 Feb 2018 Rating: 0.104"},
      "JADU MANTAR": {name: "JADU MANTAR", title: "Date: 02 Feb 2018 Rating: 0.021"},
      "U FOUND WALDO!!!": {name: "U FOUND WALDO!!!", title: "Date: 02 Feb 2018 Rating: 0.188"},
      "KATJA BEGO": {name: "KATJA BEGO", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "A.SILVER-MEMES GIFS": {name: "A.SILVER-MEMES GIFS", title: "Date: 02 Feb 2018 Rating: -0.350"},
      "MANNY": {name: "MANNY", title: "Date: 02 Feb 2018 Rating: -0.045"},
      "BLOCKER BOT": {name: "BLOCKER BOT", title: "Date: 02 Feb 2018 Rating: 0.700"},
      "LUCAS CONRAD": {name: "LUCAS CONRAD", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "GAIL HOOVER": {name: "GAIL HOOVER", title: "Date: 02 Feb 2018 Rating: -1.000"},
      "ERR": {name: "ERR", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "ALLNEWSNETWORKS US": {name: "ALLNEWSNETWORKS US", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JALAL YACCARINI": {name: "JALAL YACCARINI", title: "Date: 02 Feb 2018 Rating: -0.250"},
      "JEENEREE": {name: "JEENEREE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CRISTINA YANG": {name: "CRISTINA YANG", title: "Date: 02 Feb 2018 Rating: -0.083"},
      "AIMAN DURRANI": {name: "AIMAN DURRANI", title: "Date: 02 Feb 2018 Rating: -0.250"},
      "OSMAN TANSEL ERDEM": {name: "OSMAN TANSEL ERDEM", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "LYNNE GEE": {name: "LYNNE GEE", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "DYSLEXIC_SNOWFLAKE": {name: "DYSLEXIC_SNOWFLAKE", title: "Date: 02 Feb 2018 Rating: 0.176"},
      "ONE MAGICAL WEEKEND": {name: "ONE MAGICAL WEEKEND", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BH": {name: "BH", title: "Date: 02 Feb 2018 Rating: -0.043"},
      "ERIC ALLEN KISNER": {name: "ERIC ALLEN KISNER", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JULIAMONTGOMERYBROWN": {name: "JULIAMONTGOMERYBROWN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JUDITHEFISHER": {name: "JUDITHEFISHER", title: "Date: 02 Feb 2018 Rating: 0.400"},
      "MIKE": {name: "MIKE", title: "Date: 02 Feb 2018 Rating: 0.040"},
      "GOP FAN": {name: "GOP FAN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "HEFTY LEFTY": {name: "HEFTY LEFTY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "TRUMP HOTELS JOBS": {name: "TRUMP HOTELS JOBS", title: "Date: 02 Feb 2018 Rating: 0.600"},
      "OCCUPY CALGARY (YYC)": {name: "OCCUPY CALGARY (YYC)", title: "Date: 02 Feb 2018 Rating: 0.163"},
      "TRUMP": {name: "TRUMP", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "TRUMP WATCH": {name: "TRUMP WATCH", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ERRON GORDON": {name: "ERRON GORDON", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "TRUMP WATCH": {name: "TRUMP WATCH", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "KOAT.COM": {name: "KOAT.COM", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JURK": {name: "JURK", title: "Date: 02 Feb 2018 Rating: 0.333"},
      "ELIJAH PORTILLO": {name: "ELIJAH PORTILLO", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "STEPHENLESLIEJONES": {name: "STEPHENLESLIEJONES", title: "Date: 02 Feb 2018 Rating: 0.227"},
      "PATTY PICKARD": {name: "PATTY PICKARD", title: "Date: 02 Feb 2018 Rating: -0.238"},
      "PAUL VAN DER MEER": {name: "PAUL VAN DER MEER", title: "Date: 02 Feb 2018 Rating: 0.225"},
      "RARE": {name: "RARE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "UMAIR TANVEER": {name: "UMAIR TANVEER", title: "Date: 02 Feb 2018 Rating: -0.156"},
      "THINKPROGRESS": {name: "THINKPROGRESS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SCHR DINGER'S KAT": {name: "SCHR DINGER'S KAT", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "SHIRLEY MOORE": {name: "SHIRLEY MOORE", title: "Date: 02 Feb 2018 Rating: 0.188"},
      "YVONNE NAIRN": {name: "YVONNE NAIRN", title: "Date: 02 Feb 2018 Rating: 0.042"},
      "JJ": {name: "JJ", title: "Date: 02 Feb 2018 Rating: 0.230"},
      "KILOVISION": {name: "KILOVISION", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JANET E DEGEORGE": {name: "JANET E DEGEORGE", title: "Date: 02 Feb 2018 Rating: 0.150"},
      "PT KAISER": {name: "PT KAISER", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SOULS DEFENCE": {name: "SOULS DEFENCE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DOUG": {name: "DOUG", title: "Date: 02 Feb 2018 Rating: 0.350"},
      "JORDIVK AKA YURIBCN": {name: "JORDIVK AKA YURIBCN", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "MY INFO MY NAME IS L": {name: "MY INFO MY NAME IS L", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "TED": {name: "TED", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ALLEN WEST REPUBLIC": {name: "ALLEN WEST REPUBLIC", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "NEWSWEEK": {name: "NEWSWEEK", title: "Date: 02 Feb 2018 Rating: -0.100"},
      "VAGABOND X": {name: "VAGABOND X", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CHRISTOPHER STOKES": {name: "CHRISTOPHER STOKES", title: "Date: 02 Feb 2018 Rating: 0.400"},
      "CHRISTOPHER STOKES": {name: "CHRISTOPHER STOKES", title: "Date: 02 Feb 2018 Rating: 0.357"},
      ".              .": {name: ".              .", title: "Date: 02 Feb 2018 Rating: -0.044"},
      "ABEL": {name: "ABEL", title: "Date: 02 Feb 2018 Rating: 0.600"},
      "BEN WHITE": {name: "BEN WHITE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CHRISTOPHER STOKES": {name: "CHRISTOPHER STOKES", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CHARLENE GOWEN": {name: "CHARLENE GOWEN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "KELLY LYNNE": {name: "KELLY LYNNE", title: "Date: 02 Feb 2018 Rating: 0.122"},
      "NORM DEPLUME": {name: "NORM DEPLUME", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CHRISTOPHER STOKES": {name: "CHRISTOPHER STOKES", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BRIAN DONNELLY": {name: "BRIAN DONNELLY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SUSAN": {name: "SUSAN", title: "Date: 02 Feb 2018 Rating: 0.056"},
      "DOC PARKER": {name: "DOC PARKER", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "DWIGHT WILSON": {name: "DWIGHT WILSON", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "H FISHER COVFEFE": {name: "H FISHER COVFEFE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "LIGHTNDARKNESS": {name: "LIGHTNDARKNESS", title: "Date: 02 Feb 2018 Rating: 0.202"},
      "CANTU S": {name: "CANTU S", title: "Date: 02 Feb 2018 Rating: 0.700"},
      "SOPHIA BAKER": {name: "SOPHIA BAKER", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "INDEPENDENTMIND": {name: "INDEPENDENTMIND", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ZIA MOHAMMED": {name: "ZIA MOHAMMED", title: "Date: 02 Feb 2018 Rating: -0.167"},
      "WATCHDOG": {name: "WATCHDOG", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "AMZSHOPONLINE": {name: "AMZSHOPONLINE", title: "Date: 02 Feb 2018 Rating: 0.100"},
      "RANCE SAYS #RELEASETHEMEMO": {name: "RANCE SAYS #RELEASETHEMEMO", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DEEPFRIED RICE BALLS": {name: "DEEPFRIED RICE BALLS", title: "Date: 02 Feb 2018 Rating: 0.052"},
      "SUPREME MEME": {name: "SUPREME MEME", title: "Date: 02 Feb 2018 Rating: -0.500"},
      "LORI": {name: "LORI", title: "Date: 02 Feb 2018 Rating: -0.067"},
      "SHAWN": {name: "SHAWN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "LARRY GIBSON": {name: "LARRY GIBSON", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "COMPLICIT CONGRESS KILLS DEMOCRACY-NEWS AT 11": {
          name: "COMPLICIT CONGRESS KILLS DEMOCRACY-NEWS AT 11",
          title: "Date: 02 Feb 2018 Rating: -0.120"
      },
      "JONATHAN KNIGHT": {name: "JONATHAN KNIGHT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ASH": {name: "ASH", title: "Date: 02 Feb 2018 Rating: -0.600"},
      "DENNIS KNAKE": {name: "DENNIS KNAKE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "WALTER HOLLAND": {name: "WALTER HOLLAND", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "AMR": {name: "AMR", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "JULIAN ARMSTRONG": {name: "JULIAN ARMSTRONG", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "JENNIE BLOOM": {name: "JENNIE BLOOM", title: "Date: 02 Feb 2018 Rating: 0.050"},
      "CYNTHIA COTE": {name: "CYNTHIA COTE", title: "Date: 02 Feb 2018 Rating: -0.333"},
      "G.O.D.S": {name: "G.O.D.S", title: "Date: 02 Feb 2018 Rating: -0.167"},
      "ANI DIGITAL": {name: "ANI DIGITAL", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "WAYITIS!": {name: "WAYITIS!", title: "Date: 02 Feb 2018 Rating: 1.000"},
      "PAUL YEE": {name: "PAUL YEE", title: "Date: 02 Feb 2018 Rating: -0.333"},
      "HORST BROPHY": {name: "HORST BROPHY", title: "Date: 02 Feb 2018 Rating: -0.200"},
      "BUSTER DELGATO": {name: "BUSTER DELGATO", title: "Date: 02 Feb 2018 Rating: 0.483"},
      "#IDGAFF \_( )_/": {name: "#IDGAFF \_( )_/", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "CHAZ": {name: "CHAZ", title: "Date: 02 Feb 2018 Rating: 0.350"},
      "PAULA TRETKOFF": {name: "PAULA TRETKOFF", title: "Date: 02 Feb 2018 Rating: -0.058"},
      "KAREN CHESTNEY": {name: "KAREN CHESTNEY", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "ANTHONY D'JESUS": {name: "ANTHONY D'JESUS", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "SAFETYPIN-DAILY": {name: "SAFETYPIN-DAILY", title: "Date: 02 Feb 2018 Rating: -0.500"},
      "_KJB": {name: "_KJB", title: "Date: 02 Feb 2018 Rating: -0.017"},
      "LIBERAL&PROUD1963": {name: "LIBERAL&PROUD1963", title: "Date: 02 Feb 2018 Rating: 0.100"},
      "MIKE TOWN": {name: "MIKE TOWN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "TINISKWERL": {name: "TINISKWERL", title: "Date: 02 Feb 2018 Rating: -0.045"},
      "BREAKING NEWS": {name: "BREAKING NEWS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "GALAVANT": {name: "GALAVANT", title: "Date: 02 Feb 2018 Rating: -0.088"},
      "ROBIN": {name: "ROBIN", title: "Date: 02 Feb 2018 Rating: 0.100"},
      "MEL": {name: "MEL", title: "Date: 02 Feb 2018 Rating: 0.356"},
      "BREAKING NEWS": {name: "BREAKING NEWS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NONE THE WISER": {name: "NONE THE WISER", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "PRESIDENT_TRUMP": {name: "PRESIDENT_TRUMP", title: "Date: 02 Feb 2018 Rating: -0.500"},
      "R_OWL_MIRROR": {name: "R_OWL_MIRROR", title: "Date: 02 Feb 2018 Rating: -0.088"},
      "REV TOM HOGLE": {name: "REV TOM HOGLE", title: "Date: 02 Feb 2018 Rating: 0.600"},
      "DOTTIE KIBBLEPANTS": {name: "DOTTIE KIBBLEPANTS", title: "Date: 02 Feb 2018 Rating: 0.095"},
      "B": {name: "B", title: "Date: 02 Feb 2018 Rating: 0.100"},
      "CONSERVATIVE PATRIOT": {name: "CONSERVATIVE PATRIOT", title: "Date: 02 Feb 2018 Rating: -0.450"},
      "STEPHANIE NEBEHAY": {name: "STEPHANIE NEBEHAY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NICK PETTIGREW": {name: "NICK PETTIGREW", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BUSINESS INSIDER SG": {name: "BUSINESS INSIDER SG", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "JKL": {name: "JKL", title: "Date: 02 Feb 2018 Rating: -0.267"},
      "ICEQUEEN": {name: "ICEQUEEN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DARIN BROWN": {name: "DARIN BROWN", title: "Date: 02 Feb 2018 Rating: 0.175"},
      "JUST JOE WITH IT": {name: "JUST JOE WITH IT", title: "Date: 02 Feb 2018 Rating: -0.203"},
      "DAVID KANG": {name: "DAVID KANG", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "MATRIXGHOST1286": {name: "MATRIXGHOST1286", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "US PRESIDENT NEWS": {name: "US PRESIDENT NEWS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CLIFFORD BUSTRIA": {name: "CLIFFORD BUSTRIA", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "RUTH PUNTON": {name: "RUTH PUNTON", title: "Date: 02 Feb 2018 Rating: 0.097"},
      "NICK": {name: "NICK", title: "Date: 02 Feb 2018 Rating: -0.600"},
      "LIL SOCIAL EXPERIMENT": {name: "LIL SOCIAL EXPERIMENT", title: "Date: 02 Feb 2018 Rating: 0.150"},
      "TINA ANGIE ILDEFONSO": {name: "TINA ANGIE ILDEFONSO", title: "Date: 02 Feb 2018 Rating: -0.500"},
      "MUELLER": {name: "MUELLER", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ANT NYP REZ": {name: "ANT NYP REZ", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "A MORBID ATHEIST WHO LOVES DEATHMETAL": {
          name: "A MORBID ATHEIST WHO LOVES DEATHMETAL",
          title: "Date: 02 Feb 2018 Rating: -0.438"
      },
      "IRFAN MALIK JOURNALIST": {name: "IRFAN MALIK JOURNALIST", title: "Date: 02 Feb 2018 Rating: -0.590"},
      "SNOTTBOT": {name: "SNOTTBOT", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "BAPROCTOR": {name: "BAPROCTOR", title: "Date: 02 Feb 2018 Rating: -0.083"},
      "STELLABLUE": {name: "STELLABLUE", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "DONNIE SCHMIDT": {name: "DONNIE SCHMIDT", title: "Date: 02 Feb 2018 Rating: -0.333"},
      "DENNIS BUCKLEY": {name: "DENNIS BUCKLEY", title: "Date: 02 Feb 2018 Rating: -0.013"},
      "MOJAVE RATTLER": {name: "MOJAVE RATTLER", title: "Date: 02 Feb 2018 Rating: -0.100"},
      "MARIANO": {name: "MARIANO", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "DEE3598": {name: "DEE3598", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SHARON": {name: "SHARON", title: "Date: 02 Feb 2018 Rating: 0.438"},
      "GOPISCOMPLICIT": {name: "GOPISCOMPLICIT", title: "Date: 02 Feb 2018 Rating: -0.050"},
      "MIDWESTBUTTHURTNBS": {name: "MIDWESTBUTTHURTNBS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "PETE DE LEON": {name: "PETE DE LEON", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DEAN WEST": {name: "DEAN WEST", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "NETWORKOFNEWS GHANA": {name: "NETWORKOFNEWS GHANA", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CHERYL CASEY ROSS": {name: "CHERYL CASEY ROSS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SHELLY": {name: "SHELLY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DANIEL STRIEFF": {name: "DANIEL STRIEFF", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "HEALTH NEWS": {name: "HEALTH NEWS", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "GODNEYBJS": {name: "GODNEYBJS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "RABEKKA MARQUEZ": {name: "RABEKKA MARQUEZ", title: "Date: 02 Feb 2018 Rating: -0.500"},
      "BOT COMMAND": {name: "BOT COMMAND", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DEION WOOLLEY": {name: "DEION WOOLLEY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ROBERT KNIGHT": {name: "ROBERT KNIGHT", title: "Date: 02 Feb 2018 Rating: -0.142"},
      "BUZZORT": {name: "BUZZORT", title: "Date: 02 Feb 2018 Rating: -0.010"},
      "CAROL OLSEN": {name: "CAROL OLSEN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "KING TIMBIG": {name: "KING TIMBIG", title: "Date: 02 Feb 2018 Rating: 0.800"},
      "MICHAEL D SCHMIDT": {name: "MICHAEL D SCHMIDT", title: "Date: 02 Feb 2018 Rating: 0.125"},
      "ELIZABETH": {name: "ELIZABETH", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "STEVE HOLMES": {name: "STEVE HOLMES", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ME'ELUM": {name: "ME'ELUM", title: "Date: 02 Feb 2018 Rating: -0.433"},
      "NYZAP": {name: "NYZAP", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "MARIANO": {name: "MARIANO", title: "Date: 02 Feb 2018 Rating: 0.350"},
      "JOHN ALBERT": {name: "JOHN ALBERT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CONSERVATIVE LADY": {name: "CONSERVATIVE LADY", title: "Date: 02 Feb 2018 Rating: 0.433"},
      "BONEBLACK": {name: "BONEBLACK", title: "Date: 02 Feb 2018 Rating: 0.100"},
      "18D.MEDIA": {name: "18D.MEDIA", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "18D.MEDIA": {name: "18D.MEDIA", title: "Date: 02 Feb 2018 Rating: 0.050"},
      "18D.MEDIA": {name: "18D.MEDIA", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "KATE~STILL NASTY!": {name: "KATE~STILL NASTY!", title: "Date: 02 Feb 2018 Rating: 0.400"},
      "FINLEY CORDAIN": {name: "FINLEY CORDAIN", title: "Date: 02 Feb 2018 Rating: 0.400"},
      "CAROL OLSEN": {name: "CAROL OLSEN", title: "Date: 02 Feb 2018 Rating: 0.633"},
      "TAP WATER TURNS YOU TRIPLE GAY [BOT]": {
          name: "TAP WATER TURNS YOU TRIPLE GAY [BOT]",
          title: "Date: 02 Feb 2018 Rating: 0.000"
      },
      "KB": {name: "KB", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "THE RUDE CANADIAN": {name: "THE RUDE CANADIAN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SIMON FOX": {name: "SIMON FOX", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "MARIANNE": {name: "MARIANNE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ENERGY VOICE": {name: "ENERGY VOICE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "IVAN PER": {name: "IVAN PER", title: "Date: 02 Feb 2018 Rating: 0.400"},
      "THUMPER4066": {name: "THUMPER4066", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SDVOSB": {name: "SDVOSB", title: "Date: 02 Feb 2018 Rating: -0.125"},
      "G.ANN": {name: "G.ANN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ERIC MUIRHEAD": {name: "ERIC MUIRHEAD", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "HARAH": {name: "HARAH", title: "Date: 02 Feb 2018 Rating: 0.039"},
      "MELANIA TRUMP": {name: "MELANIA TRUMP", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "BEN": {name: "BEN", title: "Date: 02 Feb 2018 Rating: -0.150"},
      "CHRIS TREVI O": {name: "CHRIS TREVI O", title: "Date: 02 Feb 2018 Rating: 0.188"},
      "R.DAVIDSON": {name: "R.DAVIDSON", title: "Date: 02 Feb 2018 Rating: -0.500"},
      "AFROPOLITAN": {name: "AFROPOLITAN", title: "Date: 02 Feb 2018 Rating: -0.200"},
      "ERR": {name: "ERR", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "PAKISTAN WIRE": {name: "PAKISTAN WIRE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "LIFE OF ACTIONS": {name: "LIFE OF ACTIONS", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "SKIIN   GLEE": {name: "SKIIN   GLEE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "INVESTIGATIVE PHOTOG": {name: "INVESTIGATIVE PHOTOG", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "BARBOHELLNO": {name: "BARBOHELLNO", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "AYN VAN BERGLAND": {name: "AYN VAN BERGLAND", title: "Date: 02 Feb 2018 Rating: 0.067"},
      "PRES COIN": {name: "PRES COIN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SUCKERED SOB": {name: "SUCKERED SOB", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BAMA/PATS FAN BIG BALLER BARKTIST": {
          name: "BAMA/PATS FAN BIG BALLER BARKTIST",
          title: "Date: 02 Feb 2018 Rating: -0.400"
      },
      "PRES COIN": {name: "PRES COIN", title: "Date: 02 Feb 2018 Rating: 0.183"},
      "EFFDONALDTRUMP": {name: "EFFDONALDTRUMP", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "STACYFORTNER": {name: "STACYFORTNER", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "MIKE CURTIS": {name: "MIKE CURTIS", title: "Date: 02 Feb 2018 Rating: -0.100"},
      "ROJERAILS": {name: "ROJERAILS", title: "Date: 02 Feb 2018 Rating: 1.000"},
      "TOMI AHONEN": {name: "TOMI AHONEN", title: "Date: 02 Feb 2018 Rating: -0.188"},
      "MIKEMERLINATOR": {name: "MIKEMERLINATOR", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "VEILLE INFO HUB": {name: "VEILLE INFO HUB", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "LEXXFTW": {name: "LEXXFTW", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SKIIN   GLEE": {name: "SKIIN   GLEE", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "EURONEWS": {name: "EURONEWS", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "SAMANTHA JONES": {name: "SAMANTHA JONES", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "TWITCHER": {name: "TWITCHER", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ANDY FREEDOM": {name: "ANDY FREEDOM", title: "Date: 02 Feb 2018 Rating: 0.125"},
      "MARYHOLLIS TROUP": {name: "MARYHOLLIS TROUP", title: "Date: 02 Feb 2018 Rating: 0.550"},
      "NIK KERSHAW": {name: "NIK KERSHAW", title: "Date: 02 Feb 2018 Rating: 0.246"},
      "SCHLOMO": {name: "SCHLOMO", title: "Date: 02 Feb 2018 Rating: -0.125"},
      "THEHAWAIIGUY": {name: "THEHAWAIIGUY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "HEALTH NEWS": {name: "HEALTH NEWS", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "GEE GARZA": {name: "GEE GARZA", title: "Date: 02 Feb 2018 Rating: -0.700"},
      "THOMAS HARRISON": {name: "THOMAS HARRISON", title: "Date: 02 Feb 2018 Rating: -0.071"},
      "MAYARRI": {name: "MAYARRI", title: "Date: 02 Feb 2018 Rating: 0.425"},
      "DJULIAN": {name: "DJULIAN", title: "Date: 02 Feb 2018 Rating: -0.250"},
      "NORTHIERTHANTHOU.COM": {name: "NORTHIERTHANTHOU.COM", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BMINORTHREAT": {name: "BMINORTHREAT", title: "Date: 02 Feb 2018 Rating: 0.141"},
      "JANE SMITH": {name: "JANE SMITH", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DAVID SHIMBERG": {name: "DAVID SHIMBERG", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "CORA": {name: "CORA", title: "Date: 02 Feb 2018 Rating: 0.333"},
      "DWIGHT": {name: "DWIGHT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "YANN COCQUET": {name: "YANN COCQUET", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "TWITCHER": {name: "TWITCHER", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "ANTONIA FILMER": {name: "ANTONIA FILMER", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "SKIIN   GLEE": {name: "SKIIN   GLEE", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "WILLIAM BRYANT": {name: "WILLIAM BRYANT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "PATRIOT    LIFELOVER": {name: "PATRIOT    LIFELOVER", title: "Date: 02 Feb 2018 Rating: 0.037"},
      "JUICY SPILLER": {name: "JUICY SPILLER", title: "Date: 02 Feb 2018 Rating: -0.022"},
      "EDMUND SULLIVAN": {name: "EDMUND SULLIVAN", title: "Date: 02 Feb 2018 Rating: 0.022"},
      "DENNIS BARCHET": {name: "DENNIS BARCHET", title: "Date: 02 Feb 2018 Rating: -0.050"},
      "DEPLORABLYDEPLORABLE": {name: "DEPLORABLYDEPLORABLE", title: "Date: 02 Feb 2018 Rating: 0.383"},
      "_59ALEX": {name: "_59ALEX", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "B": {name: "B", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "LAURENCE MONG": {name: "LAURENCE MONG", title: "Date: 02 Feb 2018 Rating: 0.375"},
      "G.ANN": {name: "G.ANN", title: "Date: 02 Feb 2018 Rating: -0.100"},
      "OSMAN TANSEL ERDEM": {name: "OSMAN TANSEL ERDEM", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "VETERAN4TRUMP": {name: "VETERAN4TRUMP", title: "Date: 02 Feb 2018 Rating: 0.143"},
      "KENNETH G EADE": {name: "KENNETH G EADE", title: "Date: 02 Feb 2018 Rating: 1.000"},
      "RAM CHARGER": {name: "RAM CHARGER", title: "Date: 02 Feb 2018 Rating: -0.300"},
      "CYNTHIA": {name: "CYNTHIA", title: "Date: 02 Feb 2018 Rating: 0.222"},
      "BEAU BOWDEN": {name: "BEAU BOWDEN", title: "Date: 02 Feb 2018 Rating: -0.300"},
      "INFO 24 US": {name: "INFO 24 US", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "LUIMBE": {name: "LUIMBE", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "KEN Z": {name: "KEN Z", title: "Date: 02 Feb 2018 Rating: 0.117"},
      "ROLLIBY": {name: "ROLLIBY", title: "Date: 02 Feb 2018 Rating: 0.136"},
      "BARBARA LANDREE": {name: "BARBARA LANDREE", title: "Date: 02 Feb 2018 Rating: 0.117"},
      "HONEYSEOK": {name: "HONEYSEOK", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JUSTINSCAKE": {name: "JUSTINSCAKE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "": {name: "", title: "Date: 02 Feb 2018 Rating: -0.050"},
      "NEAL O'CONNOR": {name: "NEAL O'CONNOR", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NICKY THE": {name: "NICKY THE", title: "Date: 02 Feb 2018 Rating: -0.100"},
      "ELIZA WINDSOR": {name: "ELIZA WINDSOR", title: "Date: 02 Feb 2018 Rating: -0.250"},
      "STEVEBANNONSNOSE": {name: "STEVEBANNONSNOSE", title: "Date: 02 Feb 2018 Rating: 0.075"},
      "THE CRUZZZING SPOT": {name: "THE CRUZZZING SPOT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "MAKE ALL GREAT AGAIN": {name: "MAKE ALL GREAT AGAIN", title: "Date: 02 Feb 2018 Rating: 0.800"},
      "JAY GOOSE": {name: "JAY GOOSE", title: "Date: 02 Feb 2018 Rating: 0.600"},
      "JENNIFER MARTIN": {name: "JENNIFER MARTIN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ROBERTO RE": {name: "ROBERTO RE", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "ALI ...BIASED #FBPE": {name: "ALI ...BIASED #FBPE", title: "Date: 02 Feb 2018 Rating: 0.067"},
      "TRENDR": {name: "TRENDR", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "KAC": {name: "KAC", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "TRENDR": {name: "TRENDR", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "RAVEN ROTH #NUNESHOAX #NUNESFAKEMEMO": {
          name: "RAVEN ROTH #NUNESHOAX #NUNESFAKEMEMO",
          title: "Date: 02 Feb 2018 Rating: 0.000"
      },
      "ROGER R RIVERA": {name: "ROGER R RIVERA", title: "Date: 02 Feb 2018 Rating: -0.433"},
      "TRENDR": {name: "TRENDR", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "INDICESENELMES": {name: "INDICESENELMES", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "STEPHEN MASSEY": {name: "STEPHEN MASSEY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "PACIFIC ST JOURNAL": {name: "PACIFIC ST JOURNAL", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JOANNE MARSLAND": {name: "JOANNE MARSLAND", title: "Date: 02 Feb 2018 Rating: 0.391"},
      "GOOGLE NEWS US": {name: "GOOGLE NEWS US", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JEEPEG": {name: "JEEPEG", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DEEEEEEEEF": {name: "DEEEEEEEEF", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SHWE NEW AGAIN": {name: "SHWE NEW AGAIN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JEFF BRUNTON": {name: "JEFF BRUNTON", title: "Date: 02 Feb 2018 Rating: 0.067"},
      "MJ": {name: "MJ", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "JENNY": {name: "JENNY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "THOMAS WICTOR": {name: "THOMAS WICTOR", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "MR HANNA": {name: "MR HANNA", title: "Date: 02 Feb 2018 Rating: 0.600"},
      "JOHN M": {name: "JOHN M", title: "Date: 02 Feb 2018 Rating: 0.025"},
      "HAMZA": {name: "HAMZA", title: "Date: 02 Feb 2018 Rating: -0.078"},
      "JONATHAN GIARDINA": {name: "JONATHAN GIARDINA", title: "Date: 02 Feb 2018 Rating: 0.015"},
      "SHERRYM": {name: "SHERRYM", title: "Date: 02 Feb 2018 Rating: 0.007"},
      "PETE HOLBROOK": {name: "PETE HOLBROOK", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BOUBOU": {name: "BOUBOU", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "(   ) '": {name: "(   ) '", title: "Date: 02 Feb 2018 Rating: -0.156"},
      "THE INDEPENDENT": {name: "THE INDEPENDENT", title: "Date: 02 Feb 2018 Rating: -0.125"},
      "SHERRY_RESON": {name: "SHERRY_RESON", title: "Date: 02 Feb 2018 Rating: 0.237"},
      "THOMAS STEEN": {name: "THOMAS STEEN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "EVILEYE": {name: "EVILEYE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NEIL MULVIHILL": {name: "NEIL MULVIHILL", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "HANDCRAFTLINE": {name: "HANDCRAFTLINE", title: "Date: 02 Feb 2018 Rating: 0.333"},
      "MARGE DAVIS": {name: "MARGE DAVIS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "HANDCRAFTLINE": {name: "HANDCRAFTLINE", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "GREGORY ALLEN LEEDS": {name: "GREGORY ALLEN LEEDS", title: "Date: 02 Feb 2018 Rating: -0.050"},
      "HANDCRAFTLINE": {name: "HANDCRAFTLINE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ART SMITH": {name: "ART SMITH", title: "Date: 02 Feb 2018 Rating: 0.562"},
      "NORTHIERTHANTHOU.COM": {name: "NORTHIERTHANTHOU.COM", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "KENNEDY MOLLOY": {name: "KENNEDY MOLLOY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "WILSON": {name: "WILSON", title: "Date: 02 Feb 2018 Rating: -0.089"},
      "BILL": {name: "BILL", title: "Date: 02 Feb 2018 Rating: 0.150"},
      "H FISHER COVFEFE": {name: "H FISHER COVFEFE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "DAVID BERNARD": {name: "DAVID BERNARD", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "JOE JOHNSON": {name: "JOE JOHNSON", title: "Date: 02 Feb 2018 Rating: -0.292"},
      "ADRIAN TORR": {name: "ADRIAN TORR", title: "Date: 02 Feb 2018 Rating: 0.243"},
      "JUSTIN": {name: "JUSTIN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "JAIMEY PERHAM": {name: "JAIMEY PERHAM", title: "Date: 02 Feb 2018 Rating: -0.100"},
      "LIBERAL&PROUD1963": {name: "LIBERAL&PROUD1963", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BENTILLERMAN": {name: "BENTILLERMAN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "WEBVIXEN": {name: "WEBVIXEN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BRITTANY MILLER": {name: "BRITTANY MILLER", title: "Date: 02 Feb 2018 Rating: -0.083"},
      "TMCS": {name: "TMCS", title: "Date: 02 Feb 2018 Rating: -0.185"},
      "PROF JENS MUELLER": {name: "PROF JENS MUELLER", title: "Date: 02 Feb 2018 Rating: 0.050"},
      "NORTH KOREA 24": {name: "NORTH KOREA 24", title: "Date: 02 Feb 2018 Rating: -0.417"},
      "KIVUMBI NAJIBU": {name: "KIVUMBI NAJIBU", title: "Date: 02 Feb 2018 Rating: -0.025"},
      "M.": {name: "M.", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "TEXAN FOR TRUMP": {name: "TEXAN FOR TRUMP", title: "Date: 02 Feb 2018 Rating: 0.350"},
      "FREE EDUCATION": {name: "FREE EDUCATION", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NIGEL ALLERBY": {name: "NIGEL ALLERBY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "A THOUSAND MOMS": {name: "A THOUSAND MOMS", title: "Date: 02 Feb 2018 Rating: -0.146"},
      "LAINTAIN": {name: "LAINTAIN", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "TERRY NEWBERRY": {name: "TERRY NEWBERRY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "AYN VAN BERGLAND": {name: "AYN VAN BERGLAND", title: "Date: 02 Feb 2018 Rating: 0.400"},
      "TIDBIT": {name: "TIDBIT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "RICHARD MARCHETTI": {name: "RICHARD MARCHETTI", title: "Date: 02 Feb 2018 Rating: -0.219"},
      "TECHNOBUFFALO_EBOOKS": {name: "TECHNOBUFFALO_EBOOKS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BETH DENEAU": {name: "BETH DENEAU", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CRISTRINA": {name: "CRISTRINA", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NUNYABEEZNESS": {name: "NUNYABEEZNESS", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "MALCOLM": {name: "MALCOLM", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "MARIA ALLEN": {name: "MARIA ALLEN", title: "Date: 02 Feb 2018 Rating: 0.800"},
      "NATHAN FURST": {name: "NATHAN FURST", title: "Date: 02 Feb 2018 Rating: -0.083"},
      "DEBATETOLEARN": {name: "DEBATETOLEARN", title: "Date: 02 Feb 2018 Rating: -0.167"},
      "JUSTICEMATTERS!": {name: "JUSTICEMATTERS!", title: "Date: 02 Feb 2018 Rating: -0.167"},
      "GARNERBARRO": {name: "GARNERBARRO", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ADELICIA BRAVE": {name: "ADELICIA BRAVE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ELENI": {name: "ELENI", title: "Date: 02 Feb 2018 Rating: -0.400"},
      "DONUTS BEFORE BRONUTS": {name: "DONUTS BEFORE BRONUTS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CARMEN": {name: "CARMEN", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "COURAGE": {name: "COURAGE", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "MIKE BECKER": {name: "MIKE BECKER", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "CANDICE ANDERSON": {name: "CANDICE ANDERSON", title: "Date: 02 Feb 2018 Rating: -0.250"},
      "LESLIE HUGHES": {name: "LESLIE HUGHES", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "LATASHA WILLIAMS": {name: "LATASHA WILLIAMS", title: "Date: 02 Feb 2018 Rating: 0.250"},
      "KATIE PRESSLEY": {name: "KATIE PRESSLEY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "PAUL": {name: "PAUL", title: "Date: 02 Feb 2018 Rating: -0.083"},
      "NOAH BARKIN": {name: "NOAH BARKIN", title: "Date: 02 Feb 2018 Rating: 0.357"},
      "18 VNSL": {name: "18 VNSL", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ORGANICS": {name: "ORGANICS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "EVERYTHING BLACK": {name: "EVERYTHING BLACK", title: "Date: 02 Feb 2018 Rating: -0.083"},
      "JEAN MUMFORD": {name: "JEAN MUMFORD", title: "Date: 02 Feb 2018 Rating: 0.167"},
      "GOD&USA2THEMAX": {name: "GOD&USA2THEMAX", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "": {name: "", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SANDY ANDERSON": {name: "SANDY ANDERSON", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NORM DEPLUME": {name: "NORM DEPLUME", title: "Date: 02 Feb 2018 Rating: 0.300"},
      "NOPCWITHME": {name: "NOPCWITHME", title: "Date: 02 Feb 2018 Rating: 0.475"},
      "STEVE": {name: "STEVE", title: "Date: 02 Feb 2018 Rating: -0.453"},
      "JULIE": {name: "JULIE", title: "Date: 02 Feb 2018 Rating: -0.052"},
      "SADUJ TOIRACSI": {name: "SADUJ TOIRACSI", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "NO NAME": {name: "NO NAME", title: "Date: 02 Feb 2018 Rating: -0.100"},
      "OUR LADY TRACY OF THE MOST PATIENT": {
          name: "OUR LADY TRACY OF THE MOST PATIENT",
          title: "Date: 02 Feb 2018 Rating: 0.300"
      },
      "BOT_POLITICAL": {name: "BOT_POLITICAL", title: "Date: 02 Feb 2018 Rating: 0.200"},
      "HOBOSCRATCH": {name: "HOBOSCRATCH", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "READABLOGABOUTIT": {name: "READABLOGABOUTIT", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "BASKETBALL JONES": {name: "BASKETBALL JONES", title: "Date: 02 Feb 2018 Rating: -0.500"},
      "DR DRAKE": {name: "DR DRAKE", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "MARGARET VENZ": {name: "MARGARET VENZ", title: "Date: 02 Feb 2018 Rating: 0.215"},
      "DAVID O'HALLORAN": {name: "DAVID O'HALLORAN", title: "Date: 02 Feb 2018 Rating: 0.500"},
      "MADELINE WASHER OF BRAINS": {name: "MADELINE WASHER OF BRAINS", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "SAFETYPIN-DAILY": {name: "SAFETYPIN-DAILY", title: "Date: 02 Feb 2018 Rating: 0.000"},
      "ROEL LOFTIS": {name: "ROEL LOFTIS", title: "Date: 02 Feb 2018 Rating: 0.000"}

    , "MALCOLM TURNBULL":
    { name: "Malcolm Turnbull"
    , title: "Prime Minister of Australia (Liberal)"
    }

  }
, topics:
  [
      {name: "President", re: /\b(president)\b/gi, x: 422, y: 90},
      {name: "memo", re: /\b(memo)\b/gi, x: 226, y: 835},
      {name: "new", re: /\b(new)\b/gi, x: 17, y: 365},
      {name: "want", re: /\b(want)\b/gi, x: 840, y: 827},
      {name: "people", re: /\b(people)\b/gi, x: 252, y: 301},
      {name: "Donald", re: /\b(donald)\b/gi, x: 862, y: 517},
      {name: "Russia", re: /\b(russia)\b/gi, x: 365, y: 161},
      {name: "Dem", re: /\b(dem)\b/gi, x: 744, y: 620},
      {name: "Russian", re: /\b(russian)\b/gi, x: 545, y: 219},
      {name: "make", re: /\b(make)\b/gi, x: 338, y: 123},
      {name: "know", re: /\b(know)\b/gi, x: 782, y: 226},
      {name: "even", re: /\b(even)\b/gi, x: 236, y: 722},
      {name: "one", re: /\b(one)\b/gi, x: 666, y: 442},
      {name: "time", re: /\b(time)\b/gi, x: 725, y: 333},
      {name: "release", re: /\b(release)\b/gi, x: 399, y: 395},
      {name: "need", re: /\b(need)\b/gi, x: 37, y: 422},
      {name: "right", re: /\b(right)\b/gi, x: 114, y: 148},
      {name: "love", re: /\b(love)\b/gi, x: 575, y: 810},
      {name: "FBI", re: /\b(fbi)\b/gi, x: 229, y: 147},
      {name: "help", re: /\b(help)\b/gi, x: 349, y: 201},
      {name: "lie", re: /\b(lie)\b/gi, x: 343, y: 269},
      {name: "us", re: /\b(us)\b/gi, x: 26, y: 23},
      {name: "never", re: /\b(never)\b/gi, x: 819, y: 292},
      {name: "give", re: /\b(give)\b/gi, x: 867, y: 860},
      {name: "think", re: /\b(think)\b/gi, x: 426, y: 834},
      {name: "America", re: /\b(america)\b/gi, x: 818, y: 823}
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
