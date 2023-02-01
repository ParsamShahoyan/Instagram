
import {combineReducers, configureStore} from '@reduxjs/toolkit' 
import { postsReducers } from './slices/posts/postsSlice'
import { searchReducer } from './slices/search/searchSlice'
import { usersReducer } from './slices/users/usersSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'www.insts',
    storage,
}
const rootReducer = combineReducers(
    {
        posts: postsReducers,
        users: usersReducer,
        search: searchReducer
    }
)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store