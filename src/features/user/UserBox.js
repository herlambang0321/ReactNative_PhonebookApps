import React, { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function UserBox(props) {

    const [add, setAdd] = useState({
        showAdd: false,
    });

    const [search, setSearch] = useState({
        showSearch: false,
    });

    const hiddenAddUser = () => {
        setAdd({
            showAdd: false
        })
    }

    const showAddUser = () => {
        setAdd({
            showAdd: true
        })
    }

    const hiddenSearchUser = () => {
        setSearch({
            showSearch: false
        })
    }

    const showSearchUser = () => {
        setSearch({
            showSearch: true
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    <FontAwesomeIcon style={{}} icon={faAddressBook} />  Phone Book Apps
                </Text>
            </View>
            <View style={{}}>
                {
                    add.showAdd ?
                        <UserForm cancel={hiddenAddUser} />
                        :
                        <TouchableOpacity style={styles.add} onPress={() => showAddUser()}>
                            <Text style={styles.labelButton}>
                                <View>
                                    <FontAwesomeIcon style={styles.icons} icon={faPlus} />
                                </View> add
                            </Text>
                        </TouchableOpacity>
                }
                {
                    search.showSearch ?
                        <UserForm cancelSeacrh={hiddenSearchUser} submitLabel=" search" fontlabel="Search Form :" />
                        :
                        <TouchableOpacity style={styles.search} onPress={() => showSearchUser()}>
                            <Text style={styles.labelButton}>
                                <View>
                                    <FontAwesomeIcon style={styles.icons} icon={faMagnifyingGlass} />
                                </View> search
                            </Text>
                        </TouchableOpacity>
                }
            </View>
            <UserList />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: '#DCDCDC',
        padding: 15,
        height: "100%"
    },
    title: {
        padding: 10,
        textAlign: "center",
        fontSize: 20,
        fontWeight: '900',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        backgroundColor: "#9ca3af",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    add: {
        marginVertical: 5,
        marginRight: "auto",
        padding: 5,
        display: "flex",
        backgroundColor: "#0d6efd",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    search: {
        marginRight: "auto",
        padding: 5,
        display: "flex",
        backgroundColor: "#0dcaf0",
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