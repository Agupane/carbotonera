import {EventEmitter, Injectable} from "@angular/core";
import {soundBotonera} from "../models/soundBotonera.model";
import {NativeAudio} from "@ionic-native/native-audio";
import {Platform} from "ionic-angular";

@Injectable()
export class SoundPlayerService {
  public sounds : soundBotonera[];
  private currentPlayingSound: soundBotonera;
  public static soundPlayingEvent: EventEmitter<boolean>;

  constructor(private nativeAudio: NativeAudio, private platform: Platform){
    this.sounds = [];

    this.sounds[0] = {
      uid: '0',
      soundPath: 'assets/audios/180Mangos.ogg',
      name: '180 Mangos',
      audioAsset: null
    };
    this.sounds[1] = {
      uid: '1',
      soundPath: 'assets/audios/marioLucho.ogg',
      name: 'Mario Lucho',
      audioAsset: null
    };

    this.sounds[2] = {
      uid: '2',
      soundPath: 'assets/audios/luchoTraidor.ogg',
      name: 'Lucho traidor',
      audioAsset: null
    };
    this.sounds[3] = {
      uid: '3',
      soundPath: 'assets/audios/toomy.ogg',
      name: 'Tooomyy',
      audioAsset: null
    };

    this.sounds[4] = {
      uid: '4',
      soundPath: 'assets/audios/luucho.ogg',
      name: 'Luuuchoo',
      audioAsset: null
    };
    this.sounds[5] = {
      uid: '5',
      soundPath: 'assets/audios/mohametSalaverry.ogg',
      name: 'Mohamet Salaverry',
      audioAsset: null
    };

    /** Example loading the first audio **/
    this.currentPlayingSound = this.sounds[0];
    SoundPlayerService.soundPlayingEvent = new EventEmitter<boolean>();
  }


  getSounds(){
    return this.sounds;
  }

  playSound(selectedSound :soundBotonera){
    console.log("Playing sound: ", selectedSound);
    if(this.platform.is('cordova')){
      this.nativeAudio.stop(this.currentPlayingSound.uid)
        .then(data => {
          console.log("Stoped current played audio");
          this.playSoundOnDevice(selectedSound);
        })
        .catch(error =>{
          console.log("Error while trying to stop current sound");
          this.playSoundOnDevice(selectedSound);
        });
    }
    else{
      /** We stop the playing of the current audio **/
      if(this.currentPlayingSound.audioAsset !=null ){
        this.currentPlayingSound.audioAsset.pause();
      }
      this.playSoundOnBrowser(selectedSound);
    }

  }

  private playSoundOnDevice(selectedSound : soundBotonera){
    this.nativeAudio.preloadSimple(selectedSound.uid, selectedSound.soundPath)
      .then(
        onSuccess => {
          console.log("Success loading audio file ", onSuccess);
          this.nativeAudio.play(selectedSound.uid, () =>{
            this.currentPlayingSound = selectedSound;
            SoundPlayerService.soundPlayingEvent.emit(true);

            console.log("Carbaudio nr: "+selectedSound.uid+" is being played");
          });
        },
        onError =>{
          console.log("Error trying to load audio file ",onError);
          SoundPlayerService.soundPlayingEvent.emit(false);
        });
  }

  private playSoundOnBrowser(selectedSound : soundBotonera){
    console.log("Playing sound on browser");
    let audioAsset = new Audio(selectedSound.soundPath);
    this.currentPlayingSound = selectedSound;
    this.currentPlayingSound.audioAsset = audioAsset;
    audioAsset.play();
    SoundPlayerService.soundPlayingEvent.emit(true);
    audioAsset.onended = function(){
      SoundPlayerService.soundPlayingEvent.emit(false);
    }

  }


}
