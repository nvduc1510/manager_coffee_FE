import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MessageResponseComponent } from '../reponse/message-response/message-response.component';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent {
  //check valid employeeLoginId
  static validateLogin(c: AbstractControl): MessageResponseComponent | null {
    const loginFormat = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    const loginId = c.value
    if (loginId == 0) {
      return {
        code: 'ER001',
        params: 'Vui lòng nhập "Tên tài khoản"'
      }
    }
    if (loginId.length > 50) {
      return {
        code: 'ER006',
        params: 'Vui lòng nhập "tên tài khoản" có tối đa 50 chữ số.'
      }
    }
    if (!loginFormat.test(loginId)) {
      return {
        code: 'ER019',
        params: '"Tên tài khoản" chỉ có các chữ số (a-z, A-Z, 0-9 và _). Chữ số đầu tiên không phải là số.'
      }
    }
    return null;
  }
  static validateUsername(c: AbstractControl): MessageResponseComponent | null {
    const format = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    const username = c.value
    if (username == 0) {
      return {
        code: 'ER001',
        params: 'Vui lòng nhập "Tên tài khoản"'
      }
    }
    if (username.length > 50) {
      return {
        code: 'ER006',
        params: 'Vui lòng nhập "tên tài khoản" có tối đa 50 chữ số.'
      }
    }
    if (!format.test(username)) {
      return {
        code: 'ER019',
        params: '"Tên tài khoản" chỉ có các chữ số (a-z, A-Z, 0-9 và _). Chữ số đầu tiên không phải là số.'
      }
    }
    return null;
  }
  //check valid employeeBirthDate
  static ValidBirthDate(c: AbstractControl): MessageResponseComponent | null {
    const birthDate = c.value
    if (!birthDate && birthDate === '') {
      return {
        code: 'ER001',
        params: 'Xin vui lòng nhập ngày sinh của bạn.'
      }
    }
    return null;
  }
  static ValidateUser(c: AbstractControl): MessageResponseComponent | null {
    const user = c.value
    if (!user && user === '') {
      return {
        code: 'ER001',
        params: 'Please enter user name!'
      }
    }
    return null;
  }
  static ValidateUserFullName(c: AbstractControl): MessageResponseComponent | null {
    const user = c.value
    if (!user && user === '') {
      return {
        code: 'ER001',
        params: 'Please enter user name!'
      }
    }
    return null;
  }


  //check valid email
  static ValidEmail(c: AbstractControl): MessageResponseComponent | null {
    const employeeEmail = c.value
    const formEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!employeeEmail) {
    //   return {
    //     code: 'ER001',
    //     params: 'Hãy điền địa chỉ email của bạn'
    //   }
    // }
    if (employeeEmail.length > 125) {
      return {
        code: 'ER006',
        params: 'Please enter your email address within 125 characters!'
      }
    }
    if (!formEmail.test(employeeEmail)) {
      return {
        code: '',
        params: 'Valid email is required: ex@abc.xyz'
      }
    }
    return null;
  }

  static ValidEmaill(c: AbstractControl): MessageResponseComponent | null {
    const employeeEmail = c.value
    const formEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!employeeEmail) {
      return {
        code: 'ER001',
        params: 'Please fill in your email address!'
      }
    }
    if (employeeEmail.length > 125) {
      return {
        code: 'ER006',
        params: 'Please enter your email address within 125 characters!'
      }
    }
    if (!formEmail.test(employeeEmail)) {
      return {
        code: '',
        params: 'Valid email is required: ex@abc.xyz'
      }
    }
    return null;
  }

  //check valid employeeLoginPassword
  static ValidPassword(c: AbstractControl): MessageResponseComponent | null {
    const loginPassword = c.value
    if (!loginPassword) {
      return {
        code: 'ER001',
        params: 'Please enter your password!'
      }
    }
    if (loginPassword.length < 5 || loginPassword.length > 50) {
      return {
        code: 'ER007',
        params: 'Password must be >5 <=50 characters'
      }
    }
    return null;
  }
  static ValidateForm(f : FormGroup): MessageResponseComponent | null {
    const loginEmail = f.controls['email'].value;
    const loginPassword = f.controls['password'].value;

    if (!loginEmail && !loginPassword) {
      return {
        code: 'ER002',
        params: 'Please enter your email and password!'
      };
    }
    return null;
  }

  //Check valid employeeLoginPasswordConfirm
  static validateConfirm(c: AbstractControl): MessageResponseComponent | null {
    const confirmPass = c.value 

    if (!confirmPass) {
      return {
        code: 'ER001',
        params: 'Vui lòng nhập mật khẩu xác nhận'
      }
    }
    if (confirmPass.length < 5 || confirmPass.length > 50) {
      return {
        code: 'ER007',
        params: 'Vui lòng nhập mật khẩu xác nhận >=5,<=50 chữ số.'
      }
    }
    return null;
  }

  // check valid employeeLoginPasswordConfirm trùng với employeeLoginPassword
  static ConfirmPassword(f: FormGroup): MessageResponseComponent | null {
    const password = f.controls['password'];
    const confirmPassword = f.controls['confirmPassword'];
    // Kiểm tra xem 2 trường nhập chưa
    if (!password || !confirmPassword) {
      return null;
    }
    if (password.value === confirmPassword.value || password.errors) {
      return null;
    } else {
      return {
        code: 'ER017',
        params: 'Mật khẩu xác nhận không trùng với mật khẩu'
      };
    }
  }
}
