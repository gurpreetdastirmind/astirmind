from rest_framework import generics
from .models import Program
from .serializers import ProgramSerializer


class ProgramListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/programs/       — list all active programs (ordered by `order`)
    POST /api/programs/       — create a new program
    """
    serializer_class = ProgramSerializer

    def get_queryset(self):
        # Public list only returns active programs.
        # Pass ?all=1 to get everything (useful during admin testing).
        qs = Program.objects.all()
        if self.request.query_params.get('all') != '1':
            qs = qs.filter(is_active=True)
        return qs

class ProgramDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/programs/<id>/  — retrieve single program
    PUT    /api/programs/<id>/  — full update
    PATCH  /api/programs/<id>/  — partial update
    DELETE /api/programs/<id>/  — delete
    """
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
