import { Grid } from "@mui/material";
import React from "react";
import { getToken } from "../../../utils/getToken";
import StoryCreation from "./StoryCreation";
import StorySelection from "./StorySelection";
import { fetchStories } from "../../../fetching/retrieve";
import LoaderHandling from "../../Utility/LoaderHandling";
import ErrorHandling from "../../Utility/ErrorHandling";
import { useQuery } from "react-query";
import { changeStoryTitle, createStory, deleteStory } from "../../../fetching/update";
import { useNavigate } from "react-router-dom";
import { toStoryEditor } from "../../../routing/routes";

export default function StoryOverview(props) {
  const {
    data: stories,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = useQuery("stories", fetchStories);

  const navigate = useNavigate()
  const token = getToken();

  const moveToStory = (id) => {
    navigate(toStoryEditor(id));
  };

  const createNewStory = (title) => {
    createStory(token, title).then(() => {
      refetch();
    });
  };

  const changeTitle = (id, title) => {
    changeStoryTitle(token, id, title).then(() => {
      refetch();
    });
  };

  const removeStory = (id) => {
    deleteStory(token, id).then(() => {
        refetch();
      });
  };

  const renderStories = () => {
    let buttons = [];
    for (let story of stories) {
      buttons.push(
        <Grid item xs={4} key={story.id}>
          <StorySelection
            id={story.id}
            title={story.title["de"]}
            image={story.characterImage}
            moveToStory={moveToStory}
            changeTitle={changeTitle}
            removeStory={removeStory}
          />
        </Grid>
      );
    }
    return buttons;
  };

  if (isLoading) {
    return <LoaderHandling />;
  } else if (isError) {
    return <ErrorHandling component="stories"/>;
  } else {
    return (
      <Grid container>
        {renderStories()}
        <Grid item xs={4}>
          <StoryCreation createStory={createNewStory} />
        </Grid>
      </Grid>
    );
  }
}
