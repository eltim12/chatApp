import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import firebase from '../config/firebaseSDK'

export default class Home extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.toLoginPage()
        }, 3000);
    }

    toLoginPage = () => {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                this.props.navigation.navigate('Login')

                // if (!user) {
                //     setTimeout(() => {
                //         this.props.navigation.navigate('Login')
                //     }, 3000)
                // } else {
                //     console.log('masok sini brok')
                //     setTimeout(() => {
                //         this.props.navigation.navigate('Chat', {
                //             uid: user.uid,
                //             name: user.displayName,
                //             email: user.email,
                //             avatar: user.photoURL
                //         });

                //     }, 3000)
                // }
            })
    }

    render() {
        return (
            <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: 'black' 
            }}>
                <Image
                    source={require('../assets/load3.gif')}
                    style={{
                        width: '100%',
                    }}
                />
            </View>
        )
    }
}