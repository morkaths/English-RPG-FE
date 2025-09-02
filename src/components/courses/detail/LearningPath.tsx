import { Timeline } from "flowbite-react";
import type { Lesson } from "src/types";
import StepButton from "./StepButton";

interface LearningPathProps {
  lessons: Lesson[];
}

const LearningPath: React.FC<LearningPathProps> = ({ lessons }) => {
  return (
    <Timeline>
      {lessons.map((lesson, idx) => (
        <Timeline.Item key={idx}>
          <Timeline.Point>
            {/* Button */}
            <StepButton
              index={idx}
              lesson={lesson}
              icon="mdi:star-circle-outline"
              status="unlocked"
            />
          </Timeline.Point>
          <Timeline.Content>
            {/* Title */}
            <Timeline.Title>{lesson.title}</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default LearningPath;
