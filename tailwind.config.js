/*
 * @Author: RainYaya
 * @Date: 2023-03-19 10:53:02
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 10:54:14
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        header: '#292841',
        body: '#1C1B29',
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp')
    ],
  },
}
