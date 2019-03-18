import React, { Component } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import logo from '../img/logo.svg';

import * as Icon from 'react-feather';

import '../css/index.css';

class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = { playing: false, loading: false, trackTitle: 'Unknown Song', artistName: 'Unknown Artist', showName: 'Unknown Show', volume: 25 };
  }

  onPlayStopClicked() {
    var audio = this.state.audio;
    if (!this.state.playing && !this.state.loading)
        this.initMp3Player();
    else  if (this.state.playing && !this.state.loading && this.state.audio.muted) {
      audio.muted = false;
      this.setState({audio});
    }
    else if (this.state.playing && !this.state.loading) {
      audio.muted = true;
      this.setState({audio});
    }
  }

  initMp3Player() {
    this.setState({ loading: true });
    var audio = new Audio();
    audio.src = 'http://icecast.wmhdradio.org:8000/wmhd'; //link to the audio file
    audio.autoplay = true;
    audio.volume = this.state.audio.volume;

    audio.addEventListener('playing', () => {
      this.setState({ playing: true, loading: false });
    })

    this.setState({audio: audio})
  }

  updateVolume(value) {
    this.setCookie('volume', value.toString(), 365);
    var audio = this.state.audio;
    audio.volume = value/100;
    this.setState({audio, volume: audio.volume});
  }

  componentDidMount() {
    var audio = new Audio();
    audio.volume = 0.25;
    var volume = this.getCookie('volume');
    if (volume && !isNaN(parseInt(volume))) {
      audio.volume = parseInt(volume)/100;
    }
    this.setState({audio, volume: audio.volume});
    this.fetchData();
  }

  fetchData() {
    fetch('https://dj.wmhdradio.org/api/live-info/')
      .then(response => response.json())
      .then(data => { 
        this.setState({ trackTitle: data.current.track_title, artistName: data.current.artist_name, showName: data.currentShow[0].name });
        var timeout = (Date.parse(data.next.starts) - Date.parse(data.schedulerTime)) + 10000
        setTimeout(this.fetchData(), timeout)
      });
  }

  setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)===' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }

  eraseCookie(name) {   
      document.cookie = name+'=; Max-Age=-99999999;';  
  }

  render() {
    var icon;
    if (this.state.playing && !this.state.audio.muted) {
      icon = (<Icon.Pause className="playPauseIcon" size={64} />);
    } else {
      icon = (<Icon.Play className="playPauseIcon" size={64} />);
    }
    return (
      <Layout>
        <SEO title="Listen Live" keywords={[`wmhd`, `online`, `radio`, `music`]} />
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-auto d-flex align-items-center justify-content-center">
                        <img src={logo} width="270" height="270" alt=""></img>
                      </div>
                      <div className="col-sm">                    
                        <h1 className="display-1 text-dark">{this.state.trackTitle}</h1>
                        <h2 className="display-2 text-muted">{this.state.artistName}</h2>
                        <h4 className="display-4 text-muted">{this.state.showName}</h4>
                        <div className="playStop">
                          { this.state.loading &&
                            <div className="lds-roller"><div></div>
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                          }
                          {
                            !this.state.loading && <div style={{ marginLeft: '-11px' }} onClick={() => this.onPlayStopClicked()}>{icon}</div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container volume">
              <div className="row">
                <div style={{paddingLeft: 0}} className="col-auto">
                  <Icon.Volume1 size={48} />
                </div>
                <div style={{right: '13px'}} className="col d-flex">
                  <Slider 
                    className={'justify-content-center align-self-center slider'}
                    value={this.state.volume*100}
                    trackStyle={{ backgroundColor: '#800000', height: 10 }}
                    handleStyle={{
                      boxShadow: "0 0 0 0",
                      borderColor: "#580100",
                      height: 24,
                      width: 24,
                      marginLeft: -14,
                      marginTop: -7,
                      backgroundColor: '#800000',
                    }}
                    railStyle={{ backgroundColor: '#E9E9E9', height: 10 }}
                    onChange={(value) => this.updateVolume(value)}/>
                </div>
                <div style={{right: '14px'}} className="col-auto">
                  <Icon.Volume2 size={48} />
                </div>
              </div>
            </div>
          </div>
        </header>
      </Layout>
    )
  }
}


export default IndexPage
