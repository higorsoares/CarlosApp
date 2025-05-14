import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Share,
  ToastAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

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
          <Icon name="arrow-back" type="material" color="#FFF" style={{ marginRight: 6 }} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          <Icon name="arrow-back" type="material" color="#FFF" style={{ marginRight: 6 }} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.name}>{name}</Text>

          <View style={styles.imageBox}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.price}>{price}</Text>
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
              <Text style={styles.buyButtonText}>🛒 Adicionar ao Carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>📤 Compartilhar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  errorText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#4B0082',
    borderRadius: 8,
    zIndex: 1,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 60,
    marginBottom: 15,
    textAlign: 'center',
  },
  imageBox: {
    width: 220,
    height: 220,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4B0082',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#120048',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain', // <- adicione esta linha aqui
  },

priceBox: {
  width: 220,
  height:50,
  backgroundColor: '#120048',
  paddingVertical: 12,
  borderRadius: 15,
  borderWidth: 2,
  borderColor: '#4B0082',
  marginBottom: 20,
  justifyContent: 'center',
  alignItems: 'center',
},

  price: {
    fontSize: 20,
    color: '#DDD',
  },
  descriptionBox: {
    width: '100%',
    backgroundColor: '#120048',
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4B0082',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 12,
  },
  buyButton: {
    width: 160,
    height: 62,
    backgroundColor: '#4B0082',
    paddingVertical: 14,
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
    width: 160,
    height: 62,
    backgroundColor: '#4B0082',
    paddingVertical: 14,
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
