import { useMemo } from "react"
import DrinkCard from "../components/drink/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

const FavoritesPage = () => {

    const favorites = useAppStore(state => state.favorites)

    const hasFavorites = useMemo(() => favorites.length, [favorites])
    return (
        <div className="p-2">
            <h1 className="text-5xl font-semibold">My favorites</h1>

            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-10">
                    {favorites.map((favorite) => (
                        <DrinkCard key={favorite.idDrink} drink={favorite} />
                    ))}

                </div>
            )
                : (

                    <p className="mt-10 font-semibold text-xl text-center">There's not favorites saved</p>
                )
            }
        </div>
    )
}

export default FavoritesPage