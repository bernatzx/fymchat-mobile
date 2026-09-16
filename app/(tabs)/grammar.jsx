import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState } from 'react'
import TabHeader from '../../components/TabHeader'
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { colors, global } from '../../styles/global'
import ErrorBox from '../../components/ErrorBox'

const Grammar = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputLength = 500;


  const handleCheck = async () => {
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


      {/* HEADER */}
      <View style={[styles.headerCard, global.shadow]}>
        <MaterialIcons color={colors.PRIMARY_DARK_GREEN} size={60} style={[styles.headerIcon, global.shadow]} name='spellcheck' />
        <View>
          <Text style={styles.headerTitle}>Grammar Checker</Text>
          <Text style={styles.headerSubtitle}>Fix spelling, grammar, punctuation</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, marginBottom: 10 }} contentContainerStyle={{ gap: 14 }}>


        {/* INPUT */}
        <View style={[styles.outerCard, global.shadow]}>
          <View style={styles.inputCard}>
            <TextInput
              placeholder="Let's write..."
              value={input}
              onChangeText={setInput}
              keyboardType='default'
              autoCapitalize='none'
              multiline
              maxLength={inputLength}
              style={styles.inputField}
            />
            <Text style={styles.characterCount}>
              {input.length}/{inputLength}
            </Text>
          </View>
        </View>

        {/* BUTTONs */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
          <Pressable onPress={handleClear} style={styles.trashBtn}>
            <Feather color={colors.TEXT_MUTED} size={24} name="trash" />
          </Pressable>
          <Pressable onPress={handleCheck} style={[styles.checkBtn, global.shadow]}>
            {loading ? (
              <ActivityIndicator color={colors.WHITE} />
            ) : (
              <>
                <MaterialCommunityIcons color={colors.WHITE} size={20} name='shimmer' />
                <Text style={{ fontSize: 20, fontWeight: '600', color: colors.WHITE }}>Check</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* RESULTs */}
        {result && (
          <View style={styles.result}>
            <View style={styles.resultsHead}>
              <Ionicons name='checkmark-done-sharp' color={colors.PRIMARY_DARK_GREEN} size={24} />
              <Text style={{
                fontWeight: 'bold',
                color: colors.PRIMARY_DARK_GREEN,
                fontSize: 18
              }}>Grammar corrections</Text>
            </View>
            <View style={styles.correction}>
              <Text style={{ fontWeight: '600', color: colors.TEXT_PRIMARY, textAlign: 'justify' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ad voluptatem aliquam aperiam repellat nulla a facere illum, possimus omnis quo, eius qui minima perferendis pariatur ut ratione ex recusandae.
              </Text>
            </View>
            <View style={styles.explanations}>
              <MaterialCommunityIcons color={colors.PRIMARY_LIGHT_RED} name='robot-outline' size={24} />
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: colors.PRIMARY_LIGHT_RED,
                  fontSize: 18
                }}>Why?</Text>
                <Text style={{
                  fontWeight: '600',
                  backgroundColor: colors.SOFT_RED,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  color: colors.PRIMARY_LIGHT_RED
                }}>
                  sdsads
                </Text>
              </View>
            </View>
          </View>
        )}

        {error && (
          <ErrorBox message={error} />
        )}


      </ScrollView>


    </View>
  )
}

export default Grammar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    gap: 14
  },
  result: {
    padding: 10,
    backgroundColor: colors.PRIMARY_LIGHT_GREEN,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY_GREEN,
    flexDirection: 'column',
    gap: 10,
    flex: 1
  },
  resultsHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  correction: {
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 10
  },
  explanations: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10
  },
  headerCard: {
    flexDirection: 'row',
    backgroundColor: colors.SOFT_WHITE_GREEN,
    padding: 10,
    borderRadius: 16,
    gap: 14
  },
  headerIcon: {
    backgroundColor: colors.MINT_GREEN,
    borderRadius: 60,
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
    height: 220,
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
  checkBtn: {
    backgroundColor: colors.PRIMARY_GREEN,
    borderColor: colors.PRIMARY_DARK_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 28,
    padding: 10,
    flex: 1
  }
})