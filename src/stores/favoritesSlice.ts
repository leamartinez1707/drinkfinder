import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createNotificactionSlice, NotificationSliceType } from "./notificationSlice";
import { RecipiesSlicesType } from "./recipeSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleFavorite: (recipe: Recipe) => void
    loadFromStorage: () => void
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipiesSlicesType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],


    handleFavorite: (recipe) => {
        if (get().favorites.some(fav => fav.idDrink === recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(fav => fav.idDrink !== recipe.idDrink)
            }))

            createNotificactionSlice(set, get, api).showNotification({
                text: 'Removed from favorites',
                error: false
            })
        } else {
            set(state => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificactionSlice(set, get, api).showNotification({
                text: 'Added to favorites',
                error: false
            })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem('favorites')
        if (storeFavorites) {
            set({ favorites: JSON.parse(storeFavorites) })
        }
    }

})