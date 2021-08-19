import React, {Component} from 'react'
import { Segment, Grid, Table, Image, Header } from 'semantic-ui-react'

class UserCard extends Component {
    render () {
        const { name,avatarURL,answeredQuestions,unansweredQuestions, resault}= this.props.user
        return (
            <Segment>
            <Grid stackable columns='equal' divided >
                    <Grid.Row >
                    <Grid.Column >
                        <Image size='small'src={avatarURL} />
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <Header  as='h2' color='blue'>{name}</Header>
                        <Table padded>
                        <Table.Body>
                            <Table.Row>
                               <Table.Cell>Answered Question</Table.Cell>
                               <Table.Cell>{answeredQuestions}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                               <Table.Cell>Created Question</Table.Cell>
                               <Table.Cell>{unansweredQuestions}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Table padded verticalAlign='middle'>
                            <Table.Header >
                                <Table.Row>
                                    <Table.HeaderCell textAlign='center'>
                                        Score
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            <Table.Row >
                                <Table.Cell >
                                <Segment circular inverted   style={{width: 3, height: 2}} color ='blue'  >
                                <Header as='h2' inverted >
                                    {resault}
                                </Header>
                                </Segment>
                                </Table.Cell>
                            </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
        )
    }
}   


export default(UserCard)