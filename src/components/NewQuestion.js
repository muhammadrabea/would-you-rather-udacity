import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Button, Divider, Grid, Header, Form, Input, Segment } from 'semantic-ui-react'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        firstOption: '',
        secondOption: '',
        route: false
    
    }

    handleFirstChange = (e, target) => {
        this.setState(() => ({
            firstOption: target.value
        }))
    }
    handleSecondChange = (e, target) => {
        this.setState(() => ({
            secondOption: target.value
        }))
    }

    handleSubmit = () => {
        const {dispatch} = this.props
        const optionOneText  = this.state.firstOption
        const optionTwoText = this.state.secondOption
        const author  = this.props.authedUser
        dispatch((handleAddQuestion(optionOneText, optionTwoText, author )))
        this.setState(() => ({
            firstOption: '',
            secondOption: '',
            route: true
        }))
    }
    render() {
     const { firstOption, secondOption, route } = this.state
     if (route) {
         return <Redirect to = '/home' />
        }
        return (
            <div>
               <Grid container textAlign='center' style={{ height: 1 ,marginTop: '32px' }} verticalAlign='middle' >
                   <Grid.Row >
                       <Grid.Column style={{ maxWidth: 800 }}>
                            <Header color='blue' attached='top' textAlign='center' as='h1'>Create New Question</Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Segment padded='very' attached='top'>
                                <Header textAlign='center' as='h2'>Would You Rather?</Header>
                                    <Input 
                                        focus
                                        fluid
                                        placeholder='Enter The First Option Here'
                                        onChange={this.handleFirstChange}
                                        value={firstOption}
                                    />
                                    <Divider horizontal>Or</Divider>
                                    <Input
                                        focus
                                        fluid
                                        placeholder='Enter The Second Option Here'
                                        onChange={this.handleSecondChange}
                                        value={secondOption}
                                    />
                                    <Divider hidden>
                                        <Button color='blue'>
                                            Submit
                                        </Button>
                                    </Divider>
                                    
                                </Segment>
                                
                            </Form>
                       </Grid.Column>
                   </Grid.Row>
               </Grid>
            </div>
        )
    }
}

function mapStateToProps ({authedUser}) {
    return{
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)