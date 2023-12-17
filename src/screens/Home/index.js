import React, {useState} from 'react';
import {ScrollView, StyleSheet,  Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Crown } from 'iconsax-react-native';
import { BlogList, CategoryList } from '../../../data';
import { fontType, colors } from '../../theme';
import { ListHorizontal, ItemSmall} from '../../components';

const ItemCategory = ({item, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{...category.title, color}}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({item}) => {
    const color = item.id === selected ? colors.darkModeBlack() : colors.white(0.5);
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={CategoryList}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 5}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Welcome SlimBody </Text>
        <Crown color={colors.yellow()} variant="Linear" size={30} />
      </View>
      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>
      <ListBlog />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white(),
    },
    header: {
      paddingHorizontal: 35,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      height:52,
      elevation: 5,
      paddingTop:8,
      paddingBottom:4
    },
    title: {
      fontSize: 20,
      fontFamily: fontType['Pjs-ExtraBold'],
      color: colors.black(),
    },
    title2: {
      backgroundColor:colors.Orange(0.4),
      fontSize: 14,
      fontFamily: fontType['Pjs-Bold'],
      color: colors.black(0.8),
      paddingVertical: 5,
      paddingHorizontal: 30,
    },
    listCategory: {
      paddingVertical: 10,
    },
    listBlog: {
      paddingVertical: 10,
      gap: 10,
    },
    listCard:{
      paddingVertical:20,
      gap:10,
    }
  });
  const category = StyleSheet.create({
    item: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 25,
      alignItems: 'center',
      backgroundColor: colors.black(0.3),
      marginHorizontal:5
    },
    title: {
      fontFamily: fontType['Pjs-SemiBold'],
      fontSize: 14,
      lineHeight: 18,
      color: colors.Red(0.2),
    },
  })
  
  
  const ListBlog = () => {
    const horizontalData = BlogList.slice(0, 5);
    const horizontalData2 = BlogList.slice(5, 11);
    const horizontalData23= BlogList.slice(11, 17);
    const verticalData = BlogList.slice(5);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listCard}>
            <ListHorizontal data={verticalData}/>
          </View>
          
        <View style={styles.listBlog}>
        <Text style={styles.title2}>  Required </Text>
          <ListHorizontal data={horizontalData} />
          <View style={styles.listBlog}>
        <Text style={styles.title2}>  Anything About Pillates </Text>
          <ListHorizontal data={horizontalData2} />
          </View>
          <View style={styles.listBlog}>
          <Text style={styles.title2}>  Anything About Yoga </Text>
          <ListHorizontal data={horizontalData23} />
          </View>

        </View>
      </ScrollView>
    );
  };
  