//import React from 'react' => no longer needed
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'


const Header = ( {title, onAdd, showAdd} ) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1> 
            {/* Example of resuable components */}
            {/* Imported button method that accepts color and text
            parameters and returns a button with said parameters
            Also follows a certain style from the css file */}
            
            {/* if location is equal to /, then show the button */}
            {/* if location.pathname is equal to /, then show the button */}
            {location.pathname === '/' && (
                <Button 
                color={showAdd ? 'red' : 'green'} 
                text={showAdd ? 'Close' : 'Add'} 
                onClick={onAdd}
                />
            )}
            {/* <Button color='blue' text='Hello!'/>
            <Button color='red' text='Hello!'/> */}
        </header>
    )
}

//Utilizing default props to implement prop in react file
//=> no need to explicetely define title in react file 

 Header.defaultProps = {
    title: 'Task Tracker',
}


//creating proptypes
Header.propTypes = {
    title: PropTypes.string.isRequired,
    
}

//if you don't want to do inline css styling 
//pass it in with single curly braces within the 
//h1 brace using the const name => headingStyle
const headingStyle = {
    color: 'white', backgroundColor: 'black'
}

export default Header

//style components => external package to do styling in css


