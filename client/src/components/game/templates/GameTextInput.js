import React from 'react';
import Input from '../../../styles/Input';

export default ({ keyDown, keyUp, ref }) => {
    console.log(keyDown);
    return(
        <Input 
            play 
            type="text" 
            autoFocus 
            // disabled={!this.state.time}
            onKeyDown={keyDown} 
            onKeyUp={keyUp} 
            innerRef={input => ref = input} 
        />
    );
}