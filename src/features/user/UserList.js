import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import UserItem from "../../components/UserItem"

import {
    loadUserAsync,
    selectUser,
    removeUserAsync,
    addUserAsync,
    // loadmoreUser,
} from './userSlice';

export default function UserList(props) {

    const users = useSelector(selectUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUserAsync())
    }, [dispatch]);

    // const scrolled = (event) => {
    //     var element = event.target;
    //     if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    //         dispatch(loadmoreUser())
    //     }
    // }

    return (
        <View style={{ display: "flex", padding: 20 }}>
            {users.map((user, index) => {
                return (
                    <UserItem
                        key={user.id}
                        no={index + 1}
                        user={user}
                        sent={user.sent}
                        remove={() => dispatch(removeUserAsync(user.id))}
                        resend={() => dispatch(addUserAsync({ id: user.id, name: user.name, phone: user.phone }))}
                    />
                )
            })}
        </View>
    )

}
