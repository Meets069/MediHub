export interface ForgotPassword {
    email: string;
  }
  
  export interface ValidateOtp {
    email: string;
    otp: string;
  }
  
  export interface ResetPassword {
    email: string;
    password: string;
  }
  