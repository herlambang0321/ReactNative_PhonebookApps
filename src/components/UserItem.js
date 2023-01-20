import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import { updateUserAsync } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

export default function UserItem(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: props.user.name,
        phone: props.user.phone
    });

    const [edit, setEdit] = useState({
        isEdit: false
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

    const handleEdit = () => {
        setEdit({
            isEdit: true
        });
    }

    const handleCancel = () => {
        setEdit({
            isEdit: false
        });
    }

    const saveEdit = () => {
        dispatch(updateUserAsync({ id: props.user.id, name: user.name, phone: user.phone }))
        setEdit({
            isEdit: false
        });
    }

    return (
        <View style={styles.container}>
            <Text>{props.no}</Text>

            {/* {edit.isEdit ? */}
            <TextInput
                style={{ flex: 0.4, flexGrow: 2, alignContent: "space-between" }}
                name="name"
                onChangeText={name => setUser({ ...user, name })}
                defaultValue={user.name}
            />
            {/* :
            user.name */}
            {/* } */}

            {/* {edit.isEdit ? */}
            <TextInput
                style={{ flex: 0.4, flexGrow: 2, alignContent: "space-between" }}
                name="phone"
                onChangeText={phone => setUser({ ...user, phone })}
                defaultValue={user.phone}
            />
            {/* :
            user.phone */}
            {/* } */}

            {/* {props.sent ?
                edit.isEdit ? */}
            {/* <TouchableOpacity style="btn btn-primary" onPress={saveEdit}>
                            <View>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </View> save
                        </TouchableOpacity>
                        <TouchableOpacity style='btn btn-warning' onPress={handleCancel}>
                            <View>
                                <FontAwesomeIcon icon={faBan} />
                            </View> cancel
                        </TouchableOpacity> */}

            {/* : */}

            <TouchableOpacity style={styles.update} onPress={handleEdit}>
                <Text style={styles.labelButton}>
                    <View>
                        <FontAwesomeIcon style={styles.icons} icon={faPencil} />
                    </View> edit
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.remove} onPress={props.remove}>
                <Text style={styles.labelButton}>
                    <View>
                        <FontAwesomeIcon style={styles.icons} icon={faTrashCan} />
                    </View> delete
                </Text>
            </TouchableOpacity>

            {/* :

                    <TouchableOpacity style={styles.resend} onPress={props.resend}>
                        <View>
                            <FontAwesomeIcon icon={faRepeat} />
                        </View> resend
                    </TouchableOpacity>  */}
            {/* } */}
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // borderWidth: 2,
        // borderColor: '#636e72',
        // borderRadius: 10,
        // paddingBottom: 5,
        // paddingHorizontal: 0,
        // width: '100%',
        // marginVertical: 10

        margin: -20,
        paddingHorizontal: 0,
        marginVertical: 2,
        height: 50,
        borderWidth: 3,
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#f1f5f9",
        justifyContent: "space-between",
        alignItems: "center"
    },
    update: {
        height: 40,
        padding: 8,
        backgroundColor: "#22c55e",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    },
    remove: {
        height: 40,
        padding: 8,
        backgroundColor: "#ef4444",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    },
    resend: {
        height: 40,
        width: 75,
        backgroundColor: "#eab308",
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