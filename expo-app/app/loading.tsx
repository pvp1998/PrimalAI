import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Loading() {
  const router = useRouter();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    spin.start();

    const timer = setTimeout(() => {
      spin.stop();
      router.push('/results');
    }, 3000);

    return () => {
      clearTimeout(timer);
      spin.stop();
    };
  }, []);

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.light.background }]}>
      <View style={styles.content}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spinAnimation }] }]}>
          <MaterialCommunityIcons name="loading" size={80} color={Colors.light.primary} />
        </Animated.View>
        <Text style={styles.title}>Analyzing Your Form</Text>
        <Text style={styles.subtitle}>This may take a few moments...</Text>
        <View style={styles.progressBars}>
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 32,
  },
  progressBars: {
    flexDirection: 'row',
    gap: 8,
  },
  progressBar: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
  },
});
