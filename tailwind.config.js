/*
 * @Author: RainYaya
 * @Date: 2023-03-19 10:53:02
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 15:48:15
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        header: '#292841',
        body: '#1C1B29',
      },
      screens: {
        'mobile': {
          max: '768px'
        }
      }
    },    
    plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')], 
  },
}
