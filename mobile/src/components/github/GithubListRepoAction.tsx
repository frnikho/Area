import {
  Center,
  Select,
  CheckIcon,
  Box,
} from 'native-base';
import React from 'react';
import ActionModal from '../ActionModal';
import app, {config} from '../../axios_config';
import TokenController from '../../controller/TokenController';

export default class GithubListRepoAction extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'github',
      repositories: undefined,
      repository: undefined,
    };
    this.onChangeParam = this.onChangeParam.bind(this);
  }

  /**
   * @description Load all user repositories
   */
  loadData() {
    new TokenController().getUserToken((status, res) => {
      if (status) {
        app
          .get(
            `services/github/listRepositories?context=${this.state.contextValue}`,
            config(res),
          )
          .then(response => {
            this.setState({
              repositories: response.data,
            });
          })
          .catch(err => console.log(err));
      }
    });
  }

  /**
   * @description Set repository and send it to main screen
   * @param repository
   */
  onChangeParam(repository: any) {
    this.props.onChangeParam([repository]);
    this.setState({repository: repository})
  }

  /**
   * @description Render list of repositories
   * @returns
   */
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
            onValueChange={itemValue => {
              this.onChangeParam(itemValue);
            }}>
            {this.state.repositories.map((repo, i) => {
              return (
                <Select.Item
                  key={i}
                  label={repo.full_name}
                  value={repo.full_name}
                />
              );
            })}
          </Select>
        </Box>
      </Center>
    );
  }

  /**
   * @description render body
   * @returns
   */
  renderBody() {
    return this.state.repositories === undefined ? (
      <></>
    ) : (
      this.renderListRepositories()
    );
  }
}
