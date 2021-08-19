import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Container, Item, Divider, Grid, Header, Segment, Button } from 'semantic-ui-react'



class Question extends Component {
    handleRedirectToPoll=(e)=>{
        e.preventDefault()
        const { id } = this.props
        this.props.history.push(`/questions/${id}`)
    }

    render () {
        const { question, author} = this.props
        const { avatarURL, name } = author
        return (
            <div>
                <Container style={{marginTop: '32px', width: 540}} >
                    <Grid inverted stackable columns='equal' >
                        <Grid.Row >
                            <Grid.Column >
                                <Header color='blue' attached = 'top' block as='h2'>{name} Asks: </Header>
                                <Segment attached>
                                    <Item.Group>
                                        <Item>
                                        <Item.Image size='small' src={avatarURL} alt={`${name}'s picture`} />
                                        <Item.Content verticalAlign='bottom'>
                                            <Item.Header>Would You Rather ?</Item.Header>
                                            <Item.Description>...{question.optionOne.text} or ...</Item.Description>
                                            <Divider horizontal></Divider>
                                            <Item.Extra>
                                                <Button onClick={this.handleRedirectToPoll} primary fluid >View Poll</Button>
                                            </Item.Extra>
                                        </Item.Content>
                                        </Item>
                                    </Item.Group>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

function mapStateToProps ({ questions, users }, {id, toViewPoll}) {
    const question = questions[id]
    const author = question ? users[question.author] : null

    return {
        question,
        id,
        author,
        toViewPoll
    }
}

export default withRouter(connect(mapStateToProps)(Question))