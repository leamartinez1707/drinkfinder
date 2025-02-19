import axios from "axios"
import { CategoriesApiResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../schemas/recipies-schema"
import { Drink, SearchFilter } from "../types"

export const getCategories = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const result = CategoriesApiResponseSchema.safeParse(data)
    if (!result.success) {
        throw new Error(result.error.message)
    }
    return result.data;

}

export const getRecipies = async (filters: SearchFilter) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios(url)
    const result = DrinksAPIResponse.safeParse(data)
    if (!result.success) {
        throw new Error(result.error.message)
    }
    return result.data
}


export const getRecipieDataById = async (id: Drink['idDrink']) => {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if (!result.success) {
        throw new Error(result.error.message)
    }
    return result.data

}