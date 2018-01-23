var data = {};

(function() {

    data = party({
        speeches:[
        "AL GREEN: Wordcloud\n"
            //replacespeech
        ]

    });

    data.speakers = {
        "AL GREEN": {
            name: "Al Green",
            title: "U.S. representative, Texas"
        },

        //replacespeaker


        "XAVIER BECERRA": {
            name: "Xavier Becerra",
            title: "U.S. representative, California"
        }
    };

    data.topics = [{

        name: "Affordable",
        re: /\b(afford[a-z]*)\b/gi,
        x: 458,
        y: 316
    //replacedatatopics

//    }, {
//        name: "American dream",
//        re: /\b(american dream)\b/gi,
//        x: 412,
//        y: 287
//    }, {
//        name: "Housing",
//        re: /\b(Housing|houses|property)\b/gi,
//        x: 607,
//        y: 211
//    }, {
//        name: "Equities",
//        re: /\b(equity|equities)\b/gi,
//        x: 280,
//        y: 394
//    }, {
//        name: "Biden",
//        re: /\b(biden)\b/gi,
//        x: 507,
//        y: 307
//    }, {
//        name: "bin Laden",
//        re: /\b(osama|bin laden)\b/gi,
//        x: 392,
//        y: 246
//    }, {
//        name: "Business",
//        re: /\b(business[a-z]*)\b/gi,
//        x: 677,
//        y: 127
//    }, {
//        name: "GBP",
//        re: /\b(GBP)\b/gi,
//        x: 414,
//        y: 118
//    }, {
//        name: "Income",
//        re: /\b(income(?:s)?)\b/gi,
//        x: 677,
//        y: 257
//    }, {
//        name: "Slowing",
//        re: /\b(slow|slowing|slowdown)\b/gi,
//        x: 345,
//        y: 120
//    }, {
//        name: "Economy",
//        re: /\b(econom[a-z]+)\b/gi,
//        x: 474,
//        y: 389
//    }, {
//        name: "USD",
//        re: /\b(USD)\b/gi,
//        x: 340,
//        y: 227
//    }, {
//        name: "Energy",
//        re: /\b(energy)\b/gi,
//        x: 598,
//        y: 309
//    }, {
//        name: "NZD",
//        re: /\b(nzd)\b/gi,
//        x: 643,
//        y: 316
//    }, {
//        name: "Bill",
//        re: /\b(bill)\b/gi,
//        x: 549,
//        y: 289
//    }, {
//        name: "Losses",
//        re: /\b(losses|loss)\b/gi,
//        x: 178,
//        y: 339
//    }, {
//        name: "EUR",
//        re: /\b(nzd)\b/gi,
//        x: 742,
//        y: 170
//    }, {
//        name: "Commodities",
//        re: /\b(commodity|commodities)\b/gi,
//        x: 616,
//        y: 373
//    }, {
//        name: "Metal",
//        re: /\b(metal)\b/gi,
//        x: 526,
//        y: 118
//    }, {
//        name: "CNY",
//        re: /\b(CNY|CNH)\b/gi,
//        x: 726,
//        y: 292
//    }, {
//        name: "Rate",
//        re: /\b(rate|rates)\b/gi,
//        x: 623,
//        y: 169
//    }, {
//        name: "BRI",
//        re: /\b(bri)\b/gi,
//        x: 202,
//        y: 252
//    }, {
//        name: "Invest",
//        re: /\b(invest(?:ment|ments|ing)?)\b/gi,
//        x: 587,
//        y: 251
//    }, {
//        name: "Jobs",
//        re: /\b(job[a-z]*)\b/gi,
//        x: 234,
//        y: 117
////    }, {
////        name: "Leadership",
////        re: /\b(leader[a-z]*)\b/gi,
////        x: 546,
////        y: 350
////    }, {
////        name: "Level playing field",
////        re: /\b(level(?: the)? playing field)\b/gi,
////        x: 580,
////        y: 207
//    }, {
//        name: "Price",
//        re: /\b(price|prices)\b/gi,
//        x: 376,
//        y: 168
//    }, {
//        name: "States",
//        re: /\b(state|states)\b/gi,
//        x: 789,
//        y: 239
//    }, {
//        name: "Bank",
//        re: /\b(bank(?:s)?)\b/gi,
//        x: 235,
//        y: 301
//    }, {
//        name: "Labor",
//        re: /\b(labor|ALP)\b/gi,
//        x: 670,
//        y: 296
////    }, {
////        name: "Obama",
////        re: /\b(obama)\b/gi,
////        x: 484,
////        y: 206
////    }, {
////        name: "Obamacare",
////        re: /\b(obamacare)\b/gi,
////        x: 577,
////        y: 178
//    }, {
//        name: "Oil / Gas",
//        re: /\b(oil|gas|petrol)\b/gi,
//        x: 637,
//        y: 275
//    }, {
//        name: "Interest",
//        re: /\b(interest|interests)\b/gi,
//        x: 405,
//        y: 348
//    }, {
//        name: "House",
//        re: /\b(house(?:s)?)\b/gi,
//        x: 388,
//        y: 213
//    }, {
//        name: "Market",
//        re: /\b(market(?:s)?)\b/gi,
//        x: 716,
//        y: 229
//    }, {
//        name: "Royalty",
//        re: /\b(royalty|royalties)\b/gi,
//        x: 285,
//        y: 307
//    }, {
//        name: "FX",
//        re: /\b(fx)\b/gi,
//        x: 311,
//        y: 165
//    }, {
//        name: "Seniors",
//        re: /\b(seniors)\b/gi,
//        x: 367,
//        y: 307
//    }, {
//        name: "Tax",
//        re: /\b(tax[a-z]*)\b/gi,
//        x: 161,
//        y: 184
//    }, {
//        name: "China",
//        re: /\b(china)\b/gi,
//        x: 344,
//        y: 384
//    }, {
//        name: "Debt",
//        re: /\b(debt|debts)\b/gi,
//        x: 640,
//        y: 230
//    }, {
//        name: "Values",
//        re: /\b(value[a-z]*)\b/gi,
//        x: 572,
//        y: 132
//    }, {
//        name: "Vote",
//        re: /\b(vote|voter|voters|voting)\b/gi,
//        x: 266,
//        y: 214
//    }, {
//        name: "Liberal",
//        re: /\b(liberal|liberals)\b/gi,
//        x: 368,
//        y: 270
////    }, {
////        name: "War",
////        re: /\b(war(?:s)?)\b/gi,
////        x: 676,
////        y: 193
//    }, {
//        name: "Bond",
//        re: /\b(bond(?:s)?)\b/gi,
//        x: 674,
//        y: 191
//    }, {
//        name: "Reserve",
//        re: /\b(reserve(?:s)?)\b/gi,
//        x: 674,
//        y: 181
//    }, {
//        name: "AUD",
//        re: /\baud\b/gi,
//        x: 111,
//        y: 261
    }, {
        name: "Business",
        re: /\b(business[a-z]*)\b/gi,
        x: 333,
        y: 888
    }].map(topic);

    data.topic = function(name) {
        var t = topic({
            name: name,
            re: new RegExp("\\b(" + d3.requote(name) + ")\\b","gi")
        });
        data.topics.push(t);
        return t;
    }
    ;

    function party(party) {
        party.speeches = party.speeches.map(speech);
        party.sections = sections(party.speeches);
        return party;
    }

    function speech(text, i) {
        return {
            text: text,
            id: i
        };
    }

    function sections(speeches) {
        var speakerRe = /(?:\n|^)([A-Z\.()\- ]+): /g
          , sections = [];

        speeches.forEach(function(speech) {
            var speakerName = "AUDIENCE", match, i = speakerRe.lastIndex = 0;
            while (match = speakerRe.exec(speech.text)) {
                if (match.index > i)
                    sections.push({
                        speaker: speakerName,
                        speech: speech,
                        i: i,
                        j: match.index
                    });
                speakerName = match[1];
                i = speakerRe.lastIndex;
            }
            sections.push({
                speaker: speakerName,
                speech: speech,
                i: i,
                j: speech.text.length
            });
        });

        return sections.filter(function(d) {
            return !/^AUDIENCE\b/.test(d.speaker);
        });
    }

    function topic(topic) {
        topic.count = 0;
        topic.mentions = [];

        data.sections.forEach(function(section) {
            var text = section.speech.text.substring(section.i, section.j), match;
            topic.re.lastIndex = 0;
            while (match = topic.re.exec(text)) {
                ++topic.count;
                topic.mentions.push({
                    topic: topic,
                    section: section,
                    i: section.i + match.index,
                    j: section.i + topic.re.lastIndex
                });
            }
        });

        return topic;
    }

}
)();

(function() {

    var width = 970
      , height = 500;

    var padding = 4, // collision padding
    maxRadius = 80, // collision search radius
    maxMentions = 100, // limit displayed mentions
    activeTopic;
    // currently-displayed topic

    var r = d3.scale.sqrt().domain([0, d3.max(data.topics, function(d) {
        return d.count;
    })]).range([0, maxRadius]);

    var force = d3.layout.force().gravity(0).charge(0).size([width, height]).on("tick", tick);

    var node = d3.select(".g-nodes").selectAll(".g-node")
      , label = d3.select(".g-labels").selectAll(".g-label");

    d3.select(".g-nodes").append("rect").attr("class", "g-overlay").attr("width", width).attr("height", height).on("click", clear);

    d3.select(window).on("hashchange", hashchange);

    d3.select("#g-form").on("submit", submit);

    updateTopics(data.topics);
    hashchange();

    // Update the known topics.
    function updateTopics(topics) {
        topics.forEach(function(d, i) {
            d.r = Math.max(12, r(d.count));
        });
        // min. collision
        force.nodes(data.topics = topics).start();
        updateNodes();
        updateLabels();
    }

    // Update the displayed nodes.
    function updateNodes() {
        node = node.data(data.topics, function(d) {
            return d.name;
        });

        node.exit().remove();

        node.enter().append("a").attr("class", "g-node").attr("xlink:href", function(d) {
            return "#" + encodeURIComponent(d.name);
        }).call(force.drag).call(linkTopic).append("circle");

        node.select("circle").attr("r", function(d) {
            return r(d.count);
        });
    }

    // Update the displayed node labels.
    function updateLabels() {
        label = label.data(data.topics, function(d) {
            return d.name;
        });

        label.exit().remove();

        var labelEnter = label.enter().append("a").attr("class", "g-label").attr("href", function(d) {
            return "#" + encodeURIComponent(d.name);
        }).call(force.drag).call(linkTopic);

        labelEnter.append("div").attr("class", "g-name").text(function(d) {
            return d.name;
        });

        labelEnter.append("div").attr("class", "g-value");

        label.style("font-size", function(d) {
            return Math.max(8, r(d.count) / 2) + "px";
        }).style("width", function(d) {
            return r(d.count) * 2.5 + "px";
        });

        // Create a temporary span to compute the true text width.
        label.append("span").text(function(d) {
            return d.name;
        }).each(function(d) {
            d.dx = Math.max(2.5 * r(d.count), this.getBoundingClientRect().width);
        }).remove();

        label.style("width", function(d) {
            return d.dx + "px";
        }).select(".g-value").text(function(d) {
            return d.count + (d.r > 60 ? " mentions" : "");
        });

        // Compute the height of labels when wrapped.
        label.each(function(d) {
            d.dy = this.getBoundingClientRect().height;
        });
    }

    // Update the active topic.
    function updateActiveTopic(topic) {
        if (activeTopic = topic) {
            node.classed("g-selected", function(d) {
                return d === topic;
            });
            updateMentions(findMentions(topic));
            d3.select("#g-topic").text((topic.count > maxMentions ? "A sampling of " : topic.count || "No") + " mentions of “" + topic.name + "” in the quoted articles");
        } else {
            node.classed("g-selected", false);
            updateMentions(sampleMentions());
            d3.select("#g-topic").text("A sampling of excerpts from the articles");
        }
    }

    // Update displayed excerpts.
    function updateMentions(mentions) {

        // Rather than compute a data-join, just blow away the entire layout.
        // With wider support for multi-column layout, a data-join would work.
        var column = d3.selectAll(".g-mentions").datum(0).html(null);

        var heights = column.data()
          , indexes = d3.range(heights.length)
          , speakers = groupMentionsBySpeaker(mentions);

        speakers.sort(function(a, b) {
            return b.values.length - a.values.length;
        });

        // Incrementally add each new speaker to the shortest column.
        speakers.forEach(function(d) {
            var index = d3.first(indexes, function(a, b) {
                return heights[a] - heights[b];
            })
              , speakerName = d.values[0].section.speaker
              , speaker = data.speakers[speakerName];

            var div = d3.select(column[0][index]).append("div").attr("class", "g-mention");

            div.append("div").attr("class", "g-speaker").text(speaker ? speaker.name : speakerName);

            div.append("div").attr("class", "g-speaker-title").text(speaker ? speaker.title : "");

            var p = div.selectAll("p").data(d.values).enter().append("p").html(function(d) {
                return d.section.speech.text.substring(d.start, d.end).replace(d.topic.re, "<a>$1</a>");
            });

            if (activeTopic) {
                p.attr("class", "g-hover");
            } else {
                p.each(function(d) {
                    d3.select(this).selectAll("a").datum(d.topic).attr("href", "#" + encodeURIComponent(d.topic.name)).call(linkTopic);
                });
            }

            heights[index] += div.node().getBoundingClientRect().height;
        });
    }

    // Return a random sample of mentions, one per topic.
    // Mentions are returned in chronological order.
    function sampleMentions() {
        return data.topics.filter(function(d) {
            return d.mentions.length;
        }).map(function(d) {
            return d.mentions[Math.floor(Math.random() * d.mentions.length)];
        }).sort(orderMentions);
    }

    // Return displayable mentions for the specified topic.
    // If too many, a random sample of matching mentions is returned.
    // Mentions are returned in chronological order.
    function findMentions(topic) {
        var mentions = topic.mentions;
        if (mentions.length > maxMentions) {
            shuffle(mentions).length = maxMentions;
            mentions.sort(orderMentions);
        }
        return mentions;
    }

    // Group mentions by speaker, collapse overlapping excerpts.
    function groupMentionsBySpeaker(mentions) {
        return d3.nest().key(function(d) {
            return d.section.speaker;
        }).rollup(collapseMentions).entries(mentions);
    }

    // Given an array of mentions, computes the start and end point of the context
    // excerpt, and then collapses any overlapping excerpts.
    function collapseMentions(mentions) {
        var sentenceRe = /([!?.)]+)\s+/g, // sentence splitting requires NLP
        i, n = mentions.length, d0, d1;

        // First compute the excerpt contexts.
        for (i = 0; i < n; ++i) {
            d0 = mentions[i];
            d0.start = excerptStart(d0);
            d0.end = excerptEnd(d0);
        }

        // Then collapse any overlapping excerpts (from the same speech).
        for (i = 1,
        d1 = mentions[0]; i < n; ++i) {
            d0 = d1;
            d1 = mentions[i];
            if (d1.section.speech.id === d0.section.speech.id && d1.start >= d0.start && d1.start < d0.end) {
                d1.start = -1;
                d0.end = d1.end;
                d1 = d0;
            }
        }

        // Returns the start index of the excerpt for the specified mention.
        function excerptStart(mention) {
            var i = sentenceRe.lastIndex = Math.max(mention.section.i, mention.i - 80), match;
            while (match = sentenceRe.exec(mention.section.speech.text)) {
                if (match.index < mention.i - 20)
                    return match.index + match[0].length;
                if (i <= mention.section.i)
                    break;
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

        return mentions.filter(function(d) {
            return d.start >= 0;
        });
    }

    // Orders mentions chronologically: by speech and position within speech.
    function orderMentions(a, b) {
        return a.section.speech.id - b.section.speech.id || a.i - b.i;
    }

    // Assign event handlers to topic links.
    function linkTopic(a) {
        a.on("click", click).on("mouseover", mouseover).on("mouseout", mouseout);
    }

    // Returns the topic matching the specified name, approximately.
    // If no matching topic is found, returns undefined.
    function findTopic(name) {
        for (var i = 0, n = data.topics.length, t; i < n; ++i) {
            if ((t = data.topics[i]).name === name || new RegExp("^" + (t = data.topics[i]).re.source + "$","i").test(name)) {
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
            topic.x = width - 40;
            topic.y = 0;
            updateTopics(data.topics);
        }
        return topic;
    }

    // Simulate forces and update node and label positions on tick.
    function tick(e) {
        node.each(gravity(e.alpha * .1)).each(collide(.5)).attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        label.style("left", function(d) {
            return (d.x - d.dx / 2) + "px";
        }).style("top", function(d) {
            return (d.y - d.dy / 2) + "px";
        });
    }

    // Custom gravity to favor a non-square aspect ratio.
    function gravity(alpha) {
        var cx = width / 2
          , cy = height / 2
          , ax = alpha / 4
          , ay = alpha;
        return function(d) {
            d.x += (cx - d.x) * ax;
            d.y += (cy - d.y) * ay;
        }
        ;
    }

    // Resolve collisions between nodes.
    function collide(alpha) {
        var q = d3.geom.quadtree(data.topics);
        return function(d) {
            var r = d.r + maxRadius + padding
              , nx1 = d.x - r
              , nx2 = d.x + r
              , ny1 = d.y - r
              , ny2 = d.y + r;
            q.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d) && d.other !== quad.point && d !== quad.point.other) {
                    var x = d.x - quad.point.x
                      , y = d.y - quad.point.y
                      , l = Math.sqrt(x * x + y * y)
                      , r = d.r + quad.point.r + padding;
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
        }
        ;
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

    // Update the active topic on hashchange, perhaps creating a new topic.
    function hashchange() {
        var name = decodeURIComponent(location.hash.substring(1)).trim();
        updateActiveTopic(name && name != "!" ? findOrAddTopic(name) : null);
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
        node.classed("g-hover", function(p) {
            return p === d;
        });
        if (!activeTopic)
            d3.selectAll(".g-mention p").classed("g-hover", function(p) {
                return p.topic === d;
            });
    }

    // When hovering the label, highlight the associated node and vice versa.
    // When no topic is active, also cross-highlight with any mentions in excerpts.
    function mouseout(d) {
        node.classed("g-hover", false);
        if (!activeTopic)
            d3.selectAll(".g-mention p").classed("g-hover", false);
    }

}
)();
