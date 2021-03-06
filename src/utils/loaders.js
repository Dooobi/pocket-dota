import { Asset, Font, Icon, FileSystem, Util } from 'expo';
import Logger from './Logger';
import { model_profile, model_wiki } from '../constants/Models';
import { folder_data } from './downloaders';
import { getItem } from './storage';
import { assets } from '../constants/Data';
import { setWikiVersion } from '../constants/Constants';
import { Alert } from 'react-native';


export const loadInitialAssets = async () => {
  const imageAssets = [
    ...assets.attributes,
    ...assets.game,
    ...assets.app,
  ].map(image => Asset.fromModule(image).downloadAsync())

  const fontAssets = Font.loadAsync({
    ...Icon.Ionicons.font,
  })

  await Promise.all([...imageAssets, fontAssets])
}

export const loadProfileStateFromStorage = async () => {
  const data = model_profile({});
  
  await Promise.all(
    Object.keys(data).map(async key => {
      const local_data = await getItem(key);
      if(local_data) data[key] = local_data;

      // Logger.silly(`loaded local data: profile : ${key} : ${!!data[key]}`);
    })
  );
  
  return data;
}


export const loadWiki = async () => {
  // Logger.debug('loading wiki data');
  const data = model_wiki({});
  let badData = false;
  
  await Promise.all(
    Object.keys(data).map(async key => {
      try {
        data[key] = JSON.parse(await FileSystem.readAsStringAsync(folder_data + `${key}.json`));
      } catch(e) {
        // if the file for one of the assets does not exist, re-download all of them
        badData = true;
      }
      // Logger.silly(`- loaded local data: wiki : ${key} : ${!!data[key]}`);
    })
  )
  if(!badData) setWikiVersion(data.info);
  
  return badData ? null : data;
}


export const loadCurrentWikiInfo = async () => {
  let info;
  try {
    info = JSON.parse(await FileSystem.readAsStringAsync(folder_data + 'info.json'));
  } catch(e) { 
    info = null;
  }

  return info;
}




// used for testing purposes 
export const test__removeWiki = async () => {
  const remove = async () => {
    await FileSystem.deleteAsync(folder_data, { idempotent: true });

    Util.reload();
  }

  Alert.alert(
    "REMOVE WIKI", "",
    [ { text: 'No', style: 'cancel' }, { text: 'Yes', onPress: remove }, ],
    { cancelable: true }
  )
}

export const test__downgradeWiki = async () => {
  const downgrade = async () => {
    const cInfo = await loadCurrentWikiInfo();
    const newInfo = {
      ...cInfo,
      wikiVersion: 30,
    };
    await FileSystem.writeAsStringAsync(`${folder_data}/info.json`, JSON.stringify(newInfo));
    setWikiVersion(newInfo);
  
    console.log('replaced wiki with v30')
  }

  Alert.alert(
    "DOWNGRADE WIKI", "",
    [ { text: 'No', style: 'cancel' }, { text: 'Yes', onPress: downgrade }, ],
    { cancelable: true }
  )

}