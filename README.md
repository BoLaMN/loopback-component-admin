# loopback-component-admin
# <img alt="Loopback Admin Component" src="https://raw.githubusercontent.com/BoLaMN/loopback-component-admin/master/screenshots/edit.png">

[![Join the chat at https://gitter.im/BoLaMN/loopback-component-admin](https://badges.gitter.im/BoLaMN/loopback-component-admin.svg)](https://gitter.im/BoLaMN/loopback-component-admin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Loopback Admin Component


* npm install loopback-component-admin --save
* server/component-config.json

```
{
  "loopback-component-admin": {
    "mountPath": "/admin",
    "userModel": "CustomUserModelHere", (optional)
    "userLoginField": "email|username" (optional)
  }
}
```
