import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';

import { APP_TIPS } from '../constants/Constants';
import { Actions as ProfileActions } from '../reducers/profile';
import Colors from '../constants/Colors';

// we will only have one instance of this class, and only use this for setState
let singletonInstance;



@connect(
  (state => ({ tipsState: state.profile.settings.tipsState })),
  (dispatch => ({
    hideTip: (tip) => dispatch(ProfileActions.setTip({ [tip]: false })),
  }))
)
export default class AppTips extends React.PureComponent {
  static showTip = (tip) => {
    singletonInstance && singletonInstance.setState({
      show: true,
      tip,
    })
  }
  

  constructor(props){
    super(props);

    if(singletonInstance) console.warn('You should not use this component more than once.');
    singletonInstance = this;
    this.state = {
      show: false,
      tip: '',
    }
  }

  render() {
    const { tip, show } = this.state;
    const { hideTip, tipsState, } = this.props;
    const textMessage = APP_TIPS[tip] ? APP_TIPS[tip][1] : '';
    const visible = show && tipsState[tip];
    console.log(show, tipsState.IOS_slideBack)

    return (
      <SnackBar
        visible={visible}
        textMessage={textMessage}
        actionText={"DON'T SHOW AGAIN"}
        actionHandler={() => {
          this.setState({ show: false });
          tip && hideTip(tip);
        }}
        
        actionTextWrapperStyle={{ maxWidth: 80 }}
        backgroundColor={Colors.dota_ui1}
        accentColor={Colors.goldenrod}
        messageColor={Colors.dota_white}
      />
    )
  }
}
