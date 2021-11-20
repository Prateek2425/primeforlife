import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { shadow } from '../styles/themes.styles'
import Logo from "./Logo"

const mainHeader = (showAvatar = false) => ({ navigation }) => ({
  headerStyle: {
    ...shadow,
    backgroundColor: '#FFFFFF00',
    shadowRadius: 2,
    shadowOpacity: 0.3
  },
  headerLeft: () => <View />,
  headerTitle: () => (<Logo/>),
  headerRight: () => ((showAvatar) ?
    <Avatar
      rounded
      size="small"
      source={{ uri: 'http://d3khwk27axmxnl.cloudfront.net/sasha.jpeg' }}
      title="NT"
      containerStyle={styles.avatarContainer}
      onPress={() => navigation.toggleDrawer()} /> :
    <View />)
})

const styles = StyleSheet.create({
  headerImage: {
    width: 35,
    height: 35,
  },
  avatarContainer: {
    paddingRight: 20,
    width: 50,
    height: 35
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 44,
    height: 44
  },
  logo: {
    alignItems: 'center',
    flex: 1,
  }
});

export default mainHeader;