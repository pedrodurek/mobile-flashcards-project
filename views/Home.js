import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HomeOption from '@components/HomeOption'
import HeaderCards from '@components/HeaderCards'

class Home extends Component {
    static navigationOptions = () => ({
        header: (
            <HeaderCards
                title={'Home'}
                style={{ backgroundColor: '#E8E294' }}
            />
        )
    })

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ backgroundColor: '#FFFFBD', height: '100%' }}>
                <HomeOption
                    title="New Deck"
                    icon="add-circle-outline"
                    color="#E85123"
                    handle={() => navigate('NewDeck')}
                />
                <HomeOption
                    title="Decks"
                    icon="collections"
                    color="#8333FF"
                    handle={() => navigate('Decks')}
                />
                <HomeOption
                    title="Favourites"
                    icon="star-border"
                    color="#23E8C8"
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
