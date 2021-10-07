const express = require('express');
const { cloudinary } = require('./utils/cloudinary');
const fs = require('fs')
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('client-sessions');
const async = require('async')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();
const saltRounds = 10;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
//const db = mongoose.connection;

require("./models/candidate");
require("./models/question");
require("./models/user");
require('dotenv').config({ path: 'ENV_FILENAME' });
require('crypto').randomBytes(64).toString('hex');

// get config vars
dotenv.config();

// // access config var
// process.env.TOKEN_SECRET;

const Candidate = mongoose.model('candidate');
const Question = mongoose.model('question');
const User = mongoose.model('user');


const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));
app.use(fileUpload());
app.use(cors());
app.use(session({
  cookieName: 'session',
  secret: 'LRPgrd59zlZUDyjsXJDA',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//module for handling form data
const { default: Axios } = require('axios');
const user = require('./models/user');
var bodyParser = require('body-parser');
const { url } = require('inspector');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Get the token from Request headers
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


app.get('/candidates', (req, res) => { //Shows all the candidates
  Candidate.find({}, function (err, results) {
    res.send(results);
  });
});

app.post('/forms', (req, res) => { //Shows all the forms
  var filter = req.body.data;
  console.log('||' + filter + '||');
  Candidate.find({ school: { $eq: filter } }, function (err, results) {
    res.send(results);
  });
});

app.post('/suggested', (req, res) => { //Shows all the suggested candidates
  var userAnswer = req.body.data.answers;
  var filter = req.body.data.studentAssociation;

  Candidate.find({ studentAssociation: { $eq: filter } }, function (err, results) {
    var finalResults = [];
    for (var i = 0; i < results.length; i++) {
      var similarity = 0;
      var danger = 1;
      var candidateArray = [];

      for (var j = 0; j < Object.keys(results[i].filledForm).length / 2; j++) {

        if (userAnswer[j] === results[i].filledForm['question' + j]) { //Check for similarity
          similarity += 1;
        }

        candidateArray.push(results[i].filledForm['question' + j]); //Creating an array from filledForm integers

        if ((userAnswer[j] == 2 && results[i].filledForm['question' + j] == -2) || (userAnswer[j] == -2 && results[i].filledForm['question' + j] == 2)) {
          danger += 1; //Check for opposite answer
        }
      }
      let userSum = userAnswer.reduce((result, number) => result + number);
      let candSum = candidateArray.reduce((result, number) => result + number);

      if ((userSum >= (candSum * 0.50) || danger <= 0.25 * userAnswer.length) && similarity >= (0.30 * userAnswer.length)) {
        let copy = { ...results[i]._doc };
        copy["similarity"] = (similarity / userAnswer.length) * 100;
        finalResults.push(copy);
      }
    }
    let unique = [...new Set(finalResults)];
    res.send(unique);
  });
});

app.post('/filteredCandidates', (req, res) => { //Shows filtered andidates
  const filter = req.body.data;
  Candidate.find({ studentAssociation: filter }, function (err, results) {
    res.send(results);
  });
});

app.post('/Profile', (req, res) => {
  const email = req.body.email;
  Candidate.findOne({ email: email }, function (err, results) {
    if (err) {
      return res.status(500).send();
    }

    if (!results) {
      return res.status(404).send();
    }
    res.send(results);
  });
});

app.post('/questions', (req, res) => { //Form question and parse call
  const area = req.body.data;
  Question.find({ area: { $in: [area, 'Undefined'] } }, function (err, results) {
    res.send(results);
  });
});

//show all the questions
app.get('/allQuestions', (req, res) => {
  Question.find({}, function (err, results) {
    res.send(results);
  });
});

//show only filtered questions
app.post('/filteredQuestions', (req, res) => { //Shows filtered questions
  const filter = req.body.data;
  console.log('KYSYMYS FILTTERI')
  console.log(filter)
  Question.find({ area: filter }, function (err, results) {
    res.send(results);
  });
});

app.post('/submitQhuahoo', function (req, res) { //EDIT ONE EXISTING submitQhuahoo
  var question = req.body.data.question;
  var questionFin = req.body.data.questionFin;
  var questionSwe = req.body.data.questionSwe;
  var id = req.body.data.id;
  Question.findOneAndUpdate({ _id: id }, { $set: { question: question, questionFin: questionFin, questionSwe: questionSwe } }, { useFindAndModify: false }, function (err, doc) {
    res.send(doc)
  });
});

app.post('/editInformation', function (req, res) {
  let data = req.body.data;

  console.log(data);
  Candidate.findOneAndUpdate(
    { email: data.email },
    {
      $set:
      {
        name: data.name,
        surname: data.surname,
        school: data.school,
        description: data.description,
        studentAssociation: data.studentAssociation,
        campus: data.campus
      }
    },
    { useFindAndModify: false }, function (err, doc) {
    });
  res.sendStatus(200)
})

app.post('/deleteQhuahoo', function (req, res) { //DELETE ONE EXISTING Qhuahoo
  var id = req.body.id;
  Question.deleteOne({ _id: id }, function (err, doc) {
    res.send(doc)
  });

});

//------------------------------------------------
app.post('/fillForm', (req, res) => {
  var email = req.body.data;
  Candidate.findOne({ email: email }, function (err, results) {
    console.log('filled form');
    console.log(results.filledForm);
    res.send(results);
  });
});
//----------------------------------------

app.post('/registration', (req, res) => {

  const pass = req.body.password;

  bcrypt.hash(pass, saltRounds, function (err, hash) {

    var user = new User({
      email: req.body.email,
      password: hash,
      status: "Candidate",
    });
    Candidate.countDocuments({ email: req.body.email }, function (err, count) {
      if (count !== 0) {
        User.countDocuments({ email: req.body.email }, function (err, count) {
          if (count === 0) {
            user.save(function (err, user) {
              if (err) return //console.log(err);
              res.send("Succesfully added user to database!");
            });
          }
          else {
            res.send("Email with this address already exists as a user!");
          }
        });
      } else {
        res.send('You cannot register an account for email address that does not exist as a candidate!');
      }
    })
  });
});

app.post('/login', (req, res) => {

  var email = req.body.email;
  var pass = req.body.password;

  User.findOne({ email: email }, function (err, user) {
    if (!user) {
      res.send("User does not exist");
    }
    if (user) {
      bcrypt.compare(pass, user.password).then(function (result) {
        if (result) {
          req.session.user = user;
          console.log(req.session.user);

          const tokenUser = { email: user.email, status: user.status, school: user.school }
          const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 }) // CHANGE TO 60 FOR TESTING PURPOSES


          res.status(200).send({ token, tokenUser })
        }
        else {
          res.send("Invalid login");
        }
      });
    }
  });
});

app.get('/test', (req, res) => {
  if (req.session.user) {
    res.send("user logged in");
  }
  else {
    res.send("You're not Logged in");
  }
});

app.get('/logout', function (req, res) {
  req.session.reset();
  res.redirect('/');
});

app.post('/send', function (req, res) {
  var email = req.body.email;
  console.log(req.body)
  const token = getTokenFrom(req);
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
  } catch {
    res.send('Error!, TOKEN HAS EXPIRED OR IS INVALID')
  }

  console.log(email);
  for (var i = 0; i < req.body.ans.length; i++) {
    var nestedOpt = 'filledForm.question' + i;
    var nestedDesc = 'filledForm.questiondesc' + i;
    Candidate.findOneAndUpdate({ email: email }, { $set: { [nestedOpt]: req.body.ans[i], [nestedDesc]: req.body.desc[i] } }, { useFindAndModify: false }, function (err, doc) {
      console.log(doc);
    });
  }
  res.send('Everything is created succesfully')
});

app.post('/addCandidates', (req, res) => {
  //console.log(req)
  let emailArray = '';
  for (var i = 0; i < req.body.candidate.length - 1; i++) {
    var data = req.body.candidate[i].data;
    emailArray = req.body.candidate[i].data.email;
    addOneCandidate(data);
    console.log(emailArray);
  }
  res.sendStatus(200);
});

app.post('/addQuestion', (req, res) => {
  console.log(req.body);
  var question = new Question({
    question: req.body.question,
    questionFin: req.body.questionFin,
    questionSwe: req.body.questionSwe,
    area: req.body.area,
  });

  Question.countDocuments({ question: req.body.question, questionFin: req.body.questionFin, questionSwe: req.body.questionSwe }, function (err, count) {
    if (count == 0) {
      question.save(function (err, user) {
        if (err) {
          console.log(err)
        }
        res.send("Question saved");
        if (user) {
          console.log(user)
        }
        //console.log("Succesfully added question to database!");
      });
    }
    else {
      //console.log("question already exists!");
    }
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

//console.log('App is listening on port ' + port);

//Functions --------------------------------------------------------------------

function addOneCandidate(data) {
  let candidate = new Candidate({
    name: data.name,
    surname: data.surname,
    email: data.email,
    school: data.school,
    studentAssociation: data.studentAssociation,
    campus: data.campus,
    electoralDistrict: data.electoralDistrict,
    electoralAlliance: data.electoralAlliance,
    description: data.description,
    picture: data.picture,
    image: '/auto.png',
    filledForm: {
      question0: '',
      questiondesc0: '',
    },
  });

  Candidate.countDocuments({ email: data.email }, function (err, count) {
    if (count == 0) {
      candidate.save(function (err, user) {
        if (err) return err;
        if (user) {
          console.log(user)
        }
        console.log("Succesfully added candidate to database!");
        // enable this, when vaalikonealerts is not blocked
        // sending candidates or a candidate an email, when they are added to the database
        try {
          var transporter = nodemailer.createTransport({
            service: 'outlook365',
            port: 465,
            secure: true, // true for 465, false for other ports
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
              user: process.env.ADDRESS, // generated ethereal user
              pass: process.env.PASSWORD, // generated ethereal password 
            },
            tls: {
              rejectUnAuthorized: true
            }
          })

          var info = transporter.sendMail({
            from: 'vaalikone.alerts@outlook.com', // sender address
            to: user.email,
            subject: 'Tervetuloa käyttämään vaalikonetta', // Subject line 
            text: 'Sinut on lisätty nyt vaalikoneen tietokantaan. Voit käydä rekisteröitymässä.' // plain text body
          });
        }
        catch (error) {
          console.log(error)
        }
      });
    } else {
      console.log("Email with this address already exists as a candidate!");
    }
  });
}

async function editOneCandidate(data, variable, email) {
  //TODO: Remove Await because i think dont need to be async because this will return value when method return the value
  return Candidate.findOneAndUpdate({ email: email }, { $set: { [variable]: data } }, { useFindAndModify: false });
}

//----------alustaa kaikki kuvat
app.get('/initPictures', function (req, res) {
  Candidate.find({}, function (err, allCandidate) {
    allCandidate.forEach((oneCandidate) => {
      let id = oneCandidate._id;
      Question.find({
      }, function (err, cookie) {
        for (var i = 0; i < cookie.length; i++) {
          Candidate.findOneAndUpdate({ _id: id }, { $set: { image: '/auto.png' } }, { useFindAndModify: false }, function (err, doc) {
          });
        }
      });
    })
  });
  res.send("The pictures were updated!")
});

//------------------------- delete candidate
app.post('/deleteCandidate', function (req, res) { //DELETE ONE EXISTING candidate
  var deleteCandidate = req.body.deleteCandidateByEmail;
  Candidate.deleteOne({ email: deleteCandidate }, function (err, doc) {
    if (err) {
      return res.status(400).end()
    }
    res.status(200).end()
  });
  User.deleteOne({ email: deleteCandidate }, function (err, doc) {
    if (err) {
      return res.status(400).end()
    }
    res.status(200).end()
  });
});

//----------------------------------- add only one candidate
app.post('/addOneCandidate', (req, res) => {
  let data = req.body;
  let email = req.body.email;

  Candidate.countDocuments({ email: req.body.email }, function (err, count) {
    if (count === 0) {
      addOneCandidate(data)
      res.send("Succesfully added user to database!");
    }
    else {
      res.send("Email with this address already exists as a user!");
    }
  })
});

// Picture upload on cloudinary ------------------------------------
app.post('/api/uploadImage', async (req, res) => {
  const email = req.body.email;
  let returnValue;
  const candidate = Candidate.findOne({ email: email });
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dev_setups',
      public_id: req.body.fileName,
    }).then(function (data) {
      editOneCandidate(data.url, "image", email)
      returnValue = data.url;
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: 'Something went wrong' })
  }
  res.send(returnValue)
});
//----------------------------->