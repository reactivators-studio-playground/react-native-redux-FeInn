import React , { Component } from 'react';
import { Navigator , View , Text , Image , StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import Essence from '../page/Essence';
import * as EssenceActions from '../actions/EssenceActions';
import * as TabActions from '../actions/TabActions';
import { connect } from 'react-redux';
import navigationBar from './navigationBar'
import TabView from './tabview';
import * as Toast from '../components/Toast';
import connectComponent from '../utils/connectComponent';
const ToastPage = connectComponent(Toast)

class FeInnApp extends Component {
  constructor (props){
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.Utils.id !== nextProps.Utils.id){
        console.log(this.toast)
    }
	}

  render (){
    const { state , actions } = this.props;
    let defaultName = '精选';
    let defaultComponent = TabView;
    return (
      <Image
				style={styles.bg}>
        <Navigator
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.HorizontalSwipeJump;
            }}
            renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...this.props} {...route.params} navigator={navigator} />
            }}
        />
        <ToastPage ref={ (view)=> this.toast=view }/>
      </Image>
    )
  }
}


const styles = StyleSheet.create({
	bg: {
		flex: 1,
		// backgroundColor: 'transparent'
	}
});
export const LayoutComponent = FeInnApp;
export function mapStateToProps(state){
  return {
      Essence : state.Essence,
      Tab : state.Tab,
      Utils : state.Utils
  }
}
