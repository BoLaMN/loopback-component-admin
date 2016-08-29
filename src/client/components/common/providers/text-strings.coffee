angular.module 'loopback-admin'

.filter 'text', (typedText, $log) ->

  filter = (input) ->
    if typedText[input]
      typedText[input]
    else
      $log.info 'text string missing: ' + input
      'MISSING ' + input

  filter.$stateful = true

  filter

.constant 'typedText',
  # landing page
  homeTagline: 'Loopback Admin'
  homeButtonText: 'Login now'
  # Login Page
  wrongCredentials: 'Wrong email address or password'
  noAccount: 'Don\'t have an account?'
  registerHere: 'Register here.'
  login: 'Login'
  password: 'Password'
  email: 'Email'
  enterYourTwitterEmail: 'Please enter your twitter email'
  userWithEmailExists: 'User with this email already exists.'
  enterYourPassword: 'Enter your password'
  requestPassword: 'An account with this email address already exists, if you want to connect the two accounts please enter existing accounts password in the field below.'
  wrongPassword: 'Password seems to be incorrect, please try again.'
  connect: 'Connect'
  genericSocialError: 'An error occured, please try again later.'
  rememberMe: 'Remember me'
  loginWithFacebook: 'Login with facebook'
  loginWithTwitter: 'Login with twitter'
  loginWithGoogle: 'Login with google'
  orLoginWith: ' Or login with:'

  submit: 'Submit'

  # Modals
  close: 'Close'

  # Register Page
  alreadyHaveAccount: 'Already have an account?'
  repeatPassword: 'Repeat Password'
  logInHere: 'Login in here.'
  register: 'Register'

  itemsSelected: 'Items Selected'

  upload: 'Upload'
  cancel: 'Cancel'
  create: 'Create'
  'new': 'New'

  searchResults: 'Search Results'

  items: 'Items'
  created: 'Created'
  description: 'Description'
  none: 'None'
  yes: 'Yes'
  no: 'No'

  # Navbar
  editUsername: 'Edit Username'
  changeAvatar: 'Change Avatar'
  logOut: 'Log Out'
  accountSettings: 'Account Settings'
  confirm: 'Confirm'
  dashboard: 'Dashboard'

  # Account
  username: 'Username'
  fullName: 'Full Name'
  firstName: 'First Name'
  lastName: 'Last Name'
  currentPassword: 'Current Password'
  passwordChangeSuccess: 'Your password was changed successfully.'
  avatarAcceptedFormats: 'Accepted formats: png, jpeg.'
  avatarResizeExpl: 'Your avatar will be resized to 200x200 (px) if it\'s bigger then that.'
  view: 'View'
  phone: 'Phone Number'

  # Responses
  genericError: 'something went wrong, please try again later.'
  favoriteExists: 'You have already marked this photo as favorite.'
  passMatches: 'Password is correct.'
  passDoesntMatch: 'Incorrect password. Please try again.'

  profileUpdateSuccess: 'Your profile was updated successfully.'
  avatarRemoveSuccess: 'Removed avatar successfully.'
  permaDeletedItems: 'Permanently deleted {{ number }} items.'

  deleteItems: 'Delete Items'
  sureWantToDeleteItems: 'Are you sure you want to delete these items?'

  createdUserSuccessfully: 'Created user successfully.'
  updatedUserSuccessfully: 'Updated user successfully.'
  settingsUpdated: 'Updated settings successfully.'
  logOutSuccess: 'Logged out successfully.'

  deleteForever: 'Delete Forever'
  confirmPermaDelete: 'Are you sure you want to permanently delete these photo(s)?'
  'delete': 'Delete'
  permaDeleteWarning: 'Warning: this action is not undoable.'

  remove: 'Remove'

  addPassword: 'Add password.'
  remove: 'Remove.'
  add: 'Add'
  done: 'Done'

  # Password reset
  passwordRecovery: 'Password Recovery'
  sendEmail: 'send Email'
  change: 'Change'
  passResetExpl: 'Please enter the email address associated with your account.'
  resetPassword: 'Reset Password'
  resetErrors: 'There were some problems with your input.'
  emailAddress: 'E-Mail Address'
  confirmPassword: 'Confirm Password'
  newPassword: 'New Password'
  forgot: 'Forgot?'

  # Invite
  role: 'Role'
  status: 'Status'
  expiresIn: 'Expires In'
  expiresAt: 'Expiry Date'
  acceptedAt: 'Accepted Date'

  # Admin
  users: 'Users'
  deleted: 'Deleted'
  search: 'search'
  edit: 'Edit'
  avatar: 'Avatar'
  id: 'ID'
  adminArea: 'Admin Area'
  dashboardArea: 'Dashboard Area'

  # Titles
  loginTitle: 'Login'
  registerTitle: 'Register'
  resetPasswordTitle: 'Reset Password'
