import { ActivityIndicator, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { colors, global } from '../../styles/global'
import { Picker } from '@react-native-picker/picker';
import ErrorBox from '../../components/ErrorBox'
import { translator } from '../../services/api';

const Translator = () => {
  const [input, setInput] = useState('')
  const [target, setTarget] = useState('english')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTranslate = async () => {
    if (!input.trim() || !target.trim() || loading) return

    Keyboard.dismiss()

    try {
      setLoading(true)
      setError("")
      setResult(null)
      const data = await translator(input, target)
      setResult(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    if (loading) return
    setInput('')
    setResult(null)
    setError("")
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={[styles.headerCard, global.shadow]}>
        <MaterialIcons color={colors.TEXT_SECONDARY} style={[styles.headerIcon, global.shadow]} name='translate' size={60} />
        <View>
          <Text style={styles.headerTitle}>Translator</Text>
          <Text style={styles.headerSubtitle}>Translate quickly and accurately</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>To:</Text>
        <View style={{
          borderWidth: 1,
          borderColor: colors.TEXT_SECONDARY,
          borderRadius: 10,
          paddingLeft: 10,
          flex: 1
        }}>
          <Picker
            selectedValue={target}
            onValueChange={(value) => setTarget(value)}
            style={{
              width: '100%',
              color: colors.TEXT_SECONDARY
            }}
          >
            <Picker.Item label="English" value="english" />
            <Picker.Item label="Indonesian" value="indonesian" />
          </Picker>
        </View>
        <Pressable style={styles.trashBtn} onPress={handleClear}>
          <Feather color={colors.TEXT_MUTED} size={24} name="trash" />
        </Pressable>
      </View>

      {/* ERROR */}
      {error && (
        <ErrorBox message={error} />
      )}

      <ScrollView style={{ flex: 1, marginBottom: 10 }} contentContainerStyle={{ gap: 14 }}>
        <View style={[styles.outerCard, global.shadow]}>
          <View style={styles.inputCard}>
            {/* INPUT */}
            <TextInput
              placeholder="Enter Text"
              value={input}
              onChangeText={setInput}
              keyboardType='default'
              autoCapitalize='none'
              multiline
              maxLength={500}
              style={styles.inputField}
            />
            <Text style={styles.characterCount}>
              {input.length}/500
            </Text>
            <View style={global.horizontalDivider}></View>

            {/* Result */}
            <View style={styles.result}>
              <Pressable onPress={handleTranslate} style={[styles.translateBtn, global.shadow]}>
                {loading ? (
                  <ActivityIndicator color={colors.WHITE} />
                ) : (
                  <>
                    <Feather color={colors.WHITE} size={20} name='arrow-right' />
                    <Text style={{ fontSize: 20, fontWeight: '600', color: colors.WHITE }}>Translate</Text>
                  </>
                )}
              </Pressable>
              <Text style={styles.resultText}>
                {result?.translated_text}
              </Text>
            </View>
          </View>
        </View>


      </ScrollView>
    </View>
  )
}

export default Translator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    position: 'relative',
    gap: 14
  },
  result: {
    flexDirection: 'column',
    paddingVertical: 10,
    flex: 1,
    minHeight: 200
  },
  resultText: {
    paddingTop: 10,
    fontSize: 18,
    textAlign: 'justify'
  },
  translateBtn: {
    backgroundColor: colors.PRIMARY_GREEN,
    borderColor: colors.PRIMARY_DARK_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 28,
    padding: 5
  },
  headerCard: {
    flexDirection: 'row',
    backgroundColor: colors.SOFT_WHITE_GREEN,
    padding: 10,
    borderRadius: 16,
    gap: 14
  },
  headerIcon: {
    backgroundColor: "#e7e7e7",
    borderRadius: 50,
    padding: 5
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.TEXT_PRIMARY
  },
  headerSubtitle: {
    color: colors.TEXT_SECONDARY
  },
  outerCard: {
    padding: 5,
    backgroundColor: colors.PRIMARY_LIGHT_GREEN,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY_GREEN
  },
  inputCard: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  inputField: {
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    textAlign: 'justify'
  },
  characterCount: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
    color: colors.TEXT_MUTED,
    fontWeight: '600'
  },
})