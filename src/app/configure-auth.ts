// OIDC
import { LogLevel, OidcConfigService } from 'angular-auth-oidc-client';

export const configureAuth = (oidcConfigService: OidcConfigService) => {
  return () =>
    oidcConfigService.withConfig(
      {
        stsServer: 'https://accounts.google.com',
        redirectUrl: `${window.location.origin}`,
        postLogoutRedirectUri: `${window.location.origin}/login`, // no funciona el redirect
        postLoginRoute: '/',
        forbiddenRoute: '/error', // no hay permiso para acceder a recursos (token inválido)
        unauthorizedRoute: '/error',
        autoUserinfo: true,
        clientId:
          '88458454237-h6fagpt47caqelj9ueukaadbvqrer6s5.apps.googleusercontent.com',
        scope:
          'openid profile email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/contacts',
        responseType: 'id_token token',
        silentRenew: true, // cada 4 sec se compruba
        silentRenewUrl: `${window.location.origin}/silent-renew.html`,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        logLevel: LogLevel.Debug
      }

      /*
    triggerAuthorizationResultEvent: true,
    startCheckSession: false,
    historyCleanupOff: true,*/
    );
};

/*
export function configurAuth(oidcConfigService: OidcConfigService, httpClient: HttpClient) {
  const setupAction$ = http.get<any>(`${window.location.origin}/api/ClientAppSettings`).pipe(
      map((customConfig) => {
          return {
              stsServer: customConfig.stsServer,
              redirectUrl: customConfig.redirect_url,
              clientId: customConfig.client_id,
              responseType: customConfig.response_type,
              scope: customConfig.scope,
              postLogoutRedirectUri: customConfig.post_logout_redirect_uri,
              startCheckSession: customConfig.start_checksession,
              silentRenew: customConfig.silent_renew,
              silentRenewUrl: customConfig.redirect_url + '/silent-renew.html',
              postLoginRoute: customConfig.startup_route,
              forbiddenRoute: customConfig.forbidden_route,
              unauthorizedRoute: customConfig.unauthorized_route,
              logLevel: 0, // LogLevel.Debug, // customConfig.logLevel
              maxIdTokenIatOffsetAllowedInSeconds: customConfig.max_id_token_iat_offset_allowed_in_seconds,
              historyCleanupOff: true,
              // autoUserinfo: false,
          };
      }),
      switchMap((config) => oidcConfigService.withConfig(config))
  );

  return () => setupAction$.toPromise();
}*/
