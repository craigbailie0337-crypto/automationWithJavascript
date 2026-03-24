import { $, expect } from '@wdio/globals'
import Page from './page.js';


class LoginPage extends Page {
  
    get getUserName () {
        return $('#user-name');
    }

    get getPassword () {
        return $('#password');
    }

    get submitButton () {
        return $('#login-button');
    }

    get hamburgerMenu () {
        return $('#react-burger-menu-btn');
    }

    get logOutBtn () {
        return $('#logout_sidebar_link');
    }

    get errorMessage () {
        return $('[data-test="error"]')
    }

    users = ['standard_user', 'error_user', 'problem_user', 'performance_glitch_user', 'visual_user', 'locked_out_user']

    async loopLogin() {
        for (let i =0; i < this.users.length; i++) {
           await this.login(this.users[i], 'secret_sauce');
           if (this.users[i] === 'locked_out_user') {
                await expect(this.errorMessage).toExist();
           } else {
            await this.logOut();
                await expect(this.getUserName).toExist();
           }
                
        }
    }
  
    async login (username, password) {
        await this.getUserName.setValue(username);
        await this.getPassword.setValue(password);
        await this.submitButton.click();
    }

    async logOut() {
        await this.hamburgerMenu.click();
        await this.logOutBtn.click();
    }
    
    open () {
        return super.open('login');
    }
}

export default new LoginPage();
