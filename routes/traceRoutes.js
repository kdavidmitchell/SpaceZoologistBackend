const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const PlayTrace = mongoose.model('playtraces');
const LevelTrace = mongoose.model('leveltraces');
const DayTrace = mongoose.model('daytraces');
const JournalTrace = mongoose.model('journaltraces');

module.exports = app => {
    app.post('/traces/playtrace', async (req, res) => {
        console.log("Received playtrace request.");

        var response = {};

        const playtrace = req.body;
        if (playtrace == null) {
            response.code = 1;
            response.msg = "Playtrace not found in request.";
            res.send(response);
            return;
        }

        console.log("Creating new playtrace...");
        var newPlaytrace = new PlayTrace({
            playerID : playtrace.playerID,
            sessionID : playtrace.sessionID,
            sessionElapsedTime: playtrace.sessionElapsedTime
        });

        for (var i = 0; i < playtrace.levelTraces.length; i++) {
            console.log("Creating level trace...");
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
                console.log("Creating day trace...");
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
                    console.log("Creating journal trace...");
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
}