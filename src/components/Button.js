import PropTypes from 'prop-types'


const button = ({color, text, onClick}) => {

    return (
        //example of button with style and events
        <button 
            onClick={onClick} 
            style={{ backgroundColor: color}} 
            className='btn'>{text}
        </button> 
    )

}

//default props
button.defaultProps = {
    color: 'steelblue'
}

button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}


export default button
