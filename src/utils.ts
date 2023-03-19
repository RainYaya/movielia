/*
 * @Author: RainYaya
 * @Date: 2023-03-19 11:41:22
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 11:41:33
 * @Description: 
 */
export const mergeClassName = (val1: string, val2?: string) => {
    return val1 + ' ' + (val2 || '')
  }