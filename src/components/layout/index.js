import PropTypes from 'prop-types'
import React, { Component } from "react"
import { Toast, Toastify} from "components/toastify/toastify";

// Layout Related Components
import Header from "./Header"
import Sidebar from "./Sidebar"
import Rightbar from "../CommonForBoth/Rightbar"

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    }
    this.toggleMenuCallback = this.toggleMenuCallback.bind(this)
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }

  componentDidMount() {

    // Scroll Top to 0
    window.scrollTo(0, 0)
    // let currentage = this.capitalizeFirstLetter(this.props.location.pathname)

    // document.title =
    //   currentage + " | Belha Global"
    // if (this.props.leftSideBarTheme) {
    //   this.props.changeSidebarTheme(this.props.leftSideBarTheme)
    // }

    // if (this.props.layoutWidth) {
    //   this.props.changeLayoutWidth(this.props.layoutWidth)
    // }

    // if (this.props.leftSideBarType) {
    //   this.props.changeSidebarType(this.props.leftSideBarType)
    // }
    // if (this.props.topbarTheme) {
    //   this.props.changeTopbarTheme(this.props.topbarTheme)
    // }
  }
  toggleMenuCallback = () => {
    if (this.props.leftSideBarType === "default") {
      this.props.changeSidebarType("condensed", this.state.isMobile)
    } else if (this.props.leftSideBarType === "condensed") {
      this.props.changeSidebarType("default", this.state.isMobile)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="layout-wrapper">
          <Header toggleMenuCallback={this.toggleMenuCallback} />
          <Sidebar
            theme={this.props.leftSideBarTheme}
            type={this.props.leftSideBarType}
            isMobile={this.state.isMobile}
          />
          <Toastify/>
          <div className="main-content">{this.props.children}</div>
          {/* <Footer /> */}
        </div>
        {this.props.showRightSidebar ? <Rightbar /> : null}
      </React.Fragment>
    )
  }
}

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any
}

export default Layout
