import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function VideoAnalysis() {
  const router = useRouter();

  const keypoints = [
    {
      id: '1',
      name: 'Hand Alignment',
      status: 'perfect',
      description: 'Perfect shoulder-width spacing',
    },
    {
      id: '2',
      name: 'Core Engagement',
      status: 'good',
      description: 'Good tension, slight improvement possible',
    },
    {
      id: '3',
      name: 'Shoulder Stability',
      status: 'needs-work',
      description: 'Minor wobble detected at 0.8s mark',
    },
    {
      id: '4',
      name: 'Body Line',
      status: 'perfect',
      description: 'Excellent vertical alignment throughout',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'perfect':
        return Colors.light.success;
      case 'good':
        return '#f59e0b';
      case 'needs-work':
        return '#ef4444';
      default:
        return Colors.light.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'perfect':
        return 'check-circle';
      case 'good':
        return 'alert-circle';
      case 'needs-work':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.light.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Detailed Analysis</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Video Placeholder */}
        <View style={styles.videoPlaceholder}>
          <MaterialCommunityIcons name="video" size={64} color={Colors.light.primary} />
          <Text style={styles.videoText}>Video Breakdown</Text>
          <Text style={styles.videoSubtext}>Interactive analysis with keypoint tracking</Text>
        </View>

        {/* Key Points */}
        <Text style={styles.sectionTitle}>Performance Breakdown</Text>
        <View style={styles.keypointsList}>
          {keypoints.map((item) => (
            <View key={item.id} style={styles.keypointItem}>
              <View style={[styles.statusIcon, { borderColor: getStatusColor(item.status) }]}>
                <MaterialCommunityIcons
                  name={getStatusIcon(item.status)}
                  size={20}
                  color={getStatusColor(item.status)}
                />
              </View>
              <View style={styles.keypointContent}>
                <Text style={styles.keypointName}>{item.name}</Text>
                <Text style={styles.keypointDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Improvements */}
        <Text style={styles.sectionTitle}>Recommended Improvements</Text>
        <View style={styles.improvementsList}>
          <ImprovementCard
            title="Shoulder Stabilization"
            description="Practice with wall-assisted holds to build stabilizer strength"
            icon="target"
          />
          <ImprovementCard
            title="Wrist Conditioning"
            description="Wrist circles and pseudo-planche leans for better endurance"
            icon="dumbbell"
          />
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: Colors.light.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Save Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ImprovementCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <View style={styles.improvementCard}>
      <View style={styles.improvementIcon}>
        <MaterialCommunityIcons name={icon} size={24} color={Colors.light.primary} />
      </View>
      <View style={styles.improvementContent}>
        <Text style={styles.improvementTitle}>{title}</Text>
        <Text style={styles.improvementDescription}>{description}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.light.textSecondary} />
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  videoPlaceholder: {
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  videoText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 12,
  },
  videoSubtext: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  keypointsList: {
    marginBottom: 24,
    gap: 12,
  },
  keypointItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.light.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypointContent: {
    flex: 1,
  },
  keypointName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  keypointDescription: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  improvementsList: {
    marginBottom: 24,
    gap: 12,
  },
  improvementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.light.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  improvementIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  improvementContent: {
    flex: 1,
  },
  improvementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  improvementDescription: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.surface,
  },
  secondaryButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
