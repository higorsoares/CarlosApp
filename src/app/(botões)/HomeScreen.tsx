import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements';

const cocaImage = require('../../../assets\\img\\coca.png');
const salgadoImage = require('../../../assets\\img\\cheetos.png');
const foneImage = require('../../../assets\\img\\fone.png');

const products = [
  {
    id: '1',
    name: 'Coca-Cola',
    price: 'R$ 10,00',
    description: 'Coca-Cola 1L – Refrescância na medida certa!Nada como uma Coca-Cola 1 litro bem geladinha para matar a sede e transformar qualquer momento em uma ocasião especial. Com seu sabor inconfundível, borbulhas que renovam o paladar e aquele toque gelado que desce suave, ela é perfeita para compartilhar com amigos, acompanhar uma refeição ou simplesmente se refrescar no dia a dia. Abra, sinta o pssst e deixe o prazer começar!',
    image: cocaImage,
  },
  {
    id: '2',
    name: 'Cheetos',
    price: 'R$ 14,00',
    description: 'Salgadinho Cheetos 160g – Crocância e sabor que viciam! Com seu sabor irresistível e textura super crocante, o Cheetos de 160g é a escolha ideal pra quem ama um lanche cheio de personalidade. Seja no intervalo, na maratona de séries ou naquele rolê com os amigos, ele sempre cai bem. Cada mordida é uma explosão de sabor que faz você querer mais e mais. Abriu o pacote? É diversão garantida!',
    image: salgadoImage,
  },
  {
    id: '3',
    name: 'Xtrad Anti Ruído',
    price: 'R$ 70,00',
    description: 'Fone de Ouvido Sem Fio Xtrad Anti Ruído – Imersão total no seu som! Desfrute de uma experiência sonora incomparável com o Fone de Ouvido Sem Fio Xtrad com tecnologia anti-ruído. Projetado para quem busca qualidade, conforto e liberdade, ele bloqueia os ruídos externos para que você mergulhe de cabeça na sua música, podcasts ou chamadas. Com conexão estável via Bluetooth, design moderno e bateria de longa duração, ele é o parceiro ideal para o dia a dia, treinos ou viagens!',
    image: foneImage,
  },
];

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => { 
          router.dismissAll();
          router.replace('/');
        }}>
          <Icon name='arrow-back' type='material' color='#FFF' />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/ProfileScreen')}>
          <Text style={styles.profileButtonText}>Perfil</Text>
          <Icon name='account-circle' type='material' color='#FFF' />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Produtos</Text>
    <FlatList
  data={products}
  keyExtractor={(item) => item.id}
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
