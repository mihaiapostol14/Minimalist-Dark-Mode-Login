class LoginValidator {
  constructor(config) {
    this.usernameInput = document.querySelector(config.usernameInput)
    this.passwordInput = document.querySelector(config.passwordInput)
    this.eyeButton = document.querySelector(config.eyeButton)
    this.submitBtn = document.querySelector(config.submitBtn)
    this.hintText = document.querySelector(config.hintText)

    this.successColor = '#32D190'
    this.errorColor = '#e74c3c'

    this.init()
  }

  init() {
    // Toggle password visibility
    this.eyeButton.addEventListener('click', () => this.toggleVisibility())

    // Validate on submit
    this.submitBtn.addEventListener('click', e => {
      e.preventDefault()
      this.validate()
    })

    // 🔥 Auto validation (live)
    this.usernameInput.addEventListener('input', () => this.capitalizeUsername())
    this.usernameInput.addEventListener('input', () => this.validate())
    this.passwordInput.addEventListener('input', () => this.validate())
  }

  toggleVisibility() {
    const isPassword = this.passwordInput.type === 'password'
    this.passwordInput.type = isPassword ? 'text' : 'password'

    // Toggle icon (Boxicons)
    this.eyeButton.classList.toggle('bxs-hide', !isPassword)
    this.eyeButton.classList.toggle('bxs-show', isPassword)
  }

  capitalizeUsername() {
    const username = this.usernameInput.value.trim()

    if (username.length > 0 && username[0] !== username[0].toUpperCase()) {
      this.usernameInput.value = `${username.charAt(0).toUpperCase()}${username.slice(1)}`
    }
  }

  validate() {
    const username = this.usernameInput.value.trim()
    const password = this.passwordInput.value.trim()

    // Don't show errors when empty
    if (!username && !password) {
      return this.updateUI({ isValid: false, message: '' })
    }

    if (!username) {
      return this.updateUI({ isValid: false, message: 'Username is required' })
    }

    if (!password) {
      return this.updateUI({ isValid: false, message: 'Password is required' })
    }

     if (username.length < 5) {
       return this.updateUI({
         isValid: false,
         message: 'Username must be at least 5 characters',
       })
     }

    if (password.length < 8) {
      return this.updateUI({
        isValid: false,
        message: 'Password must be at least 8 characters',
      })
    }

    // Success
    this.updateUI({ isValid: true, message: 'Looks good ✔' })
  }

  updateUI({ isValid, message = '' }) {
    const color = isValid ? this.successColor : this.errorColor

    // Border color
    this.usernameInput.style.borderColor = color
    this.passwordInput.style.borderColor = color

    // Message
    if (this.hintText) {
      this.hintText.textContent = message
      this.hintText.style.color = color
    }

    // Classes (recommended)
    this.usernameInput.classList.toggle('error', !isValid)
    this.passwordInput.classList.toggle('error', !isValid)

    this.usernameInput.classList.toggle('success', isValid)
    this.passwordInput.classList.toggle('success', isValid)
  }
}

const loginForm = new LoginValidator({
  usernameInput: '.username',
  passwordInput: '.password',
  eyeButton: '.eye',
  submitBtn: '.btn-submit',
  hintText: '.hint-text',
})