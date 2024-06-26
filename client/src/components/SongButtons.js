import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { playSong, saveSong } from '../js/Helpers.js';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import '../css/SongButtons.css';

const SongButtons = (props) => {
    const { songs, index, deleteSong } = props;
    return (
        <Row className="song-btn-row">
            <Col className="song-btn-col" xs="4">
                <button className="song-btn" onClick={() => playSong(props)}>
                <i className="fas fa-play" />
                </button>
            </Col>
            <Col className="song-btn-col" xs="4">
                <button className="song-btn" onClick={() => saveSong(props)}>
                <i className="fas fa-plus" />
                </button>
                </Col>
            <Col className="song-btn-col" xs="4">
                <button className="song-btn" onClick={() => deleteSong(songs, index)}>
                <i className="fas fa-trash-alt" />
                </button>
            </Col>
        </Row>
    )
};

SongButtons.propTypes = {
    deleteSong: PropTypes.func.isRequired,
    songs: PropTypes.shape([]).isRequired,
    index: PropTypes.number.isRequired
  };

const mapStateToProps = (state) => ({
    songs: state.songs, 
    deleteSong: state.deleteSong
});

export default connect(mapStateToProps, actions)(SongButtons);