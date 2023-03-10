import React, { useEffect } from "react";
import { FlatList, View, KeyboardAvoidingView, Platform } from "react-native";
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={users}
                    initialNumToRender={7}
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
                    style={{ maxHeight: 540 }}
                />
            </View>
        </KeyboardAvoidingView>
    )

}
