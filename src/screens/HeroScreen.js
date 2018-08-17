import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


import ButtonHamburger from '../components/ButtonHamburger';
import { Text, Container, Card } from '../components/ui';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { model_hero } from '../constants/Models';

import Abilities from '../components/Hero/Abilities';
import Attributes from '../components/Hero/Attributes';
import { url } from '../constants/Data';
import { ATTRIBUTES } from '../constants/Constants';

import { headerStyle } from '../utils/screen';

export default class HeroScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let primaryAttColor;
    switch(navigation.getParam('hero').attributes.AttributePrimary) {
      case ATTRIBUTES.agility:
        primaryAttColor = Colors.dota_agi;
        break;
      case ATTRIBUTES.intelligence:
        primaryAttColor = Colors.dota_int;
        break;
      case ATTRIBUTES.strength:
        primaryAttColor = Colors.dota_str;
        break;
    }
    return {
      title: navigation.getParam('hero').name,
      ...headerStyle,
      headerTitleStyle: {
        color: primaryAttColor,
      },
    }
  };

  render() {
    const { name, bio, hype, tag, abilities } =  this.props.navigation.getParam('hero');
    const hero = model_hero(this.props.navigation.getParam('hero'));


    return (
      <Container scrollable style={styles.container} >
        <Card collapsedTitle='Hype and Stats'>
          <Text style={styles.hype}>{hype}</Text>

          <Attributes attributes={attributes} tag={tag} />
        </Card>

        <Card>
          <Abilities abilities={abilities} />
        </Card>

        <Card collapsedTitle='BIOGRAPHY' title='Biography'>
          <Text>{bio}</Text>
        </Card>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Layout.padding_small,
  },
  
  hype: { marginBottom: Layout.padding_regular, },
})