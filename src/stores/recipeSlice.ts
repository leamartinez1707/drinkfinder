import { StateCreator } from "zustand"
import { getCategories, getRecipieDataById, getRecipies } from "../services/RecipeService"
import type { Categories, Drink, Drinks, SearchFilter, Recipe } from "../types"

export type RecipiesSlicesType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    closeModal: () => void
    fetchCategories: () => Promise<void>
    searchRecipies: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => void
}

export const createRecipesSlice: StateCreator<RecipiesSlicesType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,


    fetchCategories: async () => {
        const categories = await getCategories()
        set({ categories })
    },

    searchRecipies: async (searchFilter) => {
        const drinks = await getRecipies(searchFilter)
        set({ drinks })
    },

    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipieDataById(id)
        set({ selectedRecipe, modal: true })
    },

    closeModal: () => {
        set({ modal: false, selectedRecipe: {} as Recipe })
    }

})