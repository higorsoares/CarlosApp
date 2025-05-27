import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Icon } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const Login: React.FC = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/HomeScreen');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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
              placeholder="Email"
              placeholderTextColor="#8E8E93"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              leftIcon={<Icon name='email' type='material' color='#365486' />}
              inputStyle={{ color: '#1C1C1E' }}
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
              leftIcon={<Icon name='lock' type='material' color='#365486' />}
              inputStyle={{ color: '#1C1C1E' }}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit as any} disabled={isSubmitting}>
              <Text style={styles.buttonText}>Entar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não possui conta?</Text>
        <Text style={styles.registerLink} onPress={() => router.push('/RegisterScreen')}>
          Clique aqui para se cadastrar
        </Text>
      </View>
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
});

export default Login;
