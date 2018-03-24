import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HomeOption from '@components/HomeOption'
import HeaderCards from '@components/HeaderCards'
import { ItemSeparator } from '@styles'

class Home extends Component {
    static navigationOptions = () => ({
        header: (
            <HeaderCards
                title={'Home'}
            />
        )
    })

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{backgroundColor: '#C0C0FF', height: '100%' }}>
                <ItemSeparator />
                <HomeOption
                    title="New Deck"
                    icon="add-circle-outline"
                    color="#43A047"
                    handle={() => navigate('NewEditDeck')}
                />
                <ItemSeparator />
                <HomeOption
                    title="Decks"
                    icon="collections"
                    color="#8333FF"
                    handle={() => navigate('Decks')}
                />
                <ItemSeparator />
                <HomeOption
                    title="Favourites"
                    icon="star-border"
                    color="#E85123"
                />
                <ItemSeparator />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
