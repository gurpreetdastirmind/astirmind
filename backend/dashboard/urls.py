from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('auth/login/', views.admin_login),
    path('auth/logout/', views.admin_logout),
    path('auth/status/', views.admin_status),
    # path('captcha/', views.captcha_challenge),
    # path('captcha/verify/', views.captcha_verify),

    # Records
    path('records/', views.records_list),
    path('records/<int:pk>/', views.record_detail),
    path('verify/', views.verify_certificate),

    # Messages (contact form)
    path('messages/', views.messages_list),
    path('messages/<int:pk>/', views.message_detail),

    # Hiring applications
    path('hiring/', views.hiring_list),
    path('hiring/<int:pk>/', views.hiring_detail),

    # Quote requests
    path('quotes/', views.quotes_list),
    path('quotes/<int:pk>/', views.quote_detail),

    # Blog
    path('blog/', views.blog_posts_list),
    path('blog/<int:pk>/', views.blog_post_detail),
    path('blog/<int:pk>/comments/', views.blog_comments_list),
]
