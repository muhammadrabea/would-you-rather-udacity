import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeAuthedUser } from '../actions/authedUser'

class Navigation extends Component {
    state = { activeItem: '' }

    handleRoute = (e, { name, to }) => {
        this.setState({ activeItem: name })
        return this.props.history.push(to)
    }
    handleLogout = () => {
        const { dispatch } = this.props
        dispatch(removeAuthedUser())
        this.setState({ activeItem: '' })
        return this.props.history.push('/')
    }
    render() {
        const { activeItem } = this.state
        const { LoggedIn, loggedOut } = this.props
        return (
            <div>
                <Menu inverted  >
                    <Menu.Item
                        name='Home'
                        to='/home'
                        active={activeItem === 'home'}
                        onClick={this.handleRoute}
                    />
                    <Menu.Item
                        name='New Question'
                        to='/add'
                        active={activeItem === 'New Question'}
                        onClick={this.handleRoute}
                    />
                    <Menu.Item
                        name='Leaderboard'
                        to='/leaderboard'
                        active={activeItem === 'Leaderboard'}
                        onClick={this.handleRoute}
                    />
                    {loggedOut ? 
                        (
                        <Menu.Menu position='right' >
                                <Menu.Item
                                name='Log In'
                                to='/'
                                active={activeItem === 'Log In'}
                                onClick={this.handleRoute} />
                        </Menu.Menu>) : 
                        (
                        <Menu.Menu position='right'>
                            <Menu.Item
                            name={`Welcome ${LoggedIn.name}`}
                            />
                            <Menu.Item>
                                <Image src={LoggedIn.avatarURL} alt={LoggedIn.name} avatar />
                            </Menu.Item>
                            <Menu.Item
                                name='Log Out'
                                to='/'
                                active={activeItem === 'LogOut'}
                                onClick={this.handleLogout}
                            />
                        </Menu.Menu>
                        )
                    }      
                </Menu>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    const LoggedIn = !authedUser ? null : users[authedUser]
    return {
        loggedOut: authedUser === null,
        LoggedIn
    }
}
export default withRouter(connect(mapStateToProps)(Navigation))