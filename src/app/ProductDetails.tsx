// ProductDetails.tsx
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
          <Icon name="arrow-back" type="material" color="#0B1F3A" />
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
          <Icon name="arrow-back" type="material" color="#FFFFFF" />

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
            <Text style={styles.price}>R$ {price}</Text>
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
              <Text style={styles.buyButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}> Compartilhar</Text>
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
    backgroundColor: '#F5F7FA',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  errorText: {
    color: '#0B1F3A',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#003A84',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    zIndex: 1,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '500',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3A',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  priceBox: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    color: '#0B1F3A',
    fontWeight: '600',
  },
  descriptionBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#0B1F3A',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#003A84',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#003A84',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B1F3A',
  },
});


export default ProductDetails;
