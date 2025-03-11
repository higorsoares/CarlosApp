import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Importação necessária para navegação
import { Icon } from 'react-native-elements'; // Adicionando ícone

const cocaImage = require('C:\\Users\\Igor\\app-carlos\\assets\\img\\coca.png');
const salgadoImage = require('C:\\Users\\Igor\\app-carlos\\assets\\img\\cheetos.png');
const foneImage = require('C:\\Users\\Igor\\app-carlos\\assets\\img\\fone.png');

const products = [
  {
    id: '1',
    name: 'Coca-Cola',
    price: 'R$ 10,00',
    description: 'Coca-Cola 1L bem geladinha',
    image: cocaImage,
  },
  {
    id: '2',
    name: 'Cheetos',
    price: 'R$ 14,00',
    description: 'Salgadinho cheetos de 160g',
    image: salgadoImage,
  },
  {
    id: '3',
    name: 'Xtrad Anti Ruído',
    price: 'R$ 70,00',
    description: 'Fone de ouvido sem fio',
    image: foneImage,
  },
];

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <Icon name='arrow-back' type='material' color='#FFF' />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileButtonText}>Perfil</Text>
          <Icon name='account-circle' type='material' color='#FFF' />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090033',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 5,
  },
  profileButtonText: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  productContainer: {
    backgroundColor: '#4B0082',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  productPrice: {
    fontSize: 16,
    color: '#DDD',
  },
  productDescription: {
    fontSize: 16,
    color: '#DDD',
  },
});

export default HomeScreen;
