import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Grid, Header, Item, Label, Segment, Icon, Progress } from 'semantic-ui-react'

class PollResault extends Component {
    render() {
        const {question, user, userVote } = this.props
        const { name, avatarURL } = user
        if (question === 'undefined' || user === null) {
            return <Redirect exact to='/error' />
        }
        
        let votes_sum = 0
        let firstQuestionPercentage = 0
        let secondQuestionPercentage = 0

        const firstQuestionVotes = question.optionOne.votes.length
        const secondQuestionVotes = question.optionTwo.votes.length
        
        votes_sum = firstQuestionVotes + secondQuestionVotes

        firstQuestionPercentage = Math.round( (firstQuestionVotes*100) / (votes_sum) * 100) / 100
        secondQuestionPercentage= Math.round( (secondQuestionVotes*100) / (votes_sum) * 100) / 100
        return (
            <Container style={{marginTop: '32px', width: 800}}>
                <Grid stackable columns='equal' divided verticalAlign='middle' >
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h2' attached='top' block>{name} Asks:</Header>
                            <Segment attached>
                                <Item.Group relaxed>
                                    <Item>
                                        <Item.Image size = 'small' src={avatarURL} />
                                        <Item.Content>
                                            <Item.Header>Resaults:</Item.Header>
                                            <Item.Description>
                                                <Segment>
                                                    <Header>
                                                        {userVote === 'optionOne'
                                                            ? (<Label color='blue' corner><Icon name='check' /></Label>) 
                                                            : ''
                                                        }
                                                    <Header.Content>Option one</Header.Content>
                                                    </Header>
                                                    <Progress percent ={firstQuestionPercentage} progress color='blue'  />
                                                    <div>{firstQuestionVotes} out of {votes_sum} votes</div>
                                                </Segment>
                                                <Segment>
                                                    <Header>
                                                    {userVote === 'optionTwo'
                                                            ? (<Label color='blue' corner><Icon name='check' /></Label>) 
                                                            : ''
                                                        }
                                                    <Header.Content>Option two</Header.Content>
                                                    </Header>
                                                    <Progress percent ={secondQuestionPercentage} progress color='blue'  />
                                                    <div>{secondQuestionVotes} out of {votes_sum} votes</div>
                                                </Segment>
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}, props) {
    const questionId = props.id
    const question = questions[questionId]
    const user = question ? users[question.author] : null

    const userVote = users[authedUser].answers.hasOwnProperty(questionId) ? users[authedUser].answers[questionId] : ''
    return {
        question,
        user,
        userVote
    }
}

export default  connect(mapStateToProps)(PollResault)