class Auth {

    constructor() {
        this.form = document.querySelector('[data-x-form]');
        this.email = this.form?.querySelector("[data-x-field='email']")
        this.emailError = this.form?.querySelector("[data-x-field-error='email']")
        this.password = this.form?.querySelector("[data-x-field='password']")
        this.passwordError = this.form?.querySelector("[data-x-field-error='password']")
        this.errors = {};
        this.dummyUser = {
            email: "user@demo.com", password: "password"
        }
    }

    initEventListener() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = this.email.value;
            const password = this.password.value;
            if (email.length === 0) {
                this.errors['email'] = "Please enter a email address";
            }else if(!this.validateEmail(email)){
                this.errors['email'] = "Please enter a proper email";
            }else if(email !== this.dummyUser.email){
                this.errors['email'] = "This user is not registered yet";
            }
            if (password.length === 0) {
                this.errors['password'] = "Please enter a password";
            }
            if (email === this.dummyUser.email && password !== this.dummyUser.password) {
                this.errors['password'] = "Invalid credentials";
            }
            if(Object.keys(this.errors).length===0){
                this.goToNext();
            }else {
                this.showErrors();
            }
        });
    }

    validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    goToNext(){
        const next = this.form.getAttribute('data-x-form-to');
        console.info(next)
        if(next){
            window.location.href = next;
        }
    }

    clearErrors(){
        if(this.emailError)
            this.emailError.innerHTML = ""
        if(this.passwordError)
            this.passwordError.innerHTML = ""
    }

    showErrors() {
        this.clearErrors();
        if(this.errors['email'] && this.emailError){
            this.emailError.innerHTML = this.errors['email']
        }
        if(this.errors['password'] && this.passwordError){
            this.passwordError.innerHTML = this.errors['password']
        }
        this.errors = {};
    }


    init() {
        if (this.email && this.password) {
            this.initEventListener();
        }
    }

}

new Auth().init();
