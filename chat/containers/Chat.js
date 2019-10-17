import React from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { Root } from 'native-base'
import { firestore } from '../config/firebaseSDK'
import { Card } from 'galio-framework'
import StickerCard from '../components/StickerCard'
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';

console.disableYellowBox = true;

export default class Chat extends React.Component {

    state = {
        messages: [],
        displayName: '',
        id: '',
        imageUrl: '',
        showContainer: false,
        chatLoaded: false,
        stickers: []
    }
    
    componentWillMount() {
        if(this.props.navigation.state) {
            this.setState({
                id: this.props.navigation.state.params.uid,
                displayName: this.props.navigation.state.params.name,
                imageUrl: this.props.navigation.state.params.avatar
            })
        }

        firestore
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                messages = []
                snapshot.forEach((doc) => {
                    // console.log(doc.data())
                    messages.push({
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate()
                    })
                })
                setTimeout(() => {
                    this.setState({
                        messages,
                        chatLoaded: true,
                    })
                }, 5000)
                
            })
    }

    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#333336",
                    },
                    right: {
                        backgroundColor: "#2948d8",
                    }
                }}
                textStyle={{
                    right: {
                        color: "#ffffff",
                        fontSize: 14
                    },
                    left: {
                        color: "#ffffff",
                        fontSize: 14
                    }
                }}
            />
        )
    }

    renderInputToolbar = (props) => {
        return(
            <InputToolbar
                {...props}
                containerStyle={{ 
                    backgroundColor: "#1b1b1b",
                    borderWidth: 0.5,
                    borderColor: 'grey',
                    borderRadius: 25,
                }}
                keyboardAppearance="dark"
                placeholderTextColor="#ffffff"
                textInputStyle={{ 
                    color: "#fff", 
                }}
            />
        )
    }

    renderSend = (props) => {
        return(
            <Send
                {...props}
                containerStyle={{
                    borderWidth: 0,
                }}
            >
            </Send>
        )
    }
    
    renderActions = () => {
        return (
            <View style={{
                marginBottom: 11,
                marginLeft: 12
            }}>
                <TouchableOpacity onPress={() => this.containerOpen()}
                >
                    <Icon name="sticky-note" size={22} color="#4a82fc" />
                </TouchableOpacity>
            </View>
        )
    }

    containerOpen = () => {
        console.log('hello')
        let { stickers } = this.state
        if (stickers) {
            Keyboard.dismiss()
            this.setState({ showContainer: !this.state.showContainer })
        }
    }

    containerClose = () => {
        this.setState({ showContainer: false })
    }

    handlePress = (link) => {
        this.onSend([{
            "_id": Math.random(),
            "createdAt": new Date(),
            "text": '',
            "user": {
                _id: this.state.id,
                name: this.state.displayName,
                avatar: this.state.imageUrl
            }
        }], link)
    }

    onSend = (message = [], sendImage) => {
        if(sendImage) {
            message[0].image = sendImage
        } 
        
        else {

            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        }

        firestore
            .collection('messages')
            .add(message[0])
    }

    render() {
        let { showContainer, chatLoaded } = this.state

        if (!chatLoaded) {
            return (
                <View style={{ 
                        flex: 1, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        backgroundColor: 'black' 
                }}>
                    <Image
                        source={require('../assets/load2.gif')}
                        style={{
                            width: 350,
                            height: 350,
                        }}
                    />
                </View>
            )
        }

        return (
            <Root>
               
                <View
                    style={{
                            flex: 1,
                            backgroundColor: "#000000"
                    }}
                >
                
                <GiftedChat
                    messages = { this.state.messages }
                    onSend={messages => this.onSend(messages)}
                    renderBubble={this.renderBubble}
                    renderSend={this.renderSend}
                    renderInputToolbar = {this.renderInputToolbar}
                    renderUsernameOnMessage={true}
                    renderActions={this.renderActions}
                    isAnimated={true}
                    user = {{
                        _id: this.state.id,
                        name: this.state.displayName,
                        avatar: this.state.imageUrl
                    }}
                    textInputProps={{
                        autoFocus: true,
                        onFocus: this.containerClose
                    }}
                />
                    {
                        showContainer ? (
                            <View style={{
                                height: 300,
                            }}>
                                <ScrollView
                                    contentContainerStyle={{
                                        alignItems: 'center',
                                    }}
                                    horizontal={true}
                                    style={{
                                        marginTop: 20
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.handlePress("https://i.ibb.co/MBVdSJZ/kenrick.jpg")}
                                    >
                                        <Card
                                            flex
                                            borderless
                                            style={styles.card}
                                            image="https://i.ibb.co/MBVdSJZ/kenrick.jpg"
                                        >
                                        </Card>
                                    </TouchableOpacity>
                    
                                </ScrollView>
                            </View>
                        ) : null
                    }
            </View>
        </Root>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        marginRight: 5,
        marginLeft: 5
    }
})