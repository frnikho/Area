import ActionModal from '../ActionModal';
import TokenController from '../../controller/TokenController';
import app, {config} from '../../axios_config';

export default class EpitechIntraAction extends ActionModal {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceName: 'epitech_intra',
    };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.contextValue === undefined) return;
    if (this.state.contextValue !== prevState.contextValue) {
      new TokenController().getUserToken((status, res) => {
        if (status) {
          app
            .get(
              `/context?service=epitech_intra&key=${this.state.contextValue}`,
              config(res),
            )
            .then(response => {
              this.props.onChangeParam([response.data.tokenData.token.url, 'all']);
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
