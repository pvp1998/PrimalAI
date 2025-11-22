import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useAnalysis } from '@/context/AnalysisContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const exercises = [
  { id: '1', name: 'Handstand', icon: 'hand-right' },
  { id: '2', name: 'Muscle Up', icon: 'dumbbell' },
  { id: '3', name: 'Front Lever', icon: 'human-handsup' },
  { id: '4', name: 'Planche', icon: 'yoga' },
];

export default function Home() {
  const router = useRouter();
  const { history } = useAnalysis();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.light.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>Calisthenics AI</Text>
          <Text style={styles.title}>Primal AI</Text>
          <Text style={styles.subtitle}>Analyze your form in real-time</Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.light.primary }]}
          onPress={() => router.push('/loading')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>Analyze Exercise</Text>
        </TouchableOpacity>

        {/* Exercises Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Exercises</Text>
          <View style={styles.grid}>
            {exercises.map((exercise) => (
              <TouchableOpacity key={exercise.id} style={styles.exerciseCard} activeOpacity={0.7}>
                <MaterialCommunityIcons name={exercise.icon} size={40} color={Colors.light.primary} />
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Analysis */}
        {history.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Analysis</Text>
            {history.slice(0, 3).map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreText}>{item.score}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    marginTop: 16,
  },
  brand: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 32,
    gap: 12,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  exerciseCard: {
    width: '48%',
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  exerciseName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 8,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  scoreBox: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  scoreText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});
