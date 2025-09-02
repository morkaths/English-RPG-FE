import { useParams } from 'react-router-dom';
import useLessons from 'src/hooks/useLessons';
import CardBox from 'src/components/common/shared/CardBox';
import LearningPath from 'src/components/courses/detail/LearningPath';

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { lessons, loading, error } = useLessons(id);
  return (
    <div className="grid grid-cols-12 gap-30">
      {/* Header */}
      <div className="col-span-12">
        
      </div>
      {/* Main Content */}
      <div className="lg:col-span-8 col-span-12">
        <h1>Course Detail Page</h1>
        <LearningPath lessons={lessons} />
      </div>
      {/* Sidebar */}
      <div className="lg:col-span-4 col-span-12">
        <CardBox>
          <h5 className="card-title">Sidebar</h5>
        </CardBox>
      </div>
    </div>
  );
};

export default CourseDetailPage;
