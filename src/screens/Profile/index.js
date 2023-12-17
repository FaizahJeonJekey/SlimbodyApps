import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {Setting2, Calendar,Clock,Timer1, WeightMeter, Reserve} from 'iconsax-react-native';
import React,{useState, useEffect, useRef} from 'react';
import FastImage from 'react-native-fast-image';
import {ProfileData, BlogList} from '../../../data';
import {ItemSmall} from '../../components';
import { fontType, colors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actions-sheet';
import { LineChart} from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native';

const formatNumber = number => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};




const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };
  useEffect(() => {
    const user = auth().currentUser;
    const fetchBlogData = () => {
      try {
        if (user) {
          const userId = user.uid;
          const blogCollection = firestore().collection('blog');
          const query = blogCollection.where('authorId', '==', userId);
          const unsubscribeBlog = query.onSnapshot(querySnapshot => {
            const blogs = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBlogData(blogs);
            setLoading(false);
          });

          return () => {
            unsubscribeBlog();
          };
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
              fetchBlogData();
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchBlogData();
    fetchProfileData();
  }, []);
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     firestore()
  //       .collection('blog')
  //       .onSnapshot(querySnapshot => {
  //         const blogs = [];
  //         querySnapshot.forEach(documentSnapshot => {
  //           blogs.push({
  //             ...documentSnapshot.data(),
  //             id: documentSnapshot.id,
  //           });
  //         });
  //         setBlogData(blogs);
  //       });
  //     setRefreshing(false);
  //   }, 1500);
  // }, []);
  const handleLogout = async () => {
    try {
      closeActionSheet();
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Reserve color={colors.black()} variant="Linear" size={24} />
        <Text style ={Profile.tag2}>MY PROFILE</Text>
        <TouchableOpacity onPress={openActionSheet}>
        <Setting2 color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
        }}>
        <View style={styles.item}>
        <View style={{gap: 1, alignItems: 'center'}}>
          <FastImage
            style={profile.pic}
            source={{
              uri: ProfileData?.profilePict,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{gap: 5, alignItems: 'center'}}>
            <Text style={profile.name}>{ProfileData?.name}</Text>
            <Text style={profile.info}>

            </Text>
          </View>

          <View style={{flexDirection: 'row', gap:60}}>
            <View style={{alignItems:'stretch', gap:5 }}>
            <Calendar size={20} color={colors.blue()} variant="Bold"/>
            <View style={{alignItems:'flex-start', gap:5 }}>
            <Text style={profile.tag}>{ProfileData?.HariPuasa} </Text>
              <Text style ={Profile.tag}>Hari Diet</Text>
            </View>
            </View>

            <View style={{alignItems:'stretch', gap:5 }}>
            <Clock size={20} color={colors.Orange()} variant="Bold"/>
            <View style={{alignItems:'flex-start', gap:5 }}>
            <Text style={profile.tag}>{ProfileData?.JamPuasa} </Text>
              <Text style ={Profile.tag}>Jam Puasa</Text>
            </View>
            </View>
            </View>

            <View style={{flexDirection: 'row', gap:30}}>
            <View style={{alignItems:'stretch', gap:5 }}>
            <WeightMeter size={20} color={colors.Red()} variant="Bold"/>
            <View style={{alignItems:'flex-start', gap:5 }}>
            <Text style={profile.tag}>{ProfileData?.berat} </Text>
              <Text style ={Profile.tag}>Berat Badan</Text>
            </View>
            </View>

            <View style={{alignItems:'stretch', gap:5 }}>
            <Timer1 size={20} color={colors.green()} variant="Bold"/>
            <View style={{alignItems:'flex-start', gap:5 }}>
            <Text style={profile.tag}>{ProfileData?.PuasaTerlama} </Text>
              <Text style ={Profile.tag}>Puasa Terlama</Text>
            </View>
            </View>
            
            </View>
            <TouchableOpacity style={profile.buttonEdit}>
            <Text style={profile.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 10, gap: 10}}>
          {/* {loading ? (
            <ActivityIndicator size={'large'} color={colors.blue()} />
          ) : (
            blogData.map((item, index) => <ItemSmall item={item} key={index} />)
          )} */}
        </View>
        </View>


     <View>
  <Text> Line Chart Diet</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
       datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={360} // from react-native
    height={300}
    yAxisLabel=""
    yAxisSuffix="h"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#7FFFD4",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 20
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 16,
      borderRadius: 10
    }}
  />

</View>  


      </ScrollView>
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
          onPress={handleLogout}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Log out
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

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.Aquamarine(0.2),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'space-between',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  item:{
    backgroundColor: colors.simple(0.50),
    flexDirection: '',
    borderRadius: 75, 
  },
  item2:{
    backgroundColor: colors.simple(0.10),
    flexDirection: 'row',
    borderRadius: 75, 
  },
});
const profile = StyleSheet.create({
  pic: {width: 100, height: 100, borderRadius: 50},
  name: {
    color: colors.black(),
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    textTransform:'capitalize'
  },
  info: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  sum: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
  tag: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.5),
  },
  tag2: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.grey(9),
  },
  buttonEdit: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.grey(0.1),
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
});