import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import React  ,{useState,useCallback,useEffect} from 'react';

import {Add, Edit} from 'iconsax-react-native';
import {BlogList} from '../../../data';
import {ItemSmall } from '../../components';
import { fontType, colors } from '../../theme';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
// import axios from 'axios';
import { RefreshControl } from 'react-native-gesture-handler';

// const listBlog = () => {
//     const horizontalData = BlogList.slice(5);}


const Bookmark = () => {
    // const horizontalData = BlogList.slice(5);
    // const navigation = useNavigation();

    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [blogData, setBlogData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

      useEffect(() => {
        const subscriber = firestore()
          .collection('blog')
          .onSnapshot(querySnapshot => {
            const blogs = [];
            querySnapshot.forEach(documentSnapshot => {
              blogs.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setBlogData(blogs);
            setLoading(false);
          });
        return () => subscriber();
        },[]);

      // const getDataBlog = async () => {
      // try {
      //   const response = await axios.get(
      //     'https://6579d9611acd268f9afa4094.mockapi.io/sliBody/blog',
      //   );
      //   setBlogData(response.data);
      //   setLoading(false)
      // } catch (error) {
      //     console.error(error);
      // }
    // };
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        firestore()
        .collection('blog')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);

    //     getDataBlog()
    //     setRefreshing(false);
    //   }, 1500);
    // }, []);
  
    // useFocusEffect(
    //   useCallback(() => {
    //     getDataBlog();
    //   }, [])
    // );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Program</Text>
        <Add color={colors.black()} variant="Linear" size={25} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:24, gap:10, paddingVertical:10}}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }>
            
            <View style={{paddingVertical: 10, gap: 10}}>
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.blue()} />
          ) : (
            blogData.map((item, index) => <ItemSmall item={item} key={index} />)
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddBlog')}>
        <Edit color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
};
  
        {/* <ListHorizontal data={horizontalData}/>
        {BlogList.map((item, index) => (
          <ItemBookmark item={item} key={index} />
        ))} */}
        {/* </View>

      </ScrollView>
      <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate("AddBlog")}
      >
        <Edit color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
}; */}

export default Bookmark;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.Aquamarine(0.5),
  },
  header: {
    paddingHorizontal: 130,
    gap: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
    letterSpacing: -0.25,
  },
  floatingButton: {
    backgroundColor: colors.grey(0.7),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.grey(0.5),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});