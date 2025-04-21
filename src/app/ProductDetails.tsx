import React, { useRef } from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Alert,Share,ToastAndroid,Platform} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductDetailsParams = {
  name?: string;
  price?: string;
  description?: string;
  image?: string;
  id?: string;
};

const ProductDetails = () => {
  const params = useLocalSearchParams<ProductDetailsParams>();
  const router = useRouter();

  const modalizeRef = useRef<Modalize>(null);

  const name = typeof params.name === 'string' ? params.name : '';
  const price = typeof params.price === 'string' ? params.price : '';
  const description = typeof params.description === 'string' ? params.description : '';
  const image = typeof params.image === 'string' ? params.image : '';
  const id = typeof params.id === 'string' ? params.id : '';

  if (!name || !price || !description || !image) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar os detalhes do produto.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/HomeScreen')}
        >
          <Text style={styles.backText}>Voltar para a página inicial</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const handleAddToCart = async () => {
    const product = { id, name, price, image };

    try {
      const storedCart = await AsyncStorage.getItem('cartItems');
      const cart = storedCart ? JSON.parse(storedCart) : [];

      const updatedCart = [...cart, product];
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));

      if (Platform.OS === 'android') {
        ToastAndroid.show('Produto adicionado ao carrinho! 🛒', ToastAndroid.SHORT);
      } else {
        Alert.alert('Adicionado!', 'Produto adicionado ao carrinho! 🛒');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Confira este produto incrível!\n\n${name}\nPreço: ${price}\n\nDescrição: ${description}`,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o produto.');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅ Voltar</Text>
        </TouchableOpacity>

        <Image source={{ uri: image }} style={styles.image} />

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.descriptionTitle}>Descrição</Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
            <Text style={styles.buyButtonText}>🛒 Adicionar ao Carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>📤 Compartilhar</Text>
          </TouchableOpacity>
        </View>

        <Modalize ref={modalizeRef} adjustToContentHeight>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Informações de Compra</Text>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Esta opção foi movida para a tela de carrinho. Adicione produtos e finalize por lá. 🛍️
            </Text>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090033',
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
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
    marginTop: 60,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#DDD',
    marginTop: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 12,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#4B0082',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B0082',
  },
});

export default ProductDetails;
