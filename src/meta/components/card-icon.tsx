/* eslint-disable no-unused-expressions */
/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

import React from 'react'

type SVGProps = {
    width: string
}

// tslint:disable-next-line: jsx-wrap-multiline
const SVG = (props: SVGProps): any => {
    return (
        <svg
            height="100%"
            width={props.width}
            display="inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 40"
            x="0px"
            y="0px"
        >
            <title>referee, sport, yellow, red, card, foul, symbol</title><g>
                <path d="M24,10H20V5a2,2,0,0,0-2-2H8A2,2,0,0,0,6,5V20a2,2,0,0,0,2,2h4v5a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V12A2,2,0,0,0,24,10ZM8,20V5H18v7h0v8H8Zm16,7H14V22h4a2,2,0,0,0,2-2V12h4Z" /></g>
            {/* <text x="0" y="47" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Kmg Design</text><text x="0" y="52" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text> */}
        </svg>

    )
}

export default SVG;
