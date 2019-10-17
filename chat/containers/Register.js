import React from 'react';
import { 
    StyleSheet, 
	View, 
	SafeAreaView,
	ImageBackground,
	KeyboardAvoidingView,
	Platform
} from 'react-native';
import {
	Input,
	Text,
	Button,
} from 'galio-framework'
import Toast, {DURATION} from 'react-native-easy-toast'

import background from '../assets/background5-rsz-2.png'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import firebase from '../config/firebaseSDK'

export default class Login extends React.Component {
	
  state = {
    name: '',
    email: '',
	password: '',
	imageURL: ''
  }

  componentDidMount() {
	this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);

    if (!result.cancelled) {
		this.uploadImage(result.uri)
    }
  };

  uploadImage = async (uri) => {
	const response = await fetch(uri)
	const blob = await response.blob()
	var ref = firebase.storage().ref().child(Date.now()+'.jpg');
	ref.put(blob).then((snapshot) => {
		snapshot
			.ref
		  .getDownloadURL()
		  .then((downloadURL) => {
			  console.log('File available at', downloadURL);
			  this.setState({
				  imageURL: downloadURL
			  })
			  this.refs.successToast.show('ganteng bang');
		  });
	  console.log('Uploaded a blob or file!');
	});
  }

  onChangeTextEmail = email => this.setState({ email });

  onChangeTextPassword = password => this.setState({ password });
  
  onChangeTextName = name => this.setState({ name })

  onPressRegister = () => {
	let {
		name, 
		email,
		password,
		imageURL
	} = this.state

	if(name === '') {
		this.refs.errorToast.show('please input your name')
	} else if(email === '') {
		this.refs.errorToast.show('please input your email')
	} else if(password === '') {
		this.refs.errorToast.show('please input your password')
	} else if(imageURL === '') {
		this.refs.errorToast.show('please choose your avatar')
	} else {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				console.log(
					'created user successfully. User email:' +
					email +
					' name:' +
					name
				);
				var userf = firebase.auth().currentUser;

				userf
					.updateProfile({ 
						displayName: name,
						photoURL: imageURL
					})
					.then(() => {
						console.log('Updated displayName successfully. name:' + name);
						this.props.navigation.navigate('Login')
						this.refs.successToast.show('User ' + name + ' was created successfully. Please login.')
					})
					.catch(error => {
						console.warn('Error update displayName.')
					})

			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage)
				alert(error.message)
			});
	}
  };

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
					<Toast 
						ref="errorToast"
						style={{backgroundColor:'red'}}
						position='top'
						positionValue={50}
						fadeInDuration={750}
						fadeOutDuration={2000}
						opacity={0.8}
					/>
					<Toast 
						ref="successToast"
						style={{backgroundColor:'green'}}
						position='top'
						positionValue={50}
						fadeInDuration={750}
						fadeOutDuration={2000}
						opacity={0.8}
					/>

					<View 
						style={{
							marginTop: 90,
							marginBottom: 35,
							height: 100,
							alignItems: 'center',
							justifyContent: 'center',
							flex: 1
					}}>
						<Text h3 style={{
							color: 'white'
						}}>REGISTER</Text>
					</View>
					<View
						style={{
							alignItems: 'center',
							flex: 5
						}}  
					>
						<View>
							<View>
								<Text style={styles.title}>Name:</Text>
							</View>
							<View>
								<Input
									style={styles.input}
									onChangeText={this.onChangeTextName}
									value={this.state.name}
									placeholder='TuyulGanteng69'
									keyboardAppearance='dark'
									bgColor='black'
									color='white'
									placeholderTextColor='white'
									returnKeyType={ "next" }
									autoFocus={true}
									rounded
									borderless
								/>
							</View>
							<View style={{
								marginTop: 25
							}}>
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
							onPress={this._pickImage}
							style={styles.uploadButton}
							shadowless={true}
							opacity={0.1}
							round
						>Choose avatar</Button>
					
						<Button
							onPress={this.onPressRegister}
							style={styles.registerButton}
							shadowColor="white"
							opacity={0.1}
							round
						>Submit</Button>
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
	registerButton: {
		backgroundColor: 'black',
		opacity: 0.4,
		color: 'black',
		marginTop: 30,
		width: 110
	},
	uploadButton: {
		backgroundColor: 'black',
		opacity: 0.4,
		color: 'black',
		marginTop: 30,
		width: 150
	},
})

