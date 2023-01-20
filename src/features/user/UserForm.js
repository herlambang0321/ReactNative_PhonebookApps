import React, { useCallback, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons/faRotateLeft'
import { useDispatch } from 'react-redux'

import {
    create,
    searchUserData
} from './userSlice';

export default function UserForm(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    // const handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     setUser({
    //         ...user,
    //         [name]: value
    //     });
    // }

    const handleSubmit = useCallback(() => {
        dispatch(create(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    const handleSearch = useCallback(() => {
        dispatch(searchUserData({ name: user.name, phone: user.phone }))
    }, [dispatch, user])

    const handleCancel = () => {
        if (!props.fontlabel) {
            props.cancel()
        }
        setUser({ name: '', phone: '' })
    }

    return (
        // <div>
        <View style={{}}>
            {/* <div className="card-header"> */}
            <Text style={styles.title}>{props.fontlabel || 'Adding Form :'}</Text>
            {/* </View> */}
            <View style={{ display: "flex", width: "100%", flexDirection: "column", alignContent: "flex-start" }}>
                <TextInput
                    style={{ height: 40, borderWidth: 1, margin: 20, marginVertical: 2, borderRadius: 5 }}
                    placeholder="name"
                    onChangeText={name => setUser({ ...user, name })}
                    defaultValue={user.name}
                />

                <TextInput
                    style={{ height: 40, borderWidth: 1, margin: 20, marginVertical: 2, borderRadius: 5 }}
                    placeholder="phone"
                    onChangeText={phone => setUser({ ...user, phone })}
                    defaultValue={user.phone}
                />
                {/* {
                    props.submitLabel ? */}
                {/* <TouchableOpacity style={styles.submit}>
                            <Text style={styles.labelButton}>
                                <View>
                                    <FontAwesomeIcon style={styles.icons} icon={faMagnifyingGlass} />
                                </View> {props.submitLabel || ' save'}
                            </Text>
                        </TouchableOpacity> */}
                {/* : */}
                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.labelButton}>
                        <View>
                            <FontAwesomeIcon style={styles.icons} icon={faCircleCheck} />
                        </View> {props.submitLabel || ' save'}
                    </Text>
                </TouchableOpacity>
                {/* } */}
                <TouchableOpacity style={styles.submit} onPress={handleCancel}>
                    <Text style={styles.labelButton}>
                        <View>
                            <FontAwesomeIcon style={styles.icons} icon={faBan} />
                        </View> cancel
                    </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                        <Text style={styles.labelButton}>
                            <View>
                                <FontAwesomeIcon style={styles.icons} icon={faCircleCheck} />
                            </View>  Save
                        </Text>
                    </TouchableOpacity> */}

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        textAlign: "center",
        marginVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: "#9ca3af",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    submit: {
        width: "100%",
        padding: 5,
        backgroundColor: "#3b82f6",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    labelButton: {
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        color: '#ffffff'
    },
    icons: {
        color: '#ffffff'
    }
});