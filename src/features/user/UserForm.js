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
            <Text>{props.fontlabel || 'Adding Form'}</Text>
            {/* </View> */}
            <View style={{ display: "flex", width: "100%", flexDirection: "column", alignContent: "flex-start" }} onPress={props.fontlabel ? handleSearch : handleSubmit}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="name"
                    onChangeText={name => setUser({ ...user, name })}
                    defaultValue={user.name}
                />

                <TextInput
                    style={{ height: 40 }}
                    placeholder="phone"
                    onChangeText={phone => setUser({ ...user, phone })}
                    defaultValue={user.phone}
                />

                {/* <div className="d-flex justify-content me-5">
                <div className="d-flex align-items-center">
                    <label htmlFor="name">Name</label>
                </div>
                <div className="d-flex col-sm-2">
                    <input type="text" className="form-control" id="name" name="name" placeholder="name"
                        onChange={handleInputChange} value={user.name} />
                </div>
                <div className="d-flex align-items-center">
                    <label htmlFor="phone">Phone</label>
                </div>
                <div className="d-flex col-sm-2">
                    <input type="text" className="form-control" id="phone" name="phone" placeholder="phone"
                        onChange={handleInputChange} value={user.phone} />
                </div> */}
                {
                    props.submitLabel ?
                        <TouchableOpacity style={styles.submit}>
                            <Text style={styles.labelButton}>
                                <View>
                                    <FontAwesomeIcon style={styles.icons} icon={faMagnifyingGlass} />
                                </View> {props.submitLabel || ' save'}
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
                <TouchableOpacity style={styles.submit} onPress={handleCancel}>
                    <Text style={styles.labelButton}>
                        <View>
                            <FontAwesomeIcon style={styles.icons} icon={props.submitLabel ? faRotateLeft : faBan} />
                        </View> {props.submitLabel ? ' reset' : ' cancel'}
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