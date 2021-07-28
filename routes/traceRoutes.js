const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const PlayTrace = mongoose.model('playtraces');
const LevelTrace = mongoose.model('leveltraces');
const DayTrace = mongoose.model('daytraces');

module.exports = app => {
    app.post('/playtrace', async (req, res) => {

        var response = {};

        const { playtrace } = req.body;
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
                newLeveltrace.dayTraces.push(newDaytrace);
            }
            newPlaytrace.levelTraces.push(newLeveltrace);
        }
        await newPlaytrace.save();
        response.code = 0;
        response.msg = "Playtrace succesfully submitted.";
        res.send(response);
        return;
    });
}