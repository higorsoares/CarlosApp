import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements';

import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'produtos'));
        const produtosArray = [];
        querySnapshot.forEach((doc) => {
          produtosArray.push({ id: doc.id, ...doc.data() });
        });
        setProdutos(produtosArray);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4B0082" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.dismissAll();
            router.replace('/');
          }}
        >
          <Icon name="arrow-back" type="material" color="#FFF" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/ProfileScreen')}>
          <Text style={styles.buttonText}>Perfil</Text>
          <Icon name="account-circle" type="material" color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Produtos em Destaque</Text>

      <FlatList
        data={produtos}
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
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  description: item.description,
                  image: item.image,
                },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>R$ {item.price}</Text>
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
    backgroundColor: '#4B0082',
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
    marginVertical: 20,
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
    width: screenWidth / 2 - 20,
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
