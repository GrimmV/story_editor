import ErrorHandling from "../Components/Utility/ErrorHandling"

export const fetchErrorHandler = (loaders, components) => {

    for (let i = 0; i < components.length; i++) {
        let component = components[i];
        if (loaders[i]) {
            return <ErrorHandling component={component}/>
        }
    }
}