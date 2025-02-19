import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, JSX } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Recipe } from '../../types';

export default function Modal() {
    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state) => state.closeModal)
    const recipe = useAppStore((state) => state.selectedRecipe)
    const handleFavorite = useAppStore((state) => state.handleFavorite)

    const isFavorite = useAppStore((state) => state.favorites.some(fav => fav.idDrink === recipe.idDrink))

    const renderIngredients = () => {
        const ingredients: JSX.Element[] = []
        for (let i = 1; i < 6; i++) {
            const ingredient = recipe[`strIngredient${i}` as keyof Recipe]
            const measure = recipe[`strMeasure${i}` as keyof Recipe]

            if (ingredient && measure) {
                ingredients.push(
                    <li key={i} className="text-gray-900 text-lg font-normal">
                        {ingredient} - {measure}
                    </li>
                )
            }
        }
        return ingredients
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                                    <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {recipe.strDrink}
                                    </DialogTitle>
                                    <img
                                        className='w-full h-96 object-fill'
                                        src={recipe.strDrinkThumb} alt={`Imágen de ${recipe.strDrink}`} />
                                    <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instructions
                                    </DialogTitle>
                                    <p>{recipe.strInstructions}</p>
                                    <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredients
                                    </DialogTitle>
                                    {renderIngredients()}

                                    <div className='flex mt-5 justify-between gap-4'>
                                        <button
                                            onClick={() => handleFavorite(recipe)}
                                            className='w-full rounded bg-amber-500 hover:bg-amber-600 p-3 font-semibold uppercase text-white shadow'
                                        >{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</button>
                                        <button
                                            onClick={closeModal}
                                            className='w-full rounded bg-gray-800  hover:bg-gray-900 p-3 font-semibold uppercase text-white shadow'
                                        >Close</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}