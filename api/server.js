const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const matches = require("./routes/api/matches");
const teams = require("./routes/api/teams");

// Match Model
const Match = require("./models/Match");
const match_finals = require("./routes/api/match_finals");
const moment = require("moment");

// MatchFinal Model
const MatchFinal = require("./models/MatchFinal");

// data to remove
// const importMatches = require('./ImportMatches');
// importMatches();

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config

require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));

// Use Routes
app.use("/api/users", users);
app.use("/api/matches", matches);
app.use("/api/teams", teams);
app.use("/api/match_finals", match_finals);

// serv assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


// remove only for imports

const import_matches = [
  {

    "line": "2022-11-25;Walia;11:00;Iran"

  },

{

    "line": "2022-11-25;Senegal;14:00;Katar"

  },

{

    "line": "2022-11-25;Holandia;17:00;Ekwador"

  },

{

    "line": "2022-11-25;Anglia;20:00;USA"

  },

{

    "line": "2022-11-26;Tunezja;11:00;Austria"

  },

{

    "line": "2022-11-26;Polska;14:00;Arabia Saudyjska"

  },

{

    "line": "2022-11-26;Francja;17:00;Dania"

  },

{

    "line": "2022-11-26;Argentyna;20:00;Meksyk"

  },

{

    "line": "2022-11-27;Japonia;11:00;Kostaryka"

  },

{

    "line": "2022-11-27;Belgia;14:00;Maroko"

  },

{

    "line": "2022-11-27;Chorwacja;17:00;Kanada"

  },

{

    "line": "2022-11-27;Hiszpania;20:00;Niemcy"

  },

{

    "line": "2022-11-28;Kamerun;11:00;Serbia"

  },

{

    "line": "2022-11-28;Korea;14:00;Ghana"

  },

{

    "line": "2022-11-28;Brazylia;17:00;Szwajcaria"

  },

{

    "line": "2022-11-28;Portugalia;20:00;Urugwaj"

  },

{

    "line": "2022-11-29;Ekwador;16:00;Senegal"

  },

{

    "line": "2022-11-29;Holandia;16:00;Katar"

  },

{

    "line": "2022-11-29;Iran;20:00;USA"

  },

{

    "line": "2022-11-29;Walia;20:00;Anglia"

  },

{

    "line": "2022-11-30;Australia;16:00;Dania"

  },

{

    "line": "2022-11-30;Tunezja;16:00;Francja"

  },

{

    "line": "2022-11-30;Polska;20:00;Argentyna"

  },

{

    "line": "2022-11-30;Arabia Saudyjska;20:00;Meksyk"

  },

{

    "line": "2022-12-01;Kanada;16:00;Maroko"

  },

{

    "line": "2022-12-01;Chorwacja;16:00;Belgia"

  },

{

    "line": "2022-12-01;Kostaryka;20:00;Niemcy"

  },

{

    "line": "2022-12-01;Japonia;20:00;Hiszpania"

  },

{

    "line": "2022-12-02;Ghana;16:00;Urugwaj"

  },

{

    "line": "2022-12-02;Korea;16:00;Portugalia"

  },

{

    "line": "2022-12-02;Brazylia;20:00;Kamerun"

  },

{

    "line": "2022-12-02;Serbia;20:00;Szwajcaria"

  },
];


const importMatchesBlokadaZdjacWRaziePotrzeby = async() => {

  const response = await Match.remove({});

  if(response){

    import_matches.forEach( item = async(item) => {

      // explode item line
      const elements = item["line"].split(";");

      // there is two hours summer one ouhr winter shifting
      const dateFormat = moment(
        `${elements[0]} ${elements[2]}`,
        "YYYY-MM-DD HH:mm:ss"
      ).add(1, 'hours').format();

      const newMatch = new Match({
        firstTeamName: elements[1],
        secondTeamName: elements[3],
        firstTeamFirstHalfGoals:0,
        firstTeamSecondHalfGoals:0,
        firstTeamOvertimeGoals:0,
        secondTeamFirstHalfGoals:0,
        secondTeamSecondHalfGoals:0,
        secondTeamOvertimeGoals:0,
        date: dateFormat,
        disabled: 0,
        closed: 0
      });

      await newMatch
        .save()
        .then(match => console.log('added match',match))
        .catch(err => console.log('error',err));

    });

  }

  
}

// importMatches();