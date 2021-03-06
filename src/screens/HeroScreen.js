import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, Container, Card, } from '../components/ui';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { model_hero } from '../constants/Models';

import Abilities from '../components/Hero/Abilities';
import Attributes from '../components/Hero/Attributes';
import ItemBuild from '../components/Hero/ItemBuild';
import { ATTRIBUTES } from '../constants/Constants';

import { headerStyle } from '../utils/screen';
import { HTML } from '../components/Hero/AbilityPreview';
import Talents from '../components/Hero/Talents';


export default class HeroScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const hero = model_hero(navigation.getParam('data'));

    let primaryAttColor;
    switch(hero.attributes.AttributePrimary) {
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
      title: hero.name,
      ...headerStyle,
      headerTitleStyle: {
        color: primaryAttColor,
      },
    }
  };

  render() {
    const hero = model_hero(this.props.navigation.getParam('data'));
    const { name, bio, hype, tag, talents, attributes, abilities, abilities_special, abilities_aghs, abilities_hidden, item_builds } = hero;
    
    return (
      <Container scrollable style={styles.container} >
        <Card title='Hype and Stats'>
          <Text style={styles.hype}>{hype}</Text>

          <Attributes attributes={attributes} tag={tag} />
        </Card>

        <Card title='Talents' showTitleWhenOpened>
          <Talents talents={talents} />
        </Card>

        <Card title='Abilities' showTitleWhenOpened>
          <Abilities abilities={abilities} />
        </Card>

        { !abilities_special || abilities_special.length == 0 ? null :
          <Card title='Special Abilities' showTitleWhenOpened>
            <Abilities abilities={abilities_special} />
          </Card>  
        }

        { !abilities_aghs || abilities_aghs.length == 0 ? null :
          <Card title="Aghanim's enabled Abilities"  showTitleWhenOpened>
            <Abilities abilities={abilities_aghs} />
          </Card>  
        }

        { !abilities_hidden || abilities_hidden.length == 0 ? null :
          <Card title="Hidden Abilities"  showTitleWhenOpened>
            <Abilities abilities={abilities_hidden} />
          </Card>  
        }

        <Card title='Biography' showTitleWhenOpened>
          <HTML htmlContent={bio} style={{ backgroundColor: Colors.dota_ui1 }} />
        </Card>

        <Card title='Recommended item build' showTitleWhenOpened>
          <ItemBuild item_builds={item_builds} />
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