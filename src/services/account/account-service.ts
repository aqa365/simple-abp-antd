import { request } from 'umi';

import { RegisterDto } from '@/services/account/dtos/RegisterDto'

import { IdentityUserDto } from '@/services/account/dtos/IdentityUserDto'

import { SendPasswordResetCodeDto } from '@/services/account/dtos/SendPasswordResetCodeDto'

import { ResetPasswordDto } from '@/services/account/dtos/ResetPasswordDto'

import { ConfirmPhoneNumberInput } from '@/services/account/dtos/ConfirmPhoneNumberInput'

import { ConfirmEmailInput } from '@/services/account/dtos/ConfirmEmailInput'

export default {

register: async (input:RegisterDto, options?: { [key: string]: any }) => {
  return request<IdentityUserDto>(`api/account/register`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

sendPasswordResetCode: async (input:SendPasswordResetCodeDto, options?: { [key: string]: any }) => {
  return request<any>(`api/account/send-password-reset-code`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

resetPassword: async (input:ResetPasswordDto, options?: { [key: string]: any }) => {
  return request<any>(`api/account/reset-password`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

sendPhoneNumberConfirmationToken: async ( options?: { [key: string]: any }) => {
  return request<any>(`api/account/send-phone-number-confirmation-token`, {
    method: 'POST',
    
    
    ...(options || {}),
  });
},

confirmPhoneNumber: async (input:ConfirmPhoneNumberInput, options?: { [key: string]: any }) => {
  return request<any>(`api/account/confirm-phone-number`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

confirmEmail: async (input:ConfirmEmailInput, options?: { [key: string]: any }) => {
  return request<any>(`api/account/confirm-email`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

}
