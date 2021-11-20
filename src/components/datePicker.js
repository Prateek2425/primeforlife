import React, {useState} from 'react'
import {View, Text} from '@shoutem/ui'
import {TouchableOpacity, StyleSheet, Switch} from 'react-native'
import {shadow} from '../styles/themes.styles'
import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import DateTimePicker from '@react-native-community/datetimepicker'
let cDate = new Date()
let eDate = new Date()
cDate.setFullYear(cDate.getFullYear() - 18)
eDate.setFullYear(eDate.getFullYear() - 100)

const DatePicker = ({
  mode = 'date',
  title = '',
  onChange = () => {},
  value = '',
  style = {}
}) => {
  const [state, setState] = useState({
    choosing: false,
    selected: value
  })

  const onShowOptions = () => {
    setState({
      ...state,
      choosing: !state.choosing
    })
  }

  return (
    <View style={[styles.rowContainer, style]}>
      <TouchableOpacity activeOpacity={0.95} onPress={onShowOptions}>
        <View
          styleName="horizontal space-between v-center md-gutter-horizontal"
          style={state.choosing ? styles.openedborder : null}>
          {typeof title === 'string' ? (
            <Text style={{width: '60%'}}>{title}</Text>
          ) : (
            title
          )}
          {/* <Icon
            styleName="disclosure"
            name={state.choosing ? 'caretup' : 'caretdown'}
          /> */}
        </View>
      </TouchableOpacity>
      {state.choosing && (
        <View styleName="vertical" style={styles.dropdown}>
          <DateTimePicker
            textColor="black"
            style={styles.datePicker}
            value={value}
            mode={mode}
            maximumDate={cDate}
            minimumDate={eDate}
            is24Hour={false}
            display="spinner"
            onChange={onChange}
        />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
    datePicker:{
        fontSize: 10
    },
  options: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey'
  },
  half: {width: '50%'},
  quarter: {width: '20%'},
  third: {width: '33%'},
  toggleItem: {
    height: 60,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    flexDirection: 'row'
  },
  dropdown: {
    left: 0,
    // height: 120,
    width: '100%',
    // borderRadius: 5,
    // backgroundColor: 'white',

    zIndex: 1
  },
  rowContainer: {
    zIndex: 2,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
    marginHorizontal: 15,
    borderColor: '#777',
    ...shadow
  },
  title: {
    fontSize: 12
  }
})

export default DatePicker
