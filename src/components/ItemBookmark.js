import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Clock, HeartAdd, HeartRemove,Lovely} from 'iconsax-react-native';
import FastImage from 'react-native-fast-image';
import { fontType, colors } from '../theme';
import {useNavigation} from '@react-navigation/native';


// const truncateTextByWords = (text, maxWords) => {
//   const words = text.split(' ');
//   if (words.length > maxWords) {
//     return words.slice(0, maxWords).join(' ') + ' ...';
//   }
//   return text;
// }

const ItemBookmark = ({item, onPress, variant}) => {
  const navigation = useNavigation();
  return (
      <TouchableOpacity style={styles.cardItem} onPress={()=>navigation.navigate('BlogDetail', {blogId: item.id})}>
        <FastImage
          style={styles.cardImage}
          source={{
            uri: item.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <View style={styles.cardContent}>
            <View style={styles.cardCategory}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryLabel}>{item.category}</Text>
              </View>
            </View>
            <View>
              <View style={styles.cardIcon}>
                <TouchableOpacity onPress={onPress}>
                  <Lovely color={colors.white()} variant={variant} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </FastImage>
        <View style={{gap: 20, paddingHorizontal: 10, paddingVertical: 5}}>
          <View style={{gap: 10}}>
            <Text
              style={styles.blogTitle}>
              {item.title}
            </Text>
            <Text
              style={styles.blogContent}>
              {truncateTextByWords(item.content, 10)}
            </Text>
          </View>
          <View style={styles.cardInfo}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap:5}}>
              <Clock
                size={12}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={styles.cardText}>{item.createdAt}</Text>
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
        </View>

      </TouchableOpacity>

  );
};

export default ItemBookmark;

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.simple(0.9),
    borderRadius: 30,
  },
  cardImage: {
    width: 345,
    height: 150,
    borderRadius: 35,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.6),
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
  cardCategory: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '60%',
  },
  categoryBadge: {
    backgroundColor: colors.white(),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryLabel: {
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.blue(),
  },
  blogTitle:{
    fontSize: 12,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  blogContent:{
    fontSize: 12,
    lineHeight: 20,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
  }
});