import React, { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook'
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function UserBox(props) {

    const [add, setAdd] = useState({
        showAdd: false,
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

    return (
        // <div className="container">
        //     <div className="card">
        //         <div className="card-header text-center">
        //             <h1>Phone Book Apps</h1>
        //         </div>
        //     </div>
        //     <div className="card-body mt-3">
        //         {add.showAdd ? <UserForm cancel={hiddenAddUser} /> : <button type="submit" className="btn btn-primary" onClick={() => showAddUser()}><FontAwesomeIcon icon={faPlus} /> add</button>}
        //     </div>
        //     <div className="card-body mt-3">
        //         <UserForm
        //             submitLabel=" search" fontlabel="Search Form"
        //         />
        //     </div>
        //     <UserList />
        // </div>

        <View style={styles.container}>
            {/* <UserList /> */}
            <View>
                <Text style={styles.title}>
                    <FontAwesomeIcon icon={faAddressBook} />
                    {/* <div className="card-header text-center"> */}
                    Phone Book Apps
                </Text>
                {/* </div> */}
            </View>
            {/* <UserForm /> */}
            <View>
                {
                    add.showAdd ?
                        <UserForm cancel={hiddenAddUser} />
                        :
                        // <TouchableOpacity onPress={() => showAddUser()}>
                        //     <Text style={styles.add}>
                        //         <View style={styles.labelButton}>
                        //             <FontAwesomeIcon style={styles.icons} icon={faPlus} />
                        //         </View> add
                        //     </Text>
                        // </TouchableOpacity >

                        <TouchableOpacity style={styles.add} onPress={() => showAddUser()}>
                            <Text style={styles.labelButton}>
                                <View>
                                    <FontAwesomeIcon style={styles.icons} icon={faPlus} />
                                </View> add
                            </Text>
                        </TouchableOpacity>
                }
            </View >
            <View>
                <UserForm
                    submitLabel=" search"
                    fontlabel="Search Form"
                />
            </View>
            <UserList />
        </View >
    )

}

const styles = StyleSheet.create({
    container: { display: "flex", margin: 0, padding: 20 },
    title: {
        padding: 5,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: "#9ca3af",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5
    },
    add: {
        padding: 5,
        display: "flex",
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