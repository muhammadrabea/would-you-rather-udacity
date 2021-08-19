import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Grid, Header, Form, Segment, Dropdown, Divider, Button } from 'semantic-ui-react'

import HomePage from './HomePage'
import { setAuthedUser } from '../actions/authedUser'

class LogIn extends Component {
    state = {
        authedUserId: '',
        loggedIn: false
    }

    handleSelection = (e, info) => {
        this.setState({authedUserId: info.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { authedUserId } = this.state
        this.setState({
            loggedIn: true
        })
        dispatch(setAuthedUser(authedUserId))
        
    }
    render () {
        const { users, authedUser } = this.props    
        const { authedUserId, loggedIn } = this.state
        const userInfo = users.map((user) => ({
            value: user.id,
            key: user.id,
            text: user.name,
            image: {src: user.avatarURL, avatar: true}
        }))
        if( loggedIn ||  authedUser !==  null) {
            return <Redirect to='/home' exact component={HomePage} />
        }
        return (
                <Grid container textAlign='center' verticalAlign='middle' style={{marginTop: '32px'}}>
                    <Grid.Row style={{maxWidth: 600}}>
                        <Grid.Column>
                            <Header attached='top' as='h2' textAlign= 'center' color='blue' >
                                Welcome to 'Would You Rather?' The Game 
                                <Header.Subheader style={{color: 'black'}}>Please Log In With One Of The Users First</Header.Subheader>
                            </Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Segment>
                                <Dropdown placeholder='Select User' selection options={userInfo} onChange={this.handleSelection} />                                </Segment>
                                <Divider horizontal />
                                <Button color='blue' disabled ={ authedUserId === ''}>       
                                    Log In
                                </Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        )
    }
}

LogIn.propTypes = {
    authedUser : PropTypes.string,
    users : PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}
LogIn.defaultProps = {
    authedUser: null
}
function mapStateToProps ( {users, authedUser} ) {
    return {
        users: Object.keys(users).map((id) =>(users[id])),
        authedUser,
    }
}

export default connect(mapStateToProps)(LogIn)