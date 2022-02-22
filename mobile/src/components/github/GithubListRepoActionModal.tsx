import {Center, Button, Stack, Spinner, Select, CheckIcon, Box} from 'native-base';
import React from 'react';
import {Text, TouchableHighlightBase} from 'react-native';
import ActionModal from '../ActionModal';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginController from '../../controller/LoginController';
import app, {config} from '../../axios_config';
import TokenController from '../../controller/TokenController';

export default class GithubListRepoActionModal extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'github',
      repositories: undefined,
      repository: undefined,
    }
  }

  loadData(uuid: string) {
    console.log('on est là');
    new TokenController().getUserToken((status, res) => {
      if (status) {
        app.get(`services/github/listRepositories?context=${this.state.contextValue}`, config(res)).then((response) => {
          this.setState({
              repositories: response.data,
          })
      }).catch(err => console.log(err));
      }
    })
  }

  renderLoading() {
    return (
      <Center>
        <Spinner accessibilityLabel="Loading posts" size={50} />
      </Center>
    );
  }

  renderListRepositories() {
    return (
      <Center>
        <Box w="3/4" maxW="300">
          <Select
              selectedValue={this.state.repository}
              minWidth="200"
              accessibilityLabel="Choose a repository"
              placeholder="Choose a repository"
              _selectedItem={{
                bg: 'primary.200',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue =>
                this.setState({repository: itemValue})
              }>
              {this.state.repositories.map((repo, i) => {
                return <Select.Item key={i} label={repo.full_name} value={repo.full_name} />;
              })}
            </Select>
        </Box>
      </Center>
    );
  }

  renderBody() {
    return (
      this.state.repositories === undefined ? <></> : this.renderListRepositories()
    );
  }
}
