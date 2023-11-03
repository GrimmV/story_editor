
export default function findKeyForFrameId(orderedFramesDict, targetFrameId) {
    for (const [key, orderedFramesList] of Object.entries(orderedFramesDict)) {
      const frameFound = orderedFramesList.some(
        (entry) => entry.frame.id === targetFrameId
      );
      if (frameFound) {
        return key;
      }
    }
    return null; // Return null if not found
  }