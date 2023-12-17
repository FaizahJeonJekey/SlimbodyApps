// import React, {useState} from 'react';
// import {ScrollView, StyleSheet,  Text, View, FlatList, TouchableOpacity} from 'react-native';
// import { Crown } from 'iconsax-react-native';
// import { BlogList, CategoryList } from './data';
// import { fontType, colors } from './src/theme';
// import { ListHorizontal, ItemSmall } from './src/components';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
export default function App() {
  return (
    <NavigationContainer>
     <Router/>
    </NavigationContainer>
  );
}

// import * as React from 'react';
// import {Profile} from './src/screens';
// export default function App() {
//   return <Profile />;
// }


// import * as React from 'react';
// import {Bookmark} from './src/screens';
// export default function App() {
//   return <Bookmark />;
// }


// import * as React from 'react';
// import {Discover} from './src/screens';
// export default function App() {
//   return <Discover />;
// }

// const ItemCategory = ({item, onPress, color}) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View style={category.item}>
//         <Text style={{...category.title, color}}>{item.categoryName}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const FlatListCategory = () => {
//   const [selected, setSelected] = useState(1);
//   const renderItem = ({item}) => {
//     const color = item.id === selected ? colors.darkModeBlack() : colors.grey();
//     return (
//       <ItemCategory
//         item={item}
//         onPress={() => setSelected(item.id)}
//         color={color}
//       />
//     );
//   };
//   return (
//     <FlatList
//       data={CategoryList}
//       keyExtractor={item => item.id}
//       renderItem={item => renderItem({...item})}
//       ItemSeparatorComponent={() => <View style={{width: 10}} />}
//       contentContainerStyle={{paddingHorizontal: 10}}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       vertical
//       showsVerticalScrollIndicator={false}
//     />
//   );
// };

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}> Welcome SlimBody </Text>
//         <Crown color={colors.yellow(0.9)} variant="Bold" size={30} />
//       </View>
//       <View style={styles.listCategory}>
//         <FlatListCategory />
//       </View>
//       <ListBlog />
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}> Welcome SlimBody </Text>
//         <Crown color={colors.yellow(9)} variant="Outline" size={30} />
//       </View>
//       <View style={styles.listCategory}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View style={{...category.item, marginLeft: 24}}>
//             <Text style={{...category.title, color: colors.black()}}>
//               Yoga
//             </Text>
//           </View>
//           <View style={category.item}>
//             <Text style={category.title}>Pillates</Text>
//           </View>
//           <View style={category.item}>
//             <Text style={category.title}>Meditation</Text>
//           </View>
//           <View style={category.item}>
//             <Text style={category.title}>Nutrision</Text>
//           </View>
//         </ScrollView>
//       </View>
//       <ListBlog />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white(),
//   },
//   header: {
//     paddingHorizontal: 50,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height:52,
//     elevation: 8,
//     paddingTop:8,
//     paddingBottom:4
//   },
//   title: {
//     fontSize: 20,
//     fontFamily: fontType['Pjs-ExtraBold'],
//     color: colors.black(),
//   },
//   listCategory: {
//     paddingVertical: 10,
//   },
//   listBlog: {
//     paddingVertical: 10,
//     paddingHorizontal:15,
//     gap: 10,
//   },
// });
// const category = StyleSheet.create({
//   item: {
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 25,
//     alignItems: 'center',
//     backgroundColor: colors.simple(0.5),
//     marginHorizontal:5
//   },
//   title: {
//     fontFamily: fontType['Pjs-SemiBold'],
//     fontSize: 14,
//     lineHeight: 18,
//     color: colors.grey(0.9),
//   },
// })


// const ListBlog = () => {
//   const horizontalData = BlogList.slice(0, 5);
//   const verticalData = BlogList.slice(5,0);
//   const horizontalData1 = BlogList.slice(5,7);
//   const horizontal2 = BlogList.slice(6,12);
//   const horizontal3= BlogList.slice(12,16);

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <View style={styles.listBlog}>
//         {horizontalData1.map((item,index)=>(
//         <ListHorizontal item={item} key={index}/> ))}
//         <ListHorizontal data={horizontalData} />
//         <ListHorizontal data={horizontal2} />
//         <ListHorizontal data={horizontal3} />

//         <View style={styles.listCard}>

//         </View>
//       </View>


//     </ScrollView>





//   );
// };

// const ListBlog = () => {
//   return (
//     <ScrollView>
//       <View style={styles.listBlog}>
//         <ScrollView
//           showsHorizontalScrollIndicator={false}
//           horizontal
//           contentContainerStyle={{gap: 15}}>
//           <View style={{...itemHorizontal.cardItem, marginLeft: 5}}>
//             <ImageBackground
//               style={itemHorizontal.cardImage}
//               resizeMode="cover"
//               imageStyle={{borderRadius: 5}}
//               source={{
//                 uri: 'https://tse1.mm.bing.net/th?id=OIP.EqDn7JNwP-rij7CUbYTN4QHaFj&pid=Api&P=0&h=220',
//               }}>
//               <View style={itemHorizontal.cardContent}>
//                 <View style={itemHorizontal.cardInfo}>
//                   <Text style={itemHorizontal.cardTitle}>
//                     Weight Loss & PCOS Yoga + Diet
//                   </Text>
//                   <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
//                 </View>
//                 <View>
//                   <View style={itemHorizontal.cardIcon}>
//                     <Lovely color={colors.white()} variant="Linear" size={20} />
//                   </View>
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//           <View style={itemHorizontal.cardItem}>
//             <ImageBackground
//               style={itemHorizontal.cardImage}
//               resizeMode="cover"
//               imageStyle={{borderRadius: 5}}
//               source={{
//                 uri: 'https://tse3.mm.bing.net/th?id=OIP.lgR9Te4FU_2HO4c2eVdEbgHaEF&pid=Api&P=0&h=220',
//               }}>
//               <View style={itemHorizontal.cardContent}>
//                 <View style={itemHorizontal.cardInfo}>
//                   <Text style={itemHorizontal.cardTitle}>
//                     Idol Inspired Yoga Workout Pillates
//                   </Text>
//                   <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
//                 </View>
//                 <View>
//                   <View style={itemHorizontal.cardIcon}>
//                     <Lovely color={colors.white()} variant="Linear" size={20} />
//                   </View>
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//           <View style={itemHorizontal.cardItem}>
//             <ImageBackground
//               style={itemHorizontal.cardImage}
//               resizeMode="cover"
//               imageStyle={{borderRadius: 5}}
//               source={{
//                 uri: 'https://tse1.mm.bing.net/th?id=OIP.E-Rr8WRcQtY4wULtcgqYeAHaE8&pid=Api&P=0&h=220',
//               }}>
//               <View style={itemHorizontal.cardContent}>
//                 <View style={itemHorizontal.cardInfo}>
//                   <Text style={itemHorizontal.cardTitle}>
//                     From XL to M in 2 Weeks Challange
//                   </Text>
//                   <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
//                 </View>
//                 <View>
//                   <View style={itemHorizontal.cardIcon}>
//                     <Lovely color={colors.white()} variant="Linear" size={20} />
//                   </View>
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//           <View style={itemHorizontal.cardItem}>
//             <ImageBackground
//               style={itemHorizontal.cardImage}
//               resizeMode="cover"
//               imageStyle={{borderRadius: 5}}
//               source={{
//                 uri: 'https://www.carymagazine.com/wp-content/uploads/2015/12/best-yoga-header.jpg',
//               }}>
//               <View style={itemHorizontal.cardContent}>
//                 <View style={itemHorizontal.cardInfo}>
//                   <Text style={itemHorizontal.cardTitle}>
//                     Good For Detox,Cleansing,Metabolism.
//                   </Text>
//                   <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
//                 </View>
//                 <View>
//                   <View style={itemHorizontal.cardIcon}>
//                     <Lovely color={colors.white()} variant="Linear" size={20} />
//                   </View>
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//           <View style={{...itemHorizontal.cardItem, marginRight: 25}}>
//             <ImageBackground
//               style={itemHorizontal.cardImage}
//               resizeMode="cover"
//               imageStyle={{borderRadius: 5}}
//               source={{
//                 uri: 'https://www.jalyoga.com.sg/wp-content/uploads/2021/03/yoga-vs-pilates-01.jpg',
//               }}>
//               <View style={itemHorizontal.cardContent}>
//                 <View style={itemHorizontal.cardInfo}>
//                   <Text style={itemHorizontal.cardTitle}>
//                     Become Fleksible.Get Strong
//                   </Text>
//                   <Text style={itemHorizontal.cardText}>Nov 10, 2023</Text>
//                 </View>
//                 <View>
//                   <View style={itemHorizontal.cardIcon}>
//                     <Lovely color={colors.white()} variant="Linear" size={20} />
//                   </View>
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//          </ScrollView>
//         <View style={itemVertical.listCard}>
//           <View style={itemVertical.cardItem}>
//             <Image
//               style={itemVertical.cardImage}
//               source={{
//                 uri:  'https://tse3.mm.bing.net/th?id=OIP.ppoVFCTfDdgQCaqLHmLveAHaHa&pid=Api&P=0&h=220',
//                 }}
//             />
//             <View style={itemVertical.cardContent}>          
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                   <View style={{gap: 10, width: '90%'}}>
//                   <Text style={itemVertical.cardTitle}>
//                     Acclompished Pose
//                   </Text>
//                 </View>
//                 <Like1
//                   color={colors.black(0.8)}
//                   variant="Linear"
//                   size={20}
//                 />
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <Clock
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText}>30-60 Minutes</Text>
//               </View>
              
//               <View style={itemVertical.cardInfo}>
//                 <HeartAdd
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>300</Text>
//                 <HeartRemove
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>180</Text>
//               </View>

//             </View>
//           </View>
//           <View style={itemVertical.cardItem}>
//           <Image
//               style={itemVertical.cardImage}
//               source={{
//                 uri: 'https://pngimg.com/uploads/yoga/yoga_PNG143.png',
//               }}
//             />
//             <View style={itemVertical.cardContent}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                 <View style={{gap: 5, width: '90%'}}>
//                   <Text style={itemVertical.cardTitle}>
//                     Fat Burning With Yoga
//                   </Text>
//                 </View>
//                 <Like1
//                   color={colors.black(0.8)}
//                   variant="Linear"
//                   size={20}
//                 />
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <Clock
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText}>30-60 Minutes</Text>
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <HeartAdd
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>300</Text>
                
//                 <HeartRemove
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>180</Text>
//               </View>
//             </View>
//           </View>
//           <View style={itemVertical.cardItem}>
//             <Image
//               style={itemVertical.cardImage}
//               source={{
//                 uri: 'https://tse4.mm.bing.net/th?id=OIP.-At-45YKe22iQVKlbRlPJwHaHa&pid=Api&P=0&h=220',
//               }}
//             />
//             <View style={itemVertical.cardContent}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                 <View style={{gap: 5, width: '90%'}}>
//                   <Text style={itemVertical.cardTitle}>
//                     Yoga By Idol Kpop
//                   </Text>
//                 </View>
//                 <Like1
//                   color={colors.black(0.8)}
//                   variant="Linear"
//                   size={20}
//                 />
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <Clock
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText}>J30-60 Minutes</Text>
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <HeartAdd
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>300</Text>
                
//                 <HeartRemove
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>180</Text>
//               </View>
//             </View>
//           </View>
//           <View style={itemVertical.cardItem}>
//             <Image
//               style={itemVertical.cardImage}
//               source={{
//                 uri: 'https://i.pinimg.com/736x/20/aa/54/20aa5446ae666825baa189cef44e6f54.jpg',
//               }}
//             />
//             <View style={itemVertical.cardContent}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                 <View style={{gap: 5, width: '90%'}}>
//                   <Text style={itemVertical.cardTitle}>Flying Yoga</Text>
//                 </View>
//                 <Like1
//                   color={colors.black(0.8)}
//                   variant="Linear"
//                   size={20}
//                 />
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <Clock
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText}>30-60 Minutes</Text>
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <HeartAdd
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>300</Text>
                
//                 <HeartRemove
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>180</Text>
//               </View>
//             </View>
//           </View>
//           <View style={itemVertical.cardItem}>
//             <Image
//               style={itemVertical.cardImage}
//               source={{
//                 uri: 'https://tse2.mm.bing.net/th?id=OIP.wh8EMUlMRLhm5q6i7NSVuwHaNW&pid=Api&P=0&h=220',
//               }}
//             />
//             <View style={itemVertical.cardContent}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                 <View style={{gap: 5, width: '90%'}}>
//                   <Text style={itemVertical.cardTitle}>
//                     Daily Stretch
//                   </Text>
//                 </View>
//                 <Like1
//                   color={colors.black(0.8)}
//                   variant="Linear"
//                   size={20}
//                 />
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <Clock
//                   size={10}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText}>30-60 Minutes</Text>
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <HeartAdd
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>300</Text>
                
//                 <HeartRemove
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>180</Text>
//               </View>
//             </View>
//           </View>
//           <View style={itemVertical.cardItem}>
//             <Image
//               style={itemVertical.cardImage}
//               source={{
//                 uri: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
//               }}
//             />
//             <View style={itemVertical.cardContent}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                 <View style={{gap: 5, width: '90%'}}>
//                   <Text style={itemVertical.cardTitle}>
//                     Home Fitness Revolution
//                   </Text>
//                 </View>
//                 <Like1
//                   color={colors.black(0.8)}
//                   variant="Linear"
//                   size={20}
//                 />
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <Clock
//                   size={10}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText}>30-60 Minutes</Text>
//               </View>
//               <View style={itemVertical.cardInfo}>
//                 <HeartAdd
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>300</Text>
                
//                 <HeartRemove
//                   size={13}
//                   variant="Linear"
//                   color={colors.grey()}
//                 />
//                 <Text style={itemVertical.cardText2}>180</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const itemVertical = StyleSheet.create({
//   listCard: {
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     gap: 5,
//   },
//   cardItem: {
//     backgroundColor: colors.simple(0.95),
//     flexDirection: 'row',
//     borderRadius: 35,
//   },
//   cardCategory: {
//     color: colors.blue(),
//     fontSize: 10,
//     fontFamily: fontType['Pjs-SemiBold'],
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontFamily: fontType['Pjs-Bold'],
//     color: colors.black(),
//   },
//   cardText: {
//     fontSize: 10,
//     fontFamily: fontType['Pjs-Medium'],
//     color: colors.blue(0.9),
//   },
//   cardText2: {
//     fontSize: 10,
//     fontFamily: fontType['Pjs-Medium'],
//     color: colors.darkModeBlue(0.9),
//   },
//   cardImage: {
//     width: 125,
//     height: 150,
//     borderRadius: 35,
//     resizeMode: 'cover',
//   },
//   cardInfo: {
//     flexDirection: 'row',
//     gap: 5,
//     alignItems: 'center',
//   },
//   cardContent: {
//     gap: 5,
//     justifyContent: 'center',
//     paddingRight:10,
//     paddingLeft: 10,
//     flex: 1,
//     paddingVertical: 45,
//   },
// });
// const itemHorizontal = StyleSheet.create({
//   cardItem: {
//     width: 390,
//   },
//   cardImage: {
//     width: 390,
//     height: 200,
//     borderRadius: 5,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//   },
//   cardInfo: {
//     justifyContent: 'flex-end',
//     height: '100%',
//     gap: 5,
//     maxWidth: '100%',
//   },
//   cardTitle: {
//     fontFamily: fontType['Pjs-Bold'],
//     fontSize: 14,
//     color: colors.white(),
//     backgroundColor: colors.black(0.65),
//   },
//   cardText: {
//     fontSize: 10,
//     color: colors.white(),
//     fontFamily: fontType['Pjs-Medium'],
//     backgroundColor: colors.black(0.25),
//   },
//   cardIcon: {
//     backgroundColor: colors.grey(0.45),
//     padding: 5,
//     borderColor: colors.white(),
//     borderWidth: 0.5,
//     borderRadius: 5,
//   },
// });