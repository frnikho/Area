import ActionModal from '../ActionModal';
import TokenController from '../../controller/TokenController';
import app, {config} from '../../axios_config';

export default class SpotifyAction extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
        serviceName: 'spotify',
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.contextValue === undefined) return;
    if (this.state.contextValue !== prevState.contextValue) {
      new TokenController().getUserToken((status, res) => {
        if (status) {
          app
            .get('/me', config(res))
            .then(response => {
              this.props.onChangeParam([this.state.contextValue, response.data.uuid]);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }

  renderBody() {}
}
