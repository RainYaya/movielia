/*
 * @Author: RainYaya
 * @Date: 2023-03-19 15:58:44
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 16:01:31
 * @Description:
 */

import { MediaType } from '../types'

interface Props {
  type: MediaType | 'search'
}

export const Catalog = (props: Props) => {
  return <div>{props.type}</div>
}
