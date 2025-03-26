import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type ProductDetailsParams = {
  name: string;
  price: string;
  description: string;
  image: string;
};

const ProductDetails = () => {
  const { name, price, description, image } = useLocalSearchParams<ProductDetailsParams>();
  const router = useRouter();

  if (!name || !price || !description || !image) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#FFF', fontSize: 18 }}>Erro ao carregar os detalhes do produto.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/HomeScreen')} // Volta para a página inicial
        >
          <Text style={styles.backText}>Voltar para a página inicial</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão no canto superior esquerdo */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/HomeScreen')} // Volta para a HomeScreen
      >
        <Text style={styles.backText}>⬅ Voltar</Text>
      </TouchableOpacity>

      {/* Conteúdo principal */}
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090033',
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute', // Para posicionar no canto
    top: 20, // Distância do topo
    left: 10, // Distância da esquerda
    padding: 10,
    backgroundColor: '#4B0082',
    borderRadius: 5,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 60, // Para que a imagem não fique sobre o botão
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  price: {
    fontSize: 20,
    color: '#DDD',
  },
  description: {
    fontSize: 16,
    color: '#DDD',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ProductDetails;