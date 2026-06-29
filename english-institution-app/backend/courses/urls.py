from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, LessonViewSet, HomeworkViewSet, ReviewViewSet,EnrollmentViewSet

router = DefaultRouter()


router.register('courses', CourseViewSet)
router.register('lessons', LessonViewSet)
router.register('homeworks', HomeworkViewSet)
router.register('reviews', ReviewViewSet)
router.register('enrollments', EnrollmentViewSet, basename='enrollment')

urlpatterns = [
    path('', include(router.urls)),
]
