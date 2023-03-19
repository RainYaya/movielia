import { Body } from "../layouts/body"
import { Footer } from "../layouts/footer"
import { Header } from "../layouts/header"

/*
 * @Author: RainYaya
 * @Date: 2023-03-19 11:01:43
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 11:26:33
 * @Description: 
 */
export const AppContrainer = () => {
    return (
        <>
            {/* header */}
            <Header />
            {/* body */}
            <Body />
            {/* fotter */}
            <Footer />
        </>
    )
}