import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Icon } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen: React.FC = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
  });

  const handleRegister = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        email: values.email,
        criadoEm: new Date()
      });

      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado!',
        text2: 'Sua conta foi cadastrada com sucesso.',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });

      setTimeout(() => {
        router.push('/');
      }, 3500);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: error.message || 'Tente novamente.',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    
    <View style={styles.container}>
      
  <Image
          source={require('../../assets/img/logo.png')} // <-- Caminho local
          style={styles.logo}
          resizeMode="contain"
        />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Email"
              placeholderTextColor="#8E8E93"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              leftIcon={<Icon name="email" type="material" color="#365486" />}
              inputStyle={{ color: '#0B1F3A' }}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Input
              placeholder="Senha"
              placeholderTextColor="#8E8E93"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              leftIcon={<Icon name="lock" type="material" color="#365486" />}
              inputStyle={{ color: '#0B1F3A' }}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={isSubmitting}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Já tem uma conta?</Text>
        <Text style={styles.registerLink} onPress={() => router.push('/')}>
          Faça login
        </Text>
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
    color: '#0B1F3A',
    fontWeight: '600',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 12,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  error: {
    color: '#FF3B30',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#003A84',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8E8E93',
  },
  registerLink: {
    textAlign: 'center',
    fontSize: 16,
    color: '#0B1F3A',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  logo: {
  width: 250,
  height: 250,
  marginBottom: 20,
},

});

export default RegisterScreen;
