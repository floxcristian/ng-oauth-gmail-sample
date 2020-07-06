Esta app usa la dependencia angular-auth-oidc-client para el soporte de OIDC
Authorization Code Flow with PKCE.

La aplicación Angular carga las configuraciones desde un archivo json de
configuración.

Response_type se establece en "code". Esto define el flujo de OpenID Connect
(OIDC).

Siempre se usa PKCE, ya que este es un cliente público que no puede guardar un
secreto.

Las otras configuraciones deben coincidir con las configuraciones del cliente
OpenID Connect en el servidor.

# Dudas

- **¿Es necesario crypto-js?**

- **¿El status y code_verifier se debe almacenar en localStorage?**
