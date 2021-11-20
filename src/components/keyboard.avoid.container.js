import React from 'react'
import { View } from '@shoutem/ui'
import {
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native'
import { useKeyboardHeight } from '../hooks/keyboard.height.hooks'
import { scale } from '../styles/scaling'

export const KeyboardAvoidContainer = ({
  children,
  footer = () => null,
  style = {},
  scrollStyle = {},
  scrollEnabled = true,
  touchToDismiss = true
}) => {
  const dismissKeyboard = () => {
    if (touchToDismiss === true) {
      Keyboard.dismiss()
    }
  }
  const [keyboardHeight] = useKeyboardHeight()
  const maxFooterHeight = scale(100)

  return (
    <KeyboardAvoidingView
      style={[
        styles.avoider,
        style,
        {
          minHeight:
            Dimensions.get('window').height - keyboardHeight - maxFooterHeight
        }
      ]}
      onStartShouldSetResponder={dismissKeyboard}
      behavior={Platform.OS === 'iOS' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={0}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        bounces={false}
        scrollEnabled={scrollEnabled}
        style={[
          styles.scroll,
          scrollStyle,
          {
            maxHeight:
              Dimensions.get('window').height - keyboardHeight - maxFooterHeight
          }
        ]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      <View style={styles.footer}>{footer}</View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  avoider: {
    flexGrow: 1
  },
  footer: {
    width: '100%',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  scroll: {
    paddingHorizontal: scale(30)
  }
})
