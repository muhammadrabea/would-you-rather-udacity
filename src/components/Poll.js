import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Form, Radio, Container, Item, Grid, Header, Segment, Button } from 'semantic-ui-react'
import { handleAddAnswer } from '../actions/questions'



class Poll extends Component {
    state = {
        answer: '',
        viewAnswer: false,
    }

    handleChange = (e, target) => {
        this.setState({answer: target.value})
        console.log('answer:',this.state.answer)
        console.log('authedUser:',this.props.authedUser)
        console.log('qid:', this.props.question.id)
    }
    handleSubmit = (e) => {
        e.preventDefault() 
        const  { answer }  = this.state
        const { question, dispatch, authedUser } = this.props
        const qid = question.id
        dispatch(handleAddAnswer({authedUser, qid, answer}))
        this.setState(() => ({
            viewAnswer: true
        }))
    }
    render () {
        const { question, user, questionId } = this.props

        if(question==='undefined'|| user===null){
            return <Redirect exact to='/error'/>
        }
        
        const optionOne=question.optionOne.text
        const optionTwo=question.optionTwo.text
        const { avatarURL, name } = user
        const { answer, viewAnswer } = this.state
        if( viewAnswer === true){
            return <Redirect exact to={`/questions/${questionId}`} />
        }
        return (
            <div>
                <Container style={{marginTop: '32px', width: 540}} >
                    <Grid inverted stackable columns='equal' >
                        <Grid.Row >
                            <Grid.Column >
                                <Header color='blue' attached = 'top' block as='h2'>{name} Asks: </Header>
                                <Segment attached>
                                    <Item.Group relaxed>
                                        <Item>
                                        <Item.Image size='small' src={avatarURL} alt={`${name}'s picture`} />
                                        <Item.Content verticalAlign='middle'>
                                            <Item.Header>Would You Rather ?</Item.Header>
                                            <Item.Description>
                                                <Form >
                                                    <Form.Field>
                                                        <Radio
                                                            label={optionOne}
                                                            name='optionOne'
                                                            value='optionOne'
                                                            checked={answer === 'optionOne'}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <Radio 
                                                            label={optionTwo}
                                                            name='optionTwo'
                                                            value='optionTwo'
                                                            checked={answer === 'optionTwo'}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form.Field>
                                                    <Button color='blue' disabled={answer === ''} onClick={this.handleSubmit} >Submit</Button>
                                                </Form>
                                            </Item.Description>
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
function mapStateToProps ({authedUser, questions, users}, props) {
    const questionId = props.id
    const question = questions[questionId]
    const user = question ? users[question.author] : null
    return {
        questionId,
        question,
        authedUser,
        user
    }
}

export default withRouter(connect(mapStateToProps)(Poll))
