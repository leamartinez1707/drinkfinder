import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import Modal from "../components/modal/Modal"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/notification/Notification"

const MainLayout = () => {

    const getFavoritesFromStorage = useAppStore(state => state.loadFromStorage)

    useEffect(() => {
        getFavoritesFromStorage()
    }, [])
    return (
        <div className="flex flex-col">
            <Header />
            <main className="container min-h-screen mx-auto py-16">
                <Outlet />
            </main>
            <Modal />
            <Notification />
            <footer className="flex bottom-0 w-full justify-center">Este es el footer</footer>
        </div>
    )
}

export default MainLayout