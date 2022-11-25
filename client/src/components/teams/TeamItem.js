import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTeam } from "../../actions/teamActions";
import TeamFormEdit from "./TeamFormEdit";

class TeamItem extends Component {
  onDeleteClick(id) {
    this.props.deleteTeam(id);
  }

  onEditClick(id) {
    console.log(id);
  }

  render() {
    const { team } = this.props;
    const countryName = team.country.split("_")[0];
    const countrySufix = team.country.split("_")[1];

    return (
      <div className="card card-body mb-3 team-item-box">
        <TeamFormEdit team={team} />
        <div className="row">
          <div className="col-md-3 text-center">
            <img className="" src={`img/flags/${countrySufix}.jpg`} alt="" />
            <br />
            <p className="text-center">{countryName}</p>
          </div>
          <div className="col-md-9">
            <p className="lead">{team.info}</p>
            <button
              onClick={this.onDeleteClick.bind(this, team._id)}
              type="button"
              className="btn btn-danger mr-1 float-right"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TeamItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteTeam }
)(TeamItem);
