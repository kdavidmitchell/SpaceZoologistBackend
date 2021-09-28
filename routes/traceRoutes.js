const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const PlayTrace = mongoose.model('playtraces');
const LevelTrace = mongoose.model('leveltraces');
const DayTrace = mongoose.model('daytraces');
const JournalTrace = mongoose.model('journaltraces');
const SummaryTrace = mongoose.model('summarytraces');
const SetTrace = mongoose.model('settraces');

const debugDB = require('../debuggers.js').db;

module.exports = app => {
    app.post('/traces/playtrace', async (req, res) => {
        debugDB("Received playtrace request.");

        var response = {};

        const playtrace = req.body;
        if (playtrace == null) {
            response.code = 1;
            response.msg = "Playtrace not found in request.";
            res.send(response);
            return;
        }

        debugDB("Creating new playtrace...");
        var newPlaytrace = new PlayTrace({
            playerID : playtrace.playerID,
            sessionID : playtrace.sessionID,
            sessionElapsedTime: playtrace.sessionElapsedTime
        });

        for (var i = 0; i < playtrace.levelTraces.length; i++) {
            debugDB("Creating level trace...");
            var leveltrace = playtrace.levelTraces[i];
            var newLeveltrace = new LevelTrace({
                levelID : leveltrace.levelID,
                levelStartTime : leveltrace.levelStartTime,
                levelEndTime : leveltrace.levelEndTime,
                levelDeltaTime : leveltrace.levelDeltaTime,
                levelElapsedDays : leveltrace.levelElapsedDays,
                levelComplete : leveltrace.levelComplete
            });

            for (var j = 0; j < leveltrace.dayTraces.length; j++)
            {
                debugDB("Creating day trace...");
                var daytrace = leveltrace.dayTraces[j];
                var newDaytrace = new DayTrace({
                    dayID : daytrace.dayID,
                    dayStartTime : daytrace.dayStartTime,
                    dayEndTime : daytrace.dayEndTime,
                    dayDeltaTime : daytrace.dayDeltaTime,
                    balanceStart : daytrace.balanceStart,
                    balanceEnd : daytrace.balanceEnd
                });

                for (var k = 0; k < daytrace.journalTraces.length; k++)
                {
                    debugDB("Creating journal trace...");
                    var journaltrace = daytrace.journalTraces[k];
                    var newJournalTrace = new JournalTrace({
                        journalStartTime : journaltrace.journalStartTime,
                        journalEndTime : journaltrace.journalEndTime,
                        journalDeltaTime : journaltrace.journalDeltaTime,
                        journalNotes : journaltrace.journalNotes
                    });
                    await newLeveltrace.save();
                    newDaytrace.journalTraces.push(newJournalTrace);
                }
                await newDaytrace.save();
                newLeveltrace.dayTraces.push(newDaytrace);
            }
            await newLeveltrace.save();
            newPlaytrace.levelTraces.push(newLeveltrace);
        }
        await newPlaytrace.save();
        response.code = 0;
        response.msg = "Playtrace succesfully submitted.";
        res.send(response);
        return;
    });

    app.post('/traces/summarytrace', async (req, res) => {
        debugDB("Received summarytrace request.");

        var response = {};

        const summarytrace = req.body;
        if (summarytrace == null) {
            response.code = 1;
            response.msg = "Summary not found in request.";
            res.send(response);
            return;
        }

        debugDB("Creating new summarytrace...");
        var newSummarytrace = new SummaryTrace({
            playerID : summarytrace.playerID,
            totalPlayTime : summarytrace.totalPlayTime,
            tutorialTime : summarytrace.tutorialTime,
            level1Time : summarytrace.level1Time,
            level2Time : summarytrace.level2Time,
            level3Time : summarytrace.level3Time,
            level4Time : summarytrace.level4Time,
            level5Time : summarytrace.level5Time,
            totalCompletion : summarytrace.totalCompletion,
            tutorialComplete : summarytrace.tutorialComplete,
            level1Complete : summarytrace.level1Complete,
            level2Complete : summarytrace.level2Complete,
            level3Complete : summarytrace.level3Complete,
            level4Complete : summarytrace.level4Complete,
            level5Complete : summarytrace.level5Complete,
            numResearchTabOpen : summarytrace.numResearchTabOpen,
            timeResearchTabOpen : summarytrace.timeResearchTabOpen,
            numArticlesRead : summarytrace.numArticlesRead,
            numBookmarksCreated : summarytrace.numBookmarksCreated,
            notesResearchTab : summarytrace.notesResearchTab,
            numObservationToolOpen : summarytrace.numObservationToolOpen,
            timeObservationToolOpen : summarytrace.timeObservationToolOpen,
            notesObservationTool : summarytrace.notesObservationTool,
            numResourceRequests : summarytrace.numResourceRequests,
            numResourceRequestsApproved : summarytrace.numResourceRequestsApproved,
            numResourceRequestsDenied : summarytrace.numResourceRequestsDenied,
            numDrawToolUsed : summarytrace.numDrawToolUsed,
        });

        for (var i = 0; i < summarytrace.setTracesLevel1.length; i++) {
            debugDB("Creating level 1 set trace...");
            var settrace = summarytrace.setTracesLevel1[i];
            var newSettrace = new SetTrace({
                playerID : settrace.playerID,
                result : settrace.result,
                numDays : settrace.numDays,
                numAttempts : settrace.numAttempts,
                currency : settrace.currency,
                failure : settrace.failure,
                foodScore : settrace.foodScore,
                terrainScore : settrace.terrainScore,
            });
            await newSettrace.save();
            newSummarytrace.setTracesLevel1.push(newSettrace);
        }

        await newSummarytrace.save();
        response.code = 0;
        response.msg = "Summary succesfully submitted.";
        res.send(response);
        return;
    });
}