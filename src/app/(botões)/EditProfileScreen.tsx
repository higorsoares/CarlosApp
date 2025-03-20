import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Icon } from 'react-native-elements';

const EditProfileScreen: React.FC = () => {
  const router = useRouter();

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
    router.replace('/ProfileScreen'); // Navegar de volta para a tela de Perfil
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name='arrow-back' type='material' color='#FFF' />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Editar Perfil</Text>
      
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
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
    color: '#FFFFFF',
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
