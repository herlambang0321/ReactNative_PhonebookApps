import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Fragment, useState } from 'react'
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
            <Text style={{ margin: 2 }}>{props.no}</Text>
            {
                edit.isEdit ?
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={{ flex: 1, margin: 2, padding: 2 }}
                            onChangeText={name => setUser({ ...user, name })}
                            defaultValue={user.name}
                        />
                        <TextInput
                            style={{ flex: 1, margin: 2, padding: 2 }}
                            onChangeText={phone => setUser({ ...user, phone })}
                            defaultValue={user.phone}
                        />
                    </View>
                    :
                    <View style={{ flex: 1, margin: 2, padding: 2 }}>
                        <Text>
                            {user.name}
                        </Text>
                        <Text>
                            {user.phone}
                        </Text>
                    </View>
            }
            {
                props.user.sent ?
                    edit.isEdit ?
                        <Fragment>
                            <TouchableOpacity style={styles.submitSave} onPress={saveEdit}>
                                <Text style={styles.labelButton}>
                                    <View>
                                        <FontAwesomeIcon style={styles.icons} icon={faCircleCheck} />
                                    </View> save
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submitCancel} onPress={handleCancel}>
                                <Text style={styles.labelButton}>
                                    <View>
                                        <FontAwesomeIcon style={[styles.icons, { transform: [{ rotate: '90deg' }] }]} icon={faBan} />
                                    </View> cancel
                                </Text>
                            </TouchableOpacity>
                        </Fragment>
                        :
                        <Fragment>
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
                        </Fragment>
                    :
                    <TouchableOpacity style={styles.resend} onPress={props.resend}>
                        <Text style={styles.labelButton}>
                            <View>
                                <FontAwesomeIcon style={styles.icons} icon={faRepeat} />
                            </View> resend
                        </Text>
                    </TouchableOpacity>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        elevation: 5,
        paddingHorizontal: 2,
        marginVertical: 2,
        height: 50,
        borderWidth: 3,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: "#f1f5f9",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeftWidth: 1,
        borderRightWidth: 3,
        borderTopWidth: 1
    },
    submitSave: {
        height: 40,
        padding: 8,
        backgroundColor: "#0d6efd",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    submitCancel: {
        height: 40,
        padding: 8,
        backgroundColor: "#ffc107",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    update: {
        height: 40,
        padding: 8,
        backgroundColor: "#198754",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    },
    remove: {
        height: 40,
        padding: 8,
        backgroundColor: "#dc3545",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    },
    resend: {
        height: 40,
        padding: 8,
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