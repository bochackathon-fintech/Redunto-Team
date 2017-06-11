import React from 'react'
import {Scene, Router} from 'react-native-router-flux'
import {MaterialIcons as Icon} from '@expo/vector-icons'
import Welcome from './components/Welcome'
import Chat from './components/Chat'
import NavigationDrawer from './components/NavigationDrawer'
import TabIcon from './components/TabIcon'


const myIcon = (<Icon name="menu" size={26} color="#ff4d4d" style={{padding: 20}} />)
const closeIcon = (<Icon name="close" size={30} color="#939fb1" style={{padding: 10}} />)
const backIcon = (<Icon name="arrow-back" size={26} color="#939FB1" style={{padding: 20}} />)

const RouterComponent = (props) => {

  return (
    <Router sceneStyle={{paddingTop: 0, backgroundColor: '#eaecee', flex: 1}}
      navigationBarStyle={{borderBottomWidth: 0, backgroundColor: '#fff', borderColor: '#d4dcdf'}}
      drawerImage={myIcon}
      titleStyle={{fontSize: 21, color: '#939FB1'}}
      backTitle={backIcon}
      hideBackImage
    >
      <Scene key="main" component={NavigationDrawer} initial>
        <Scene key="tabbar"
          tabs
          tabBarStyle={{backgroundColor: '#fff', borderColor: '#d4dcdf', borderTopWidth: 1}}
        >
          <Scene key="tab1" title="dashboard" initial icon={TabIcon} iconName="home" >
            <Scene key="welcome"
              component={Welcome} initial
              navigationBarStyle={{borderBottomWidth: 0, backgroundColor: '#eaecee'}}
              
            />
          </Scene>
          <Scene key="tab2" title="dashboard" icon={TabIcon} iconName="chat" >
            <Scene key="chat"
              component={Chat}

              title="Ape"
              onLeft={() => console.log('eee')}

              leftTitle={closeIcon}
              style={{paddingTop: 65}}
            />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  )
}

export default RouterComponent
