/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { API_BASE_URL } from '@env'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Text, View } from 'react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

const audioRecorderPlayer = new AudioRecorderPlayer()

const App = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordUri, setRecordUri] = useState('')
  const [transcribedTxt, setTranscribedTxt] = useState('')
  const [loading, setIsLoading] = useState(false)

  const startRecording = async () => {
    setIsLoading(false)
    try {
      const result = await audioRecorderPlayer.startRecorder()
      console.log(result)
      setIsRecording(true)
    } catch (error) {
      console.error(error)
    }
  }

  const stopRecording = async () => {
    setIsLoading(false)
    try {
      const result = await audioRecorderPlayer.stopRecorder()
      console.log(result)
      setIsRecording(false)
      setRecordUri(result)
    } catch (error) {
      console.error(error)
    }
  }

  const startPlaying = async () => {
    setIsLoading(false)
    try {
      const result = await audioRecorderPlayer.startPlayer()
      console.log(result)
      setIsPlaying(true)
    } catch (error) {
      console.error(error)
    }
  }

  const stopPlaying = async () => {
    setIsLoading(false)
    try {
      await audioRecorderPlayer.stopPlayer()
      setIsPlaying(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleTranscribing = async () => {
    try {
      if (isPlaying) {
        await stopPlaying()
      }

      if (!recordUri) {
        console.log('no record path')
        setIsRecording(false)
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      const formData = new FormData()
      formData.append('files', {
        uri: recordUri,
        type: 'audio/mp4',
        name: 'audioFile',
      })

      console.log('arquivo', formData)
      console.log(API_BASE_URL)

      const res = await axios({
        method: 'POST',
        url: API_BASE_URL + '/transcribe',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (!res.data || !res.data.results.length) {
        console.log('no transcription')
        setIsRecording(false)
        setIsLoading(false)
        return
      }

      const transcription = res.data.results[0].transcript
      console.log('result', transcription)

      setTranscribedTxt(transcription)
      setIsRecording(false)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button
        title={isPlaying ? 'Stop Playing' : 'Start Playing'}
        onPress={isPlaying ? stopPlaying : startPlaying}
      />
      <Button
        title={loading ? 'Transcribing...' : 'Transcribe'}
        disabled={loading}
        onPress={handleTranscribing}
      />

      {transcribedTxt && <Text>{transcribedTxt}</Text>}
    </View>
  )
}

export default App
