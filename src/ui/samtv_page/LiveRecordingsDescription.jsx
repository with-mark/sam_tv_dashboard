import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/detailedDescription.scss"
import ReactHtmlParser from "react-html-parser"


import ReactPlayer from 'react-player'
const LiveRecordingsDescription = ({ recordings }) => {

    return (
        <div>
            <p> {ReactHtmlParser(recordings.description)} </p>

            <div className="image-background">

                <div className="overlay">

                    <ReactPlayer controls width="100%" height="300px" style={{ borderRadius: "10px" }} url={recordings.videoLink} />

                </div>
            </div>







        </div>
    )
}

export default LiveRecordingsDescription
