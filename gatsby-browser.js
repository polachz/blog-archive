/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"

import { GlobalState } from "./src/components/GlobalState/GlobalState.js"
/*require("prismjs/themes/prism-okaidia.css")*/
require("./src/styles/prism-vsc-dark-plus.css")
require("./src/styles/prism-command-line.css")
require("./src/styles/prism-line-numbers.css")


export const wrapRootElement = ({ element }) => {
    return (
        <GlobalState>
            {element}
        </GlobalState>
    )
}