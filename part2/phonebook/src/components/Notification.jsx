const Notification = ({ message }) => {
    if (message === null) return null

    let notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        border: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: 'green',
        padding: 10,
        marginBottom: 10,
        fontSize: 20
    }

    if (String(message).includes('has already been removed from the server')) {
        notificationStyle = {
            ...notificationStyle,
            color: 'red',
            borderColor: 'red'
        }
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification