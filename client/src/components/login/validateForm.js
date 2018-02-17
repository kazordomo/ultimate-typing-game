export default function(values) {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    } else if (!/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(values.username)) {
        errors.username = 'Invalid username';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    //we will stick to client side validation on this.
    if(!values.retypepassword) {
        errors.retypepassword = 'Required';
    } else  if(values.retypepassword !== values.password) {
        errors.retypepassword = 'The passwords do not match!';
    }

    return errors
};