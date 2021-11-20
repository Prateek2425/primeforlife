import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from '@shoutem/ui'
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image source={require('')} style={styles.headerImage} />
            <Text style={styles.primeLogo}>Prime For Life</Text>
          </View>
        </View>
        <Avatar
          rounded
          size="small"
          source={{uri:'http://d3khwk27axmxnl.cloudfront.net/sasha.jpeg'}}
          title="NT"
          containerStyle={styles.avatarContainer}
          onPress = {() => navigation.toggleDrawer()}
        />
      </View>

      <View style={styles.topBevelBar}></View>
    </View>
  );
};

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
    alignItems: 'stretch'
  },
  logo: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    paddingTop: '2%',
    backgroundColor: '#fff',
  },
  headerContent: {
    flexDirection: 'row',
    alignContent: 'space-between'

  },
  topBevelBar: {
        height: 6,
        width: '100%',
        backgroundColor: '#1034A6',
    },
    primeLogo: {
        fontSize: 10,
        color: '#1034A6',
    }
  });
 
export default AppHeader;