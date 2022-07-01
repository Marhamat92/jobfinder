import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducers from "./reducer";
import initialState from "./store"


const UserProvider = ({ children }) => {

    const [data, setData] = useState();

// use below line to get data from mobile storage
    useEffect(() => {
        AsyncStorage.getItem('favoriteJobs').then(value => {
            if (value) {
                setData(JSON.parse(value));
            }
        })
    }, [])
// use above line to get data from mobile storage

    const store = createStore(reducers, data);

    return <Provider store={store}>{children}</Provider>;

}

export default UserProvider;