import React from "react"
import PropTypes from "prop-types"

const ImageSnippet = ({ width, height, alt, classes, urlQuery }) => {
	return (
		<img
			src={urlQuery}
			alt={alt}
			className={classes}
			width={width}
			height={height}
		/>
	)
}

ImageSnippet.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	alt: PropTypes.string,
	classes: PropTypes.string,
	urlQuery: PropTypes.string
}

export default ImageSnippet
