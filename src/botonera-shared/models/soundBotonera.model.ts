export class soundBotonera{
  name: string;
  uid: string;
  soundPath: string;
  audioAsset: HTMLAudioElement;

  constructor(uid: string, name: string, soundPath: string, audioAsset?: HTMLAudioElement) {
    this.uid = uid;
    this.soundPath = soundPath;
    this.name = name;
    this.audioAsset = audioAsset;
  }
}
