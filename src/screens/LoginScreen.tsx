import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Icon } from 'react-native-elements';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (values.email.trim() === 'teste@teste.com' && values.password.trim() === '123456') {
      Alert.alert('Sucesso', 'Login realizado com sucesso');
      navigation.navigate('Home'); // Navegar para a tela Home
    } else {
      Alert.alert('Erro', 'Email ou senha incorreto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

            <Input
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              leftIcon={<Icon name='lock' type='material' color='#888' />}
              inputStyle={{ color: '#000' }}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputWrapper}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit as any} disabled={isSubmitting}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não possui conta?</Text>
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Clique aqui para se cadastrar
        </Text>
      </View>
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

export default LoginScreen;
