import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import ImageChooser from '../../Utility/ImageChooser';
import { changeCharacterHeight, changeCharacterImgSrc, changePosition, deleteCharacterImg, getCharacterImageCollection } from '../../../fetching/update';
import { getToken } from '../../../utils/getToken';
import { useQuery } from 'react-query';
import { fetchLoadingHandler } from '../../../utils/fetchLoadingHandler';
import { fetchErrorHandler } from '../../../utils/fetchErrorHandler';

export default function CharacterHandler(props) {

    const {character, refetch} = props;

    const [height, setHeight] = useState(character.height);
    const [position, setPosition] = useState(character.position);
    console.log(character.position)

    const token = getToken()

    const {
        data: collection,
        isError,
        isLoading,
    } = useQuery(["characterCollection"], getCharacterImageCollection);

    const loadingResult = fetchLoadingHandler(
        [isLoading],
        ["Bildersammlung"]
    );
    const errorResult = fetchErrorHandler(
        [isError],
        ["Bildersammlung"]
    );
      
    if (loadingResult) return loadingResult;
    if (errorResult) return errorResult;

    const savePosition = (newX, newY) => {
        changePosition(token, "characterframe", character.id, newX, newY).then(() => {
            refetch()
        });
    }

    const updatePosition = (newX, newY) => {
        setPosition({x: newX, y: newY});
    }

    const saveHeight = (newHeight) => {
        changeCharacterHeight(token, character.id, newHeight).then(() => {
            refetch()
        });;
    }

    const updateHeight = (newHeight) => {
        setHeight(newHeight);
    }

    const saveCharacterImage = (imageSrc) => {
        changeCharacterImgSrc(token, character.id, imageSrc).then(() => {
            refetch()
        });
    }

    const deleteImage = () => {
        deleteCharacterImg(token, character.id).then(() => {
            refetch()
        });;
    }

    return (
        <Box sx={{mb: 2}}>
            <Box>
                <ImageChooser image={character.imageSrc} saveImage={saveCharacterImage} collection={collection} deleteImage={deleteImage}/>
                <Box sx={{display: "block"}}>
                    <Typography>Y-Position</Typography>
                    <Slider max={100}
                        value={position.y} onChange={(event, newValue) => {
                        updatePosition(position.x, newValue)
                    }} onChangeCommitted={
                        (event, newValue) => {
                        savePosition(position.x, newValue)
                    }
                    } aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"y: " + position.y}</Typography>
                <Box sx={{display: "block"}}>
                    <Typography>X-Position</Typography>
                    <Slider  max={100}
                    value={position.x} onChange={(event, newValue) => {
                        updatePosition(newValue, position.y)
                    }} onChangeCommitted={
                        (event, newValue) => {
                        savePosition(newValue, position.y)
                    }} aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"x: " + position.x}</Typography>
                <Box sx={{display: "block"}}>
                    <Typography>Größe</Typography>
                    <Slider min={1} max={100}
                    value={height} onChange={(event, newValue) => {updateHeight(newValue)}} aria-labelledby="continuous-slider" 
                        onChangeCommitted={(event, newValue) => {
                            saveHeight(newValue)
                        }}
                    />
                </Box>
                <Typography>{"height: " + height}</Typography>
            </Box>
        </Box>
    )
}