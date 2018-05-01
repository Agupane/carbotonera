import {Injectable} from "@angular/core";
import {soundBotonera} from "../models/soundBotonera.model";
import {NativeAudio} from "@ionic-native/native-audio";
import {Platform} from "ionic-angular";

@Injectable()
export class SoundPlayerService {
  public sounds : soundBotonera[];

  constructor(private nativeAudio: NativeAudio, private platform: Platform){
    this.sounds = [];

    this.sounds[0] = {
      uid: '0',
      soundPath: 'assets/audios/180Mangos.ogg',
      name: '180 Mangos'
    };
    this.sounds[1] = {
      uid: '1',
      soundPath: 'assets/audios/marioLucho.ogg',
      name: 'Mario Lucho'
    };

    this.sounds[2] = {
      uid: '2',
      soundPath: 'test3',
      name: 'btn3'
    };
    this.sounds[3] = {
      uid: '3',
      soundPath: 'test4',
      name: 'btn4'
    };

    this.sounds[4] = {
      uid: '4',
      soundPath: 'test5',
      name: 'btn5'
    };
    this.sounds[5] = {
      uid: '5',
      soundPath: 'test6',
      name: 'btn6'
    };
  }


  getSounds(){
    return this.sounds;
  }

  playSound(selectedSound :soundBotonera){
    console.log("Playing sound: ", selectedSound);
    if(this.platform.is('cordova')){
      this.playSoundOnDevice(selectedSound);
    }
    else{
      this.playSoundOnBrowser(selectedSound);
    }

  }

  private playSoundOnDevice(selectedSound : soundBotonera){
    this.nativeAudio.preloadSimple(selectedSound.uid, selectedSound.soundPath)
      .then(
        onSuccess => {
          console.log("Success loading audio file ", onSuccess);
          this.nativeAudio.play(selectedSound.uid, () =>{
            console.log("Carbaudio nr: "+selectedSound.uid+" is being played");
          });
        },
        onError =>{
          console.log("Error trying to load audio file ",onError);
        });
  }

  private playSoundOnBrowser(selectedSound : soundBotonera){
    console.log("Playing sound on browser");
    let audioAsset = new Audio(selectedSound.soundPath);
    audioAsset.play();
  }
}
