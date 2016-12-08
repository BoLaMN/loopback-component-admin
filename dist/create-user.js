var createAdminRole, createDefaultAdmin;

module.exports = function (loopbackApplication, options) {
    var ACL, Role, RoleMapping, User;
    ACL = loopbackApplication.models.ACL;
    Role = loopbackApplication.models.Role;
    RoleMapping = loopbackApplication.models.RoleMapping;
    User = loopbackApplication.models[options.userModel];
    if (!User) {
        User = loopbackApplication.models.User;
    }
    User.count(function (error, count) {
        if (error) {
            console.log('Error setting up default admin.');
            console.dir(error);
            return;
        }
        if (count === 0) {
            Role.findOne({
                where: {
                    name: 'admin'
                }
            }, function (error, result) {
                if (error) {
                    console.log('Error setting up default admin role.');
                    console.dir(error);
                    return;
                }
                if (!result) {
                    createAdminRole(Role, function (error, role) {
                        if (error) {
                            console.log('Error creating admin role.');
                            console.dir(error);
                            return;
                        }
                        createDefaultAdmin(User, RoleMapping, ACL, role.id);
                    });
                } else {
                    createDefaultAdmin(User, RoleMapping, ACL, result.id);
                }
            });
        }
    });
};

createAdminRole = function (Role, callback) {
    var role;
    role = {
        name: 'admin',
        description: 'admin'
    };
    Role.create(role, callback);
};

createDefaultAdmin = function (User, RoleMapping, ACL, roleId) {
    User.create({
        email: 'admin@example.com',
        username: 'admin',
        password: 'password',
        created: new Date
    }, function (error, user) {
        if (error) {
            console.log('Error creating \'admin\' user.');
            console.dir(error);
            return;
        }
        RoleMapping.create({
            principalType: 'USER',
            principalId: user.getId(),
            roleId: roleId
        }, function (error, result) {
            if (error) {
                console.log('Error creating \'admin\' role mapping.');
                console.dir(error);
                return;
            }
            console.log('Created default \'admin\' user with password \'password\'.');
        });
        ACL.create({
            model: User.definition.name,
            property: '*',
            accessType: '*',
            permission: 'ALLOW',
            principalType: 'ROLE',
            principalId: 'admin'
        });
        ACL.create({
            model: 'AccessToken',
            property: '*',
            accessType: '*',
            permission: 'ALLOW',
            principalType: 'ROLE',
            principalId: 'admin'
        });
    });
};
