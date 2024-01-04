/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, Text, useColorScheme, View } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          width: '100%',
          marginTop: 'auto',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            width: '100%',

            textAlign: 'center',
          }}
        >
          hellow world
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default App
