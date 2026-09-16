import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../styles/global'
import { AntDesign } from '@expo/vector-icons'

const ErrorBox = ({ message }) => {
  return (
    <View style={styles.container}>
      <AntDesign color={colors.PRIMARY_LIGHT_RED} name='warning' size={20} />
      <Text style={styles.msg}>{message}</Text>
    </View>
  )
}

export default ErrorBox

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SOFT_RED,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10
  },
  msg: {
    color: colors.PRIMARY_LIGHT_RED,
    fontWeight: '700',
    fontSize: 16
  }
})