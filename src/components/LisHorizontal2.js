import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Like1, Clock, HeartAdd, HeartRemove} from 'iconsax-react-native';
import FastImage from 'react-native-fast-image';
import { fontType, colors } from '../theme';
import {useNavigation} from '@react-navigation/native';


const ItemHorizontal2 = ({item, variant, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={itemHorizontal.cardItem }onPress={() => navigation.navigate('BlogDetail', {blogId: item.id})}>
<FastImage
        style={styles.cardImage}
        source={{
          uri: item.image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap :30
          }}>
          <View style={{gap: 5, flex :1}}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Like1
            color={colors.black(0.8)}
            variant="Linear"
            size={20}
         />
        </View>
        <View style={styles.cardInfo}>
          <Clock size={13} variant="Linear" color={colors.grey()} />
          <Text style={styles.cardText2}>{item.createdAt}</Text>
        </View>
        <View style={styles.cardInfo}>
          <HeartAdd
            size={13}
            variant="Linear"
            color={colors.grey()}
          />
          <Text style={styles.cardText2}>{item.totalLike}</Text>
          <HeartRemove
            size={13}
            variant="Linear"
            color={colors.grey()}
          />
          <Text style={styles.cardText2}>{item.totalDislike}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListHorizontal = ({data}) => {
  const [bookmark, setBookmark] = useState([]);
  const toggleBookmark = itemId => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };
  const renderItem = ({item}) => {
    variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ItemHorizontal
        item={item}
        variant={variant}
        onPress={() => toggleBookmark(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 5}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default ListHorizontal;
const styles = StyleSheet.create({
listCard: {
    paddingHorizontal: 50,
    paddingVertical: 90,
    gap: 20,
  },
  cardItem: {
    backgroundColor: colors.simple(0.65),
    flexDirection: 'row',
    width:370,
    borderRadius: 30,
  },
  cardCategory: {
    color: colors.blue(),
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.blue(0.9),
  },
  cardText2: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.darkModeBlue(0.9),
  },
  cardImage: {
    width: 185,
    height: 150,
    borderRadius: 35,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 5,
    justifyContent: 'center',
    paddingRight:10,
    paddingLeft: 10,
    flex: 5,
    paddingVertical:30,
  },
});