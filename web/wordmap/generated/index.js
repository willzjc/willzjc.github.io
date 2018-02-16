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
, "JOHANNA B RSCH-SUPAN: Comes highly recommended from Emma (5 in my home and may be complemented by Zita Spacegirl a grafic novel for young brave readers #Vorlesen https://t.co/kvMCIH2eYp\n"
, "CRUMBCATCHINGPATRIOT:  USA Lol So what?\n"
, "TINA ZITA: What to chat STEAM  girly is sharing a bit about her journey tomorrow at 4 at West Acres Originally just for friends in the south east we are always welcome for more friends to join us ��� #peel21st\n"
, "JAMES K SUMMERS: all those other girls lmao aka...2 people zita ]\n"
, "TINA ZITA:  brnrd  brnrd Awesome Let us know if there is anything we can help with.\n"
, "TINA ZITA:  pd Quoting other great people ��� papert was one smart cookie\n"
, "MRS ANISKO-CLUTTON:  brnrd  zita  brnrd Thanks  brnrd for taking part in the PD (and one for the team) Can't wait to hear what you learned #BearsESTEAM #ownyourownPD  brnrd\n"
, "MRS WILSON: Thanks  zita for sharing your expertise and for moderating this amazing webinar Learned a lot and am excited to get started with  brnrd #makered #STEAM #elemaker https://t.co/Xh4MtCIOif\n"
, "SURIL SHAH: Children learn best when they are actively engaged in constructing something that is personal meaning to them great quote by  zita in today’s  pd webinar #makered\n"
, "JOAQU N BARBOZA: Dear Mr Vasquez A question Did some girl of the Skool have a crush on Zim Really Akin acted so nice for him and Zita and Sarah don't appear to have any against him?\n"
, "BAY AREA RECRUITS: 🔥Senior Season Highlights🔥 ✔️Marvin Pusung-Zita (  52 ) 🎓Mission (San Francisco High School ‘18 ��� DE/OLB 📏6’1 225 lbs 🎥Full Highlights (https://t.co/9juHrq8OgO) #BayFBRecruits18 https://t.co/szkdpP5l5k\n"
, "HOWLING SARGE:  zita It means the Clinton Cartel is finished and the Dems are attempting to resurrect the The First Family of modern political corruption Mafia influence by any other name .\n"
, "CRUMBCATCHINGPATRIOT: Dana Perino said on Fox at Five; I liked Kennedy’s speech. WOW\n"
, "TODD DISKIN: If you've heard about Vanport but don't know the full story tonight is a great opportunity to learn more about it and how the Vanport experience impacts the lives of Portlanders today 6 PM at Kenton Library https://t.co/LKCS4NGQQr #pdx\n"
, "SUSAN WATT:  pd  zita I'm sure you can still get in Jen Send an email off to OTF and and they will register you I know none of them are at capacity.\n"
, "TINA ZITA: Tomorrow night we are chatting EML citizenship &amp Don’t know the goals check this out Numbers In Action https://t.co/2m65JZKnD0 Don’t miss this chat #Peel21st Spread the word Cc\n"
, "JEN APGAR:  pd Looks like 'free tickets are expired for tonight and tomorrow's sessions Any options for those late to the game but excited to join  zita\n"
, "CRUMBCATCHINGPATRIOT: Lol I just watched Support ❤️🎯\n"
, "SHANNON DUBE:  zita Thanks for the follow!\n"
, "NATALIE SCHNEIDER:  zita Reading right now &amp love Thx to\n"
, "SHANNON PETRACCO:  zita Loved this book!\n"
, "KIDS CONNECT:  zita  sumner  Ics Please forgive my abridged reply I love sharing great reads but I don’t like to tag anyone into a “chain”.. so thank you for the ideas all and here’s one I adore https://t.co/uVK1b4vBXP\n"
, "NAN SUMNER:  Ics  zita  king  sparks Upload the cover of a great book without saying why mention who invited you Invite 8 others to do the same  WitsEnd https://t.co/bEjcC3tdoL\n"
, "CRUMBCATCHINGPATRIOT: I just read a thread of direct quotes from a/b 10 of them All were at a/b second grade level on grammar punctuation etc most weren’t even sentences Their answers were hilarious.\n"
, "OTF PROFESSIONAL DEV: Checked out the #OTFConnects February calendar Full of rich professional learning opportunities REGISTER NOW https://t.co/Ht2H8i17a1 #onted #ontedu  zita\n"
, "JODIE: Me too Zita I find it so hard in the winter too ��� I basically wear 5 layers a scarf and coat so don’t think anyone would be interested haha\n"
, "ZITA KEELEY: Ketchikan Alaska A Taste from All the Best with Zita Keeley https://t.co/yglYlaVmHn\n"
, "CRUMBCATCHINGPATRIOT: Memo 'Reporting Proves 100 Percent that the American Media are Part of the Democrat Party https://t.co/DLQgmhuL8O via\n"
, "ZITA:  tweeter Hey I have a wait for it .. wait .. (did you know there's more than 140 characters here now?) ... a snow shovel. I kid you not I'd go take a pic of it but I'm scared the blizzard might blow me away....\n"
, "BARRY:  eskills Ah sure ya have to try and cheer up Twitter every so often.. which reminds me must get the chainsaw at the doors later just in case we wake up to drifts!\n"
, "CAM: Tune into at 8.30PM for more adventures with #TheWorstWitch this evening With and Zita Sattar https://t.co/1ik3prjk3r\n"
, "ZITA: Ok Twitter android Sony whoever I cannot type new tweets only works after paste Also just discovered twitter can be great fun I only used it to see news etc...\n"
, "ZITA:  tweeter Lol Barry u r gas.\n"
, "ZITA: Omg this is sooo funny https://t.co/GVfZf8zCl7\n"
, "ZITA: I feel like a kid in a sweet shop! why did I not know this before Guys you have sth seriously good you are not advertising! Boy are the kids gonna be surprised Hey kids don't use twitter Mhahahs (evil laugh https://t.co/MdbJIIsK8e\n"
, "LISA NOBLE:  Ics  zita  sumner  king  sparks  F  bennett Did a fiction one already so....nomination from Upload a fave book cover and challenge 8 more readers  kate https://t.co/MWegmhp1Zk\n"
, "RACHEL MACDONALD: “Rachel look how skinny you are in this photo YEAH OK WE GET IT ZITA IM A FAT SHIT NOW\n"
, "CLASSIC HITS RADIO: The Best songs #rock #pop #dance #latino #np Zita Swoon Disco https://t.co/U8w47MHfVy\n"
, "ZULEQA HUSAIN: Hi there Trying to reach Zita Moldovan Would love to have her on our 1/2 hr talk show this Wed Feb7 2018 Do let me know if she or anyone else from your org would be available to join Thanks!\n"
, "SHOREFAST: Feb 16th Zita Cobb will be speaking alongside international artist Eric Fischl for a conversation with the New Yorker's Adam Davidson on 'How Art Can (and Can't Save a Place at in NYC Tickets are available once more follow the link for details https://t.co/L6QWrewSWl https://t.co/Imm0kgweRV\n"
, "R O Z V I P R I N C E S S:  dj This inini newe tiri vamwe wat wat lol dnt knw the name got it pa WA 😂so haina zita\n"
, "KINDERTEAM NIAGARA:  Ics  zita  sumner  king  sparks  mulc  J Cruise Great book They loved it The wonder of language and communication.\n"
, "WEST AUCKLAND: Wild Claydol found  West (16 Zita Maria Dr Massey) Available until 06:54:22 (29m 16s) https://t.co/lg729aiIHY\n"
, "SIR MARCUS WARRY: King Arthur supervising whilst Zita &amp I clear and clean Lady Doris in advance of the repairs! https://t.co/RCTs7j5Jpw\n"
, "IMMANUEL EMAISNABELA:  FM  1  Specter In one word my weekend was LOVELY I want to wish Zita all the best in her Clinicals I request 'PERFECT by to her and also to My Super Mum Madam Gladys she is my first love Mum I Love You\n"
, "THE RHS:  ELZE  RHS Looking forward to seeing you there Zita :)\n"
, "MRS MCINTYRE:  Ics  zita  sumner  king  sparks Upload the cover of a great book w/o saying why-mention who invited you  Ics-invite 8 others to do the same:  F  bennett https://t.co/R8rOowjrpe\n"
, "MME RT:  zita  Ics  sumner  king  sparks  mulc  J Cruise Thx for tagging me :)\n"
, "DONALD CAMPBELL: Upload the cover of a great book without saying why mention who invited you  les invite 8 others to do the same  lal peel  zita https://t.co/uEg9OVCfDT\n"
, "JANIS CASTLE JONES:  Ics  zita  sumner  king  sparks  mulc  J Cruise Oooo this is a new one for me....can't wait to check it out I'll have to think about what my upload will be :)\n"
, "ANGELO MIZZI:  zita  Ics  sumner  king  sparks  mulc  J Cruise Such a great book 😊\n"
, "ANGELO MIZZI:  Ics  zita  sumner  king  sparks Upload the cover of a great book without saying why mention who invited you  Ics Invite 8 others to do the same  mulc  J Cruise https://t.co/zaafvqVex1\n"
, "TRACY BRISCOE:  Ics  zita  sumner  king  sparks Upload the cover of a great book without saying why mention who invited you Invite 8 others to do the same https://t.co/MVbWhMCDMP\n"
, "ZI.KA: Your week appears to get off to a good start because you don’t.. More for Virgo https://t.co/6XSytJf47k\n"
, "TINA ZITA:  McCrimmon Thanks for sharing\n"
, "ZITA: If poor people can not afford computers for their kids does this mean kids can not learn to #code? Not at all! is encouraging ALL to run #codingSimulator workshops Easy Cheap And your mums grandmas aunties can teach young girls https://t.co/7WNULilDrS\n"
, "MIHAJLO:  contest  times Battle of Aleppo 2012-2016 lasted much longer It still mind boggling for me how the Damascus (Ghuta and Home (Kafr Zita pockets survive They produce weapons?\n"
, "LIZ| VANILLA DOOFENCAKES:  chell Heh it was great tbh I had a giggling fit Gn/gm to you too!\n"
, "LIZ| VANILLA DOOFENCAKES:  chell HHHHH YES PUNS THANKS YA LOVELY HUMAN\n"
, "ZITA: 2/2 Fun Robotics If you like what they do pls help them reach 1,000 subscribers 9n YouTube TY https://t.co/LLEZCWJWP8 https://t.co/c82WvNY0Ix\n"
, "ZITA: 1/2 They show robots &amp run Robotics classes each year at Coolest Projects. They need more subscribers on YouTube channel new rules a channel should have 1000 2 benefit from YouTube partnership If you like what they do pls help by hitting the SUBSCRIBE TY\n"
, "ZITA HUBER: I LOVE U♥️♥️♥ i have no athor words to explain it😏\n"
, "ZITA HUBER: i can not even Tell you How much i freaking love u!!💕😍\n"
, "ZITA HUBER: Could you follow me pls I love u soooooooo unbelievebly much!!❤️❤️❤️\n"
, "ZITA HUBER: I love you way too much! I love u soooooooooooooooo much!!♥️♥️♥️♥️♥️♥️♥️\n"
, "ZITA HUBER: Nooo but you can do it right NOW!!💞👼🏻\n"
, "ZITA STANLEY: Congrats Kylie!!❤️You are a Queen and I can’t wait to see your little baby...you will be the best mother that you can be✨ilysm https://t.co/lg1GLcNa4i\n"
, "TINA ZITA: Getting ready for our #peel21st twitter chat on Tuesday looking for clips and keep coming back to this one https://t.co/4wWsgIRcBo\n"
, "ZITA ANGKOR HOTEL SIEM REAP: Zita Angkor Hotel ! For February and March 2017 with https://t.co/ATUhtbNNa0 for Special Rate https://t.co/kyxk7AnFdv\n"
, "MARK ZITA: Can someone please check on Will Smith right now #SuperBowl\n"
, "MARK ZITA: #BREAKING The Philadelphia Eagles upset the New England Patriots 41-33 The first Super Bowl win for Philly #SuperBowl #SBLII\n"
, "MARK ZITA: Congratulations Philadelphia Your first Super Bowl win!!! #SuperBowl\n"
, "MARK ZITA: Man this was a brilliant Super Bowl Was glued to the screen Close all the way #SuperBowl\n"
, "STEF ICSARESCU:  zita  sumner Upload the cover of a great book without saying why mention who invited you Invite 8 others to do the same  king  sparks https://t.co/OetgZdquwG\n"
, "MARK ZITA: Rightio...what was that call on special teams #SuperBowl\n"
, "MARK ZITA: The FG is GOOD 8 point margin Patriots need a TD and a 2-pt Conv to tie The longest 1 minute in football for the Eagles right now #SuperBowl\n"
, "MARK ZITA: It's a touchdown Great explanation He was a runner when he crossed the plane #SuperBowl\n"
, "TINA ZITA: Psst #onted #peel21st you can still register for this free online session Registration closes at 9 am tomorrow https://t.co/HPW4uhUovs\n"
, "MARK ZITA: Fourth quarter people Eagles in the red zone with a 3 point lead No lead is safe btw #SuperBowl\n"
, "MARK ZITA: Eagles TD then the Pats respond with their own Offensive shootout #SuperBowl\n"
, "GAIL MOLENAAR:  zita Upload the cover of a great book without saying why mention who invited you Invite 8 others to do the same  sumner  Ics https://t.co/wVBRqLHmTY\n"
, "ZEE: In the midst of the darkest night Let Your love be the shining light Breaking chains that were holding me You.. https://t.co/27Xzo7yaYr\n"
, "MARK ZITA: JT knows how to entertain that's for sure ✌ #SuperBowl\n"
, "MARK ZITA: Great 4th down gamble Burton to Foles for the TD That's how it's done Brady #SuperBowl\n"
, "MJ WHEELER-ALI:  zita Take a look at this site The UN has set 17 goals for sustainable development that will make the world a better place for all So relevant problem-solving based &amp empathy-driven education https://t.co/5izdpnZdFp\n"
, "COLLEEN HARTMAN:  zita Something new to try Thanks for sharing\n"
, "CURT(IS BURTON:  zita I'm going for eagle's as well don't like Tom Brady It's going to be a a tight win.\n"
, "TINA ZITA: We know you are watching the super bowl tonight but what will you be doing Tuesday #peel21st join us from 8:30-9:30pm for our February twitter chat as we look at Empowering our learners &amp Bring a friend https://t.co/CGHjgFGfHf\n"
, "MARK ZITA: Eagles being methodical Pretty good so far #SuperBowl\n"
, "ZOHRIN MAWJI:  JB  Gill1214  zita  grandy I have a copy will lend it to you :)\n"
, "YOUR DREAM TOYS: 💢Super Sale ZITA ELEMENT Doll Clothes Lot 7=5 Daily Costumes Gown Clothes .. https://t.co/e4A5NnirO6 https://t.co/Xk7u7Ymd0a\n"
, "SHE: Hey Guy New video out now today me and zita talk about our recent trip to America watch to see our trueee thoughts 🙌🏾👀🤔 https://t.co/pYhlQhbLBt https://t.co/JXfsvMpEWz\n"
, "FARAH SLIMATI:  JB  Gill1214  zita  grandy I will read it for sure if you can get me a copy🤪\n"
, "PHIONA LLOYD HENRY:  JB  Gill1214  zita  grandy It’s great Farah I used with a group of teachers and teacher librarians last semester and they loved it too You should read it 😍😍😍\n"
, "ZOHRIN MAWJI:  JB  Gill1214  zita  grandy Between the World and Me is a great read you’ll love it Farah.\n"
, "FARAH SLIMATI: Thx  JB  Gill1214  zita  grandy let’s do a book talk if it’s a great book https://t.co/kqolgz25Af\n"
, "VANILLE: Excellent Weekend !! 😍\n"
, "CRUMBCATCHINGPATRIOT: Chaos is ALL they’re interested in\n"
, "JAY KAY:  zita They were worlds apart 50yrs ago Now not so much There used to be Christians here but I've NEVER seen a more judgemental country The Socialist Welfare States of Insurance IS a third world government that worships golden Hellyweird Idols and their god Mammon !!!\n"
, "JANE DENNIS-MOORE:  zita  pd I want to see this I can tweet from my bed :)\n"
, "CRUMBCATCHINGPATRIOT: Term limits are as vital as border control.\n"
, "DAVUS MAXIMUS:  zita I love it!\n"
, "?: got me so excited my god\n"
, "CRUMBCATCHINGPATRIOT: I HAVE noticed a huge effort to push the Super Bowl on the public this year “Red Carpet Hollyweird style tv ads/shows They definitely see they have a problem.\n"
, "AVIVA DUNSIGER: Upload the cover of a great book without saying why mention who invited you Invite 8 others to do the same  zita https://t.co/J0gOJsa0qj\n"
, "?: exactly\n"
, "WAKELET:  zita Nice one DM us if you need any help\n"
, "TINA ZITA: Cool thanks Appreciate all the support Next to try to move over the 290 storifies 😬\n"
, "TINA ZITA: used your Twitter search option Much faster this week Is it possible to see the tweet We look for visuals mostly.\n"
, "ZITA SEBASTIAN:  15 He's definitely a sincere friend &amp a blessing to us all :)\n"
, "MUNYA MURAMBWI MAREGERE: Vakachinja zita reParty yamudhara wake Jomo Kenyatta But its the same party Like changing from Zanu Pf to New Patriotic Front.\n"
, "ATHAN TSIRIGOTIS: There's always an Upside Mirallas is back at Olympiakos Where he is Respected &amp Belongs &amp Loving it Zita Olympiakos &amp 'Big Kev'\n"
, "CRUMBCATCHINGPATRIOT: We have PLENTY to use till technology gets us to the next point By all means continue to explore new technologies.\n"
, "CRUMBCATCHINGPATRIOT: Fact 100 is impossible T-Mobile like everyone else has to get all their products parts etc shipped to/from one point to another There’s NO way to fly planes run trucking etc on wind Until such technology comes world economy is driven by fossil fuels.\n"
, "PHILIP TAN: This makes me so happy https://t.co/Lx1RWHvG2E\n"
, "CRUMBCATCHINGPATRIOT: US not so much👎🏾\n"
, "CRUMBCATCHINGPATRIOT: There’s many ways to bring down a country.\n"
, "CRUMBCATCHINGPATRIOT: Exactly the type we want to quit!\n"
, "?: i love this so fucking much\n"
, "ZI.KA: Although you can imagine a wonderful day ahead you might worr.. More for Virgo https://t.co/6XSytJf47k\n"
, "CRUMBCATCHINGPATRIOT: NYT wouldn’t ever be so honest.\n"
, "CRUMBCATCHINGPATRIOT: Ah yes Dingell 59 years was n Congress he “won his seat by taking his father’s after HE who also overstayed had to leave it Dingell’s wife “Debbie took his seat after he FINALLY left He’s 93 years old TERM LIMITS anyone?\n"
, "PURE CHEMISTRY: Another amazing #throwbacksunday ❤ #Repost  elze ・・・ DID I LOSE SOMETHING?.. 21st Century Cinderella in a gown handmade with fresh flowers at spectacular 4th edition of the Wedding Show #zitaelze #floralartist ��� https://t.co/FALB5P6o0b\n"
, "MAAD SWEENEY:  Tary 😂😂😂😂��� I'm not even believing this right now but you maybe right guys do these things.. makaita kunge mapenzi zita raakutaurwa 😂😂\n"
, "CRUMBCATCHINGPATRIOT: Trump So Effective That Navy Officers &amp;#8220;Baffled&amp;#8221 by How Quickly Iran Retreated https://t.co/AHoZmGxJOa\n"
, "CRUMBCATCHINGPATRIOT: CRTV Mark Levin has demanded it for many months!🇺🇸\n"
, "CRUMBCATCHINGPATRIOT: My highly “educated adult kids are proud to be called Libs My eldest daughter marched in DC in that stupid women’s march!💩\n"
, "CRUMBCATCHINGPATRIOT: You are high Go to bed.\n"
, "PRINCE:  zita Lmao That’s the best you got hunny that’s pretty sad But remember English isn’t American it’s British so please again go sit down and reevaluate your life decisions.\n"
, "CRUMBCATCHINGPATRIOT: 🇺🇸awesome!🇺🇸👏\n"
, "CRUMBCATCHINGPATRIOT: Definitely worth seeing.🇺��� https://t.co/qDH8jCFFtG\n"
, "CRUMBCATCHINGPATRIOT: Alarm is too mild It keeps me awake at night This is how Venezuela NK &amp such get started.\n"
, "CRUMBCATCHINGPATRIOT: Lol remember in his book he got called out for lying a/b his girlfriend in college He had to backpedal &amp say she was a compilation of all he dated There were no girlfriends Just “partying accomplices.🚬💊\n"
, "TINA ZITA:  mulc  pd The good old days 😂\n"
, "MELANIE MULCASTER:  zita  pd Aren't you precious :)\n"
, "CRUMBCATCHINGPATRIOT: Tom Arnold was a pity hire of Rosanne’s She’s so talented ANY sack of potatoes can let her bounce her zingers off them.\n"
, "KIM POLLISHUKE: I will be there This summit is always fantastic  zita #getont #maplesyrupedu #edtechteam https://t.co/toLkNvelb3\n"
, "CRUMBCATCHINGPATRIOT: Remember the good old days of only worrying a/b corrupt IRS?🏦\n"
, "CRUMBCATCHINGPATRIOT:  Rex3 Diversity Get out of jail free card.\n"
, "TINA ZITA: May be breaking out some old school pics tonight for our  pd chat on Monday on #makered Had to get creative making our own carnival costumes in Germany as a kid https://t.co/mamviDWkHq\n"
, "CRUMBCATCHINGPATRIOT: Great insight on your part!👍\n"
, "BILV   HE/HIM: i did lewis magic trick for zita and she got so mad it was amazing\n"
, "CRUMBCATCHINGPATRIOT: Too busy teaching sexual conduct classes to Congress.😤🤬\n"
, "CRUMBCATCHINGPATRIOT: Yep Yesterday $28.99 per WEEK more in take home pay👏💰\n"
, "TINA ZITA:  pd Awesome Looking forward to the conversations and brainstorming 😉\n"
, "JASON WIGMORE:  zita  pd Signed up I might miss the first little bit with bedtime routines but I’ll be there :)\n"
, "CRUMBCATCHINGPATRIOT: Welcome aboard!🇺🇸🚃\n"
, "TINA ZITA: #onted Hope you join us Monday night to chat #makered in the classroom with  pd Professional learning from the comfort of home &amp it's free Sign up https://t.co/e967cBMvyq https://t.co/DWS6axho5Z\n"
, "PACKAGE: I could fit in everyone I care about in here and there would STILL be space https://t.co/159ubhoNod\n"
, "CRUMBCATCHINGPATRIOT: Lol Hubby ❤️it Richland Cty SC\n"
, "CRUMBCATCHINGPATRIOT: Trump emphatically says NOT the agents but the top brass.\n"
, "CACTUS PETES: An $11,959.88 jackpot looks good on you winner Zita S. #mychoicewinners https://t.co/J0dzpTDtEi\n"
, "JUJUKATJUJU:  zita Well looked it up in the dictionary no mention of war small version was lack of trust Check it out thank you it was worth knowing\n"
, "CRUMBCATCHINGPATRIOT: I have the flu/I must be delirious I’m getting more &amp more confused in this thread Gotta reread it.🤦🏻‍♀️\n"
, "CRUMBCATCHINGPATRIOT: It was explained to me treason only applies during wartime Sedition applies during non war times Contempt applies in legal court) I may be mistaken in this tho.🤷🏻‍♀️\n"
, "HIRO HIDE:  zita Thanks for sharing👍😎\n"
, "CHERYL MURPHY: Sr Zita I could not agree more Blessings to all!\n"
, "Z@_@: He usado Shazam para descubrir The Summer Is Magic (Gambrinus Club Mix) de Playahitty https://t.co/12pNPnB3XL\n"
, "ZITA MAROTI: Episode 64 Steve Lukather by NO GUITAR IS SAFE Podcast w Jude Gold via #soundcloud https://t.co/n5SsB2lDNk\n"
, "EMILY FARKAS: Amazing opportunity  zita https://t.co/lbHirRNtGL\n"
, "JOANNE:  ELZE  ELZE absolutely stunning!\n"
, "EDET EDEM AKPAN: OK Zita my love\n"
, "ZITA: happy bday heavydirtysoul here’s a really old edit https://t.co/nRVajYiILk\n"
, "CRUMBCATCHINGPATRIOT: I avoid DC at all costs But this event sounds amazing 🇺🇸\n"
, "CRUMBCATCHINGPATRIOT: Bible says, Satan has a beautiful face”.👺\n"
, "ROSIE HUZZARD CBC: Zita Holborne from my old Trade Union  union talking about the issues of gender and race in PCS organising and the trade union movement at branch and national level People not recognising childcare needs for branch meetings I hear that #wearepcs https://t.co/p6wBVxJ66T\n"
, "CRUMBCATCHINGPATRIOT: Welcome aboard Governor https://t.co/HwFY3LGc29\n"
, "CRUMBCATCHINGPATRIOT: In most places spending someone else's money is considered stealing https://t.co/qHJgcDKi0r\n"
, "NO MORE EXCUSES: Going back to school so one day we can be as smart as Zita!! Cheryl is already asking when the first break.. https://t.co/Z1UueWOqEZ\n"
, "JERRY WOOD:  zita Too funny\n"
, "CRUMBCATCHINGPATRIOT: 🤧right there with you on flu🤒\n"
, "MATT HARTINGS: Have you tried the Sisters Grimm yet Our kids love it We’ve been reading it to them Zita the Spacegirl is also a family favorite\n"
, "TINA ZITA: I loved her keynote last year and have been meaning to read her Thanks for the reminder\n"
, "JEN APGAR:  zita Here is the article it was adapted from The book was profoundly impactful to my works as an educator particularly in my current role https://t.co/s5AxaHT1gM\n"
, "TINA ZITA: A great chart\n"
, "CRUMBCATCHINGPATRIOT:  noyes Lol Supporting HRC for prez.\n"
, "ZITA ELZE: Lovely #wedding shoot in one of the most iconic #WeddingVenues xx #brides #flowers https://t.co/TEuBmujNfG\n"
, "ZITA ELZE: #RHSLondon Floral Artist in Residence https://t.co/1PQ4fEkwPk thank you  RHS see you at the Early Spring Plant Fair xx #snowdrops #gardening #flowers\n"
, "ZITA: I see a lot of pretty faces and nobody like you\n"
, "TINA ZITA: Interesting post the lonely leader thoughts https://t.co/1R36YacVZd\n"
, "MIRANDA GRELL: Loving my new tote bags and mugs designed by my friend the talented poet artist and activist Zita Holbourne Check out the rest of Zita's gorgeous products here https://t.co/ubvDhQ7fIb https://t.co/WxBR5qJFgm\n"
, "ZDRAVKO: Good morning Zita Enjoy your Saturday #Braaap\n"
, "ZI.KA: You’re known to be cool under pressure even if your nervousne.. More for Virgo https://t.co/6XSytJf47k\n"
, "ADAEZE ZITA: Aww Beautiful.\n"
, "REBECCA ZITA: Sweet banget👫💟 #wv https://t.co/jNGqCpUAxv\n"
, "CRUMBCATCHINGPATRIOT: He had EVERY right to it!\n"
, "ERIC HOLM: Congrats to the Truman 2017 Hall of Fame class Pallo Norman Floyd Dombrowski Kelley-Zita What a great and deserving group #isdstrong #Thspatriots https://t.co/0eWwFhz8TF\n"
      ]
    }
  , { name: "republican"
    , speeches:
      [
        "MALCOLM TURNBULL: " +
        "Thank you, thank you very much.\n",
, "ALAN HENRY: Joseph Zita don’t make destructive choices!\n"
, "CRUMBCATCHINGPATRIOT: Watch HS Goon Body Slams 62yr Old Teacher Over Getting His Phone Confiscated Disgusting https://t.co/QyaMfZ68j1\n"
, "TINA ZITA: Sorry about that Got caught up in the chatter\n"
, "JAMES STEEVES:  zita hi Tina Sorry--I planned to join your webinar but I got no info re logging in and now it seems too late I will listen to it when it is posted\n"
, "CRUMBCATCHINGPATRIOT: Run who’s gonna drag her limp body around ?\n"
, "POPOU TX:  zita Back to cow farts...\n"
, "CRUMBCATCHINGPATRIOT: WATCH Father of Girl Killed By MS-13 Gang Destroys The Dems For Their Disrespect at SOTU https://t.co/aU7tBD6w1R via  Giles\n"
, "BARRY:  eskills Firewood and for cooking at least I can hack up the snow and make some Bovril to survive on https://t.co/SMJwaQJaNn\n"
, "BARRY:  eskills Lucky you I'm busy cutting the legs off the tables &amp chairs at the moment...just in case!\n"
, "THE_FOGEYS: Come on Zita .. You know you want to stay really I mean who are we going to whinge about when they've gone ? 😂😂��� https://t.co/AvWSZVJD0n\n"
, "TINA ZITA: Late to the game but maybe 8 #Peel21st friends will jump in https://t.co/y1D0cPY95K\n"
, "CRUMBCATCHINGPATRIOT:  McMullin Yes it means a secret court can accuse /take down US citizens and nothing can be done to stop it!\n"
, "EASTVALLEYPESTSVC.:  zita He's literally insane...\n"
, "CRUMBCATCHINGPATRIOT: There comes a point where you realize his thought processes are compromised due to cancer cells\n"
, "ERICH NOLAN BERTUSSI C/D: #MustSee Zita Cobb speaks when individuals can't make a place that they belong to they are unable to belong. #LongBranch prevent individual expression and strip the capacity of individuals to make a space to belong to very unfortunate path you took. https://t.co/Oi1vmQn7Dy\n"
, "MARK ZITA: Ooooh I dunno That's a tough call #SuperBowl\n"
, "MARK ZITA: PHI 22 NE 12 at the half Buckle in everyone It's gonna be a crazy second half #SuperBowl\n"
, "MARK ZITA: Brady throwing like how I throw the football in a pickup game #SuperBowl\n"
, "MARK ZITA: What the hell was that? Bad snap #SuperBowl\n"
, "JORJA:  zita With another journo There's a lot of speakers so if one of us tunes out at least the other can take notes haha\n"
, "CRUMBCATCHINGPATRIOT: Well duh Was he eating tide pods as well?\n"
, "CRUMBCATCHINGPATRIOT: Yup CA dead says it all👎🏾\n"
, "CRUMBCATCHINGPATRIOT: Obviously not a born southerner Incomers are destroying FL.👎🏾\n"
, "CRUMBCATCHINGPATRIOT: And the idiots fall for it EVERY single time Like Roadrunner &amp Coyote 💣Acme media💣Boom!\n"
, "WAKELET:  zita Looking into this 🙂A few users have mentioned this and it will probably be arriving in the update after the next (chronological ordering)\n"
, "CRUMBCATCHINGPATRIOT: Shocking is Comey response “That’s it?”.\n"
, "CRUMBCATCHINGPATRIOT: I was “surprised at Panetta’s negative words...\n"
, "CRUMBCATCHINGPATRIOT: 🔔Ding Ding Ding ��� winner winner chicken dinner!\n"
, "CRUMBCATCHINGPATRIOT: Useless fools make useful tools🤡\n"
, "CRUMBCATCHINGPATRIOT: Mad Maxine:everytime she speaks she advances conservative cause🤡\n"
, "BILV   HE/HIM: today was so long I was too tired to play video games too tired to draw my hourlies but had a lovely night doing card tricks with zita and chilling out keen to get back to art tomorrow after a full weekend break ✍��� https://t.co/EWbSrBfCsy\n"
, "?:  twt IT’S BEEN A LONG JOURNEY BUT WE’VE PROVED ALL ANTIS WRONG! MY KINGS WILL KEEP GOING UP UP UP FOREVER TGR!! ARMY💜Bangtan\n"
, "CRUMBCATCHINGPATRIOT: 1 more time All bloody tracks lead back to BHO He’s behind it all👎🏾\n"
, "MY MIDDLE NAME IS MARIE 2 NOT A BOT OR AM I?:  zita I'm sorry did you take American in school No you took English. Read it and weep psycho https://t.co/8OuxfymwpN\n"
, "CLINT DAVID SAMUEL: ��� secretshelf Zita such a versatile little thing (With please do not remove credits. https://t.co/dYxSBMq0U0\n"
, "CRUMBCATCHINGPATRIOT: Useless\n"
, "CRUMBCATCHINGPATRIOT: Chilling to see the dodged bullet.\n"
, "CRUMBCATCHINGPATRIOT: B L O C K Good is always pulled down Bad won’t rise up.\n"
, "MJ:  zita Found this It was sent to me from The WH so apparently the tax cuts started immediately I was thinking it would begin after the 2018 work year Silly me there I go thinking again ��� https://t.co/nr6TPNagOx\n"
, "CRUMBCATCHINGPATRIOT: Almost 2 years into it &amp NO evidence Only Hillary is tied to Russia w/Uranium One deal And her &amp DNC funding of the fake dossier.\n"
, "CRUMBCATCHINGPATRIOT: Upside down world 👺\n"
, "CRUMBCATCHINGPATRIOT: This goes back to your “spook thread the other day...\n"
, "TINA ZITA: I have been playing with the last few weeks They had just added a twitter import feature I’ll be checking out tomorrow They will also help you import your storifies\n"
, "CRUMBCATCHINGPATRIOT:  noyes You’ve shown your blatant ignorance .\n"
, "CRUMBCATCHINGPATRIOT: Stinks like rotting fish.\n"
      ]
    }
  ]
, speakers:
  {

    "BILL SHORTEN":
    { name: "Bill Shorten"
    , title: "Opposition Leader (Labor Party)"
    },

 "ALAN HENRY": { name: "ALAN HENRY", title: "Date: 06 Feb 2018 Rating: -0.750" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "JOHANNA B RSCH-SUPAN": { name: "JOHANNA B RSCH-SUPAN", title: "Date: 06 Feb 2018 Rating: 0.353" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 06 Feb 2018 Rating: 0.800" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 06 Feb 2018 Rating: 0.558" } ,
 "JAMES K SUMMERS": { name: "JAMES K SUMMERS", title: "Date: 06 Feb 2018 Rating: 0.237" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 06 Feb 2018 Rating: -0.450" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 06 Feb 2018 Rating: 1.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 06 Feb 2018 Rating: 0.296" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 06 Feb 2018 Rating: -0.500" } ,
 "MRS ANISKO-CLUTTON": { name: "MRS ANISKO-CLUTTON", title: "Date: 06 Feb 2018 Rating: 0.200" } ,
 "MRS WILSON": { name: "MRS WILSON", title: "Date: 06 Feb 2018 Rating: 0.392" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "SURIL SHAH": { name: "SURIL SHAH", title: "Date: 06 Feb 2018 Rating: 0.417" } ,
 "JAMES STEEVES": { name: "JAMES STEEVES", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "LISA NOBLE": { name: "LISA NOBLE", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "JOAQU N BARBOZA": { name: "JOAQU N BARBOZA", title: "Date: 06 Feb 2018 Rating: 0.400" } ,
 "JAMES STEEVES": { name: "JAMES STEEVES", title: "Date: 06 Feb 2018 Rating: -0.300" } ,
 "BAY AREA RECRUITS": { name: "BAY AREA RECRUITS", title: "Date: 06 Feb 2018 Rating: 0.255" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "HOWLING SARGE": { name: "HOWLING SARGE", title: "Date: 06 Feb 2018 Rating: 0.081" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 06 Feb 2018 Rating: 0.350" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "TODD DISKIN": { name: "TODD DISKIN", title: "Date: 06 Feb 2018 Rating: 0.550" } ,
 "MS KERR": { name: "MS KERR", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "SUSAN WATT": { name: "SUSAN WATT", title: "Date: 06 Feb 2018 Rating: 0.500" } ,
 "MRS WILSON": { name: "MRS WILSON", title: "Date: 06 Feb 2018 Rating: 0.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 05 Feb 2018 Rating: 0.100" } ,
 "FLAVIO MARTINHO": { name: "FLAVIO MARTINHO", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "JEN APGAR": { name: "JEN APGAR", title: "Date: 05 Feb 2018 Rating: 0.019" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.800" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: -0.150" } ,
 "SHANNON DUBE": { name: "SHANNON DUBE", title: "Date: 05 Feb 2018 Rating: 0.250" } ,
 "NATALIE SCHNEIDER": { name: "NATALIE SCHNEIDER", title: "Date: 05 Feb 2018 Rating: 0.393" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "SHANNON PETRACCO": { name: "SHANNON PETRACCO", title: "Date: 05 Feb 2018 Rating: 0.875" } ,
 "BIBS 30": { name: "BIBS 30", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "FRANK CASTLE": { name: "FRANK CASTLE", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "LISA NOBLE": { name: "LISA NOBLE", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "KIDS CONNECT": { name: "KIDS CONNECT", title: "Date: 05 Feb 2018 Rating: 0.467" } ,
 "VICTORIA DAS": { name: "VICTORIA DAS", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "NAN SUMNER": { name: "NAN SUMNER", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.275" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "POPOU TX": { name: "POPOU TX", title: "Date: 05 Feb 2018 Rating: -0.067" } ,
 "OTF PROFESSIONAL DEV": { name: "OTF PROFESSIONAL DEV", title: "Date: 05 Feb 2018 Rating: 0.275" } ,
 "JODIE": { name: "JODIE", title: "Date: 05 Feb 2018 Rating: 0.053" } ,
 "BUMPING&BOPPING.": { name: "BUMPING&BOPPING.", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "ZITA KEELEY": { name: "ZITA KEELEY", title: "Date: 05 Feb 2018 Rating: 1.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: 0.150" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: -0.200" } ,
 "ZITA PINTO": { name: "ZITA PINTO", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "BARRY": { name: "BARRY", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.500" } ,
 "BARRY": { name: "BARRY", title: "Date: 05 Feb 2018 Rating: 0.250" } ,
 "CAM": { name: "CAM", title: "Date: 05 Feb 2018 Rating: 0.500" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.289" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.800" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.250" } ,
 "BARRY": { name: "BARRY", title: "Date: 05 Feb 2018 Rating: -0.300" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.090" } ,
 "BARRY": { name: "BARRY", title: "Date: 05 Feb 2018 Rating: -0.106" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "LISA NOBLE": { name: "LISA NOBLE", title: "Date: 05 Feb 2018 Rating: 0.500" } ,
 "SUSAN MOLLER": { name: "SUSAN MOLLER", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "RACHEL MACDONALD": { name: "RACHEL MACDONALD", title: "Date: 05 Feb 2018 Rating: 0.150" } ,
 "CLASSIC HITS RADIO": { name: "CLASSIC HITS RADIO", title: "Date: 05 Feb 2018 Rating: 1.000" } ,
 "ZULEQA HUSAIN": { name: "ZULEQA HUSAIN", title: "Date: 05 Feb 2018 Rating: 0.383" } ,
 "SHOREFAST": { name: "SHOREFAST", title: "Date: 05 Feb 2018 Rating: 0.259" } ,
 "R O Z V I P R I N C E S S": { name: "R O Z V I P R I N C E S S", title: "Date: 05 Feb 2018 Rating: 0.800" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "THE_FOGEYS": { name: "THE_FOGEYS", title: "Date: 05 Feb 2018 Rating: -0.312" } ,
 "KINDERTEAM NIAGARA": { name: "KINDERTEAM NIAGARA", title: "Date: 05 Feb 2018 Rating: 0.750" } ,
 "WEST AUCKLAND": { name: "WEST AUCKLAND", title: "Date: 05 Feb 2018 Rating: 0.250" } ,
 "JON STARKIE": { name: "JON STARKIE", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "TED PERKINS": { name: "TED PERKINS", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "SIR MARCUS WARRY": { name: "SIR MARCUS WARRY", title: "Date: 05 Feb 2018 Rating: 0.233" } ,
 "IMMANUEL EMAISNABELA": { name: "IMMANUEL EMAISNABELA", title: "Date: 05 Feb 2018 Rating: 0.583" } ,
 "Z@_@": { name: "Z@_@", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "THE RHS": { name: "THE RHS", title: "Date: 05 Feb 2018 Rating: 0.500" } ,
 "Z@_@": { name: "Z@_@", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MRS MCINTYRE": { name: "MRS MCINTYRE", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "MME RT": { name: "MME RT", title: "Date: 05 Feb 2018 Rating: 0.500" } ,
 "ON MY NAME": { name: "ON MY NAME", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "DONALD CAMPBELL": { name: "DONALD CAMPBELL", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "JANIS CASTLE JONES": { name: "JANIS CASTLE JONES", title: "Date: 05 Feb 2018 Rating: 0.318" } ,
 "ANGELO MIZZI": { name: "ANGELO MIZZI", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "ANGELO MIZZI": { name: "ANGELO MIZZI", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 05 Feb 2018 Rating: -0.350" } ,
 "TRACY BRISCOE": { name: "TRACY BRISCOE", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "ZITA ZARNOCZI": { name: "ZITA ZARNOCZI", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "ZI.KA": { name: "ZI.KA", title: "Date: 05 Feb 2018 Rating: 0.600" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 05 Feb 2018 Rating: 0.200" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: -0.297" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.044" } ,
 "ZITA WEST CLINIC": { name: "ZITA WEST CLINIC", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "08 LITER": { name: "08 LITER", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MIHAJLO": { name: "MIHAJLO", title: "Date: 05 Feb 2018 Rating: 0.200" } ,
 "EASTVALLEYPESTSVC.": { name: "EASTVALLEYPESTSVC.", title: "Date: 05 Feb 2018 Rating: -1.000" } ,
 "LIZ| VANILLA DOOFENCAKES": { name: "LIZ| VANILLA DOOFENCAKES", title: "Date: 05 Feb 2018 Rating: 0.650" } ,
 "ZITA CHELL": { name: "ZITA CHELL", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 05 Feb 2018 Rating: -0.125" } ,
 "LIZ| VANILLA DOOFENCAKES": { name: "LIZ| VANILLA DOOFENCAKES", title: "Date: 05 Feb 2018 Rating: 0.233" } ,
 "ZITA CHELL": { name: "ZITA CHELL", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.300" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.318" } ,
 "ZITA HUBER": { name: "ZITA HUBER", title: "Date: 05 Feb 2018 Rating: 0.500" } ,
 "ZITA HUBER": { name: "ZITA HUBER", title: "Date: 05 Feb 2018 Rating: 0.491" } ,
 "ZITA HUBER": { name: "ZITA HUBER", title: "Date: 05 Feb 2018 Rating: 0.406" } ,
 "ZITA HUBER": { name: "ZITA HUBER", title: "Date: 05 Feb 2018 Rating: 0.438" } ,
 "ZITA HUBER": { name: "ZITA HUBER", title: "Date: 05 Feb 2018 Rating: 0.446" } ,
 "ZITA STANLEY": { name: "ZITA STANLEY", title: "Date: 05 Feb 2018 Rating: 0.406" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 05 Feb 2018 Rating: 0.100" } ,
 "ZITA ANGKOR HOTEL SIEM REAP": { name: "ZITA ANGKOR HOTEL SIEM REAP", title: "Date: 05 Feb 2018 Rating: 0.357" } ,
 "ZEE": { name: "ZEE", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.286" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.380" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.528" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.617" } ,
 "ZITA": { name: "ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "STEF ICSARESCU": { name: "STEF ICSARESCU", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.357" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.493" } ,
 "ERICH NOLAN BERTUSSI C/D": { name: "ERICH NOLAN BERTUSSI C/D", title: "Date: 05 Feb 2018 Rating: -0.383" } ,
 "Z@_@": { name: "Z@_@", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.800" } ,
 "Z@_@": { name: "Z@_@", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: -0.389" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.167" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.600" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "GAIL MOLENAAR": { name: "GAIL MOLENAAR", title: "Date: 05 Feb 2018 Rating: 0.400" } ,
 "ZEE": { name: "ZEE", title: "Date: 05 Feb 2018 Rating: 0.450" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.500" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: -0.233" } ,
 "CURT(IS BURTON": { name: "CURT(IS BURTON", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.322" } ,
 "MME TAMMY AIELLO": { name: "MME TAMMY AIELLO", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: -0.400" } ,
 "MJ WHEELER-ALI": { name: "MJ WHEELER-ALI", title: "Date: 05 Feb 2018 Rating: 0.450" } ,
 "MME TAMMY AIELLO": { name: "MME TAMMY AIELLO", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "COLLEEN HARTMAN": { name: "COLLEEN HARTMAN", title: "Date: 05 Feb 2018 Rating: 0.168" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: -0.700" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 05 Feb 2018 Rating: 0.000" } ,
 "MAYOR HAGEN-KENNEDY": { name: "MAYOR HAGEN-KENNEDY", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CURT(IS BURTON": { name: "CURT(IS BURTON", title: "Date: 04 Feb 2018 Rating: 0.311" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.333" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CURT(IS BURTON": { name: "CURT(IS BURTON", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 04 Feb 2018 Rating: 0.350" } ,
 "JORJA": { name: "JORJA", title: "Date: 04 Feb 2018 Rating: -0.075" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MARK ZITA": { name: "MARK ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "FARAH SLIMATI": { name: "FARAH SLIMATI", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "ZOHRIN MAWJI": { name: "ZOHRIN MAWJI", title: "Date: 04 Feb 2018 Rating: 0.500" } ,
 "YOUR DREAM TOYS": { name: "YOUR DREAM TOYS", title: "Date: 04 Feb 2018 Rating: 0.167" } ,
 "CDN FRIENDS FINLAND": { name: "CDN FRIENDS FINLAND", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "SHE": { name: "SHE", title: "Date: 04 Feb 2018 Rating: 0.068" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.300" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "FARAH SLIMATI": { name: "FARAH SLIMATI", title: "Date: 04 Feb 2018 Rating: 0.500" } ,
 "PHIONA LLOYD HENRY": { name: "PHIONA LLOYD HENRY", title: "Date: 04 Feb 2018 Rating: 0.500" } ,
 "ZOHRIN MAWJI": { name: "ZOHRIN MAWJI", title: "Date: 04 Feb 2018 Rating: 0.650" } ,
 "FARAH SLIMATI": { name: "FARAH SLIMATI", title: "Date: 04 Feb 2018 Rating: 0.800" } ,
 "PATRICO": { name: "PATRICO", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "VANILLE": { name: "VANILLE", title: "Date: 04 Feb 2018 Rating: 1.000" } ,
 "ARIANA LOCKS": { name: "ARIANA LOCKS", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "WADO SIMAN": { name: "WADO SIMAN", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.250" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.200" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.100" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "JAY KAY": { name: "JAY KAY", title: "Date: 04 Feb 2018 Rating: 0.321" } ,
 "JANE DENNIS-MOORE": { name: "JANE DENNIS-MOORE", title: "Date: 04 Feb 2018 Rating: 0.500" } ,
 "GRETCHEN*": { name: "GRETCHEN*", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.100" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "FOLES=GOAT": { name: "FOLES=GOAT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "DAVUS MAXIMUS": { name: "DAVUS MAXIMUS", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "DAVUS MAXIMUS": { name: "DAVUS MAXIMUS", title: "Date: 04 Feb 2018 Rating: 0.625" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.445" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "?": { name: "?", title: "Date: 04 Feb 2018 Rating: 0.375" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.147" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "AVIVA DUNSIGER": { name: "AVIVA DUNSIGER", title: "Date: 04 Feb 2018 Rating: 0.400" } ,
 "?": { name: "?", title: "Date: 04 Feb 2018 Rating: 0.250" } ,
 "WAKELET": { name: "WAKELET", title: "Date: 04 Feb 2018 Rating: 0.600" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.183" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "WAKELET": { name: "WAKELET", title: "Date: 04 Feb 2018 Rating: -0.067" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.233" } ,
 "ZITA SEBASTIAN": { name: "ZITA SEBASTIAN", title: "Date: 04 Feb 2018 Rating: 0.500" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CHERYL PRUITT": { name: "CHERYL PRUITT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MUNYA MURAMBWI MAREGERE": { name: "MUNYA MURAMBWI MAREGERE", title: "Date: 04 Feb 2018 Rating: 0.068" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -1.000" } ,
 "ATHAN TSIRIGOTIS": { name: "ATHAN TSIRIGOTIS", title: "Date: 04 Feb 2018 Rating: 0.200" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.068" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.044" } ,
 "PHILIP TAN": { name: "PHILIP TAN", title: "Date: 04 Feb 2018 Rating: 0.800" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.200" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.172" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.100" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.750" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.100" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.625" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.312" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "BILV   HE/HIM": { name: "BILV   HE/HIM", title: "Date: 04 Feb 2018 Rating: -0.071" } ,
 "?": { name: "?", title: "Date: 04 Feb 2018 Rating: 0.350" } ,
 "RUECHANTEL": { name: "RUECHANTEL", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "SKYLAR DIGGORY": { name: "SKYLAR DIGGORY", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "ZI.KA": { name: "ZI.KA", title: "Date: 04 Feb 2018 Rating: 0.750" } ,
 "DJFUNKYFOX BUKOWSKI": { name: "DJFUNKYFOX BUKOWSKI", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.600" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.050" } ,
 "ZITA JANE": { name: "ZITA JANE", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "PURE CHEMISTRY": { name: "PURE CHEMISTRY", title: "Date: 04 Feb 2018 Rating: 0.375" } ,
 "ZITA MARIE": { name: "ZITA MARIE", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MAAD SWEENEY": { name: "MAAD SWEENEY", title: "Date: 04 Feb 2018 Rating: 0.286" } ,
 "?": { name: "?", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "?": { name: "?", title: "Date: 04 Feb 2018 Rating: -0.338" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.467" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.625" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.175" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.015" } ,
 "MY MIDDLE NAME IS MARIE 2 NOT A BOT OR AM I?": { name: "MY MIDDLE NAME IS MARIE 2 NOT A BOT OR AM I?", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MY MIDDLE NAME IS MARIE 2 NOT A BOT OR AM I?": { name: "MY MIDDLE NAME IS MARIE 2 NOT A BOT OR AM I?", title: "Date: 04 Feb 2018 Rating: -0.167" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.160" } ,
 "PRINCE": { name: "PRINCE", title: "Date: 04 Feb 2018 Rating: 0.149" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CLINT DAVID SAMUEL": { name: "CLINT DAVID SAMUEL", title: "Date: 04 Feb 2018 Rating: -0.094" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 1.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.300" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.167" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.800" } ,
 "SOFIA TAQIA": { name: "SOFIA TAQIA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.400" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "MELANIE MULCASTER": { name: "MELANIE MULCASTER", title: "Date: 04 Feb 2018 Rating: 0.500" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.500" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.500" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.300" } ,
 "KIM POLLISHUKE": { name: "KIM POLLISHUKE", title: "Date: 04 Feb 2018 Rating: 0.400" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.075" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.150" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "": { name: "", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.400" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 1.000" } ,
 "MUNAZZAH SHIRWANI": { name: "MUNAZZAH SHIRWANI", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "BILV   HE/HIM": { name: "BILV   HE/HIM", title: "Date: 04 Feb 2018 Rating: 0.158" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.052" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.300" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.500" } ,
 "MJ": { name: "MJ", title: "Date: 04 Feb 2018 Rating: -0.225" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 1.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: -0.250" } ,
 "JASON WIGMORE": { name: "JASON WIGMORE", title: "Date: 04 Feb 2018 Rating: 0.188" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 1.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 04 Feb 2018 Rating: 0.250" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "BILV   HE/HIM": { name: "BILV   HE/HIM", title: "Date: 04 Feb 2018 Rating: 0.000" } ,
 "PACKAGE": { name: "PACKAGE", title: "Date: 04 Feb 2018 Rating: 0.400" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.800" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.500" } ,
 "NEGOTIATOR": { name: "NEGOTIATOR", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: -0.156" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: -0.062" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CACTUS PETES": { name: "CACTUS PETES", title: "Date: 03 Feb 2018 Rating: 0.700" } ,
 "JUJUKATJUJU": { name: "JUJUKATJUJU", title: "Date: 03 Feb 2018 Rating: 0.025" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.200" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.100" } ,
 "HIRO HIDE": { name: "HIRO HIDE", title: "Date: 03 Feb 2018 Rating: 0.200" } ,
 "HIRO HIDE": { name: "HIRO HIDE", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CHERYL MURPHY": { name: "CHERYL MURPHY", title: "Date: 03 Feb 2018 Rating: 0.625" } ,
 "Z@_@": { name: "Z@_@", title: "Date: 03 Feb 2018 Rating: 0.500" } ,
 "JUJUKATJUJU": { name: "JUJUKATJUJU", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ZITA MAROTI": { name: "ZITA MAROTI", title: "Date: 03 Feb 2018 Rating: 0.500" } ,
 "EMILY FARKAS": { name: "EMILY FARKAS", title: "Date: 03 Feb 2018 Rating: 0.600" } ,
 "ZITA": { name: "ZITA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "JOANNE": { name: "JOANNE", title: "Date: 03 Feb 2018 Rating: 0.625" } ,
 "EDET EDEM AKPAN": { name: "EDET EDEM AKPAN", title: "Date: 03 Feb 2018 Rating: 0.500" } ,
 "ZI.KA": { name: "ZI.KA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ZITA": { name: "ZITA", title: "Date: 03 Feb 2018 Rating: 0.450" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.600" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.850" } ,
 "WAKELET": { name: "WAKELET", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "JEN APGAR": { name: "JEN APGAR", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ROSIE HUZZARD CBC": { name: "ROSIE HUZZARD CBC", title: "Date: 03 Feb 2018 Rating: 0.100" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 03 Feb 2018 Rating: -0.100" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.800" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.500" } ,
 "PAUL MCGUIRE": { name: "PAUL MCGUIRE", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "NO MORE EXCUSES": { name: "NO MORE EXCUSES", title: "Date: 03 Feb 2018 Rating: 0.173" } ,
 "JERRY WOOD": { name: "JERRY WOOD", title: "Date: 03 Feb 2018 Rating: 0.250" } ,
 "KAMILO ANDRES": { name: "KAMILO ANDRES", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CHRIS J CLUFF": { name: "CHRIS J CLUFF", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "RANA": { name: "RANA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.286" } ,
 "MATT HARTINGS": { name: "MATT HARTINGS", title: "Date: 03 Feb 2018 Rating: 0.500" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 03 Feb 2018 Rating: 0.300" } ,
 "JEN APGAR": { name: "JEN APGAR", title: "Date: 03 Feb 2018 Rating: 0.042" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 03 Feb 2018 Rating: 0.800" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "HXGO SANDOVAL": { name: "HXGO SANDOVAL", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.525" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: -0.500" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: -0.600" } ,
 "Z@_@": { name: "Z@_@", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ZITA ELZE": { name: "ZITA ELZE", title: "Date: 03 Feb 2018 Rating: 0.500" } ,
 "ZITA ELZE": { name: "ZITA ELZE", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ZITA ELZE": { name: "ZITA ELZE", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ZITA ELZE": { name: "ZITA ELZE", title: "Date: 03 Feb 2018 Rating: 0.400" } ,
 "ZITA WEST CLINIC": { name: "ZITA WEST CLINIC", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ZITA": { name: "ZITA", title: "Date: 03 Feb 2018 Rating: 0.250" } ,
 "TINA ZITA": { name: "TINA ZITA", title: "Date: 03 Feb 2018 Rating: 0.200" } ,
 "MIRANDA GRELL": { name: "MIRANDA GRELL", title: "Date: 03 Feb 2018 Rating: 0.534" } ,
 "ZDRAVKO": { name: "ZDRAVKO", title: "Date: 03 Feb 2018 Rating: 0.550" } ,
 "ZI.KA": { name: "ZI.KA", title: "Date: 03 Feb 2018 Rating: 0.425" } ,
 "ADAEZE ZITA": { name: "ADAEZE ZITA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "ADAEZE ZITA": { name: "ADAEZE ZITA", title: "Date: 03 Feb 2018 Rating: 0.575" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 03 Feb 2018 Rating: 0.350" } ,
 "REBECCA ZITA": { name: "REBECCA ZITA", title: "Date: 03 Feb 2018 Rating: 0.000" } ,
 "CRUMBCATCHINGPATRIOT": { name: "CRUMBCATCHINGPATRIOT", title: "Date: 03 Feb 2018 Rating: 0.357" } ,
 "ERIC HOLM": { name: "ERIC HOLM", title: "Date: 03 Feb 2018 Rating: 0.700" } 

    , "MALCOLM TURNBULL":
    { name: "Malcolm Turnbull"
    , title: "Prime Minister of Australia (Liberal)"
    }

  }
, topics:
  [
       { name: "CRUMBCATCHINGPATRIOT", re: /\b(crumbcatchingpatriot)\b/gi, x: 615, y: 429 },
       { name: "TINA", re: /\b(tina)\b/gi, x: 730, y: 208 },
       { name: "MARK", re: /\b(mark)\b/gi, x: 375, y: 292 },
       { name: "love", re: /\b(love)\b/gi, x: 266, y: 652 },
       { name: "Thank", re: /\b(thank)\b/gi, x: 569, y: 377 },
       { name: "one", re: /\b(one)\b/gi, x: 330, y: 845 },
       { name: "Ics", re: /\b(ics)\b/gi, x: 808, y: 207 },
       { name: "pd", re: /\b(pd)\b/gi, x: 676, y: 143 },
       { name: "new", re: /\b(new)\b/gi, x: 338, y: 315 },
       { name: "great", re: /\b(great)\b/gi, x: 122, y: 310 },
       { name: "king", re: /\b(king)\b/gi, x: 539, y: 855 },
       { name: "kid", re: /\b(kid)\b/gi, x: 664, y: 540 },
       { name: "us", re: /\b(us)\b/gi, x: 578, y: 775 },
       { name: "know", re: /\b(know)\b/gi, x: 402, y: 378 },
       { name: "good", re: /\b(good)\b/gi, x: 24, y: 786 },
       { name: "SuperBowl", re: /\b(superbowl)\b/gi, x: 362, y: 377 },
       { name: "see", re: /\b(see)\b/gi, x: 758, y: 874 },
       { name: "much", re: /\b(much)\b/gi, x: 266, y: 709 },
       { name: "sumner", re: /\b(sumner)\b/gi, x: 496, y: 647 },
       { name: "Upload", re: /\b(upload)\b/gi, x: 375, y: 693 },
       { name: "cover", re: /\b(cover)\b/gi, x: 880, y: 384 },
       { name: "Invite", re: /\b(invite)\b/gi, x: 839, y: 522 },
       { name: "mention", re: /\b(mention)\b/gi, x: 11, y: 351 },
       { name: "saying", re: /\b(saying)\b/gi, x: 330, y: 475 },
       { name: "twitter", re: /\b(twitter)\b/gi, x: 281, y: 154 },
       { name: "got", re: /\b(got)\b/gi, x: 752, y: 105 },
       { name: "without", re: /\b(without)\b/gi, x: 363, y: 794 }
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
