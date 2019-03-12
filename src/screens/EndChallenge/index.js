import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import Success from './Success';
import Failure from './Failure';
import sendRequest from '../../modules/sendRequest';

class EndChallenge extends React.Component {
  updateChallengeStateRequest = async state => {
    const { recentChallenge } = this.props;
    await sendRequest('put', '/api/challenges/updateChallengesState', null, {
      willState: state,
      challengesId: [recentChallenge.id],
    });
  };

  render() {
    const {
      recentChallenge,
      progress,
      refreshDashboard,
      handleIsFailure,
      isFailure,
      handleIsSuccess,
      isSuccess,
    } = this.props;

    return isSuccess || progress === 1 ? (
      <Success
        recentChallenge={recentChallenge}
        updateChallengeStateRequest={this.updateChallengeStateRequest}
        refreshDashboard={refreshDashboard}
        handleIsSuccess={handleIsSuccess}
        handleIsFailure={handleIsFailure}
      />
    ) : (
      <Failure
        recentChallenge={recentChallenge}
        updateChallengeStateRequest={this.updateChallengeStateRequest}
        refreshDashboard={refreshDashboard}
        handleIsFailure={handleIsFailure}
        isFailure={isFailure}
      />
    );
  }
}

EndChallenge.propTypes = {
  recentChallenge: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  progress: PropTypes.number.isRequired,
  refreshDashboard: PropTypes.func.isRequired,
  handleIsFailure: PropTypes.func.isRequired,
  isFailure: PropTypes.bool.isRequired,
  handleIsSuccess: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};

export default EndChallenge;
