
module.exports = (loopbackApplication, options) ->
  ACL = loopbackApplication.models.ACL
  Role = loopbackApplication.models.Role
  RoleMapping = loopbackApplication.models.RoleMapping
  User = loopbackApplication.models[options.userModel]

  if !User
    User = loopbackApplication.models.User

  User.count (error, count) ->
    if error
      console.log 'Error setting up default admin.'
      console.dir error
      return

    if count is 0
      Role.findOne { where: name: 'admin' }, (error, result) ->
        if error
          console.log 'Error setting up default admin role.'
          console.dir error
          return

        if !result
          createAdminRole Role, (error, role) ->
            if error
              console.log 'Error creating admin role.'
              console.dir error
              return

            createDefaultAdmin User, RoleMapping, ACL, role.id
            return
        else
          createDefaultAdmin User, RoleMapping, ACL, result.id
        return
    return
  return

createAdminRole = (Role, callback) ->
  role =
    name: 'admin'
    description: 'admin'

  Role.create role, callback
  return

createDefaultAdmin = (User, RoleMapping, ACL, roleId) ->
  User.create {
    email: 'admin@example.com'
    username: 'admin'
    password: 'password'
    created: new Date
  }, (error, user) ->
    if error
      console.log 'Error creating \'admin\' user.'
      console.dir error
      return

    RoleMapping.create {
      principalType: 'USER'
      principalId: user.getId()
      roleId: roleId
    }, (error, result) ->
      if error
        console.log 'Error creating \'admin\' role mapping.'
        console.dir error
        return

      console.log 'Created default \'admin\' user with password \'password\'.'
      return

    ACL.create
      model: User.definition.name
      property: '*'
      accessType: '*'
      permission: 'ALLOW'
      principalType: 'ROLE'
      principalId: 'admin'

    ACL.create
      model: 'AccessToken'
      property: '*'
      accessType: '*'
      permission: 'ALLOW'
      principalType: 'ROLE'
      principalId: 'admin'

    return
  return
