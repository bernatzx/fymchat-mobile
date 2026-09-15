import { StyleSheet } from "react-native";

export const colors = {
  SOFT_WHITE_GREEN: '#F7FBF7',
  MINT_GREEN: '#E3F6E7',
  PRIMARY_GREEN: '#64BF7B',
  PRIMARY_LIGHT_GREEN: '#DDF3E3',
  PRIMARY_DARK_GREEN: '#35A85D',
  TEXT_PRIMARY: '#1F2933',
  TEXT_SECONDARY: '#687684',
  TEXT_MUTED: '#9AA5B1',
  SOFT_RED: '#ffccbb',
  PRIMARY_LIGHT_RED: '#ff6c5c',
  WHITE: '#ffffff',
}

// export const fonts = {
//   PRIMARY: 'CaveatBrush',
//   SECONDARY: 'Kalam-Regular',
//   BOLD: 'Kalam-Bold'
// }

export const global = StyleSheet.create({
  shadow: {
    shadowColor: "#888",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
  }
})