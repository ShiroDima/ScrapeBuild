import { combineReducers, configureStore } from "@reduxjs/toolkit"
import workflowReducer from "@/state/workflow-slice"


export const rootReducer = combineReducers({
    workflows: workflowReducer
})

const store = configureStore({
    reducer: rootReducer,
},
)


export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;


export default store;