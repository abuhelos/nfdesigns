import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

/* 
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    height: 400px;
    background-color: grey;
    border-radius: 25px;
`
*/
const Image = styled.div`
    position: relative;
    width: 300px;
    height: 400px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px 25px 25px 25px;
    background-image: url(${props=>props.image})
`
const Name = styled.h1`
    color: #FFFBF2;
    padding: 10px;
    position: absolute;
    bottom: 0px;
    font-size: 13px;
`

function StoreCard(props) {
    return (
        <Link to={`/${props.creator}`}>
            <Image image={props.image}>
                <Name>
                    Store Creator: {props.creator}
                </Name>
            </Image>
        </Link>
    )
}

export default StoreCard;