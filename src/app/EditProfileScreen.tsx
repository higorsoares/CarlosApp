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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    router.replace('/ProfileScreen');
  };

  return (
    <View style={styles.container}>
      {/* Botão Voltar estilizado */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name='arrow-back' type='material' color='#FFF' style={{ marginRight: 6 }} />
        <Text style={styles.backButtonText}>Voltar</Text>
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
              leftIcon={<Icon name='person' type='material' color='#888' />}
              inputStyle={{ color: '#000' }}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <Input
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              leftIcon={<Icon name='email' type='material' color='#888' />}
              inputStyle={{ color: '#000' }}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
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
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
    color: '#FFFFFF',
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4B0082',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    gap: 10,
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#4B0082',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    height: 50,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 12,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4B0082',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default EditProfileScreen;
