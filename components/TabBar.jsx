import { View, Text, StyleSheet } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { colors } from '../styles/global';

export function TabBar({ state, descriptors, navigation }) {
  const { buildHref } = useLinkBuilder();
  const icons = {
    grammar: (props) => <MaterialIcons name='spellcheck' size={26} {...props} />,
    translator: (props) => <MaterialIcons name='translate' size={26} {...props} />,
    paraphraser: (props) => <Entypo name='retweet' size={26} {...props} />
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.TabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItems}
          >
            {
              icons[route.name]?.({
                color: isFocused ? colors.PRIMARY_DARK_GREEN : colors.TEXT_MUTED
              })
            }
            <Text style={{
              color: isFocused
                ? colors.PRIMARY_DARK_GREEN
                : colors.TEXT_MUTED,
              fontSize: 14,
              fontWeight: 'bold'
            }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 8,
    borderTopColor: colors.TEXT_MUTED,
    borderTopWidth: 1
  },
  tabItems: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 6
  }
})