/* eslint-disable no-unused-vars */
// @flow
import * as React from "react";
import Cookies from "js-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

declare var window: any;
declare var document: any;

type Props = {
  componentType?: "Dialog" | "Snackbar",
  cookieName: string,
  acceptOnScroll?: boolean,
  acceptOnScrollPercentage?: number,
  onAccept?: () => void | null,
  expires?: number | Date,
  hideOnAccept?: boolean,
  cookieValue?: string | boolean | number,
  children?: React.Node, // if type snackbar should be a SnackbarContent
  title?: string | null, // only
  message?: string,
  acceptButtonLabel?: string,
  debug?: boolean,
  extraCookieOptions?: any,
  snackbarAnchor?: {
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom"
  }
};
type State = {
  visible: boolean
};

export default class MUICookieConsent extends React.Component<Props, State> {
  defaultProps = {
    componentType: "Snackbar",
    acceptOnScroll: false,
    acceptOnScrollPercentage: 25,
    expires: 365, // default it expires in 365 days
    hideOnAccept: true,
    debug: false,
    extraCookiesOptions: undefined,
    snackbarAnchor: { horizontal: "center", vertical: "bottom" },
    children: null,
    message: "I love cookies!",
    title: null,
    acceptButtonLabel: "Accept"
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    const { cookieName, debug } = this.props;

    // if cookie undefined or debug
    if (Cookies.get(cookieName) === undefined || debug) {
      this.setState({ visible: true });
    }

    // if acceptOnScroll is set to true, add a listener
    if (this.props.acceptOnScroll) {
      window.addEventListener("scroll", this.handleScroll, { passive: true });
    }
  }

  componentWillUnmount() {
    // remove listener if still set
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * checks whether scroll has exceeded set amount and fire accept if so.
   */
  handleScroll = () => {
    // (top / height) - height * 100

    // const rootNode = document.documentElement;
    // const body = document.body;
    const { body, documentElement: rootNode } = document;
    const top = "scrollTop";
    const height = "scrollHeight";
    const percentage =
      ((rootNode[top] || body[top]) /
        ((rootNode[height] || body[height]) - rootNode.clientHeight)) *
      100;

    if (percentage > this.props.acceptOnScrollPercentage) {
      this.accept();
    }
  };

  /**
   * Set a persistent cookie
   */
  accept = () => {
    const {
      cookieName,
      cookieValue,
      expires,
      hideOnAccept,
      onAccept,
      extraCookieOptions
    } = this.props;

    // fire onAccept
    if (onAccept) {
      onAccept();
    }

    // remove listener if set
    window.removeEventListener("scroll", this.handleScroll);

    Cookies.set(cookieName, cookieValue, {
      expires,
      ...extraCookieOptions
    });

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
      acceptButtonLabel
    } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onAccept: this.accept })
    );

    if (componentType === "Snackbar") {
      if (!children) {
        return (
          <Snackbar
            anchorOrigin={snackbarAnchor}
            open={this.state.visible}
            message={<span id="message-id">{message}</span>}
            action={[
              <Button
                key="accept"
                color="secondary"
                size="small"
                onClick={this.accept}
              >
                {acceptButtonLabel}
              </Button>
            ]}
          />
        );
      }
      return (
        <Snackbar anchorOrigin={snackbarAnchor} open={this.state.visible}>
          {childrenWithProps}
        </Snackbar>
      );
    }
    if (!children) {
      return (
        <Dialog open={this.state.visible}>
          {title ? <DialogTitle>{title}</DialogTitle> : null}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.accept} color="secondary">
              {acceptButtonLabel}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return <Dialog open={this.state.visible}>{childrenWithProps}</Dialog>;
  }
}
