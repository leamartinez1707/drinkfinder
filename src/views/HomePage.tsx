import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/drink/DrinkCard"


const HomePage = () => {

    const drinks = useAppStore(state => state.drinks)

    const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])
    return (
        <div>
            <h1 className="font-bold text-4xl">Drinks</h1>

            {hasDrinks ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10">
                    {drinks.drinks.map(drink => (
                        <DrinkCard key={drink.idDrink} drink={drink} />
                    ))}
                </div>
            ) : <p className="my-10 text-center text-2xl">No drinks searched yet</p>}
        </div>
    )
}

export default HomePage