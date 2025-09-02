import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Card } from "flowbite-react";
import type { Course, Tag } from 'src/types';
import paths from 'src/config/path.config';
import { getImageUrl } from "src/utils/image";

interface CourseCardProps {
    course: Course;
    tags: Tag[];
    viewMode?: 'grid' | 'list';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, tags, viewMode = 'grid' }) => {
    const navigate = useNavigate();
    // const { tags } = useTags();

    if (viewMode === 'grid') {
        return (
            <Card
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg dark:hover:bg-gray-700 hover:-translate-y-1 h-full flex flex-col overflow-hidden"
                onClick={() => navigate(paths.courseDetail(course._id))}
            >
                <div className="relative">
                    <div className="aspect-video w-full overflow-hidden rounded-xl">
                        <img
                            src={getImageUrl('catalog', course.thumbnail)}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = '/placeholder-course.jpg';
                            }}
                        />
                    </div>

                    {/* Popular badge */}
                    {/* {course.isPopular && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            🔥 Phổ biến
                        </Badge>
                    )} */}
                </div>

                <div className="pb-2 px-4 pt-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge color="gray" className="text-xs flex items-center gap-1 px-4">
                            {200} Bài học
                        </Badge>
                        <Badge color="primary" className="text-xs flex gap-1 px-4">
                            {course.level}
                        </Badge>
                    </div>
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>
                </div>

                <div className="pt-0 flex-1 pb-2">
                    <p className="text-sm text-muted-foreground dark:text-gray-300 line-clamp-3 mb-4">
                        {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                        {course.tags?.slice(0, 3).map((tagId, index) => {
                            const tag = tags.find(t => t._id === tagId);
                            if (!tag) return null;
                            return (
                                <Badge
                                    key={index}
                                    className="text-xs font-medium"
                                    style={{
                                        background: tag.color + "22",
                                        color: tag.color,
                                        borderColor: tag.color + "55",
                                        borderWidth: 1,
                                    }}
                                >
                                    {tag.name}
                                </Badge>
                            );
                        })}
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg dark:hover:bg-gray-700 hover:-translate-y-1 overflow-hidden"
            onClick={() => navigate(paths.courseDetail(course._id))}
        >
            <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 md:w-56 lg:w-64 flex-shrink-0 flex justify-center">
                    <div className="aspect-video w-full overflow-hidden rounded-xl">
                        <img
                            src={getImageUrl('catalog', course.thumbnail)}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = '/placeholder-course.jpg';
                            }}
                        />
                    </div>

                    {/* Popular badge */}
                    {/* {course.isPopular && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            🔥 Phổ biến
                        </Badge>
                    )} */}
                </div>

                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* <Badge color="gray" className="text-xs flex items-center gap-1 px-4">
                                {course.lessons.length} Bài học
                            </Badge> */}
                            <Badge color="primary" className="text-xs flex gap-1 px-4">
                                {course.level}
                            </Badge>
                        </div>
                    </div>

                    <h3 className="font-semibold text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                    </h3>

                    <p className="text-sm text-muted-foreground dark:text-gray-300 mb-3 line-clamp-2 text-sm sm:text-base">
                        {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                        {course.tags?.slice(0, 3).map((tagId, index) => {
                            const tag = tags.find(t => t._id === tagId);
                            if (!tag) return null;
                            return (
                                <Badge
                                    key={index}
                                    className="text-xs font-medium"
                                    style={{
                                        background: tag.color + "22",
                                        color: tag.color,
                                        borderColor: tag.color + "55",
                                        borderWidth: 1,
                                    }}
                                >
                                    {tag.name}
                                </Badge>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;
