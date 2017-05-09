import { NgModule, ModuleWithProviders } from '@angular/core';
import { SocialAuthService, IProviders } from './social-auth.service';

declare let gapi: any;
declare let IN: any;
declare let FB: any;

@NgModule()
export class SocialLoginModule{
  static initWithProviders(config: IProviders): ModuleWithProviders{
    let loadProvidersScripts: Object = {
      facebook: (info) => {
        let d = document, fbJs, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];

        fbJs = d.createElement('script');
        fbJs.id = id;
        fbJs.async = true;
        fbJs.src = '//connect.facebook.net/en_US/sdk.js';

        fbJs.onload = () => {
          FB.init({
            appId: info['clientId'],
            status: true,
            cookie: true,
            xfbml: true,
            version: info['apiVersion']
          });
        };

        ref.parentNode.insertBefore(fbJs, ref);
      },

      vkontakte: (info) => {
        let d = document, vkJs, ref = d.getElementsByTagName('script')[0];

        vkJs = d.createElement('script');
        vkJs.async = true;
        vkJs.src = '//vk.com/js/api/openapi.js?139';

        vkJs.onload = () => {
          VK.init({
            apiId: info['clientId']
          });
        }
      }
    }

    Object.keys(config).forEach((provider) => {
      loadProvidersScripts[provider](config[provider]);
    })

    return {
      ngModule: SocialLoginModule,
      providers: [SocialAuthService]
    }
  }
}
