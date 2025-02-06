import {configureStore} from '@reduxjs/toolkit';
import informationReducer from './infromationslice';

const store = configureStore({
    reducer:{
        information: informationReducer,
    }
});


export default store;