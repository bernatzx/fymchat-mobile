import { ActivityIndicator, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors, global } from '../../styles/global'
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import ErrorBox from '../../components/ErrorBox'

const Paraphraser = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const inputLenght = 300

  const handleParaphrase = async () => {
    if (!input.trim() || loading) return

    Keyboard.dismiss()

    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 5000))
      setResult(true)
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
    setError(null)
  }

  return (
    <View style={styles.container}>

      <View style={[styles.headerCard, global.shadow]}>
        <Entypo color={colors.PRIMARY_LIGHT_RED} style={[styles.headerIcon, global.shadow]} name='retweet' size={60} />
        <View>
          <Text style={styles.headerTitle}>Paraphraser</Text>
          <Text style={styles.headerSubtitle}>Rewrite and refine text</Text>
        </View>
      </View>


      <ScrollView style={{ flex: 1, marginBottom: 10 }} contentContainerStyle={{ gap: 14 }}>
        {/* ERROR */}
        {error && (
          <ErrorBox message={error} />
        )}

        <View style={[styles.outerCard, global.shadow]}>
          <View style={styles.inputCard}>
            {/* INPUT */}
            <TextInput
              placeholder='To rewrite text, enter text here and press "Paraphrase".'
              value={input}
              onChangeText={setInput}
              keyboardType='default'
              autoCapitalize='none'
              multiline
              maxLength={inputLenght}
              style={styles.inputField}
            />

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10
            }}>

              <Text style={styles.characterCount}>
                {input.length}/{inputLenght}
              </Text>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
              }}>
                <Pressable onPress={handleClear} style={styles.trashBtn}>
                  <Feather color={colors.TEXT_MUTED} size={24} name="trash" />
                </Pressable>

                <Pressable onPress={handleParaphrase} style={[styles.translateBtn, global.shadow]}>
                  {loading ? (
                    <ActivityIndicator color={colors.WHITE} />
                  ) : (
                    <>
                      <MaterialCommunityIcons color={colors.WHITE} size={20} name='shimmer' />
                      <Text style={{ fontSize: 20, fontWeight: '600', color: colors.WHITE }}>Paraphrase</Text>
                    </>
                  )}
                </Pressable>
              </View>

            </View>

            <View style={global.horizontalDivider}></View>
            {/* Result */}
            <View style={styles.result}>
              <Text style={styles.resultText}>
                {result}
              </Text>
            </View>

          </View>
        </View>
      </ScrollView>

    </View>
  )
}

export default Paraphraser

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
    backgroundColor: colors.SOFT_RED,
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
    height: 180,
    textAlignVertical: 'top',
    fontSize: 16,
    textAlign: 'justify'
  },
  characterCount: {
    fontSize: 14,
    textAlign: 'right',
    color: colors.TEXT_MUTED,
    fontWeight: '600'
  },
})