from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TutorViewSet, TutorCertificateViewSet, TutorEducationViewSet,
    TutorExperienceViewSet, TutorCourseViewSet, CreateTutorProfileView
)

router = DefaultRouter()
router.register("tutors", TutorViewSet, basename="tutors")
router.register("tutor-certificates", TutorCertificateViewSet, basename="tutor-certificates")
router.register("tutor-educations", TutorEducationViewSet, basename="tutor-educations")
router.register("tutor-experiences", TutorExperienceViewSet, basename="tutor-experiences")
router.register("tutor-courses", TutorCourseViewSet, basename="tutor-courses")

urlpatterns = [
    path("tutors-api/", include(router.urls)), 
    path("create-tutor-profile/", CreateTutorProfileView.as_view(), name="create-tutor-profile"),
]
