import { Colors } from '@/constants/Colors'
import { useAuth } from '@/configs/AuthContext'
import { useRouter } from 'expo-router'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const Profile = () => {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut()
              router.replace('/')
            } catch (error) {
              console.error('Sign out error:', error)
            }
          }
        }
      ]
    )
  }

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Personal Information', onPress: () => {} },
        { icon: 'lock-closed-outline', label: 'Privacy & Security', onPress: () => {} },
        { icon: 'card-outline', label: 'Payment Methods', onPress: () => {} },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'notifications-outline', label: 'Notifications', onPress: () => {} },
        { icon: 'language-outline', label: 'Language', onPress: () => {} },
        { icon: 'moon-outline', label: 'Dark Mode', onPress: () => {} },
      ]
    },
    {
      title: 'Travel',
      items: [
        { icon: 'bookmark-outline', label: 'Saved Places', onPress: () => {} },
        { icon: 'time-outline', label: 'Trip History', onPress: () => router.push('/MyTrip') },
        { icon: 'heart-outline', label: 'Favorites', onPress: () => {} },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => {} },
        { icon: 'information-circle-outline', label: 'About', onPress: () => {} },
        { icon: 'document-text-outline', label: 'Terms & Privacy', onPress: () => {} },
      ]
    }
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color={Colors.primary} />
              </View>
            )}
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.displayName || 'Travel Explorer'}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Profile Sections */}
      {profileSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>

          {section.items.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.settingItem,
                index === section.items.length - 1 && styles.settingItemLast
              ]}
              onPress={item.onPress}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Ionicons name={item.icon as any} size={22} color={Colors.primary} />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Sign Out Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <View style={styles.settingLeft}>
            <View style={styles.signOutIconContainer}>
              <Ionicons name="log-out-outline" size={22} color="#ff4757" />
            </View>
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>AI Travel Planner v1.0.0</Text>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: Colors.white,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: Colors.primary + '30',
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#2d3436',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.gray,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#2d3436',
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#2d3436',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  signOutIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff475715',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  signOutText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#ff4757',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  versionText: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: Colors.gray,
  },
})