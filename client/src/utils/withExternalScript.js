import React from "react";
import hoistNonReactStatics from 'hoist-non-react-statics';

const alreadyAddedExternalScripts = {};

const isScriptAlreadyAdded = src => alreadyAddedExternalScripts.hasOwnProperty(src);
const markScriptAsAdded = src => (alreadyAddedExternalScripts[src] = true);

const genPromise = (url, callback) => 
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      if (callback) {
        window.onScriptLoaded = () => {
          resolve(url);
          document.head.removeChild(script);
          delete window.onScriptLoaded;
        }
      } else {
        script.addEventListener("load", () => {
          resolve(url);
          document.head.removeChild(script);
        });
      }
      script.addEventListener("error", (e) => {
        reject(e);
        document.head.removeChild(script);
      });
      document.head.appendChild(script);
    });

const addBodyScript = (src, callback) => {
  if (Array.isArray(src)) {
    return Promise.all(src.map(url =>
      genPromise(url)
    ))
  } else {
    return Promise.all([genPromise(src, callback)]);
  }
};

const withExternalScript = (externalScriptSrc, callback, LoadingComponent = null, ErrorComponent = null) => WrappedComponent => {
  class WithExternalScriptHOC extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        loading: !isScriptAlreadyAdded(externalScriptSrc), error: false
      };
    }

    componentDidMount() {
      if (isScriptAlreadyAdded(externalScriptSrc)) {
        return;
      }
      addBodyScript(externalScriptSrc, callback)
        .then((urls) => this.onAddedBodyScript(urls))
        .catch(() => this.setState({ loading: false, error: true }));
    }

    onAddedBodyScript(urls) {
      this.setState({ loading: false, error: false });
      urls.forEach(url => markScriptAsAdded(url));
    }

    render() {
      if (this.state.loading) {
        return LoadingComponent ? <LoadingComponent {...this.props} />:null;
      }

      if (this.state.error) {
        return ErrorComponent ? <ErrorComponent {...this.props} />:null;
      }

      return <WrappedComponent {...this.props} />;
    }
  }
  return hoistNonReactStatics(WithExternalScriptHOC, WrappedComponent);
};

export default withExternalScript