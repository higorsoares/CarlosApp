import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements';

const userProfileImage = require('../../../assets/profile/perfil.png');

const ProfileScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/HomeScreen')}>
        <Icon name="arrow-back" type="material" color="#FFF" style={{ marginRight: 6 }} />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image source={userProfileImage} style={styles.profileImage} />
        <Text style={styles.userName}>Nome do Usuário</Text>
        <Text style={styles.userEmail}>usuario@example.com</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => router.push('/EditProfileScreen')}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
        <Icon name="edit" type="material" color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090033',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#4B0082',
    borderRadius: 8,
    zIndex: 1,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 18,
    color: '#DDD',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#4B0082',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 5,
  },
});

export default ProfileScreen;
