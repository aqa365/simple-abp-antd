import { request } from 'umi';

import { MenuItemListResultDto } from '@/services/cms-kit-admin/dtos/MenuItemListResultDto'

import { MenuItemDto } from '@/services/cms-kit/dtos/MenuItemDto'

import { MenuItemCreateInput } from '@/services/cms-kit-admin/dtos/MenuItemCreateInput'

import { MenuItemUpdateInput } from '@/services/cms-kit-admin/dtos/MenuItemUpdateInput'

import { MenuItemMoveInput } from '@/services/cms-kit-admin/dtos/MenuItemMoveInput'

import { PageLookupInputDto } from '@/services/cms-kit-admin/dtos/PageLookupInputDto'

import { PageLookupPagedResultDto } from '@/services/cms-kit-admin/dtos/PageLookupPagedResultDto'

import { PageLookupDto } from '@/services/cms-kit-admin/dtos/PageLookupDto'

export default {

getList: async ( options?: { [key: string]: any }) => {
  return request<MenuItemListResultDto>(`api/cms-kit-admin/menu-items`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

get: async (id:string, options?: { [key: string]: any }) => {
  return request<MenuItemDto>(`api/cms-kit-admin/menu-items/${id}`, {
    method: 'GET',
    
    
    ...(options || {}),
  });
},

create: async (input:MenuItemCreateInput, options?: { [key: string]: any }) => {
  return request<MenuItemDto>(`api/cms-kit-admin/menu-items`, {
    method: 'POST',
    
    
        data:input,
        
    ...(options || {}),
  });
},

update: async (id:string,input:MenuItemUpdateInput, options?: { [key: string]: any }) => {
  return request<MenuItemDto>(`api/cms-kit-admin/menu-items/${id}`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

delete: async (id:string, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/menu-items/${id}`, {
    method: 'DELETE',
    
    
    ...(options || {}),
  });
},

moveMenuItem: async (id:string,input:MenuItemMoveInput, options?: { [key: string]: any }) => {
  return request<any>(`api/cms-kit-admin/menu-items/${id}/move`, {
    method: 'PUT',
    
    
        data:input,
        
    ...(options || {}),
  });
},

getPageLookup: async (input:PageLookupInputDto, options?: { [key: string]: any }) => {
  return request<PageLookupPagedResultDto>(`api/cms-kit-admin/menu-items/lookup/pages`, {
    method: 'GET',
    
        params:{...input},
        
    
    ...(options || {}),
  });
},

}
