// EditProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const EditProfileScreen: React.FC = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraStatus.status !== 'granted' ||
        mediaStatus.status !== 'granted'
      ) {
        Alert.alert('Permissão necessária', 'Acesse as configurações para permitir câmera e galeria.');
      }
    })();
  }, []);

  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Nome é obrigatório'),
    email: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Email inválido'
      )
      .required('Email é obrigatório'),
  });

  const handleSave = async (values: { username: string; email: string }) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Usuário não autenticado');

      const userData = {
        nome: values.username,
        email: values.email,
        fotoUrl: imageUri || null,
      };

      await setDoc(doc(db, 'usuarios', uid), userData, { merge: true });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      router.replace('/ProfileScreen');
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" type="material" color="#FFF" />
      
      </TouchableOpacity>

      <Text style={styles.title}>Editar Perfil</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Icon name="camera-alt" type="material" color="#888" size={30} />
          <Text style={{ color: '#888' }}>Foto do perfil</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.smallButton} onPress={pickFromCamera}>
          <Text style={styles.smallButtonText}>Abrir Câmera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={pickFromGallery}>
          <Text style={styles.smallButtonText}>Galeria</Text>
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={{ username: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Nome"
              placeholderTextColor="#888"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              leftIcon={<Icon name="person" type="material" color="#888" />}
              inputStyle={{ color: '#0B1F3A', fontSize: 14 }}
              inputContainerStyle={{ height: 40, borderBottomWidth: 0 }} // <-- altura reduzida do campo
              containerStyle={[styles.inputWrapper, { height: 50 }]}      // <-- altura total controlada
            />

            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <Input
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              leftIcon={<Icon name="email" type="material" color="#888" />}
              inputStyle={{ color: '#0B1F3A', fontSize: 14 }}
              inputContainerStyle={{ height: 40, borderBottomWidth: 0 }}
              containerStyle={[styles.inputWrapper, { height: 50 }]}
            />

            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit as any} disabled={isSubmitting}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    paddingTop: 80,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    marginLeft: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
    color: '#0B1F3A',
    fontWeight: 'bold',
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    alignSelf: 'center',
  },
 buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  
},

smallButton: {
  flex: 1,
  backgroundColor: '#003A84',
  borderRadius: 20,
  paddingVertical: 10,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#D9D9D9',
  marginHorizontal: 5, 
},

smallButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
},
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 4,
    
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#003A84',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
