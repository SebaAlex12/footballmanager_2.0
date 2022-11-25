// Match Model
const Match = require("./models/Match");
// import matches from './mecze';
const matches = require('./mecze');

const importMatches = async() => {
    
    // const matches = JSON.parse(req.body.imports);
    // console.log('matches',matches);

    const response = await Match.remove({});

    if(response){

        console.log('match finals are removed');

      matches.forEach( item = async(item) => {
  
        // explode item line
        const elements = item["line"].split(";");
  
        // there is two hours shifting
        const dateFormat = moment(
          `${elements[0]} ${elements[2]}`,
          "YYYY-MM-DD HH:mm:ss"
        ).add(2, 'hours').format();
  
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
        // console.log(newMatch);
        // const response = await newMatch
        //   .save()
        //   .then(match => res.json(match))
        //   .catch(err => res.status(400).json({ matchnotadd: "matchnotadd" }));
  
      });

    }
  }

  module.exports = {
    importMatches
  }