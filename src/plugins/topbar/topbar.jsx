import React, { PropTypes } from "react"

//import "./topbar.less"
import Logo from "./billy_logo.png"

export default class Topbar extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = { url: props.specSelectors.url() }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.specSelectors.url() })
  }

  downloadUrl = (e) => {
    // let {target: {value}} = e
    // this.setState({url: value})
    // this.props.specActions.updateUrl(this.state.url)
    // this.props.specActions.download(this.state.url)
    // e.preventDefault()

    window.location = `${window.location.origin}?url=${e.target.value}`;

  }

  render() {
    let { getComponent, specSelectors } = this.props
    const Button = getComponent("Button")
    const Link = getComponent("Link")

    const APIOptions = [
      {
        label: 'Publishers v1',
        value: 'https://api.billystaging.com/publishers/v1/swagger.json'
      },
      {
        label: 'Advertisers v1',
        value: 'https://api.billystaging.com/advertisers/v1/swagger.json'
      }
    ];

    let isLoading = specSelectors.loadingStatus() === "loading"
    let isFailed = specSelectors.loadingStatus() === "failed"

    let inputStyle = {}
    if(isFailed) inputStyle.color = "red"
    if(isLoading) inputStyle.color = "#aaa"
    return (
        <div className="topbar">
          <div className="topbar-wrapper">
            <Link href="#" title="Billy Performance Network">
              <img height="32" width="66" src={ Logo } alt="Billy Performance Network"/>
              <span>API Documentation</span>
            </Link>
            <select name="api-select"
                    id="api-selector"
                    onChange={this.downloadUrl}
                    value={this.state.url}>
              {
                APIOptions.map((option) => {
                  return <option value={option.value}>{option.label}</option>
                })
              }
            </select>
          </div>
        </div>

    )
  }
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired
}
