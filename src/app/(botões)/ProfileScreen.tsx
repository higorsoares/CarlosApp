// ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const userProfileImage = require('../../../assets/profile/perfil.png');

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{ nome?: string; email?: string; fotoUrl?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const fetchData = async () => {
      const docRef = doc(db, 'usuarios', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data() as any);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0B1F3A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/HomeScreen')}>
        <Icon name="arrow-back" type="material" color="#FFFFFF" style={{ marginRight: 6 }} />
        
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={userData?.fotoUrl ? { uri: userData.fotoUrl } : userProfileImage}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userData?.nome || 'Nome não definido'}</Text>
        <Text style={styles.userEmail}>{userData?.email || 'Email não disponível'}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => router.push('/EditProfileScreen')}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
        <Icon name="edit" type="material" color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#003A84',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    zIndex: 1,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3A',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#365486',
    textAlign: 'center',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#003A84',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: 40,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default ProfileScreen;
