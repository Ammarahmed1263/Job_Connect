import React, { useState, useMemo } from "react";
import { Pressable, View } from "react-native";
import AppText from "./AppText"; // adjust import based on your project structure

interface ReadMoreTextProps {
  text: string;
  limit?: number;
}

const ReadMoreText: React.FC<ReadMoreTextProps> = ({ text, limit = 120 }) => {
  const [expanded, setExpanded] = useState(false);

  const shouldShowToggle = useMemo(() => text.length > limit, [text, limit]);

  const displayedText = useMemo(() => {
    if (expanded || !shouldShowToggle) return text;
    return text.slice(0, limit).trim() + "...";
  }, [text, expanded, limit, shouldShowToggle]);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <AppText className="color-[--text-muted] leading-relaxed">
      {displayedText}{expanded && " "}
      {shouldShowToggle && (
        <AppText
          onPress={toggleExpanded}
          variant="light"
          className="color-[--accent-color] !underline"
        >
          {expanded ? "Read less" : "Read more"}
        </AppText>
      )}
    </AppText>
  );
};

export default ReadMoreText;
