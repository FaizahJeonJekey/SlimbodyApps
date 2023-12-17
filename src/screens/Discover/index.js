import {StyleSheet, Text, View, ScrollView, FlatList, Animated, TouchableWithoutFeedback} from 'react-native';
import React ,{useRef} from 'react';
import {BlogList} from '../../../data';
import {ItemSmall, ListHorizontal} from '../../components'; 
import {SearchNormal1,Microphone2} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const data = [
  {id: 1, label: 'Yoga'},
  {id: 2, label: 'Pillates Idol'},
  {id: 3, label: 'Challange Diet'},
  {id: 4, label: 'Diet Idol'},
  {id: 5, label: 'Workout'},
];

const ItemRecent = ({item}) => {
  return (
    <View style={recent.button}>
      <Text style={recent.label}>{item.label}</Text>
    </View>
  );
};
const FlatListRecent = () => {
  const renderItem = ({item}) => {
    return <ItemRecent item={item} />;
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width:5}} />}
      contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 5}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
const Discover = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 142);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 142],
    outputRange: [0, -142],
    extrapolate: 'clamp',
  });
  const recentBlog = BlogList.slice(0,5);
  const recentBlog1 = BlogList.slice(5,10);
  const recentBlog2 = BlogList.slice(11,17);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchPage")}>
        <View style={styles.bar}>
          <SearchNormal1 size={18} color={colors.grey()} variant="Linear" />
          <Text style={styles.placeholder}>Search</Text>
        </View>

      </TouchableWithoutFeedback>
      <Animated.View style={[recent.container, {transform: [{translateY: recentY}]}]}>
       <Text style={recent.text}>Recent Search</Text>
       <FlatListRecent />
      </Animated.View>  
      <Animated.ScrollView 
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}],
        {useNativeDriver: true},
      )}
      contentContainerStyle={{paddingTop: 75}}>
        <View style={styles.listCard}>
            <ListHorizontal data={recentBlog}/>
            <View style={styles.listCard}>
        <Text style={recent.text2}>Anything About Pillates </Text>
            <ListHorizontal data={recentBlog2}/>
          </View>
        <View style={styles.listCard}>
        <Text style={recent.text2}>Anything About Yoga </Text>
            <ListHorizontal data={recentBlog1}/>
            </View>
          {recentBlog.map((item, index) => (
            <ListHorizontal item={item} key={index} />
          ))}
        </View>
        </Animated.ScrollView>
        

    </View>
  );
};
export default Discover;
const styles = StyleSheet.create({
  listCard: {
    paddingHorizontal: 5,
    paddingBottom: 15,
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.simple(0.2),
  },
header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    paddingTop: 8,
    paddingBottom:4,
    position:'absolute',
    top:0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: colors.simple(0.5),
  },
  bar: {
    flexDirection: 'row',
    padding: 15,
    gap: 120,
    alignItems: 'center',
    backgroundColor: colors.grey(0.1),
    borderRadius: 10,
    flex: 1,
  },
  placeholder: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.5),
    lineHeight: 10,
  },
});
const recent = StyleSheet.create({
  button: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: colors.grey(0.15),
    borderWidth: 1,
    backgroundColor: colors.grey(0.03),
  },
  label: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.65),
  },
  text: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(0.8),
    paddingVertical: 0,
    paddingHorizontal: 24,
  },
  text2: {
    backgroundColor:colors.Orange(0.4),
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(0.8),
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  container:{
    position: 'absolute',
    backgroundColor: colors.simple(0.3),
    zIndex: 999,
    top: 35,
    left: 0,
    right: 0,
    elevation: 1000,
  },
});