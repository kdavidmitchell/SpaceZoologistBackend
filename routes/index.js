var express = require('express');
var csv = require('csv-express');

var mongoose = require('mongoose');
const PlayTrace = mongoose.model('playtraces');
const LevelTrace = mongoose.model('leveltraces');
const DayTrace = mongoose.model('daytraces');
const JournalTrace = mongoose.model('journaltraces');

module.exports = app => {
  /* GET home page. */
  app.get('/', function(req, res, next) {
    PlayTrace.find({}, function(err, playtraces) {
        if (err)
          res.send(err);
        LevelTrace.find({}, function(err, leveltraces) {
          if (err)
            res.send(err);
          DayTrace.find({}, function(err, daytraces) {
            if (err)
              res.send(err);
        res.render('index', { title: 'Space Zoologist Database', playtraces: playtraces, leveltraces: leveltraces, daytraces: daytraces });
        });
      });
    });
  });

  /* GET export route. */
  app.get('/export', function(req, res, next) {
    var filename = "playtraces.csv";
    var dataArray;
    PlayTrace.find().lean().exec({}, function(err, playtraces) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(playtraces, true);
    });
  });
}
