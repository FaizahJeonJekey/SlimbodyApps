import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, ActivityIndicator} from 'react-native';
import React, {useState,  useRef, useEffect} from 'react';
import {ArrowLeft,HeartAdd, HeartRemove, Receipt21,  Share, More} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import { fontType, colors } from '../../theme';
import { formatNumber } from '../../../utils/formatNumber';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ActionSheet from 'react-native-actions-sheet';
// import axios from 'axios';



// const formatNumber = number => {
//   if (number >= 1000000000) {
//     return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
//   }
//   if (number >= 1000000) {
//     return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
//   }
//   if (number >= 1000) {
//     return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
//   }
//   return number.to();
// };
const BlogDetail = ({route}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });
  const {blogId} = route.params;
  const [iconStates, setIconStates] = useState({
    HeartAdd: {variant: 'Linear', color: colors.grey(0.9)},
    HeartRemove: {variant: 'Linear', color: colors.grey(0.9)},
    bookmarked: {variant: 'Linear', color: colors.grey(0.9)},
  });
  // const selectedBlog = BlogList.find(blog => blog.id === blogId);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet =() =>{
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('blog')
      .doc(blogId)
      .onSnapshot(documentSnapshot => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          console.log('Blog data: ', blogData);
          setSelectedBlog(blogData);
        } else {
          console.log(`Blog with ID ${blogId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [blogId]);


  // const getBlogById =async()=> {
  //   try{
  //     const response = await axios.get(
  //       `https://6579d9611acd268f9afa4094.mockapi.io/sliBody/blog/${blogId}`,
  //     );
  //     setSelectedBlog(response.data);
  //     setLoading(false);
  //   } catch (error){
  //     console.error(error);
  //   }
  // };

  const navigateEdit = () => {
    closeActionSheet()
    navigation.navigate('EditBlog', {blogId})
  }

  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('blog')
        .doc(blogId)
        .delete()
        .then(() => {
          console.log('Blog deleted!');
        });
      if (selectedBlog?.image) {
        const imageRef = storage().refFromURL(selectedBlog?.image);
        await imageRef.delete();
      }
      console.log('Blog deleted!');
      closeActionSheet();
      setSelectedBlog(null);
      setLoading(false)
      navigation.navigate('Bookmark');
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = async () => {
  //  await axios.delete(`https://6579d9611acd268f9afa4094.mockapi.io/sliBody/blog/${blogId}`)
  //     .then(() => {
  //       closeActionSheet()
  //       navigation.navigate('Bookmark');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  const navigation = useNavigation();
  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? colors.blue()
            : colors.grey(0.6),
      },
    }));
  };
  return (
    <View style={styles.container}>
      <Animated.View 
      style={[styles.header, {transform:[{translateY:headerY}]}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            color={colors.grey(0.9)}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <Share color={colors.grey(0.9)} variant="Linear" size={24} />
          <TouchableOpacity onPress={openActionSheet}>
          <More
            color={colors.grey(0.9)}
            variant="Linear"
            style={{transform: [{rotate: '90deg'}]}}
          />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color={colors.blue()} />
        </View>
      ) : (
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 62,
          paddingBottom: 54,
        }}>
        <FastImage
          style={styles.image}
          source={{
            uri: selectedBlog?.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}>
        </FastImage>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Text style={styles.category}>{selectedBlog?.category.name}</Text>
        </View>
        {/* <Text style={styles.title}>{selectedBlog?.title}</Text>
        <Text style={styles.content}>{selectedBlog?.content}</Text> */}
        <View style={styles.Icon}>
              <TouchableOpacity onPress={() => Icon('Liked')}>
                <HeartAdd color={colors.black()} variant={variant} size={20} />
              </TouchableOpacity>
        </View>
        <Text style={styles.title}>{selectedBlog?.title}</Text>
        <Text style={styles.text}>Read More</Text>
        <Text style={styles.content}>{selectedBlog?.content}</Text>
      </Animated.ScrollView>
      )}
      <Animated.View style={[styles.bottomBar,{transform:[{translateY:bottomBarY}]}]}>
        <Animated.View style={{flexDirection:'row', gap:15, alignItems:'center'}}>
          <TouchableOpacity onPress={() => toggleIcon('Liked')}>
            <HeartAdd
              color={iconStates.HeartAdd.color}
              variant={iconStates.HeartAdd.variant}
              size={24}
            />

          </TouchableOpacity>
          <Text style={styles.info}>
            {formatNumber(selectedBlog?.totalLike)}
          </Text>
          <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
        <HeartRemove
              color={iconStates.HeartRemove.color}
              variant={iconStates.HeartRemove.variant}
              size={24}
            />
        </TouchableOpacity>
        <Text style={styles.info}>
            {formatNumber(selectedBlog?.totalDislike)}
          </Text>
        </Animated.View>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Receipt21
            color={iconStates.bookmarked.color}
            variant={iconStates.bookmarked.variant}
            size={24}
          />
        </TouchableOpacity>
      </Animated.View>

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}
          >
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

    {/* </View>
  );
}; */}
export default BlogDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.simple(0.3),
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: colors.simple(0.3),
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    width: 'auto',
    borderRadius: 15,
  },
  info: {
    color: colors.grey(0.6),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  category: {
    color: colors.blue(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  date: {
    color: colors.grey(0.6),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginTop: 10,
    textAlign:'center',
    backgroundColor: colors.Aquamarine(0.5),
  },
  text: {
    backgroundColor:colors.grey(0.1),
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(0.8),
    textAlign:'justify',
    paddingHorizontal: 25,
    marginTop: 10,

 },
  Icon: {
  backgroundColor: colors.grey(0.45),
  padding: 5,
  borderColor: colors.white(),
  borderWidth: 5,
  borderRadius: 50,
  marginTop: 10,
    width:75,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 13,
    lineHeight: 15,
    marginTop: 5,
    textAlign:'justify',
    backgroundColor: colors.simple(0.3),
  },
});