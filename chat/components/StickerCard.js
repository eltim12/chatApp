import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'galio-framework'

export default class StickerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
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
                    onPress={() => this.handlePress()}
                >
                    <Card
                        flex
                        borderless
                        style={styles.card}
                        image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
                    >
                    </Card>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        marginRight: 5,
        marginLeft: 5
    }
})