import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { AnalysisProvider } from '@/context/AnalysisContext';

export default function RootLayout() {
  return (
    <AnalysisProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: Colors.light.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Primal AI' }} />
        <Stack.Screen
          name="results"
          options={{
            title: 'Results',
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="loading"
          options={{
            title: 'Analyzing',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="video-analysis"
          options={{
            title: 'Video Breakdown',
            animationEnabled: true,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </AnalysisProvider>
  );
}
