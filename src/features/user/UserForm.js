import React, { useCallback, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus'
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck'
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
        <View style={{}}>
            <View>
                <Text style={styles.title}><FontAwesomeIcon icon={props.fontlabel ? faUserCheck : faUserPlus} />  {props.fontlabel || 'Adding Form :'}</Text>
            </View>
            <View style={{ display: "flex", width: "100%", flexDirection: "column", alignContent: "flex-start" }} onPress={props.fontlabel ? handleSearch : handleSubmit}>
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
                {
                    props.submitLabel ?
                        <TouchableOpacity style={styles.submitSearch} onPress={handleSearch}>
                            <Text style={styles.labelButton}>
                                <View>
                                    <FontAwesomeIcon style={styles.icons} icon={faMagnifyingGlass} />
                                </View> {props.submitLabel}
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                            <Text style={styles.labelButton}>
                                <View>
                                    <FontAwesomeIcon style={styles.icons} icon={faCircleCheck} />
                                </View> {props.submitLabel || ' save'}
                            </Text>
                        </TouchableOpacity>

                }
                <TouchableOpacity style={styles.submitCancel} onPress={handleCancel}>
                    <Text style={styles.labelButton}>
                        <View>
                            <FontAwesomeIcon style={[styles.icons, { transform: [{ rotate: '90deg' }] }]} icon={props.submitLabel ? faRotateLeft : faBan} />
                        </View> {props.submitLabel ? ' reset' : ' cancel'}
                    </Text>
                </TouchableOpacity>

                {props.submitLabel &&
                    <TouchableOpacity style={styles.submitCancel} onPress={props.cancelSeacrh}>
                        <Text style={styles.labelButton}>
                            <View>
                                <FontAwesomeIcon style={[styles.icons, { transform: [{ rotate: '90deg' }] }]} icon={faBan} />
                            </View>  Cancel
                        </Text>
                    </TouchableOpacity>
                }

            </View>
        </View >
    )

}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        marginVertical: 5,
        padding: 5,
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "#9ca3af",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    submit: {
        width: "100%",
        padding: 5,
        backgroundColor: "#0b5ed7",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    submitSearch: {
        width: "100%",
        padding: 5,
        backgroundColor: "#0dcaf0",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    submitCancel: {
        width: "100%",
        padding: 5,
        marginVertical: 2,
        backgroundColor: "#ffc107",
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