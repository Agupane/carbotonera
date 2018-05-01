export class soundBotonera{
  name: string;
  uid: string;
  soundPath: string;

  constructor(uid: string, name: string, soundPath: string) {
    this.uid = uid;
    this.soundPath = soundPath;
    this.name = name;
  }
}
