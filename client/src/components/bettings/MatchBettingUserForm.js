import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import TextFieldGroup from "../common/TextFieldGroup";
import { updateMatchBetting, updateMatch } from "../../actions/matchActions";

class MatchBettingUserForm extends Component {
  constructor(props) {
    super(props);

    const betting = props.match.bettings.filter(
      betting => betting.userId === props.auth.user.id
    );

    //  console.log(betting[0]);

    this.state = {
      matchId: props.match._id,
      bettingId: betting[0] ? betting[0]._id : null,
      firstTeamFirstHalfGoals: betting[0]
        ? betting[0].firstTeamFirstHalfGoals
        : null,
      firstTeamSecondHalfGoals: betting[0]
        ? betting[0].firstTeamSecondHalfGoals
        : null,
      firstTeamOvertimeGoals: betting[0]
        ? betting[0].firstTeamOvertimeGoals
        : null,
      secondTeamFirstHalfGoals: betting[0]
        ? betting[0].secondTeamFirstHalfGoals
        : null,
      secondTeamSecondHalfGoals: betting[0]
        ? betting[0].secondTeamSecondHalfGoals
        : null,
      secondTeamOvertimeGoals: betting[0]
        ? betting[0].secondTeamOvertimeGoals
        : null,
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: parseInt(e.target.value) });
  }

  onSubmit(e) {
    e.preventDefault();
    const { updateMatch } = this.props;
    const { match } = this.props;

    // if match has began already block it and dont allow to change betting
    // const currentTime = Date.now() / 1000;
    const currentTime = moment(new Date(),"YYYY-MM-DD HH:mm:ss").format();
    console.log("match date", match.date);
    console.log("current time", currentTime);
    // console.log("match",match);
    if (currentTime > match.date) {
        alert('Spotkanie się zaczęło albo już zakończyło - jest już za późno na obstawianie tego meczu :(');
        updateMatch({
          id:match._id,
          disabled:1
        });
    }else{
        const newBetting = {
          id: this.state.matchId,
          firstTeamFirstHalfGoals: this.state.firstTeamFirstHalfGoals,
          firstTeamSecondHalfGoals: this.state.firstTeamSecondHalfGoals,
          firstTeamOvertimeGoals: this.state.firstTeamSecondHalfGoals == this.state.secondTeamSecondHalfGoals ? this.state.firstTeamOvertimeGoals : null,
          secondTeamFirstHalfGoals: this.state.secondTeamFirstHalfGoals,
          secondTeamSecondHalfGoals: this.state.secondTeamSecondHalfGoals,
          secondTeamOvertimeGoals: this.state.firstTeamSecondHalfGoals == this.state.secondTeamSecondHalfGoals ? this.state.secondTeamOvertimeGoals : null
        };

       console.log("newBetting",newBetting);

        this.props.updateMatchBetting(newBetting);     
    }
  }

  render() {
    const { firstTeamSecondHalfGoals, secondTeamSecondHalfGoals, errors } = this.state;

    let overtimeContent = null;
    if(firstTeamSecondHalfGoals === secondTeamSecondHalfGoals){
      overtimeContent = (
        <div className="form-group">
                <label htmlFor="secondHalf">Dogrywka</label>
                <TextFieldGroup
                  placeholder="I drużyna"
                  name="firstTeamOvertimeGoals"
                  value={this.state.firstTeamOvertimeGoals}
                  onChange={this.onChange}
                  error={errors.firstTeamOvertimeGoals}
                />
                <TextFieldGroup
                  placeholder="II drużyna"
                  name="secondTeamOvertimeGoals"
                  value={this.state.secondTeamOvertimeGoals}
                  onChange={this.onChange}
                  error={errors.secondTeamOvertimeGoals}
                />
        </div>
      );
    }

    return (
      <div className="post-form mb-3 mt-3 betting-user-fom-box">
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstHalf">I połowa</label>
            <TextFieldGroup
              placeholder="I drużyna"
              name="firstTeamFirstHalfGoals"
              value={this.state.firstTeamFirstHalfGoals}
              onChange={this.onChange}
              error={errors.firstTeamFirstHalfGoals}
            />
            <TextFieldGroup
              placeholder="II drużyna"
              name="secondTeamFirstHalfGoals"
              value={this.state.secondTeamFirstHalfGoals}
              onChange={this.onChange}
              error={errors.secondTeamFirstHalfGoals}
            />
          </div>
          <div className="form-group">
            <label htmlFor="secondHalf">II połowa</label>
            <TextFieldGroup
              placeholder="I drużyna"
              name="firstTeamSecondHalfGoals"
              value={this.state.firstTeamSecondHalfGoals}
              onChange={this.onChange}
              error={errors.firstTeamSecondHalfGoals}
            />
            <TextFieldGroup
              placeholder="II drużyna"
              name="secondTeamSecondHalfGoals"
              value={this.state.secondTeamSecondHalfGoals}
              onChange={this.onChange}
              error={errors.secondTeamSecondHalfGoals}
            />
          </div>
          { overtimeContent }
          <button type="submit" className="btn ml-3 btn-dark float-right">
            Zapisz
          </button>
        </form>
      </div>
    );
  }
}

MatchBettingUserForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateMatchBetting, updateMatch }
)(MatchBettingUserForm);
