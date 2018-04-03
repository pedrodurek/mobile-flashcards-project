import React, { PureComponent } from 'react'
import HomeOption from '@components/HomeOption'
import { ItemSeparator, Container } from '@styles'
import { green } from '@colors'

class Home extends PureComponent {
    render() {
        const { navigate } = this.props.navigation
        return (
            <Container>
                <ItemSeparator />
                <HomeOption
                    title="New Deck"
                    icon="add-circle"
                    color={green}
                    handle={() => navigate('NewEditDeck')}
                />
                <ItemSeparator />
                <HomeOption
                    title="Decks"
                    icon="collections"
                    color={green}
                    handle={() => navigate('Decks')}
                />
                <ItemSeparator />
                <HomeOption
                    title="Favorites"
                    icon="star"
                    color={green}
                    handle={() => navigate('Quiz', { isFavorite: true })}
                />
                <ItemSeparator />
            </Container>
        )
    }
}

export default Home
