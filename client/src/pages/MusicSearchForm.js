import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Container, Row, Col, Form, FormGroup, FormText,
    Label, Input, Button, ButtonGroup
} from "reactstrap";
import SpotifyWebApi from "spotify-web-api-js";
import { ToastContainer } from "react-toastify";
import AttrSlider from "../components/AttrSlider";
import { 
    onGenreChange, handleSubmit, submitSongSearch 
} from "../js/Helpers";
import * as actions from "../actions";

import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";
import "rc-slider/assets/index.css";
// import "../css/MusicSearchForm.css";


const spotifyApi = new SpotifyWebApi();

class MusicSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = { searchType: "advanced" };
    }

    componentDidMount() {
        // Make sure Spotify API has access token
        const { spotifyTokens } = this.props;
        if (!spotifyApi.getAccessToken()) {
            spotifyApi.setAccessToken(spotifyTokens.access_token);
        }
    }

    componentDidUpdate() {
        // Redirect to MusicList after form submit
        const { redirect, setRedirect, history } = this.props;
        if (redirect) {
            setRedirect(false);
            history.push("/results", null);
        }
    }

    render() {
        const {
            allGenres, selectedGenres, resetAttributes, setKeyword
        } = this.props;

        const basicSearchForm = (
            <div className="basic-search-form" onSubmit={ e => submitSongSearch(this.props, e) }>
                <input 
                    className="search-input" 
                    type="text" 
                    placeholder="Enter a song" 
                    onChange={ e => setKeyword(e.target.value) }
                /><br/>
                <Button type="submit" color="danger"> Search </Button>
            </div>
        );

        const advancedSearchForm = (
            <Form className="advanced-search-form" onSubmit={ e => handleSubmit(this.props, e) }>
                <Row className="genre-att-row">
                    {/* CHOOSE GENRE */}
                    <Col className="genre-col" lg="3">
                        <FormGroup>
                            <Label for="genre">
                                <h5>Search by genre</h5>
                            </Label>
                            <FormText>*Required. Select up to 5</FormText>
                            <Input
                                className="genre-select"
                                type="select"
                                value={selectedGenres}
                                multiple
                                onChange={e =>
                                    onGenreChange(this.props, e.target.options)
                                }
                            >
                                {allGenres.map(genre => (
                                    <option key={genre.id}>{genre.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Button type="submit" color="danger"> Find Music </Button>
                    </Col>

                    {/* ADJUST SONG ATTRIBUTES */}
                    <Col>
                        <Row>
                            <div className="features">
                                <h5 className="features-heading">
                                    Search Options
                                </h5>
                                <FormText>*Optional</FormText>
                                <Button color="danger" onClick={() => resetAttributes()}>
                                    Reset
                                </Button>
                            </div>
                        </Row>

                        <Row>
                            <Col md="6">
                                <AttrSlider
                                    name="duration"
                                    id="dur"
                                    min={60000}
                                    max={1800000}
                                    step={5000}
                                />
                                <AttrSlider
                                    name="acousticness"
                                    id="ac"
                                    min={0.0}
                                    max={1.0}
                                    step={0.01}
                                />
                                <AttrSlider
                                    name="danceability"
                                    id="dnc"
                                    min={0.0}
                                    max={1.0}
                                    step={0.01}
                                />
                                <AttrSlider
                                    name="energy"
                                    id="en"
                                    min={0.0}
                                    max={1.0}
                                    step={0.01}
                                />
                                <AttrSlider
                                    name="instrumentalness"
                                    id="inst"
                                    min={0.0}
                                    max={1.0}
                                    step={0.01}
                                />
                                <AttrSlider
                                    name="liveness"
                                    id="live"
                                    min={0.0}
                                    max={1.0}
                                    step={0.01}
                                />
                                <AttrSlider
                                    name="loudness"
                                    id="loud"
                                    min={-60.0}
                                    max={0.0}
                                    step={0.5}
                                />
                            </Col>
                            <Col md="6" >
                                <AttrSlider
                                    name="popularity"
                                    id="pop"
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                                <AttrSlider
                                    name="speechiness"
                                    id="sp"
                                    min={0.0}
                                    max={1.0}
                                    step={0.01}
                                />
                                <AttrSlider
                                    name="tempo"
                                    id="temp"
                                    min={40}
                                    max={200}
                                    step={1}
                                />
                                <AttrSlider
                                    name="valence"
                                    id="val"
                                    min={0.0}
                                    max={1.0}
                                    step={0.01}
                                />
                                <AttrSlider
                                    name="signature"
                                    id="sig"
                                    min={1}
                                    max={13}
                                    step={1}
                                />
                                <AttrSlider
                                    name="key"
                                    id="key"
                                    min={0}
                                    max={11}
                                    step={1}
                                />
                                <AttrSlider
                                    name="mode"
                                    id="mode"
                                    min={0}
                                    max={1}
                                    step={1}
                                />
                            </Col>
                            <Button className="advanced-search-form__submit-btn" type="submit" color="danger"> Find Music </Button>
                        </Row>

                        
                    </Col>
                </Row>
            </Form>
        );


        return (
            <Container className="music-search-form" fluid>
                {/* NOTIFICATIONS */}
                <ToastContainer />

                {/* FORM TITLE */}
                <h1 className="music-search-title">Music Search</h1>

                {/* SEARCH TYPE BUTTONS */}
                <ButtonGroup className="search-type-buttons">
                    <Button 
                        className="search-type-button-basic" 
                        color={ this.state.searchType === "basic"? 'danger':'secondary' }
                        onClick={ () => this.setState({ searchType: "basic" }) }>
                        Basic
                    </Button>
                    <Button 
                        className="search-type-button-advanced" 
                        color={ this.state.searchType === "basic"? 'secondary':'danger' }
                        onClick={ () => this.setState({ searchType: "advanced" }) }>
                        Advanced
                    </Button>
                </ButtonGroup>

                {/* FORM CONTENT GOES HERE */}
                {this.state.searchType === "basic" ? basicSearchForm : advancedSearchForm}
            </Container>
        );
    }
}

MusicSearchForm.propTypes = {
    spotifyTokens: PropTypes.shape({
        access_token: PropTypes.string,
        refresh_token: PropTypes.string
    }).isRequired,
    allGenres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.shape({}).isRequired,
    redirect: PropTypes.bool.isRequired,
    resetAttributes: PropTypes.func.isRequired,
    setRedirect: PropTypes.func.isRequired,
    setKeyword: PropTypes.func.isRequired,
    history: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
    spotifyTokens: state.spotifyTokens,
    expireTime: state.expireTime,
    devices: state.devices,
    allGenres: state.allGenres,
    selectedGenres: state.selectedGenres,
    selectGenre: state.selectGenre,
    addSongs: state.addSongs,
    songs: state.songs,
    user: state.user,
    attributes: state.attributes,
    changeAttributes: state.changeAttributes,
    popovers: state.popovers,
    redirect: state.redirect,
    keyword: state.keyword
});

export default withRouter(connect(mapStateToProps, actions)(MusicSearchForm));
