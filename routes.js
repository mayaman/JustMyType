var config = require('./config');
var express = require('express');
var path = require('path');
var passport = require('passport');
var FacebookStrategy =
        require('passport-facebook').Strategy;

var info = {};
var theKeyword = "hack";
var loggedIn = false;

passport.use(new FacebookStrategy({
        clientID: config.get('FACEBOOK_APP_ID'),
        clientSecret: config.get('FACEBOOK_APP_SECRET'),
        callbackURL: 'http://localhost:4747/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done) {
        info[profile.id] = profile;
        done(null, profile);
}));

passport.serializeUser(function(user, done) {
        loggedIn = true;
        done(null, user.id);
});

passport.deserializeUser(function(id, done) {
        done(null, info[id]);
});

module.exports = function (app) {
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('cover.html');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/play',
        failureRedirect: '/'
}));

app.get('/profile', function(req, res) {
  res.send(req.user);  
});

app.get('/play', function(req, res) {
  if (loggedIn) {
  theName = req.user.name.givenName + "'s";
  theKeyword = req.user.name.givenName;
  }
  else {
    theName = "My";
  }
  res.render('index.html', {
    word: theKeyword,
    name: theName
  });
});

app.post('/play', function(req, res) {
        theKeyword = req.body.keyword;
        console.log(theKeyword);
        res.redirect ('/play');
});

app.use(express.static(path.join(__dirname, 'public')));


};