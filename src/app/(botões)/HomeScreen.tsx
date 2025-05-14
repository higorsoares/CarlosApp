import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements';

const cocaImage = require('../../../assets/img/coca.png');
const salgadoImage = require('../../../assets/img/cheetos.png');
const foneImage = require('../../../assets/img/fone.png');
const watchImage = require('../../../assets/img/smartwatch.png'); // nova imagem

const products = [
  {
    id: '1',
    name: 'Coca-Cola',
    price: 'R$ 10,00',
    description: 'Coca-Cola 1L – Refrescância na medida certa!',
    image: cocaImage,
  },
  {
    id: '2',
    name: 'Cheetos',
    price: 'R$ 14,00',
    description: 'Salgadinho Cheetos 160g – Crocância e sabor que viciam!',
    image: salgadoImage,
  },
  {
    id: '3',
    name: 'Xtrad Anti Ruído',
    price: 'R$ 70,00',
    description: 'Fone de Ouvido Sem Fio Xtrad Anti Ruído – Imersão total no seu som!',
    image: foneImage,
  },
  {
    id: '4',
    name: 'Smartwatch FitBand',
    price: 'R$ 150,00',
    description: 'Smartwatch com monitoramento de saúde, passos, sono e mais!',
    image: watchImage,
  },
];

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => {
          router.dismissAll();
          router.replace('/');
        }}>
          <Icon name='arrow-back' type='material' color='#FFF' />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/ProfileScreen')}>
          <Text style={styles.buttonText}>Perfil</Text>
          <Icon name='account-circle' type='material' color='#FFF' />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Produtos em Destaque</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() =>
              router.push({
                pathname: '/ProductDetails',
                params: {
                  name: item.name,
                  price: item.price,
                  description: item.description,
                  image: Image.resolveAssetSource(item.image).uri,
                },
              })
            }
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
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
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#4B0082', // mesma cor dos cards
  },
  
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // espaçamento ajustado
    color: '#FFF',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productContainer: {
    backgroundColor: '#4B0082',
    borderRadius: 10,
    padding: 10,
    width: (screenWidth / 2) - 20,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#DDD',
  },
});

export default HomeScreen;
