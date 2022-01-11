import RNFetchBlob from 'rn-fetch-blob';
import MediaMeta from 'react-native-media-meta';
import { ToastAndroid } from 'react-native';


export default async function DataFile(callback){

  const itemArr = [ 
    // {
    //   name: 'alpha bravo',
    //   uri: 'https://www.seekpng.com/png/full/17-175297_jouissance-the-king-s-avatar-zhou-zekai-discord.png',
    //   price: '20',
    //   singer: 'Veletudo Beats',
    // },
    // {
    //   name: 'charlie',
    //   uri: 'https://picturepan2.github.io/spectre/img/avatar-1.png',
    //   price: '30',
    //   singer: 'Veletudo Beats',
    // },
    // {
    //   name: 'gradle',
    //   uri: 'https://picturepan2.github.io/spectre/img/avatar-3.png',
    //   price: '10',
    //   singer: 'Veletudo Beats',
    // },
    // {
    //   name: 'garilla',
    //   uri: 'https://www.pinclipart.com/picdir/big/220-2207735_avatars-clipart-generic-user-woman-people-icon-png.png',
    //   price: '20',
    //   singer: 'Veletudo Beats',
    // },
  ];
  const dirs = RNFetchBlob.fs.dirs;
  var songFiles = [];
  var files = await RNFetchBlob.fs.ls((dirs.DownloadDir));
  // files will an array contains filenames
  var i = 0;
  for (var file of files){
    var fileNameSplit = file.includes('.mp3');
    if (fileNameSplit) {
      songFiles.push(file);
      const path = dirs.DownloadDir + "/" + file;
      const metadata = await MediaMeta.get(path);
      var singleData = {
        comment: metadata.comment,
        duration: metadata.duration,
        height: metadata.height,
        thumb: 'data:image/jpg;base64,' + metadata.thumb,
        title: metadata.title,
        width: metadata.width,
        name: file,
        price: 'Free',
        songPath: path,
        singer: metadata.album,
        uri: 'https://w7.pngwing.com/pngs/784/399/png-transparent-computer-software-windows-nt-windows-xp-unknown-person-face-monochrome-computer-wallpaper.png',
      }
      itemArr.push(singleData);
    }
  }
  try {
    files = await RNFetchBlob.fs.ls((dirs.MusicDir));
    // files will an array contains filenames
    var i = 0;
    for (const file of files){
      var fileNameSplit = file.includes('.mp3');
      if (fileNameSplit) {
        songFiles.push(file);
        const path = dirs.MusicDir + "/" + file;
        const metadata = await MediaMeta.get(path);
        var singleData = {
          comment: metadata.comment,
          duration: metadata.duration,
          height: metadata.height,
          thumb: 'data:image/jpg;base64,' + metadata.thumb,
          title: metadata.title,
          width: metadata.width,
          name: file,
          price: 'Free',
          songPath: path,
          singer: metadata.album,
          uri: 'https://w7.pngwing.com/pngs/784/399/png-transparent-computer-software-windows-nt-windows-xp-unknown-person-face-monochrome-computer-wallpaper.png',
        }
        itemArr.push(singleData);
      }
    }
  } catch (error) {
    ToastAndroid.show('No Music Folder Found.',ToastAndroid.LONG);
  }
  try {
    files = await RNFetchBlob.fs.ls((dirs.DCIMDir));
    // files will an array contains filenames
    var i = 0;
    for (const file of files){
      var fileNameSplit = file.includes('.mp3');
      if (fileNameSplit) {
        songFiles.push(file);
        const path = dirs.DCIMDir + "/" + file;
        const metadata = await MediaMeta.get(path);
        var singleData = {
          comment: metadata.comment,
          duration: metadata.duration,
          height: metadata.height,
          thumb: 'data:image/jpg;base64,' + metadata.thumb,
          title: metadata.title,
          width: metadata.width,
          name: file,
          price: 'Free',
          songPath: path,
          singer: metadata.album,
          uri: 'https://w7.pngwing.com/pngs/784/399/png-transparent-computer-software-windows-nt-windows-xp-unknown-person-face-monochrome-computer-wallpaper.png',
        }
        itemArr.push(singleData);
      }
    }
  } catch (error) {
    ToastAndroid.show('No DCIM Folder Found.');
  }
  
  callback(itemArr);
}
  


