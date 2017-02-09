import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import GiveUpPopUp from './GiveUpPopUp';
import {connect} from 'react-redux';
import { unblock } from '../../background/reducers/block';
import { resetTime } from '../../background/reducers/time';
import { resetLastSteps, resetStreak } from '../../background/reducers/user';

import HourlyBlock from './HourlyBlock';
import TimeStepsBlock from './TimeStepsBlock';
import SleepBlock from './SleepBlock';

class BlockModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
    this.giveUpToggle = this.giveUpToggle.bind(this);
    // this.getSteps = this.getSteps.bind(this);
    this.unblock = this.unblock.bind(this);
  }

  unblock() {
    this.props.dispatch(unblock());
    this.props.dispatch(resetTime());
    this.props.dispatch(resetLastSteps());
    this.props.dispatch(resetStreak());
  }

  giveUpToggle(){
    this.setState({showPopup: this.state.showPopup ? false : true})
  }

  render(){
    return (
    <div id="block-overlay-container" className="block-cursor block-select block-overlay-container">
      <div id="block-overlay" className="block-cursor block-select block-overlay">
        <div id="block-info-container" className="block-cursor block-select block-info-container">
          <SleepBlock {...this.props} showPopup={this.state.showPopup} giveUpToggle={this.giveUpToggle} unblock={this.props.unblock}/>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.user && state.user.accessToken,
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    stepGoal: state.settings && state.settings.stepGoal,
    streak: state.user && state.user.streak
  };
};

export default connect(mapStateToProps)(BlockModal);

