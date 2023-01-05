import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import { ImageProps, NFT } from '../schema'

export default function StoreCard(props: {creator: string, image: string}) {
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

const Image = styled.div<ImageProps>`
    position: relative;
    width: 300px;
    height: 400px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px 25px 25px 25px;
    background-image: url(${props=>props.image});
    overflow: hidden;
    &:hover {
        box-shadow: 0px 5px 5px 0px;
        trasition: 10s;
    }
`
const Name = styled.h1`
    color: #FFFBF2;
    padding: 10px;
    position: absolute;
    bottom: 0px;
    font-size: 13px;
`