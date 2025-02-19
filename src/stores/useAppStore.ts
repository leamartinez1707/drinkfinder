import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipiesSlicesType } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";
import { createNotificactionSlice, NotificationSliceType } from "./notificationSlice";


// Crea una copia de set, get y api
// y le añade las propiedades de createRecipesSlie
export const useAppStore = create<RecipiesSlicesType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificactionSlice(...a)
})));

// Slice patterns

