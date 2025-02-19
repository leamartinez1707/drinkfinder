import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

const FavoritesPage = lazy(() => import("../views/FavoritesPage"))
const HomePage = lazy(() => import("../views/HomePage"))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={
                        <Suspense fallback="Cargando..">
                            <HomePage />
                        </Suspense>
                    } index />

                    <Route path="/favorites" element={
                        <Suspense fallback="Cargando..">
                            <FavoritesPage />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter