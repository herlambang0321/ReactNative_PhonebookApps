import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import UserItem from "../../components/UserItem"

import {
    loadUserAsync,
    selectUser,
    removeUserAsync,
    addUserAsync,
    loadmoreUser,
} from './userSlice';

export default function UserList(props) {

    const users = useSelector(selectUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUserAsync())
    }, [dispatch]);

    return (
        <View style={{ display: "flex", width: "100%" }}>
            <FlatList
                data={users}
                renderItem={({ item, index }) => (
                    <UserItem
                        key={item.id}
                        no={index + 1}
                        user={item}
                        remove={() => dispatch(removeUserAsync(item.id))}
                        resend={() => dispatch(addUserAsync({ id: item.id, name: item.name, phone: item.phone }))}
                    />
                )}
                keyExtractor={(item) => item.id}
                onEndReached={() => dispatch(loadmoreUser())}
                onEndReachedThreshold={0.5}
                style={{ maxHeight: 200 }}
            />
        </View>
    )

}
