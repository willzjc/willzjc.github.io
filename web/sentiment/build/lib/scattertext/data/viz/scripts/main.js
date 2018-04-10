buildViz = function (d3) {
    return function (widthInPixels = 1000,
                     heightInPixels = 600,
                     max_snippets = null,
                     color = null,
                     sortByDist = true,
                     useFullDoc = false,
                     greyZeroScores = false,
                     asianMode = false,
                     nonTextFeaturesMode = false,
                     showCharacteristic = true,
                     wordVecMaxPValue = false,
                     saveSvgButton = false,
                     reverseSortScoresForNotCategory = false,
                     minPVal = 0.1,
                     pValueColors = false,
                     xLabelText = null,
                     yLabelText = null,
                     fullData = null,
                     showTopTerms = true,
                     showNeutral = false,
                     getTooltipContent = null,
                     xAxisValues = null,
                     yAxisValues = null,
                     colorFunc = null,
                     showAxes = true,
                     showExtra = false) {
        var divName = 'd3-div-1';

        // Set the dimensions of the canvas / graph
        var padding = {top: 30, right: 20, bottom: 30, left: 50};
        if (!showAxes) {
            padding = {top: 30, right: 20, bottom: 30, left: 50};
        }
        var margin = padding,
            width = widthInPixels - margin.left - margin.right,
            height = heightInPixels - margin.top - margin.bottom;

        // Set the ranges
        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        if (showNeutral) {

            if (showExtra) {
                document.querySelectorAll('#neutcol')
                    .forEach(function (x) {
                        x.style.display = 'inline'
                    });
                document.querySelectorAll('#extracol')
                    .forEach(function (x) {
                        x.style.display = 'inline'
                    });
                document.querySelectorAll('.contexts')
                    .forEach(function (x) {
                        x.style.width = '25%'
                    });

            } else {
                document.querySelectorAll('#neutcol')
                    .forEach(function (x) {
                        x.style.display = 'inline'
                    });
                document.querySelectorAll('.contexts')
                    .forEach(function (x) {
                        x.style.width = '30%'
                    });

            }
        }
        var yAxis = null;
        var xAxis = null;

        function axisLabelerFactory(axis) {
            if ((axis == "x" && xLabelText == null)
                || (axis == "y" && yLabelText == null))
                return function (d, i) {
                    return ["Infrequent", "Average", "Frequent"][i];
                };

            return function (d, i) {
                return ["Low", "Medium", "High"][i];
            }
        }


        function bs(ar, x) {
            function bsa(s, e) {
                var mid = Math.floor((s + e) / 2);
                var midval = ar[mid];
                if (s == e) {
                    return s;
                }
                if (midval == x) {
                    return mid;
                } else if (midval < x) {
                    return bsa(mid + 1, e);
                } else {
                    return bsa(s, mid);
                }
            }

            return bsa(0, ar.length);
        }

        console.log("fullData");
        console.log(fullData);

        var sortedX = fullData.data.sort(function (a, b) {
            return a.x < b.x ? -1 : (a.x == b.x ? 0 : 1);
        }).map(function (x) {
            return x.x
        });

        var sortedOx = fullData.data.sort(function (a, b) {
            return a.ox < b.ox ? -1 : (a.ox == b.ox ? 0 : 1);
        }).map(function (x) {
            return x.ox
        });

        var sortedY = fullData.data.sort(function (a, b) {
            return a.y < b.y ? -1 : (a.y == b.y ? 0 : 1);
        }).map(function (x) {
            return x.y
        });

        var sortedOy = fullData.data.sort(function (a, b) {
            return a.oy < b.oy ? -1 : (a.oy == b.oy ? 0 : 1);
        }).map(function (x) {
            return x.oy
        });


        function labelWithZScore(axis, axisName, tickPoints) {
            var myVals = axisName === 'x' ? sortedOx : sortedOy;
            var myPlotedVals = axisName === 'x' ? sortedX : sortedY;
            var ticks = tickPoints.map(function (x) {
                return myPlotedVals[bs(myVals, x)]
            });
            return axis.tickValues(ticks).tickFormat(
                function (d, i) {
                    return tickPoints[i];
                })
        }

        if (xAxisValues) {
            xAxis = labelWithZScore(d3.axisBottom(x), 'x', xAxisValues);
        } else {
            xAxis = d3.axisBottom(x).ticks(3).tickFormat(axisLabelerFactory('x'));
        }
        if (yAxisValues) {
            yAxis = labelWithZScore(d3.axisLeft(y), 'y', yAxisValues);
        } else {
            yAxis = d3.axisLeft(y).ticks(3).tickFormat(axisLabelerFactory('y'));
        }

        // var label = d3.select("body").append("div")
        var label = d3.select('#' + divName).append("div")
            .attr("class", "label");

        var interpolateLightGreys = d3.interpolate(d3.rgb(230, 230, 230),
            d3.rgb(130, 130, 130));
        // setup fill color
        //var color = d3.interpolateRdYlBu;
        if (color == null) {
            color = d3.interpolateRdYlBu;
        }

        var pixelsToAddToWidth = 200;
        if (!showTopTerms && !showCharacteristic) {
            pixelsToAddToWidth = 0;
        }

        // Adds the svg canvas
        // var svg = d3.select("body")
        svg = d3.select('#' + divName)
            .append("svg")
            .attr("width", width + margin.left + margin.right + pixelsToAddToWidth)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        origSVGLeft = svg.node().getBoundingClientRect().left;
        origSVGTop = svg.node().getBoundingClientRect().top;
        var lastCircleSelected = null;

        function getCorpusWordCounts() {
            var binaryLabels = fullData.docs.labels.map(function (label) {
                return 1 * (fullData.docs.categories[label] != fullData.info.category_internal_name);
            });
            var wordCounts = {}; // word -> [cat counts, not-cat-counts]
            var wordCountSums = [0, 0];
            fullData.docs.texts.forEach(function (text, i) {

                text.toLowerCase().trim().split(/\W+/).forEach(function (word) {
                    if (word.trim() !== '') {

                        if (!(word in wordCounts))
                            wordCounts[word] = [0, 0];
                        wordCounts[word][binaryLabels[i]]++;
                        wordCountSums[binaryLabels[i]]++;
                    }
                })
            });
            return {
                avgDocLen: (wordCountSums[0] + wordCountSums[1]) / fullData.docs.texts.length,
                counts: wordCounts,
                sums: wordCountSums,
                uniques: [[0, 0]].concat(Object.keys(wordCounts).map(function (key) {
                    return wordCounts[key];
                })).reduce(function (a, b) {
                    return [a[0] + (b[0] > 0), a[1] + (b[1] > 0)]
                })
            };
        }

        function getContextWordCounts(query) {
            var wordCounts = {};
            var wordCountSums = [0, 0];
            var priorCountSums = [0, 0];
            gatherTermContexts(termDict[query])
                .contexts
                .forEach(function (contextSet, categoryIdx) {
                    contextSet.forEach(function (context) {
                        context.snippets.forEach(function (snippet) {
                            var tokens = snippet.toLowerCase().trim().replace('<b>', '').replace('</b>', '').split(/\W+/);
                            var matchIndices = [];
                            tokens.forEach(function (word, i) {
                                if (word === query) matchIndices.push(i)
                            });
                            tokens.forEach(function (word, i) {
                                if (word.trim() !== '') {
                                    var isValid = false;
                                    for (var matchI in matchIndices) {
                                        if (Math.abs(i - matchI) < 3) {
                                            isValid = true;
                                            break
                                        }
                                    }
                                    if (isValid) {
                                        //console.log([word, i, matchI, isValid]);
                                        if (!(word in wordCounts)) {
                                            var priorCounts = corpusWordCounts.counts[word]
                                            wordCounts[word] = [0, 0].concat(priorCounts);
                                            priorCountSums[0] += priorCounts[0];
                                            priorCountSums[1] += priorCounts[1];
                                        }
                                        wordCounts[word][categoryIdx]++;
                                        wordCountSums[categoryIdx]++;
                                    }
                                }
                            })
                        })
                    })
                });
            return {
                counts: wordCounts,
                priorSums: priorCountSums,
                sums: wordCountSums,
                uniques: [[0, 0]].concat(Object.keys(wordCounts).map(function (key) {
                    return wordCounts[key];
                })).reduce(function (a, b) {
                    return [a[0] + (b[0] > 0), a[1] + (b[1] > 0)];
                })
            }

        }


        function getContextWordLORIPs(query) {
            var contextWordCounts = getContextWordCounts(query);
            var ni_k = contextWordCounts.sums[0];
            var nj_k = contextWordCounts.sums[1];
            var n = ni_k + nj_k;
            //var ai_k0 = contextWordCounts.priorSums[0] + contextWordCounts.priorSums[1];
            //var aj_k0 = contextWordCounts.priorSums[0] + contextWordCounts.priorSums[1];
            var a0 = 0.00001 //corpusWordCounts.avgDocLen;
            var a_k0 = Object.keys(contextWordCounts.counts)
                .map(function (x) {
                    var counts = contextWordCounts.counts[x];
                    return a0 * (counts[2] + counts[3]) /
                        (contextWordCounts.priorSums[0] + contextWordCounts.priorSums[1]);
                })
                .reduce(function (a, b) {
                    return a + b
                });
            var ai_k0 = a_k0 / ni_k;
            var aj_k0 = a_k0 / nj_k;
            var scores = Object.keys(contextWordCounts.counts).map(
                function (word) {
                    var countData = contextWordCounts.counts[word];
                    var yi = countData[0];
                    var yj = countData[1];
                    //var ai = countData[2];
                    //var aj = countData[3];
                    //var ai = countData[2] + countData[3];
                    //var aj = ai;
                    //var ai = (countData[2] + countData[3]) * a0/ni_k;
                    //var aj = (countData[2] + countData[3]) * a0/nj_k;
                    var ai = a0 * (countData[2] + countData[3]) /
                        (contextWordCounts.priorSums[0] + contextWordCounts.priorSums[1]);
                    var aj = ai;
                    var deltahat_i_j =
                        +Math.log((yi + ai) * 1. / (ni_k + ai_k0 - yi - ai))
                        - Math.log((yj + aj) * 1. / (nj_k + aj_k0 - yj - aj));
                    var var_deltahat_i_j = 1. / (yi + ai) + 1. / (ni_k + ai_k0 - yi - ai)
                        + 1. / (yj + aj) + 1. / (nj_k + aj_k0 - yj - aj);
                    var zeta_ij = deltahat_i_j / Math.sqrt(var_deltahat_i_j);
                    return [word, yi, yj, ai, aj, ai_k0, zeta_ij];
                }
            ).sort(function (a, b) {
                return b[5] - a[5];
            });
            return scores;
        }

        function getContextWordSFS(query) {
            // from https://stackoverflow.com/questions/14846767/std-normal-cdf-normal-cdf-or-error-function
            function cdf(x, mean, variance) {
                return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
            }

            function erf(x) {
                // save the sign of x
                var sign = (x >= 0) ? 1 : -1;
                x = Math.abs(x);

                // constants
                var a1 = 0.254829592;
                var a2 = -0.284496736;
                var a3 = 1.421413741;
                var a4 = -1.453152027;
                var a5 = 1.061405429;
                var p = 0.3275911;

                // A&S formula 7.1.26
                var t = 1.0 / (1.0 + p * x);
                var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
                return sign * y; // erf(-x) = -erf(x);
            }

            function scale(a) {
                return Math.log(a + 0.0000001);
            }

            var contextWordCounts = getContextWordCounts(query);
            var wordList = Object.keys(contextWordCounts.counts).map(function (word) {
                return contextWordCounts.counts[word].concat([word]);
            });
            var cat_freq_xbar = wordList.map(function (x) {
                return scale(x[0])
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;
            var cat_freq_var = wordList.map(function (x) {
                return Math.pow((scale(x[0]) - cat_freq_xbar), 2);
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;
            var cat_prec_xbar = wordList.map(function (x) {
                return scale(x[0] / (x[0] + x[1]));
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;
            var cat_prec_var = wordList.map(function (x) {
                return Math.pow((scale(x[0] / (x[0] + x[1])) - cat_prec_xbar), 2);
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;

            var ncat_freq_xbar = wordList.map(function (x) {
                return scale(x[0])
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;
            var ncat_freq_var = wordList.map(function (x) {
                return Math.pow((scale(x[0]) - ncat_freq_xbar), 2);
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;
            var ncat_prec_xbar = wordList.map(function (x) {
                return scale(x[0] / (x[0] + x[1]));
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;
            var ncat_prec_var = wordList.map(function (x) {
                return Math.pow((scale(x[0] / (x[0] + x[1])) - ncat_prec_xbar), 2);
            }).reduce(function (a, b) {
                return a + b
            }) / wordList.length;

            function scaledFScore(cnt, other, freq_xbar, freq_var, prec_xbar, prec_var) {
                var beta = 1.5;
                var normFreq = cdf(scale(cnt), freq_xbar, freq_var);
                var normPrec = cdf(scale(cnt / (cnt + other)), prec_xbar, prec_var);
                return (1 + Math.pow(beta, 2)) * normFreq * normPrec / (Math.pow(beta, 2) * normFreq + normPrec);
            }

            var sfs = wordList.map(function (x) {
                cat_sfs = scaledFScore(x[0], x[1], cat_freq_xbar,
                    cat_freq_var, cat_prec_xbar, cat_prec_var);
                ncat_sfs = scaledFScore(x[1], x[0], ncat_freq_xbar,
                    ncat_freq_var, ncat_prec_xbar, ncat_prec_var);
                return [cat_sfs > ncat_sfs ? cat_sfs : -ncat_sfs].concat(x);

            }).sort(function (a, b) {
                return b[0] - a[0];
            });
            return sfs;
        }

        function deselectLastCircle() {
            if (lastCircleSelected) {
                lastCircleSelected.style["stroke"] = null;
                lastCircleSelected = null;
            }
        }

        function getSentenceBoundaries(text) {
            // !!! need to use spacy's sentence splitter
            if (asianMode) {
                var sentenceRe = /\n/gmi;
            } else {
                var sentenceRe = /\(?[^\.\?\!\n\b]+[\n\.!\?]\)?/g;
            }
            var offsets = [];
            var match;
            while ((match = sentenceRe.exec(text)) != null) {
                offsets.push(match.index);
            }
            offsets.push(text.length);
            return offsets;
        }

        function getMatchingSnippet(text, boundaries, start, end) {
            var sentenceStart = null;
            var sentenceEnd = null;
            for (var i in boundaries) {
                var position = boundaries[i];
                if (position <= start && (sentenceStart == null || position > sentenceStart)) {
                    sentenceStart = position;
                }
                if (position >= end) {
                    sentenceEnd = position;
                    break;
                }
            }
            var snippet = (text.slice(sentenceStart, start) + "<b>" + text.slice(start, end)
                + "</b>" + text.slice(end, sentenceEnd)).trim();
            if (sentenceStart == null) {
                sentenceStart = 0;
            }
            return {'snippet': snippet, 'sentenceStart': sentenceStart};
        }

        function gatherTermContexts(d) {
            var category_name = fullData['info']['category_name'];
            var not_category_name = fullData['info']['not_category_name'];
            var matches = [[], [], [], []];
            console.log("searching")

            if (fullData.docs === undefined) return matches;
            if (!nonTextFeaturesMode) {
                return searchInText(d);
            } else {
                return searchInExtraFeatures(d);
            }
        }

        function searchInExtraFeatures(d) {
            var matches = [[], [], [], []];
            var term = d.term;
            var categoryNum = fullData.docs.categories.indexOf(fullData.info.category_internal_name);
            var notCategoryNumList = fullData.docs.categories.map(function (x, i) {
                if (fullData.info.not_category_internal_names.indexOf(x) > -1) {
                    return i;
                } else {
                    return -1;
                }
            }).filter(function (x) {
                return x > -1
            });


            for (var i in fullData.docs.extra) {
                if (term in fullData.docs.extra[i]) {
                    var strength = fullData.docs.extra[i][term] /
                        Object.values(fullData.docs.extra[i]).reduce(
                            function (a, b) {
                                return a + b
                            });
                    var text = fullData.docs.texts[i];
                    if (!useFullDoc)
                        text = text.slice(0, 300);
                    var curMatch = {'id': i, 'snippets': [text], 'strength': strength};

                    curMatch['meta'] = fullData.docs.meta[i];
                    var docLabel = fullData.docs.labels[i];
                    var numericLabel = 2;
                    if (docLabel == categoryNum) {
                        numericLabel = 0;
                    } else if (notCategoryNumList.indexOf(docLabel) > -1) {
                        numericLabel = 1;
                    }
                    matches[numericLabel].push(curMatch);
                }
            }
            for (var i in [0, 1]) {
                matches[i] = matches[i].sort(function (a, b) {
                    return a.strength < b.strength ? 1 : -1
                })
            }
            return {'contexts': matches, 'info': d};
        }

        // from https://mathiasbynens.be/notes/es-unicode-property-escapes#emoji
        var emojiRE = (/(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F/g);

        function isEmoji(str) {
            if (str.match(emojiRE)) return true;
            return false;
        }

        function displayObscuredTerms(obscuredTerms, term, div='#overlapped-terms') {
            d3.select('#overlapped-terms')
                .selectAll('div')
                .remove();
            d3.select(div)
                .selectAll('div')
                .remove();
            if (obscuredTerms.length > 1) {
                var obscuredDiv = d3.select(div)
                    .append('div')
                    .attr("class", "obscured")
                    .style('align', 'center')
                    .style('text-align', 'center')
                    .html("<b>\"" + term + "\" obstructs</b>: ");
                obscuredTerms.map(
                    function (term, i) {
                        makeWordInteractive(
                            obscuredDiv.append("text").text(term),
                            term,
                            false
                        );
                        if (i < obscuredTerms.length - 1) {
                            obscuredDiv.append("text").text(", ");
                        }
                    }
                )
            }
        }

        function displayTermContexts(termInfo, jump=true) {
            var contexts = termInfo.contexts;
            var info = termInfo.info;
            if (contexts[0].length + contexts[1].length + contexts[2].length + contexts[3].length == 0) {
                return null;
            }
            //!!! Future feature: context words
            //var contextWords = getContextWordSFS(info.term);
            //var contextWords = getContextWordLORIPs(info.term);
            //var categoryNames = [fullData.info.category_name,
            //    fullData.info.not_category_name];
            var catInternalName = fullData.info.category_internal_name;
            var contextCoulumns = [
                fullData.info.category_internal_name,
                fullData.info.not_category_name
            ];
            if (showNeutral) {
                if ('neutral_category_name' in fullData.info) {
                    contextCoulumns.push(fullData.info.neutral_category_name)
                } else {
                    contextCoulumns.push("Neutral")
                }
                if (showExtra) {
                    if ('extra_category_name' in fullData.info) {
                        contextCoulumns.push(fullData.info.extra_category_name)
                    } else {
                        contextCoulumns.push("Extra")
                    }
                }

            }

            contextCoulumns.map(
                function (catName, catIndex) {
                    if (max_snippets != null) {
                        var contextsToDisplay = contexts[catIndex].slice(0, max_snippets);
                    }
                    console.log("CATCAT")
                    console.log(catName, catIndex)
                    //var divId = catName == catInternalName ? '#cat' : '#notcat';
                    var divId = null
                    if (catName == fullData.info.category_internal_name) {
                        divId = '#cat'
                    } else if (fullData.info.not_category_name == catName) {
                        divId = '#notcat'
                    } else if (fullData.info.neutral_category_name == catName) {
                        divId = '#neut';
                    } else if (fullData.info.extra_category_name == catName) {
                        divId = '#extra'
                    } else {
                        return;
                    }
                    console.log('divid');
                    console.log(divId)

                    var temp = d3.select(divId)
                        .selectAll("div").remove();
                    contexts[catIndex].forEach(function (context) {
                        var meta = context.meta ? context.meta : '&nbsp;';
                        d3.select(divId)
                            .append("div")
                            .attr('class', 'snippet_meta')
                            .html(meta);
                        context.snippets.forEach(function (snippet) {
                            d3.select(divId)
                                .append("div")
                                .attr('class', 'snippet')
                                .html(snippet);
                        })

                    });
                });
            var obscuredTerms = getObscuredTerms(termInfo.info);
            displayObscuredTerms(obscuredTerms, info.term, '#overlapped-terms-clicked');

            d3.select('#termstats')
                .selectAll("div")
                .remove();
            d3.select('#termstats')
                .append('div')
                .attr("class", "snippet_header")
                .html('Term: <b>' + info.term + '</b>');
            var message = '';
            var cat_name = fullData.info.category_name;
            var ncat_name = fullData.info.not_category_name;

            var numCatDocs = fullData.docs.labels
                .map(function (x) {
                    return (x == fullData.docs.categories.indexOf(
                        fullData.info.category_internal_name)) + 0
                })
                .reduce(function (a, b) {
                    return a + b;
                })

            var notCategoryNumList = fullData.docs.categories.map(function (x, i) {
                if (fullData.info.not_category_internal_names.indexOf(x) > -1) {
                    return i;
                } else {
                    return -1;
                }
            }).filter(function (x) {
                return x > -1
            });


            var numNCatDocs = fullData.docs.labels
                .map(function (x) {
                    return notCategoryNumList.indexOf(x) > -1
                })
                .reduce(function (a, b) {
                    return a + b;
                });

            function getFrequencyDescription(name, count25k, count, ndocs) {
                var desc = name + ' frequency: <div class=text_subhead>' + count25k
                    + ' per 25,000 terms</div><div class=text_subhead>' + Math.round(ndocs)
                    + ' per 1,000 docs</div>';
                if (count == 0) {
                    desc += '<u>Not found in any ' + name + ' documents.</u>';
                } else {
                    desc += '<u>Some of the ' + count + ' mentions:</u>';
                }
                /*
                desc += '<br><b>Discriminative:</b> ';

                desc += contextWords
                    .slice(cat_name === name ? 0 : contextWords.length - 3,
                        cat_name === name ? 3 : contextWords.length)
                    .filter(function (x) {
                        //return Math.abs(x[5]) > 1.96;
                        return true;
                    })
                    .map(function (x) {return x.join(', ')}).join('<br>');
                */
                return desc;
            }

            d3.select('#cathead')
                .style('fill', color(1))
                .html(
                    getFrequencyDescription(cat_name,
                        info.cat25k,
                        info.cat,
                        termInfo.contexts[0].length * 1000 / numCatDocs
                    )
                );
            d3.select('#notcathead')
                .style('fill', color(0))
                .html(
                    getFrequencyDescription(ncat_name,
                        info.ncat25k,
                        info.ncat,
                        termInfo.contexts[1].length * 1000 / numNCatDocs)
                );
            console.log("TermINfo")
            console.log(termInfo);
            console.log(info)
            if (showNeutral) {
                console.log("NEUTRAL")

                var numList = fullData.docs.categories.map(function (x, i) {
                    if (fullData.info.neutral_category_internal_names.indexOf(x) > -1) {
                        return i;
                    } else {
                        return -1;
                    }
                }).filter(function (x) {
                    return x > -1
                });

                var numDocs = fullData.docs.labels
                    .map(function (x) {
                        return numList.indexOf(x) > -1
                    })
                    .reduce(function (a, b) {
                        return a + b;
                    });

                d3.select("#neuthead")
                    .style('fill', color(0))
                    .html(
                        getFrequencyDescription(fullData.info.neutral_category_name,
                            info.neut25k,
                            info.neut,
                            termInfo.contexts[2].length * 1000 / numDocs)
                    );

                if (showExtra) {
                    console.log("EXTRA")
                    var numList = fullData.docs.categories.map(function (x, i) {
                        if (fullData.info.extra_category_internal_names.indexOf(x) > -1) {
                            return i;
                        } else {
                            return -1;
                        }
                    }).filter(function (x) {
                        return x > -1
                    });

                    var numDocs = fullData.docs.labels
                        .map(function (x) {
                            return numList.indexOf(x) > -1
                        })
                        .reduce(function (a, b) {
                            return a + b;
                        });

                    d3.select("#extrahead")
                        .style('fill', color(0))
                        .html(
                            getFrequencyDescription(fullData.info.extra_category_name,
                                info.extra25k,
                                info.extra,
                                termInfo.contexts[3].length * 1000 / numDocs)
                        );

                }
            }
            if (jump) {
                if (window.location.hash == '#snippets') {
                    window.location.hash = '#snippetsalt';
                } else {
                    window.location.hash = '#snippets';
                }
            }
        }

        function searchInText(d) {
            function stripNonWordChars(term) {
                //d.term.replace(" ", "[^\\w]+")
            }

            function removeUnderScoreJoin(term) {
                /*
                '_ _asjdklf_jaksdlf_jaksdfl skld_Jjskld asdfjkl_sjkdlf'
                  ->
                "_ _asjdklf jaksdlf jaksdfl skld Jjskld asdfjkl_sjkdlf"
                 */
                return term.replace(/(\w+)(_)(\w+)/, "$1 $3")
                    .replace(/(\w+)(_)(\w+)/, "$1 $3")
                    .replace(/(\w+)(_)(\w+)/, "$1 $3");
            }

            function buildMatcher(term) {

                var boundary = '\\b';
                var wordSep = "[^\\w]+";
                if (asianMode) {
                    boundary = '( |$|^)';
                    wordSep = ' ';
                }
                if (isEmoji(term)) {
                    boundary = '';
                    wordSep = '';
                }
                var regexp = new RegExp(boundary + '('
                    + removeUnderScoreJoin(
                        term.replace('$', '\\$')
                            .replace(' ', wordSep, 'gim')
                    )
                    + ')' + boundary, 'gim');
                try {
                    regexp.exec('X');
                } catch (err) {
                    console.log("Can't search " + term);
                    console.log(err);
                    return null;
                }
                return regexp;
            }

            var matches = [[], [], [], []];
            var pattern = buildMatcher(d.term);
            var categoryNum = fullData.docs.categories.indexOf(fullData.info.category_internal_name);
            var notCategoryNumList = fullData.docs.categories.map(function (x, i) {
                if (fullData.info.not_category_internal_names.indexOf(x) > -1) {
                    return i;
                } else {
                    return -1;
                }
            }).filter(function (x) {
                return x > -1
            });
            var neutralCategoryNumList = fullData.docs.categories.map(function (x, i) {
                if (fullData.info.neutral_category_internal_names.indexOf(x) > -1) {
                    return i;
                } else {
                    return -1;
                }
            }).filter(function (x) {
                return x > -1
            });
            var extraCategoryNumList = fullData.docs.categories.map(function (x, i) {
                if (fullData.info.extra_category_internal_names.indexOf(x) > -1) {
                    return i;
                } else {
                    return -1;
                }
            }).filter(function (x) {
                return x > -1
            });
            console.log('extraCategoryNumList')
            console.log(extraCategoryNumList);
            console.log("categoryNum");
            console.log(categoryNum);
            console.log("categoryNum");
            if (pattern !== null) {
                for (var i in fullData.docs.texts) {
                    //var numericLabel = 1 * (fullData.docs.categories[fullData.docs.labels[i]] != fullData.info.category_internal_name);
                    var docLabel = fullData.docs.labels[i];
                    var numericLabel = -1;
                    if (docLabel == categoryNum) {
                        numericLabel = 0;
                    } else if (notCategoryNumList.indexOf(docLabel) > -1) {
                        numericLabel = 1;
                    } else if (neutralCategoryNumList.indexOf(docLabel) > -1) {
                        numericLabel = 2;
                    } else if (extraCategoryNumList.indexOf(docLabel) > -1) {
                        numericLabel = 3;
                    }
                    if (numericLabel == -1) {
                        continue;
                    }

                    var text = removeUnderScoreJoin(fullData.docs.texts[i]);
                    //var pattern = new RegExp("\\b(" + stripNonWordChars(d.term) + ")\\b", "gim");
                    var match;
                    var sentenceOffsets = null;
                    var lastSentenceStart = null;
                    var matchFound = false;
                    var curMatch = {'id': i, 'snippets': []};
                    if (fullData.docs.meta) {
                        curMatch['meta'] = fullData.docs.meta[i];
                    }
                    while ((match = pattern.exec(text)) != null) {
                        if (sentenceOffsets == null) {
                            sentenceOffsets = getSentenceBoundaries(text);
                        }
                        var foundSnippet = getMatchingSnippet(text, sentenceOffsets,
                            match.index, pattern.lastIndex);
                        if (foundSnippet.sentenceStart == lastSentenceStart) continue; // ensure we don't duplicate sentences
                        lastSentenceStart = foundSnippet.sentenceStart;
                        curMatch.snippets.push(foundSnippet.snippet);
                        matchFound = true;
                    }
                    if (matchFound) {
                        if (useFullDoc) {
                            curMatch.snippets = [
                                text
                                    .replace(/\n$/g, '\n\n')
                                    .replace(
                                        //new RegExp("\\b(" + d.term.replace(" ", "[^\\w]+") + ")\\b",
                                        //    'gim'),
                                        pattern,
                                        '<b>$&</b>')
                            ];
                        }
                        matches[numericLabel].push(curMatch);
                    }
                }
            }
            var toRet = {'contexts': matches, 'info': d};
            return toRet;
        }

        function getDefaultTooltipContent(d) {
            var message = d.term + "<br/>" + d.cat25k + ":" + d.ncat25k + " per 25k words";
            message += '<br/>score: ' + d.os.toFixed(5);
            return message;
        }

        function getDefaultTooltipContentWithoutScore(d) {
            var message = d.term + "<br/>" + d.cat25k + ":" + d.ncat25k + " per 25k words";
            return message;
        }

        function getObscuredTerms(d) {
            var matches = (data.filter(function (term) {
                    return term.x === d.x && term.y === d.y;
                }).map(function (term) {
                    return term.term
                }).sort()
            );
            return matches;
        }

        function showTooltip(d, pageX, pageY, showObscured=true) {
            deselectLastCircle();

            var obscuredTerms = getObscuredTerms(d);
            var message = '';
            if (obscuredTerms.length > 1 && showObscured)
                displayObscuredTerms(obscuredTerms, d.term);
            if (getTooltipContent !== null) {
                message += getTooltipContent(d);
            } else {
                if (sortByDist) {
                    message += getDefaultTooltipContentWithoutScore(d);
                } else {
                    message += getDefaultTooltipContent(d);
                }
            }

            pageX -= (svg.node().getBoundingClientRect().left) - origSVGLeft;
            pageY -= (svg.node().getBoundingClientRect().top) - origSVGTop;
            tooltip.transition()
                .duration(0)
                .style("opacity", 1)
                .style("z-index", 10000000);
            tooltip.html(message)
                .style("left", (pageX - 40) + "px")
                .style("top", (pageY - 85) + "px");
            tooltip.on('click', function () {
                tooltip.transition()
                    .style('opacity', 0)
            });
        }

        handleSearch = function (event) {
            deselectLastCircle();
            var searchTerm = document
                .getElementById("searchTerm")
                .value
                .toLowerCase()
                .replace("'", " '")
                .trim();
            showToolTipForTerm(searchTerm);
            var termInfo = termDict[searchTerm];
            if (termInfo != null) {
                displayTermContexts(gatherTermContexts(termInfo), false);
            }
            return false;
        };

        function showToolTipForTerm(searchTerm, showObscured=true) {
            var searchTermInfo = termDict[searchTerm];
            if (searchTermInfo === undefined) {
                d3.select("#alertMessage")
                    .text(searchTerm + " didn't make it into the visualization.");
            } else {
                d3.select("#alertMessage").text("");
                var circle = mysvg._groups[0][searchTermInfo.i];


                var mySVGMatrix = circle.getScreenCTM()
                    .translate(circle.cx.baseVal.value, circle.cy.baseVal.value);
                var pageX = mySVGMatrix.e;
                var pageY = mySVGMatrix.f;
                circle.style["stroke"] = "black";
                //var circlePos = circle.position();
                //var el = circle.node()
                //showTooltip(searchTermInfo, pageX, pageY, circle.cx.baseVal.value, circle.cx.baseVal.value);
                showTooltip(
                    searchTermInfo,
                    pageX,
                    pageY,
                    showObscured
                );

                lastCircleSelected = circle;

            }
        };

        function makeWordInteractive(domObj, term, showObscured=true) {
            return domObj
                .on("mouseover", function (d) {
                    showToolTipForTerm(term, showObscured);
                    d3.select(this).style("stroke", "black");
                })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(0)
                        .style("opacity", 0);
                    d3.select(this).style("stroke", null);
                    if (showObscured) {
                        d3.select('#overlapped-terms')
                            .selectAll('div')
                            .remove();
                    }
                })
                .on("click", function (d) {
                    displayTermContexts(gatherTermContexts(termDict[term]));
                });
        }

        function processData(fullData) {
            var modelInfo = fullData['info'];
            /*
             categoryTermList.data(modelInfo['category_terms'])
             .enter()
             .append("li")
             .text(function(d) {return d;});
             */
            data = fullData['data'];
            termDict = Object();
            data.forEach(function (x, i) {
                termDict[x.term] = x;
                termDict[x.term].i = i;
            });

            var padding = 0;
            if (showAxes) {
                padding = 0.1;
            }

            // Scale the range of the data.  Add some space on either end.
            x.domain([-1 * padding, d3.max(data, function (d) {
                return d.x;
            }) + padding]);
            y.domain([-1 * padding, d3.max(data, function (d) {
                return d.y;
            }) + padding]);

            /*
             data.sort(function (a, b) {
             return Math.abs(b.os) - Math.abs(a.os)
             });
             */


            //var rangeTree = null; // keep boxes of all points and labels here
            var rectHolder = new RectangleHolder();
            // Add the scatterplot
            mysvg = svg
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", function (d) {
                    if (pValueColors && d.p) {
                        return (d.p >= 1 - minPVal || d.p <= minPVal) ? 2 : 1.75;
                    }
                    return 2;
                })
                .attr("cx", function (d) {
                    return x(d.x);
                })
                .attr("cy", function (d) {
                    return y(d.y);
                })
                .style("fill", function (d) {
                    //.attr("fill", function (d) {
                    if (colorFunc) {
                        return colorFunc(d);
                    } else if (greyZeroScores && d.os == 0) {
                        return d3.rgb(230, 230, 230);
                    } else if (pValueColors && d.p) {
                        if (d.p >= 1 - minPVal) {
                            return wordVecMaxPValue ? d3.interpolateYlGnBu(d.s) : color(d.s);
                        } else if (d.p <= minPVal) {
                            return wordVecMaxPValue ? d3.interpolateYlGnBu(d.s) : color(d.s);
                        } else {
                            return interpolateLightGreys(d.s);
                        }
                    } else {
                        return color(d.s);
                    }
                })
                .on("mouseover", function (d) {
                    /*var mySVGMatrix = circle.getScreenCTM()n
                        .translate(circle.cx.baseVal.value, circle.cy.baseVal.value);
                    var pageX = mySVGMatrix.e;
                    var pageY = mySVGMatrix.f;*/

                    /*showTooltip(
                        d,
                        d3.event.pageX,
                        d3.event.pageY
                    );*/
                    showToolTipForTerm(d.term, true);
                    d3.select(this).style("stroke", "black");
                })
                .on("click", function (d) {
                    displayTermContexts(gatherTermContexts(d));
                })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(0)
                        .style("opacity", 0);
                    d3.select(this).style("stroke", null);
                    d3.select('#overlapped-terms')
                        .selectAll('div')
                        .remove();
                })

            coords = Object();

            var pointStore = [];
            var pointRects = []

            function censorPoints(datum, getX, getY) {
                var term = datum.term;
                var curLabel = svg.append("text")
                    .attr("x", x(getX(datum)))
                    .attr("y", y(getY(datum)) + 3)
                    .attr("text-anchor", "middle")
                    .text("x");
                var bbox = curLabel.node().getBBox();
                var borderToRemove = .5;
                var x1 = bbox.x + borderToRemove,
                    y1 = bbox.y + borderToRemove,
                    x2 = bbox.x + bbox.width - borderToRemove,
                    y2 = bbox.y + bbox.height - borderToRemove;
                //rangeTree = insertRangeTree(rangeTree, x1, y1, x2, y2, '~~' + term);
                var pointRect = new Rectangle(x1, y1, x2, y2);
                pointRects.push(pointRect);
                rectHolder.add(pointRect);
                pointStore.push([x1, y1]);
                pointStore.push([x2, y1]);
                pointStore.push([x1, y2]);
                pointStore.push([x2, y2]);
                curLabel.remove();
            }

            function labelPointsIfPossible(i, myX, myY) {
                var term = data[i].term;

                var configs = [
                    {'anchor': 'end', 'xoff': -5, 'yoff': -3, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'end', 'xoff': -5, 'yoff': 10, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': 3, 'yoff': 10, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': 3, 'yoff': -3, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': 5, 'yoff': 10, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': 5, 'yoff': -3, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': 10, 'yoff': 15, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': -10, 'yoff': -15, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': 10, 'yoff': -15, 'alignment-baseline': 'ideographic'},
                    {'anchor': 'start', 'xoff': -10, 'yoff': 15, 'alignment-baseline': 'ideographic'},
                ];
                /*if(!useOffset) {
                 configs = [{'anchor': 'middle', 'xoff': 0, 'yoff': 0,
                 'alignment-baseline': 'middle'}];
                 }*/
                var matchedElement = null;
                for (var configI in configs) {
                    var config = configs[configI];
                    var curLabel = makeWordInteractive(
                        svg.append("text")
                        //.attr("x", x(data[i].x) + config['xoff'])
                        //.attr("y", y(data[i].y) + config['yoff'])
                            .attr("x", x(myX) + config['xoff'])
                            .attr("y", y(myY) + config['yoff'])
                            .attr('class', 'label')
                            .attr('class', 'pointlabel')
                            .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                            .attr('font-size', '10px')
                            .attr("text-anchor", config['anchor'])
                            .attr("alignment-baseline", config['alignment'])
                            .text(term),
                        term
                    );
                    var bbox = curLabel.node().getBBox();
                    var borderToRemove = .5;
                    var x1 = bbox.x + borderToRemove,
                        y1 = bbox.y + borderToRemove,
                        x2 = bbox.x + bbox.width - borderToRemove,
                        y2 = bbox.y + bbox.height - borderToRemove;
                    //matchedElement = searchRangeTree(rangeTree, x1, y1, x2, y2);
                    var matchedElement = false;
                    rectHolder.findMatchingRectangles(x1, y1, x2, y2, function (elem) {
                        matchedElement = true;
                        return false;
                    });
                    if (matchedElement) {
                        curLabel.remove();
                    } else {
                        break;
                    }
                }

                if (!matchedElement) {
                    coords[term] = [x1, y1, x2, y2];
                    //rangeTree = insertRangeTree(rangeTree, x1, y1, x2, y2, term);
                    var labelRect = new Rectangle(x1, y1, x2, y2)
                    rectHolder.add(labelRect);
                    pointStore.push([x1, y1]);
                    pointStore.push([x2, y1]);
                    pointStore.push([x1, y2]);
                    pointStore.push([x2, y2]);
                    return {label: curLabel, rect: labelRect};
                } else {
                    //curLabel.remove();
                    return false;
                }

            }

            var radius = 2;

            function euclideanDistanceSort(a, b) {
                var aCatDist = a.x * a.x + (1 - a.y) * (1 - a.y);
                var aNotCatDist = a.y * a.y + (1 - a.x) * (1 - a.x);
                var bCatDist = b.x * b.x + (1 - b.y) * (1 - b.y);
                var bNotCatDist = b.y * b.y + (1 - b.x) * (1 - b.x);
                return (Math.min(aCatDist, aNotCatDist) > Math.min(bCatDist, bNotCatDist)) * 2 - 1;
            }

            function euclideanDistanceSortForCategory(a, b) {
                var aCatDist = a.x * a.x + (1 - a.y) * (1 - a.y);
                var bCatDist = b.x * b.x + (1 - b.y) * (1 - b.y);
                return (aCatDist > bCatDist) * 2 - 1;
            }

            function euclideanDistanceSortForNotCategory(a, b) {
                var aNotCatDist = a.y * a.y + (1 - a.x) * (1 - a.x);
                var bNotCatDist = b.y * b.y + (1 - b.x) * (1 - b.x);
                return (aNotCatDist > bNotCatDist) * 2 - 1;
            }

            function scoreSort(a, b) {
                return a.s - b.s;
            }

            function scoreSortReverse(a, b) {
                return b.s - a.s;
            }

            function backgroundScoreSort(a, b) {
                if (b.bg === a.bg)
                    return (b.cat + b.ncat) - (a.cat + a.ncat);
                return b.bg - a.bg;
            }

            function arePointsPredictiveOfDifferentCategories(a, b) {
                var aCatDist = a.x * a.x + (1 - a.y) * (1 - a.y);
                var bCatDist = b.x * b.x + (1 - b.y) * (1 - b.y);
                var aNotCatDist = a.y * a.y + (1 - a.x) * (1 - a.x);
                var bNotCatDist = b.y * b.y + (1 - b.x) * (1 - b.x);
                var aGood = aCatDist < aNotCatDist;
                var bGood = bCatDist < bNotCatDist;
                return {aGood: aGood, bGood: bGood};
            }

            function scoreSortForCategory(a, b) {
                var __ret = arePointsPredictiveOfDifferentCategories(a, b);
                if (sortByDist) {
                    var aGood = __ret.aGood;
                    var bGood = __ret.bGood;
                    if (aGood && !bGood) return -1;
                    if (!aGood && bGood) return 1;
                }
                return b.s - a.s;
            }

            function scoreSortForNotCategory(a, b) {
                var __ret = arePointsPredictiveOfDifferentCategories(a, b);
                if (sortByDist) {
                    var aGood = __ret.aGood;
                    var bGood = __ret.bGood;
                    if (aGood && !bGood) return 1;
                    if (!aGood && bGood) return -1;
                }
                if (reverseSortScoresForNotCategory)
                    return a.s - b.s;
                else
                    return b.s - a.s;
            }

            data = data.sort(sortByDist ? euclideanDistanceSort : scoreSort);
            console.log("Sorted Data:");
            console.log(data);
            for (var i in data) {
                var d = data[i];
                censorPoints(
                    d,
                    function (d) {
                        return d.x
                    },
                    function (d) {
                        return d.y
                    }
                );
            }


            function registerFigureBBox(curLabel) {
                var bbox = curLabel.node().getBBox();
                var borderToRemove = 1.5;
                var x1 = bbox.x + borderToRemove,
                    y1 = bbox.y + borderToRemove,
                    x2 = bbox.x + bbox.width - borderToRemove,
                    y2 = bbox.y + bbox.height - borderToRemove;
                rectHolder.add(new Rectangle(x1, y1, x2, y2));
                //return insertRangeTree(rangeTree, x1, y1, x2, y2, '~~_other_');
            }

            if (showAxes) {

                var myXAxis = svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                //rangeTree = registerFigureBBox(myXAxis);
                var xLabel = svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", height - 6)
                    .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                    .attr('font-size', '10px')
                    .text(getLabelText('x'));

                //console.log('xLabel');
                //console.log(xLabel);

                //rangeTree = registerFigureBBox(xLabel);
                // Add the Y Axis

                if (!yAxisValues) {
                    var myYAxis = svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "30px")
                        .attr("dy", "-13px")
                        .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                        .attr('font-size', '10px')
                        .attr("transform", "rotate(-90)");
                } else {
                    var myYAxis = svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                        .attr('font-size', '10px');
                }
                registerFigureBBox(myYAxis);

                function getLabelText(axis) {
                    if (axis == 'y') {
                        if (yLabelText == null)
                            return modelInfo['category_name'] + " Frequency";
                        else
                            return yLabelText;
                    } else {
                        if (xLabelText == null)
                            return modelInfo['not_category_name'] + " Frequency";
                        else
                            return xLabelText;
                    }
                }

                var yLabel = svg.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y", 6)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                    .attr('font-size', '10px')
                    .text(getLabelText('y'));
                registerFigureBBox(yLabel);
            } else {
                d3.selection.prototype.moveToBack = function () {
                    return this.each(function () {
                        var firstChild = this.parentNode.firstChild;
                        if (firstChild) {
                            this.parentNode.insertBefore(this, firstChild);
                        }
                    });
                };
                var x_line = svg.append("g")
                    .attr("transform", "translate(0, " + y(0.5) + ")")
                    .append("line")
                    .attr("x2", width)
                    .style("stroke", "#cccccc")
                    .style("stroke-width", "1px")
                    .moveToBack();
                var y_line = svg.append("g")
                    .attr("transform", "translate(" + x(0.5) + ", 0)")
                    .append("line")
                    .attr("y2", height)
                    .style("stroke", "#cccccc")
                    .style("stroke-width", "1px")
                    .moveToBack();
            }

            function showWordList(word, termDataList) {
                var maxWidth = word.node().getBBox().width;
                for (var i in termDataList) {
                    var curTerm = termDataList[i].term;
                    word = (function (word, curTerm) {
                        return makeWordInteractive(
                            svg.append("text")
                                .attr("text-anchor", "start")
                                .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                                .attr('font-size', '12px')
                                .attr("x", word.node().getBBox().x)
                                .attr("y", word.node().getBBox().y
                                    + 2 * word.node().getBBox().height)
                                .text(curTerm)
                            ,
                            curTerm);
                    })(word, curTerm);
                    if (word.node().getBBox().width > maxWidth)
                        maxWidth = word.node().getBBox().width;
                    registerFigureBBox(word);
                }
                return {
                    'word': word,
                    'maxWidth': maxWidth
                };
            }

            function pickEuclideanDistanceSortAlgo(category) {
                if (category == true) return euclideanDistanceSortForCategory;
                return euclideanDistanceSortForNotCategory;
            }

            function pickScoreSortAlgo(category) {
                console.log("PICK SCORE ALGO")
                console.log(category)
                if (category == true) {
                    return scoreSortForCategory;
                } else {
                    return scoreSortForNotCategory;
                }
            }

            function pickTermSortingAlgorithm(category) {
                if (sortByDist) return pickEuclideanDistanceSortAlgo(category);
                return pickScoreSortAlgo(category);
            }

            function showAssociatedWordList(header, isAssociatedToCategory, length=14) {
                var sortedData = null;
                var sortingAlgo = pickTermSortingAlgorithm(isAssociatedToCategory);
                sortedData = data.sort(sortingAlgo);
                if (wordVecMaxPValue) {
                    function signifTest(x) {
                        if (isAssociatedToCategory)
                            return x.p >= 1 - minPVal;
                        return x.p <= minPVal;
                    }

                    sortedData = sortedData.filter(signifTest)
                }
                return showWordList(header, sortedData.slice(0, length));

            }


            var characteristicXOffset = width;
            if (showTopTerms) {
                var catHeader = svg.append("text")
                    .attr("text-anchor", "start")
                    .attr("x", width)
                    .attr("dy", "6px")
                    .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                    .attr('font-size', '12px')
                    .attr('font-weight', 'bolder')
                    .attr('font-decoration', 'underline')
                    .text("Top " + fullData['info']['category_name']);
                registerFigureBBox(catHeader);
                console.log(catHeader);


                var wordListData = showAssociatedWordList(catHeader, true);
                var word = wordListData.word;
                var maxWidth = wordListData.maxWidth;

                catHeader = svg.append("text")
                    .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                    .attr('font-size', '12px')
                    .attr('font-weight', 'bolder')
                    .attr('font-decoration', 'underline')
                    .attr("text-anchor", "start")
                    .attr("x", width)
                    .attr("y", word.node().getBBox().y + 4 * word.node().getBBox().height)
                    .text("Top " + fullData['info']['not_category_name']);

                characteristicXOffset = catHeader.node().getBBox().x + maxWidth + 10;

                wordListData = showAssociatedWordList(catHeader, false);
                word = wordListData.word;
                if (wordListData.maxWidth > maxWidth) {
                    maxWidth = wordListData.maxWidth;
                }

            }


            if (!nonTextFeaturesMode && !asianMode && showCharacteristic) {
                var sortMethod = backgroundScoreSort;
                var title = 'Characteristic';
                if (wordVecMaxPValue) {
                    title = 'Most similar';
                    sortMethod = scoreSortReverse;
                } else if (data.reduce(function (a, b) {
                        return a + b.bg
                    }, 0) === 0) {
                    title = 'Most frequent';
                }
                word = svg.append("text")
                    .attr('font-family', 'Helvetica, Arial, Sans-Serif')
                    .attr("text-anchor", "start")
                    .attr('font-size', '12px')
                    .attr('font-weight', 'bolder')
                    .attr('font-decoration', 'underline')
                    .attr("x", characteristicXOffset)
                    .attr("dy", "6px")
                    .text(title);

                var wordListData = showWordList(word, data.sort(sortMethod).slice(0, 30));

                word = wordListData.word;
                maxWidth = wordListData.maxWidth;
                console.log(maxWidth);
                console.log(word.node().getBBox().x + maxWidth);

                svg.attr('width', word.node().getBBox().x + 3 * maxWidth + 10);
            }

            function performPartialLabeling(existingLabels, getX, getY) {
                for (i in existingLabels) {
                    rectHolder.remove(existingLabels[i].rect);
                    existingLabels[i].label.remove();
                }

                var labeledPoints = [];
                for (var i = 0; i < data.length; i++) {
                    var label = labelPointsIfPossible(i, getX(data[i]), getY(data[i]));
                    if (label !== false) {
                        labeledPoints.push(label)
                    }
                    //if (labelPointsIfPossible(i), true) numPointsLabeled++;
                }
                console.log('numPointsLabeled');
                console.log(labeledPoints.length);
                return labeledPoints;
            }

            //var labeledPoints = performPartialLabeling();
            labeledPoints = [];
            labeledPoints = performPartialLabeling(labeledPoints,
                function (d) {
                    return d.x
                },
                function (d) {
                    return d.y
                });
            console.log("labeledPoints");
            console.log(labeledPoints);
            var redrawPoints = function (n, getX, getY, relabel=false) {
                labeledPoints.forEach(function (p) {
                    p.label.remove();
                    rectHolder.remove(p.rect);
                });
                pointRects.forEach(function (rect) {
                    rectHolder.remove(rect);
                });
                pointRects = []

                var newCoords = {};
                for (i in fullData['data']) {
                    var d = fullData['data'][i];
                    newCoords[d.term] = {x: getX(d), y: getY(d)};
                    censorPoints(d, getX, getY);
                }

                d3.selectAll('circle').transition().duration(1000).attr("cy", function (d) {
                    return y(newCoords[d.term].y)
                }).attr("cx", function (d) {
                    return x(newCoords[d.term].x)
                }).duration(1000);
                labeledPoints = [];
                if (relabel) {
                    labeledPoints = performPartialLabeling(labeledPoints, function (d) {
                            return newCoords[d.term].x
                        },
                        function (d) {
                            return newCoords[d.term].y
                        });
                    console.log("labeledPoints");
                    console.log(labeledPoints);
                }
            };


            /*
            // pointset has to be sorted by X
            function convex(pointset) {
                function _cross(o, a, b) {
                    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
                }

                function _upperTangent(pointset) {
                    var lower = [];
                    for (var l = 0; l < pointset.length; l++) {
                        while (lower.length >= 2 && (_cross(lower[lower.length - 2], lower[lower.length - 1], pointset[l]) <= 0)) {
                            lower.pop();
                        }
                        lower.push(pointset[l]);
                    }
                    lower.pop();
                    return lower;
                }

                function _lowerTangent(pointset) {
                    var reversed = pointset.reverse(),
                        upper = [];
                    for (var u = 0; u < reversed.length; u++) {
                        while (upper.length >= 2 && (_cross(upper[upper.length - 2], upper[upper.length - 1], reversed[u]) <= 0)) {
                            upper.pop();
                        }
                        upper.push(reversed[u]);
                    }
                    upper.pop();
                    return upper;
                }

                var convex,
                    upper = _upperTangent(pointset),
                    lower = _lowerTangent(pointset);
                convex = lower.concat(upper);
                convex.push(pointset[0]);
                return convex;
            }

            console.log("POINTSTORE")
            console.log(pointStore);
            pointStore.sort();
            var convexHull = convex(pointStore);
            var minX = convexHull.sort(function (a,b) {
                return a[0] < b[0] ? -1 : 1;
            })[0][0];
            var minY = convexHull.sort(function (a,b) {
                return a[1] < b[1] ? -1 : 1;
            })[0][0];
            //svg.append("text").text("BLAH BLAH").attr("text-anchor", "middle").attr("cx", x(0)).attr("y", minY);
            console.log("POINTSTORE")
            console.log(pointStore);
            console.log(convexHull);
            for (i in convexHull) {
                var i = parseInt(i);
                if (i + 1 == convexHull.length) {
                    var nextI = 0;
                } else {
                    var nextI = i + 1;
                }
                console.log(i, ',', nextI);
                svg.append("line")
                    .attr("x2", width)
                    .style("stroke", "#cc0000")
                    .style("stroke-width", "1px")
                    .attr("x1", convexHull[i][0])     // x position of the first end of the line
                    .attr("y1", convexHull[i][1])      // y position of the first end of the line
                    .attr("x2", convexHull[nextI][0])     // x position of the second end of the line
                    .attr("y2", convexHull[nextI][1]);    // y position of the second end of the line
            }*/

            function populateCorpusStats() {
                var wordCounts = {};
                var docCounts = {}
                fullData.docs.labels.forEach(function (x, i) {
                    var cnt = (
                        fullData.docs.texts[i]
                            .trim()
                            .replace(/['";:,.?¿\-!¡]+/g, '')
                            .match(/\S+/g) || []
                    ).length;
                    var name = null;
                    if (fullData.docs.categories[x] == fullData.info.category_internal_name) {
                        name = fullData.info.category_name;
                    } else if (fullData.info.not_category_internal_names.indexOf(fullData.docs.categories[x]) > -1) {
                        name = fullData.info.not_category_name;
                    } else if (fullData.info.neutral_category_internal_names.indexOf(fullData.docs.categories[x]) > -1) {
                        name = fullData.info.neutral_category_name;
                    } else if (fullData.info.extra_category_internal_names.indexOf(fullData.docs.categories[x]) > -1) {
                        name = fullData.info.extra_category_name;
                    }
                    if (name) {
                        wordCounts[name] = wordCounts[name] ? wordCounts[name] + cnt : cnt
                    }
                    //!!!

                });
                fullData.docs.labels.forEach(function (x) {
                    var name = null;
                    if (fullData.docs.categories[x] == fullData.info.category_internal_name) {
                        name = fullData.info.category_name;
                    } else if (fullData.info.not_category_internal_names.indexOf(fullData.docs.categories[x]) > -1) {
                        name = fullData.info.not_category_name;
                    } else if (fullData.info.neutral_category_internal_names.indexOf(fullData.docs.categories[x]) > -1) {
                        name = fullData.info.neutral_category_name;
                    } else if (fullData.info.extra_category_internal_names.indexOf(fullData.docs.categories[x]) > -1) {
                        name = fullData.info.extra_category_name;
                    }
                    if (name) {
                        docCounts[name] = docCounts[name] ? docCounts[name] + 1 : 1
                    }
                });
                console.log("docCounts");
                console.log(docCounts)
                var messages = [];
                var categoriesToShow = [fullData.info.category_name,
                    fullData.info.not_category_name,
                    fullData.info.neutral_category_name,
                    fullData.info.extra_category_name];
                categoriesToShow.forEach(function (x, i) {
                    if (docCounts[x] > 0) {
                        messages.push('<b>' + x + '</b> document count: '
                            + Number(docCounts[x]).toLocaleString('en')
                            + '; word count: '
                            + Number(wordCounts[x]).toLocaleString('en'));
                    }
                });

                d3.select('#corpus-stats')
                    .style('width', width + margin.left + margin.right + 200)
                    .append('div')
                    .html(messages.join('<br />'));
            }


            if (fullData.docs) {
                populateCorpusStats();
            }

            if (saveSvgButton) {
                // from https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
                var svgElement = document.getElementById("d3-div-1");

                var serializer = new XMLSerializer();
                var source = serializer.serializeToString(svgElement);

                if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
                    source = source.replace(/^<svg/, '<svg xmlns="https://www.w3.org/2000/svg"');
                }
                if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
                    source = source.replace(/^<svg/, '<svg xmlns:xlink="https://www.w3.org/1999/xlink"');
                }

                source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

                var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

                var downloadLink = document.createElement("a");
                downloadLink.href = url;
                downloadLink.download = fullData['info']['category_name'] + ".svg";
                downloadLink.innerText = 'Download SVG';
                document.body.appendChild(downloadLink);

            }
            //return [performPartialLabeling, labeledPoints];
            return redrawPoints;
        };

        //fullData = getDataAndInfo();
        var corpusWordCounts = getCorpusWordCounts();
        var redrawPoints = processData(fullData);


        // The tool tip is down here in order to make sure it has the highest z-index
        var tooltip = d3.select('#' + divName)
            .append("div")
            //.attr("class", getTooltipContent == null && sortByDist ? "tooltip" : "tooltipscore")
            .attr("class", "tooltipscore")
            .style("opacity", 0);
        var plotInterface = Object();
        plotInterface.displayTermContexts = displayTermContexts;
        plotInterface.gatherTermContexts = gatherTermContexts;
        plotInterface.termDict = termDict;
        plotInterface.showToolTipForTerm = showToolTipForTerm;
        plotInterface.redrawPoints = redrawPoints;

        function drawFightinWords() {
            plotInterface.redrawPoints(0.1, function (d) {
                    return Math.log(d.ncat + d.cat) / maxFreq
                }, function (d) {
                    return d.s
                }, true
            )
        };
        return plotInterface
    };
}(d3);
