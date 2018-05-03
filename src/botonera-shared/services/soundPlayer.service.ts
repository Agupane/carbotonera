import {EventEmitter, Injectable} from "@angular/core";
import {soundBotonera} from "../models/soundBotonera.model";
import {NativeAudio} from "@ionic-native/native-audio";
import {Platform} from "ionic-angular";

@Injectable()
export class SoundPlayerService {
  public sounds : soundBotonera[];
  private currentPlayingSound: soundBotonera;
  public static soundPlayingEvent: EventEmitter<boolean>;
  private static isCurrentPlaying: boolean;

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

    this.preloadSounds();
    /** Example loading the first audio **/
    this.currentPlayingSound = this.sounds[0];
    SoundPlayerService.soundPlayingEvent = new EventEmitter<boolean>();
    SoundPlayerService.isCurrentPlaying = false;
  }


  getSounds(){
    return this.sounds;
  }

  /** Preloads the list of sounds on the device **/
  private preloadSounds(){
    for(let soundIterator of this.sounds) {
      this.nativeAudio.preloadSimple(soundIterator.uid, soundIterator.soundPath)
        .then(
          onSuccess => {
            console.log("Success loading audio file ", onSuccess);
          },
          onError =>{
            console.log("Error trying to load audio file ",onError);
           // this.nativeAudio.unload(soundIterator.uid);
            SoundPlayerService.soundPlayingEvent.emit(false);
            SoundPlayerService.isCurrentPlaying = false;
          });
    }

  }

  stopCurrentPlayingSound(){
    console.log("Stopping current playing sound: ");
    let self = this;
    return new Promise(function(resolve,reject) {
      if (SoundPlayerService.isCurrentPlaying) {
        if(self.platform.is('cordova')) {
          self.nativeAudio.stop(self.currentPlayingSound.uid)
            .then(data => {
              console.log("Stoped current played audio");
              SoundPlayerService.soundPlayingEvent.emit(false);
              SoundPlayerService.isCurrentPlaying = false;
              resolve(SoundPlayerService.isCurrentPlaying);
            })
            .catch(error => {
              console.log("Error while trying to stop current sound");
              reject(SoundPlayerService.isCurrentPlaying);
            });
        }
        else{
          /** We stop the playing of the current audio **/
          if (self.currentPlayingSound.audioAsset != null) {
            this.currentPlayingSound.audioAsset.pause();
            SoundPlayerService.soundPlayingEvent.emit(false);
            SoundPlayerService.isCurrentPlaying = false;
            resolve(SoundPlayerService.isCurrentPlaying);
          }
        }
      }
      else{
        resolve(SoundPlayerService.isCurrentPlaying);
      }
    });
  }

  playSound(selectedSound :soundBotonera){
    console.log("Playing sound: ", selectedSound);
    /** First we stop the current playing sound **/
    this.stopCurrentPlayingSound()
      .then(data =>{
        /** Then we just play on the device or browser **/
        if(this.platform.is('cordova')){
          this.playSoundOnDevice(selectedSound);
        }
        else{
          this.playSoundOnBrowser(selectedSound);
        }
      })
      .catch(error=>{
        console.log("Error while tried to stop current sound ", error);
      });
  }

  private playSoundOnDevice(selectedSound : soundBotonera){
    console.log("Playing sound on device");
    SoundPlayerService.soundPlayingEvent.emit(true);
    SoundPlayerService.isCurrentPlaying = true;
    this.currentPlayingSound = selectedSound;
    this.nativeAudio.play(selectedSound.uid, () =>{
      /** The sound has ended, now changing the bg again **/
      console.log("Carbaudio nr: "+selectedSound.uid+" has been played");
      SoundPlayerService.soundPlayingEvent.emit(false);
      SoundPlayerService.isCurrentPlaying = false;
    });
  }

  private playSoundOnBrowser(selectedSound : soundBotonera){
    console.log("Playing sound on browser");
    let audioAsset = new Audio(selectedSound.soundPath);
    this.currentPlayingSound = selectedSound;
    this.currentPlayingSound.audioAsset = audioAsset;
    audioAsset.play();
    SoundPlayerService.soundPlayingEvent.emit(true);
    SoundPlayerService.isCurrentPlaying = true;
    audioAsset.onended = function(){
      SoundPlayerService.soundPlayingEvent.emit(false);
      SoundPlayerService.isCurrentPlaying = false;
    }

  }


}
