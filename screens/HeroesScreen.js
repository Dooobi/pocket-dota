import React from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import GridView from 'react-native-super-grid';
import { connect } from 'react-redux';

import { SCREEN_LABELS, url } from '../constants/Constants';
import ButtonHamburger from '../components/ButtonHamburger';

@connect(state => ({ 
  heroes: state.wiki.data.heroes,
}))
export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.HEROES,
    headerRight: <ButtonHamburger />
  });


  _renderItem = hero => {
    const { navigate } = this.props.navigation
    const imgSource = { uri: hero.img_small }

    return (
      <TouchableHighlight key={hero.tag} onPress={() => navigate('HeroScreen', { hero }) } 
        underlayColor='rgba(0,0,0,0)'>
        <View style={styles.item}>
          <Image style={styles.thumb} source={imgSource} />
          <Text style={styles.text}>
            {hero.name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    const { heroes } = this.props;

    return (
      <View>
        { !heroes
          ? <View>
              <Text>No heroes found... please reload the application</Text>
            </View>
          : <View>
              <GridView removeClippedSubviews={true}
                itemDimension={100}
                items={heroes}
                renderItem={this._renderItem}
              />
            </View>
        }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});