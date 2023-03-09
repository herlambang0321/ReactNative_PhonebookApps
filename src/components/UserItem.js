import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import { updateUserAsync } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import Modal from "react-native-modal";

export default function UserItem(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: props.user.name,
        phone: props.user.phone,
        modal: false
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

    const handleModal = () => {
        setUser({
            name: props.user.name,
            phone: props.user.phone,
            modal: true
        });
    }

    const cancelModal = () => {
        setUser({
            name: props.user.name,
            phone: props.user.phone,
            modal: false
        });
    }

    return (
        <View style={styles.container}>
            <Text style={{ margin: 4, color: "#000000" }}>{props.no}</Text>
            <View>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        marginBottom: 2
                    }}
                    source={require('../../src/assets/image/user-01.png')}
                />
            </View>
            {
                edit.isEdit ?
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={{ flex: 1, margin: 2, padding: 2, color: "#000000" }}
                            onChangeText={name => setUser({ ...user, name })}
                            defaultValue={user.name}
                        />
                        <TextInput
                            style={{ flex: 1, margin: 2, padding: 2, color: "#000000" }}
                            onChangeText={phone => setUser({ ...user, phone })}
                            defaultValue={user.phone}
                        />
                    </View>
                    :
                    <View style={{ flex: 1, margin: 2, padding: 2 }}>
                        <Text style={{ color: "#000000" }}>
                            {user.name}
                        </Text>
                        <Text style={{ color: "#000000" }}>
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
                                    </View>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submitCancel} onPress={handleCancel}>
                                <Text style={styles.labelButton}>
                                    <View>
                                        <FontAwesomeIcon style={[styles.icons, { transform: [{ rotate: '90deg' }] }]} icon={faBan} />
                                    </View>
                                </Text>
                            </TouchableOpacity>
                        </Fragment>
                        :
                        <Fragment>
                            <TouchableOpacity style={styles.update} onPress={handleEdit}>
                                <Text style={styles.labelButton}>
                                    <View>
                                        <FontAwesomeIcon style={styles.icons} icon={faPencil} />
                                    </View>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.remove} onPress={handleModal}>
                                <Text style={styles.labelButton}>
                                    <View>
                                        <FontAwesomeIcon style={styles.icons} icon={faTrashCan} />
                                    </View>
                                </Text>
                            </TouchableOpacity>
                        </Fragment>
                    :
                    <TouchableOpacity style={styles.resend} onPress={props.resend}>
                        <Text style={styles.labelButton}>
                            <View>
                                <FontAwesomeIcon style={styles.icons} icon={faRepeat} />
                            </View>
                        </Text>
                    </TouchableOpacity>
            }

            <View style={{}}>
                <Modal isVisible={user.modal}>
                    <View
                        style={{
                            backgroundColor: '#ffffff',
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            borderRadius: 6,
                        }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 10 }}>
                            <Image
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 75,
                                    borderWidth: 8,
                                    borderColor: '#ffffff',
                                    position: 'absolute',
                                    zIndex: 1,
                                }}
                                source={require('../../src/assets/image/phonebook.png')}
                            />
                        </View>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: '#272727',
                                textAlign: 'center',
                                fontSize: 16,
                                marginTop: 50,
                            }}>
                            Delete Confirmation
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#272727',
                            }}>
                            Are you sure, you want delete it?
                        </Text>
                        <Text style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#272727',
                        }}>
                            ` {user.name} `
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginHorizontal: 50,
                                    borderWidth: 1,
                                    width: 50,
                                    height: 30,
                                    backgroundColor: '#ffc107',
                                    borderRadius: 5,
                                }} onPress={cancelModal}>
                                <Text
                                    style={{
                                        color: '#501d85',
                                        fontWeight: 'bold',
                                    }}>
                                    No
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginHorizontal: 50,
                                    borderWidth: 1,
                                    width: 50,
                                    height: 30,
                                    backgroundColor: '#dc3545',
                                    borderRadius: 5,
                                }} onPress={props.remove}>
                                <Text
                                    style={{
                                        color: '#501d85',
                                        fontWeight: 'bold',
                                    }}>
                                    Yes
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

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
        marginHorizontal: 2,
        height: 40,
        padding: 8,
        backgroundColor: "#0d6efd",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    submitCancel: {
        marginHorizontal: 2,
        height: 40,
        padding: 8,
        backgroundColor: "#ffc107",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    update: {
        marginHorizontal: 2,
        height: 40,
        padding: 8,
        backgroundColor: "#198754",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    },
    remove: {
        marginHorizontal: 2,
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