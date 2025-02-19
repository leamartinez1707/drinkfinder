import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import LogoIcon from "../Icons/LogoIcon"
import { useAppStore } from "../../stores/useAppStore"

const Header = () => {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === '/', [pathname])
    const fetchCategories = useAppStore(state => state.fetchCategories)
    const categories = useAppStore(state => state.categories)
    const searchRecipies = useAppStore(state => state.searchRecipies)
    const showNotification = useAppStore(state => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'All fields are required',
                error: true
            })
            return
        }
        searchRecipies(searchFilters)
    }


    return (
        <header className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}>
            <div className='mx-auto container px-5 py-8'>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center">
                        <LogoIcon />
                        <h1 className="text-green-500 text-2xl font-semibold">Drink<span className="text-yellow-400">Finder</span></h1>
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? "text-yellow-400 uppercase font-bold" : "text-white uppercase font-bold"
                            }>Home</NavLink>

                        <NavLink
                            to='/favorites'
                            className={({ isActive }) =>
                                isActive ? "text-yellow-400 uppercase font-bold" : "text-white uppercase font-bold"
                            }>Favorites</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full md:w-1/2 2xl:  bg-gray-400/60 my-32 p-10 rounded-md shadow space-y-6">
                        <div>
                            <label
                                className="block text-white uppercase font-extrabold text-lg"
                                htmlFor="ingredient">Name or Ingredient</label>
                            <input
                                value={searchFilters.ingredient}
                                onChange={handleOnChange}
                                className="p-3 w-full rounded-md focus:outline-none"
                                type="text" name="ingredient" id="ingredient" placeholder="Name or ingredient. Ex: Vodka, Tequila" />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">Category</label>
                            <select
                                className="flex-1 p-3 w-full rounded-md focus:outline-none"
                                name="category"
                                id="category"
                                value={searchFilters.category}
                                onChange={handleOnChange}
                            >
                                <option value="">-- Select --</option>
                                {categories.drinks.map((category, index) => (
                                    <option key={index} value={category.strCategory}>{category.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input type="submit"
                            value={'Search recipes'}
                            className="cursor-pointer bg-amber-400 hover:amber-600 text-black font-bold w-full p-2 rounded-md uppercase"
                        />
                    </form>
                )}
            </div>
        </header >
    )
}

export default Header