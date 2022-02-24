import {useParams, useLocation, /* useSearchParams */} from "react-router-dom";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

function withLocation(Component) {
    return props => <Component {...props} location={useLocation()} />;
}

export {
    withLocation,
    withParams,
}
