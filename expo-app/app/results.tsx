import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useAnalysis } from '@/context/AnalysisContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Results() {
  const router = useRouter();
  const { addAnalysis } = useAnalysis();
  const [score, setScore] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 82) {
          clearInterval(interval);
          setTimeout(() => setShowContent(true), 300);
          addAnalysis({
            id: Date.now().toString(),
            title: 'Handstand Analysis',
            date: 'Just now',
            score: 82,
            skill: 'Handstand',
          });
          return 82;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showContent) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [showContent]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.light.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Calisthenics AI</Text>
            <Text style={styles.exerciseTitle}>Handstand</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="share-variant" size={20} color={Colors.light.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <MaterialCommunityIcons name="close" size={20} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Score */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreDisplay}>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>
          <View style={styles.ringContainer}>
            <View style={styles.ring}>
              <MaterialCommunityIcons name="trending-up" size={28} color={Colors.light.primary} />
            </View>
          </View>
        </View>

        {/* Badge */}
        {showContent && (
          <Animated.View style={[styles.badge, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Elite Form</Text>
          </Animated.View>
        )}

        {/* Stats Cards */}
        {showContent && (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <MaterialCommunityIcons name="trending-up" size={16} color="#16a34a" />
              </View>
              <Text style={styles.statLabel}>Improvement</Text>
              <Text style={styles.statValue}>+12%</Text>
              <Text style={styles.statSubtext}>vs last attempt</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <MaterialCommunityIcons name="people" size={16} color="#2563eb" />
              </View>
              <Text style={styles.statLabel}>Rank</Text>
              <Text style={styles.statValue}>72%</Text>
              <Text style={styles.statSubtext}>better than users</Text>
            </View>
          </View>
        )}

        {/* Breakdown Stats */}
        {showContent && (
          <View style={styles.breakdown}>
            <StatBar label="Technique" value={80} color="#3b82f6" />
            <StatBar label="Stability" value={75} color="#f59e0b" />
            <StatBar label="Alignment" value={85} color="#10b981" />
          </View>
        )}

        {/* Action Buttons */}
        {showContent && (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: Colors.light.primary }]}
              onPress={() => router.push('/video-analysis')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>View Full Analysis</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/video-analysis')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="play-circle" size={20} color={Colors.light.text} />
              <Text style={styles.secondaryButtonText}>Video Breakdown</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.statBarContainer}>
      <View style={styles.statBarLabel}>
        <View style={[styles.statBarIcon, { backgroundColor: color }]} />
        <Text style={styles.statBarText}>{label}</Text>
      </View>
      <Text style={styles.statBarValue}>{value}%</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingTop: 16,
  },
  brand: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  exerciseTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: '900',
    color: Colors.light.text,
    lineHeight: 80,
  },
  scoreMax: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
  ringContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.primary,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  statIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 11,
    color: Colors.light.textSecondary,
  },
  breakdown: {
    gap: 16,
    marginBottom: 24,
  },
  statBarContainer: {
    marginBottom: 12,
  },
  statBarLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statBarIcon: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  statBarText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statBarValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  barBackground: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  buttons: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
});
