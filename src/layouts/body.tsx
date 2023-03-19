import { Route, Routes } from "react-router-dom"
import { Catalog } from "../pages/catalog"
import { Home } from "../pages/home"

/*
 * @Author: RainYaya
 * @Date: 2023-03-19 11:25:33
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 16:06:41
 * @Description: 
 */
export const Body = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movies" element={<Catalog type="movie" />}></Route>
            <Route path="/tv" element={<Catalog type="tv" />}></Route>
            <Route path="/search" element={<Catalog type="search" />}></Route>
     </Routes>
    )
}
