import LoaderHandling from "../Components/Utility/LoaderHandling";

export const fetchLoadingHandler = (loaders, components) => {

    for (let i = 0; i < components.length; i++) {
        let component = components[i];
        if (loaders[i]) {
            return <LoaderHandling component={component}/>
        }
    }
}