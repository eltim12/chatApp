import React from 'react';
import { 
	StyleSheet, 
	TextInput, 
	View,
	TouchableOpacity,
	SafeAreaView,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import {
	Input,
	Block,
	Text,
	Button
} from 'galio-framework'
import firebase from '../config/firebaseSDK'
import background from '../assets/background2-rsz.png'



export default class Login extends React.Component {
	
  state = {
    email: 'tuyul@ganteng.com',
	password: '12345678',
	focusDescriptionInput: false,
	inputs: {}
  }

  onPressLogin = () => {
	let email = this.state.email
	let password = this.state.password
	
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(({ user }) => {
			this.props.navigation.navigate('Chat', {
				uid: user.uid,
				name: user.displayName,
				email: this.state.email,
				avatar: user.photoURL
			});
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode, errorMessage)
			alert('email/password wrong.')
		});
	
  };

  onChangeTextEmail = email => this.setState({ email });

  onChangeTextPassword = password => this.setState({ password });

  render() {
    return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={{ flex: 1 }}
		>
			<ImageBackground 
				source={background}
				style={{
					height: '100%',
					width: '100%',
					resizeMode: "cover",
					overflow: "hidden",
					flex: 1
				}}
			>
			
				<SafeAreaView style={{
					flex: 1
				}}>
					<View 
						style={{
							marginTop: 90,
							marginBottom: 35,
							alignItems: 'center',
							justifyContent: 'center'
					}}>
						<Text h3 style={{
							color: 'white'
						}}>LOGIN</Text>
					</View>
					<View
						style={{
							alignItems: 'center',
						}}  
					>
						<View>
							<View>
								<Text style={styles.title}>Email:</Text>
							</View>
							<View>
								<Input
									style={styles.input}
									onChangeText={this.onChangeTextEmail}
									value={this.state.email}
									placeholder='mantul@santuy.com'
									keyboardAppearance='dark'
									bgColor='black'
									color='white'
									placeholderTextColor='white'
									autoFocus={true}
									returnKeyType={ "next" }
									rounded
									borderless
								/>
							</View>
							<View style={{
								marginTop: 25
							}}>
								<Text style={styles.title}>Password:</Text>
							</View>
							<View>
								<Input
									style={styles.input}					
									onChangeText={this.onChangeTextPassword}
									value={this.state.password}
									placeholder='Atleast 8 characters'
									keyboardAppearance='dark'
									bgColor='black'
									color='white'
									placeholderTextColor='white'
									returnKeyType={ "done" }
									password
									rounded
									borderless
								/>
							</View>
						</View>

						<Button
							onPress={this.onPressLogin}
							style={styles.buttons}
							shadowColor="white"
							opacity={0.1}
							round
						>LOGIN</Button>
					</View>
					<View
						style={{
							marginTop: 200,
							alignItems: 'center',
						}}
					>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Register')}
						>
							<Text
								color='blue'
								style={styles.link}
							>Create account</Text>
						</TouchableOpacity>
					</View>

				</SafeAreaView>
			
			</ImageBackground>
		</KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
	title: {
		marginLeft: 10,
		fontSize: 18,	
		color: 'white'
	},
	link: {
		fontSize: 17,
		color: 'white'
	},
	input: {
		width: 340,
		opacity: 0.4
	},
	buttons: {
		backgroundColor: 'black',
		opacity: 0.4,
		marginTop: 30,
		width: 110,
		fontWeight: "900"
	}
});