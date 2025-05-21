import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
    // Cria usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    const user = userCredential.user;

    // Cria documento do usuário no Firestore
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
      <Text style={styles.title}>Cadastrar Conta</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              leftIcon={<Icon name="email" type="material" color="#888" />}
              inputStyle={{ color: '#000' }}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Input
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              leftIcon={<Icon name="lock" type="material" color="#888" />}
              inputStyle={{ color: '#000' }}
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
    backgroundColor: '#090033',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  registerLink: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
