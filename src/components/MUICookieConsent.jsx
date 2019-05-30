// @flow
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

declare var window: ?EventTarget;
declare var document: ?Document;

type Props = {
  componentType?: 'Dialog' | 'Snackbar',
  cookieName: string,
  cookieValue?: string | boolean | number,
  acceptOnScroll?: boolean,
  acceptOnScrollPercentage?: number,
  onAccept?: () => void | null,
  expires?: number | Date,
  hideOnAccept?: boolean,
  children?: React.Node,
  title?: string | null,
  message?: string,
  acceptButtonLabel?: string,
  debug?: boolean,
  extraCookieOptions?: any,
  snackbarAnchor?: {
    horizontal: 'left' | 'center' | 'right',
    vertical: 'top' | 'bottom',
  },
};
type State = {
  visible: boolean,
};

/**
 * This component is the MUICookieConsent it pops a Snackbar or a Dialog informing the user about cookie consent.
 */
export default class MUICookieConsent extends React.Component<Props, State> {
  static defaultProps = {
    componentType: 'Snackbar',
    cookieValue: '',
    acceptOnScroll: false,
    acceptOnScrollPercentage: 25,
    expires: 365,
    hideOnAccept: true,
    debug: false,
    extraCookiesOptions: undefined,
    snackbarAnchor: { horizontal: 'center', vertical: 'bottom' },
    children: null,
    message: 'I love cookies!',
    title: null,
    acceptButtonLabel: 'Accept',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { cookieName, debug, acceptOnScroll } = this.props;

    if (Cookies.get(cookieName) === undefined || debug) {
      this.setState({ visible: true });
    }

    if (window && acceptOnScroll) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  /**
   * checks whether scroll has exceeded set amount and fire accept if so.
   */
  handleScroll = () => {
    const { acceptOnScrollPercentage } = this.props;
    if (document && typeof acceptOnScrollPercentage === 'number') {
      const rootNode = document.documentElement || document.body;

      if (rootNode) {
        // (top / (height - height)) * 100
        const percentage =
          (rootNode.scrollTop /
            (rootNode.scrollHeight - rootNode.clientHeight)) *
          100;

        if (percentage > acceptOnScrollPercentage) {
          this.handleAccept();
        }
      }
    }
  };

  /**
   * Set a persistent cookie
   */
  handleAccept = () => {
    const {
      cookieName,
      cookieValue,
      expires,
      hideOnAccept,
      onAccept,
      extraCookieOptions,
    } = this.props;

    if (onAccept) {
      onAccept();
    }

    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }

    Cookies.set(cookieName, cookieValue, { expires, ...extraCookieOptions });

    if (hideOnAccept) {
      this.setState({ visible: false });
    }
  };

  render() {
    const {
      componentType,
      children,
      message,
      snackbarAnchor,
      title,
      acceptButtonLabel,
    } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onAccept: this.handleAccept }),
    );

    switch (componentType) {
      case 'Snackbar':
        return children ? (
          <Snackbar anchorOrigin={snackbarAnchor} open={this.state.visible}>
            {childrenWithProps}
          </Snackbar>
        ) : (
          <Snackbar
            anchorOrigin={snackbarAnchor}
            open={this.state.visible}
            message={<span id="message-id">{message}</span>}
            action={[
              <Button
                key="accept"
                color="secondary"
                size="small"
                onClick={this.handleAccept}
              >
                {acceptButtonLabel}
              </Button>,
            ]}
          />
        );
      case 'Dialog':
        return (
          <Dialog open={this.state.visible}>
            {children ? (
              childrenWithProps
            ) : (
              <>
                {title ? <DialogTitle>{title}</DialogTitle> : null}
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    component="div"
                  >
                    {message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleAccept} color="secondary">
                    {acceptButtonLabel}
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        );
      default:
        return null;
    }
  }
}
