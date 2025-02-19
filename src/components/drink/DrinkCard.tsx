import { useAppStore } from '../../stores/useAppStore'
import type { Drink } from '../../types'

type DrinkCardProps = {
    drink: Drink
}
const DrinkCard = ({ drink }: DrinkCardProps) => {

    const selectRecipe = useAppStore(state => state.selectRecipe)
    return (
        <div className='shadow-lg rounded-lg border'>
            <div className='overflow-hidden'><img
                className='hover:scale-125 duration-300 hover:rotate-2 transition-transform'
                src={drink.strDrinkThumb} alt={drink.strDrink} />
            </div >

            <div className='p-5'>
                <h2 className='text-2xl truncate font-semibold'>{drink.strDrink}</h2>
                <button
                    onClick={() => selectRecipe(drink.idDrink)}
                    className='bg-amber-500 hover:bg-amber-800 text-white text-xl mt-5 w-full p-3 font-semibold'
                >Show Recipe</button>
            </div>
        </div >
    )
}

export default DrinkCard