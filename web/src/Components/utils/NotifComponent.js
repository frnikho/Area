import * as React from 'react';
import Alert from '@mui/material/Alert';

const NotifComponent = (notif) => {
    var severity = "success";

    if (notif === undefined || notif.message === "" || notif.show === false)
        return (null);
    if (notif.type === "error")
        severity = "warning";
    return (
        <Alert variant="filled" severity={severity}>
            {notif.message}
        </Alert>
    );
};

export default NotifComponent;