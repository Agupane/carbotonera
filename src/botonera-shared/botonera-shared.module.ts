import {SoundPlayerService} from "./services/soundPlayer.service";
import {NgModule} from "@angular/core";
import {ModuleWithProviders} from "@angular/compiler/src/core";

export const MODULES = [

];

export const DIRECTIVES = [];

export const COMPONENTS = [];

export const PIPES = [];

export const SINGLETON_SERVICES = [
  SoundPlayerService
];

export const MULTI_INSTANCE_SERVICES = [];

@NgModule({
  imports: [...MODULES],
  declarations: [...PIPES, ...DIRECTIVES, ...COMPONENTS],
  exports: [...PIPES, ...DIRECTIVES, ...MODULES, ...COMPONENTS],
  providers: [...MULTI_INSTANCE_SERVICES]
})
export class BotoneraSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BotoneraSharedModule,
      providers: [...SINGLETON_SERVICES]
    };
  }
}
